-- Opt-in/out of email notifications when someone comments on your post.
-- Default TRUE so existing members are notified from day one.

ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS notify_comments BOOLEAN NOT NULL DEFAULT TRUE;
