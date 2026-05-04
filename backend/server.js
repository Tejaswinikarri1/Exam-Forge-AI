// Add this line to your existing server.js alongside the other routes:
// app.use('/api/admin', require('./routes/admin'));

// Your full server.js should look like this:
require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000', credentials: true }));
app.use(express.json());

// Routes
app.use('/api/auth',    require('./routes/auth'));
app.use('/api/exams',   require('./routes/exams'));
app.use('/api/attempts',require('./routes/attempts'));
app.use('/api/admin',   require('./routes/admin'));  

app.get('/api/health', (req, res) => res.json({ status: 'ok', message: 'ExamForge API running' }));

app.use((req, res) => res.status(404).json({ success: false, message: 'Route not found' }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 ExamForge API running on port ${PORT}`));