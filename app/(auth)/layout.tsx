import type { ReactNode } from "react";
import { Logo } from "@/components/ui/Logo";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        minHeight: "100dvh",
        backgroundColor: "var(--bg-base)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
      }}
    >
      {/* Logo */}
      <div style={{ marginBottom: "40px" }}>
        <Logo size={32} />
      </div>

      {/* Card */}
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--line)",
          borderRadius: "var(--radius-l)",
          padding: "40px 36px",
          boxShadow: "var(--shadow-m)",
        }}
      >
        {children}
      </div>

      {/* Footer */}
      <p
        style={{
          marginTop: "32px",
          fontSize: "13px",
          color: "var(--fg-subtle)",
          textAlign: "center",
        }}
      >
        Eine Nachbarschafts-Community für Familien in Hamburg.
      </p>
    </div>
  );
}
