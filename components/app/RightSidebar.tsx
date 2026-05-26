import { Avatar } from "@/components/ui/Avatar";

interface TreffenItem {
  id: number;
  title: string;
  day: string;
  month: string;
  where: string;
}

const TREFFEN: TreffenItem[] = [
  { id: 1, title: "Spielplatztreffen am Samstag. Wer kommt mit?", day: "25", month: "Mai", where: "Stadtpark Winterhude" },
  { id: 2, title: "Kinderflohmarkt im Goldbekhaus, Samstag", day: "25", month: "Mai", where: "Goldbekhaus" },
  { id: 3, title: "Tragetuchtreff jeden Donnerstag.", day: "29", month: "Mai", where: "Café Mira, Hoheluft" },
];

export function RightSidebar() {
  return (
    <aside
      style={{
        width: 320,
        padding: "32px 0 32px 0",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        flexShrink: 0,
        position: "sticky",
        top: 65,
        alignSelf: "flex-start",
        height: "calc(100vh - 65px)",
        overflowY: "auto",
      }}
    >
      {/* Local Host card */}
      <div
        style={{
          background: "var(--mapa-sage-100)",
          borderRadius: 20,
          padding: 20,
          border: "1px solid var(--mapa-sage-200)",
        }}
      >
        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--mapa-sage-700)",
            fontWeight: 600,
            marginBottom: 12,
          }}
        >
          Local Host · Eppendorf
        </div>
        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <Avatar letter="N" size={46} />
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 19,
                letterSpacing: "-0.01em",
                color: "var(--mapa-sage-800)",
              }}
            >
              Nadine
            </div>
            <div style={{ fontSize: 12, color: "var(--mapa-sage-700)" }}>
              312 Familien begleitet
            </div>
          </div>
        </div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 15,
            lineHeight: 1.4,
            color: "var(--mapa-sage-800)",
            letterSpacing: "-0.005em",
          }}
        >
          „Sammle gerade Tipps für regnerische Tage. Was sind eure
          Lieblings-Indoor-Orte?"
        </div>
        <button
          type="button"
          style={{
            marginTop: 14,
            background: "var(--mapa-paper)",
            color: "var(--mapa-sage-700)",
            border: "1px solid var(--mapa-sage-200)",
            padding: "8px 14px",
            borderRadius: 999,
            fontFamily: "var(--font-ui)",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Hallo schreiben
        </button>
      </div>

      {/* Treffen widget */}
      <div
        style={{
          background: "var(--mapa-ivory)",
          borderRadius: 20,
          border: "1px solid var(--border)",
          padding: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 14,
          }}
        >
          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: "var(--fg-muted)",
            }}
          >
            Treffen diese Woche
          </span>
          <span
            style={{
              fontSize: 12,
              color: "var(--mapa-sage-700)",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Alle ansehen
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {TREFFEN.map((t, i) => (
            <div
              key={t.id}
              style={{
                padding: "12px 0",
                borderBottom:
                  i < TREFFEN.length - 1
                    ? "1px solid var(--border-soft)"
                    : "none",
              }}
            >
              <div
                style={{ display: "flex", gap: 12, alignItems: "flex-start" }}
              >
                {/* Date pill */}
                <div
                  style={{
                    width: 44,
                    textAlign: "center",
                    flexShrink: 0,
                    background: "var(--mapa-peach-100)",
                    color: "var(--mapa-clay-600)",
                    borderRadius: 10,
                    padding: "4px 0",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  <div
                    style={{
                      fontSize: 18,
                      letterSpacing: "-0.02em",
                      lineHeight: 1,
                    }}
                  >
                    {t.day}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {t.month}
                  </div>
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 14.5,
                      letterSpacing: "-0.01em",
                      lineHeight: 1.3,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {t.title}
                  </div>
                  <div
                    style={{
                      fontSize: 11.5,
                      color: "var(--fg-muted)",
                      marginTop: 4,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {t.where}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div
        style={{
          background: "var(--mapa-paper)",
          borderRadius: 20,
          border: "1px solid var(--border)",
          padding: 20,
        }}
      >
        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontWeight: 600,
            color: "var(--fg-muted)",
          }}
        >
          In Eppendorf
        </div>
        <div style={{ display: "flex", gap: 24, marginTop: 14 }}>
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 28,
                letterSpacing: "-0.02em",
              }}
            >
              184
            </div>
            <div style={{ fontSize: 12, color: "var(--fg-muted)", marginTop: 2 }}>
              Mitglieder
            </div>
          </div>
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 28,
                letterSpacing: "-0.02em",
              }}
            >
              12
            </div>
            <div style={{ fontSize: 12, color: "var(--fg-muted)", marginTop: 2 }}>
              diese Woche neu
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
