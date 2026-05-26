-- Add unique username to profiles
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS username TEXT UNIQUE;

-- Index for fast lookups
CREATE UNIQUE INDEX IF NOT EXISTS profiles_username_idx ON profiles (username);
