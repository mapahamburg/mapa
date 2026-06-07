"use server";

import { createClient } from "@/lib/supabase/server";

export type WaitlistState = {
  status?: "success" | "error" | "duplicate";
  error?: string;
};

/**
 * Speichert eine E-Mail-Adresse in der `waitlist`-Tabelle.
 *
 * Benötigte Supabase-Tabelle (einmalig anlegen):
 *   create table waitlist (
 *     id         uuid primary key default gen_random_uuid(),
 *     email      text not null unique,
 *     source     text,
 *     created_at timestamptz default now()
 *   );
 *   alter table waitlist enable row level security;
 *   -- Nur Service-Role darf lesen; Insert via anon key erlauben:
 *   create policy "anon insert" on waitlist for insert to anon with check (true);
 */
export async function joinWaitlist(
  _prev: WaitlistState,
  formData: FormData
): Promise<WaitlistState> {
  const email = (formData.get("email") as string | null)?.trim().toLowerCase();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", error: "Bitte eine gültige E-Mail-Adresse eingeben." };
  }

  const supabase = await createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any)
    .from("waitlist")
    .insert({ email, source: "start" });

  if (error) {
    // 23505 = unique_violation — E-Mail bereits vorhanden
    if (error.code === "23505") {
      return { status: "duplicate" };
    }
    console.error("Waitlist insert error:", error.message);
    return { status: "error", error: "Etwas ist schiefgelaufen. Bitte versuche es noch einmal." };
  }

  return { status: "success" };
}
