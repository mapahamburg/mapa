/**
 * MAPA — Kreise query layer (server-only)
 * All functions use the server Supabase client and run in Server Components or Server Actions only.
 */

import { createClient } from "@/lib/supabase/server";
import { timeAgo, feedSection, formatMeetingDate, formatAgeRange } from "@/lib/format";
import type { KreisCard, FeedPost } from "@/types";

function hasSupabase() {
  return (
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder.supabase.co"
  );
}

// ─── List all active Kreise for a stadtteil, with membership info ─────────────

export async function getKreise(stadtteil?: string): Promise<KreisCard[]> {
  if (!hasSupabase()) return [];

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    let query = supabase
      .from("kreise")
      .select(`
        id, name, beschreibung, stadtteil, thema, max_members,
        members:kreis_members ( profile_id, role, status )
      `)
      .eq("status", "active")
      .order("created_at", { ascending: false });

    if (stadtteil) query = query.eq("stadtteil", stadtteil);

    const { data, error } = await query;
    if (error || !data) return [];

    return data.map((k) => {
      const members = (k.members as { profile_id: string; role: string; status: string }[]) ?? [];
      const activeMembers = members.filter((m) => m.status === "active");
      const myMembership = user
        ? activeMembers.find((m) => m.profile_id === user.id)
        : undefined;

      return {
        id:           k.id,
        name:         k.name,
        beschreibung: k.beschreibung,
        stadtteil:    k.stadtteil,
        thema:        k.thema,
        max_members:  k.max_members,
        member_count: activeMembers.length,
        is_member:    !!myMembership,
        my_role:      myMembership?.role as "member" | "host" | undefined,
      };
    });
  } catch {
    return [];
  }
}

// ─── Get kreise the current user belongs to ───────────────────────────────────

export async function getMyKreise(): Promise<KreisCard[]> {
  if (!hasSupabase()) return [];

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from("kreis_members")
      .select(`
        role, status,
        kreis:kreise (
          id, name, beschreibung, stadtteil, thema, max_members,
          members:kreis_members ( profile_id, role, status )
        )
      `)
      .eq("profile_id", user.id)
      .eq("status", "active");

    if (error || !data) return [];

    return data
      .map((row) => {
        const k = row.kreis as {
          id: string; name: string; beschreibung: string | null;
          stadtteil: string; thema: string | null; max_members: number;
          members: { profile_id: string; role: string; status: string }[];
        } | null;
        if (!k) return null;

        const activeMembers = (k.members ?? []).filter((m) => m.status === "active");

        return {
          id:           k.id,
          name:         k.name,
          beschreibung: k.beschreibung,
          stadtteil:    k.stadtteil,
          thema:        k.thema,
          max_members:  k.max_members,
          member_count: activeMembers.length,
          is_member:    true,
          my_role:      row.role as "member" | "host",
        };
      })
      .filter(Boolean) as KreisCard[];
  } catch {
    return [];
  }
}

// ─── Single Kreis detail ──────────────────────────────────────────────────────

export async function getKreis(id: string): Promise<{
  kreis: (KreisCard & { status: string }) | null;
  isMember: boolean;
  isHost: boolean;
}> {
  if (!hasSupabase()) return { kreis: null, isMember: false, isHost: false };

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { data: k, error } = await supabase
      .from("kreise")
      .select(`
        id, name, beschreibung, stadtteil, thema, max_members, status,
        members:kreis_members ( profile_id, role, status )
      `)
      .eq("id", id)
      .single();

    if (error || !k) return { kreis: null, isMember: false, isHost: false };

    const members = (k.members as { profile_id: string; role: string; status: string }[]) ?? [];
    const activeMembers = members.filter((m) => m.status === "active");
    const myMembership = user ? activeMembers.find((m) => m.profile_id === user.id) : undefined;

    return {
      kreis: {
        id:           k.id,
        name:         k.name,
        beschreibung: k.beschreibung,
        stadtteil:    k.stadtteil,
        thema:        k.thema,
        max_members:  k.max_members,
        member_count: activeMembers.length,
        is_member:    !!myMembership,
        my_role:      myMembership?.role as "member" | "host" | undefined,
        status:       k.status,
      },
      isMember: !!myMembership,
      isHost:   myMembership?.role === "host",
    };
  } catch {
    return { kreis: null, isMember: false, isHost: false };
  }
}

// ─── Posts for a Kreis ────────────────────────────────────────────────────────

export async function getKreisPosts(kreisId: string): Promise<FeedPost[]> {
  if (!hasSupabase()) return [];

  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("posts")
      .select(`
        id, type, title, body, stadtteil,
        meeting_location, meeting_date, min_age, max_age, created_at,
        author:profiles!author_id ( first_name ),
        comments:comments ( count )
      `)
      .eq("kreis_id", kreisId)
      .order("created_at", { ascending: false })
      .limit(50);

    if (error || !data) return [];

    return data.map((p) => {
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
        author:   author?.first_name ?? "Mitglied",
        district: p.stadtteil,
        time:     timeAgo(p.created_at),
        section:  feedSection(p.created_at),
        title:    p.title,
        body:     p.body ?? undefined,
        meeting,
        likes:    0,
        comments: parseInt(String(comments?.[0]?.count ?? "0"), 10),
      } satisfies FeedPost;
    });
  } catch {
    return [];
  }
}
