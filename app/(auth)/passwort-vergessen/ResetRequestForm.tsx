"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { resetPassword } from "@/app/actions/auth";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        width: "100%",
        padding: "14px 24px",
        backgroundColor: pending ? "var(--cobalt-200)" : "var(--cobalt-500)",
        color: "#fff",
        border: "none",
        borderRadius: "var(--radius-m)",
        fontFamily: "var(--font-ui)",
        fontSize: "15px",
        fontWeight: 500,
        cursor: pending ? "not-allowed" : "pointer",
        transition: "background-color 150ms ease, transform 120ms ease",
      }}
      onMouseDown={(e) => {
        if (!pending)
          (e.currentTarget as HTMLElement).style.transform = "scale(0.98)";
      }}
      onMouseUp={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "";
      }}
    >
      {pending ? "Link wird gesendet..." : "Link senden"}
    </button>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  backgroundColor: "var(--bg-base)",
  border: "1px solid var(--line)",
  borderRadius: "var(--radius-m)",
  fontFamily: "var(--font-ui)",
  fontSize: "15px",
  color: "var(--fg)",
  outline: "none",
  boxSizing: "border-box",
};

export function ResetRequestForm() {
  const [state, formAction] = useActionState(resetPassword, {});

  if (state.message === "sent") {
    return (
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "var(--radius-pill)",
            background: "var(--cobalt-50)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--cobalt-500)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </div>
        <h1
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "26px",
            fontWeight: 700,
            color: "var(--ink)",
            marginBottom: "12px",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
          }}
        >
          Mail ist raus.
        </h1>
        <p
          style={{
            fontSize: "15px",
            color: "var(--fg-muted)",
            lineHeight: 1.6,
            marginBottom: "8px",
          }}
        >
          Falls die Adresse bei uns registriert ist, bekommst du gleich einen Link.
        </p>
        <p
          style={{
            fontSize: "14px",
            color: "var(--fg-subtle)",
            lineHeight: 1.6,
            marginBottom: "24px",
          }}
        >
          Schau auch im Spam-Ordner nach, wenn die Mail nicht ankommt.
        </p>
        <Link
          href="/login"
          style={{
            fontSize: "13px",
            color: "var(--cobalt-500)",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          Zurück zum Login
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: "26px",
          fontWeight: 700,
          color: "var(--fg)",
          marginBottom: "6px",
          lineHeight: 1.2,
          letterSpacing: "-0.02em",
        }}
      >
        Passwort vergessen.
      </h1>
      <p
        style={{
          fontSize: "14px",
          color: "var(--fg-subtle)",
          marginBottom: "32px",
        }}
      >
        Wir schicken dir einen Link zum Zurücksetzen.
      </p>

      <form
        action={formAction}
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <div>
          <label
            htmlFor="email"
            style={{
              display: "block",
              fontSize: "13px",
              fontWeight: 500,
              color: "var(--fg-muted)",
              marginBottom: "6px",
              letterSpacing: "0.01em",
            }}
          >
            E-Mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="deine@email.de"
            style={inputStyle}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "var(--cobalt-500)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "var(--line)";
            }}
          />
        </div>

        {state.error && (
          <p
            role="alert"
            style={{
              fontSize: "13px",
              color: "var(--danger)",
              backgroundColor: "var(--cobalt-50)",
              border: "1px solid var(--cobalt-200)",
              borderRadius: "var(--radius-s)",
              padding: "10px 14px",
              margin: 0,
            }}
          >
            {state.error}
          </p>
        )}

        <SubmitButton />
      </form>

      <p
        style={{
          marginTop: "24px",
          fontSize: "13px",
          color: "var(--fg-subtle)",
          textAlign: "center",
        }}
      >
        <Link
          href="/login"
          style={{
            color: "var(--cobalt-500)",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          Zurück zum Login
        </Link>
      </p>
    </>
  );
}
