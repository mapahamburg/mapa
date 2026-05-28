"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { X, CheckCircle } from "lucide-react";
import { sendContactRequest } from "@/app/actions/contact";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        flex: 1,
        padding: "13px 20px",
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
      {pending ? "Wird gesendet..." : "Anfrage senden"}
    </button>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "11px 14px",
  background: "var(--surface-page)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-m)",
  fontFamily: "var(--font-ui)",
  fontSize: 15,
  color: "var(--fg)",
  outline: "none",
  boxSizing: "border-box",
  resize: "none",
};

interface Props {
  recipientName: string;
  postId?: string;
  postTitle?: string;
  onClose: () => void;
}

export function ContactModal({ recipientName, postId, postTitle, onClose }: Props) {
  const [state, formAction] = useActionState(sendContactRequest, {});
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(28,26,23,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: 24,
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 460,
          background: "var(--surface-card)",
          borderRadius: "var(--radius-l)",
          border: "1px solid var(--border)",
          padding: 32,
          boxShadow: "0 24px 64px rgba(28,26,23,0.18)",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <h2 style={{
              fontWeight: 700,
              fontSize: 22,
              letterSpacing: "-0.025em",
              margin: 0,
              lineHeight: 1.2,
            }}>
              {recipientName} kontaktieren
            </h2>
            <p style={{ fontSize: 13, color: "var(--fg-muted)", marginTop: 6, lineHeight: 1.5 }}>
              mapa leitet deine Anfrage weiter. Niemand bekommt
              ungefragt deine Kontaktdaten.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "var(--fg-muted)", flexShrink: 0 }}
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Success state */}
        {state.success ? (
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <CheckCircle size={40} strokeWidth={1.5} color="var(--cobalt-500)" style={{ margin: "0 auto 16px", display: "block" }} />
            <p style={{ fontWeight: 600, fontSize: 20, letterSpacing: "-0.02em", marginBottom: 10 }}>
              Anfrage ist bei uns.
            </p>
            <p style={{ fontSize: 14, color: "var(--fg-muted)", lineHeight: 1.6, marginBottom: 24 }}>
              Wir leiten deine Kontaktinfos in Kürze an {recipientName} weiter.
              Wenn sie möchten, melden sie sich direkt bei dir.
            </p>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "12px 28px",
                background: "var(--cobalt-500)",
                color: "#fff",
                border: "none",
                borderRadius: "var(--radius-m)",
                fontFamily: "var(--font-ui)",
                fontSize: 15,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Schließen
            </button>
          </div>
        ) : (
          <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Hidden context fields */}
            <input type="hidden" name="recipient_name" value={recipientName} />
            {postId    && <input type="hidden" name="post_id"    value={postId} />}
            {postTitle && <input type="hidden" name="post_title" value={postTitle} />}

            {/* Optional message */}
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--fg-muted)", marginBottom: 6 }}>
                Kurze Nachricht <span style={{ fontWeight: 400, color: "var(--fg-subtle)" }}>(optional)</span>
              </label>
              <textarea
                name="message"
                rows={3}
                placeholder={`Hallo ${recipientName}, ich hab deinen Beitrag gelesen und würde mich gerne melden.`}
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--cobalt-500)")}
                onBlur={(e)  => (e.currentTarget.style.borderColor = "var(--border)")}
              />
            </div>

            {/* Contact info — required */}
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--fg-muted)", marginBottom: 6 }}>
                Deine Kontaktinfos
              </label>
              <input
                name="contact_info"
                type="text"
                required
                placeholder="Telefon, WhatsApp oder E-Mail"
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--cobalt-500)")}
                onBlur={(e)  => (e.currentTarget.style.borderColor = "var(--border)")}
              />
              <p style={{ marginTop: 6, fontSize: 12, color: "var(--fg-subtle)", lineHeight: 1.5 }}>
                Nur {recipientName} bekommt diese Infos. mapa prüft die Anfrage zuerst.
              </p>
            </div>

            {state.error && (
              <p role="alert" style={{
                fontSize: 13,
                color: "var(--danger)",
                background: "var(--cobalt-50)",
                border: "1px solid var(--cobalt-200)",
                borderRadius: "var(--radius-s)",
                padding: "10px 14px",
                margin: 0,
              }}>
                {state.error}
              </p>
            )}

            <div style={{ display: "flex", gap: 10 }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  flex: 1,
                  padding: "13px 20px",
                  background: "transparent",
                  color: "var(--fg-muted)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-m)",
                  fontFamily: "var(--font-ui)",
                  fontSize: 15,
                  cursor: "pointer",
                }}
              >
                Abbrechen
              </button>
              <SubmitButton />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
