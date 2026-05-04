# ExamForge AI — Intelligent Mock Test Platform

A comprehensive full-stack AI-powered mock exam platform designed for students and teachers. Features real-time analytics, AI-powered question generation using Groq API, performance tracking, and intelligent study recommendations.

---

## 🌟 Overview

**ExamForge AI** is an intelligent examination platform that combines:
- 🤖 **AI-Powered Intelligence** — Groq AI generates smart exam questions and personalized recommendations
- 📊 **Real-time Analytics** — Deep performance insights with visual dashboards
- 👨‍🎓 **Dual Role Support** — Separate interfaces for Students and Teachers
- 📱 **Modern UI** — Beautiful, responsive interface with smooth animations
- 🔐 **Secure Authentication** — JWT-based role-based access control

---

## 📋 Project Structure

```
Exam-Forge-AI/
├── backend/                    # Node.js + Express + MongoDB API
│   ├── models/                 # MongoDB schemas (User, Exam, Question, Attempt)
│   ├── routes/                 # API endpoints (auth, exams, attempts, admin, analytics)
│   ├── middleware/             # Authentication & role-based authorization
│   ├── utils/                  # AI integration, Mailer, PDF generation
│   ├── config/                 # Database configuration
│   └── server.js               # Entry point
│
└── frontend/                   # React 18 SPA
    ├── src/
    │   ├── pages/              # Dashboard, Analytics, Reports, CreateExam, TakeTest, etc.
    │   ├── components/         # UI components (Chatbot, Sidebar, TopBar)
    │   ├── utils/              # API client, Analytics computation, PDF export
    │   ├── App.js              # Main routing
    │   └── index.js            # React entry point
    └── public/                 # Static assets
```

---

## ✨ Key Features

### 👨‍🎓 Student Features

- **📊 Dashboard** — Welcome screen with performance stats, score trends, accuracy breakdown, recent activity
- **📝 Create AI Exams** — Generate custom exams with AI using Groq API (MCQ, True/False, Short Answer)
- **🧪 Mock Tests** — Browse and take timed mock exams with timer, question navigator, flag system
- **📈 Analytics** — Comprehensive performance analysis with:
  - Radar charts for topic mastery
  - Subject-wise performance breakdown
  - Answer accuracy statistics
  - Score trends over time
  - Productivity metrics
- **📋 Reports** — AI-powered recommendations with strength analysis and improvement suggestions
- **📊 Past Attempts** — View history of all exam attempts with scores and details
- **💾 PDF Export** — Generate and download detailed performance reports as PDF

### 👨‍🏫 Teacher Features

- **👥 Students Management** — View all enrolled students with their stats
- **📊 All Students Analytics** — Aggregated exam analytics across all students
- **📋 Student Reports** — Comprehensive reports of all student performance
- **📝 Create Exams** — Generate exams for classroom use
- **🧪 Mock Tests** — Browse available mock test library
- **📊 Dashboard** — Teacher-specific dashboard with class statistics

### 🔐 Authentication & Authorization

- User registration with role selection (Student/Teacher)
- JWT-based authentication with secure tokens
- Role-based access control (RBAC)
- Password hashing with bcryptjs

---

## 🛠 Technology Stack

### Backend
- **Runtime** — Node.js v18+
- **Framework** — Express.js
- **Database** — MongoDB + Mongoose ODM
- **Authentication** — JWT + bcryptjs
- **AI Integration** — Groq SDK for intelligent question generation
- **PDF Generation** — PDFKit for report generation
- **Email Service** — Nodemailer for notifications
- **File Upload** — Multer for file handling
- **PDF Parsing** — pdf-parse for extracting text from PDFs

### Frontend
- **Framework** — React 18
- **HTTP Client** — Axios
- **Charts & Graphs** — Recharts
- **Icons** — Lucide React
- **Styling** — CSS-in-JS (inline styles with theme variables)
- **Build Tool** — Create React App

### Database Models

```
User Schema:
- name, email, password (hashed)
- role: 'Student' | 'Teacher'
- avatar, timestamps

Exam Schema:
- title, subject, topic, difficulty (Easy/Medium/Hard)
- questions, time limit, type (MCQ/TrueFalse/ShortAnswer)
- isPreset, isCustom, status (draft/generated/published)
- createdBy, aiModel, generatedAt

Question Schema:
- questionText, options[], correctAnswer
- subject, topic, difficulty
- type (MCQ/TrueFalse/ShortAnswer)

Attempt Schema:
- user, exam, subject, difficulty
- score (0-100), correct answers, totalQuestions
- time spent, date, status (passed/failed)
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+ and npm
- MongoDB (local or MongoDB Atlas)
- Groq API Key (for AI features)

### 1. Clone & Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

### 2. Environment Configuration

**Backend (.env)**
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/examforge
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
GROQ_API_KEY=your_groq_api_key
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

### 3. Start the Application

```bash
# Terminal 1: Backend
cd backend
npm run dev
# Runs on http://localhost:5000

