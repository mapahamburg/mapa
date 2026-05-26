-- ─────────────────────────────────────────────────────────────────────────────
-- MAPA — Initial Schema
-- Apply in Supabase SQL Editor or via: supabase db push
-- ─────────────────────────────────────────────────────────────────────────────

-- ─── profiles ────────────────────────────────────────────────────────────────
-- Extends auth.users. Created during onboarding, not at signup.
CREATE TABLE IF NOT EXISTS profiles (
  id              UUID        REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  first_name      TEXT        NOT NULL,
  stadtteil       TEXT        NOT NULL,
  is_local_host   BOOLEAN     NOT NULL DEFAULT FALSE,
  bio             TEXT,
  can_help_with   TEXT[]      NOT NULL DEFAULT '{}',
  looking_for     TEXT[]      NOT NULL DEFAULT '{}',
  interests       TEXT[]      NOT NULL DEFAULT '{}',
  joined_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── posts ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS posts (
  id               UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id        UUID        NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type             TEXT        NOT NULL CHECK (type IN (
                                 'empfehlung', 'frage', 'treffen', 'suche', 'veranstaltung'
                               )),
  title            TEXT        NOT NULL CHECK (char_length(title) BETWEEN 3 AND 200),
  body             TEXT        CHECK (char_length(body) <= 2000),
  stadtteil        TEXT        NOT NULL,
  meeting_location TEXT,
  meeting_date     TIMESTAMPTZ,
  min_age          INTEGER     CHECK (min_age >= 0),
  max_age          INTEGER     CHECK (max_age >= 0),
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for chronological feed
CREATE INDEX IF NOT EXISTS posts_created_at_idx ON posts (created_at DESC);
CREATE INDEX IF NOT EXISTS posts_stadtteil_idx  ON posts (stadtteil);
CREATE INDEX IF NOT EXISTS posts_author_idx     ON posts (author_id);

-- ─── comments ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS comments (
  id         UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id    UUID        NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  author_id  UUID        NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  body       TEXT        NOT NULL CHECK (char_length(body) BETWEEN 1 AND 1000),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS comments_post_idx ON comments (post_id);

-- ─── saved_posts (bookmarks) ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS saved_posts (
  user_id    UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  post_id    UUID NOT NULL REFERENCES posts(id)    ON DELETE CASCADE,
  saved_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, post_id)
);

-- ─── Realtime ─────────────────────────────────────────────────────────────────
-- Enable Realtime for member count and live feed updates.
-- Run in Supabase Dashboard → Database → Replication, or uncomment:
-- ALTER PUBLICATION supabase_realtime ADD TABLE profiles;
-- ALTER PUBLICATION supabase_realtime ADD TABLE posts;
-- ALTER PUBLICATION supabase_realtime ADD TABLE comments;
