import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "#6F855A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 2,
        }}
      >
        {/* m */}
        <span
          style={{
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            fontSize: 19,
            fontWeight: 400,
            color: "#F5F1E8",
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          m
        </span>
        {/* clay dot — brand signature */}
        <span
          style={{
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            fontSize: 19,
            fontWeight: 700,
            color: "#D88F68",
            lineHeight: 1,
            marginLeft: 1,
          }}
        >
          .
        </span>
      </div>
    ),
    { ...size }
  );
}