# Terminal 2: Frontend
cd frontend
npm start
# Opens http://localhost:3000 (proxies API to port 5000)
```

---

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` — Create new user account
- `POST /login` — Authenticate user and get JWT token

### Exams Routes (`/api/exams`)
- `GET /` — Get all available exams
- `POST /` — Create new exam
- `GET /:id` — Get exam details
- `DELETE /:id` — Delete exam

### Attempts Routes (`/api/attempts`)
- `GET /` — Get user's exam attempts
- `POST /` — Submit new exam attempt
- `GET /analytics` — Get user's performance analytics
- `GET /all-students` — Get all students' attempts (Teacher only)
- `DELETE /:id` — Delete an attempt

### Admin Routes (`/api/admin`)
- `GET /students` — Get all students with stats (Teacher only)

---

## 🎨 Key Pages & Components

### Student Pages
| Page | Purpose |
|------|---------|
| **Dashboard** | Home screen with stats, trends, recent activity |
| **Create Exam** | AI exam generation interface |
| **Mock Tests** | Browse and take available exams |
| **Take Test** | Exam interface with timer and navigation |
| **Analytics** | Detailed performance charts and metrics |
| **Reports** | AI recommendations and export options |
| **Past Attempts** | History of completed exams |

### Teacher Pages
| Page | Purpose |
|------|---------|
| **Dashboard** | Class overview and statistics |
| **Students** | List and manage enrolled students |
| **Analytics** | All students' aggregated performance data |
| **Reports** | Class-wide reports and insights |
| **Create Exam** | Create exams for students |
| **Mock Tests** | Browse test library |

### UI Components
- **Sidebar** — Navigation menu for different pages
- **TopBar** — User info, notifications, settings
- **Chatbot** — AI assistant for help and recommendations
- **Cards** — Reusable UI components with animations
- **Charts** — Recharts integration for data visualization

---

## 📊 Analytics Features

### Student Analytics Include:
- ✅ Average score across all attempts
- ✅ Average time per question
- ✅ Current study streak
- ✅ Score improvement trend
- ✅ Subject-wise performance breakdown
- ✅ Answer accuracy (Correct/Wrong/Skipped %)
- ✅ Topic mastery radar chart
- ✅ Productivity score calculation
- ✅ Learning consistency metrics
- ✅ Concept mastery evaluation
- ✅ Exam efficiency rating

### Teacher Analytics Include:
- ✅ Aggregated class performance
- ✅ Student comparison metrics
- ✅ Subject-wise class performance
- ✅ Top and low-performing students
- ✅ Class score distribution
- ✅ Performance trends

---

## 🤖 AI Features

### Groq Integration
- **Smart Question Generation** — AI generates contextually relevant questions
- **Personalized Recommendations** — Based on performance analysis
- **Adaptive Learning** — Suggestions tailored to weak areas
- **Real-time Insights** — Instant analysis of exam attempts

---

## 🔐 Security

- ✅ JWT-based authentication
- ✅ Password hashing with bcryptjs (10 salt rounds)
- ✅ Role-based access control (RBAC)
- ✅ Request validation middleware
- ✅ CORS protection
- ✅ MongoDB injection prevention via Mongoose

---

## 📦 Installation & Deployment

### Production Build

```bash
# Frontend
cd frontend
npm run build
# Creates optimized production build in build/

# Backend
# Set NODE_ENV=production in .env
npm run dev  # or use PM2 for process management
```

### Docker Support (Optional)
Create Dockerfile for containerized deployment

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection fails | Check MONGO_URI in .env and ensure MongoDB is running |
| Groq API errors | Verify GROQ_API_KEY is valid and has usage quota |
| CORS errors | Ensure CLIENT_URL in backend .env matches frontend URL |
| Port already in use | Change PORT in .env or kill existing process |
| Frontend can't reach API | Check proxy setting in frontend package.json |

---

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see LICENSE file for details.

---

## 👥 Team & Support

- **Project Name** — ExamForge AI
- **Version** — 1.0.0
- **Last Updated** — April 2026

For questions or support, please create an issue in the repository.

---

## 🎯 Future Enhancements

- [ ] Real-time collaborative exams
- [ ] Video proctoring integration
- [ ] Mobile app (React Native)
- [ ] Advanced AI tutoring chat
- [ ] Gamification (badges, leaderboards)
- [ ] Integration with LMS (Canvas, Moodle)
- [ ] WebSocket for live notifications
- [ ] Advanced plagiarism detection
