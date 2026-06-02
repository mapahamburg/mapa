import { TopNav } from "@/components/app/TopNav";
import { LeftNav } from "@/components/app/LeftNav";
import { RightSidebar, type SidebarHost, type SidebarTreffen, type SidebarStats } from "@/components/app/RightSidebar";
import { BottomNav } from "@/components/app/BottomNav";
import { createClient } from "@/lib/supabase/server";

function formatDate(iso: string | null): { day: string; month: string } | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (isNaN(d.getTime())) return null;
  return {
    day: d.getDate().toString(),
    month: d.toLocaleDateString("de-DE", { month: "short" }),
  };
}

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let stadtteil: string | null = null;
  let host: SidebarHost | undefined;
  let treffen: SidebarTreffen[] = [];
  let stats: SidebarStats | undefined;

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("stadtteil")
      .eq("id", user.id)
      .single();

    stadtteil = profile?.stadtteil ?? null;

    if (stadtteil) {
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

      const [hostRes, treffenRes, membersRes, newMembersRes] = await Promise.all([
        supabase
          .from("profiles")
          .select("id, first_name, stadtteil, bio")
          .eq("stadtteil", stadtteil)
          .eq("is_local_host", true)
          .limit(1)
          .single(),
        supabase
          .from("posts")
          .select("id, title, meeting_date, meeting_location, created_at")
          .eq("stadtteil", stadtteil)
          .in("type", ["treffen", "veranstaltung"])
          .gte("created_at", weekAgo)
          .order("meeting_date", { ascending: true, nullsFirst: false })
          .limit(3),
        supabase
          .from("profiles")
          .select("*", { count: "exact", head: true })
          .eq("stadtteil", stadtteil),
        supabase
          .from("profiles")
          .select("*", { count: "exact", head: true })
          .eq("stadtteil", stadtteil)
          .gte("joined_at", weekAgo),
      ]);

      if (hostRes.data?.first_name) {
        host = {
          id: hostRes.data.id,
          name: hostRes.data.first_name,
          stadtteil: hostRes.data.stadtteil,
          bio: hostRes.data.bio ?? null,
        };
      }

      if (treffenRes.data) {
        treffen = treffenRes.data.map((p) => {
          const dateStr = p.meeting_date ?? p.created_at;
          const fmt = formatDate(dateStr);
          return {
            id: p.id,
            title: p.title,
            day: fmt?.day ?? "?",
            month: fmt?.month ?? "?",
            where: p.meeting_location ?? null,
          };
        });
      }

      stats = {
        stadtteil,
        members: membersRes.count ?? 0,
        newThisWeek: newMembersRes.count ?? 0,
      };
    }
  }

  return (
    <div style={{ background: "var(--surface-page)", minHeight: "100dvh", fontFamily: "var(--font-ui)", color: "var(--fg)" }}>
      <TopNav />
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "flex-start" }}>
        <div className="app-left-nav">
          <LeftNav stadtteil={stadtteil} />
        </div>
        {children}
        <div className="app-right-sb" style={{ paddingRight: 32 }}>
          <RightSidebar host={host} treffen={treffen} stats={stats} />
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
