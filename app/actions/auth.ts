"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// ─── Shared state type ───────────────────────────────────────────────────────

export type AuthState = {
  error?: string;
  message?: string;
};

// ─── Login ────────────────────────────────────────────────────────────────────

export async function login(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = (formData.get("email") as string).trim().toLowerCase();
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Bitte E-Mail und Passwort eingeben." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: "E-Mail oder Passwort stimmt nicht." };
  }

  const next = (formData.get("next") as string) || "/feed";
  redirect(next);
}

// ─── Signup ───────────────────────────────────────────────────────────────────

export async function signup(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = (formData.get("email") as string).trim().toLowerCase();
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Bitte E-Mail und Passwort eingeben." };
  }
  if (password.length < 8) {
    return { error: "Das Passwort muss mindestens 8 Zeichen lang sein." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // After email confirmation, send straight to onboarding.
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/auth/callback?next=/onboarding`,
    },
  });

  if (error) {
    if (error.message.includes("already registered")) {
      return { error: "Diese E-Mail ist bereits registriert." };
    }
    return { error: `Fehler: ${error.message}` };
  }

  return { message: "confirm" };
}

// ─── Logout ───────────────────────────────────────────────────────────────────

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

// ─── Create profile (onboarding step) ────────────────────────────────────────

export async function createProfile(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const first_name       = (formData.get("first_name") as string).trim();
  const username         = (formData.get("username")   as string).trim().toLowerCase();
  const stadtteil        = formData.get("stadtteil") as string;
  const interests        = formData.getAll("interests") as string[];
  const newsletter_optin = formData.get("newsletter_optin") === "true";

  if (!first_name) return { error: "Bitte gib deinen Vornamen ein." };
  if (!username || !/^[a-z0-9_.]{3,20}$/.test(username))
    return { error: "Ungültiger Benutzername." };
  if (!stadtteil) return { error: "Bitte wähle deinen Stadtteil." };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await supabase.from("profiles").insert({
    id: user.id,
    first_name,
    stadtteil,
    interests,
    username,
    newsletter_optin,
  } as any);

  if (error) {
    // Profile may already exist (e.g. user hit back and re-submitted).
    if (error.code === "23505") {
      redirect("/feed");
    }
    return {
      error: "Profil konnte nicht erstellt werden. Bitte versuch es erneut.",
    };
  }

  redirect("/feed");
}
