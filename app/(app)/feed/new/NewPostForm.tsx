"use client";

import React, { useState } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { MapPin, Calendar } from "lucide-react";
import { createPost } from "@/app/actions/posts";
import { STADTTEILE } from "@/types";
import type { PostType } from "@/types";

// ─── Post type config ─────────────────────────────────────────────────────────

const POST_TYPES: {
  value: PostType;
  label: string;
  bg: string;
  color: string;
}[] = [
  {
    value: "empfehlung",
    label: "Empfehlung",
    bg: "var(--cobalt-50)",
    color: "var(--cobalt-700)",
  },
  {
    value: "frage",
    label: "Frage",
    bg: "var(--surface-card)",
    color: "var(--ink)",
  },
  {
    value: "treffen",
    label: "Treffen",
    bg: "var(--ash-100)",
    color: "var(--ash-900)",
  },
  {
    value: "suche",
    label: "Suche",
    bg: "var(--ash-100)",
    color: "var(--ash-900)",
  },
  {
    value: "veranstaltung",
    label: "Veranstaltung",
    bg: "var(--ash-100)",
    color: "var(--ash-900)",
  },
];

const NUDGE_KEYWORDS = [
  "politik",
  "impf",
  "querdenker",
  "corona",
  "afd",
  "cdu",
  "spd",
  "grüne",
];

// ─── Submit button — must be nested inside <form> to use useFormStatus ────────

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="form-submit-btn"
      style={{
        background: pending
          ? "var(--cobalt-200)"
          : "var(--cobalt-500)",
        color: "#fff",
        border: "none",
        borderRadius: "var(--radius-pill, 999px)",
        padding: "14px 28px",
        fontFamily: "var(--font-ui)",
        fontSize: 15,
        fontWeight: 600,
        cursor: pending ? "not-allowed" : "pointer",
        transition: "background 200ms cubic-bezier(0.16, 1, 0.3, 1), transform 120ms",
        transform: pending ? "scale(0.98)" : "scale(1)",
      }}
    >
      {pending ? "Wird veröffentlicht …" : "Beitrag veröffentlichen"}
    </button>
  );
}

// ─── Main exported component ──────────────────────────────────────────────────

