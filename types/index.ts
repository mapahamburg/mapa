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
  | "Working Parents"
  | "Flohmärkte & Tauschen";

export const INTERESTS: Interest[] = [
  "Familiencafés",
  "Spielplätze & Treffen",
  "Kurse & Sport",
  "Events im Viertel",
  "Lokale Empfehlungen",
  "Babysitter & Hebammen",
  "Working Parents",
  "Flohmärkte & Tauschen",
];
