import { FeedColumn } from "@/components/app/FeedColumn";
import { getFeedPosts } from "@/lib/feed";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Feed · mapa",
};

export default async function FeedPage() {
  let userName = "du";
  let stadtteil = "Hamburg";
  let host: { id: string; name: string; bio: string | null } | undefined;

  // Posts + auth run in parallel — neither depends on the other
  const supabase = await createClient();
  const [posts, { data: { user } }] = await Promise.all([
    getFeedPosts(),
    supabase.auth.getUser(),
  ]);

  try {
    if (user) {
      // Profile fetch — needs user.id
      const { data: profile } = await supabase
        .from("profiles")
        .select("first_name, stadtteil")
        .eq("id", user.id)
        .single();

      if (profile?.first_name) userName = profile.first_name;
      if (profile?.stadtteil) stadtteil = profile.stadtteil;

      // Host fetch — needs stadtteil from profile
      if (profile?.stadtteil) {
        const { data: hostProfile } = await supabase
          .from("profiles")
          .select("id, first_name, bio")
          .eq("stadtteil", profile.stadtteil)
          .eq("is_local_host", true)
          .limit(1)
          .single();

        if (hostProfile?.first_name) {
          host = { id: hostProfile.id, name: hostProfile.first_name, bio: hostProfile.bio ?? null };
        }
      }
    }
  } catch {
    // Non-fatal — falls back to defaults
  }

  return <FeedColumn posts={posts} userName={userName} stadtteil={stadtteil} host={host} />;
}
