# WARGAMES

WARGAMES is a browser-based CTF learning platform for Linux, Bash, Docker, and basic cybersecurity. Players register, solve levels in order, start isolated Docker challenge containers, use a live terminal in the web UI, submit flags, and unlock the next level.

## Architecture

- **Frontend:** React, Vite, TailwindCSS, Framer Motion, xterm.js
- **Backend:** Node.js, Express, Socket.IO, Dockerode
- **Database:** SQLite
- **Runtime isolation:** Docker challenge containers built from `challenges/level-*`

Flow:

1. User logs in and receives a JWT.
2. Dashboard fetches levels and progress from SQLite.
3. Starting a level asks the backend to build the level image if missing and create a Docker container.
4. The challenge page opens a Socket.IO connection.
5. xterm.js sends keystrokes to the backend.
6. Backend attaches to `/bin/bash -l` inside the container using Dockerode exec.
7. User submits `WG{...}` to the REST API.
8. Backend validates the flag, records attempts, grants XP, and unlocks the next level.

## Folder Structure

```text
.
├── backend
│   ├── Dockerfile
│   ├── package.json
│   └── src
│       ├── config/env.js
│       ├── data/levels.js
│       ├── db.js
│       ├── middleware/auth.js
│       ├── routes
│       ├── services
│       ├── sockets/terminal.js
│       └── server.js
├── frontend
│   ├── Dockerfile
│   ├── package.json
│   └── src
│       ├── components
│       ├── pages
│       └── utils
├── challenges
│   ├── level-01
│   ├── level-02
│   └── ...
├── docker-compose.yml
└── README.md
```

## Levels

| Level | Topic | Flag |
| --- | --- | --- |
| 1 | Basic navigation | `WG{linux_navigation_unlocked}` |
| 2 | Hidden files | `WG{dotfiles_are_not_invisible}` |
| 3 | File permissions | `WG{permissions_tell_the_story}` |
| 4 | Grep/find | `WG{grep_found_the_signal}` |
| 5 | Log analysis | `WG{logs_remember_everything}` |
| 6 | Bash pipeline | `WG{bash_pipelines_build_answers}` |
| 7 | Cronjob trail | `WG{cron_jobs_leave_clues}` |
| 8 | Container inspection | `WG{inspect_before_you_assume}` |
| 9 | Environment variables | `WG{env_vars_can_leak_secrets}` |
| 10 | Port/service discovery | `WG{services_speak_on_ports}` |

## Quick Start

Prerequisites:

- Docker Engine
- Docker Compose plugin
- Node.js 20 only if running outside Docker Compose

Run the platform:

```bash
cp .env.example .env
docker compose up --build
```

Open:

- Frontend: `http://localhost:5173`
- Backend health: `http://localhost:4000/health`

Create an account from the login page. Level 1 is unlocked by default.

## Local Development Without Compose

Install backend dependencies:

```bash
npm --prefix backend install
npm --prefix backend run dev
```

Install frontend dependencies:

```bash
npm --prefix frontend install
npm --prefix frontend run dev
```

The backend needs access to Docker:

```bash
DOCKER_SOCKET=/var/run/docker.sock \
CHALLENGES_DIR=/home/rugved0014/Documents/Wargames/challenges \
DATABASE_FILE=/home/rugved0014/Documents/Wargames/backend/data/wargames.db \
npm --prefix backend run dev
```

## API Summary

Auth:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

Levels:

- `GET /api/levels`
- `GET /api/levels/:id`
- `POST /api/levels/:id/submit`

Containers:

- `POST /api/containers/levels/:id/start`
- `DELETE /api/containers/:dockerId`

Socket.IO terminal events:

- Client emits `terminal:start` with `{ containerId }`
- Client emits `terminal:input` with raw terminal input
- Server emits `terminal:data`
- Server emits `terminal:error`

## Notes

This is intentionally a beginner-friendly local mini-project. It uses Docker container isolation and per-user ownership checks, but it does not try to be a hardened multi-tenant CTF hosting platform.
