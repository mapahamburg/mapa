import React from "react";

interface KPICardProps {
  label: string;
  value: string | number;
  trend?: string;
  icon: React.ReactNode;
  accent?: boolean;
}

export function KPICard({ label, value, trend, icon, accent }: KPICardProps) {
  return (
    <div
      style={{
        background: "var(--bg-elevated)",
        border: "1px solid var(--mapa-line)",
        borderRadius: "var(--radius-md, 12px)",
        boxShadow: "var(--shadow-m)",
        padding: "24px",
        display: "flex",
        flexDirection: "column" as const,
        gap: 12,
      }}
    >
      {/* Icon circle */}
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: accent
            ? "var(--mapa-peach-50)"
            : "var(--mapa-sage-50)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: accent ? "var(--mapa-clay-500)" : "var(--mapa-sage-600)",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>

      {/* Value */}
      <div
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: 32,
          fontWeight: 700,
          color: "var(--fg)",
          lineHeight: 1,
          letterSpacing: "-0.02em",
        }}
      >
        {value}
      </div>

      {/* Label + trend row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          flexWrap: "wrap" as const,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: 13,
            color: "var(--fg-subtle)",
          }}
        >
          {label}
        </span>
        {trend && (
          <span
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 11,
              fontWeight: 500,
              color: "var(--mapa-sage-700)",
              background: "var(--mapa-sage-100)",
              padding: "2px 7px",
              borderRadius: "9999px",
              whiteSpace: "nowrap" as const,
            }}
          >
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}
