"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { joinWaitlist, type WaitlistState } from "@/app/actions/waitlist";
import { Check, Lock } from "lucide-react";

const BENEFITS = [
  "Einladung zum Start von mapa in deinem Stadtteil",
  "Empfehlungen aus deiner Nachbarschaft",
  "Familienfreundliche Veranstaltungen in deiner Nähe",
  "Die Möglichkeit, die Community von Anfang an mitzugestalten",
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  background: "var(--mapa-paper)",
  border: "1px solid var(--border)",
  borderRadius: 12,
  fontFamily: "var(--font-ui)",
  fontSize: 16,
  color: "var(--fg)",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 150ms ease",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        width: "100%",
        padding: "15px 24px",
        background: pending ? "var(--cobalt-300)" : "var(--cobalt-500)",
        color: "var(--mapa-paper)",
        border: "none",
        borderRadius: 999,
        fontFamily: "var(--font-ui)",
        fontSize: 16,
        fontWeight: 500,
        cursor: pending ? "not-allowed" : "pointer",
        transition: "background 150ms ease, transform 120ms ease",
        marginTop: 4,
      }}
      onMouseDown={(e) => {
        if (!pending) (e.currentTarget as HTMLElement).style.transform = "scale(0.98)";
      }}
      onMouseUp={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "";
      }}
    >
      {pending ? "Anmelden..." : "Kostenlos anmelden"}
    </button>
  );
}

function SuccessState({ duplicate }: { duplicate?: boolean }) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "40px 24px",
        background: "var(--mapa-paper)",
        borderRadius: 20,
        border: "1px solid var(--border)",
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 999,
          background: "var(--cobalt-50)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 20px",
        }}
      >
        <Check size={24} strokeWidth={1.5} color="var(--cobalt-500)" />
      </div>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: 26,
          color: "var(--fg)",
          margin: "0 0 12px",
          lineHeight: 1.2,
        }}
      >
        {duplicate ? "Du bist schon dabei." : "Du bist dabei."}
      </h2>
      <p
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: 15,
          color: "var(--fg-muted)",
          lineHeight: 1.6,
          margin: 0,
          maxWidth: 320,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {duplicate
          ? "Deine E-Mail-Adresse ist bereits auf der Liste. Wir melden uns, wenn es losgeht."
          : "Wir melden uns, sobald mapa in deinem Stadtteil startet. Bis dahin."}
      </p>
    </div>
  );
}

export function StartForm() {
  const [state, action] = useActionState<WaitlistState, FormData>(joinWaitlist, {});

  if (state.status === "success") return <SuccessState />;
  if (state.status === "duplicate") return <SuccessState duplicate />;

  return (
    <div>
      {/* Benefit list */}
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: "0 0 28px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {BENEFITS.map((b) => (
          <li
            key={b}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              fontFamily: "var(--font-ui)",
              fontSize: 15,
              color: "var(--fg)",
              lineHeight: 1.45,
            }}
          >
            <span
              style={{
                flexShrink: 0,
                width: 22,
                height: 22,
                borderRadius: 999,
                background: "var(--cobalt-50)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 1,
              }}
            >
              <Check size={13} strokeWidth={2} color="var(--cobalt-500)" />
            </span>
            {b}
          </li>
        ))}
      </ul>

      {/* Form */}
      <form action={action} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <input type="hidden" name="source" value="start" />
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="deine@email.de"
          style={inputStyle}
          onFocus={(e) => {
            (e.currentTarget as HTMLInputElement).style.borderColor = "var(--cobalt-500)";
          }}
          onBlur={(e) => {
            (e.currentTarget as HTMLInputElement).style.borderColor = "var(--border)";
          }}
        />

        {state.status === "error" && state.error && (
          <p
            role="alert"
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 13,
              color: "var(--mapa-clay-600)",
              background: "var(--mapa-peach-100)",
              border: "1px solid var(--mapa-clay-200, #e8bca8)",
              borderRadius: 8,
              padding: "10px 14px",
              margin: 0,
            }}
          >
            {state.error}
          </p>
        )}

        <SubmitButton />
      </form>

      {/* Privacy note */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginTop: 16,
          fontFamily: "var(--font-ui)",
          fontSize: 12,
          color: "var(--fg-subtle)",
          lineHeight: 1.5,
        }}
      >
        <Lock size={13} strokeWidth={1.5} color="var(--fg-subtle)" style={{ flexShrink: 0 }} />
        <span>
          Kostenlos. Kein Spam. Du kannst dich jederzeit abmelden.{" "}
          <a
            href="/datenschutz"
            style={{ color: "var(--fg-muted)", textDecoration: "underline", textUnderlineOffset: 2 }}
          >
            Datenschutz
          </a>
        </span>
      </div>
    </div>
  );
}
