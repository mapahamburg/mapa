"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { STADTTEILE } from "@/types";

// ─── Guards ───────────────────────────────────────────────────────────────────

function hasSupabase() {
  return (
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder.supabase.co"
  );
}

// ─── State types ──────────────────────────────────────────────────────────────

export type KreisActionState = { error?: string; success?: string };

// ─── Propose a new Kreis ──────────────────────────────────────────────────────

export async function proposeKreis(
  _prev: KreisActionState,
  formData: FormData
): Promise<KreisActionState> {
  const name         = (formData.get("name")         as string | null)?.trim() ?? "";
  const beschreibung = (formData.get("beschreibung") as string | null)?.trim() || null;
  const stadtteil    = (formData.get("stadtteil")    as string | null)?.trim() ?? "";
  const thema        = (formData.get("thema")        as string | null)?.trim() || null;

  // Validation
  if (!name || name.length < 3)
    return { error: "Der Name muss mindestens 3 Zeichen lang sein." };
  if (name.length > 80)
    return { error: "Der Name darf maximal 80 Zeichen lang sein." };
  if (beschreibung && beschreibung.length > 500)
    return { error: "Die Beschreibung darf maximal 500 Zeichen lang sein." };
  if (!stadtteil || !STADTTEILE.includes(stadtteil as (typeof STADTTEILE)[number]))
    return { error: "Bitte wähle einen gültigen Stadtteil." };

  if (!hasSupabase()) redirect("/kreise");

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Insert Kreis in 'pending' status
  const { data: kreis, error: kreisError } = await supabase
    .from("kreise")
    .insert({ name, beschreibung, stadtteil, thema, created_by: user.id })
    .select("id")
    .single();

  if (kreisError || !kreis) {
    return { error: "Kreis konnte nicht erstellt werden. Bitte versuch es erneut." };
  }

  // Auto-join proposer as host member
  await supabase.from("kreis_members").insert({
    kreis_id:   kreis.id,
    profile_id: user.id,
    role:       "host",
    status:     "active",
  });

  revalidatePath("/kreise");
  return { success: "Dein Kreis-Vorschlag wurde eingereicht. Ein Local Host prüft ihn in Kürze." };
}

// ─── Join a Kreis ─────────────────────────────────────────────────────────────

export async function joinKreis(kreisId: string): Promise<KreisActionState> {
  if (!hasSupabase()) return { error: "Nicht verfügbar." };

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Bitte meld dich an." };

  // Check capacity
  const { count } = await supabase
    .from("kreis_members")
    .select("*", { count: "exact", head: true })
    .eq("kreis_id", kreisId)
    .eq("status", "active");

  const { data: kreis } = await supabase
    .from("kreise")
    .select("max_members, status")
    .eq("id", kreisId)
    .single();

  if (!kreis || kreis.status !== "active")
    return { error: "Dieser Kreis ist nicht verfügbar." };

  if ((count ?? 0) >= kreis.max_members)
    return { error: "Dieser Kreis ist leider voll." };

  const { error } = await supabase.from("kreis_members").upsert(
    { kreis_id: kreisId, profile_id: user.id, role: "member", status: "active" },
    { onConflict: "kreis_id,profile_id" }
  );

  if (error) return { error: "Beitreten fehlgeschlagen. Bitte versuch es erneut." };

  revalidatePath(`/kreise/${kreisId}`);
  revalidatePath("/kreise");
  return { success: "Du bist jetzt Mitglied." };
}

// ─── Leave a Kreis ────────────────────────────────────────────────────────────

export async function leaveKreis(kreisId: string): Promise<KreisActionState> {
  if (!hasSupabase()) return { error: "Nicht verfügbar." };

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Bitte meld dich an." };

  const { error } = await supabase
    .from("kreis_members")
    .delete()
    .eq("kreis_id", kreisId)
    .eq("profile_id", user.id);

  if (error) return { error: "Austreten fehlgeschlagen. Bitte versuch es erneut." };

  revalidatePath(`/kreise/${kreisId}`);
  revalidatePath("/kreise");
  return { success: "Du hast den Kreis verlassen." };
}

