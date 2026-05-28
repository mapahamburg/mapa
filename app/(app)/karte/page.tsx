import type { Metadata } from "next";
import { getFeedPosts } from "@/lib/feed";
import { KarteLoader } from "./KarteLoader";

export const metadata: Metadata = {
  title: "Karte · mapa",
};

export default async function KartePage() {
  const posts = await getFeedPosts();
  return <KarteLoader posts={posts} />;
}
