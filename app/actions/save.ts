"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function toggleSave(postId: string, currentlySaved: boolean): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Nicht eingeloggt." };

  if (currentlySaved) {
    await (supabase as any)
      .from("saved_posts")
      .delete()
      .eq("user_id", user.id)
      .eq("post_id", postId);
  } else {
    await (supabase as any)
      .from("saved_posts")
      .insert({ user_id: user.id, post_id: postId });
  }

  revalidatePath("/gespeichert");
  return {};
}
