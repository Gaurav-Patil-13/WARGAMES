![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-blue?logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?logo=docker)
![AWS](https://img.shields.io/badge/AWS-EC2-orange?logo=amazon-aws)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel)
![License](https://img.shields.io/badge/License-MIT-green)

# 🛡️ WARGAMES - Browser-Based CTF Learning Platform

A browser-based **Capture The Flag (CTF)** learning platform that helps users learn **Linux, Bash, Docker, Networking, and basic Cybersecurity** through hands-on interactive challenges.

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

> Add screenshots here

| Login | Dashboard |
|-------|-----------|
| ![](screenshots/login.png) | ![](screenshots/dashboard.png) |

| Challenge Terminal |
|--------------------|
| ![](screenshots/terminal.png) |

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
- Framer Motion
- Axios
- xterm.js
- Socket.IO Client

## Backend

- Node.js
- Express.js
- Socket.IO
- Dockerode
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
- Let's Encrypt
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

| Level | Topic |
|--------|--------------------------|
| 1 | Linux Navigation |
| 2 | Hidden Files |
| 3 | File Permissions |
| 4 | grep & find |
| 5 | Log Analysis |
| 6 | Bash Pipelines |
| 7 | Cron Jobs |
| 8 | Docker Inspection |
| 9 | Environment Variables |
| 10 | Port & Service Discovery |

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/<your-username>/WARGAMES.git
cd WARGAMES
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create `.env`

```env
PORT=4000

JWT_SECRET=your-secret

DATABASE_URL=postgresql://username:password@host/database?sslmode=require

CLIENT_URL=http://localhost:5173

DOCKER_SOCKET=/var/run/docker.sock
```

Run backend

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## Docker Setup

```bash
docker compose up --build
```

Frontend

```
http://localhost:5173
```

Backend

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

# 👨‍💻 Author

**Gaurav Patil**

Walchand College of Engineering, Sangli

- GitHub: https://github.com/<your-username>
- LinkedIn: https://linkedin.com/in/<your-profile>

---

## ⭐ If you found this project useful, consider giving it a star!
