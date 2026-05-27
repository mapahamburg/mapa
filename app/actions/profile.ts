"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type ProfileState = {
  error?:   string;
  success?: boolean;
};

export async function updateProfile(
  _prevState: ProfileState,
  formData:   FormData
): Promise<ProfileState> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Nicht eingeloggt." };

  const first_name    = (formData.get("first_name") as string)?.trim() ?? "";
  const stadtteil     = (formData.get("stadtteil")  as string)?.trim() ?? "";
  const bio           = (formData.get("bio")        as string)?.trim() || null;
  const can_help_with = (formData.getAll("can_help_with") as string[]).filter(Boolean);
  const looking_for   = (formData.getAll("looking_for")   as string[]).filter(Boolean);
  const interests     = (formData.getAll("interests")     as string[]).filter(Boolean);

  if (!first_name) return { error: "Vorname darf nicht leer sein." };
  if (!stadtteil)  return { error: "Bitte wähle deinen Stadtteil." };

  const { error } = await supabase
    .from("profiles")
    .update({ first_name, stadtteil, bio, can_help_with, looking_for, interests })
    .eq("id", user.id);

  if (error) return { error: "Profil konnte nicht gespeichert werden." };

  revalidatePath("/profil");
  return { success: true };
}
