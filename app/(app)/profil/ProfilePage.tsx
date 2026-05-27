"use client";

import { useState, useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { Pencil, X, Plus, CheckCircle, MapPin, Calendar } from "lucide-react";
import { updateProfile } from "@/app/actions/profile";
import { STADTTEILE, INTERESTS } from "@/types/index";

// ─── Types ────────────────────────────────────────────────────────────────────

type ProfileData = {
  id:            string;
  first_name:    string;
  stadtteil:     string;
  bio:           string | null;
  can_help_with: string[];
  looking_for:   string[];
  interests:     string[];
  joined_at:     string;
};

type PostItem = {
  id:         string;
  type:       string;
  title:      string;
  created_at: string;
  stadtteil:  string;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function joinedAt(iso: string) {
  return "Seit " + new Intl.DateTimeFormat("de-DE", {
    month: "long", year: "numeric",
  }).format(new Date(iso));
}

function relativeTime(iso: string) {
  const diff  = Date.now() - new Date(iso).getTime();
  const mins  = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days  = Math.floor(diff / 86_400_000);
  if (mins  < 60) return `vor ${mins} Min.`;
  if (hours < 24) return `vor ${hours} Std.`;
  if (days  <  7) return `vor ${days} Tagen`;
  return new Intl.DateTimeFormat("de-DE", { day: "numeric", month: "short" }).format(new Date(iso));
}

const TYPE_LABEL: Record<string, string> = {
  empfehlung:   "Empfehlung",
  frage:        "Frage",
  treffen:      "Treffen",
  suche:        "Suche",
  veranstaltung:"Veranstaltung",
};

const TYPE_COLOR: Record<string, { bg: string; fg: string }> = {
  empfehlung:    { bg: "var(--cobalt-50)", fg: "var(--cobalt-600)" },
  frage:         { bg: "var(--cobalt-100)", fg: "var(--cobalt-600)" },
  treffen:       { bg: "rgba(194,106,63,0.12)", fg: "var(--mapa-clay-500)" },
  suche:         { bg: "var(--ash-100)",    fg: "var(--ash-600)"    },
  veranstaltung: { bg: "var(--cobalt-50)",  fg: "var(--cobalt-500)" },
};

// ─── Small components ─────────────────────────────────────────────────────────

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily:    "var(--font-mono)",
      fontSize:      11,
      fontWeight:    600,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color:         "var(--fg-subtle)",
      marginBottom:  10,
    }}>
      {children}
    </div>
  );
}

function TagChip({ label, variant = "neutral" }: {
  label:    string;
  variant?: "forest" | "cobalt" | "neutral";
}) {
  const styles: Record<string, React.CSSProperties> = {
    forest:  { background: "var(--color-sunk)", color: "var(--color-ink-2)", border: "1px solid var(--color-line)" },
    cobalt:  { background: "var(--cobalt-100)", color: "var(--cobalt-600)", border: "1px solid rgba(27,60,240,0.12)" },
    neutral: { background: "var(--surface-card)", color: "var(--fg)", border: "1px solid var(--border)" },
  };
  return (
    <span style={{
      display:      "inline-block",
      padding:      "4px 12px",
      borderRadius: 999,
      fontFamily:   "var(--font-ui)",
      fontSize:     13,
      lineHeight:   1,
      ...styles[variant],
    }}>
      {label}
    </span>
  );
}

function InitialsAvatar({ letter, size = 64 }: { letter: string; size?: number }) {
  return (
    <div style={{
      width:          size,
      height:         size,
      borderRadius:   "50%",
      background:     "var(--color-sunk)",
      border:         "1px solid var(--color-line)",
      display:        "flex",
      alignItems:     "center",
      justifyContent: "center",
      fontFamily:     "var(--font-ui)",
      fontSize:       size * 0.36,
      fontWeight:     600,
      color:          "var(--color-ink-2)",
      flexShrink:     0,
    }}>
      {letter.toUpperCase()}
    </div>
  );
}

// ─── Chip input (edit mode) ───────────────────────────────────────────────────

