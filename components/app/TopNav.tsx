import { Search, Plus, Bell } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Avatar } from "@/components/ui/Avatar";

export function TopNav() {
  return (
    <header
      className="top-nav-pad"
      style={{
        background: "rgba(241, 236, 226, 0.92)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderBottom: "1px solid var(--border-soft)",
        display: "flex",
        alignItems: "center",
        gap: 24,
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
        <Logo size={22} lockup />
      </Link>

      {/* Search */}
      <div className="mob-hide" style={{ flex: 1, maxWidth: 480 }}>
        <div
          style={{
            background: "var(--surface-card)",
            border: "1px solid var(--border)",
            borderRadius: 999,
            padding: "8px 16px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            color: "var(--fg-muted)",
            fontSize: 13.5,
          }}
        >
          <Search size={15} strokeWidth={1.5} />
          Suche im Stadtteil …
        </div>
      </div>

      <div style={{ flex: 1 }} />

      {/* New post CTA — hidden on mobile (BottomNav handles it) */}
      <Link
        href="/feed/new"
        className="topnav-post-btn mob-hide"
        style={{
          background: "var(--cobalt-500)",
          color: "#fff",
          border: "none",
          borderRadius: 999,
          fontFamily: "var(--font-ui)",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          whiteSpace: "nowrap",
          flexShrink: 0,
          textDecoration: "none",
        }}
      >
        <Plus size={14} strokeWidth={1.5} /> Neuer Beitrag
      </Link>

      {/* Bell */}
      <button
        type="button"
        style={{
          background: "var(--surface-card)",
          border: "1px solid var(--border)",
          width: 36,
          height: 36,
          borderRadius: 999,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          flexShrink: 0,
        }}
      >
        <Bell size={16} strokeWidth={1.5} />
        <span
          style={{
            position: "absolute",
            top: 6,
            right: 7,
            width: 7,
            height: 7,
            borderRadius: 999,
            background: "var(--cobalt-500)",
            border: "1.5px solid var(--surface-card)",
          }}
        />
      </button>

      <Avatar letter="L" size={36} />
    </header>
  );
}
