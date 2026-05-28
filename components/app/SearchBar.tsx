"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export function SearchBar({ initialQuery = "" }: { initialQuery?: string }) {
  const [value, setValue] = useState(initialQuery);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = value.trim();
    if (!q) return;
    router.push(`/suche?q=${encodeURIComponent(q)}`);
    inputRef.current?.blur();
  }

  return (
    <form onSubmit={handleSubmit} style={{ flex: 1, maxWidth: 480 }}>
      <div
        style={{
          background: "var(--surface-card)",
          border: "1px solid var(--border)",
          borderRadius: 999,
          padding: "8px 16px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          color: "var(--fg-muted)",
          fontSize: 13.5,
          transition: "border-color 150ms ease",
        }}
        onFocus={(e) =>
          (e.currentTarget.style.borderColor = "var(--ink)")
        }
        onBlur={(e) =>
          (e.currentTarget.style.borderColor = "var(--border)")
        }
      >
        <Search size={15} strokeWidth={1.5} style={{ flexShrink: 0 }} />
        <input
          ref={inputRef}
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Suche im Stadtteil …"
          style={{
            flex: 1,
            background: "none",
            border: "none",
            outline: "none",
            fontFamily: "var(--font-ui)",
            fontSize: 13.5,
            color: "var(--ink)",
          }}
        />
      </div>
    </form>
  );
}
