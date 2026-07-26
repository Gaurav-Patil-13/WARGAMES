import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: Number(process.env.PORT || 4000),
  jwtSecret: process.env.JWT_SECRET || 'dev-secret-change-me',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  databaseFile: process.env.DATABASE_FILE || './data/wargames.db',
  dockerSocket: process.env.DOCKER_SOCKET || '/var/run/docker.sock',
  challengesDir: process.env.CHALLENGES_DIR || '../challenges'
};
