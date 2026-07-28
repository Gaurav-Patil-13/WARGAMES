import dotenv from "dotenv";

dotenv.config();

export const env = {
    // Server
    nodeEnv: process.env.NODE_ENV || "development",
    port: Number(process.env.PORT || 4000),

    // JWT
    jwtSecret: process.env.JWT_SECRET || "dev-secret-change-me",

    // Frontend
    clientUrl: process.env.CLIENT_URL || "http://localhost:5173",

    // Database
    databaseUrl: process.env.DATABASE_URL || "./data/wargames.db",

    // Docker
    dockerSocket: process.env.DOCKER_SOCKET || "/var/run/docker.sock",
    dockerImage: process.env.DOCKER_IMAGE || "wargames-linux",
    challengesDir: process.env.CHALLENGES_DIR || "../challenges",

    // Container Limits
    containerMemory: Number(process.env.CONTAINER_MEMORY || 268435456), // 256 MB
    containerCpu: Number(process.env.CONTAINER_CPU || 1),
    containerTimeout: Number(process.env.CONTAINER_TIMEOUT || 1800)
};