import type { Metadata } from "next";
import { PostDetail } from "./PostDetail";

// ─── Mock data ────────────────────────────────────────────────────────────────

const mockPost = {
  id: "1",
  type: "empfehlung" as const,
  title: "Familiencafé Hanseplatz, wirklich empfehlenswert",
  body: "Wir waren letzte Woche das erste Mal dort und waren begeistert. Super kinderfreundlich, ruhige Atmosphäre, die Mitarbeiter sind unglaublich geduldig. Es gibt eine kleine Spielecke, Hochstühle und sogar Wickelmöglichkeiten. Das Frühstück ist frisch und nicht überteuert. Definitiv einen Besuch wert, besonders für Familien mit Kleinkindern.",
  author: {
    name: "Julia S.",
    stadtteil: "Eppendorf",
    gradient: "linear-gradient(135deg, #CFDABF 0%, #6F855A 100%)",  // sage 200 → 600
  },
  stadtteil: "Eppendorf",
  created_at: "vor 2 Stunden",
  comment_count: 3,
};

const mockComments = [
  {
    id: "c1",
    author: {
      name: "Markus T.",
      gradient: "linear-gradient(135deg, #C4A882 0%, #A08060 100%)",
    },
    body: "Danke für den Tipp! Wir waren auch schon dort und können das nur bestätigen. Besonders der Garten im Sommer ist toll.",
    created_at: "vor 1 Stunde",
  },
  {
    id: "c2",
    author: {
      name: "Lena B.",
      gradient: "linear-gradient(135deg, #8FB0C8 0%, #5A85A8 100%)",
    },
    body: "Kennt jemand die genaue Adresse? Finde es auf Google Maps nicht auf Anhieb.",
    created_at: "vor 45 Min.",
  },
  {
    id: "c3",
    author: {
      name: "Julia S.",
      gradient: "linear-gradient(135deg, #CFDABF 0%, #6F855A 100%)",  // sage 200 → 600
    },
    body: "Hanseplatz 12, direkt neben dem kleinen Park. Klingelschild Hanseplatz Café. Viel Spaß.",
    created_at: "vor 30 Min.",
  },
];

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  await params;
  return { title: "Beitrag · mapa" };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // In production: fetch post by id from DB. For now, use mock for all ids.
  void id;

  return <PostDetail post={mockPost} comments={mockComments} />;
}
