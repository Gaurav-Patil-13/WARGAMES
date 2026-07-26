import { getDb } from '../db.js';

export async function isLevelUnlocked(userId, levelId) {
  if (levelId === 1) return true;
  const previous = await getProgress(userId, levelId - 1);
  return Boolean(previous?.completed);
}

export async function getProgress(userId, levelId) {
  const db = await getDb();
  return db.get('SELECT * FROM progress WHERE user_id = ? AND level_id = ?', userId, levelId);
}

export async function listLevelsForUser(userId) {
  const db = await getDb();
  const rows = await db.all(`
    SELECT l.id, l.slug, l.title, l.track, l.xp, l.image, l.objective, l.hint, l.walkthrough,
           COALESCE(p.completed, 0) AS completed,
           COALESCE(p.attempts, 0) AS attempts,
           p.completed_at
    FROM levels l
    LEFT JOIN progress p ON p.level_id = l.id AND p.user_id = ?
    ORDER BY l.id
  `, userId);

  return Promise.all(rows.map(async (level) => ({
    ...level,
    completed: Boolean(level.completed),
    unlocked: await isLevelUnlocked(userId, level.id)
  })));
}

export async function recordAttempt(userId, levelId) {
  const db = await getDb();
  await db.run(`
    INSERT INTO progress (user_id, level_id, attempts)
    VALUES (?, ?, 1)
    ON CONFLICT(user_id, level_id) DO UPDATE SET attempts = attempts + 1
  `, userId, levelId);
}

export async function completeLevel(userId, levelId, xp) {
  const db = await getDb();
  const existing = await getProgress(userId, levelId);

  await db.run(`
    INSERT INTO progress (user_id, level_id, completed, attempts, completed_at)
    VALUES (?, ?, 1, COALESCE((SELECT attempts FROM progress WHERE user_id = ? AND level_id = ?), 0), CURRENT_TIMESTAMP)
    ON CONFLICT(user_id, level_id) DO UPDATE SET completed = 1, completed_at = COALESCE(completed_at, CURRENT_TIMESTAMP)
  `, userId, levelId, userId, levelId);

  if (!existing?.completed) {
    await db.run('UPDATE users SET xp = xp + ? WHERE id = ?', xp, userId);
  }
}
