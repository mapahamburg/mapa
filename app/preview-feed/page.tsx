// Temporäre Preview-Seite — zeigt Feed mit Mock-Daten ohne Auth
import { FeedColumn } from "@/components/app/FeedColumn";
import type { FeedPost } from "@/types";

const MOCK: FeedPost[] = [
  {
    id: "1", type: "frage", section: "heute",
    title: "Kennt jemand einen guten Kinderfriseur in der Schanze oder Eppendorf?",
    body: "Mein Sohn weigert sich seit Monaten. Suche jemanden mit Geduld.",
    author: "Anna", district: "Eppendorf", time: "vor 12 Min",
    comments: 0, likes: 0, isSaved: false,
  },
  {
    id: "2", type: "empfehlung", section: "heute",
    title: "Das Café Knuth in Winterhude — ruhig, kinderfreundlich, kein Gedränge.",
    body: "Hochstühle vorhanden, Spielecke im hinteren Bereich.",
    author: "Mira", district: "Winterhude", time: "vor 34 Min",
    comments: 4, likes: 0, isSaved: false,
  },
  {
    id: "3", type: "treffen", section: "heute",
    title: "Spielplatztreffen am Samstag. Wer kommt mit?",
    body: "",
    author: "Jonas", district: "Eppendorf", time: "vor 1 Std",
    comments: 7, likes: 0, isSaved: false,
    meeting: { where: "Stadtpark", when: "Sa 10:30", age: "2–5 Jahre" },
  },
  {
    id: "4", type: "frage", section: "heute",
    title: "Empfehlung für eine Hebamme mit freien Kapazitäten im August?",
    body: "",
    author: "Lea", district: "Hoheluft", time: "vor 2 Std",
    comments: 2, likes: 0, isSaved: false,
  },
  {
    id: "5", type: "empfehlung", section: "heute",
    title: "Café Knuth in Eppendorf — ruhig, Hochstühle vorhanden, keine Wartezeit.",
    body: "Wir waren gestern mit den Kindern. Spielecke im hinteren Bereich.",
    author: "Mira", district: "Eppendorf", time: "vor 45 Min",
    comments: 4, likes: 0, isSaved: false,
  },
  {
    id: "6", type: "frage", section: "heute",
    title: "Empfehlung für eine Hebamme mit freien Kapazitäten im August?",
    body: "",
    author: "Lea", district: "Eppendorf", time: "vor 2 Std",
    comments: 2, likes: 0, isSaved: false,
  },
  {
    id: "7", type: "suche", section: "woche",
    title: "Suche Dreirad oder Laufrad für 3-Jährigen — gerne gebraucht.",
    body: "",
    author: "Tom", district: "Eppendorf", time: "Mo",
    comments: 1, likes: 0, isSaved: false,
  },
  {
    id: "8", type: "veranstaltung", section: "woche",
    title: "Familienflohmarkt im Stadtpark — Sonntag 10–14 Uhr.",
    body: "",
    author: "Clara", district: "Eppendorf", time: "Di",
    comments: 3, likes: 0, isSaved: false,
  },
  {
    id: "9", type: "empfehlung", section: "woche",
    title: "Kinderarzt Dr. Müller nimmt neue Patienten an.",
    body: "",
    author: "Jana", district: "Eppendorf", time: "Di",
    comments: 6, likes: 0, isSaved: false,
  },
];

export default function PreviewFeed() {
  return (
    <div style={{ background: "var(--color-paper)", minHeight: "100dvh" }}>
      <FeedColumn posts={MOCK} userName="Anna" stadtteil="Eppendorf" />
    </div>
  );
}
