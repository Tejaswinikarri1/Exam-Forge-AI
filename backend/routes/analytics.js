const express = require('express');
const { getDB } = require('../db/database');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// GET /api/analytics - get computed analytics for user
router.get('/', authMiddleware, (req, res) => {
  const db = getDB();
  const uid = req.user.id;

  const attempts = db.prepare(`
    SELECT * FROM attempts WHERE user_id = ? ORDER BY created_at DESC
  `).all(uid);

  res.json(computeAnalytics(attempts));
});

function computeAnalytics(attempts) {
  const zero = {
    avgScore: 0, avgPerQuestion: 90, streak: 0, improvement: 0, totalAttempts: 0,
    bestSubject: '—', weakSubject: '—', studyTime: '0h',
    scoreTrend: [], subjects: [],
    accuracy: [
      { name: 'Correct', value: 0, color: '#00D4AA' },
      { name: 'Wrong', value: 0, color: '#E85D5D' },
      { name: 'Skipped', value: 0, color: '#3D5464' }
    ],
    radar: [
      { topic: 'Arrays', score: 0 }, { topic: 'Graphs', score: 0 },
      { topic: 'Trees', score: 0 }, { topic: 'DP', score: 0 },
      { topic: 'Sorting', score: 0 }, { topic: 'Hashing', score: 0 }
    ],
    productivityScore: 0, learningConsistency: 0, conceptMastery: 0,
    examEfficiency: 0, hasData: false
  };

  if (!attempts || !attempts.length) return zero;

  const scores = attempts.map(a => a.score);
  const avgScore = Math.round(scores.reduce((s, n) => s + n, 0) / scores.length);
  const correct = attempts.reduce((s, a) => s + (a.correct || 0), 0);
  const totalQ = attempts.reduce((s, a) => s + (a.total_questions || 0), 0);
  const cPct = totalQ > 0 ? Math.round(correct / totalQ * 100) : 0;
  const wPct = totalQ > 0 ? Math.round((totalQ - correct) / totalQ * 100) : 0;

  const subMap = {};
  attempts.forEach(a => {
    const k = (a.subject || 'Other').split(' ')[0];
    if (!subMap[k]) subMap[k] = { total: 0, count: 0 };
    subMap[k].total += a.score;
    subMap[k].count++;
  });

  const subjects = Object.entries(subMap).map(([k, v]) => ({
    subject: k, score: Math.round(v.total / v.count)
  }));
  const sortedSubj = [...subjects].sort((a, b) => b.score - a.score);
  const bestSubject = sortedSubj[0]?.subject || '—';
  const weakSubject = sortedSubj[sortedSubj.length - 1]?.subject || '—';

  const scoreTrend = attempts.slice(0, 8).reverse().map((a, i) => ({
    month: (a.date || '').slice(5, 10) || `T${i + 1}`,
    score: a.score
  }));

  const streak = computeStreak(attempts);

  let improvement = 0;
  if (attempts.length >= 2) {
    const half = Math.floor(attempts.length / 2);
    const recent = attempts.slice(0, half).reduce((s, a) => s + a.score, 0) / half;
    const older = attempts.slice(half).reduce((s, a) => s + a.score, 0) / (attempts.length - half);
    improvement = Math.round(recent - older);
  }

  const studyMins = attempts.reduce((s, a) => {
    const t = a.time_taken || '00:00';
    const [m, sc] = t.split(':').map(Number);
    return s + m + (sc || 0) / 60;
  }, 0);
  const studyTime = studyMins >= 60
    ? `${Math.floor(studyMins / 60)}h ${Math.round(studyMins % 60)}m`
    : `${Math.round(studyMins)}m`;

  const radar = [
    { topic: 'Arrays', score: 0 }, { topic: 'Graphs', score: 0 },
    { topic: 'Trees', score: 0 }, { topic: 'DP', score: 0 },
    { topic: 'Sorting', score: 0 }, { topic: 'Hashing', score: 0 }
  ].map((r, i) => ({ ...r, score: Math.min(100, Math.max(0, avgScore + (i % 2 === 0 ? 10 : -15))) }));

  const consistency = Math.min(100, attempts.length * 8);
  const avgPerQ = Math.max(10, Math.round(90 - avgScore * 0.4));
  const productivityScore = Math.round(avgScore * 0.4 + cPct * 0.3 + consistency * 0.2 + (attempts.length > 5 ? 10 : attempts.length * 2));
  const learningConsistency = Math.min(100, consistency + streak * 3);
  const conceptMastery = Math.min(100, Math.round(avgScore * 0.6 + cPct * 0.4));
  const examEfficiency = Math.min(100, Math.round(cPct * 0.7 + (100 - avgPerQ) * 0.3));

  return {
    avgScore, avgPerQuestion: avgPerQ, streak, improvement, totalAttempts: attempts.length,
    bestSubject, weakSubject, studyTime, scoreTrend, subjects,
    accuracy: [
      { name: 'Correct', value: cPct, color: '#00D4AA' },
      { name: 'Wrong', value: wPct, color: '#E85D5D' },
      { name: 'Skipped', value: Math.max(0, 100 - cPct - wPct), color: '#3D5464' }
    ],
    radar, productivityScore, learningConsistency, conceptMastery, examEfficiency, hasData: true
  };
}

function computeStreak(attempts) {
  if (!attempts.length) return 0;
  const dates = [...new Set(attempts.map(a => a.date))].sort().reverse();
  let streak = 0;
  const now = new Date();
  for (let i = 0; i < dates.length; i++) {
    const diff = Math.floor((now - new Date(dates[i])) / 86400000);
    if (diff <= i + 1) streak++;
    else break;
  }
  return streak;
}

module.exports = router;
