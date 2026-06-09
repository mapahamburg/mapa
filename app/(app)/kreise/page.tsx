import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Users, MapPin, Lock } from "lucide-react";
import { getKreise, getMyKreise, getMyPendingKreise } from "@/lib/kreise";
import type { KreisCard } from "@/types";

export const metadata: Metadata = {
  title: "Kreise · mapa",
};

// ─── Thema badge colour ───────────────────────────────────────────────────────

function ThemaBadge({ thema }: { thema: string | null }) {
  if (!thema) return null;
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        fontFamily: "var(--font-mono)",
        background: "var(--cobalt-50)",
        color: "var(--cobalt-700)",
        borderRadius: 999,
        padding: "3px 10px",
      }}
    >
      {thema}
    </span>
  );
}

// ─── Single Kreis card ────────────────────────────────────────────────────────

function KreisItem({ k }: { k: KreisCard }) {
  const isFull = k.member_count >= k.max_members;

  return (
    <Link
      href={`/kreise/${k.id}`}
      style={{ textDecoration: "none", color: "inherit", display: "block" }}
    >
      <article
        style={{
          background: "var(--color-ivory)",
          border: "1px solid var(--color-line-soft)",
          borderRadius: 20,
          padding: "20px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          cursor: "pointer",
          transition: "border-color 160ms ease",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.borderColor = "var(--color-sage)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.borderColor = "var(--color-line-soft)")
        }
      >
        {/* Header row */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
          {/* Icon circle */}
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 999,
              background: k.is_member ? "var(--cobalt-500)" : "var(--surface-card)",
              border: k.is_member ? "none" : "1px solid var(--border)",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Users
              size={16}
              strokeWidth={1.5}
              color={k.is_member ? "#fff" : "var(--fg-muted)"}
            />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: "-0.01em",
                color: "var(--ink)",
                lineHeight: 1.2,
              }}
            >
              {k.name}
            </div>
            <div
              style={{
                fontSize: 13,
                color: "var(--fg-muted)",
                marginTop: 3,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <MapPin size={11} strokeWidth={1.5} />
              {k.stadtteil}
            </div>
          </div>

          <ThemaBadge thema={k.thema} />
        </div>

        {/* Description */}
        {k.beschreibung && (
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.5,
              color: "var(--fg-muted)",
              margin: 0,
            }}
          >
            {k.beschreibung}
          </p>
        )}

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          <div
            style={{
              fontSize: 13,
              color: "var(--fg-muted)",
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            <Users size={12} strokeWidth={1.5} />
            {k.member_count} / {k.max_members} Mitglieder
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {isFull && (
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--fg-subtle)",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Lock size={10} strokeWidth={2} />
                Voll
              </span>
            )}
            {k.is_member && (
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--cobalt-700)",
                  background: "var(--cobalt-50)",
                  borderRadius: 999,
                  padding: "3px 10px",
                }}
              >
                {k.my_role === "host" ? "Du bist Host" : "Mitglied"}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}

// ─── Section label ────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 11,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        fontWeight: 600,
        fontFamily: "var(--font-mono)",
        color: "var(--fg-muted)",
        padding: "24px 0 12px",
      }}
    >
      {children}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function KreisePage() {
  const [myKreise, alleKreise, myPending] = await Promise.all([
    getMyKreise(),
    getKreise(),
    getMyPendingKreise(),
  ]);

  // Discovery list: kreise the user is NOT a member of
  const myIds = new Set(myKreise.map((k) => k.id));
  const discovery = alleKreise.filter((k) => !myIds.has(k.id));

  return (
    <main className="app-feed">
      {/* Page header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <div>
          <div
            className="feed-greeting"
            style={{
              fontFamily: "var(--font-ui)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
            }}
          >
            Kreise.
          </div>
          <div style={{ fontSize: 15, color: "var(--fg-muted)", marginTop: 4 }}>
            Kleine Gruppen für Familien im Stadtteil.
          </div>
        </div>

        <Link
          href="/kreise/neu"
          style={{
            background: "var(--cobalt-500)",
            color: "#fff",
            border: "none",
            borderRadius: 999,
            padding: "13px 18px",
            fontFamily: "var(--font-ui)",
            fontSize: 14,
            fontWeight: 500,
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 7,
            whiteSpace: "nowrap",
            flexShrink: 0,
            minHeight: 44,
          }}
        >
          <Plus size={15} strokeWidth={2} />
          Kreis vorschlagen
        </Link>
      </div>

      {/* Pending Kreise */}
      {myPending.length > 0 && (
        <>
          <SectionLabel>Eingereicht</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {myPending.map((k) => (
              <article
                key={k.id}
                style={{
                  background: "rgba(194,106,63,0.08)",
                  border: "1px solid rgba(194,106,63,0.22)",
                  borderRadius: 20,
                  padding: "20px 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontWeight: 600,
                      fontSize: 17,
                      color: "var(--ink)",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.25,
                    }}
                  >
                    {k.name}
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      fontFamily: "var(--font-mono)",
                      color: "var(--mapa-clay-500, #C26A3F)",
                      background: "rgba(194,106,63,0.12)",
                      borderRadius: 999,
                      padding: "3px 10px",
                      flexShrink: 0,
                    }}
                  >
                    In Prüfung
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "var(--fg-muted)",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <MapPin size={11} strokeWidth={1.5} />
                  {k.stadtteil}
                  {k.thema && (
                    <>
                      <span style={{ color: "var(--color-line-soft)" }}>·</span>
                      {k.thema}
                    </>
                  )}
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 13,
                    color: "var(--fg-subtle)",
                    lineHeight: 1.45,
                  }}
                >
                  Wird von einem Local Host geprüft.
                </p>
              </article>
            ))}
          </div>
        </>
      )}

      {/* My Kreise */}
      {myKreise.length > 0 && (
        <>
          <SectionLabel>Meine Kreise</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {myKreise.map((k) => (
              <KreisItem key={k.id} k={k} />
            ))}
          </div>
        </>
      )}

      {/* Discovery */}
      {discovery.length > 0 && (
        <>
          <SectionLabel>Kreise im Stadtteil</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {discovery.map((k) => (
              <KreisItem key={k.id} k={k} />
            ))}
          </div>
        </>
      )}

      {/* Empty state */}
      {myKreise.length === 0 && discovery.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "72px 0",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-ui)",
              fontWeight: 600,
              fontSize: 22,
              color: "var(--fg-muted)",
              letterSpacing: "-0.02em",
            }}
          >
            Noch keine Kreise hier.
          </div>
          <div
            style={{
              fontSize: 15,
              color: "var(--fg-subtle)",
              marginTop: 8,
              maxWidth: 320,
              margin: "12px auto 0",
              lineHeight: 1.5,
            }}
          >
            Sei die erste Person, die einen Kreis in deinem Stadtteil vorschlägt.
          </div>
          <Link
            href="/kreise/neu"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginTop: 24,
              background: "var(--cobalt-500)",
              color: "#fff",
              borderRadius: 999,
              padding: "12px 24px",
              fontFamily: "var(--font-ui)",
              fontSize: 15,
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            <Plus size={16} strokeWidth={2} />
            Ersten Kreis vorschlagen
          </Link>
        </div>
      )}
    </main>
  );
}
