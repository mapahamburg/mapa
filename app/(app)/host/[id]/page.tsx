import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Avatar } from "@/components/ui/Avatar";
import { Tag } from "@/components/ui/Tag";
import type { PostType } from "@/types";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("first_name, stadtteil")
    .eq("id", id)
    .eq("is_local_host", true)
    .single();
  if (!data) return { title: "Local Host · mapa" };
  return { title: `${data.first_name} · Local Host ${data.stadtteil} · mapa` };
}

export default async function HostProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: host }, { data: posts }] = await Promise.all([
    supabase
      .from("profiles")
      .select("id, first_name, stadtteil, bio, joined_at")
      .eq("id", id)
      .eq("is_local_host", true)
      .single(),
    supabase
      .from("posts")
      .select("id, type, title, stadtteil, created_at")
      .eq("author_id", id)
      .order("created_at", { ascending: false })
      .limit(8),
  ]);

  if (!host) notFound();

  const joinedYear = new Date(host.joined_at).getFullYear();

  return (
    <main className="app-main-pad">
      <div style={{ maxWidth: 560 }}>

        {/* Back */}
        <Link
          href="/feed"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            textDecoration: "none",
            color: "var(--color-subtle)",
            fontFamily: "var(--font-ui)",
            fontSize: 14,
            marginBottom: 28,
          }}
        >
          <ArrowLeft size={16} strokeWidth={1.5} />
          Zurück zum Feed
        </Link>

        {/* Host card */}
        <div
          style={{
            background: "var(--color-sage-soft)",
            border: "1px solid rgba(111,133,90,0.2)",
            borderRadius: 20,
            padding: 28,
            marginBottom: 32,
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-sage-ink)",
              marginBottom: 16,
              fontWeight: 600,
            }}
          >
            Local Host · {host.stadtteil}
          </div>

          {/* Avatar + name */}
          <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 20 }}>
            <Avatar letter={host.first_name[0]} size={56} />
            <div>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontSize: 28,
                  fontWeight: 400,
                  color: "var(--color-ink)",
                  margin: "0 0 6px",
                  letterSpacing: "-0.015em",
                }}
              >
                {host.first_name}
              </h1>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, color: "var(--color-muted)", fontFamily: "var(--font-ui)" }}>
                  <MapPin size={12} strokeWidth={1.5} />
                  {host.stadtteil}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, color: "var(--color-muted)", fontFamily: "var(--font-ui)" }}>
                  <Calendar size={12} strokeWidth={1.5} />
                  Dabei seit {joinedYear}
                </span>
              </div>
            </div>
          </div>

          {/* Bio */}
          {host.bio && (
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: 16,
                lineHeight: 1.55,
                color: "var(--color-ink-2)",
                margin: "0 0 24px",
              }}
            >
              „{host.bio}"
            </p>
          )}

          {/* CTA */}
          <a
            href={`mailto:hosts@mapa.hamburg?subject=Hallo ${host.first_name} aus ${host.stadtteil}`}
            style={{
              display: "inline-block",
              background: "var(--color-sage-ink)",
              color: "var(--color-paper)",
              fontFamily: "var(--font-ui)",
              fontSize: 14,
              fontWeight: 500,
              borderRadius: 999,
              padding: "10px 20px",
              textDecoration: "none",
            }}
          >
            Hallo schreiben
          </a>
        </div>

        {/* Recent posts */}
        {posts && posts.length > 0 && (
          <section>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-subtle)",
                fontWeight: 600,
                marginBottom: 14,
              }}
            >
              Beiträge von {host.first_name}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/feed/${post.id}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "10px 12px",
                    borderRadius: 12,
                    textDecoration: "none",
                    color: "inherit",
                    transition: "background 120ms ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-sunk)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <Tag type={post.type as PostType} />
                  <span
                    style={{
                      flex: 1,
                      fontFamily: "var(--font-display)",
                      fontStyle: "italic",
                      fontSize: 15,
                      color: "var(--color-ink)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {post.title}
                  </span>
                  <span style={{ flexShrink: 0, fontSize: 12, color: "var(--color-subtle)", fontFamily: "var(--font-ui)" }}>
                    {post.stadtteil}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
