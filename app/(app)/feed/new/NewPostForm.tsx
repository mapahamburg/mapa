"use client";

import React, { useState } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { MapPin, Calendar } from "lucide-react";
import { createPost } from "@/app/actions/posts";
import { ImageUpload } from "@/components/app/ImageUpload";
import { STADTTEILE } from "@/types";
import type { PostType } from "@/types";

// ─── Post type config ─────────────────────────────────────────────────────────

const POST_TYPES: {
  value: PostType;
  label: string;
}[] = [
  { value: "empfehlung", label: "Empfehlung" },
  { value: "frage",      label: "Frage" },
  { value: "treffen",    label: "Treffen" },
  { value: "suche",      label: "Suche" },
  { value: "veranstaltung", label: "Veranstaltung" },
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

// ─── Submit button ────────────────────────────────────────────────────────────

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="form-submit-btn"
      style={{
        background: pending ? "var(--color-cobalt-soft)" : "var(--color-cobalt)",
        color: pending ? "var(--color-muted)" : "#fff",
        border: "none",
        borderRadius: 999,
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

// ─── Main component ───────────────────────────────────────────────────────────

export function NewPostForm({ defaultStadtteil }: { defaultStadtteil?: string }) {
  const [state, formAction] = useActionState(createPost, {});

  const [selectedType, setSelectedType] = useState<PostType>("empfehlung");
  const [body, setBody] = useState("");
  const [stadtteil, setStadtteil] = useState(defaultStadtteil ?? "");

  const showMeetingFields =
    selectedType === "treffen" || selectedType === "veranstaltung";

  const showStrongNudge =
    body.length > 280 ||
    NUDGE_KEYWORDS.some((kw) => body.toLowerCase().includes(kw));

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "var(--color-paper)",
    border: "1px solid var(--color-line)",
    borderRadius: 10,
    padding: "12px 14px",
    fontFamily: "var(--font-ui)",
    fontSize: 15,
    color: "var(--color-ink)",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 200ms",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    fontWeight: 600,
    color: "var(--color-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.10em",
    marginBottom: 8,
    display: "block",
  };

  return (
    <div
      className="form-card"
      style={{
        background: "var(--color-ivory)",
        border: "1px solid var(--color-line-soft)",
        maxWidth: 680,
        width: "100%",
      }}
    >
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontSize: 28,
          fontWeight: 400,
          color: "var(--color-ink)",
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
        {/* ── 1. Title ──────────────────────────────────────────────────────── */}
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

        {/* ── 2. Body ───────────────────────────────────────────────────────── */}
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
                  ? "var(--color-cobalt)"
                  : "var(--color-subtle)",
            }}
          >
            {body.length}/2000
          </div>

          {showStrongNudge ? (
            <div
              style={{
                marginTop: 12,
                background: "rgba(37,64,214,0.06)",
                border: "1px solid rgba(37,64,214,0.18)",
                borderRadius: 10,
                padding: "12px 16px",
                fontFamily: "var(--font-ui)",
                fontSize: 13,
                color: "var(--color-cobalt)",
                lineHeight: 1.55,
              }}
            >
              Bitte denk kurz nach: mapa ist kein Ort für politische Debatten
              oder medizinische Empfehlungen.{" "}
              <a
                href="/hausregeln"
                style={{
                  color: "var(--color-cobalt)",
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
                color: "var(--color-subtle)",
                lineHeight: 1.5,
                margin: "8px 0 0 0",
              }}
            >
              mapa ist für lokale Tipps und ehrlichen Austausch. Kein Ort für
              Debatten oder Politik.{" "}
              <a
                href="/hausregeln"
                style={{
                  color: "var(--color-muted)",
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                }}
              >
                Hausregeln lesen &rarr;
              </a>
            </p>
          )}
        </div>

        {/* ── 2b. Photo ─────────────────────────────────────────────────────── */}
        <ImageUpload labelStyle={labelStyle} />

        {/* ── 3. Type pills ─────────────────────────────────────────────────── */}
        <div>
          <span style={labelStyle}>Was ist das?</span>
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
                    background: isSelected ? "var(--color-ink)" : "var(--color-paper)",
                    color: isSelected ? "var(--color-paper)" : "var(--color-muted)",
                    border: isSelected
                      ? "1.5px solid var(--color-ink)"
                      : "1.5px solid var(--color-line)",
                    borderRadius: 999,
                    padding: "7px 16px",
                    fontFamily: "var(--font-ui)",
                    fontSize: 13.5,
                    fontWeight: isSelected ? 500 : 400,
                    cursor: "pointer",
                    transition: "all 200ms cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  {pt.label}
                </button>
              );
            })}
          </div>
          <input type="hidden" name="type" value={selectedType} />
        </div>

        {/* ── 4. Conditional meeting / event fields ─────────────────────────── */}
        {showMeetingFields && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              background: "var(--color-sunk)",
              border: "1px solid var(--color-line-soft)",
              borderRadius: 14,
              padding: 20,
            }}
          >
            <p style={{ ...labelStyle, margin: 0 }}>
              {selectedType === "treffen"
                ? "Treffen-Details"
                : "Veranstaltungs-Details"}
            </p>

            <div>
              <label htmlFor="post-ort" style={labelStyle}>
                <MapPin
                  size={12}
                  strokeWidth={1.5}
                  style={{ display: "inline", marginRight: 4, verticalAlign: "middle" }}
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

            <div>
              <label htmlFor="post-date" style={labelStyle}>
                <Calendar
                  size={12}
                  strokeWidth={1.5}
                  style={{ display: "inline", marginRight: 4, verticalAlign: "middle" }}
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

            <div>
              <label style={labelStyle}>
                Alter der Kinder{" "}
                <span style={{ fontWeight: 400, letterSpacing: 0 }}>
                  (wenn du magst)
                </span>
              </label>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
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
                    color: "var(--color-muted)",
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
                    color: "var(--color-subtle)",
                  }}
                >
                  Jahre
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ── 5. Stadtteil ──────────────────────────────────────────────────── */}
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
                color: "var(--color-muted)",
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

        {/* ── Error ─────────────────────────────────────────────────────────── */}
        {state.error && (
          <p
            role="alert"
            aria-live="polite"
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 13.5,
              color: "var(--color-cobalt)",
              background: "rgba(37,64,214,0.06)",
              border: "1px solid rgba(37,64,214,0.18)",
              borderRadius: 10,
              padding: "10px 14px",
              margin: 0,
            }}
          >
            {state.error}
          </p>
        )}

        {/* ── Submit ────────────────────────────────────────────────────────── */}
        <SubmitButton />
      </form>
    </div>
  );
}