export function NewPostForm() {
  const [state, formAction] = useActionState(createPost, {});

  const [selectedType, setSelectedType] = useState<PostType>("empfehlung");
  const [body, setBody] = useState("");
  const [stadtteil, setStadtteil] = useState("");

  const showMeetingFields =
    selectedType === "treffen" || selectedType === "veranstaltung";

  const showStrongNudge =
    body.length > 280 ||
    NUDGE_KEYWORDS.some((kw) => body.toLowerCase().includes(kw));

  // ── Shared styles ──────────────────────────────────────────────────────────

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "var(--bg-base)",
    border: "1px solid var(--line)",
    borderRadius: "var(--radius-m)",
    padding: "12px 14px",
    fontFamily: "var(--font-ui)",
    fontSize: 15,
    color: "var(--fg)",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 200ms",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    fontWeight: 600,
    color: "var(--fg-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.10em",
    marginBottom: 8,
    display: "block",
  };

  return (
    <div
      className="form-card"
      style={{
        background: "var(--surface-card)",
        border: "1px solid var(--border)",
        maxWidth: 680,
        width: "100%",
      }}
    >
      {/* ── Heading ──────────────────────────────────────────────────────── */}
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontSize: 28,
          fontWeight: 400,
          color: "var(--ink)",
          margin: "0 0 32px 0",
          lineHeight: 1.2,
          letterSpacing: "-0.015em",
        }}
      >
        Neuer Beitrag
      </h1>

      <form
        action={formAction}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 28,
        }}
      >
        {/* ── Type pills ─────────────────────────────────────────────────── */}
        <div>
          <span style={labelStyle}>Typ</span>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            {POST_TYPES.map((pt) => {
              const isSelected = selectedType === pt.value;
              return (
                <button
                  key={pt.value}
                  type="button"
                  onClick={() => setSelectedType(pt.value)}
                  style={{
                    background: isSelected ? pt.bg : "var(--bg-base)",
                    color: isSelected ? pt.color : "var(--fg-muted)",
                    border: isSelected
                      ? `1.5px solid ${pt.color}`
                      : "1.5px solid var(--border)",
                    borderRadius: "var(--radius-pill, 999px)",
                    padding: "7px 16px",
                    fontFamily: "var(--font-ui)",
                    fontSize: 13.5,
                    fontWeight: isSelected ? 600 : 400,
                    cursor: "pointer",
                    transition: "all 200ms cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  {pt.label}
                </button>
              );
            })}
          </div>
          {/* Hidden field carries the type value through FormData */}
          <input type="hidden" name="type" value={selectedType} />
        </div>

        {/* ── Title ──────────────────────────────────────────────────────── */}
        <div>
          <label htmlFor="post-title" style={labelStyle}>
            Titel
          </label>
          <input
            id="post-title"
            name="title"
            type="text"
            required
            minLength={3}
            maxLength={200}
            placeholder={
              selectedType === "empfehlung"
                ? "z.B. Bestes Familiencafé in Ottensen"
                : selectedType === "frage"
                ? "z.B. Kennt jemand eine gute Hebamme in Eppendorf?"
                : selectedType === "treffen"
                ? "z.B. Spielplatztreffen am Samstag"
                : selectedType === "suche"
                ? "z.B. Suche Kinderwagen zu verschenken"
                : "z.B. Flohmarkt für Familien im Stadtpark"
            }
            style={inputStyle}
          />
        </div>

        {/* ── Body / Text ────────────────────────────────────────────────── */}
        <div>
          <label htmlFor="post-body" style={labelStyle}>
            Text{" "}
            <span style={{ fontWeight: 400, letterSpacing: 0 }}>
              (wenn du magst)
            </span>
          </label>
          <textarea
            id="post-body"
            name="body"
            rows={5}
            maxLength={2000}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Mehr Details, Hinweise, Treffpunkt …"
            style={{
              ...inputStyle,
              resize: "vertical",
              lineHeight: 1.6,
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 4,
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color:
                body.length > 1900
                  ? "var(--cobalt-500)"
                  : "var(--fg-subtle)",
            }}
          >
            {body.length}/2000
          </div>

          {/* ── Posting nudge ──────────────────────────────────────────── */}
          {showStrongNudge ? (
            <div
              style={{
                marginTop: 12,
                background: "var(--cobalt-50)",
                border: "1px solid var(--cobalt-200)",
                borderRadius: "var(--radius-m)",
                padding: "12px 16px",
                fontFamily: "var(--font-ui)",
                fontSize: 13,
                color: "var(--cobalt-700)",
                lineHeight: 1.55,
              }}
            >
              Bitte denk kurz nach: mapa ist kein Ort für politische Debatten
              oder medizinische Empfehlungen.{" "}
              <a
                href="/hausregeln"
                style={{
                  color: "var(--cobalt-700)",
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                }}
              >
                Hausregeln lesen
              </a>
            </div>
          ) : (
            <p
              style={{
                marginTop: 8,
                fontFamily: "var(--font-ui)",
                fontSize: 13,
                color: "var(--fg-subtle)",
                lineHeight: 1.5,
                margin: "8px 0 0 0",
              }}
            >
              mapa ist für lokale Tipps und ehrlichen Austausch. Kein Ort für
              Debatten oder Politik.{" "}
              <a
                href="/hausregeln"
                style={{
                  color: "var(--fg-muted)",
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                }}
              >
                Hausregeln lesen &rarr;
              </a>
            </p>
          )}
        </div>

        {/* ── Stadtteil selector ─────────────────────────────────────────── */}
        <div>
          <label htmlFor="post-stadtteil" style={labelStyle}>
            Stadtteil
          </label>
          <div style={{ position: "relative" }}>
            <select
              id="post-stadtteil"
              name="stadtteil"
              required
              value={stadtteil}
              onChange={(e) => setStadtteil(e.target.value)}
              style={{
                ...inputStyle,
                appearance: "none",
                WebkitAppearance: "none",
                paddingRight: 40,
                cursor: "pointer",
              }}
            >
              <option value="" disabled>
                Dein Stadtteil …
              </option>
              {STADTTEILE.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <span
              style={{
                position: "absolute",
                right: 14,
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
                color: "var(--fg-muted)",
                display: "flex",
                alignItems: "center",
              }}
            >
              <svg
                width={14}
                height={14}
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="2,4 7,10 12,4" />
              </svg>
            </span>
          </div>
        </div>

        {/* ── Conditional meeting / event fields ─────────────────────────── */}
        {showMeetingFields && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              background: "var(--surface-page)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              padding: 20,
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                fontWeight: 600,
                color: "var(--fg-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.10em",
                margin: 0,
              }}
            >
              {selectedType === "treffen"
                ? "Treffen-Details"
                : "Veranstaltungs-Details"}
            </p>

            {/* Ort */}
            <div>
              <label htmlFor="post-ort" style={labelStyle}>
                <MapPin
                  size={12}
                  strokeWidth={1.5}
                  style={{
                    display: "inline",
                    marginRight: 4,
                    verticalAlign: "middle",
                  }}
                />
                Ort{" "}
                <span style={{ fontWeight: 400, letterSpacing: 0 }}>
                  (wenn du magst)
                </span>
              </label>
              <input
                id="post-ort"
                name="meeting_location"
                type="text"
                placeholder="z.B. Spielplatz Isebek, Eingang Nordseite"
                style={inputStyle}
              />
            </div>

            {/* Datum & Uhrzeit */}
            <div>
              <label htmlFor="post-date" style={labelStyle}>
                <Calendar
                  size={12}
                  strokeWidth={1.5}
                  style={{
                    display: "inline",
                    marginRight: 4,
                    verticalAlign: "middle",
                  }}
                />
                Datum &amp; Uhrzeit{" "}
                <span style={{ fontWeight: 400, letterSpacing: 0 }}>
                  (wenn du magst)
                </span>
              </label>
              <input
                id="post-date"
                name="meeting_date"
                type="datetime-local"
                style={inputStyle}
              />
            </div>

            {/* Alter der Kinder */}
            <div>
              <label style={labelStyle}>
                Alter der Kinder{" "}
                <span style={{ fontWeight: 400, letterSpacing: 0 }}>
                  (wenn du magst)
                </span>
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <input
                  name="min_age"
                  type="number"
                  min={0}
                  max={18}
                  placeholder="von"
                  style={{ ...inputStyle, width: 80 }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: 13,
                    color: "var(--fg-muted)",
                  }}
                >
                  bis
                </span>
                <input
                  name="max_age"
                  type="number"
                  min={0}
                  max={18}
                  placeholder="bis"
                  style={{ ...inputStyle, width: 80 }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: 13,
                    color: "var(--fg-subtle)",
                  }}
                >
                  Jahre
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ── Error message ───────────────────────────────────────────────── */}
        {state.error && (
          <p
            role="alert"
            aria-live="polite"
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 13.5,
              color: "var(--cobalt-700)",
              background: "var(--cobalt-50)",
              border: "1px solid var(--cobalt-200)",
              borderRadius: "var(--radius-m)",
              padding: "10px 14px",
              margin: 0,
            }}
          >
            {state.error}
          </p>
        )}

        {/* ── Submit button ───────────────────────────────────────────────── */}
        <SubmitButton />
      </form>
    </div>
  );
}
