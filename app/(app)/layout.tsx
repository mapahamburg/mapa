import { TopNav } from "@/components/app/TopNav";
import { LeftNav } from "@/components/app/LeftNav";
import { RightSidebar } from "@/components/app/RightSidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "var(--mapa-cream)",
        minHeight: "100dvh",
        fontFamily: "var(--font-ui)",
        color: "var(--fg)",
      }}
    >
      <TopNav />
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <LeftNav />
        {children}
        <div style={{ paddingRight: 32 }}>
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}
