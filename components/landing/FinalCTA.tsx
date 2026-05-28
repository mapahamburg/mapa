import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

// Logo-dot — scaled to the large wordmark size
const FS = 108;
const dotSize  = FS * 0.13;
const dotLift  = FS * 0.18;
const dotInset = -(FS * 0.04);

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

        {/* Large "mapa." wordmark — Logo-DNA */}
        <div
          className="fs-cta-wm"
          style={{
            display: "inline-flex",
            alignItems: "flex-end",
            fontFamily: "var(--font-ui)",
            fontWeight: 800,
            letterSpacing: "-0.06em",
            lineHeight: 0.88,
            color: "var(--mapa-paper)",
            marginBottom: 48,
          }}
        >
          mapa
          <span
            style={{
              display: "inline-block",
              borderRadius: "50%",
              width: dotSize,
              height: dotSize,
              marginLeft: dotInset,
              marginBottom: dotLift,
              background: "var(--mapa-clay-500)",
              flexShrink: 0,
            }}
          />
        </div>

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
            {isLoggedIn ? "Zum Feed" : "mapa beitreten"}
          </Link>
        </div>
      </div>
    </section>
  );
}
