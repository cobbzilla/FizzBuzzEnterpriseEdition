CREATE INDEX IF NOT EXISTS leaderboard_run_age ON leaderboard_runs(attained_ms,owner_id,digits DESC,score COLLATE BINARY DESC);
CREATE TABLE IF NOT EXISTS leaderboard_name_bans(id TEXT PRIMARY KEY,name TEXT NOT NULL UNIQUE,created_ms INTEGER NOT NULL) STRICT;
CREATE TABLE IF NOT EXISTS leaderboard_moderation_version(id INTEGER PRIMARY KEY CHECK(id=1),version INTEGER NOT NULL) STRICT;
INSERT OR IGNORE INTO leaderboard_moderation_version VALUES(1,0);
CREATE TABLE IF NOT EXISTS leaderboard_name_status(owner_id TEXT PRIMARY KEY REFERENCES leaderboard_people(id) ON DELETE CASCADE,name_banned INTEGER NOT NULL,version INTEGER NOT NULL) STRICT;
CREATE TABLE IF NOT EXISTS leaderboard_admin_audit(id TEXT PRIMARY KEY,action TEXT NOT NULL,target TEXT NOT NULL,created_ms INTEGER NOT NULL) STRICT;
CREATE TABLE IF NOT EXISTS leaderboard_notifications(
 id TEXT PRIMARY KEY,owner_id TEXT NOT NULL,run_id TEXT NOT NULL,payload TEXT NOT NULL,
 state TEXT NOT NULL DEFAULT 'pending',attempts INTEGER NOT NULL DEFAULT 0,
 created_ms INTEGER NOT NULL,next_ms INTEGER NOT NULL,first_attempt_ms INTEGER,lease_until_ms INTEGER NOT NULL DEFAULT 0,
 lease_token TEXT,resend_id TEXT,error TEXT,
 UNIQUE(owner_id,run_id)
) STRICT;
CREATE INDEX IF NOT EXISTS leaderboard_notification_due ON leaderboard_notifications(state,next_ms,lease_until_ms);
