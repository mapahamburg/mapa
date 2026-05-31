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
          background: "#F5F1E8",
          padding: "80px 100px",
          position: "relative",
        }}
      >
        {/* Sage accent bar left */}
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

        {/* "mapa" + clay dot */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            marginBottom: 24,
            lineHeight: 1,
          }}
        >
          <span
            style={{
              fontFamily: "'Arial Black', 'Helvetica Neue', Arial, sans-serif",
              fontSize: 112,
              fontWeight: 900,
              color: "#1A1410",
              lineHeight: 1,
              letterSpacing: "-0.05em",
            }}
          >
            mapa
          </span>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: "#C26A3F",
              marginLeft: 2,
              marginBottom: 16,
              flexShrink: 0,
            }}
          />
        </div>

        {/* Tagline */}
        <div
          style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontSize: 32,
            color: "#6B5B45",
            fontWeight: 400,
            lineHeight: 1.5,
            maxWidth: 700,
            marginBottom: 56,
          }}
        >
          Die lokale Community für Familien in Hamburg.
        </div>

        {/* URL pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "#EDE8DE",
            borderRadius: 999,
            padding: "10px 20px",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#6F855A",
            }}
          />
          <span
            style={{
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontSize: 20,
              color: "#6B5B45",
              fontWeight: 500,
              letterSpacing: "0.02em",
            }}
          >
            mapa.hamburg
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
