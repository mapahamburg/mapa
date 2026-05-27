-- Contact requests — moderated relay between members
-- hey@mapa.hamburg receives every request and forwards manually.

CREATE TABLE IF NOT EXISTS contact_requests (
  id              uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id       uuid        REFERENCES auth.users(id) ON DELETE SET NULL,
  sender_name     text        NOT NULL,
  sender_stadtteil text,
  recipient_name  text        NOT NULL,
  post_id         uuid        REFERENCES posts(id) ON DELETE SET NULL,
  post_title      text,
  message         text,
  contact_info    text        NOT NULL,
  created_at      timestamptz DEFAULT now()
);

-- Only the sender can read their own requests; admins via service role
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "sender can insert"
  ON contact_requests FOR INSERT
  TO authenticated
  WITH CHECK (sender_id = auth.uid());

CREATE POLICY "sender can read own"
  ON contact_requests FOR SELECT
  TO authenticated
  USING (sender_id = auth.uid());
