"use client";

/**
 * Meta Pixel — DSGVO-konform
 * Lädt das Pixel via direktem Script-Inject (kein next/script),
 * da next/script konditionell gerenderte Scripts nicht zuverlässig injiziert.
 */

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

function loadPixel(pixelId: string) {
  if (window.fbq) return; // already loaded

  // Inline fbq stub
  const fbq: Window["fbq"] = function (...args) {
    (fbq as unknown as { callMethod?: (...a: unknown[]) => void; queue: unknown[][] }).callMethod
      ? (fbq as unknown as { callMethod: (...a: unknown[]) => void }).callMethod(...args)
      : ((fbq as unknown as { queue: unknown[][] }).queue =
          (fbq as unknown as { queue: unknown[][] }).queue || []).push(args);
  };
  (fbq as unknown as { push: typeof fbq; loaded: boolean; version: string; queue: unknown[][] }).push = fbq;
  (fbq as unknown as { loaded: boolean }).loaded = true;
  (fbq as unknown as { version: string }).version = "2.0";
  (fbq as unknown as { queue: unknown[][] }).queue = [];
  window.fbq = fbq;
  if (!window._fbq) window._fbq = fbq;

  // Inject the external script
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  // Init + initial PageView
  window.fbq("init", pixelId);
  window.fbq("track", "PageView");
}

export function MetaPixel() {
  const [consented, setConsented] = useState(false);
  const pathname = usePathname();
  const initialPageView = useRef(true); // skip first path change (pixel fires on load)

  // ── Consent prüfen & auf Änderungen hören ────────────────────────────────────
  useEffect(() => {
    const check = () => {
      setConsented(localStorage.getItem("mapa-cookie-consent") === "accepted");
    };
    check();
    window.addEventListener("mapa-consent-changed", check);
    return () => window.removeEventListener("mapa-consent-changed", check);
  }, []);

  // ── Script laden wenn Consent erteilt ────────────────────────────────────────
  useEffect(() => {
    if (!consented || !PIXEL_ID) return;
    loadPixel(PIXEL_ID);
  }, [consented]);

  // ── SPA PageView bei Pfadwechsel (kein Duplikat beim ersten Load) ─────────────
  useEffect(() => {
    if (initialPageView.current) {
      initialPageView.current = false;
      return;
    }
    if (!consented || !window.fbq) return;
    window.fbq("track", "PageView");
  }, [pathname, consented]);

  // ── CompleteRegistration nach Onboarding ─────────────────────────────────────
  useEffect(() => {
    if (!consented || !window.fbq) return;
    if (localStorage.getItem("mapa-just-registered") === "1") {
      window.fbq("track", "CompleteRegistration");
      localStorage.removeItem("mapa-just-registered");
    }
  }, [consented, pathname]);

  return null; // kein JSX — Script wird per DOM-API injiziert
}