function ChipInput({
  name,
  tags,
  onChange,
  placeholder,
  variant = "neutral",
}: {
  name:        string;
  tags:        string[];
  onChange:    (t: string[]) => void;
  placeholder: string;
  variant?:    "forest" | "cobalt" | "neutral";
}) {
  const [input, setInput] = useState("");

  function add() {
    const val = input.trim().replace(/,+$/, "");
    if (val && !tags.includes(val) && tags.length < 12) {
      onChange([...tags, val]);
    }
    setInput("");
  }

  return (
    <div>
      {/* Hidden inputs for FormData */}
      {tags.map((t) => (
        <input key={t} type="hidden" name={name} value={t} />
      ))}

      <div style={{
        display:    "flex",
        flexWrap:   "wrap",
        gap:        8,
        padding:    "10px 12px",
        background: "var(--surface-input, var(--surface-card))",
        border:     "1px solid var(--border)",
        borderRadius: "var(--radius-m)",
        minHeight:  44,
      }}>
        {tags.map((t) => {
          const chipStyles: Record<string, React.CSSProperties> = {
            forest:  { background: "var(--color-sunk)", color: "var(--color-ink-2)" },
            cobalt:  { background: "var(--cobalt-100)", color: "var(--cobalt-600)" },
            neutral: { background: "var(--ash-100)",    color: "var(--fg)"         },
          };
          return (
            <span key={t} style={{
              display:      "inline-flex",
              alignItems:   "center",
              gap:          4,
              padding:      "3px 10px 3px 12px",
              borderRadius: 999,
              fontSize:     13,
              fontFamily:   "var(--font-ui)",
              ...chipStyles[variant],
            }}>
              {t}
              <button
                type="button"
                onClick={() => onChange(tags.filter((x) => x !== t))}
                style={{
                  background: "none",
                  border:     "none",
                  cursor:     "pointer",
                  padding:    0,
                  lineHeight: 1,
                  color:      "inherit",
                  opacity:    0.6,
                  display:    "flex",
                }}
              >
                <X size={11} strokeWidth={2} />
              </button>
            </span>
          );
        })}

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") { e.preventDefault(); add(); }
            if (e.key === "Backspace" && !input && tags.length > 0) {
              onChange(tags.slice(0, -1));
            }
          }}
          onBlur={add}
          placeholder={tags.length === 0 ? placeholder : ""}
          style={{
            border:      "none",
            outline:     "none",
            background:  "transparent",
            fontFamily:  "var(--font-ui)",
            fontSize:    13,
            color:       "var(--fg)",
            flex:        "1 1 120px",
            minWidth:    80,
          }}
        />
      </div>
      <p style={{ fontSize: 11, color: "var(--fg-subtle)", marginTop: 5 }}>
        Enter oder Komma zum Hinzufügen
      </p>
    </div>
  );
}

// ─── Save button ──────────────────────────────────────────────────────────────

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        padding:     "12px 28px",
        background:  pending ? "var(--cobalt-200)" : "var(--cobalt-500)",
        color:       "#fff",
        border:      "none",
        borderRadius:"var(--radius-m)",
        fontFamily:  "var(--font-ui)",
        fontSize:    15,
        fontWeight:  500,
        cursor:      pending ? "not-allowed" : "pointer",
        transition:  "background 150ms ease",
      }}
    >
      {pending ? "Wird gespeichert…" : "Speichern"}
    </button>
  );
}

// ─── View mode ────────────────────────────────────────────────────────────────

