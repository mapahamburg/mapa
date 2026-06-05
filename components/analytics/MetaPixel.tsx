"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fbq: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _fbq: any;
  }
}

function injectPixel(id: string) {
  if (typeof window === "undefined") return;
  if (window.fbq) return; // already loaded

  // Standard Meta Pixel base code
  /* eslint-disable */
  (function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
    if (f.fbq) return;
    n = f.fbq = function() {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n; n.loaded = true; n.version = "2.0"; n.queue = [];
    t = b.createElement(e); t.async = true;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  /* eslint-enable */

  window.fbq("init", id);
  window.fbq("track", "PageView");
}

export function MetaPixel() {
  const [consented, setConsented] = useState(false);
  const pathname = usePathname();
  const firstNav = useRef(true);

  useEffect(() => {
    const check = () => {
      setConsented(localStorage.getItem("mapa-cookie-consent") === "accepted");
    };
    check();
    window.addEventListener("mapa-consent-changed", check);
    return () => window.removeEventListener("mapa-consent-changed", check);
  }, []);

  useEffect(() => {
    if (!consented || !PIXEL_ID) return;
    injectPixel(PIXEL_ID);
  }, [consented]);

  useEffect(() => {
    if (firstNav.current) { firstNav.current = false; return; }
    if (!consented || !window.fbq) return;
    window.fbq("track", "PageView");
  }, [pathname, consented]);

  useEffect(() => {
    if (!consented || !window.fbq) return;
    if (localStorage.getItem("mapa-just-registered") === "1") {
      window.fbq("track", "CompleteRegistration");
      localStorage.removeItem("mapa-just-registered");
    }
  }, [consented, pathname]);

  return null;
}
