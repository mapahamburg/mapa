import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export async function BetaStatus() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isLoggedIn = !!user;

  if (isLoggedIn) return null;

  return (
    <section
      style={{
        background: "var(--cobalt-50)",
        borderTop: "1px solid var(--cobalt-100)",
        borderBottom: "1px solid var(--cobalt-100)",
        padding: "56px 48px",
      }}
    >
      <div className="col2-text" style={{ alignItems: "flex-start" }}>
        {/* Left: copy */}
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              marginBottom: 20,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: 999,
                background: "var(--cobalt-500)",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 11,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--cobalt-700)",
                fontWeight: 600,
                fontFamily: "var(--font-mono)",
              }}
            >
              Beta gestartet · Winterhude &amp; Eppendorf
            </span>
          </div>

          <h2
            style={{
              fontFamily: "var(--font-ui)",
              fontWeight: 700,
              fontSize: "clamp(26px, 3.5vw, 38px)",
              lineHeight: 1.15,
              letterSpacing: "-0.025em",
              color: "var(--cobalt-700)",
              margin: "0 0 14px",
            }}
          >
            Sei dabei,
            <br />
            von Anfang an.
          </h2>

          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 16,
              lineHeight: 1.6,
              color: "var(--cobalt-600)",
              margin: "0 0 24px",
              maxWidth: 400,
            }}
          >
            Winterhude und Eppendorf starten gerade. Wer jetzt mitmacht,
            gestaltet mit, wie sich sein Stadtteil hier entwickelt.
          </p>

          <Link
            href="/signup"
            style={{
              display: "inline-block",
              background: "var(--cobalt-500)",
              color: "var(--mapa-paper)",
              textDecoration: "none",
              padding: "13px 24px",
              borderRadius: 999,
              fontFamily: "var(--font-ui)",
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            Kostenlos beitreten
          </Link>

          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 12,
              color: "var(--cobalt-500)",
              marginTop: 10,
            }}
          >
            Sofortiger Zugang · Keine App nötig
          </p>
        </div>

        {/* Right: 3 facts */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {[
            {
              n: "01",
              text: "Winterhude & Eppendorf sind aktiv. Weitere Stadtteile folgen.",
            },
            {
              n: "02",
              text: "Frühe Mitglieder prägen, welche Themen und welchen Ton der Stadtteil bekommt.",
            },
            {
              n: "03",
              text: "Local Hosts sind bereits dabei — echte Nachbarn, kein Support-Bot.",
            },
          ].map(({ n, text }) => (
            <div
              key={n}
              style={{
                display: "flex",
                gap: 16,
                alignItems: "flex-start",
                padding: "14px 0",
                borderTop: "1px solid var(--cobalt-100)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--cobalt-400)",
                  letterSpacing: "0.06em",
                  flexShrink: 0,
                  marginTop: 2,
                }}
              >
                {n}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: 15,
                  color: "var(--cobalt-700)",
                  lineHeight: 1.5,
                }}
              >
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
