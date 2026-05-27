/**
 * MAPA — Feed query layer (server-only)
 * All functions use the server Supabase client and run in Server Components
 * or Server Actions only. Never import this file from "use client" code.
 */

import { createClient } from "@/lib/supabase/server";
import { timeAgo, feedSection, formatMeetingDate, formatAgeRange } from "@/lib/format";
import type { FeedPost, PostDetail, CommentItem } from "@/types";

// ─── Guard ─────────────────────────────────────────────────────────────────────

function hasSupabase() {
  return (
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder.supabase.co"
  );
}

// ─── Feed list ────────────────────────────────────────────────────────────────

/**
 * Fetch the last 7 days of posts, newest first, with author name +
 * comment count. Returns [] if Supabase is not configured.
 */
export async function getFeedPosts(): Promise<FeedPost[]> {
  if (!hasSupabase()) return [];

  try {
    const supabase = await createClient();

    const sevenDaysAgo = new Date(
      Date.now() - 7 * 24 * 60 * 60 * 1000
    ).toISOString();

    const { data, error } = await supabase
      .from("posts")
      .select(
        `id, type, title, body, stadtteil,
         meeting_location, meeting_date, min_age, max_age, created_at,
         author:profiles!author_id ( first_name ),
         comments:comments ( count )`
      )
      .gte("created_at", sevenDaysAgo)
      .order("created_at", { ascending: false })
      .limit(60);

    if (error || !data) return [];

    return data.map((p) => {
      // PostgREST embeds author as object, comments as [{ count: "N" }]
      const author   = p.author   as { first_name: string }        | null;
      const comments = p.comments as { count: number | string }[] | null;

      const meeting =
        p.meeting_location || p.meeting_date
          ? {
              where: p.meeting_location ?? "",
              when:  p.meeting_date ? formatMeetingDate(p.meeting_date) : "",
              age:   formatAgeRange(p.min_age, p.max_age),
            }
          : undefined;

      return {
        id:       p.id,
        type:     p.type,
        author:   author?.first_name ?? "Nachbar",
        district: p.stadtteil,
        time:     timeAgo(p.created_at),
        section:  feedSection(p.created_at),
        title:    p.title,
        body:     p.body ?? undefined,
        meeting,
        likes:    0,                                              // no likes table yet
        comments: parseInt(String(comments?.[0]?.count ?? "0"), 10),
      } satisfies FeedPost;
    });
  } catch {
    return [];
  }
}

// ─── Post detail ──────────────────────────────────────────────────────────────

/**
 * Fetch a single post with full details + all comments.
 * Returns null for the post if not found or Supabase unavailable.
 */
export async function getPostWithComments(id: string): Promise<{
  post: PostDetail | null;
  comments: CommentItem[];
  userHasReacted: boolean;
}> {
  if (!hasSupabase()) return { post: null, comments: [], userHasReacted: false };

  try {
    const supabase = await createClient();

    // Get current user for reaction check (non-fatal if unauthenticated)
    const { data: { user } } = await supabase.auth.getUser();

    const [postRes, commentsRes, reactionRes] = await Promise.all([
      supabase
        .from("posts")
        .select(
          `id, type, title, body, stadtteil,
           meeting_location, meeting_date, min_age, max_age, created_at,
           author:profiles!author_id ( first_name )`
        )
        .eq("id", id)
        .single(),

      supabase
        .from("comments")
        .select(
          `id, body, created_at,
           author:profiles!author_id ( first_name )`
        )
        .eq("post_id", id)
        .order("created_at", { ascending: true }),

      // Check if current user has already reacted
      user
        ? (supabase.from("reactions") as any)
            .select("post_id")
            .eq("post_id", id)
            .eq("user_id", user.id)
            .maybeSingle()
        : Promise.resolve({ data: null }),
    ]);

    if (postRes.error || !postRes.data) return { post: null, comments: [], userHasReacted: false };

    const p      = postRes.data;
    const pAuthor = p.author as { first_name: string } | null;

    const post: PostDetail = {
      id:               p.id,
      type:             p.type,
      title:            p.title,
      body:             p.body ?? undefined,
      author_name:      pAuthor?.first_name ?? "Nachbar",
      stadtteil:        p.stadtteil,
      created_at:       timeAgo(p.created_at),
      meeting_location: p.meeting_location ?? undefined,
      meeting_date:     p.meeting_date
                          ? formatMeetingDate(p.meeting_date)
                          : undefined,
      min_age:          p.min_age ?? undefined,
      max_age:          p.max_age ?? undefined,
    };

    const comments: CommentItem[] = (commentsRes.data ?? []).map((c) => {
      const cAuthor = c.author as { first_name: string } | null;
      return {
        id:          c.id,
        author_name: cAuthor?.first_name ?? "Nachbar",
        body:        c.body,
        created_at:  timeAgo(c.created_at),
      };
    });

    return { post, comments, userHasReacted: !!reactionRes.data };
  } catch {
    return { post: null, comments: [], userHasReacted: false };
  }
}
