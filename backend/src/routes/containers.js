import express from 'express';
import { getDb } from '../db.js';
import { authenticate } from '../middleware/auth.js';
import { createLevelContainer, destroyContainer } from '../services/dockerService.js';
import { isLevelUnlocked } from '../services/progressService.js';

export const containersRouter = express.Router();

containersRouter.use(authenticate);

containersRouter.post('/levels/:id/start', async (req, res) => {
  const levelId = Number(req.params.id);
  const db = await getDb();

  const result = await db.query(
    'SELECT * FROM levels WHERE id = $1',
    [levelId]
  );

  const level = result.rows[0];

  if (!level) return res.status(404).json({ error: 'Level not found' });
  if (!(await isLevelUnlocked(req.user.sub, levelId))) return res.status(403).json({ error: 'Level is locked' });

  const container = await createLevelContainer(req.user.sub, level);
  res.status(201).json({ containerId: container.id });
});

containersRouter.delete('/:dockerId', async (req, res) => {
  await destroyContainer(req.user.sub, req.params.dockerId);
  res.json({ ok: true });
});