-- ─────────────────────────────────────────────────────────────────────────────
-- MAPA — Seed-Timestamps auffrischen
-- Führe dieses Script im Supabase SQL Editor aus wenn die Seed-Daten
-- "zu alt" wirken (alle Posts zeigen "vor X Wochen").
-- Betrifft nur die Seed-Profile (UUID-Prefix a1000000-*).
-- Echte User-Posts werden nicht angetastet.
-- ─────────────────────────────────────────────────────────────────────────────

DO $$
DECLARE
  shift INTERVAL;
BEGIN

  -- Berechne wie weit der neueste Seed-Post hinter "vor 1 Stunde" liegt
  SELECT (NOW() - INTERVAL '1 hour') - MAX(p.created_at)
  INTO shift
  FROM posts p
  JOIN profiles pr ON pr.id = p.author_id
  WHERE pr.id::text LIKE 'a1000000%';

  -- Posts verschieben
  UPDATE posts p
  SET created_at = p.created_at + shift
  FROM profiles pr
  WHERE pr.id = p.author_id
    AND pr.id::text LIKE 'a1000000%';

  -- Kommentare mitverschieben
  UPDATE comments c
  SET created_at = c.created_at + shift
  FROM posts p
  JOIN profiles pr ON pr.id = p.author_id
  WHERE c.post_id = p.id
    AND pr.id::text LIKE 'a1000000%';

  RAISE NOTICE 'Timestamps um % verschoben.', shift;

END $$;
