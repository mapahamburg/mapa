import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SettingsForm } from "./SettingsForm";

export const metadata = { title: "Einstellungen · mapa" };

export default async function EinstellungenPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await (supabase as any)
    .from("profiles")
    .select("notify_comments, newsletter_optin")
    .eq("id", user.id)
    .single() as { data: { notify_comments: boolean; newsletter_optin: boolean } | null };

  return (
    <main style={{ flex: 1, padding: "40px 48px" }}>
      <SettingsForm
        notifyComments={profile?.notify_comments  ?? true}
        newsletterOptin={profile?.newsletter_optin ?? false}
      />
    </main>
  );
}
