import { createServerClient } from "@supabase/ssr";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { Database } from "@/types/supabase";

/**
 * Creates a Supabase client suitable for use inside Next.js middleware.
 * Must implement both getAll and setAll so token refreshes can be written
 * back to the response cookies.
 */
export function createMiddlewareClient(request: NextRequest) {
  // Start with a plain passthrough response — we may swap it if cookies change.
  let response = NextResponse.next({ request });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "placeholder-anon-key",
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Write to the request so downstream middleware can see them.
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          // Rebuild the response with the updated request headers…
          response = NextResponse.next({ request });
          // …and also attach them as Set-Cookie on the response.
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  return { supabase, response };
}
