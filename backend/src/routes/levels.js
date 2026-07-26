import express from 'express';
import { getDb } from '../db.js';
import { authenticate } from '../middleware/auth.js';
import { completeLevel, isLevelUnlocked, listLevelsForUser, recordAttempt } from '../services/progressService.js';

export const levelsRouter = express.Router();

levelsRouter.use(authenticate);

levelsRouter.get('/', async (req, res) => {
  res.json({ levels: await listLevelsForUser(req.user.sub) });
});

levelsRouter.get('/:id', async (req, res) => {
  const levelId = Number(req.params.id);
  const db = await getDb();
  const level = await db.get(
    'SELECT id, slug, title, track, xp, image, objective, hint, walkthrough FROM levels WHERE id = ?',
    levelId
  );

  if (!level) return res.status(404).json({ error: 'Level not found' });
  if (!(await isLevelUnlocked(req.user.sub, levelId))) return res.status(403).json({ error: 'Level is locked' });

  res.json({ level });
});

levelsRouter.post('/:id/submit', async (req, res) => {
  const levelId = Number(req.params.id);
  const submitted = String(req.body.flag || '').trim();
  const db = await getDb();
  const level = await db.get('SELECT * FROM levels WHERE id = ?', levelId);

  if (!level) return res.status(404).json({ error: 'Level not found' });
  if (!(await isLevelUnlocked(req.user.sub, levelId))) return res.status(403).json({ error: 'Level is locked' });

  await recordAttempt(req.user.sub, levelId);

  if (submitted !== level.flag) {
    return res.status(400).json({ ok: false, error: 'Flag rejected' });
  }

  await completeLevel(req.user.sub, levelId, level.xp);
  const updatedLevels = await listLevelsForUser(req.user.sub);
  const user = await db.get('SELECT id, username, xp FROM users WHERE id = ?', req.user.sub);

  res.json({ ok: true, unlockedNext: levelId < 10, user, levels: updatedLevels });
});
