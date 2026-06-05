import { NextResponse, type NextRequest } from "next/server";
import { createMiddlewareClient } from "@/lib/supabase/middleware";

export async function proxy(request: NextRequest) {
  // Skip auth logic entirely when Supabase is not yet configured.
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.next({ request });
  }

  const { supabase, response } = createMiddlewareClient(request);

  // Refresh the session — keeps the cookie alive and writes updated tokens.
  // getUser() is preferred over getSession() because it validates server-side.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // ── Route guards ──────────────────────────────────────────────────────────

  // Logged-in app routes — require auth
  const requiresAuth =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/feed") ||
    pathname.startsWith("/profil") ||
    pathname.startsWith("/karte") ||
    pathname.startsWith("/gespeichert") ||
    pathname.startsWith("/veranstaltungen") ||
    pathname.startsWith("/treffen") ||
    pathname.startsWith("/einstellungen") ||
    pathname.startsWith("/kreise") ||
    pathname.startsWith("/host") ||
    pathname.startsWith("/benachrichtigungen") ||
    pathname.startsWith("/hosts");

  // Onboarding — requires auth but no profile yet
  const requiresAuthOnboarding = pathname.startsWith("/onboarding");

  // Auth pages — redirect away if already logged in
  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/signup");

  if ((requiresAuth || requiresAuthOnboarding) && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (isAuthPage && user) {
    const url = request.nextUrl.clone();
    url.pathname = "/feed";
    return NextResponse.redirect(url);
  }

  // Eingeloggte Nutzer ohne Profil → Onboarding erzwingen
  if (user && requiresAuth && !pathname.startsWith("/onboarding")) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", user.id)
      .single();

    if (!profile) {
      const url = request.nextUrl.clone();
      url.pathname = "/onboarding";
      return NextResponse.redirect(url);
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimisation)
     * - favicon.ico, fonts, and static assets
     */
    "/((?!_next/static|_next/image|favicon\\.ico|fonts|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
