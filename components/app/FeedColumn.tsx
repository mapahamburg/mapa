"use client";

import { useState } from "react";
import { CompactPost } from "@/components/app/PostCard";
import { NowCard } from "@/components/app/NowCard";
import { PulseStrip } from "@/components/app/PulseStrip";
import { SectionDivider } from "@/components/app/SectionDivider";
import { QuietQuestionList } from "@/components/app/QuietQuestionList";
import { CompactRow } from "@/components/app/CompactRow";
import { FeedEndState } from "@/components/app/FeedEndState";
import { InFeedHostCard } from "@/components/app/InFeedHostCard";
import type { FeedPost } from "@/types";

interface FeedColumnProps {
  posts: FeedPost[];
  userName?: string;
  stadtteil?: string;
  host?: { name: string; bio: string | null };
}

export function FeedColumn({
  posts,
  userName = "du",
  stadtteil = "Hamburg",
  host,
}: FeedColumnProps) {
  const DISTRICTS = [
    stadtteil,
    "+ Eppendorf",
    "+ Hoheluft",
    "+ Alle Stadtteile",
  ].filter((d, i, arr) => arr.indexOf(d) === i);

  const [activeDistricts, setActiveDistricts] = useState<Set<string>>(
    new Set([stadtteil])
  );

  function toggleDistrict(d: string) {
    const key = d.replace(/^\+ /, "");
    if (key === "Alle Stadtteile") {
      setActiveDistricts(new Set(["Alle Stadtteile"]));
      return;
    }
    setActiveDistricts((prev) => {
      const next = new Set(prev);
      next.delete("Alle Stadtteile");
      if (next.has(key)) {
        next.delete(key);
        if (next.size === 0) next.add(stadtteil);
      } else {
        next.add(key);
      }
      return next;
    });
  }

  const visible = activeDistricts.has("Alle Stadtteile")
    ? posts
    : posts.filter((p) => activeDistricts.has(p.district));

  // Section buckets
  const heutePosts = visible.filter((p) => p.section === "heute");
  const wochePosts = visible.filter((p) => p.section === "woche");

  // "Jetzt" hero: first heute treffen or veranstaltung
  const jetzt = heutePosts.find(
    (p) => p.type === "treffen" || p.type === "veranstaltung"
  );

  // "Heute" compact cards: all heute posts except the jetzt hero
  const heuteCards = heutePosts.filter((p) => p !== jetzt);

  // "Brauchen Hilfe": all unanswered fragen from any section
  const unanswered = visible.filter(
    (p) => p.type === "frage" && p.comments === 0
  );

  // Today's date string for the eyebrow
  const today = new Date().toLocaleDateString("de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const userDistrict = stadtteil;

  return (
    <main className="app-feed">
      {/* ── Feed header ── */}
      <div>
        {/* Eyebrow with pulsing dot */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 14,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--color-cobalt)",
              flexShrink: 0,
              boxShadow: "0 0 0 4px rgba(37,64,214,0.12)",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--color-cobalt)",
              fontWeight: 500,
            }}
          >
            {today} · {userDistrict}
          </span>
        </div>

        {/* Greeting */}
        <div
          className="feed-greeting"
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            color: "var(--color-ink)",
          }}
        >
          Hallo {userName}.
        </div>

        {/* Sub */}
        {visible.length > 0 && (
          <div
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 15,
              color: "var(--color-muted)",
              marginTop: 6,
              maxWidth: 480,
            }}
          >
            {jetzt
              ? `Ein Treffen heute in ${userDistrict}. ${unanswered.length > 0 ? `${unanswered.length} ${unanswered.length === 1 ? "Frage wartet" : "Fragen warten"} noch auf eine Antwort.` : ""}`
              : `${visible.length} neue ${visible.length === 1 ? "Beitrag" : "Beiträge"} in deinem Stadtteil.`}
          </div>
        )}
      </div>

      {/* ── Mobile Local Host card (hidden on desktop via CSS) ── */}
      {host && (
        <div className="mob-host-card">
          <InFeedHostCard name={host.name} stadtteil={userDistrict} bio={host.bio} />
        </div>
      )}

      {/* ── Pulse strip ── */}
      <PulseStrip posts={visible} />

      {/* ── District filters ── */}
      <div className="district-filter-row">
        {DISTRICTS.map((d) => {
          const key = d.replace(/^\+ /, "");
          const isActive =
            key === "Alle Stadtteile"
              ? activeDistricts.has("Alle Stadtteile")
              : activeDistricts.has(key);
          return (
            <button
              key={d}
              type="button"
              onClick={() => toggleDistrict(d)}
              className="district-filter-chip"
              style={{
                background: isActive ? "var(--color-ink)" : "var(--color-paper)",
                color: isActive ? "var(--color-paper)" : "var(--color-ink)",
                border: isActive ? "none" : "1px solid var(--color-line)",
                fontFamily: "var(--font-ui)",
                fontWeight: isActive ? 500 : 400,
                cursor: "pointer",
                transition: `background var(--dur-base), color var(--dur-base)`,
              }}
            >
              {d}
            </button>
          );
        })}
      </div>

      {/* ── Jetzt ── */}
      {jetzt && (
        <>
          <SectionDivider
            label={`Jetzt · ${jetzt.district}`}
            variant="jetzt"
          />
          <NowCard post={jetzt} />
        </>
      )}

      {/* ── Heute ── */}
      {heuteCards.length > 0 && (
        <>
          <SectionDivider
            label={`Heute in ${userDistrict}`}
            count={heuteCards.length}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {heuteCards.map((p) => (
              <CompactPost key={p.id} post={p} />
            ))}
          </div>
        </>
      )}

      {/* ── Brauchen Hilfe ── */}
      {unanswered.length > 0 && (
        <>
          <SectionDivider label="Brauchen Hilfe" variant="hilfe" />
          <QuietQuestionList questions={unanswered} />
        </>
      )}

      {/* ── Diese Woche ── */}
      {wochePosts.length > 0 && (
        <>
          <SectionDivider
            label={`Diese Woche · ${wochePosts.length} weitere`}
          />
          <div>
            {wochePosts.map((p, i) => (
              <CompactRow key={p.id} post={p} isFirst={i === 0} />
            ))}
          </div>
        </>
      )}

      {/* ── End state or empty state ── */}
      {visible.length > 0 ? (
        <FeedEndState />
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "64px 0",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: 20,
              color: "var(--color-muted)",
              letterSpacing: "-0.01em",
            }}
          >
            In {userDistrict} ist es noch ruhig.
          </div>
          <div
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 14,
              color: "var(--color-subtle)",
              marginTop: 8,
              marginBottom: 20,
            }}
          >
            Ein guter Moment, um den Anfang zu machen.
          </div>
          <a
            href="/feed/new"
            style={{
              display: "inline-block",
              background: "var(--color-cobalt)",
              color: "#fff",
              fontFamily: "var(--font-ui)",
              fontSize: 14,
              fontWeight: 500,
              borderRadius: 999,
              padding: "10px 20px",
              textDecoration: "none",
            }}
          >
            Beitrag schreiben
          </a>
        </div>
      )}
    </main>
  );
}
