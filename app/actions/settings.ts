"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

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

  // 1. Profil löschen (klappt mit regulärem Client + RLS)
  await (supabase as any).from("profiles").delete().eq("id", user.id);

  // 2. Auth-User löschen (braucht Service-Role-Key)
  try {
    const admin = createAdminClient();
    const { error } = await admin.auth.admin.deleteUser(user.id);
    if (error) {
      // Profil ist weg, aber Auth-User bleibt — trotzdem ausloggen
      await supabase.auth.signOut();
      redirect("/");
    }
  } catch {
    // Service-Role-Key fehlt — trotzdem ausloggen
    await supabase.auth.signOut();
    redirect("/");
  }

  redirect("/");
}
