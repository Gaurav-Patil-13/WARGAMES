import fs from 'node:fs';
import path from 'node:path';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { env } from './config/env.js';
import { levels } from './data/levels.js';

let db;

export async function getDb() {
  if (db) return db;

  fs.mkdirSync(path.dirname(env.databaseFile), { recursive: true });
  db = await open({ filename: env.databaseFile, driver: sqlite3.Database });
  await db.exec('PRAGMA foreign_keys = ON');
  await migrate();
  await seedLevels();
  return db;
}

async function migrate() {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      xp INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS levels (
      id INTEGER PRIMARY KEY,
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      track TEXT NOT NULL,
      xp INTEGER NOT NULL,
      image TEXT NOT NULL,
      objective TEXT NOT NULL,
      hint TEXT NOT NULL,
      walkthrough TEXT NOT NULL,
      flag TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS progress (
      user_id INTEGER NOT NULL,
      level_id INTEGER NOT NULL,
      completed INTEGER NOT NULL DEFAULT 0,
      attempts INTEGER NOT NULL DEFAULT 0,
      completed_at TEXT,
      PRIMARY KEY (user_id, level_id),
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY(level_id) REFERENCES levels(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS containers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      level_id INTEGER NOT NULL,
      docker_id TEXT NOT NULL,
      status TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      destroyed_at TEXT,
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY(level_id) REFERENCES levels(id) ON DELETE CASCADE
    );
  `);
}

async function seedLevels() {
  for (const level of levels) {
    await db.run(
      `INSERT INTO levels (id, slug, title, track, xp, image, objective, hint, walkthrough, flag)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET
        slug=excluded.slug,
        title=excluded.title,
        track=excluded.track,
        xp=excluded.xp,
        image=excluded.image,
        objective=excluded.objective,
        hint=excluded.hint,
        walkthrough=excluded.walkthrough,
        flag=excluded.flag`,
      level.id,
      level.slug,
      level.title,
      level.track,
      level.xp,
      level.image,
      level.objective,
      level.hint,
      level.walkthrough,
      level.flag
    );
  }
}
