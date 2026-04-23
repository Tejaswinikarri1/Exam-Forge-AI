const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Exam = require('../models/Exam');

const ALL_SUBJECTS = [
  "C Programming","Python","Java","C++","DSA","SQL","HTML","CSS","JavaScript",
  "Computer Networks","DBMS","Compiler Design","Computer Organization","Operating Systems",
  "Discrete Mathematics","Formal Languages & Automata","Software Engineering",
  "Design & Analysis of Algorithms","Cryptography & Network Security",
  "Big Data Analytics","Cloud Computing","Machine Learning","Deep Learning"
];

// Seed preset exams if none exist
const seedPresets = async () => {
  const count = await Exam.countDocuments({ isPreset: true });
  if (count === 0) {
    const presets = ALL_SUBJECTS.map(subject => ({
      title: `${subject} — Complete Mock Test`,
      subject,
      difficulty: 'Medium',
      questions: 45,
      time: 90,
      type: 'MCQ',
      isPreset: true
    }));
    await Exam.insertMany(presets);
    console.log('✅ Preset exams seeded');
  }
};
seedPresets();

// GET /api/exams — all presets + user custom exams
router.get('/', protect, async (req, res) => {
  try {
    const presets = await Exam.find({ isPreset: true }).sort({ subject: 1 });
    const custom = await Exam.find({ createdBy: req.user._id, isCustom: true }).sort({ createdAt: -1 });
    res.json({ success: true, exams: [...presets, ...custom] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/exams — create custom exam
router.post('/', protect, async (req, res) => {
  try {
    const { title, subject, topic, difficulty, questions, time, type } = req.body;
    const exam = await Exam.create({
      title, subject, topic: topic || '', difficulty: difficulty || 'Medium',
      questions: questions || 10, time: time || 45, type: type || 'MCQ',
      isCustom: true, createdBy: req.user._id
    });
    res.status(201).json({ success: true, exam });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/exams/:id
router.delete('/:id', protect, async (req, res) => {
  try {
    const exam = await Exam.findOne({ _id: req.params.id, createdBy: req.user._id });
    if (!exam) return res.status(404).json({ success: false, message: 'Exam not found or not authorized.' });
    await exam.deleteOne();
    res.json({ success: true, deletedId: req.params.id });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
