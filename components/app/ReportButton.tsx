"use client";

import { useState } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Flag, Check } from "lucide-react";
import { reportPost, type ReportState } from "@/app/actions/reports";

const REASONS: { value: string; label: string }[] = [
  { value: "spam", label: "Spam oder Werbung" },
  { value: "unangemessen", label: "Unangemessener Inhalt" },
  { value: "falsch", label: "Falsche oder irreführende Information" },
  { value: "fehl_am_platz", label: "Gehört nicht hierher" },
  { value: "sonstiges", label: "Etwas anderes" },
];

function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        background: pending ? "var(--color-cobalt-soft)" : "var(--color-cobalt)",
        color: pending ? "var(--color-muted)" : "#fff",
        border: "none",
        borderRadius: 999,
        padding: "9px 18px",
        fontFamily: "var(--font-ui)",
        fontSize: 13,
        fontWeight: 500,
        cursor: pending ? "default" : "pointer",
      }}
    >
      {pending ? "Wird gesendet…" : "Melden"}
    </button>
  );
}

export function ReportButton({ postId }: { postId: string }) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [state, formAction] = useActionState<ReportState, FormData>(reportPost, {});

  if (state.success) {
    return (
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontFamily: "var(--font-ui)",
          fontSize: 13,
          color: "var(--color-sage-ink)",
        }}
      >
        <Check size={15} strokeWidth={1.5} />
        Danke, wir schauen uns das an.
      </div>
    );
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "4px 0",
          fontFamily: "var(--font-ui)",
          fontSize: 13,
          color: "var(--color-subtle)",
        }}
      >
        <Flag size={14} strokeWidth={1.5} />
        Beitrag melden
      </button>
    );
  }

  return (
    <form
      action={formAction}
      style={{
        background: "var(--color-ivory)",
        border: "1px solid var(--color-line)",
        borderRadius: 14,
        padding: 18,
        maxWidth: 420,
      }}
    >
      <input type="hidden" name="post_id" value={postId} />

      <div
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: 14,
          fontWeight: 600,
          color: "var(--color-ink)",
          marginBottom: 12,
        }}
      >
        Was stimmt nicht?
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
        {REASONS.map((r) => (
          <label
            key={r.value}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontFamily: "var(--font-ui)",
              fontSize: 14,
              color: "var(--color-ink-2)",
              cursor: "pointer",
            }}
          >
            <input
              type="radio"
              name="reason"
              value={r.value}
              checked={reason === r.value}
              onChange={() => setReason(r.value)}
              style={{ accentColor: "var(--color-cobalt)" }}
            />
            {r.label}
          </label>
        ))}
      </div>

      <textarea
        name="details"
        rows={2}
        maxLength={500}
        placeholder="Noch etwas dazu? (wenn du magst)"
        style={{
          width: "100%",
          background: "var(--color-paper)",
          border: "1px solid var(--color-line)",
          borderRadius: 10,
          padding: "10px 12px",
          fontFamily: "var(--font-ui)",
          fontSize: 13.5,
          color: "var(--color-ink)",
          outline: "none",
          resize: "vertical",
          boxSizing: "border-box",
          marginBottom: 14,
        }}
      />

      {state.error && (
        <p style={{ fontFamily: "var(--font-ui)", fontSize: 13, color: "var(--color-danger)", margin: "0 0 12px" }}>
          {state.error}
        </p>
      )}

      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <SubmitBtn />
        <button
          type="button"
          onClick={() => setOpen(false)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "var(--font-ui)",
            fontSize: 13,
            color: "var(--color-subtle)",
          }}
        >
          Abbrechen
        </button>
      </div>

      <p
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: 12,
          color: "var(--color-subtle)",
          lineHeight: 1.5,
          margin: "12px 0 0",
        }}
      >
        Meldungen sind anonym. Ein Local Host oder das Team schaut sich das an.
      </p>
    </form>
  );
}
