import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getKreis, getKreisPosts } from "@/lib/kreise";
import { KreisDetail } from "./KreisDetail";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { kreis } = await getKreis(id);
  return {
    title: kreis ? `${kreis.name} · mapa` : "Kreis · mapa",
  };
}

export default async function KreisPage({ params }: Props) {
  const { id } = await params;

  const [{ kreis, isMember, isHost }, posts] = await Promise.all([
    getKreis(id),
    getKreisPosts(id),
  ]);

  if (!kreis) notFound();

  return <KreisDetail kreis={kreis} posts={posts} isMember={isMember} isHost={isHost} />;
}
