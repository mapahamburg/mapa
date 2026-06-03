"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("mapa-cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("mapa-cookie-consent", "accepted");
    setVisible(false);
  };

  const essential = () => {
    localStorage.setItem("mapa-cookie-consent", "essential");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: "var(--surface-card)",
        borderTop: "1px solid var(--ash-200)",
        padding: "18px 48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 32,
        flexWrap: "wrap" as const,
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: 14,
          color: "var(--ink)",
          margin: 0,
          lineHeight: 1.55,
          maxWidth: 680,
        }}
      >
        mapa verwendet technisch notwendige Cookies für die Anmeldung sowie optionale
        Analyse-Cookies zur Verbesserung der Plattform.{" "}
        <Link href="/datenschutz" style={{ color: "var(--cobalt-500)", textDecoration: "none", display: "inline-block", padding: "3px 0" }}>
          Datenschutzerklärung lesen
        </Link>
      </p>

      <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
        <button
          onClick={essential}
          type="button"
          style={{
            background: "transparent",
            border: "1px solid var(--ash-200)",
            color: "var(--ink)",
            padding: "9px 18px",
            borderRadius: 999,
            fontFamily: "var(--font-ui)",
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
            whiteSpace: "nowrap" as const,
          }}
        >
          Nur notwendige
        </button>
        <button
          onClick={accept}
          type="button"
          style={{
            background: "var(--cobalt-500)",
            border: "none",
            color: "#FBF8F2",
            padding: "9px 18px",
            borderRadius: 999,
            fontFamily: "var(--font-ui)",
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
            whiteSpace: "nowrap" as const,
          }}
        >
          Alle akzeptieren
        </button>
      </div>
    </div>
  );
}
