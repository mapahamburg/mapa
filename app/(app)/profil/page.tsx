import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProfilePage } from "./ProfilePage";

export const metadata = { title: "Mein Profil · mapa" };

export default async function ProfilPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await (supabase as any)
    .from("profiles")
    .select("id, first_name, stadtteil, bio, can_help_with, looking_for, interests, joined_at")
    .eq("id", user.id)
    .single() as {
      data: {
        id:            string;
        first_name:    string;
        stadtteil:     string;
        bio:           string | null;
        can_help_with: string[];
        looking_for:   string[];
        interests:     string[];
        joined_at:     string;
      } | null;
    };

  if (!profile) redirect("/onboarding");

  const { data: posts } = await supabase
    .from("posts")
    .select("id, type, title, created_at, stadtteil")
    .eq("author_id", user.id)
    .order("created_at", { ascending: false })
    .limit(10) as {
      data: {
        id:         string;
        type:       string;
        title:      string;
        created_at: string;
        stadtteil:  string;
      }[] | null;
    };

  return (
    <main style={{ flex: 1, padding: "40px 48px" }}>
      <ProfilePage profile={profile} posts={posts ?? []} />
    </main>
  );
}