function ProfileView({
  profile,
  posts,
  onEdit,
}: {
  profile: ProfileData;
  posts:   PostItem[];
  onEdit:  () => void;
}) {
  return (
    <div style={{ maxWidth: 580 }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <InitialsAvatar letter={profile.first_name[0]} size={72} />
          <div>
            <h1 style={{
              fontFamily: "var(--font-display)",
              fontStyle:  "italic",
              fontSize:   32,
              fontWeight: 400,
              color:      "var(--ink)",
              margin:     "0 0 6px",
            }}>
              {profile.first_name}
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, color: "var(--fg-muted)" }}>
                <MapPin size={12} strokeWidth={1.5} />
                {profile.stadtteil}
              </span>
              <span style={{ color: "var(--border)", fontSize: 12 }}>·</span>
              <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, color: "var(--fg-muted)" }}>
                <Calendar size={12} strokeWidth={1.5} />
                {joinedAt(profile.joined_at)}
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onEdit}
          style={{
            display:      "flex",
            alignItems:   "center",
            gap:          6,
            padding:      "8px 16px",
            background:   "transparent",
            border:       "1px solid var(--border)",
            borderRadius: "var(--radius-m)",
            fontFamily:   "var(--font-ui)",
            fontSize:     13,
            color:        "var(--fg-muted)",
            cursor:       "pointer",
          }}
        >
          <Pencil size={13} strokeWidth={1.5} />
          Bearbeiten
        </button>
      </div>

      {/* Bio */}
      <div style={{
        marginBottom: 32,
        padding:     "18px 22px",
        background:  "var(--surface-card)",
        border:      "1px solid var(--border)",
        borderRadius:"var(--radius-l)",
      }}>
        {profile.bio ? (
          <p style={{
            fontFamily: "var(--font-display)",
            fontStyle:  "italic",
            fontSize:   17,
            fontWeight: 400,
            color:      "var(--ink)",
            lineHeight: 1.65,
            margin:     0,
          }}>
            {profile.bio}
          </p>
        ) : (
          <p style={{ fontSize: 14, color: "var(--fg-subtle)", margin: 0, fontStyle: "italic" }}>
            Noch keine Bio. Klick auf Bearbeiten, um dich kurz vorzustellen.
          </p>
        )}
      </div>

      {/* Ich kann helfen bei */}
      {profile.can_help_with.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <Eyebrow>Ich kann helfen bei</Eyebrow>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {profile.can_help_with.map((t) => (
              <TagChip key={t} label={t} variant="forest" />
            ))}
          </div>
        </div>
      )}

      {/* Ich suche gerade */}
      {profile.looking_for.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <Eyebrow>Ich suche gerade</Eyebrow>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {profile.looking_for.map((t) => (
              <TagChip key={t} label={t} variant="cobalt" />
            ))}
          </div>
        </div>
      )}

      {/* Interessen */}
      {profile.interests.length > 0 && (
        <div style={{ marginBottom: 36 }}>
          <Eyebrow>Interessen</Eyebrow>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {profile.interests.map((t) => (
              <TagChip key={t} label={t} variant="neutral" />
            ))}
          </div>
        </div>
      )}

      {/* My posts */}
      <div style={{ borderTop: "1px solid var(--border)", paddingTop: 28 }}>
        <Eyebrow>Meine Beiträge</Eyebrow>

        {posts.length === 0 ? (
          <p style={{ fontSize: 14, color: "var(--fg-subtle)", fontStyle: "italic" }}>
            Du hast noch nichts gepostet.
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {posts.map((p) => {
              const col = TYPE_COLOR[p.type] ?? { bg: "var(--ash-100)", fg: "var(--fg-muted)" };
              return (
                <Link
                  key={p.id}
                  href={`/feed/${p.id}`}
                  style={{
                    display:         "flex",
                    alignItems:      "center",
                    gap:             12,
                    padding:         "10px 12px",
                    borderRadius:    12,
                    textDecoration:  "none",
                    color:           "inherit",
                    transition:      "background 120ms ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-card)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <span style={{
                    flexShrink:   0,
                    padding:      "2px 9px",
                    borderRadius: 999,
                    fontSize:     11,
                    fontWeight:   500,
                    fontFamily:   "var(--font-mono)",
                    background:   col.bg,
                    color:        col.fg,
                  }}>
                    {TYPE_LABEL[p.type] ?? p.type}
                  </span>
                  <span style={{ flex: 1, fontSize: 14, color: "var(--fg)", fontFamily: "var(--font-ui)" }}>
                    {p.title}
                  </span>
                  <span style={{ flexShrink: 0, fontSize: 12, color: "var(--fg-subtle)" }}>
                    {relativeTime(p.created_at)}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Edit form ────────────────────────────────────────────────────────────────

function ProfileEditForm({
  profile,
  onDone,
}: {
  profile: ProfileData;
  onDone:  () => void;
}) {
  const [state, formAction] = useActionState(updateProfile, {});

  const [canHelpWith, setCanHelpWith] = useState<string[]>(profile.can_help_with);
  const [lookingFor,  setLookingFor]  = useState<string[]>(profile.looking_for);
  const [interests,   setInterests]   = useState<string[]>(profile.interests);
  const [bioLen,      setBioLen]      = useState(profile.bio?.length ?? 0);

  // Close after successful save (with a small delay to show "Gespeichert")
  if (state.success) {
    setTimeout(() => onDone(), 900);
  }

  return (
    <div style={{ maxWidth: 580 }}>

      {/* Top bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontStyle:  "italic",
          fontSize:   28,
          fontWeight: 400,
          color:      "var(--ink)",
          margin:     0,
        }}>
          Profil bearbeiten
        </h1>
        <button
          type="button"
          onClick={onDone}
          style={{
            display:      "flex",
            alignItems:   "center",
            gap:          6,
            padding:      "8px 14px",
            background:   "transparent",
            border:       "1px solid var(--border)",
            borderRadius: "var(--radius-m)",
            fontFamily:   "var(--font-ui)",
            fontSize:     13,
            color:        "var(--fg-muted)",
            cursor:       "pointer",
          }}
        >
          <X size={13} strokeWidth={1.5} />
          Abbrechen
        </button>
      </div>

      <form action={formAction}>
        {/* ── Über dich ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>

          {/* Vorname */}
          <div>
            <label style={labelStyle}>Vorname</label>
            <input
              name="first_name"
              defaultValue={profile.first_name}
              maxLength={40}
              style={inputStyle}
            />
          </div>

          {/* Stadtteil */}
          <div>
            <label style={labelStyle}>Stadtteil</label>
            <select
              name="stadtteil"
              defaultValue={profile.stadtteil}
              style={{ ...inputStyle, cursor: "pointer" }}
            >
              {STADTTEILE.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Bio */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <label style={labelStyle}>Bio</label>
              <span style={{ fontSize: 11, color: bioLen > 260 ? "var(--mapa-clay-500)" : "var(--fg-subtle)" }}>
                {bioLen}/300
              </span>
            </div>
            <textarea
              name="bio"
              defaultValue={profile.bio ?? ""}
              maxLength={300}
              rows={4}
              onChange={(e) => setBioLen(e.target.value.length)}
              placeholder="Stell dich kurz vor — was machst du, was suchst du, was kannst du empfehlen?"
              style={{
                ...inputStyle,
                resize:   "vertical",
                minHeight: 96,
              }}
            />
          </div>
        </div>

        {/* ── Ich kann helfen bei ── */}
        <div style={{ marginBottom: 28 }}>
          <Eyebrow>Ich kann helfen bei</Eyebrow>
          <p style={{ fontSize: 13, color: "var(--fg-muted)", marginBottom: 10, lineHeight: 1.5 }}>
            Wobei kannst du anderen Familien weiterhelfen?
          </p>
          <ChipInput
            name="can_help_with"
            tags={canHelpWith}
            onChange={setCanHelpWith}
            placeholder="z. B. Spielplatz-Tipps, Hebammen-Empfehlungen…"
            variant="forest"
          />
        </div>

        {/* ── Ich suche gerade ── */}
        <div style={{ marginBottom: 28 }}>
          <Eyebrow>Ich suche gerade</Eyebrow>
          <p style={{ fontSize: 13, color: "var(--fg-muted)", marginBottom: 10, lineHeight: 1.5 }}>
            Was suchst du gerade? Krabbelgruppe, Babysitter, Fahrgemeinschaft…
          </p>
          <ChipInput
            name="looking_for"
            tags={lookingFor}
            onChange={setLookingFor}
            placeholder="z. B. Krabbelgruppe, Kinderarzt-Empfehlung…"
            variant="cobalt"
          />
        </div>

        {/* ── Interessen ── */}
        <div style={{ marginBottom: 32 }}>
          <Eyebrow>Interessen</Eyebrow>

          {/* Hidden inputs for selected interests */}
          {interests.map((i) => (
            <input key={i} type="hidden" name="interests" value={i} />
          ))}

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {INTERESTS.map((interest) => {
              const selected = interests.includes(interest);
              return (
                <button
                  key={interest}
                  type="button"
                  onClick={() =>
                    setInterests(
                      selected
                        ? interests.filter((x) => x !== interest)
                        : [...interests, interest]
                    )
                  }
                  style={{
                    padding:      "6px 14px",
                    borderRadius: 999,
                    border:       selected ? "1px solid var(--cobalt-200)" : "1px solid var(--border)",
                    background:   selected ? "var(--cobalt-50)"            : "transparent",
                    color:        selected ? "var(--cobalt-600)"            : "var(--fg-muted)",
                    fontFamily:   "var(--font-ui)",
                    fontSize:     13,
                    fontWeight:   selected ? 500 : 400,
                    cursor:       "pointer",
                    transition:   "all 150ms ease",
                    display:      "flex",
                    alignItems:   "center",
                    gap:          5,
                  }}
                >
                  {selected && <CheckCircle size={12} strokeWidth={2} />}
                  {interest}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Actions ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, paddingTop: 4 }}>
          <SaveButton />
          {state.success && (
            <span style={{
              display:    "inline-flex",
              alignItems: "center",
              gap:        6,
              fontSize:   13,
              color:      "var(--fg-muted)",
            }}>
              <CheckCircle size={15} strokeWidth={1.5} />
              Gespeichert
            </span>
          )}
          {state.error && (
            <span style={{ fontSize: 13, color: "var(--danger)" }}>
              {state.error}
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

// ─── Shared input styles ──────────────────────────────────────────────────────

const labelStyle: React.CSSProperties = {
  display:     "block",
  marginBottom: 6,
  fontSize:    13,
  fontWeight:  500,
  color:       "var(--fg)",
  fontFamily:  "var(--font-ui)",
};

const inputStyle: React.CSSProperties = {
  width:        "100%",
  padding:      "10px 14px",
  background:   "var(--surface-card)",
  border:       "1px solid var(--border)",
  borderRadius: "var(--radius-m)",
  fontFamily:   "var(--font-ui)",
  fontSize:     14,
  color:        "var(--fg)",
  outline:      "none",
  boxSizing:    "border-box",
};

// ─── Main export ──────────────────────────────────────────────────────────────

export function ProfilePage({
  profile,
  posts,
}: {
  profile: ProfileData;
  posts:   PostItem[];
}) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return <ProfileEditForm profile={profile} onDone={() => setEditing(false)} />;
  }

  return <ProfileView profile={profile} posts={posts} onEdit={() => setEditing(true)} />;
}
