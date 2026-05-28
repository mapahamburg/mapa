import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "mapa — Die lokale Community für Familien in Hamburg.";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#EDE8DE",
          padding: "80px 100px",
          position: "relative",
        }}
      >
        {/* Sage-Akzentlinie links */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 8,
            background: "#6F855A",
          }}
        />

        {/* mapa. */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            marginBottom: 28,
          }}
        >
          <span
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontStyle: "italic",
              fontSize: 104,
              fontWeight: 400,
              color: "#2C2218",
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            mapa
          </span>
          <span
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontStyle: "italic",
              fontSize: 104,
              fontWeight: 400,
              color: "#C26A3F",
              lineHeight: 1,
            }}
          >
            .
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
            fontSize: 34,
            color: "#6B5B45",
            fontWeight: 400,
            lineHeight: 1.45,
            maxWidth: 720,
            marginBottom: 52,
          }}
        >
          Die lokale Community für Familien in Hamburg.
        </div>

        {/* URL */}
        <div
          style={{
            fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
            fontSize: 22,
            color: "#9B8E7E",
            fontWeight: 400,
            letterSpacing: "0.04em",
          }}
        >
          mapa.hamburg
        </div>
      </div>
    ),
    { ...size }
  );
}
