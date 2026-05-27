import { createClient } from "@supabase/supabase-js";

/**
 * Service-role client — server only, never import in client components.
 * Used for privileged ops like reading auth.users emails for notifications.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Supabase admin env vars not set (SUPABASE_SERVICE_ROLE_KEY)");
  }

  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
