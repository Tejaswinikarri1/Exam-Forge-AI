# ExamForge — AI Mock Test Platform

A full-stack mock exam platform with AI question generation, analytics, and performance tracking.

## Project Structure

```
examforge/
├── backend/          # Node.js + Express + MongoDB API
└── frontend/         # React 18 SPA
```

---

## Quick Start

### 1. Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and a JWT secret
npm run dev
```

The backend runs on **http://localhost:5000**

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

The app opens on **http://localhost:3000** (proxies API to port 5000)

---

## Features

- 🔐 **Auth** — Register/Login with JWT
- 🤖 **AI Question Generation** — Generate MCQ, True/False, or Short Answer from 23+ subjects
- 📄 **PDF Upload** — Extract questions from uploaded PDFs
- 📊 **Dashboard** — Score trends, accuracy charts, recent activity
- 📝 **Take Test** — Timed exams with question map and flag system
- 📈 **Analytics** — Radar chart, subject breakdown, skill meters
- 📋 **Reports** — Export to CSV or print-ready PDF

## Environment Variables

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/examforge
JWT_SECRET=your_secret_here
JWT_EXPIRES_IN=7d
```

## Tech Stack

| Layer    | Stack                           |
|----------|---------------------------------|
| Frontend | React 18, Recharts, Lucide      |
| Backend  | Node.js, Express, Mongoose      |
| Database | MongoDB                         |
| Auth     | JWT + bcryptjs                  |
