"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { Resend } from "resend";

export type WaitlistState = {
  status?: "success" | "error" | "duplicate";
  error?: string;
};

/**
 * Speichert eine E-Mail-Adresse in der `newsletter`-Tabelle
 * und schickt eine Bestätigungs-E-Mail via Resend.
 *
 * Benötigte Supabase-Tabelle (einmalig anlegen):
 *   create table newsletter (
 *     id         uuid primary key default gen_random_uuid(),
 *     email      text not null unique,
 *     source     text,
 *     created_at timestamptz default now()
 *   );
 *   alter table newsletter enable row level security;
 *   create policy "anon insert" on newsletter for insert to anon with check (true);
 */
export async function joinWaitlist(
  _prev: WaitlistState,
  formData: FormData
): Promise<WaitlistState> {
  const email = (formData.get("email") as string | null)?.trim().toLowerCase();
  const source = (formData.get("source") as string | null) ?? "start";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", error: "Bitte eine gültige E-Mail-Adresse eingeben." };
  }

  let supabase;
  try {
    supabase = createAdminClient();
  } catch (e) {
    console.error("createAdminClient failed:", e);
    return { status: "error", error: "Konfigurationsfehler. Bitte melde dich bei hey@mapa.hamburg." };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any)
    .from("newsletter")
    .insert({ email, source });

  if (error) {
    // 23505 = unique_violation — E-Mail bereits vorhanden
    if (error.code === "23505" || error.message?.includes("duplicate key")) {
      return { status: "duplicate" };
    }
    console.error("Newsletter insert error — code:", error.code, "message:", error.message, "details:", error.details);
    return { status: "error", error: "Etwas ist schiefgelaufen. Bitte versuche es noch einmal." };
  }

  // Bestätigungs-E-Mail — non-fatal, Insert war schon erfolgreich
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const resend = new Resend(resendKey);
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mapa.hamburg";
      await resend.emails.send({
        from: "mapa <hey@mapa.hamburg>",
        to: email,
        subject: "Du bist dabei. mapa startet in Winterhude & Eppendorf.",
        html: `
          <div style="font-family:sans-serif;max-width:520px;margin:0 auto;color:#1C1A17;line-height:1.6;background:#F5F0E8;padding:40px 32px;border-radius:16px">

            <p style="font-size:22px;font-weight:600;letter-spacing:-0.02em;margin:0 0 4px">
              mapa<span style="color:#C26A3F">.</span>
            </p>
            <p style="font-size:12px;color:#9A9189;margin:0 0 32px;letter-spacing:0.08em;text-transform:uppercase">
              Winterhude &amp; Eppendorf
            </p>

            <p style="font-size:16px;margin:0 0 16px">Hallo,</p>

            <p style="margin:0 0 16px">
              schön, dass du dabei bist. Wir bauen gerade die ersten mapa-Nachbarschaften
              in <strong>Winterhude</strong> und <strong>Eppendorf</strong> auf.
            </p>

            <p style="margin:0 0 24px">
              Sobald es losgeht, bekommst du eine E-Mail mit allem, was du brauchst.
              Bis dahin: keine weiteren Mails, kein Spam.
            </p>

            <p style="margin:0 0 32px">
              <a href="${siteUrl}/start"
                 style="display:inline-block;background:#2540D6;color:#fff;text-decoration:none;
                        padding:12px 24px;border-radius:999px;font-size:15px;font-weight:500">
                mapa.hamburg/start
              </a>
            </p>

            <hr style="border:none;border-top:1px solid #E0D8C6;margin:0 0 24px" />

            <p style="font-size:12px;color:#9A9189;margin:0;line-height:1.6">
              Du erhältst diese E-Mail, weil du dich auf
              <a href="${siteUrl}/start" style="color:#6F855A;text-decoration:none">mapa.hamburg/start</a>
              angemeldet hast.<br>
              <a href="mailto:hey@mapa.hamburg?subject=Abmeldung%20Newsletter&body=Bitte%20mich%20abmelden%3A%20${encodeURIComponent(email)}"
                 style="color:#9A9189">
                Abmelden
              </a>
            </p>
          </div>
        `,
      });
    } catch (mailErr) {
      // Non-fatal — Anmeldung war erfolgreich, nur Mail ist fehlgeschlagen
      console.error("Newsletter mail error:", mailErr);
    }
  }

  return { status: "success" };
}
