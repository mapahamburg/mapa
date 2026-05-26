import { FeedColumn } from "@/components/app/FeedColumn";
import { getFeedPosts } from "@/lib/feed";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Feed · mapa",
};

export default async function FeedPage() {
  // Fetch posts and current user name in parallel
  const [posts, supabase] = await Promise.all([
    getFeedPosts(),
    createClient(),
  ]);

  // Get logged-in user's first name for the greeting
  let userName = "du";
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("first_name")
        .eq("id", user.id)
        .single();

      if (profile?.first_name) userName = profile.first_name;
    }
  } catch {
    // Non-fatal — greeting falls back to "du"
  }

  return <FeedColumn posts={posts} userName={userName} />;
}
