"use client";

import { useState, useTransition } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Bell, Newspaper, CheckCircle, Trash2 } from "lucide-react";
import { updateSettings, deleteAccount } from "@/app/actions/settings";

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        padding: "12px 28px",
        background: pending ? "var(--cobalt-200)" : "var(--cobalt-500)",
        color: "#fff",
        border: "none",
        borderRadius: "var(--radius-m)",
        fontFamily: "var(--font-ui)",
        fontSize: 15,
        fontWeight: 500,
        cursor: pending ? "not-allowed" : "pointer",
        transition: "background 150ms ease",
      }}
    >
      {pending ? "Wird gespeichert…" : "Speichern"}
    </button>
  );
}

interface Props {
  notifyComments:  boolean;
  newsletterOptin: boolean;
}

export function SettingsForm({ notifyComments, newsletterOptin }: Props) {
  const [state, formAction] = useActionState(updateSettings, {});
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteError, setDeleteError]     = useState<string | null>(null);
  const [isPending, startTransition]      = useTransition();

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteAccount();
      if (result?.error) setDeleteError(result.error);
    });
  }

  return (
    <form action={formAction} style={{ maxWidth: 520 }}>
      {/* Section heading */}
      <h1 style={{
        fontSize: 28,
        fontWeight: 700,
        letterSpacing: "-0.03em",
        margin: "0 0 32px",
        color: "var(--ink)",
      }}>
        Einstellungen
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

        {/* Notify on comments */}
        <ToggleRow
          name="notify_comments"
          defaultChecked={notifyComments}
          icon={<Bell size={18} strokeWidth={1.5} />}
          label="Benachrichtigung bei neuen Antworten"
          description="Du bekommst eine E-Mail wenn jemand auf einen deiner Beiträge antwortet."
        />

        {/* Newsletter */}
        <ToggleRow
          name="newsletter_optin"
          defaultChecked={newsletterOptin}
          icon={<Newspaper size={18} strokeWidth={1.5} />}
          label="Monatlicher Newsletter"
          description="Einmal im Monat das Wichtigste aus deinem Stadtteil. Kein Spam."
        />
      </div>

      <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 14 }}>
        <SaveButton />
        {state.success && (
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            color: "var(--fg-muted)",
          }}>
            <CheckCircle size={15} strokeWidth={1.5} />
            Gespeichert
          </span>
        )}
        {state.error && (
          <span style={{ fontSize: 13, color: "var(--danger)" }}>
            {state.error}
          </span>
        )}
      </div>

      {/* ── Danger zone ── */}
      <div style={{
        marginTop: 48,
        paddingTop: 32,
        borderTop: "1px solid var(--border)",
      }}>
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--fg-subtle)",
          marginBottom: 16,
        }}>
          Konto
        </div>

        {!confirmDelete ? (
          <button
            type="button"
            onClick={() => setConfirmDelete(true)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "transparent",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-m)",
              padding: "10px 18px",
              fontFamily: "var(--font-ui)",
              fontSize: 14,
              fontWeight: 400,
              color: "var(--fg-muted)",
              cursor: "pointer",
            }}
          >
            <Trash2 size={15} strokeWidth={1.5} />
            Profil löschen
          </button>
        ) : (
          <div style={{
            background: "var(--surface-card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-l)",
            padding: "20px 22px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}>
            <div>
              <div style={{
                fontSize: 14,
                fontWeight: 500,
                color: "var(--ink)",
                marginBottom: 6,
              }}>
                Profil wirklich löschen?
              </div>
              <div style={{ fontSize: 13, color: "var(--fg-muted)", lineHeight: 1.6 }}>
                Dein Konto, deine Beiträge und alle Daten werden unwiderruflich entfernt.
                Diese Aktion kann nicht rückgängig gemacht werden.
              </div>
            </div>

            {deleteError && (
              <span style={{ fontSize: 13, color: "var(--danger)" }}>
                {deleteError}
              </span>
            )}

            <div style={{ display: "flex", gap: 10 }}>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isPending}
                style={{
                  padding: "10px 20px",
                  background: isPending ? "var(--ash-300)" : "#C0392B",
                  color: "#fff",
                  border: "none",
                  borderRadius: "var(--radius-m)",
                  fontFamily: "var(--font-ui)",
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: isPending ? "not-allowed" : "pointer",
                }}
              >
                {isPending ? "Wird gelöscht…" : "Ja, unwiderruflich löschen"}
              </button>
              <button
                type="button"
                onClick={() => { setConfirmDelete(false); setDeleteError(null); }}
                style={{
                  padding: "10px 18px",
                  background: "transparent",
                  color: "var(--fg-muted)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-m)",
                  fontFamily: "var(--font-ui)",
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                Abbrechen
              </button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}

// ─── Toggle row ───────────────────────────────────────────────────────────────

function ToggleRow({
  name,
  defaultChecked,
  icon,
  label,
  description,
}: {
  name:           string;
  defaultChecked: boolean;
  icon:           React.ReactNode;
  label:          string;
  description:    string;
}) {
  return (
    <label
      htmlFor={name}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 16,
        background: "var(--surface-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-l)",
        padding: "18px 20px",
        cursor: "pointer",
      }}
    >
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
        <span style={{ color: "var(--cobalt-500)", marginTop: 1, flexShrink: 0 }}>
          {icon}
        </span>
        <div>
          <div style={{ fontSize: 15, fontWeight: 500, color: "var(--fg)", marginBottom: 4 }}>
            {label}
          </div>
          <div style={{ fontSize: 13, color: "var(--fg-muted)", lineHeight: 1.5 }}>
            {description}
          </div>
        </div>
      </div>

      {/* Hidden "false" fallback so unchecked sends "false" not nothing */}
      <input type="hidden" name={name} value="false" />
      <input
        id={name}
        type="checkbox"
        name={name}
        value="true"
        defaultChecked={defaultChecked}
        style={{ width: 18, height: 18, cursor: "pointer", flexShrink: 0, marginTop: 2, accentColor: "var(--cobalt-500)" }}
      />
    </label>
  );
}
