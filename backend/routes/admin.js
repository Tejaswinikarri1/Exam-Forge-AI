const express = require('express');
const router  = express.Router();
const { protect, requireRole } = require('../middleware/auth');
const User    = require('../models/User');
const Attempt = require('../models/Attempt');

// GET /api/admin/students — all students with attempt stats (Teacher only)
router.get('/students', protect, requireRole('Teacher'), async (req, res) => {
  try {
    const students = await User.find({ role: 'Student' }).select('-password').sort({ createdAt: -1 });

    // Attach attempt stats to each student
    const enriched = await Promise.all(students.map(async s => {
      const attempts = await Attempt.find({ user: s._id });
      const totalAttempts = attempts.length;
      const avgScore = totalAttempts > 0
        ? Math.round(attempts.reduce((sum, a) => sum + a.score, 0) / totalAttempts)
        : 0;
      const lastAttempt = attempts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
      return {
        ...s.toJSON(),
        totalAttempts,
        avgScore,
        lastActive: lastAttempt?.createdAt || null,
      };
    }));

    res.json({ success: true, students: enriched });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;