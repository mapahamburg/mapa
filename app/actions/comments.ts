"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

// ─── State type ───────────────────────────────────────────────────────────────

export type CommentState = {
  error?: string;
  message?: string;
};

// ─── Create comment ───────────────────────────────────────────────────────────

export async function createComment(
  _prevState: CommentState,
  formData: FormData
): Promise<CommentState> {
  const post_id = (formData.get("post_id") as string | null)?.trim() ?? "";
  const body = (formData.get("body") as string | null)?.trim() ?? "";

  if (!post_id) return { error: "Beitrag nicht gefunden." };
  if (!body || body.length < 1)
    return { error: "Bitte schreib eine Antwort." };
  if (body.length > 1000)
    return { error: "Die Antwort darf maximal 1000 Zeichen lang sein." };

  // Dev-mode guard: if Supabase env vars are absent, skip DB insert.
  const hasSupabase =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder.supabase.co";

  if (!hasSupabase) {
    // Dev mode without real Supabase: silently succeed.
    revalidatePath(`/feed/${post_id}`);
    return { message: "ok" };
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Bitte melde dich an." };

  const { error } = await supabase.from("comments").insert({
    post_id,
    body,
    author_id: user.id,
  });

  if (error) {
    return {
      error:
        "Antwort konnte nicht gespeichert werden. Bitte versuch es erneut.",
    };
  }

  revalidatePath(`/feed/${post_id}`);
  return { message: "ok" };
}
