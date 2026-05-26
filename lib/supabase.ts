import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

// Fallback-Werte verhindern einen throw beim Modul-Import wenn .env.local fehlt.
// Ohne echte Werte schlägt jeder Request still fehl — kein Crash.
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "placeholder-anon-key";

// Browser / client-component Supabase client (uses anon key, respects RLS)
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
