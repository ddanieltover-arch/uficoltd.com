<?php
/**
 * Copy this file to mail-relay.config.php on your Ifastnet server.
 * Do not commit mail-relay.config.php — it contains your mailbox password.
 */
return [
    // Must match MAIL_RELAY_SECRET in Vercel / .env.local
    'secret' => 'replace-with-a-long-random-string',

    'smtp_host' => 'mail.uficoltd.com',
    'smtp_port' => 587,
    'smtp_secure' => false,
    'smtp_user' => 'sales@uficoltd.com',
    'smtp_pass' => 'your-mailbox-password',

    'from_email' => 'sales@uficoltd.com',
    'from_name' => 'UFI Co., LTD',
    'ehlo_host' => 'uficoltd.com',
];
