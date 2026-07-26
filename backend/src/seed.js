import { getDb } from './db.js';

await getDb();
console.log('Database migrated and levels seeded.');
