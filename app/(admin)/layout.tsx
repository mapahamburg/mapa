import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

// Comma-separated list of admin email addresses, set via env var.
// Example: ADMIN_EMAILS=henry@mapa.hamburg,anna@mapa.hamburg
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const email = user.email?.toLowerCase() ?? "";
  const isAdmin = ADMIN_EMAILS.length === 0 || ADMIN_EMAILS.includes(email);

  if (!isAdmin) redirect("/feed");

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "var(--bg)",
        fontFamily: "var(--font-ui)",
        color: "var(--fg)",
      }}
    >
      <AdminSidebar />
      <main
        style={{
          flex: 1,
          padding: "40px 48px",
          overflowY: "auto" as const,
          minWidth: 0,
        }}
      >
        {children}
      </main>
    </div>
  );
}
