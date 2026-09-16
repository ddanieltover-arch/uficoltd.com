"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

/** Public sitekey for the existing "UFI contact forms" widget. */
export const TURNSTILE_SITEKEY = "0x4AAAAAAE48kXHhXh2i5dWd";

type TurnstileApi = {
  render: (
    element: HTMLElement,
    options: {
      sitekey: string;
      action: string;
      callback: (token: string) => void;
      "expired-callback"?: () => void;
      "error-callback"?: () => void;
      theme?: "light" | "dark" | "auto";
    },
  ) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export type TurnstileWidgetHandle = {
  reset: () => void;
};

export const TurnstileWidget = forwardRef<
  TurnstileWidgetHandle,
  { action: string; onToken: (token: string) => void }
>(function TurnstileWidget({ action, onToken }, ref) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | undefined>(undefined);
  const onTokenRef = useRef(onToken);
  onTokenRef.current = onToken;

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || TURNSTILE_SITEKEY;

  useImperativeHandle(ref, () => ({
    reset() {
      if (widgetIdRef.current) window.turnstile?.reset(widgetIdRef.current);
      onTokenRef.current("");
    },
  }));

  useEffect(() => {
    if (!containerRef.current) return;

    let cancelled = false;

    const render = () => {
      if (cancelled || widgetIdRef.current || !containerRef.current || !window.turnstile) return;
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        action,
        theme: "light",
        callback: (token) => onTokenRef.current(token),
        "expired-callback": () => onTokenRef.current(""),
        "error-callback": () => onTokenRef.current(""),
      });
    };

    if (window.turnstile) {
      render();
    } else {
      const existing = document.querySelector<HTMLScriptElement>('script[data-turnstile="explicit"]');
      if (existing) {
        existing.addEventListener("load", render, { once: true });
      } else {
        const script = document.createElement("script");
        script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        script.async = true;
        script.defer = true;
        script.dataset.turnstile = "explicit";
        script.onload = () => render();
        document.head.appendChild(script);
      }
    }

    return () => {
      cancelled = true;
      if (widgetIdRef.current) window.turnstile?.remove(widgetIdRef.current);
      widgetIdRef.current = undefined;
    };
  }, [action, siteKey]);

  return <div ref={containerRef} className="min-h-[65px]" />;
});
