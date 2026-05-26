import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Supabase Auth Callback
 * Supabase schickt den User nach E-Mail-Bestätigung hierher mit ?code=...
 * Wir tauschen den Code gegen eine echte Session und leiten weiter.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/onboarding";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Etwas lief schief — zurück zur Signup-Seite mit Fehler
  return NextResponse.redirect(`${origin}/signup?error=auth`);
}
