import bcrypt from 'bcryptjs';
import express from 'express';
import { getDb } from '../db.js';
import { authenticate, signToken } from '../middleware/auth.js';

export const authRouter = express.Router();

authRouter.post('/register', async (req, res) => {
  const username = String(req.body.username || '').trim().toLowerCase();
  const password = String(req.body.password || '');

  if (username.length < 3 || password.length < 6) {
    return res.status(400).json({ error: 'Username must be 3+ chars and password 6+ chars' });
  }

  const db = await getDb();
  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const result = await db.run('INSERT INTO users (username, password_hash) VALUES (?, ?)', username, passwordHash);
    const user = { id: result.lastID, username, xp: 0 };
    res.status(201).json({ token: signToken(user), user });
  } catch {
    res.status(409).json({ error: 'Username already exists' });
  }
});

authRouter.post('/login', async (req, res) => {
  const username = String(req.body.username || '').trim().toLowerCase();
  const password = String(req.body.password || '');
  const db = await getDb();
  const user = await db.get('SELECT * FROM users WHERE username = ?', username);

  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  res.json({ token: signToken(user), user: { id: user.id, username: user.username, xp: user.xp } });
});

authRouter.get('/me', authenticate, async (req, res) => {
  const db = await getDb();
  const user = await db.get('SELECT id, username, xp, created_at FROM users WHERE id = ?', req.user.sub);
  res.json({ user });
});
