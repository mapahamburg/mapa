"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  MapPin,
  Users,
  TriangleAlert,
  Shield,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";

type NavItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard size={16} strokeWidth={1.5} />,
    href: "/admin",
  },
  {
    id: "stadtteile",
    label: "Stadtteile",
    icon: <MapPin size={16} strokeWidth={1.5} />,
    href: "/admin/stadtteile",
  },
  {
    id: "nutzer",
    label: "Nutzer",
    icon: <Users size={16} strokeWidth={1.5} />,
    href: "/admin/nutzer",
  },
  {
    id: "berichte",
    label: "Berichte",
    icon: <TriangleAlert size={16} strokeWidth={1.5} />,
    href: "/admin/berichte",
  },
  {
    id: "hosts",
    label: "Local Hosts",
    icon: <Shield size={16} strokeWidth={1.5} />,
    href: "/admin/hosts",
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: 220,
        background: "var(--mapa-ivory)",
        borderRight: "1px solid var(--mapa-line)",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "sticky",
        top: 0,
        flexShrink: 0,
      }}
    >
      {/* Logo + eyebrow */}
      <div style={{ marginBottom: 32 }}>
        <Logo size={22} geist />
        <div
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
            fontWeight: 600,
            color: "var(--mapa-sage-600)",
            marginTop: 4,
          }}
        >
          Admin
        </div>
      </div>

      {/* Nav items */}
      <nav style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.id}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 12px",
                borderRadius: 8,
                background: isActive ? "var(--mapa-sage-50)" : "transparent",
                color: isActive ? "var(--mapa-sage-700)" : "var(--fg-muted)",
                fontFamily: "var(--font-ui)",
                fontSize: 14,
                fontWeight: isActive ? 500 : 400,
                textDecoration: "none",
                transition: "background 120ms ease",
              }}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom footnote */}
      <div
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: 11,
          color: "var(--fg-subtle)",
          paddingTop: 16,
          borderTop: "1px solid var(--mapa-line)",
        }}
      >
        Intern, nicht öffentlich
      </div>
    </aside>
  );
}
