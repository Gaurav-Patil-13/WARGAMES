![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-blue?logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?logo=docker)
![AWS](https://img.shields.io/badge/AWS-EC2-orange?logo=amazon-aws)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel)
![License](https://img.shields.io/badge/License-MIT-green)

# 🛡️ WARGAMES - Browser-Based CTF Learning Platform

A browser-based **Capture The Flag (CTF)** learning platform that helps users learn **Linux, Bash, Docker, Networking ** through hands-on interactive challenges.

Users can launch isolated Docker-based challenge environments, interact with a real Linux terminal directly in the browser, submit flags, earn XP, and progressively unlock new levels.

---

## 🚀 Features

- 🔐 JWT-based User Authentication
- 🐳 Docker-based isolated challenge containers
- 💻 Interactive Linux terminal using **xterm.js**
- ⚡ Real-time communication using **Socket.IO**
- 🎯 Progressive level unlocking system
- 🏆 XP and progress tracking
- 🚩 Automatic flag validation
- 📱 Responsive UI with Tailwind CSS
- ☁️ Production deployment on AWS EC2
- 🔒 HTTPS enabled using Nginx & Let's Encrypt
- 🗄️ Cloud-hosted PostgreSQL database using Neon

---

# 📸 Screenshots

## 🏠 Landing Page

![Landing Page](screenshots/landing-page.png)

---

## 📊 Dashboard

![Dashboard](screenshots/dashboard.png)

---

## 💻 Live Challenge Terminal

![Challenge Terminal](screenshots/challenge-completed.png)

---

# 🏗️ System Architecture

```text
                    User
                      │
                      ▼
          React + Vite Frontend
              (Hosted on Vercel)
                      │
                 HTTPS Request
                      │
                      ▼
      Nginx Reverse Proxy (AWS EC2)
                      │
                      ▼
         Express.js Backend (Docker)
                      │
      ┌───────────────┴───────────────┐
      │                               │
      ▼                               ▼
 Neon PostgreSQL            Docker Challenge Containers
      │
      ▼
 User Progress & Levels
```

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- Axios
- xterm.js
- Socket.IO Client

## Backend

- Node.js
- Express.js
- Socket.IO
- JWT Authentication
- bcrypt
- PostgreSQL (`pg`)

## Database

- Neon PostgreSQL

## DevOps

- Docker
- Docker Compose
- AWS EC2
- Nginx

## Tools

- DuckDNS
- Vercel
- GitHub

---

# 📂 Project Structure

```text
.
├── backend
│   ├── Dockerfile
│   ├── package.json
│   └── src
│       ├── config
│       ├── middleware
│       ├── routes
│       ├── services
│       ├── sockets
│       ├── db.js
│       └── server.js
│
├── frontend
│   ├── Dockerfile
│   ├── package.json
│   └── src
│       ├── components
│       ├── pages
│       ├── hooks
│       └── utils
│
├── challenges
│   ├── level-01
│   ├── level-02
│   ├── level-03
│   └── ...
│
├── docker-compose.yml
└── README.md
```

---

# 🎮 Challenge Flow

### 1️⃣ User Authentication

- Register/Login
- JWT token generated
- Protected routes

---

### 2️⃣ Dashboard

- Fetch available levels
- Track completed levels
- Display XP and progress

---

### 3️⃣ Start Challenge

When the user starts a level:

- Backend checks Docker image
- Builds image if missing
- Creates isolated container
- Returns container details

---

### 4️⃣ Interactive Terminal

- Browser opens xterm.js
- Socket.IO establishes connection
- Dockerode attaches to `/bin/bash`
- User executes Linux commands

---

### 5️⃣ Flag Submission

- User submits the flag
- Backend validates it
- Progress is stored
- XP is awarded
- Next level unlocks

---

# 📚 Challenge Levels

| Level | Topic | Flag |
|:----:|------------------------|----------------------------------------|
| 1 | Basic Navigation | `WG{linux_navigation_unlocked}` |
| 2 | Hidden Files | `WG{dotfiles_are_not_invisible}` |
| 3 | File Permissions | `WG{permissions_tell_the_story}` |
| 4 | Grep & Find | `WG{grep_found_the_signal}` |
| 5 | Log Analysis | `WG{logs_remember_everything}` |
| 6 | Bash Pipelines | `WG{bash_pipelines_build_answers}` |
| 7 | Cron Job Trail | `WG{cron_jobs_leave_clues}` |
| 8 | Container Inspection | `WG{inspect_before_you_assume}` |
| 9 | Environment Variables | `WG{env_vars_can_leak_secrets}` |
| 10 | Port & Service Discovery | `WG{services_speak_on_ports}` |

---


# ⚙️ Installation

## Prerequisites

- Docker
- Docker Compose
- Git

---

## Clone the Repository

```bash
git clone https://github.com/Gaurav-Patil-13/WARGAMES.git
cd WARGAMES
```

---

## Configure Environment Variables

Create a `.env` file in the project root:

```env
JWT_SECRET=your-secret
DATABASE_URL=postgresql://username:password@host/database?sslmode=require
CLIENT_URL=http://localhost:5173
DOCKER_SOCKET=/var/run/docker.sock
```

---

## Start the Application

Build and start all services:

```bash
docker compose up --build
```

To run in detached mode:

```bash
docker compose up -d --build
```

---

## Access the Application

Frontend:

```
http://localhost:5173
```

Backend:

```
http://localhost:4000
```

---

# 🌐 API Endpoints

## Authentication

```http
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

## Levels

```http
GET /api/levels
GET /api/levels/:id
POST /api/levels/:id/submit
```

## Containers

```http
POST /api/containers/levels/:id/start
DELETE /api/containers/:dockerId
```

## Health Check

```http
GET /health
```

---

# 🔌 Socket.IO Events

### Client

```
terminal:start
terminal:input
```

### Server

```
terminal:data
terminal:error
```

---

# 🔒 Security Features

- JWT Authentication
- Password Hashing (bcrypt)
- Protected API Routes
- Docker Container Isolation
- CORS Protection
- HTTPS Encryption
- Environment Variables for Secrets

---

# 🚀 Deployment

| Component | Platform |
|-----------|----------|
| Frontend | Vercel |
| Backend | AWS EC2 (Docker) |
| Reverse Proxy | Nginx |
| HTTPS | Let's Encrypt |
| Database | Neon PostgreSQL |

---

# 🔮 Future Improvements

- Global Leaderboard
- Admin Dashboard
- User Profiles
- More Linux Challenges
- Kubernetes Deployment
- GitHub Actions CI/CD
- Redis Caching
- Prometheus & Grafana Monitoring
- Multiplayer Challenges

---



## ⭐ If you found this project useful, consider giving it a star!