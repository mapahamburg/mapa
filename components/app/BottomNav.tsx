"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Map, Circle, Calendar, Plus } from "lucide-react";

const NAV_ITEMS = [
  { href: "/feed",            icon: Home,     label: "Feed" },
  { href: "/karte",           icon: Map,      label: "Karte" },
  { href: "/feed/new",        icon: Plus,     label: "Neu",   isPrimary: true },
  { href: "/veranstaltungen", icon: Calendar, label: "Events" },
  { href: "/kreise",          icon: Circle,   label: "Kreise" },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav
      className="bottom-nav"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: "rgba(245, 241, 232, 0.94)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderTop: "1px solid var(--border-soft)",
        paddingBottom: "env(safe-area-inset-bottom, 8px)",
        alignItems: "stretch",
      }}
    >
      {NAV_ITEMS.map(({ href, icon: Icon, label, isPrimary }) => {
        const isActive = pathname === href || (!isPrimary && pathname.startsWith(href + "/"));
        return (
          <Link
            key={href}
            href={href}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 3,
              padding: "10px 0",
              textDecoration: "none",
              color: isPrimary ? "var(--cobalt-500)" : isActive ? "var(--ink)" : "var(--fg-muted)",
            }}
          >
            {isPrimary ? (
              <span style={{
                background: "var(--cobalt-500)",
                color: "#fff",
                borderRadius: 999,
                width: 44,
                height: 44,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <Icon size={20} strokeWidth={1.5} />
              </span>
            ) : (
              <Icon size={22} strokeWidth={isActive ? 2 : 1.5} />
            )}
            <span style={{
              fontFamily: "var(--font-ui)",
              fontSize: 11,
              fontWeight: isActive || isPrimary ? 600 : 400,
              letterSpacing: "0.01em",
            }}>
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
