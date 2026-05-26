"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { createProfile } from "@/app/actions/auth";
import { STADTTEILE, INTERESTS } from "@/types/index";
import { Logo } from "@/components/ui/Logo";
import { Check } from "lucide-react";

// ─── Step indicator ───────────────────────────────────────────────────────────

function StepDots({ total, current }: { total: number; current: number }) {
  return (
    <div style={{ display: "flex", gap: "6px", justifyContent: "center", marginBottom: "32px" }}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            width: i === current ? "20px" : "6px",
            height: "6px",
            borderRadius: "3px",
            backgroundColor:
              i < current
                ? "var(--mapa-sage-400)"
                : i === current
                ? "var(--mapa-sage-500)"
                : "var(--line)",
            transition: "all 200ms ease",
          }}
        />
      ))}
    </div>
  );
}

// ─── Submit button ────────────────────────────────────────────────────────────

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        width: "100%",
        padding: "14px 24px",
        backgroundColor: pending ? "var(--mapa-sage-300)" : "var(--mapa-sage-500)",
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
        if (!pending) (e.currentTarget as HTMLElement).style.transform = "scale(0.98)";
      }}
      onMouseUp={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "";
      }}
    >
      {pending ? `${label}...` : label}
    </button>
  );
}

// ─── Interest chip ────────────────────────────────────────────────────────────

function InterestChip({
  label,
  selected,
  onToggle,
}: {
  label: string;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      style={{
        padding: "9px 16px",
        borderRadius: "var(--radius-pill)",
        border: selected ? "1.5px solid var(--mapa-sage-500)" : "1.5px solid var(--line)",
        backgroundColor: selected ? "var(--mapa-sage-50)" : "var(--bg-card)",
        color: selected ? "var(--mapa-sage-600)" : "var(--fg-muted)",
        fontFamily: "var(--font-ui)",
        fontSize: "14px",
        fontWeight: selected ? 500 : 400,
        cursor: "pointer",
        transition: "all 150ms ease",
        display: "flex",
        alignItems: "center",
        gap: "6px",
      }}
    >
      {selected && (
        <Check size={13} strokeWidth={2.5} style={{ color: "var(--mapa-sage-500)" }} />
      )}
      {label}
    </button>
  );
}

// ─── Main onboarding component ────────────────────────────────────────────────

const TOTAL_STEPS = 5;

