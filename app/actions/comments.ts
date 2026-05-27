"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { Resend } from "resend";

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
  const body    = (formData.get("body")    as string | null)?.trim() ?? "";

  if (!post_id) return { error: "Beitrag nicht gefunden." };
  if (!body || body.length < 1) return { error: "Bitte schreib eine Antwort." };
  if (body.length > 1000) return { error: "Die Antwort darf maximal 1000 Zeichen lang sein." };

  const hasSupabase =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder.supabase.co";

  if (!hasSupabase) {
    revalidatePath(`/feed/${post_id}`);
    return { message: "ok" };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Bitte melde dich an." };

  // ── Get commenter's name ──────────────────────────────────────────────────
  const { data: commenterProfile } = await supabase
    .from("profiles")
    .select("first_name")
    .eq("id", user.id)
    .single();
  const commenterName = commenterProfile?.first_name ?? "Jemand";

  // ── Insert comment ────────────────────────────────────────────────────────
  const { error } = await supabase.from("comments").insert({
    post_id,
    body,
    author_id: user.id,
  });

  if (error) {
    return { error: "Antwort konnte nicht gespeichert werden. Bitte versuch es erneut." };
  }

  revalidatePath(`/feed/${post_id}`);

  // ── Send notification email (non-fatal if it fails) ───────────────────────
  try {
    await sendCommentNotification({ post_id, body, commenterName, commenterId: user.id });
  } catch (e) {
    console.error("Comment notification failed (non-fatal):", e);
  }

  return { message: "ok" };
}

// ─── Notification helper ──────────────────────────────────────────────────────

async function sendCommentNotification({
  post_id,
  body,
  commenterName,
  commenterId,
}: {
  post_id:       string;
  body:          string;
  commenterName: string;
  commenterId:   string;
}) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return;

  const supabase = await createClient();

  // Get post + author info
  const { data: post } = await supabase
    .from("posts")
    .select("title, author_id, author:profiles!author_id(first_name, notify_comments)")
    .eq("id", post_id)
    .single();

  if (!post) return;

  const author = post.author as unknown as { first_name: string; notify_comments: boolean } | null;

  // Don't notify if:
  // - Post author turned off notifications
  // - The commenter IS the post author (own post)
  if (!author?.notify_comments) return;
  if (post.author_id === commenterId) return;

  // Get author's email via admin client
  let authorEmail: string | undefined;
  try {
    const admin = createAdminClient();
    const { data } = await admin.auth.admin.getUserById(post.author_id);
    authorEmail = data?.user?.email;
  } catch {
    return; // Service role not configured — skip silently
  }

  if (!authorEmail) return;

  const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://mapa.hamburg"}/feed/${post_id}`;
  const preview = body.length > 120 ? body.slice(0, 120) + "…" : body;

  const resend = new Resend(resendKey);
  await resend.emails.send({
    from:    "mapa <hey@mapa.hamburg>",
    to:      authorEmail,
    subject: `${commenterName} hat auf deinen Beitrag geantwortet`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;color:#1C1A17;line-height:1.6">
        <p style="font-size:16px">
          <strong>${commenterName}</strong> hat auf deinen Beitrag geantwortet:
        </p>

        <blockquote style="
          margin:16px 0;padding:14px 18px;
          background:#F1ECE2;border-left:3px solid #1B3CF0;
          border-radius:4px;font-size:15px;color:#3A352D
        ">
          ${preview}
        </blockquote>

        <p style="font-size:15px;color:#6B6459">
          Beitrag: <em>${post.title}</em>
        </p>

        <a href="${postUrl}" style="
          display:inline-block;margin-top:8px;
          padding:12px 24px;background:#1B3CF0;color:#fff;
          text-decoration:none;border-radius:999px;
          font-size:15px;font-weight:500
        ">
          Antwort ansehen
        </a>

        <hr style="border:none;border-top:1px solid #E0D8C6;margin:32px 0 16px">
        <p style="font-size:12px;color:#9A9189">
          Du bekommst diese Mail weil du Benachrichtigungen aktiviert hast.<br>
          <a href="${process.env.NEXT_PUBLIC_SITE_URL ?? "https://mapa.hamburg"}/einstellungen"
             style="color:#1B3CF0">Einstellungen ändern</a>
        </p>
      </div>
    `,
  });
}
