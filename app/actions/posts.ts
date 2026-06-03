"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { PostType } from "@/types";

// ─── Nominatim geocoding (OpenStreetMap, free, no API key) ───────────────────

async function geocode(address: string): Promise<{ lat: number; lng: number } | null> {
  try {
    const q = encodeURIComponent(`${address}, Hamburg`);
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=1&countrycodes=de`,
      {
        headers: { "User-Agent": "mapa.hamburg/1.0 (hey@mapa.hamburg)" },
        next: { revalidate: 0 },
      }
    );
    if (!res.ok) return null;
    const data = await res.json() as Array<{ lat: string; lon: string }>;
    if (!data[0]) return null;
    return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
  } catch {
    return null;
  }
}

// ─── State type ───────────────────────────────────────────────────────────────

export type PostState = {
  error?: string;
};

// ─── Create post ──────────────────────────────────────────────────────────────

export async function createPost(
  _prevState: PostState,
  formData: FormData
): Promise<PostState> {
  // Dev-mode guard: if Supabase env vars are absent, skip DB and redirect.
  const hasSupabase =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder.supabase.co";

  const type = formData.get("type") as PostType;
  const title = (formData.get("title") as string | null)?.trim() ?? "";
  const body = (formData.get("body") as string | null)?.trim() ?? null;
  const stadtteil = formData.get("stadtteil") as string;
  const meeting_location =
    (formData.get("meeting_location") as string | null)?.trim() || null;
  const meeting_date =
    (formData.get("meeting_date") as string | null) || null;
  const min_age_raw = formData.get("min_age") as string | null;
  const max_age_raw = formData.get("max_age") as string | null;
  const min_age =
    min_age_raw && min_age_raw !== "" ? parseInt(min_age_raw, 10) : null;
  const max_age =
    max_age_raw && max_age_raw !== "" ? parseInt(max_age_raw, 10) : null;

  // Basic server-side validation
  if (!type) return { error: "Bitte wähle einen Beitragstyp." };
  if (!title || title.length < 3)
    return { error: "Der Titel muss mindestens 3 Zeichen lang sein." };
  if (title.length > 200)
    return { error: "Der Titel darf maximal 200 Zeichen lang sein." };
  if (body && body.length > 2000)
    return { error: "Der Text darf maximal 2000 Zeichen lang sein." };
  if (!stadtteil) return { error: "Bitte wähle deinen Stadtteil." };

  if (!hasSupabase) {
    // Dev mode without real Supabase: skip DB insert.
    redirect("/feed");
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Geocode the meeting location for treffen/veranstaltung posts
  let lat: number | null = null;
  let lng: number | null = null;
  if (meeting_location && (type === "treffen" || type === "veranstaltung")) {
    const coords = await geocode(meeting_location);
    if (coords) { lat = coords.lat; lng = coords.lng; }
  }

  const { error } = await supabase.from("posts").insert({
    type,
    title,
    body: body || null,
    stadtteil,
    author_id: user.id,
    meeting_location,
    meeting_date,
    min_age,
    max_age,
    lat,
    lng,
  });

  if (error) {
    return {
      error: "Beitrag konnte nicht veröffentlicht werden. Bitte versuch es erneut.",
    };
  }

  revalidatePath("/feed");
  revalidatePath("/treffen");
  redirect("/feed");
}