export function OnboardingFlow() {
  const [step, setStep] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [stadtteil, setStadtteil] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const [state, formAction] = useActionState(createProfile, {});

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  // ── Step 0: Welcome ─────────────────────────────────────────────────────────
  const stepWelcome = (
    <div style={{ textAlign: "center" }}>
      <div style={{ marginBottom: "24px" }}>
        <Logo size={32} />
      </div>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "30px",
          fontStyle: "italic",
          fontWeight: 400,
          color: "var(--fg)",
          marginBottom: "12px",
          lineHeight: 1.2,
        }}
      >
        Schön, dass du da bist.
      </h1>
      <p
        style={{
          fontSize: "15px",
          color: "var(--fg-subtle)",
          lineHeight: 1.6,
          marginBottom: "32px",
          maxWidth: "320px",
          margin: "0 auto 32px",
        }}
      >
        mapa ist eine Nachbarschafts-Community für Familien in Hamburg.
        Lokal, ruhig und ohne Algorithmus.
      </p>
      <button
        type="button"
        onClick={next}
        style={{
          padding: "14px 40px",
          backgroundColor: "var(--mapa-sage-500)",
          color: "#fff",
          border: "none",
          borderRadius: "var(--radius-m)",
          fontFamily: "var(--font-ui)",
          fontSize: "15px",
          fontWeight: 500,
          cursor: "pointer",
          transition: "transform 120ms ease",
        }}
        onMouseDown={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "scale(0.98)";
        }}
        onMouseUp={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "";
        }}
      >
        Los geht's
      </button>
    </div>
  );

  // ── Step 1: Vorname ──────────────────────────────────────────────────────────
  const stepVorname = (
    <div>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "24px",
          fontWeight: 400,
          color: "var(--fg)",
          marginBottom: "8px",
        }}
      >
        Wie heißt du?
      </h2>
      <p style={{ fontSize: "14px", color: "var(--fg-subtle)", marginBottom: "24px" }}>
        Nur dein Vorname. Nachname bleibt bei dir.
      </p>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="Dein Vorname"
        autoFocus
        style={{
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
          marginBottom: "20px",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "var(--mapa-sage-400)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "var(--line)";
        }}
      />
      <button
        type="button"
        onClick={next}
        disabled={!firstName.trim()}
        style={{
          width: "100%",
          padding: "14px 24px",
          backgroundColor: firstName.trim() ? "var(--mapa-sage-500)" : "var(--mapa-sage-200)",
          color: "#fff",
          border: "none",
          borderRadius: "var(--radius-m)",
          fontFamily: "var(--font-ui)",
          fontSize: "15px",
          fontWeight: 500,
          cursor: firstName.trim() ? "pointer" : "not-allowed",
          transition: "background-color 150ms ease",
        }}
      >
        Weiter
      </button>
    </div>
  );

  // ── Step 2: Stadtteil ────────────────────────────────────────────────────────
  const stepStadtteil = (
    <div>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "24px",
          fontWeight: 400,
          color: "var(--fg)",
          marginBottom: "8px",
        }}
      >
        In welchem Viertel lebst du?
      </h2>
      <p style={{ fontSize: "14px", color: "var(--fg-subtle)", marginBottom: "20px" }}>
        Dein Stadtteil bestimmt deinen Feed.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "8px",
          marginBottom: "20px",
          maxHeight: "280px",
          overflowY: "auto",
        }}
      >
        {STADTTEILE.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStadtteil(s)}
            style={{
              padding: "10px 14px",
              textAlign: "left",
              border:
                stadtteil === s
                  ? "1.5px solid var(--mapa-sage-500)"
                  : "1.5px solid var(--line)",
              borderRadius: "var(--radius-m)",
              backgroundColor:
                stadtteil === s ? "var(--mapa-sage-50)" : "var(--bg-card)",
              fontFamily: "var(--font-ui)",
              fontSize: "14px",
              color: stadtteil === s ? "var(--mapa-sage-600)" : "var(--fg-muted)",
              fontWeight: stadtteil === s ? 500 : 400,
              cursor: "pointer",
              transition: "all 150ms ease",
            }}
          >
            {s}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={next}
        disabled={!stadtteil}
        style={{
          width: "100%",
          padding: "14px 24px",
          backgroundColor: stadtteil ? "var(--mapa-sage-500)" : "var(--mapa-sage-200)",
          color: "#fff",
          border: "none",
          borderRadius: "var(--radius-m)",
          fontFamily: "var(--font-ui)",
          fontSize: "15px",
          fontWeight: 500,
          cursor: stadtteil ? "pointer" : "not-allowed",
          transition: "background-color 150ms ease",
        }}
      >
        Weiter
      </button>
    </div>
  );

  // ── Step 3: Interessen ───────────────────────────────────────────────────────
  const stepInteressen = (
    <div>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "24px",
          fontWeight: 400,
          color: "var(--fg)",
          marginBottom: "8px",
        }}
      >
        Was interessiert dich?
      </h2>
      <p style={{ fontSize: "14px", color: "var(--fg-subtle)", marginBottom: "20px" }}>
        Optional. Kannst du später noch ändern.
      </p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          marginBottom: "24px",
        }}
      >
        {INTERESTS.map((interest) => (
          <InterestChip
            key={interest}
            label={interest}
            selected={selectedInterests.includes(interest)}
            onToggle={() => toggleInterest(interest)}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={next}
        style={{
          width: "100%",
          padding: "14px 24px",
          backgroundColor: "var(--mapa-sage-500)",
          color: "#fff",
          border: "none",
          borderRadius: "var(--radius-m)",
          fontFamily: "var(--font-ui)",
          fontSize: "15px",
          fontWeight: 500,
          cursor: "pointer",
          transition: "transform 120ms ease",
        }}
        onMouseDown={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "scale(0.98)";
        }}
        onMouseUp={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "";
        }}
      >
        {selectedInterests.length === 0 ? "Überspringen" : "Weiter"}
      </button>
    </div>
  );

  // ── Step 4: Hausregeln ───────────────────────────────────────────────────────
  const stepHausregeln = (
    <form action={formAction}>
      {/* Hidden fields carry all collected data */}
      <input type="hidden" name="first_name" value={firstName} />
      <input type="hidden" name="stadtteil" value={stadtteil} />
      {selectedInterests.map((interest) => (
        <input key={interest} type="hidden" name="interests" value={interest} />
      ))}

      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "24px",
          fontWeight: 400,
          color: "var(--fg)",
          marginBottom: "8px",
        }}
      >
        Die fünf Hausregeln.
      </h2>
      <p style={{ fontSize: "14px", color: "var(--fg-subtle)", marginBottom: "20px" }}>
        mapa funktioniert, weil alle mitziehen.
      </p>

      <ol
        style={{
          paddingLeft: "20px",
          margin: "0 0 24px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {[
          "Sei freundlich, auch wenn du nicht zustimmst.",
          "Bleib beim Lokalen, bleib beim Praktischen.",
          "Keine medizinischen Empfehlungen — Erfahrungen ja, Hebammen-Ersatz nein.",
          "Empfehlungen sind echt — Selbstpromo wird offengelegt.",
          "Sag Bescheid, wenn etwas nicht stimmt.",
        ].map((rule, i) => (
          <li
            key={i}
            style={{
              fontSize: "14px",
              color: "var(--fg-muted)",
              lineHeight: 1.5,
            }}
          >
            {rule}
          </li>
        ))}
      </ol>

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
            marginBottom: "16px",
          }}
        >
          {state.error}
        </p>
      )}

      <SubmitButton label="Verstanden — ich bin dabei" />
    </form>
  );

  const steps = [stepWelcome, stepVorname, stepStadtteil, stepInteressen, stepHausregeln];

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "440px",
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--line)",
        borderRadius: "var(--radius-l)",
        padding: "40px 36px",
        boxShadow: "var(--shadow-m)",
      }}
    >
      {step > 0 && (
        <StepDots total={TOTAL_STEPS - 1} current={step - 1} />
      )}

      {steps[step]}

      {step > 0 && step < TOTAL_STEPS - 1 && (
        <button
          type="button"
          onClick={back}
          style={{
            display: "block",
            margin: "16px auto 0",
            background: "none",
            border: "none",
            fontSize: "13px",
            color: "var(--fg-subtle)",
            cursor: "pointer",
            fontFamily: "var(--font-ui)",
          }}
        >
          Zurück
        </button>
      )}
    </div>
  );
}
