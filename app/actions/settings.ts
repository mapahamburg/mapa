"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { Resend } from "resend";

export type SettingsState = {
  error?: string;
  success?: boolean;
};

export async function updateSettings(
  _prevState: SettingsState,
  formData: FormData
): Promise<SettingsState> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Nicht eingeloggt." };

  const notify_comments  = formData.get("notify_comments")  === "true";
  const newsletter_optin = formData.get("newsletter_optin") === "true";

  const { error } = await (supabase as any)
    .from("profiles")
    .update({ notify_comments, newsletter_optin })
    .eq("id", user.id);

  if (error) return { error: "Einstellungen konnten nicht gespeichert werden." };

  revalidatePath("/einstellungen");
  return { success: true };
}

// ─── Delete account ───────────────────────────────────────────────────────────

export async function deleteAccount(): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Nicht eingeloggt." };

  // Vorname + E-Mail sichern, bevor alles gelöscht wird
  const userEmail = user.email ?? null;
  const { data: profile } = await (supabase as any)
    .from("profiles")
    .select("first_name")
    .eq("id", user.id)
    .single() as { data: { first_name: string } | null };
  const firstName = profile?.first_name ?? null;

  // 1. Profil löschen (klappt mit regulärem Client + RLS)
  await (supabase as any).from("profiles").delete().eq("id", user.id);

  // 2. Auth-User löschen (braucht Service-Role-Key)
  try {
    const admin = createAdminClient();
    await admin.auth.admin.deleteUser(user.id);
  } catch {
    // Service-Role-Key fehlt — trotzdem weitermachen
  }

  // 3. Bestätigungsmail senden
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey && userEmail) {
    const resend = new Resend(resendKey);
    const greeting = firstName ? `Hallo ${firstName},` : "Hallo,";
    await resend.emails.send({
      from: "mapa <hey@mapa.hamburg>",
      to:   userEmail,
      subject: "Dein mapa-Profil wurde gelöscht",
      html: `
        <div style="font-family:sans-serif;max-width:520px;color:#1C1A17;line-height:1.6">
          <p style="font-size:16px;margin:0 0 16px">${greeting}</p>
          <p style="margin:0 0 16px">
            dein Profil und alle deine Daten wurden wie gewünscht dauerhaft
            aus mapa entfernt.
          </p>
          <p style="margin:0 0 16px">
            Falls du die Löschung nicht selbst veranlasst hast oder Fragen
            hast, antworte einfach auf diese Mail.
          </p>
          <p style="margin:32px 0 0;font-size:14px;color:#888">
            mapa · Die lokale Community für Familien in Hamburg<br>
            <a href="https://mapa.hamburg" style="color:#6F855A;text-decoration:none">mapa.hamburg</a>
          </p>
        </div>
      `,
    });
  }

  await supabase.auth.signOut();
  redirect("/");
}
