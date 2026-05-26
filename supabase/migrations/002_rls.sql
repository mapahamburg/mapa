-- ─────────────────────────────────────────────────────────────────────────────
-- MAPA — Row Level Security
-- ─────────────────────────────────────────────────────────────────────────────

-- Enable RLS on all tables
ALTER TABLE profiles    ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts       ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments    ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_posts ENABLE ROW LEVEL SECURITY;

-- ─── profiles ────────────────────────────────────────────────────────────────
CREATE POLICY "Profiles sind öffentlich lesbar"
  ON profiles FOR SELECT USING (TRUE);

CREATE POLICY "Nutzer erstellt eigenes Profil"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Nutzer bearbeitet eigenes Profil"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- ─── posts ───────────────────────────────────────────────────────────────────
CREATE POLICY "Posts sind öffentlich lesbar"
  ON posts FOR SELECT USING (TRUE);

CREATE POLICY "Eingeloggte Nutzer können posten"
  ON posts FOR INSERT
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Autoren können eigene Posts bearbeiten"
  ON posts FOR UPDATE
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Autoren können eigene Posts löschen"
  ON posts FOR DELETE
  USING (auth.uid() = author_id);

-- ─── comments ────────────────────────────────────────────────────────────────
CREATE POLICY "Kommentare sind öffentlich lesbar"
  ON comments FOR SELECT USING (TRUE);

CREATE POLICY "Eingeloggte Nutzer können kommentieren"
  ON comments FOR INSERT
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Autoren können eigene Kommentare löschen"
  ON comments FOR DELETE
  USING (auth.uid() = author_id);

-- ─── saved_posts ─────────────────────────────────────────────────────────────
CREATE POLICY "Nutzer sieht eigene Saves"
  ON saved_posts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Nutzer kann speichern"
  ON saved_posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Nutzer kann Saves entfernen"
  ON saved_posts FOR DELETE
  USING (auth.uid() = user_id);
