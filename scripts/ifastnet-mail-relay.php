<?php
/**
 * Ifastnet / cPanel mail relay for uficoltd.com
 *
 * Upload this file and mail-relay.config.php to your Ifastnet hosting
 * (e.g. public_html/api/mail-relay.php). The Next.js site on Vercel calls
 * this script over HTTPS; this script sends mail via your server's SMTP.
 *
 * Do NOT commit mail-relay.config.php (copy from mail-relay.config.example.php).
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

$configPath = __DIR__ . '/mail-relay.config.php';
if (!is_file($configPath)) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Relay config missing']);
    exit;
}

$config = require $configPath;
$secret = $_SERVER['HTTP_X_MAIL_SECRET'] ?? '';

if (!is_string($secret) || !hash_equals((string) ($config['secret'] ?? ''), $secret)) {
    http_response_code(401);
    echo json_encode(['ok' => false, 'error' => 'Unauthorized']);
    exit;
}

$raw = file_get_contents('php://input');
$payload = json_decode($raw ?: '', true);

if (!is_array($payload)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid JSON body']);
    exit;
}

$to = filter_var($payload['to'] ?? '', FILTER_VALIDATE_EMAIL);
$subject = trim((string) ($payload['subject'] ?? ''));
$html = (string) ($payload['html'] ?? '');
$replyTo = filter_var($payload['replyTo'] ?? '', FILTER_VALIDATE_EMAIL);
$fromEmail = filter_var($config['from_email'] ?? '', FILTER_VALIDATE_EMAIL);
$fromName = trim((string) ($config['from_name'] ?? 'UFI Co., LTD'));

if (!$to || $subject === '' || $html === '' || !$fromEmail) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Missing or invalid mail fields']);
    exit;
}

if (!$replyTo) {
    $replyTo = $fromEmail;
}

$sent = sendViaSmtp($config, $fromName, $fromEmail, $to, $subject, $html, $replyTo);

if (!$sent) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'SMTP send failed']);
    exit;
}

echo json_encode(['ok' => true]);

function sendViaSmtp(
    array $config,
    string $fromName,
    string $fromEmail,
    string $to,
    string $subject,
    string $html,
    string $replyTo
): bool {
    $host = (string) ($config['smtp_host'] ?? 'mail.uficoltd.com');
    $port = (int) ($config['smtp_port'] ?? 587);
    $user = (string) ($config['smtp_user'] ?? $fromEmail);
    $pass = (string) ($config['smtp_pass'] ?? '');
    $secure = (bool) ($config['smtp_secure'] ?? false);

    $transport = $secure ? 'ssl' : 'tcp';
    $socket = @stream_socket_client(
        "{$transport}://{$host}:{$port}",
        $errno,
        $errstr,
        20,
        STREAM_CLIENT_CONNECT,
        stream_context_create([
            'ssl' => [
                'verify_peer' => true,
                'verify_peer_name' => true,
                'allow_self_signed' => false,
            ],
        ])
    );

    if (!$socket) {
        error_log("[mail-relay] Connection failed: {$errstr} ({$errno})");
        return false;
    }

    $read = static function () use ($socket): string {
        $data = '';
        while ($line = fgets($socket, 515)) {
            $data .= $line;
            if (isset($line[3]) && $line[3] === ' ') {
                break;
            }
        }
        return $data;
    };

    $write = static function (string $command) use ($socket): void {
        fwrite($socket, $command . "\r\n");
    };

    $expect = static function (string $response, array $codes) use ($read): bool {
        $code = (int) substr($response, 0, 3);
        return in_array($code, $codes, true);
    };

    $greeting = $read();
    if (!$expect($greeting, [220])) {
        fclose($socket);
        return false;
    }

    $ehloHost = (string) ($config['ehlo_host'] ?? 'uficoltd.com');
    $write("EHLO {$ehloHost}");
    $ehlo = $read();
    if (!$expect($ehlo, [250])) {
        fclose($socket);
        return false;
    }

    if (!$secure && $port === 587) {
        $write('STARTTLS');
        $startTls = $read();
        if (!$expect($startTls, [220])) {
            fclose($socket);
            return false;
        }

        if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
            fclose($socket);
            return false;
        }

        $write("EHLO {$ehloHost}");
        $ehlo = $read();
        if (!$expect($ehlo, [250])) {
            fclose($socket);
            return false;
        }
    }

    $write('AUTH LOGIN');
    if (!$expect($read(), [334])) {
        fclose($socket);
        return false;
    }

    $write(base64_encode($user));
    if (!$expect($read(), [334])) {
        fclose($socket);
        return false;
    }

    $write(base64_encode($pass));
    if (!$expect($read(), [235])) {
        fclose($socket);
        return false;
    }

    $write("MAIL FROM:<{$fromEmail}>");
    if (!$expect($read(), [250])) {
        fclose($socket);
        return false;
    }

    $write("RCPT TO:<{$to}>");
    if (!$expect($read(), [250, 251])) {
        fclose($socket);
        return false;
    }

    $write('DATA');
    if (!$expect($read(), [354])) {
        fclose($socket);
        return false;
    }

    $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
    $message = implode("\r\n", [
        "From: {$fromName} <{$fromEmail}>",
        "To: <{$to}>",
        "Reply-To: <{$replyTo}>",
        "MIME-Version: 1.0",
        "Content-Type: text/html; charset=UTF-8",
        "Content-Transfer-Encoding: 8bit",
        "Subject: {$encodedSubject}",
        '',
        $html,
        '.',
    ]);

    $write($message);
    if (!$expect($read(), [250])) {
        fclose($socket);
        return false;
    }

    $write('QUIT');
    fclose($socket);
    return true;
}
