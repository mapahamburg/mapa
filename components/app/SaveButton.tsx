"use client";

import { useState, useTransition } from "react";
import { Bookmark } from "lucide-react";
import { toggleSave } from "@/app/actions/save";

export function SaveButton({ postId, initialSaved }: { postId: string; initialSaved: boolean }) {
  const [saved, setSaved] = useState(initialSaved);
  const [isPending, startTransition] = useTransition();

  function handleClick(e: React.MouseEvent) {
    e.preventDefault(); // prevent any ancestor link from activating
    const next = !saved;
    setSaved(next); // optimistic
    startTransition(async () => {
      const result = await toggleSave(postId, saved);
      if (result.error) setSaved(saved); // revert on error
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      style={{
        marginLeft: "auto",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: "none",
        border: "none",
        padding: 0,
        cursor: isPending ? "default" : "pointer",
        color: saved ? "var(--color-cobalt)" : "var(--color-muted)",
        fontFamily: "var(--font-ui)",
        fontSize: 13,
        transition: "color 150ms ease",
      }}
      aria-label={saved ? "Gespeichert" : "Speichern"}
    >
      <Bookmark
        size={15}
        strokeWidth={1.5}
        fill={saved ? "currentColor" : "none"}
      />
      {saved ? "Gespeichert" : "Speichern"}
    </button>
  );
}
