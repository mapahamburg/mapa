"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Map,
  Calendar,
  Users,
  Circle,
  MapPin,
  Bookmark,
  User,
  Settings,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { logout } from "@/app/actions/auth";

type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/feed",           label: "Feed",           icon: <Home     size={16} strokeWidth={1.5} /> },
  { href: "/karte",          label: "Karte",          icon: <Map      size={16} strokeWidth={1.5} /> },
  { href: "/veranstaltungen",label: "Veranstaltungen",icon: <Calendar size={16} strokeWidth={1.5} /> },
  { href: "/treffen",        label: "Treffen",        icon: <Users    size={16} strokeWidth={1.5} /> },
  { href: "/kreise",         label: "Kreise",         icon: <Circle   size={16} strokeWidth={1.5} /> },
  { href: "/hosts",          label: "Local Hosts",    icon: <MapPin   size={16} strokeWidth={1.5} /> },
  { href: "/gespeichert",    label: "Gespeichert",    icon: <Bookmark size={16} strokeWidth={1.5} /> },
  { href: "/profil",         label: "Mein Profil",    icon: <User     size={16} strokeWidth={1.5} /> },
  { href: "/einstellungen",  label: "Einstellungen",  icon: <Settings size={16} strokeWidth={1.5} /> },
];

export function LeftNav() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        width: 240,
        background: "var(--surface-page)",
        padding: "32px 16px",
        borderRight: "1px solid var(--border-soft)",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        position: "sticky",
        top: 65,
        alignSelf: "flex-start",
        height: "calc(100vh - 65px)",
        flexShrink: 0,
      }}
    >
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            style={{
              background: isActive ? "var(--surface-card)" : "transparent",
              border: "none",
              padding: "10px 14px",
              borderRadius: 12,
              fontFamily: "var(--font-ui)",
              fontSize: 14,
              fontWeight: isActive ? 500 : 400,
              color: isActive ? "var(--ink)" : "var(--fg-muted)",
              textAlign: "left",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 12,
              textDecoration: "none",
            }}
          >
            {item.icon}
            {item.label}
          </Link>
        );
      })}

      <div style={{ height: 16 }} />

      {/* Stadtteil picker */}
      <div
        style={{
          fontSize: 11,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          fontWeight: 600,
          color: "var(--fg-subtle)",
          padding: "8px 14px",
          fontFamily: "var(--font-mono)",
        }}
      >
        Dein Stadtteil
      </div>
      <button
        type="button"
        style={{
          background: "var(--color-sunk)",
          border: "1px solid var(--color-line)",
          padding: "12px 14px",
          borderRadius: 12,
          textAlign: "left",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: 999,
            background: "var(--cobalt-500)",
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: "var(--ink)",
            flex: 1,
          }}
        >
          Eppendorf
        </span>
        <ChevronDown size={14} strokeWidth={1.5} color="var(--ash-600)" />
      </button>

      {/* Logout — pushed to bottom */}
      <div style={{ marginTop: "auto", paddingTop: 16, borderTop: "1px solid var(--border-soft)" }}>
        <form action={logout}>
          <button
            type="submit"
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              padding: "10px 14px",
              borderRadius: 12,
              fontFamily: "var(--font-ui)",
              fontSize: 14,
              fontWeight: 400,
              color: "var(--fg-muted)",
              textAlign: "left",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--ink)";
              (e.currentTarget as HTMLElement).style.background = "var(--surface-card)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--fg-muted)";
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
          >
            <LogOut size={16} strokeWidth={1.5} />
            Abmelden
          </button>
        </form>
      </div>
    </nav>
  );
}
