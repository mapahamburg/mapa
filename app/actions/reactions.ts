"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function toggleReaction(postId: string): Promise<{ reacted: boolean }> {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { reacted: false };

  // Check if reaction already exists
  const { data: existing } = await (supabase
    .from("reactions") as any)
    .select("post_id")
    .eq("post_id", postId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (existing) {
    // Remove reaction
    await (supabase.from("reactions") as any)
      .delete()
      .eq("post_id", postId)
      .eq("user_id", user.id);

    revalidatePath(`/feed/${postId}`);
    return { reacted: false };
  } else {
    // Add reaction
    await (supabase.from("reactions") as any)
      .insert({ post_id: postId, user_id: user.id });

    revalidatePath(`/feed/${postId}`);
    return { reacted: true };
  }
}
