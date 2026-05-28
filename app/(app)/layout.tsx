import { TopNav } from "@/components/app/TopNav";
import { LeftNav } from "@/components/app/LeftNav";
import { RightSidebar } from "@/components/app/RightSidebar";
import { BottomNav } from "@/components/app/BottomNav";
import { createClient } from "@/lib/supabase/server";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let stadtteil: string | null = null;
  if (user) {
    const { data } = await (supabase as any)
      .from("profiles")
      .select("stadtteil")
      .eq("id", user.id)
      .single() as { data: { stadtteil: string } | null };
    stadtteil = data?.stadtteil ?? null;
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
          <RightSidebar />
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
