import { getDb } from '../db.js';
import { verifySocketToken } from '../middleware/auth.js';
import { createShell, docker } from '../services/dockerService.js';

export function registerTerminalSocket(io) {
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      socket.user = verifySocketToken(token);
      next();
    } catch {
      next(new Error('Unauthorized'));
    }
  });

  io.on('connection', (socket) => {
    let shell;

    socket.on('terminal:start', async ({ containerId }) => {
      try {
        const db = await getDb();
        const row = await db.get
(
          'SELECT * FROM containers WHERE docker_id = ? AND user_id = ? AND status = ?',
          containerId,
          socket.user.sub,
          'running'
        );

        if (!row) {
          socket.emit('terminal:error', 'Container not found or not owned by user.');
          return;
        }

        shell = await createShell(docker.getContainer(containerId));
        shell.on('data', (chunk) => socket.emit('terminal:data', chunk.toString('utf8')));
        shell.on('end', () => socket.emit('terminal:closed'));
        shell.on('error', (error) => socket.emit('terminal:error', error.message));
        socket.emit('terminal:data', '\u001b[32mConnected to WARGAMES container.\u001b[0m\r\n');
      } catch (error) {
        socket.emit('terminal:error', error.message);
      }
    });

    socket.on('terminal:input', (data) => {
      if (shell?.writable) shell.write(data);
    });

    socket.on('terminal:resize', ({ cols, rows }) => {
      if (shell?.resize) shell.resize({ h: rows, w: cols });
    });

    socket.on('disconnect', () => {
      if (shell?.destroy) shell.destroy();
    });
  });
}
