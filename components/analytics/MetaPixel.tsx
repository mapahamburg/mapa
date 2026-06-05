"use client";

/**
 * Meta Pixel — DSGVO-konform
 *
 * Das Pixel wird NUR geladen wenn der Nutzer Marketing-Cookies akzeptiert hat
 * (localStorage "mapa-cookie-consent" === "accepted").
 *
 * PageView wird beim ersten Laden automatisch vom Pixel-Basiscode gefeuert.
 * Für SPA-Navigation (Next.js App Router) wird auf Pfadänderungen gehört
 * und ein zusätzlicher PageView gefeuert — aber NICHT beim initialen Load,
 * damit kein doppelter Event entsteht.
 *
 * CompleteRegistration: Setzt das CookieBanner `mapa-just-registered` Flag
 * in localStorage. Diese Komponente feuert das Event einmalig wenn sie das
 * Flag findet und löscht es danach.
 */

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

// Extend window type for fbq
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

export function MetaPixel() {
  const [consented, setConsented] = useState(false);
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  // ── 1. Consent prüfen & auf Änderungen hören ────────────────────────────────
  useEffect(() => {
    const checkConsent = () => {
      const val = localStorage.getItem("mapa-cookie-consent");
      setConsented(val === "accepted");
    };

    checkConsent();

    // CookieBanner dispatcht dieses Event wenn der Nutzer akzeptiert
    window.addEventListener("mapa-consent-changed", checkConsent);
    return () => window.removeEventListener("mapa-consent-changed", checkConsent);
  }, []);

  // ── 2. SPA-PageView bei Pfadwechsel ─────────────────────────────────────────
  //    Erstes Rendering überspringen — Pixel feuert PageView beim Script-Load.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!consented || !window.fbq) return;
    window.fbq("track", "PageView");
  }, [pathname, consented]);

  // ── 3. CompleteRegistration — einmalig nach Onboarding ──────────────────────
  useEffect(() => {
    if (!consented || !window.fbq) return;
    const flag = localStorage.getItem("mapa-just-registered");
    if (flag === "1") {
      window.fbq("track", "CompleteRegistration");
      localStorage.removeItem("mapa-just-registered");
    }
  }, [consented, pathname]);

  // Kein Pixel ohne Consent oder fehlende ID
  if (!consented || !PIXEL_ID) return null;

  return (
    <>
      <Script
        id="meta-pixel-base"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s){
              if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)
            }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init','${PIXEL_ID}');
            fbq('track','PageView');
          `,
        }}
      />
      {/* Noscript-Fallback */}
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
