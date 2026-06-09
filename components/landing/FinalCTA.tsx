import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { MapaMark } from "@/components/ui/MapaMark";

export async function FinalCTA() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const isLoggedIn = !!user;
  return (
    <section className="section-pad" style={{ background: "var(--mapa-paper)", paddingTop: 0 }}>
      <div
        className="cta-inner"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          background: "var(--color-cobalt)",
          borderRadius: 28,
          color: "var(--mapa-paper)",
        }}
      >
        {/* "Frag mal auf" — small serif italic intro line */}
        <p
          className="cta-intro"
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 400,
            lineHeight: 1,
            margin: "0 0 4px 4px",
            color: "rgba(255,253,248,0.65)",
          }}
        >
          Frag mal auf
        </p>

        {/* Large "mapa." wordmark — canonical MapaMark, dot positioned by CSS */}
        <MapaMark
          theme="cobalt"
          className="fs-cta-wm"
          style={{ display: "block", marginBottom: 48 }}
        />

        {/* Bottom row: sentence left — button right */}
        <div className="cta-row">
          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 17,
              lineHeight: 1.65,
              color: "rgba(255,253,248,0.72)",
              margin: 0,
              maxWidth: 480,
              fontWeight: 400,
            }}
          >
            Wenn das ein Satz wird, den man in Hamburg hört, am Spielplatz, im
            Café, beim Elternabend, sind wir am Ziel.
          </p>

          <Link
            href={isLoggedIn ? "/feed" : "/signup"}
            className="cta-btn"
            style={{
              background: "var(--mapa-paper)",
              color: "var(--color-cobalt)",
            }}
          >
            {isLoggedIn ? "Zum Feed" : "Kostenlos beitreten"}
          </Link>
        </div>
      </div>
    </section>
  );
}
