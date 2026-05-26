"use client";

import { useState } from "react";
import {
  Home,
  Map,
  Calendar,
  Users,
  MapPin,
  Bookmark,
  User,
  ChevronDown,
} from "lucide-react";

type NavItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

const NAV_ITEMS: NavItem[] = [
  { id: "feed", label: "Feed", icon: <Home size={16} strokeWidth={1.5} /> },
  { id: "map", label: "Karte", icon: <Map size={16} strokeWidth={1.5} /> },
  { id: "events", label: "Veranstaltungen", icon: <Calendar size={16} strokeWidth={1.5} /> },
  { id: "meetings", label: "Treffen", icon: <Users size={16} strokeWidth={1.5} /> },
  { id: "hosts", label: "Local Hosts", icon: <MapPin size={16} strokeWidth={1.5} /> },
  { id: "saved", label: "Gespeichert", icon: <Bookmark size={16} strokeWidth={1.5} /> },
  { id: "profile", label: "Mein Profil", icon: <User size={16} strokeWidth={1.5} /> },
];

export function LeftNav() {
  const [active, setActive] = useState("feed");

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
      {NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => setActive(item.id)}
          style={{
            background:
              active === item.id ? "var(--surface-card)" : "transparent",
            border: "none",
            padding: "10px 14px",
            borderRadius: 12,
            fontFamily: "var(--font-ui)",
            fontSize: 14,
            fontWeight: active === item.id ? 500 : 400,
            color: active === item.id ? "var(--ink)" : "var(--fg-muted)",
            textAlign: "left",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          {item.icon}
          {item.label}
        </button>
      ))}

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
          background: "var(--forest-100)",
          border: "none",
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
    </nav>
  );
}
