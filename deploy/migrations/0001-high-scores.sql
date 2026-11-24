CREATE TABLE IF NOT EXISTS leaderboard_people (
 id TEXT PRIMARY KEY,
 credential TEXT NOT NULL UNIQUE,
 name TEXT NOT NULL,
 blocked INTEGER NOT NULL DEFAULT 0 CHECK(blocked IN (0,1)),
 created_ms INTEGER NOT NULL
) STRICT;
CREATE TABLE IF NOT EXISTS leaderboard_runs (
 owner_id TEXT NOT NULL REFERENCES leaderboard_people(id) ON DELETE CASCADE,
 run_id TEXT NOT NULL,
 sequence INTEGER NOT NULL,
 digest TEXT NOT NULL,
 receipt TEXT NOT NULL,
 score TEXT NOT NULL,
 digits INTEGER NOT NULL,
 status TEXT NOT NULL,
 attained_ms INTEGER NOT NULL,
 updated_ms INTEGER NOT NULL,
 PRIMARY KEY(owner_id,run_id)
) STRICT;
CREATE INDEX IF NOT EXISTS leaderboard_runs_best ON leaderboard_runs(owner_id,digits DESC,score COLLATE BINARY DESC,attained_ms,run_id);
CREATE TABLE IF NOT EXISTS leaderboard_retired_runs (
 owner_id TEXT NOT NULL REFERENCES leaderboard_people(id) ON DELETE CASCADE,
 run_id TEXT NOT NULL,
 sequence INTEGER NOT NULL,
 digest TEXT NOT NULL,
 PRIMARY KEY(owner_id,run_id)
) STRICT;
CREATE TABLE IF NOT EXISTS leaderboard_entries (
 owner_id TEXT PRIMARY KEY REFERENCES leaderboard_people(id) ON DELETE CASCADE,
 run_id TEXT NOT NULL,
 score TEXT NOT NULL,
 digits INTEGER NOT NULL,
 attained_ms INTEGER NOT NULL,
 updated_ms INTEGER NOT NULL
) STRICT;
CREATE INDEX IF NOT EXISTS leaderboard_rank ON leaderboard_entries(digits DESC,score COLLATE BINARY DESC,attained_ms,owner_id);
CREATE TABLE IF NOT EXISTS leaderboard_migrations (name TEXT PRIMARY KEY, applied_ms INTEGER NOT NULL, checksum TEXT NOT NULL) STRICT;
