import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { createClient } from "@/lib/supabase/server";

// ─── Types (kept for consumers that build sidebar data externally) ────────────

export interface SidebarHost {
  id: string;
  name: string;
  stadtteil: string;
  bio: string | null;
}

export interface SidebarTreffen {
  id: string;
  title: string;
  day: string;
  month: string;
  where: string | null;
}

export interface SidebarStats {
  stadtteil: string;
  members: number;
  newThisWeek: number;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDate(iso: string | null): { day: string; month: string } | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (isNaN(d.getTime())) return null;
  return {
    day: d.getDate().toString(),
    month: d.toLocaleDateString("de-DE", { month: "short" }),
  };
}

// ─── Async Server Component — fetches its own data ───────────────────────────

export async function RightSidebar({ stadtteil }: { stadtteil: string | null }) {
  let host: SidebarHost | undefined;
  let treffen: SidebarTreffen[] = [];
  let stats: SidebarStats | undefined;

  if (stadtteil) {
    try {
      const supabase = await createClient();
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

      const [hostRes, treffenRes, membersRes, newMembersRes] = await Promise.all([
        supabase
          .from("profiles")
          .select("id, first_name, stadtteil, bio")
          .eq("stadtteil", stadtteil)
          .eq("is_local_host", true)
          .limit(1)
          .single(),
        supabase
          .from("posts")
          .select("id, title, meeting_date, meeting_location, created_at")
          .eq("stadtteil", stadtteil)
          .in("type", ["treffen", "veranstaltung"])
          .gte("created_at", weekAgo)
          .order("meeting_date", { ascending: true, nullsFirst: false })
          .limit(3),
        supabase
          .from("profiles")
          .select("*", { count: "exact", head: true })
          .eq("stadtteil", stadtteil),
        supabase
          .from("profiles")
          .select("*", { count: "exact", head: true })
          .eq("stadtteil", stadtteil)
          .gte("joined_at", weekAgo),
      ]);

      if (hostRes.data?.first_name) {
        host = {
          id: hostRes.data.id,
          name: hostRes.data.first_name,
          stadtteil: hostRes.data.stadtteil,
          bio: hostRes.data.bio ?? null,
        };
      }

      if (treffenRes.data) {
        treffen = treffenRes.data.map((p) => {
          const fmt = formatDate(p.meeting_date ?? p.created_at);
          return {
            id: p.id,
            title: p.title,
            day: fmt?.day ?? "?",
            month: fmt?.month ?? "?",
            where: p.meeting_location ?? null,
          };
        });
      }

      stats = {
        stadtteil,
        members: membersRes.count ?? 0,
        newThisWeek: newMembersRes.count ?? 0,
      };
    } catch {
      // Non-fatal — sidebar stays empty
    }
  }

  return (
    <aside
      style={{
        width: 320,
        padding: "32px 0 32px 0",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        flexShrink: 0,
        position: "sticky",
        top: 65,
        alignSelf: "flex-start",
        height: "calc(100vh - 65px)",
        overflowY: "auto",
      }}
    >
      {/* Local Host card */}
      {host && (
        <div
          style={{
            background: "var(--color-sage-soft)",
            borderRadius: 20,
            padding: 20,
            border: "1px solid rgba(111,133,90,0.2)",
          }}
        >
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--color-sage-ink)",
              fontWeight: 600,
              fontFamily: "var(--font-mono)",
              marginBottom: 12,
            }}
          >
            Local Host · {host.stadtteil}
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
            <Avatar letter={host.name[0]} size={46} />
            <div
              style={{
                fontFamily: "var(--font-ui)",
                fontWeight: 600,
                fontSize: 19,
                letterSpacing: "-0.02em",
                color: "var(--color-ink)",
              }}
            >
              {host.name}
            </div>
          </div>
          {host.bio && (
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: 15,
                lineHeight: 1.4,
                color: "var(--color-ink-2)",
                letterSpacing: "-0.005em",
                marginBottom: 14,
              }}
            >
              „{host.bio}"
            </div>
          )}
          <Link
            href={`/host/${host.id}`}
            style={{
              display: "inline-block",
              marginTop: host.bio ? 0 : 14,
              background: "var(--color-ivory)",
              color: "var(--color-ink)",
              border: "1px solid var(--color-line)",
              padding: "8px 14px",
              borderRadius: 999,
              fontFamily: "var(--font-ui)",
              fontSize: 13,
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Hallo schreiben
          </Link>
        </div>
      )}

      {/* Treffen widget */}
      {treffen.length > 0 && (
        <div
          style={{
            background: "var(--color-ivory)",
            borderRadius: 20,
            border: "1px solid var(--color-line-soft)",
            padding: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 14,
            }}
          >
            <span
              style={{
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: 600,
                fontFamily: "var(--font-mono)",
                color: "var(--color-muted)",
              }}
            >
              Treffen diese Woche
            </span>
            <Link
              href="/treffen"
              style={{
                fontSize: 12,
                color: "var(--color-cobalt)",
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              Alle ansehen
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {treffen.map((t, i) => (
              <Link
                key={t.id}
                href={`/feed/${t.id}`}
                style={{
                  display: "block",
                  padding: "12px 0",
                  borderBottom: i < treffen.length - 1 ? "1px solid var(--color-line-soft)" : "none",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: 44,
                      textAlign: "center",
                      flexShrink: 0,
                      background: "var(--color-cobalt-soft)",
                      color: "var(--color-cobalt-ink)",
                      borderRadius: 10,
                      padding: "4px 0",
                      fontFamily: "var(--font-ui)",
                    }}
                  >
                    <div style={{ fontSize: 18, letterSpacing: "-0.02em", lineHeight: 1 }}>{t.day}</div>
                    <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em" }}>{t.month}</div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontFamily: "var(--font-ui)",
                        fontWeight: 600,
                        fontSize: 14.5,
                        letterSpacing: "-0.02em",
                        lineHeight: 1.3,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {t.title}
                    </div>
                    {t.where && (
                      <div
                        style={{
                          fontSize: 11.5,
                          color: "var(--color-muted)",
                          marginTop: 4,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {t.where}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      {stats && (
        <div
          style={{
            background: "var(--color-ivory)",
            borderRadius: 20,
            border: "1px solid var(--color-line-soft)",
            padding: 20,
          }}
        >
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontWeight: 600,
              fontFamily: "var(--font-mono)",
              color: "var(--color-muted)",
            }}
          >
            In {stats.stadtteil}
          </div>
          <div style={{ display: "flex", gap: 24, marginTop: 14 }}>
            <div>
              <div style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 28, letterSpacing: "-0.02em", color: "var(--color-ink)" }}>
                {stats.members}
              </div>
              <div style={{ fontSize: 12, color: "var(--color-muted)", marginTop: 2 }}>Mitglieder</div>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 28, letterSpacing: "-0.02em", color: "var(--color-ink)" }}>
                {stats.newThisWeek}
              </div>
              <div style={{ fontSize: 12, color: "var(--color-muted)", marginTop: 2 }}>diese Woche neu</div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
