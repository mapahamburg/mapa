import { Plus, Bell } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Avatar } from "@/components/ui/Avatar";
import { SearchBar } from "@/components/app/SearchBar";
import { createClient } from "@/lib/supabase/server";

export async function TopNav() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let initial = "?";
  if (user) {
    const { data } = await (supabase as any)
      .from("profiles")
      .select("first_name")
      .eq("id", user.id)
      .single() as { data: { first_name: string } | null };
    if (data?.first_name) initial = data.first_name[0].toUpperCase();
  }
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
      <div className="mob-hide" style={{ flex: 1, minWidth: 0, maxWidth: 480 }}>
        <SearchBar />
      </div>

      <div style={{ flex: 1, minWidth: 0 }} />

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

      {/* Bell — no background/border, flush with avatar */}
      <Link
        href="/benachrichtigungen"
        style={{
          background: "transparent",
          border: "none",
          width: 44,
          height: 44,
          borderRadius: 999,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          flexShrink: 0,
          textDecoration: "none",
          color: "inherit",
        }}
        aria-label="Benachrichtigungen"
      >
        <Bell size={16} strokeWidth={1.5} />
        <span
          style={{
            position: "absolute",
            top: 9,
            right: 10,
            width: 7,
            height: 7,
            borderRadius: 999,
            background: "var(--cobalt-500)",
            border: "1.5px solid var(--surface-card)",
          }}
        />
      </Link>

      <Link href="/profil" style={{ textDecoration: "none", flexShrink: 0 }}>
        <Avatar letter={initial} size={36} />
      </Link>
    </header>
  );
}
