import { Suspense } from "react";
import { TopNav } from "@/components/app/TopNav";
import { LeftNav } from "@/components/app/LeftNav";
import { RightSidebar } from "@/components/app/RightSidebar";
import { BottomNav } from "@/components/app/BottomNav";
import { createClient } from "@/lib/supabase/server";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  // Only two awaits on the critical path: auth + profile stadtteil.
  // Sidebar data is fetched inside <RightSidebar> behind a Suspense boundary.
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let stadtteil: string | null = null;
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("stadtteil")
      .eq("id", user.id)
      .single();
    stadtteil = profile?.stadtteil ?? null;
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
          {/* Suspense: sidebar fetches its own data without blocking page content */}
          <Suspense fallback={null}>
            <RightSidebar stadtteil={stadtteil} />
          </Suspense>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
