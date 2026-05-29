import { Bell } from "lucide-react";

export const metadata = {
  title: "Benachrichtigungen · mapa",
};

export default function BenachrichtigungenPage() {
  return (
    <main className="app-feed">
      <div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--color-subtle)",
            marginBottom: 14,
          }}
        >
          Benachrichtigungen
        </div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 36,
            lineHeight: 1.1,
            color: "var(--color-ink)",
            letterSpacing: "-0.01em",
            marginBottom: 8,
          }}
        >
          Alles ruhig hier.
        </div>
        <div
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: 15,
            color: "var(--color-muted)",
            maxWidth: 420,
          }}
        >
          Wenn jemand auf einen deiner Beiträge antwortet oder dich kontaktiert,
          erscheint es hier.
        </div>
      </div>

      {/* Placeholder notification items */}
      <div
        style={{
          borderTop: "1px solid var(--color-line)",
          marginTop: 40,
        }}
      >
        {[
          {
            text: "Antworten auf deine Beiträge",
            sub: "Wenn jemand auf deine Frage oder Empfehlung reagiert.",
          },
          {
            text: "Neue Treffen in deinem Stadtteil",
            sub: "Wenn ein neues Treffen in Winterhude geplant wird.",
          },
          {
            text: "Nachrichten vom Local Host",
            sub: "Wenn dein Local Host eine Nachricht schreibt.",
          },
        ].map((item) => (
          <div
            key={item.text}
            style={{
              display: "flex",
              gap: 16,
              alignItems: "flex-start",
              padding: "20px 4px",
              borderBottom: "1px solid var(--color-line-soft)",
              opacity: 0.45,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 999,
                background: "var(--color-cream)",
                border: "1px solid var(--color-line)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Bell size={15} strokeWidth={1.5} color="var(--color-muted)" />
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-ui)",
                  fontWeight: 500,
                  fontSize: 14,
                  color: "var(--color-ink)",
                  marginBottom: 3,
                }}
              >
                {item.text}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: 13,
                  color: "var(--color-muted)",
                  lineHeight: 1.5,
                }}
              >
                {item.sub}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 32,
          fontFamily: "var(--font-ui)",
          fontSize: 13,
          color: "var(--color-subtle)",
        }}
      >
        E-Mail-Benachrichtigungen kannst du in den{" "}
        <a
          href="/einstellungen"
          style={{
            color: "var(--color-cobalt)",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          Einstellungen
        </a>{" "}
        anpassen.
      </div>
    </main>
  );
}
