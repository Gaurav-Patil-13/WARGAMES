import pkg from "pg";
const { Pool } = pkg;
import { env } from './config/env.js';
import { levels } from './data/levels.js';

let db;

export async function getDb() {
  if (db) return db;

  db = new Pool({
    connectionString: env.databaseUrl,
    ssl: {
      rejectUnauthorized: false
    }
  });

  await migrate();
  await seedLevels();
  return db;
}

async function migrate() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      xp INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
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
      completed_at TIMESTAMP,
      PRIMARY KEY (user_id, level_id),
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY(level_id) REFERENCES levels(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS containers (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL,
      level_id INTEGER NOT NULL,
      docker_id TEXT NOT NULL,
      status TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      destroyed_at TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY(level_id) REFERENCES levels(id) ON DELETE CASCADE
    );
  `);
}

async function seedLevels() {
  for (const level of levels) {
    await db.query(
      `INSERT INTO levels (id, slug, title, track, xp, image, objective, hint, walkthrough, flag)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       ON CONFLICT (id) DO UPDATE SET
        slug = EXCLUDED.slug,
        title = EXCLUDED.title,
        track = EXCLUDED.track,
        xp = EXCLUDED.xp,
        image = EXCLUDED.image,
        objective = EXCLUDED.objective,
        hint = EXCLUDED.hint,
        walkthrough = EXCLUDED.walkthrough,
        flag = EXCLUDED.flag`,
      [
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
      ]
    );
  }
}