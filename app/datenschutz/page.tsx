import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata = {
  title: "Datenschutz — mapa",
};

const h2Style: React.CSSProperties = {
  fontFamily: "var(--font-ui)",
  fontWeight: 600,
  fontSize: 18,
  margin: "40px 0 8px",
  letterSpacing: "-0.01em",
  color: "var(--ink)",
};

const pStyle: React.CSSProperties = {
  margin: "0 0 16px",
};

const listStyle: React.CSSProperties = {
  listStyle: "none",
  padding: 0,
  margin: "0 0 16px",
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

function BulletList({ items }: { items: string[] }) {
  return (
    <ul style={listStyle}>
      {items.map((item) => (
        <li
          key={item}
          style={{ display: "flex", gap: 10, alignItems: "flex-start" }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: "var(--cobalt-500)",
              marginTop: 9,
              flexShrink: 0,
            }}
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function DatenschutzPage() {
  return (
    <LegalLayout eyebrow="Rechtliches" title="Datenschutz." lastUpdated="Mai 2026">
      <h2 style={h2Style}>1. Verantwortlicher</h2>
      <p style={pStyle}>
        Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist: Henry Bigalke,
        Ludwigstr. 4, 20357 Hamburg, E-Mail: hallo@mapa.hamburg
      </p>

      <h2 style={h2Style}>2. Erhobene Daten</h2>
      <p style={pStyle}>Bei der Nutzung von mapa erheben wir folgende Daten:</p>
      <BulletList
        items={[
          "Registrierungsdaten (Vorname, E-Mail-Adresse)",
          "Standortdaten (selbst gewählter Stadtteil, kein GPS)",
          "Beiträge, Kommentare und Reaktionen",
          "Technische Daten (IP-Adresse, Browser, Betriebssystem) via Server-Logs",
        ]}
      />

      <h2 style={h2Style}>3. Zweck und Rechtsgrundlage</h2>
      <p style={pStyle}>
        Wir verarbeiten deine Daten zur Bereitstellung der Plattform (Art. 6 Abs. 1 lit. b DSGVO),
        zur Erfüllung rechtlicher Verpflichtungen (Art. 6 Abs. 1 lit. c DSGVO) sowie auf Basis
        deiner Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), sofern du diese erteilt hast.
      </p>

      <h2 style={h2Style}>4. Weitergabe an Dritte</h2>
      <p style={pStyle}>
        Wir geben deine Daten nicht an Dritte weiter, außer es ist zur Bereitstellung des Dienstes
        erforderlich. Wir nutzen folgende Infrastruktur-Dienste:
      </p>
      <BulletList
        items={[
          "Supabase (Datenbank und Authentifizierung) — Verarbeitung in der EU",
          "Vercel (Hosting) — Serverstandorte in der EU",
        ]}
      />

      <h2 id="cookies" style={h2Style}>5. Cookies</h2>
      <p style={pStyle}>
        mapa verwendet technisch notwendige Cookies für die Authentifizierung (Session-Cookies).
        Diese werden nicht für Werbung oder Tracking genutzt. Optionale Analyse-Cookies werden nur
        mit deiner ausdrücklichen Einwilligung gesetzt.
      </p>

      <h2 style={h2Style}>6. Speicherdauer</h2>
      <p style={pStyle}>
        Deine Daten werden gelöscht, sobald sie für den Zweck der Verarbeitung nicht mehr benötigt
        werden. Account-Daten werden bei Kontolöschung vollständig entfernt. Server-Logs werden nach
        30 Tagen automatisch gelöscht.
      </p>

      <h2 style={h2Style}>7. Deine Rechte</h2>
      <p style={pStyle}>Du hast folgende Rechte gemäß DSGVO:</p>
      <BulletList
        items={[
          "Auskunft über deine gespeicherten Daten (Art. 15)",
          "Berichtigung unrichtiger Daten (Art. 16)",
          "Löschung deiner Daten (\"Recht auf Vergessenwerden\", Art. 17)",
          "Einschränkung der Verarbeitung (Art. 18)",
          "Datenübertragbarkeit (Art. 20)",
          "Widerspruch gegen die Verarbeitung (Art. 21)",
        ]}
      />
      <p style={pStyle}>
        Zur Ausübung dieser Rechte wende dich an: datenschutz@mapa.hamburg
      </p>

      <h2 style={h2Style}>8. Beschwerderecht</h2>
      <p style={pStyle}>
        Du hast das Recht, dich bei einer Aufsichtsbehörde zu beschweren. Zuständige
        Aufsichtsbehörde in Hamburg ist der Hamburgische Beauftragte für Datenschutz und
        Informationsfreiheit (HmbBfDI).
      </p>
    </LegalLayout>
  );
}
