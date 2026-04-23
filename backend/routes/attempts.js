const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Attempt = require('../models/Attempt');

// GET /api/attempts
router.get('/', protect, async (req, res) => {
  try {
    const attempts = await Attempt.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, attempts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/attempts
router.post('/', protect, async (req, res) => {
  try {
    const { exam, subject, difficulty, qType, score, total, correct, totalQ, time, date, status } = req.body;
    const attempt = await Attempt.create({
      user: req.user._id, exam, subject: subject || 'General',
      difficulty: difficulty || 'Medium', qType: qType || 'MCQ',
      score, total: total || 100, correct: correct || 0, totalQ: totalQ || 0,
      time: time || '00:00',
      date: date || new Date().toISOString().slice(0, 10),
      status: status || (score >= 60 ? 'passed' : 'failed')
    });
    res.status(201).json({ success: true, attempt });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/attempts/:id
router.delete('/:id', protect, async (req, res) => {
  try {
    const attempt = await Attempt.findOne({ _id: req.params.id, user: req.user._id });
    if (!attempt) return res.status(404).json({ success: false, message: 'Attempt not found or not authorized.' });
    await attempt.deleteOne();
    res.json({ success: true, deletedId: req.params.id });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/attempts/analytics
router.get('/analytics', protect, async (req, res) => {
  try {
    const attempts = await Attempt.find({ user: req.user._id }).sort({ createdAt: -1 });
    if (!attempts.length) return res.json({ success: true, analytics: { hasData: false } });

    const scores = attempts.map(a => a.score);
    const avgScore = Math.round(scores.reduce((s, n) => s + n, 0) / scores.length);
    const correct = attempts.reduce((s, a) => s + (a.correct || 0), 0);
    const totalQ = attempts.reduce((s, a) => s + (a.totalQ || 0), 0);
    const cPct = totalQ > 0 ? Math.round(correct / totalQ * 100) : 0;
    const wPct = totalQ > 0 ? Math.round((totalQ - correct) / totalQ * 100) : 0;

    const subMap = {};
    attempts.forEach(a => {
      const k = (a.subject || 'Other').split(' ')[0];
      if (!subMap[k]) subMap[k] = { total: 0, count: 0 };
      subMap[k].total += a.score; subMap[k].count++;
    });
    const subjects = Object.entries(subMap).map(([k, v]) => ({ subject: k, score: Math.round(v.total / v.count) }));
    const sortedSubj = [...subjects].sort((a, b) => b.score - a.score);

    const scoreTrend = attempts.slice(0, 8).reverse().map((a, i) => ({
      month: a.date ? a.date.slice(5, 10) : `T${i + 1}`, score: a.score
    }));

    let improvement = 0;
    if (attempts.length >= 2) {
      const half = Math.floor(attempts.length / 2);
      const recent = attempts.slice(0, half).reduce((s, a) => s + a.score, 0) / half;
      const older = attempts.slice(half).reduce((s, a) => s + a.score, 0) / (attempts.length - half);
      improvement = Math.round(recent - older);
    }

    const studyMins = attempts.reduce((s, a) => {
      const t = a.time || '00:00'; const [m, sc] = t.split(':').map(Number);
      return s + m + (sc || 0) / 60;
    }, 0);
    const studyTime = studyMins >= 60 ? `${Math.floor(studyMins / 60)}h ${Math.round(studyMins % 60)}m` : `${Math.round(studyMins)}m`;

    const dates = [...new Set(attempts.map(a => a.date))].sort().reverse();
    let streak = 0;
    const now = new Date();
    for (let i = 0; i < dates.length; i++) {
      const diff = Math.floor((now - new Date(dates[i])) / 86400000);
      if (diff <= i + 1) streak++; else break;
    }

    const radar = ['Arrays', 'Graphs', 'Trees', 'DP', 'Sorting', 'Hashing'].map((topic, i) => ({
      topic, score: Math.min(100, Math.max(0, avgScore + (i % 2 === 0 ? 10 : -15)))
    }));

    const consistency = Math.min(100, attempts.length * 8);
    const avgPerQ = Math.max(10, Math.round(90 - avgScore * 0.4));
    const productivityScore = Math.round(avgScore * 0.4 + cPct * 0.3 + consistency * 0.2 + (attempts.length > 5 ? 10 : attempts.length * 2));
    const learningConsistency = Math.min(100, consistency + streak * 3);
    const conceptMastery = Math.min(100, Math.round(avgScore * 0.6 + cPct * 0.4));
    const examEfficiency = Math.min(100, Math.round(cPct * 0.7 + (100 - avgPerQ) * 0.3));

    res.json({
      success: true,
      analytics: {
        avgScore, avgPerQuestion: avgPerQ, streak, improvement,
        totalAttempts: attempts.length,
        bestSubject: sortedSubj[0]?.subject || '—',
        weakSubject: sortedSubj[sortedSubj.length - 1]?.subject || '—',
        studyTime, scoreTrend, subjects,
        accuracy: [
          { name: 'Correct', value: cPct, color: '#00D4AA' },
          { name: 'Wrong', value: wPct, color: '#E85D5D' },
          { name: 'Skipped', value: Math.max(0, 100 - cPct - wPct), color: '#3D5464' }
        ],
        radar, productivityScore, learningConsistency, conceptMastery, examEfficiency,
        hasData: true
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
