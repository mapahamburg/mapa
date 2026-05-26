"use client";

import { useEffect, useState } from "react";

const STADTTEILE = [
  "Hamburg",
  "Winterhude",
  "Eppendorf",
  "Uhlenhorst",
  "Eimsbüttel",
  "Ottensen",
  "Altona",
  "Harvestehude",
  "Blankenese",
  "Rotherbaum",
  "Barmbek",
  "Pöseldorf",
];

export function StadtteilReel() {
  const [index, setIndex] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % STADTTEILE.length);
      setTick((t) => t + 1);
    }, 1600);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      style={{
        background: "var(--mapa-cream-deep)",
        padding: "120px 48px",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Eyebrow */}
        <div
          style={{
            fontSize: 12,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--mapa-sage-700)",
            fontWeight: 600,
            marginBottom: 40,
          }}
        >
          Für jeden Stadtteil in Hamburg
        </div>

        {/* The reel */}
        <div
          style={{
            fontFamily: "var(--font-ui)",
            fontWeight: 700,
            fontSize: "clamp(52px, 8vw, 96px)",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            display: "flex",
            alignItems: "baseline",
            justifyContent: "center",
            flexWrap: "nowrap",
          }}
        >
          <span style={{ color: "var(--fg)" }}>MAPA</span>
          <span style={{ color: "var(--mapa-cobalt-500)" }}>.</span>

          {/* Clip window — minWidth hält MAPA. stationär */}
          <span
            className="slot-clip"
            style={{
              marginLeft: "0.3em",
              height: "1.1em",
              minWidth: "7em",
              textAlign: "left",
            }}
          >
            <span
              key={tick}
              className="slot-reel"
              style={{
                display: "inline-block",
                fontWeight: 400,
                color: "var(--fg-muted)",
                animationDelay: "0s",
              }}
            >
              {STADTTEILE[index]}
            </span>
          </span>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: 18,
            color: "var(--fg-muted)",
            marginTop: 32,
            lineHeight: 1.5,
            letterSpacing: "-0.01em",
          }}
        >
          Wo Familien zuhause sind. Dort ist mapa.
        </p>
      </div>
    </section>
  );
}
