import http from 'node:http';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { Server } from 'socket.io';
import { env } from './config/env.js';
import { getDb } from './db.js';
import { authRouter } from './routes/auth.js';
import { containersRouter } from './routes/containers.js';
import { levelsRouter } from './routes/levels.js';
import { registerTerminalSocket } from './sockets/terminal.js';

await getDb();

const app = express();
const server = http.createServer(app);

const allowedOrigins = [
  "http://localhost:5173",
  env.clientUrl
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
};

const io = new Server(server, {
  cors: corsOptions
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (_req, res) => res.json({ ok: true, name: 'wargames-api' }));
app.use('/api/auth', authRouter);
app.use('/api/levels', levelsRouter);
app.use('/api/containers', containersRouter);

registerTerminalSocket(io);

server.listen(env.port, () => {
  console.log(`WARGAMES backend listening on :${env.port}`);
});
