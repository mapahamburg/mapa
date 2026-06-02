import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { getPendingKreiseForAdmin } from "@/lib/kreise";
import { ApproveButtons } from "./ApproveButtons";

export const metadata: Metadata = { title: "Kreise · mapa Admin" };

export default async function AdminKreisePage() {
  const pending = await getPendingKreiseForAdmin();

  return (
    <div
      style={{
        fontFamily: "var(--font-ui)",
        color: "var(--fg)",
        maxWidth: 860,
      }}
    >
      {/* Page header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 36,
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 32,
            fontWeight: 400,
            color: "var(--fg)",
            margin: 0,
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
          }}
        >
          Kreise
        </h1>

        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            fontFamily: "var(--font-mono)",
            background: pending.length > 0 ? "rgba(194,106,63,0.12)" : "var(--mapa-peach-50)",
            color: pending.length > 0 ? "var(--mapa-clay-500, #C26A3F)" : "var(--fg-muted)",
            border: `1px solid ${pending.length > 0 ? "rgba(194,106,63,0.3)" : "var(--mapa-line)"}`,
            borderRadius: 999,
            padding: "4px 12px",
          }}
        >
          {pending.length} in Prüfung
        </span>
      </div>

      {/* Empty state */}
      {pending.length === 0 && (
        <div
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--mapa-line)",
            borderRadius: "var(--radius-md, 12px)",
            padding: "48px 32px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: 20,
              color: "var(--fg-muted)",
              margin: 0,
              letterSpacing: "-0.01em",
            }}
          >
            Keine Kreise in der Warteschlange.
          </p>
        </div>
      )}

      {/* Pending Kreise list */}
      {pending.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {pending.map((k) => (
            <article
              key={k.id}
              style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--mapa-line)",
                borderRadius: "var(--radius-md, 12px)",
                padding: "24px 28px",
                boxShadow: "var(--shadow-m)",
              }}
            >
              {/* Name */}
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontSize: 18,
                  color: "var(--fg)",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.25,
                  marginBottom: 8,
                }}
              >
                {k.name}
              </div>

              {/* Meta row */}
              <div
                style={{
                  fontSize: 13,
                  color: "var(--fg-muted)",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  flexWrap: "wrap",
                }}
              >
                <MapPin size={12} strokeWidth={1.5} />
                {k.stadtteil}
                {k.thema && (
                  <>
                    <span style={{ color: "var(--mapa-line)" }}>·</span>
                    {k.thema}
                  </>
                )}
                <span style={{ color: "var(--mapa-line)" }}>·</span>
                <span>von {k.proposer}</span>
              </div>

              {/* Beschreibung */}
              {k.beschreibung && (
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--fg-muted)",
                    lineHeight: 1.5,
                    margin: "12px 0 0",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {k.beschreibung}
                </p>
              )}

              <ApproveButtons kreisId={k.id} />
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
