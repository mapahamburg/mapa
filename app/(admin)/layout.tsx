import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

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
