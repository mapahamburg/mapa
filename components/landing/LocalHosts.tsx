import { Avatar } from "@/components/ui/Avatar";

const HOSTS = [
  { letter: "B", name: "Björn", stadtteil: "Winterhude" },
  { letter: "L", name: "Lena",  stadtteil: "Eppendorf"  },
  { letter: "T", name: "Tom",   stadtteil: "Ottensen"   },
];

export function LocalHosts() {
  return (
    <section
      style={{
        borderTop: "1px solid var(--border-soft)",
        padding: "48px 0",
        background: "var(--mapa-cream)",
      }}
    >
      <div
        style={{
          maxWidth: 720,
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--cobalt-500)",
            fontWeight: 500,
            fontFamily: "var(--font-mono)",
            marginBottom: 20,
          }}
        >
          Local Hosts
        </div>

        {/* Hosts row */}
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            marginBottom: 20,
          }}
        >
          {HOSTS.map((h) => (
            <div
              key={h.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "var(--mapa-paper)",
                border: "1px solid var(--border-soft)",
                borderRadius: 999,
                padding: "8px 16px 8px 8px",
              }}
            >
              <Avatar letter={h.letter} size={30} />
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontWeight: 600,
                    fontSize: 13.5,
                    color: "var(--ink)",
                    lineHeight: 1.2,
                  }}
                >
                  {h.name}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: 11.5,
                    color: "var(--fg-muted)",
                  }}
                >
                  {h.stadtteil}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Caption + link */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 14,
              color: "var(--fg-muted)",
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            In jedem Stadtteil gibt es einen Local Host — eine echte Person,
            die neue Familien willkommen heißt.
          </p>
          <a
            href="/local-hosts"
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 13,
              fontWeight: 500,
              color: "var(--cobalt-500)",
              textDecoration: "none",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            Local Host werden →
          </a>
        </div>
      </div>
    </section>
  );
}
