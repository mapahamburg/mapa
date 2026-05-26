import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata = {
  title: "Impressum — mapa",
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

export default function ImpressumPage() {
  return (
    <LegalLayout eyebrow="Rechtliches" title="Impressum." lastUpdated="Mai 2026">
      <h2 style={h2Style}>Angaben gemäß § 5 TMG</h2>
      <p style={pStyle}>
        Henry Bigalke
        <br />
        Ludwigstr. 4
        <br />
        20357 Hamburg
      </p>

      <h2 style={h2Style}>Kontakt</h2>
      <p style={pStyle}>E-Mail: hallo@mapa.hamburg</p>

      <h2 style={h2Style}>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p style={pStyle}>
        Henry Bigalke
        <br />
        Ludwigstr. 4
        <br />
        20357 Hamburg
      </p>

      <h2 style={h2Style}>Haftungsausschluss</h2>
      <p style={pStyle}>
        Die Inhalte dieser Seite wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
        Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als
        Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den
        allgemeinen Gesetzen verantwortlich.
      </p>

      <h2 style={h2Style}>Haftung für Links</h2>
      <p style={pStyle}>
        Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
        Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
        Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
        Seiten verantwortlich.
      </p>
    </LegalLayout>
  );
}
