import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function relativeTime(isoString: string): string {
  const diffMs = Date.now() - new Date(isoString).getTime();
  const diffMin = Math.floor(diffMs / 60_000);
  if (diffMin < 60) return `vor ${diffMin} Min.`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `vor ${diffH} Std.`;
  return "gestern";
}

function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

// ─────────────────────────────────────────────
// KPIs
// ─────────────────────────────────────────────

export async function getAdminKPIs(): Promise<{
  totalMembers: number;
  postsToday: number;
  newFamiliesThisWeek: number;
  avgCommentsPerPost: string;
}> {
  const supabase = await createClient();

  const todayMidnight = new Date();
  todayMidnight.setHours(0, 0, 0, 0);

  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const [
    { count: totalMembers },
    { count: postsToday },
    { count: newFamiliesThisWeek },
    { count: totalComments },
    { count: totalPosts },
  ] = await Promise.all([
    supabase
      .from("profiles")
      .select("*", { count: "exact", head: true }),
    supabase
      .from("posts")
      .select("*", { count: "exact", head: true })
      .gte("created_at", todayMidnight.toISOString()),
    supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .gte("joined_at", sevenDaysAgo.toISOString()),
    supabase
      .from("comments")
      .select("*", { count: "exact", head: true }),
    supabase
      .from("posts")
      .select("*", { count: "exact", head: true }),
  ]);

  const avg =
    totalPosts && totalPosts > 0
      ? ((totalComments ?? 0) / totalPosts).toFixed(1)
      : "0.0";

  return {
    totalMembers: totalMembers ?? 0,
    postsToday: postsToday ?? 0,
    newFamiliesThisWeek: newFamiliesThisWeek ?? 0,
    avgCommentsPerPost: avg,
  };
}

// ─────────────────────────────────────────────
// Stadtteil stats
// ─────────────────────────────────────────────

export async function getStadtteilStats(): Promise<
  Array<{ name: string; members: number; posts: number; host: string | null }>
> {
  const supabase = await createClient();

  const [{ data: profiles }, { data: posts }] = await Promise.all([
    supabase
      .from("profiles")
      .select("stadtteil, is_local_host, first_name"),
    supabase.from("posts").select("stadtteil"),
  ]);

  const statsMap = new Map<
    string,
    { members: number; posts: number; host: string | null }
  >();

  for (const p of profiles ?? []) {
    const entry = statsMap.get(p.stadtteil) ?? {
      members: 0,
      posts: 0,
      host: null,
    };
    entry.members += 1;
    if (p.is_local_host && !entry.host) {
      entry.host = p.first_name;
    }
    statsMap.set(p.stadtteil, entry);
  }

  for (const post of posts ?? []) {
    const entry = statsMap.get(post.stadtteil) ?? {
      members: 0,
      posts: 0,
      host: null,
    };
    entry.posts += 1;
    statsMap.set(post.stadtteil, entry);
  }

  return Array.from(statsMap.entries())
    .map(([name, stats]) => ({ name, ...stats }))
    .sort((a, b) => b.members - a.members);
}

// ─────────────────────────────────────────────
// Local Hosts
// ─────────────────────────────────────────────

export async function getLocalHosts(): Promise<
  Array<{
    id: string;
    name: string;
    stadtteil: string;
    bio: string | null;
    joinedAt: string;
  }>
> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("profiles")
    .select("id, first_name, stadtteil, bio, joined_at")
    .eq("is_local_host", true)
    .order("stadtteil", { ascending: true });

  return (data ?? []).map((row) => ({
    id: row.id,
    name: row.first_name,
    stadtteil: row.stadtteil,
    bio: row.bio,
    joinedAt: formatDate(row.joined_at),
  }));
}

// ─────────────────────────────────────────────
// Recent activity
// ─────────────────────────────────────────────

export async function getRecentActivity(): Promise<
  Array<{ id: string; name: string; action: string; time: string }>
> {
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from("posts")
    .select("id, title, stadtteil, created_at, author_id, profiles(first_name)")
    .order("created_at", { ascending: false })
    .limit(8);

  return (posts ?? []).map((post) => {
    const profile = Array.isArray(post.profiles)
      ? post.profiles[0]
      : post.profiles;
    const firstName =
      (profile as { first_name?: string } | null)?.first_name ?? "Unbekannt";
    return {
      id: post.id,
      name: firstName,
      action: `hat gepostet: ${post.title} · ${post.stadtteil}`,
      time: relativeTime(post.created_at),
    };
  });
}

// ─────────────────────────────────────────────
// Recent members
// ─────────────────────────────────────────────

export async function getRecentMembers(): Promise<
  Array<{ id: string; name: string; stadtteil: string; joinedAt: string }>
> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("profiles")
    .select("id, first_name, stadtteil, joined_at")
    .order("joined_at", { ascending: false })
    .limit(20);

  return (data ?? []).map((row) => ({
    id: row.id,
    name: row.first_name,
    stadtteil: row.stadtteil,
    joinedAt: formatDate(row.joined_at),
  }));
}

// ─────────────────────────────────────────────
// Reports / Moderation queue
// ─────────────────────────────────────────────

const REASON_LABEL: Record<string, string> = {
  spam: "Spam oder Werbung",
  unangemessen: "Unangemessener Inhalt",
  falsch: "Falsche Information",
  fehl_am_platz: "Gehört nicht hierher",
  sonstiges: "Etwas anderes",
};

// Severity ranking by reason (drives the badge in the queue)
const REASON_SEVERITY: Record<string, "HIGH" | "MED" | "LOW"> = {
  unangemessen: "HIGH",
  falsch: "MED",
  spam: "MED",
  fehl_am_platz: "LOW",
  sonstiges: "LOW",
};

export async function getOpenReports(): Promise<
  Array<{
    id: string;
    severity: "HIGH" | "MED" | "LOW";
    reason: string;
    snippet: string;
    reporter: string;
    time: string;
    postId: string | null;
  }>
> {
  // Reads via service role — admin access is gated at the /admin layout layer.
  try {
    const admin = createAdminClient();
    const { data } = await (admin as any)
      .from("reports")
      .select(
        `id, reason, details, status, created_at, post_id,
         post:posts ( title ),
         reporter:profiles!reporter_id ( first_name )`
      )
      .eq("status", "open")
      .order("created_at", { ascending: false })
      .limit(50);

    return (data ?? []).map((r: any) => {
      const postTitle = (r.post as { title: string } | null)?.title ?? "Beitrag gelöscht";
      const reporter = (r.reporter as { first_name: string } | null)?.first_name ?? "Anonym";
      const detail = r.details ? ` · ${r.details}` : "";
      return {
        id: r.id as string,
        severity: REASON_SEVERITY[r.reason] ?? "LOW",
        reason: REASON_LABEL[r.reason] ?? r.reason,
        snippet: `${postTitle}${detail}`,
        reporter,
        time: relativeTime(r.created_at as string),
        postId: r.post_id as string | null,
      };
    });
  } catch {
    return [];
  }
}
