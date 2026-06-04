"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";

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
    return { error: "Registrierung fehlgeschlagen. Bitte versuch es erneut." };
  }

  return { message: "confirm" };
}

// ─── Reset password (request link) ───────────────────────────────────────────

export async function resetPassword(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = (formData.get("email") as string).trim().toLowerCase();
  if (!email) return { error: "Bitte E-Mail eingeben." };

  const supabase = await createClient();
  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/auth/callback?next=/passwort-reset`,
  });

  // Always return success — never reveal whether the address is registered.
  return { message: "sent" };
}

// ─── Update password (after clicking the reset link) ─────────────────────────

export async function updatePassword(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const password = formData.get("password") as string;
  if (!password || password.length < 8) {
    return { error: "Das Passwort muss mindestens 8 Zeichen lang sein." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return { error: "Passwort konnte nicht geändert werden. Bitte versuch es erneut." };
  }

  redirect("/feed");
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
  const bio              = ((formData.get("bio") as string) ?? "").trim().slice(0, 120);
  const stadtteil        = formData.get("stadtteil") as string;
  const interests        = formData.getAll("interests") as string[];

  if (!first_name) return { error: "Bitte gib deinen Vornamen ein." };
  if (!stadtteil)  return { error: "Bitte wähle deinen Stadtteil." };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await supabase.from("profiles").insert({
    id: user.id,
    first_name,
    bio: bio || null,
    stadtteil,
    interests,
  } as any);

  if (error) {
    if (error.code === "23505") redirect("/feed");
    return { error: "Profil konnte nicht erstellt werden. Bitte versuch es erneut." };
  }

  // Send welcome e-mail (non-fatal)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mapa.hamburg";
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey && user.email) {
    try {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: "mapa <hey@mapa.hamburg>",
        to:   user.email,
        subject: `Willkommen in ${stadtteil}, ${first_name}.`,
        html: `
          <div style="font-family:sans-serif;max-width:520px;color:#1C1A17;line-height:1.6">
            <p style="font-size:16px;margin:0 0 16px">Hallo ${first_name},</p>
            <p style="margin:0 0 16px">
              schön, dass du dabei bist. Du bist jetzt Teil der mapa-Community
              in <strong>${stadtteil}</strong>.
            </p>
            <p style="margin:0 0 16px">
              Im Feed siehst du, was in deinem Viertel los ist. Teile
              Empfehlungen, stell Fragen, vereinbare Treffen.
            </p>
            <p style="margin:0 0 24px">
              <a href="${siteUrl}/feed"
                 style="display:inline-block;background:#2540D6;color:#fff;text-decoration:none;
                        padding:12px 24px;border-radius:999px;font-size:15px;font-weight:500">
                Zum Feed
              </a>
            </p>
            <p style="font-size:13px;color:#9A9189;margin:0">
              mapa · Die lokale Community für Familien in Hamburg<br>
              <a href="${siteUrl}" style="color:#6F855A;text-decoration:none">mapa.hamburg</a>
            </p>
          </div>
        `,
      });
    } catch {
      // Non-fatal — profile was created successfully
    }
  }

  redirect("/feed");
}
