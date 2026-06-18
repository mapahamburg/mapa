import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "Hausregeln — mapa Hamburg",
  description:
    "Die fünf Hausregeln der mapa-Community für Familien in Hamburg. Freundlicher, lokaler Austausch — respektvoll, ehrlich und ohne Streit.",
  alternates: { canonical: "https://mapa.hamburg/hausregeln" },
};

const rules = [
  {
    number: "01.",
    title: "Freundlich bleiben.",
    body: "Sei respektvoll, auch wenn du nicht zustimmst. Konstruktive Kritik ist willkommen, persönliche Angriffe nicht.",
  },
  {
    number: "02.",
    title: "Lokal und praktisch.",
    body: "Bleib bei Themen, die Hamburg und deinen Stadtteil betreffen. mapa ist kein Ort für nationale Politik oder allgemeine Debatten.",
  },
  {
    number: "03.",
    title: "Keine medizinischen Empfehlungen.",
    body: "Erfahrungen teilen ist ausdrücklich erlaubt. Aber: kein Ersatz für Ärzte, Hebammen oder Fachleute. Bei Unsicherheiten immer professionellen Rat suchen.",
  },
  {
    number: "04.",
    title: "Echte Empfehlungen.",
    body: "Empfehlungen kommen aus eigener Erfahrung. Selbstpromo und bezahlte Werbung werden offengelegt, sonst werden sie entfernt.",
  },
  {
    number: "05.",
    title: "Sag Bescheid.",
    body: "Wenn ein Beitrag nicht stimmt, meld ihn. Das Team und die Local Hosts lesen Meldungen täglich und handeln diskret.",
  },
];

export default function HausregelnPage() {
  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "var(--bg)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <header
        style={{
          borderBottom: "1px solid var(--border)",
          padding: "24px 32px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link href="/" style={{ textDecoration: "none" }}>
          <Logo size={24} />
        </Link>
      </header>

      {/* Content */}
      <main
        style={{
          maxWidth: 640,
          margin: "0 auto",
          padding: "48px 24px",
          flex: 1,
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Eyebrow */}
        <p
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--mapa-sage-500)",
            margin: "0 0 12px 0",
          }}
        >
          Gemeinschaft
        </p>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: 36,
            fontWeight: 700,
            color: "var(--fg)",
            margin: "0 0 8px 0",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
          }}
        >
          Die fünf Hausregeln.
        </h1>

        {/* Subtext */}
        <p
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: 14,
            color: "var(--fg-subtle)",
            lineHeight: 1.6,
            margin: "0 0 48px 0",
          }}
        >
          mapa funktioniert, weil alle mitziehen. Diese fünf Regeln sind die
          Grundlage dafür.
        </p>

        {/* Rules */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {rules.map((rule) => (
            <article
              key={rule.number}
              style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: 24,
                boxShadow: "var(--shadow-m)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: 20,
                  fontWeight: 600,
                  color: "var(--mapa-sage-500)",
                  margin: "0 0 8px 0",
                  lineHeight: 1,
                }}
              >
                {rule.number}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: 15,
                  fontWeight: 600,
                  color: "var(--fg)",
                  margin: "0 0 6px 0",
                  lineHeight: 1.4,
                }}
              >
                {rule.title}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: 14,
                  color: "var(--fg-muted)",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {rule.body}
              </p>
            </article>
          ))}
        </div>

        {/* Fotos & Tauschbörse */}
        <section style={{ marginTop: 48 }}>
          <h2
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 24,
              fontWeight: 700,
              color: "var(--fg)",
              letterSpacing: "-0.015em",
              margin: "0 0 16px 0",
            }}
          >
            Fotos, Inhalte und Tauschbörse.
          </h2>

          <article
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              padding: 24,
              boxShadow: "var(--shadow-m)",
              marginBottom: 16,
            }}
          >
            <p style={{ fontFamily: "var(--font-ui)", fontSize: 15, fontWeight: 600, color: "var(--fg)", margin: "0 0 10px 0" }}>
              Fotos und Inhalte
            </p>
            <p style={{ fontFamily: "var(--font-ui)", fontSize: 14, color: "var(--fg-muted)", lineHeight: 1.65, margin: "0 0 12px 0" }}>
              Teile nur Inhalte, die dir gehören, die du selbst fotografiert hast oder für die du die Erlaubnis hast.
            </p>
            <p style={{ fontFamily: "var(--font-ui)", fontSize: 14, color: "var(--fg-muted)", lineHeight: 1.65, margin: 0 }}>
              Bitte keine erkennbaren Fotos fremder Kinder, keine privaten Adressen, keine Kennzeichen, keine Screenshots privater Chats und keine medizinischen Unterlagen. Keine Werbung, kein Spam.
            </p>
          </article>

          <article
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              padding: 24,
              boxShadow: "var(--shadow-m)",
            }}
          >
            <p style={{ fontFamily: "var(--font-ui)", fontSize: 15, fontWeight: 600, color: "var(--fg)", margin: "0 0 10px 0" }}>
              Tauschbörse
            </p>
            <p style={{ fontFamily: "var(--font-ui)", fontSize: 14, color: "var(--fg-muted)", lineHeight: 1.65, margin: "0 0 12px 0" }}>
              mapa ist keine anonyme Verkaufsplattform. Beschreib ehrlich, bleib lokal und respektvoll. Abholung im Stadtteil ist meist die schönste Lösung. Nutze sichere Treffpunkte.
            </p>
            <p style={{ fontFamily: "var(--font-ui)", fontSize: 14, color: "var(--fg-muted)", lineHeight: 1.65, margin: 0 }}>
              Für private Verkäufe und Tauschaktionen übernimmt mapa keine Haftung. Verschenken, Suchen und lokale Tipps stehen im Mittelpunkt, nicht der schnelle Handel.
            </p>
          </article>
        </section>

        {/* Moderation note */}
        <div
          style={{
            marginTop: 40,
            background: "var(--mapa-sage-50)",
            border: "1px solid var(--mapa-sage-100)",
            borderRadius: "var(--radius-md)",
            padding: "16px 20px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 13,
              color: "var(--fg-muted)",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Verstöße werden diskret per Direktnachricht geklärt, nicht
            öffentlich. Bei wiederholten Verstößen kann ein Konto ohne
            Ankündigung gesperrt werden.
          </p>
        </div>

        {/* Back link */}
        <div style={{ marginTop: 40 }}>
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 13,
              color: "var(--fg-subtle)",
              textDecoration: "none",
            }}
          >
            &larr; Zurück
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid var(--border)",
          padding: "32px",
          marginTop: 48,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          textAlign: "center",
        }}
      >
        <Logo size={16} />
        <p
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: 13,
            color: "var(--fg-subtle)",
            margin: 0,
          }}
        >
          Eine Nachbarschafts-Community für Familien in Hamburg.
        </p>
        <div style={{ display: "flex", gap: 20, marginTop: 4 }}>
          <Link
            href="/feed"
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 13,
              color: "var(--fg-subtle)",
              textDecoration: "none",
            }}
          >
            Feed
          </Link>
          <Link
            href="/signup"
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 13,
              color: "var(--fg-subtle)",
              textDecoration: "none",
            }}
          >
            Registrieren
          </Link>
        </div>
      </footer>
    </div>
  );
}
