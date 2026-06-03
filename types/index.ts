// ─── Feed / UI display types ──────────────────────────────────────────────────
// These are the shaped, pre-formatted types used in components.
// They are distinct from the raw DB row types in types/supabase.ts.

/**
 * A post as displayed in the feed list (PostCard / CompactPost).
 * Pre-formatted for display: relative time, meeting block, etc.
 */
export interface FeedPost {
  id:       string;
  type:     PostType;
  author:   string;       // first_name from profiles
  district: string;       // stadtteil
  time:     string;       // relative time string e.g. "vor 2 Std."
  section:  "heute" | "woche";
  title:    string;
  body?:    string;
  meeting?: {
    where: string;
    when:  string;
    age?:  string;
  };
  likes:    number;       // reserved — always 0 until likes table ships
  comments: number;
  isSaved?: boolean;
  lat?:     number | null;
  lng?:     number | null;
  imageUrl?: string | null;
}

/**
 * Full post data for the PostDetail page.
 * meeting_date and meeting_location are already formatted strings.
 */
export interface PostDetail {
  id:               string;
  type:             string;
  title:            string;
  body?:            string;
  author_name:      string;
  stadtteil:        string;
  created_at:       string;  // formatted relative time
  meeting_location?: string;
  meeting_date?:    string;  // formatted German date string
  min_age?:         number;
  max_age?:         number;
  image_url?:       string | null;
}

/** A single comment in the PostDetail view. */
export interface CommentItem {
  id:          string;
  author_name: string;
  body:        string;
  created_at:  string;  // formatted relative time
}

// ─── Post types ──────────────────────────────────────────────────────────────

export type PostType =
  | "empfehlung"
  | "frage"
  | "treffen"
  | "suche"
  | "veranstaltung";

export interface Post {
  id: string;
  type: PostType;
  title: string;
  body: string | null;
  author_id: string;
  stadtteil: Stadtteil;
  created_at: string;
  // Optional meeting fields (present when type === 'treffen' | 'veranstaltung')
  meeting_location?: string | null;
  meeting_date?: string | null;
  min_age?: number | null;
  max_age?: number | null;
}

export interface Comment {
  id: string;
  post_id: string;
  author_id: string;
  body: string;
  created_at: string;
}

// ─── User / Profile ───────────────────────────────────────────────────────────

export interface Profile {
  id: string;
  first_name: string;
  stadtteil: Stadtteil;
  is_local_host: boolean;
  bio?: string | null;
  can_help_with: string[];
  looking_for: string[];
  joined_at: string;
}

// ─── Geography ───────────────────────────────────────────────────────────────

export type Stadtteil =
  | "Eppendorf"
  | "Winterhude"
  | "Hoheluft"
  | "Eimsbüttel"
  | "Sternschanze"
  | "Altona"
  | "Ottensen"
  | "St. Pauli"
  | "Innenstadt"
  | "Uhlenhorst"
  | "Barmbek"
  | "HafenCity";

export const STADTTEILE: Stadtteil[] = [
  "Eppendorf",
  "Winterhude",
  "Hoheluft",
  "Eimsbüttel",
  "Sternschanze",
  "Altona",
  "Ottensen",
  "St. Pauli",
  "Innenstadt",
  "Uhlenhorst",
  "Barmbek",
  "HafenCity",
];

// ─── Interests ────────────────────────────────────────────────────────────────

export type Interest =
  | "Familiencafés"
  | "Spielplätze & Treffen"
  | "Kurse & Sport"
  | "Events im Viertel"
  | "Lokale Empfehlungen"
  | "Babysitter & Hebammen"
  | "Kita & Krabbelgruppe"
  | "Flohmärkte & Tauschen";

export const INTERESTS: Interest[] = [
  "Spielplätze & Treffen",
  "Kita & Krabbelgruppe",
  "Familiencafés",
  "Events im Viertel",
  "Kurse & Sport",
  "Babysitter & Hebammen",
  "Flohmärkte & Tauschen",
  "Lokale Empfehlungen",
];

// ─── Kreise ───────────────────────────────────────────────────────────────────

export type KreisStatus = "pending" | "active" | "closed";
export type KreisMemberRole = "member" | "host";
export type KreisMemberStatus = "pending" | "active" | "removed";

export interface Kreis {
  id:           string;
  name:         string;
  beschreibung: string | null;
  stadtteil:    string;
  thema:        string | null;
  max_members:  number;
  status:       KreisStatus;
  created_by:   string | null;
  approved_by:  string | null;
  created_at:   string;
}

/** Kreis with derived member count, for list views */
export interface KreisCard {
  id:           string;
  name:         string;
  beschreibung: string | null;
  stadtteil:    string;
  thema:        string | null;
  max_members:  number;
  member_count: number;
  is_member:    boolean;
  /** role of the current user, undefined when not a member */
  my_role?:     KreisMemberRole;
}

export const KREIS_THEMEN = [
  "Spielgruppe",
  "Ausflüge",
  "Sport & Bewegung",
  "Kochen & Backen",
  "Lesen & Vorlesen",
  "Elterncafé",
  "Babys & Kleinkinder",
  "Schule & Kita",
  "Freiwilliges",
  "Sonstiges",
] as const;

export type KreisThema = (typeof KREIS_THEMEN)[number];
