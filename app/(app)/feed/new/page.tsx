import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { NewPostForm } from "./NewPostForm";

export const metadata: Metadata = {
  title: "Neuer Beitrag · mapa",
};

export default async function NewPostPage() {
  let defaultStadtteil: string | undefined;

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("stadtteil")
        .eq("id", user.id)
        .single();

      if (profile?.stadtteil) defaultStadtteil = profile.stadtteil;
    }
  } catch {
    // Non-fatal — stadtteil selector starts empty
  }

  return (
    <main className="form-main-pad">
      <NewPostForm defaultStadtteil={defaultStadtteil} />
    </main>
  );
}
