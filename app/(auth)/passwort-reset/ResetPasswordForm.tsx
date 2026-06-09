"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { updatePassword } from "@/app/actions/auth";

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
      {pending ? "Wird gespeichert..." : "Passwort speichern"}
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

export function ResetPasswordForm() {
  const [state, formAction] = useActionState(updatePassword, {});
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const mismatch = confirm.length > 0 && password !== confirm;

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
        Neues Passwort.
      </h1>
      <p
        style={{
          fontSize: "14px",
          color: "var(--fg-subtle)",
          marginBottom: "32px",
        }}
      >
        Wähle ein neues Passwort mit mindestens 8 Zeichen.
      </p>

      <form
        action={formAction}
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
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
            Neues Passwort{" "}
            <span style={{ fontWeight: 400, color: "var(--fg-subtle)" }}>
              (min. 8 Zeichen)
            </span>
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "var(--cobalt-500)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "var(--line)";
            }}
          />
        </div>

        <div>
          <label
            htmlFor="confirm"
            style={{
              display: "block",
              fontSize: "13px",
              fontWeight: 500,
              color: "var(--fg-muted)",
              marginBottom: "6px",
              letterSpacing: "0.01em",
            }}
          >
            Passwort wiederholen
          </label>
          <input
            id="confirm"
            name="confirm"
            type="password"
            required
            autoComplete="new-password"
            placeholder="••••••••"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            style={{
              ...inputStyle,
              borderColor: mismatch ? "var(--danger)" : "var(--line)",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = mismatch
                ? "var(--danger)"
                : "var(--cobalt-500)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = mismatch
                ? "var(--danger)"
                : "var(--line)";
            }}
          />
          {mismatch && (
            <p
              style={{
                marginTop: "6px",
                fontSize: "12px",
                color: "var(--danger)",
              }}
            >
              Die Passwörter stimmen nicht überein.
            </p>
          )}
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
    </>
  );
}
