import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { ReactNode } from "react";

interface LegalLayoutProps {
  eyebrow: string;
  title: string;
  lastUpdated?: string;
  children: ReactNode;
}

export function LegalLayout({ eyebrow, title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <div style={{ background: "var(--surface-page)", minHeight: "100dvh" }}>
      <Nav />
      <main className="legal-main">
        {/* Eyebrow */}
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            letterSpacing: "0.14em",
            textTransform: "uppercase" as const,
            color: "var(--cobalt-500)",
            fontWeight: 500,
            marginBottom: 16,
          }}
        >
          {eyebrow}
        </div>

        {/* Title */}
        <h1
          className="legal-h1"
          style={{
            fontFamily: "var(--font-ui)",
            fontWeight: 700,
            color: "var(--ink)",
            margin: "0 0 12px",
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </h1>

        {/* Last updated */}
        {lastUpdated && (
          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 13,
              color: "var(--ash-600)",
              margin: "0 0 56px",
            }}
          >
            Zuletzt aktualisiert: {lastUpdated}
          </p>
        )}

        {/* Content */}
        <div
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: 16,
            lineHeight: 1.65,
            color: "var(--ink)",
          }}
        >
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
