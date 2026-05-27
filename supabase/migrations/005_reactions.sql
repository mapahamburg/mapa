-- One reaction per user per post (toggle model)
-- No public count — private acknowledgement only (per brand guidelines)

CREATE TABLE IF NOT EXISTS reactions (
  post_id    uuid REFERENCES posts(id) ON DELETE CASCADE,
  user_id    uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (post_id, user_id)
);

ALTER TABLE reactions ENABLE ROW LEVEL SECURITY;

-- Anyone logged in can see reactions (needed for "did I react?" check)
CREATE POLICY "authenticated can read reactions"
  ON reactions FOR SELECT
  TO authenticated
  USING (true);

-- Users can only insert their own reaction
CREATE POLICY "user can react"
  ON reactions FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Users can only delete their own reaction
CREATE POLICY "user can unreact"
  ON reactions FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());
