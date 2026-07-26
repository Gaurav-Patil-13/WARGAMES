import path from 'node:path';
import Docker from 'dockerode';
import tar from 'tar-fs';
import { env } from '../config/env.js';
import { getDb } from '../db.js';

const docker = new Docker({ socketPath: env.dockerSocket });

function levelDir(levelId) {
  return path.resolve(env.challengesDir, `level-${String(levelId).padStart(2, '0')}`);
}

export async function ensureLevelImage(level) {
  try {
    await docker.getImage(level.image).inspect();
    return;
  } catch {
    // Build below when the image is missing locally.
  }

  const context = tar.pack(levelDir(level.id));
  const stream = await docker.buildImage(context, { t: level.image });

  await new Promise((resolve, reject) => {
    docker.modem.followProgress(stream, (err) => (err ? reject(err) : resolve()));
  });
}

export async function createLevelContainer(userId, level) {
  await ensureLevelImage(level);

  const container = await docker.createContainer({
    Image: level.image,
    Tty: true,
    OpenStdin: true,
    StdinOnce: false,
    AttachStdout: true,
    AttachStderr: true,
    AttachStdin: true,
    Env: level.id === 9 ? [`TRAINING_FLAG=${level.flag}`] : [],
    Labels: {
      app: 'wargames',
      userId: String(userId),
      levelId: String(level.id)
    },
    HostConfig: {
      AutoRemove: false,
      NetworkMode: 'bridge',
      Memory: 128 * 1024 * 1024,
      PidsLimit: 128
    }
  });

  await container.start();

  const db = await getDb();
  await db.run(
    'INSERT INTO containers (user_id, level_id, docker_id, status) VALUES (?, ?, ?, ?)',
    userId,
    level.id,
    container.id,
    'running'
  );

  return container;
}

export async function destroyContainer(userId, dockerId) {
  const db = await getDb();
  const container = docker.getContainer(dockerId);

  try {
    await container.stop({ t: 1 });
  } catch {
    // Already stopped.
  }

  try {
    await container.remove({ force: true });
  } catch {
    // Already removed.
  }

  await db.run(
    'UPDATE containers SET status = ?, destroyed_at = CURRENT_TIMESTAMP WHERE docker_id = ? AND user_id = ?',
    'destroyed',
    dockerId,
    userId
  );
}

export async function createShell(container) {
  const exec = await container.exec({
    Cmd: ['/bin/bash', '-l'],
    AttachStdin: true,
    AttachStdout: true,
    AttachStderr: true,
    Tty: true,
    WorkingDir: '/home/player',
    User: 'player'
  });

  return exec.start({ hijack: true, stdin: true, Tty: true });
}

export { docker };
