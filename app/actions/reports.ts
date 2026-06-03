"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export type ReportState = { error?: string; success?: boolean };

// Allowed report reasons (value → German label lives in the UI)
const REASONS = new Set(["spam", "unangemessen", "falsch", "fehl_am_platz", "sonstiges"]);

// ─── Submit a report (any logged-in user) ────────────────────────────────────

export async function reportPost(
  _prev: ReportState,
  formData: FormData
): Promise<ReportState> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Bitte melde dich an." };

  const post_id = formData.get("post_id") as string;
  const reason = formData.get("reason") as string;
  const details = (formData.get("details") as string | null)?.trim() || null;

  if (!post_id) return { error: "Kein Beitrag angegeben." };
  if (!reason || !REASONS.has(reason)) return { error: "Bitte wähle einen Grund." };
  if (details && details.length > 500) return { error: "Die Notiz ist zu lang." };

  const { error } = await (supabase as any).from("reports").insert({
    post_id,
    reporter_id: user.id,
    reason,
    details,
  });

  if (error) return { error: "Meldung konnte nicht gesendet werden. Bitte versuch es erneut." };

  return { success: true };
}

// ─── Admin gate helper ───────────────────────────────────────────────────────

async function callerIsAdmin(): Promise<boolean> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;
  const allow = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  const email = user.email?.toLowerCase() ?? "";
  return allow.length === 0 || allow.includes(email);
}

// ─── Resolve a report (admin only) ───────────────────────────────────────────

export async function resolveReport(reportId: string): Promise<{ error?: string }> {
  if (!(await callerIsAdmin())) return { error: "Nicht berechtigt." };
  try {
    const admin = createAdminClient();
    await (admin as any).from("reports").update({ status: "resolved" }).eq("id", reportId);
    revalidatePath("/admin");
    revalidatePath("/admin/berichte");
    return {};
  } catch {
    return { error: "Konnte nicht aktualisiert werden." };
  }
}

// Form-action wrapper for use directly as <form action={...}>
export async function resolveReportForm(formData: FormData): Promise<void> {
  const id = formData.get("report_id") as string;
  if (id) await resolveReport(id);
}
