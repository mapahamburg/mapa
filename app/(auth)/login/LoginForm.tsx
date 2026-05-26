"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { login } from "@/app/actions/auth";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        width: "100%",
        padding: "14px 24px",
        backgroundColor: pending
          ? "var(--mapa-sage-300)"
          : "var(--mapa-sage-500)",
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
      {pending ? "Anmelden..." : "Anmelden"}
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

export function LoginForm() {
  const [state, formAction] = useActionState(login, {});

  return (
    <>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "26px",
          fontWeight: 400,
          color: "var(--fg)",
          marginBottom: "6px",
          lineHeight: 1.2,
        }}
      >
        Willkommen zurück.
      </h1>
      <p
        style={{
          fontSize: "14px",
          color: "var(--fg-subtle)",
          marginBottom: "32px",
        }}
      >
        Meld dich mit deiner E-Mail an.
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
              e.currentTarget.style.borderColor = "var(--mapa-sage-400)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "var(--line)";
            }}
          />
        </div>

        <div>
          <label
            htmlFor="password"
            style={{
              display: "block",
              fontSize: "13px",
              fontWeight: 500,
              color: "var(--fg-muted)",
              marginBottom: "6px",
              letterSpacing: "0.01em",
            }}
          >
            Passwort
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="••••••••"
            style={inputStyle}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "var(--mapa-sage-400)";
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
              color: "var(--mapa-clay-500)",
              backgroundColor: "var(--mapa-peach-50)",
              border: "1px solid var(--mapa-peach-100)",
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
        Noch kein Konto?{" "}
        <Link
          href="/signup"
          style={{
            color: "var(--mapa-sage-500)",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          Jetzt registrieren
        </Link>
      </p>
    </>
  );
}