// ─── Approve a pending Kreis (Local Host only) ────────────────────────────────

export async function approveKreis(kreisId: string): Promise<KreisActionState> {
  if (!hasSupabase()) return { error: "Nicht verfügbar." };

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Bitte meld dich an." };

  // Verify caller is a Local Host
  const { data: profile } = await supabase
    .from("profiles")
    .select("is_local_host")
    .eq("id", user.id)
    .single();

  if (!profile?.is_local_host)
    return { error: "Nur Local Hosts können Kreise freischalten." };

  const { error } = await supabase
    .from("kreise")
    .update({ status: "active", approved_by: user.id })
    .eq("id", kreisId);

  if (error) return { error: "Freischalten fehlgeschlagen." };

  revalidatePath("/kreise");
  revalidatePath(`/kreise/${kreisId}`);
  return { success: "Kreis ist jetzt aktiv." };
}

// ─── Reject a pending Kreis (Local Host only) ─────────────────────────────────

export async function rejectKreis(kreisId: string): Promise<KreisActionState> {
  if (!hasSupabase()) return { error: "Nicht verfügbar." };

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Bitte meld dich an." };

  // Verify caller is a Local Host
  const { data: profile } = await supabase
    .from("profiles")
    .select("is_local_host")
    .eq("id", user.id)
    .single();

  if (!profile?.is_local_host)
    return { error: "Nur Local Hosts können Kreise ablehnen." };

  // Delete member rows first
  await supabase
    .from("kreis_members")
    .delete()
    .eq("kreis_id", kreisId);

  // Delete the kreis
  const { error } = await supabase
    .from("kreise")
    .delete()
    .eq("id", kreisId);

  if (error) return { error: "Ablehnen fehlgeschlagen." };

  revalidatePath("/kreise");
  revalidatePath("/admin/kreise");
  return { success: "Kreis abgelehnt." };
}

// ─── Post in a Kreis ──────────────────────────────────────────────────────────

export type KreisPostState = { error?: string };

export async function createKreisPost(
  _prev: KreisPostState,
  formData: FormData
): Promise<KreisPostState> {
  const kreisId = (formData.get("kreis_id") as string | null)?.trim() ?? "";
  const title   = (formData.get("title")    as string | null)?.trim() ?? "";
  const body    = (formData.get("body")     as string | null)?.trim() || null;

  if (!kreisId) return { error: "Kein Kreis angegeben." };
  if (!title || title.length < 3)
    return { error: "Der Titel muss mindestens 3 Zeichen lang sein." };
  if (title.length > 200)
    return { error: "Der Titel darf maximal 200 Zeichen lang sein." };
  if (body && body.length > 2000)
    return { error: "Der Text darf maximal 2000 Zeichen lang sein." };

  if (!hasSupabase()) redirect(`/kreise/${kreisId}`);

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Confirm user is active member
  const { data: membership } = await supabase
    .from("kreis_members")
    .select("status")
    .eq("kreis_id", kreisId)
    .eq("profile_id", user.id)
    .single();

  if (membership?.status !== "active")
    return { error: "Du bist kein aktives Mitglied dieses Kreises." };

  // Get kreis stadtteil for post
  const { data: kreis } = await supabase
    .from("kreise")
    .select("stadtteil")
    .eq("id", kreisId)
    .single();

  const { error } = await supabase.from("posts").insert({
    type:      "frage",           // default type inside Kreise
    title,
    body,
    stadtteil: kreis?.stadtteil ?? "Hamburg",
    author_id: user.id,
    kreis_id:  kreisId,
  });

  if (error) return { error: "Beitrag konnte nicht erstellt werden." };

  revalidatePath(`/kreise/${kreisId}`);
  redirect(`/kreise/${kreisId}`);
}
