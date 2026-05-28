"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export function SearchBar({ initialQuery = "" }: { initialQuery?: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = inputRef.current?.value.trim() ?? "";
    if (!q) return;
    router.push(`/suche?q=${encodeURIComponent(q)}`);
    inputRef.current?.blur();
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: "var(--surface-card)",
        border: "1px solid var(--border)",
        borderRadius: 999,
        padding: "8px 16px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Search size={15} strokeWidth={1.5} style={{ flexShrink: 0, color: "var(--fg-muted)" }} />
      <input
        ref={inputRef}
        name="q"
        type="text"
        defaultValue={initialQuery}
        placeholder="Suche im Stadtteil …"
        style={{
          flex: 1,
          background: "none",
          border: "none",
          outline: "none",
          fontFamily: "var(--font-ui)",
          fontSize: 13.5,
          color: "var(--ink)",
          minWidth: 0,
        }}
      />
    </form>
  );
}
