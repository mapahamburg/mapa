import { createServerClient } from "@/lib/supabase.server";

/**
 * Anzahl registrierter Profile aus der DB.
 * Fällt auf 0 zurück wenn Supabase noch nicht konfiguriert ist.
 */
export async function getMemberCount(): Promise<number> {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    return 0;
  }

  try {
    const supabase = createServerClient();
    const { count, error } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true });

    if (error) throw error;
    return count ?? 0;
  } catch {
    return 0;
  }
}
