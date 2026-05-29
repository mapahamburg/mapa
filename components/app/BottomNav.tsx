"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Plus, User } from "lucide-react";

const NAV_ITEMS = [
  { href: "/feed",     icon: Home,  label: "Feed" },
  { href: "/treffen",  icon: Users, label: "Treffen" },
  { href: "/feed/new", icon: Plus,  label: "Neu",  isPrimary: true },
  { href: "/profil",   icon: User,  label: "Profil" },
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
        borderTop: "1px solid var(--color-line-soft)",
        paddingBottom: "env(safe-area-inset-bottom, 8px)",
        alignItems: "stretch",
      }}
    >
      {NAV_ITEMS.map(({ href, icon: Icon, label, isPrimary }) => {
        const isActive =
          pathname === href ||
          (!isPrimary && href !== "/feed" && pathname.startsWith(href + "/")) ||
          (!isPrimary && href === "/feed" && (pathname === "/feed" || (pathname.startsWith("/feed/") && !pathname.startsWith("/feed/new"))));
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
              color: isPrimary
                ? "var(--color-cobalt)"
                : isActive
                ? "var(--color-ink)"
                : "var(--color-muted)",
            }}
          >
            <Icon
              size={22}
              strokeWidth={isPrimary ? 1.5 : isActive ? 2 : 1.5}
              color={isPrimary ? "var(--color-cobalt)" : "inherit"}
            />
            <span
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: 11,
                fontWeight: isActive || isPrimary ? 600 : 400,
                letterSpacing: "0.01em",
              }}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
