-- ─────────────────────────────────────────────────────────────────────────────
-- MAPA — Kreise (Gruppen)
-- Small, curated, stadtteil-local groups for families.
-- Apply in Supabase SQL Editor.
-- ─────────────────────────────────────────────────────────────────────────────

-- ─── kreise ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS kreise (
  id           UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  name         TEXT        NOT NULL CHECK (char_length(name) BETWEEN 3 AND 80),
  beschreibung TEXT        CHECK (char_length(beschreibung) <= 500),
  stadtteil    TEXT        NOT NULL,
  thema        TEXT,                         -- e.g. 'Spielgruppe', 'Sport', 'Kochen'
  max_members  INTEGER     NOT NULL DEFAULT 40,
  status       TEXT        NOT NULL DEFAULT 'pending'
                             CHECK (status IN ('pending', 'active', 'closed')),
  created_by   UUID        REFERENCES profiles(id) ON DELETE SET NULL,
  approved_by  UUID        REFERENCES profiles(id) ON DELETE SET NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS kreise_stadtteil_idx ON kreise (stadtteil);
CREATE INDEX IF NOT EXISTS kreise_status_idx    ON kreise (status);

-- ─── kreis_members ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS kreis_members (
  kreis_id    UUID NOT NULL REFERENCES kreise(id) ON DELETE CASCADE,
  profile_id  UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role        TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('member', 'host')),
  status      TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('pending', 'active', 'removed')),
  joined_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (kreis_id, profile_id)
);

CREATE INDEX IF NOT EXISTS kreis_members_profile_idx ON kreis_members (profile_id);

-- ─── posts: add kreis_id column ───────────────────────────────────────────────
-- NULL  = public feed post
-- UUID  = Kreis-only post (only visible to active members)
ALTER TABLE posts ADD COLUMN IF NOT EXISTS kreis_id UUID REFERENCES kreise(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS posts_kreis_idx ON posts (kreis_id);

-- ─── RLS ─────────────────────────────────────────────────────────────────────

ALTER TABLE kreise       ENABLE ROW LEVEL SECURITY;
ALTER TABLE kreis_members ENABLE ROW LEVEL SECURITY;

-- kreise: active kreise are readable by everyone; pending only by creator
CREATE POLICY "Aktive Kreise sind lesbar"
  ON kreise FOR SELECT
  USING (status = 'active' OR auth.uid() = created_by);

-- kreise: any authenticated user may propose a new Kreis
CREATE POLICY "Nutzer können Kreise vorschlagen"
  ON kreise FOR INSERT
  WITH CHECK (auth.uid() = created_by);

-- kreise: only Local Hosts (is_local_host = true) or the creator may update
CREATE POLICY "Hosts und Ersteller können Kreise bearbeiten"
  ON kreise FOR UPDATE
  USING (
    auth.uid() = created_by
    OR EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_local_host = TRUE
    )
  );

-- kreis_members: members can see all active memberships for kreise they belong to
CREATE POLICY "Mitglieder sehen andere Mitglieder"
  ON kreis_members FOR SELECT
  USING (
    auth.uid() = profile_id
    OR EXISTS (
      SELECT 1 FROM kreis_members km2
      WHERE km2.kreis_id = kreis_members.kreis_id
        AND km2.profile_id = auth.uid()
        AND km2.status = 'active'
    )
  );

-- kreis_members: any authenticated user may request to join
CREATE POLICY "Nutzer können beitreten"
  ON kreis_members FOR INSERT
  WITH CHECK (auth.uid() = profile_id);

-- kreis_members: users can update their own membership (e.g. leave); hosts can update any
CREATE POLICY "Mitglieder können eigene Mitgliedschaft bearbeiten"
  ON kreis_members FOR UPDATE
  USING (
    auth.uid() = profile_id
    OR EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_local_host = TRUE
    )
  );

-- kreis_members: users can delete (leave) their own membership
CREATE POLICY "Mitglieder können austreten"
  ON kreis_members FOR DELETE
  USING (auth.uid() = profile_id);

-- posts: keep existing public read; kreis posts are filtered in application layer
-- (The existing "Posts sind öffentlich lesbar" policy already covers SELECT.)
-- We restrict kreis posts via application queries (WHERE kreis_id = ... AND member check).
