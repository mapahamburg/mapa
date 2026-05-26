import { Search, Plus, Bell } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Avatar } from "@/components/ui/Avatar";

export function TopNav() {
  return (
    <header
      style={{
        background: "rgba(242, 235, 222, 0.92)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderBottom: "1px solid var(--border-soft)",
        padding: "14px 32px",
        display: "flex",
        alignItems: "center",
        gap: 24,
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <Logo size={22} />

      {/* Search */}
      <div
        style={{
          flex: 1,
          maxWidth: 480,
          background: "var(--mapa-ivory)",
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
        Suche im Viertel …
      </div>

      <div style={{ flex: 1 }} />

      {/* New post CTA */}
      <Link
        href="/feed/new"
        style={{
          background: "var(--mapa-clay-500)",
          color: "var(--mapa-paper)",
          border: "none",
          padding: "8px 16px",
          borderRadius: 999,
          fontFamily: "var(--font-ui)",
          fontSize: 13.5,
          fontWeight: 500,
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
          background: "var(--mapa-ivory)",
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
            background: "var(--mapa-clay-500)",
            border: "1.5px solid var(--mapa-ivory)",
          }}
        />
      </button>

      <Avatar letter="L" size={36} />
    </header>
  );
}
