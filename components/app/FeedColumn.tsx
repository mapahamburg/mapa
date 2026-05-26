"use client";

import { useState } from "react";
import { SmartPost, type Post } from "@/components/app/PostCard";

const DISTRICTS = [
  "Alle Stadtteile",
  "Eppendorf",
  "Winterhude",
  "Ottensen",
  "Eimsbüttel",
  "Sternschanze",
  "Altona",
  "Hoheluft",
];

const POSTS: Post[] = [
  {
    id: 1, type: "empfehlung", author: "Lina", district: "Eppendorf",
    time: "vor 2 Std", section: "heute",
    title: "DeliKate in der Schubackstraße ist ein echter Treffer.",
    body: "Direkt am Hayns Park und beim Kinderplanschbecken. Wickeltisch, Hochstühle, ruhiger Hintergrund, und der Cappuccino ist auch noch gut. Wir waren letzte Woche da und hatten einen entspannten Vormittag.",
    likes: 12, comments: 6,
  },
  {
    id: 2, type: "treffen", author: "Mira", district: "Winterhude",
    time: "vor 4 Std", section: "heute",
    title: "Spielplatztreffen am Samstag. Wer kommt mit?",
    body: "Wir treffen uns ab 10:30 am großen Spielplatz im Stadtpark. Kaffee und Kuchen bringen wir mit.",
    meeting: { where: "Stadtpark Winterhude", when: "Sa 25. Mai · 10:30", age: "2–4 Jahre" },
    likes: 24, comments: 11,
  },
  {
    id: 3, type: "frage", author: "Jonas", district: "Ottensen",
    time: "vor 6 Std", section: "heute",
    title: "Kennt jemand eine ruhige Hebamme im Westen?",
    likes: 4, comments: 8,
  },
  {
    id: 10, type: "suche", author: "Anna", district: "Eimsbüttel",
    time: "vor 7 Std", section: "heute",
    title: "Suche Babysitter für nächsten Freitag, 18–22 Uhr.",
    likes: 2, comments: 3,
  },
  {
    id: 4, type: "empfehlung", author: "Sarah", district: "Eimsbüttel",
    time: "gestern", section: "woche",
    title: "Kursempfehlung: Babyschwimmen im Bartholomäus-Bad",
    body: "Sehr kleine Gruppen, super Trainerin (Anke). Wartelistenstart immer Anfang des Quartals.",
    likes: 18, comments: 4,
  },
  {
    id: 5, type: "veranstaltung", author: "Tim", district: "Winterhude",
    time: "gestern", section: "woche",
    title: "Kinderflohmarkt im Goldbekhaus, Samstag",
    body: "10:00 bis 14:00, Eintritt frei. Verkaufsstand kann man noch buchen.",
    meeting: { where: "Goldbekhaus", when: "Sa 25. Mai · 10:00" },
    likes: 9, comments: 2,
  },
  {
    id: 6, type: "frage", author: "Nina", district: "Eppendorf",
    time: "gestern", section: "woche",
    title: "Wo bekommt ihr eure Kinderschuhe? Erste Schuhe stehen an.",
    likes: 7, comments: 14,
  },
  {
    id: 7, type: "empfehlung", author: "Tom", district: "Sternschanze",
    time: "vor 2 Tagen", section: "woche",
    title: "Familienarzt Dr. Berthold nimmt wieder Kinder auf.",
    body: "Sehr ruhige Praxis, keine langen Wartezeiten. Anmeldung über die Webseite.",
    likes: 22, comments: 5,
  },
  {
    id: 8, type: "treffen", author: "Katja", district: "Hoheluft",
    time: "vor 2 Tagen", section: "woche",
    title: "Tragetuchtreff jeden Donnerstag.",
    body: "Wir treffen uns regelmäßig im Café Mira, alle willkommen die mehr lernen wollen.",
    meeting: { where: "Café Mira, Hoheluftchaussee", when: "Do 15:00, wöchentlich" },
    likes: 14, comments: 6,
  },
  {
    id: 9, type: "frage", author: "Rebecca", district: "Altona",
    time: "vor 3 Tagen", section: "woche",
    title: "Welche Kita habt ihr in Altona und wart ihr zufrieden?",
    likes: 11, comments: 27,
  },
  {
    id: 11, type: "empfehlung", author: "Sophia", district: "Winterhude",
    time: "vor 4 Tagen", section: "woche",
    title: "Bücherei Winterhude hat einen neuen Krabbelraum.",
    body: "Sehr nett gemacht, viele Bücher zum Anfassen für die Kleinen. Auch eine Stillecke gibt es.",
    likes: 16, comments: 3,
  },
];

function SectionHeader({ children, action }: { children: React.ReactNode; action?: string }) {
  return (
    <div
      style={{
        padding: "32px 0 14px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span
        style={{
          fontSize: 11,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          fontWeight: 600,
          color: "var(--fg-muted)",
        }}
      >
        {children}
      </span>
      {action && (
        <span
          style={{
            fontSize: 13,
            color: "var(--mapa-sage-700)",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          {action}
        </span>
      )}
    </div>
  );
}

export function FeedColumn() {
  const [district, setDistrict] = useState("Alle Stadtteile");

  const visible =
    district === "Alle Stadtteile"
      ? POSTS
      : POSTS.filter((p) => p.district === district);

  const heute = visible.filter((p) => p.section === "heute");
  const woche = visible.filter((p) => p.section === "woche");

  return (
    <main style={{ flex: 1, padding: "32px 36px", minWidth: 0 }}>
      {/* Greeting */}
      <div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 36,
            letterSpacing: "-0.025em",
            lineHeight: 1.05,
          }}
        >
          Hallo Lina.
        </div>
        <div
          style={{ fontSize: 15, color: "var(--fg-muted)", marginTop: 4 }}
        >
          Heute neu in deinem Stadtteil.
        </div>
      </div>

      {/* District filter */}
      <div
        style={{ display: "flex", gap: 8, marginTop: 22, flexWrap: "wrap" }}
      >
        {DISTRICTS.map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setDistrict(d)}
            style={{
              background:
                district === d ? "var(--mapa-ink)" : "var(--mapa-ivory)",
              color: district === d ? "var(--mapa-paper)" : "var(--fg)",
              border: district === d ? "none" : "1px solid var(--border)",
              padding: "7px 14px",
              borderRadius: 999,
              fontFamily: "var(--font-ui)",
              fontSize: 13,
              fontWeight: district === d ? 500 : 400,
              cursor: "pointer",
              transition: `background var(--dur-base), color var(--dur-base)`,
            }}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Heute */}
      {heute.length > 0 && <SectionHeader>Heute</SectionHeader>}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {heute.map((p) => (
          <SmartPost key={p.id} post={p} />
        ))}
      </div>

      {/* Diese Woche */}
      {woche.length > 0 && (
        <SectionHeader action="Älter ansehen">Diese Woche</SectionHeader>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {woche.map((p) => (
          <SmartPost key={p.id} post={p} />
        ))}
      </div>

      {/* End of feed */}
      <div style={{ textAlign: "center", padding: "48px 0 16px" }}>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 18,
            color: "var(--fg-muted)",
            letterSpacing: "-0.01em",
          }}
        >
          Das war&apos;s für jetzt.
        </div>
        <div
          style={{ fontSize: 13, color: "var(--fg-subtle)", marginTop: 8 }}
        >
          Schau später wieder vorbei. Es kommen täglich neue Beiträge.
        </div>
      </div>
    </main>
  );
}
