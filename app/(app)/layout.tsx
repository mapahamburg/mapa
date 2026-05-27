import { TopNav } from "@/components/app/TopNav";
import { LeftNav } from "@/components/app/LeftNav";
import { RightSidebar } from "@/components/app/RightSidebar";
import { BottomNav } from "@/components/app/BottomNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "var(--surface-page)", minHeight: "100dvh", fontFamily: "var(--font-ui)", color: "var(--fg)" }}>
      <TopNav />
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "flex-start" }}>
        <div className="app-left-nav">
          <LeftNav />
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
