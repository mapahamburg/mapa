"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { ArrowLeft } from "lucide-react";
import { proposeKreis } from "@/app/actions/kreise";
import { STADTTEILE, KREIS_THEMEN } from "@/types";

// ─── Submit button ────────────────────────────────────────────────────────────

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        background: pending ? "var(--cobalt-200)" : "var(--cobalt-500)",
        color: "#fff",
        border: "none",
        borderRadius: 999,
        padding: "13px 28px",
        fontFamily: "var(--font-ui)",
        fontSize: 15,
        fontWeight: 500,
        cursor: pending ? "default" : "pointer",
        transition: "background 160ms",
      }}
    >
      {pending ? "Wird eingereicht…" : "Kreis vorschlagen"}
    </button>
  );
}

// ─── Field label ──────────────────────────────────────────────────────────────

function Label({
  htmlFor,
  children,
  hint,
}: {
  htmlFor: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label htmlFor={htmlFor} style={{ display: "block" }}>
      <div
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: 14,
          fontWeight: 600,
          color: "var(--ink)",
          marginBottom: 6,
        }}
      >
        {children}
      </div>
      {hint && (
        <div
          style={{
            fontSize: 13,
            color: "var(--fg-muted)",
            marginBottom: 8,
            lineHeight: 1.45,
          }}
        >
          {hint}
        </div>
      )}
    </label>
  );
}

const inputStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  background: "var(--surface-field, var(--color-ivory))",
  border: "1px solid var(--border)",
  borderRadius: 12,
  padding: "12px 16px",
  fontFamily: "var(--font-ui)",
  fontSize: 15,
  color: "var(--ink)",
  outline: "none",
  boxSizing: "border-box",
};

// ─── Form ─────────────────────────────────────────────────────────────────────

export function ProposeKreisForm() {
  const [state, formAction] = useActionState(proposeKreis, {});

  return (
    <div style={{ maxWidth: 560 }}>
      {/* Back */}
      <Link
        href="/kreise"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontSize: 14,
          color: "var(--fg-muted)",
          textDecoration: "none",
          marginBottom: 28,
        }}
      >
        <ArrowLeft size={14} strokeWidth={1.5} />
        Zurück zu Kreise
      </Link>

      {/* Heading */}
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontSize: 36,
          letterSpacing: "-0.025em",
          lineHeight: 1.05,
          color: "var(--ink)",
          marginBottom: 8,
        }}
      >
        Kreis vorschlagen.
      </div>
      <p
        style={{
          fontSize: 15,
          lineHeight: 1.55,
          color: "var(--fg-muted)",
          margin: "0 0 36px",
        }}
      >
        Ein Kreis ist eine kleine, kuratierte Gruppe für Familien im Stadtteil.
        Dein Vorschlag wird von einem Local Host geprüft und in der Regel
        innerhalb von 24 Stunden freigeschaltet.
      </p>

      {/* Error */}
      {state?.error && (
        <div
          style={{
            background: "var(--mapa-peach-100, #fdebd0)",
            border: "1px solid var(--mapa-clay-200, #f0c09a)",
            borderRadius: 12,
            padding: "14px 18px",
            fontSize: 14,
            color: "var(--mapa-clay-700, #8c3a0f)",
            marginBottom: 24,
          }}
        >
          {state.error}
        </div>
      )}

      <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {/* Name */}
        <div>
          <Label htmlFor="name" hint="Kurz und einprägsam. Maximal 80 Zeichen.">
            Name des Kreises
          </Label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="z. B. Spielgruppe Eppendorf"
            maxLength={80}
            required
            style={inputStyle}
          />
        </div>

        {/* Stadtteil */}
        <div>
          <Label htmlFor="stadtteil">
            Stadtteil
          </Label>
          <select
            id="stadtteil"
            name="stadtteil"
            required
            defaultValue=""
            style={{
              ...inputStyle,
              appearance: "none",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23999' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 14px center",
              paddingRight: 40,
              cursor: "pointer",
            }}
          >
            <option value="" disabled>
              Stadtteil wählen…
            </option>
            {STADTTEILE.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Thema */}
        <div>
          <Label
            htmlFor="thema"
            hint="Hilft anderen, den Kreis schnell einzuordnen. Optional."
          >
            Thema
          </Label>
          <select
            id="thema"
            name="thema"
            defaultValue=""
            style={{
              ...inputStyle,
              appearance: "none",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23999' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 14px center",
              paddingRight: 40,
              cursor: "pointer",
            }}
          >
            <option value="">Kein Thema</option>
            {KREIS_THEMEN.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Beschreibung */}
        <div>
          <Label
            htmlFor="beschreibung"
            hint="Wen sprichst du an? Was passiert in diesem Kreis? Maximal 500 Zeichen."
          >
            Beschreibung
          </Label>
          <textarea
            id="beschreibung"
            name="beschreibung"
            rows={4}
            maxLength={500}
            placeholder="z. B. Wöchentliches Treffen für Kinder zwischen 1 und 3 Jahren…"
            style={{
              ...inputStyle,
              resize: "vertical",
              lineHeight: 1.55,
            }}
          />
        </div>

        {/* Info box */}
        <div
          style={{
            background: "var(--cobalt-50)",
            border: "1px solid var(--cobalt-100, var(--cobalt-50))",
            borderRadius: 12,
            padding: "14px 18px",
            fontSize: 14,
            lineHeight: 1.5,
            color: "var(--cobalt-700)",
          }}
        >
          Kreise starten mit maximal 40 Mitgliedern. Ein Local Host prüft
          deinen Vorschlag und schaltet ihn frei. Du wirst automatisch als
          Mitglied eingetragen.
        </div>

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 4 }}>
          <SubmitButton />
          <Link
            href="/kreise"
            style={{
              fontSize: 14,
              color: "var(--fg-muted)",
              textDecoration: "none",
            }}
          >
            Abbrechen
          </Link>
        </div>
      </form>
    </div>
  );
}
