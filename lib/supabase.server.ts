import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

// Server-side Supabase client (uses service role key, bypasses RLS)
// Never import this in client components or expose to the browser.
export function createServerClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}
