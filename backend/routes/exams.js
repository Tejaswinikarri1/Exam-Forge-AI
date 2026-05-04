const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect } = require('../middleware/auth');
const Exam = require('../models/Exam');
const Question = require('../models/Question');
const { generateQuestionsWithAI } = require('../utils/ai');
const { parseQuestionsFromPDF } = require('../utils/pdf');

// Multer configuration for PDF uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

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
      isCustom: true, createdBy: req.user._id, status: 'draft'
    });
    res.status(201).json({ success: true, exam });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/exams/:id/generate — Generate questions with AI
router.post('/:id/generate', protect, async (req, res) => {
  try {
    const exam = await Exam.findOne({ _id: req.params.id, createdBy: req.user._id });
    if (!exam) {
      return res.status(404).json({ success: false, message: 'Exam not found or not authorized.' });
    }

    const startTime = Date.now();

    // Call Groq AI to generate questions
    const result = await generateQuestionsWithAI({
      subject: exam.subject,
      topic: exam.topic,
      difficulty: exam.difficulty,
      type: exam.type,
      count: exam.questions
    });

    const generationTime = Date.now() - startTime;

    if (!result.success || result.questions.length === 0) {
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to generate questions. Please try again.' 
      });
    }

    // Store questions in Questions collection
    const questionDoc = await Question.create({
      examId: exam._id,
      questions: result.questions.map((q, idx) => ({
        id: q.id,
        question: q.question,
        questionText: q.question,
        options: q.options || [],
        correctAnswer: q.correctAnswer,
        correctIndex: q.options ? q.options.indexOf(q.correctAnswer) : -1,
        difficulty: exam.difficulty,
        subject: exam.subject,
        type: exam.type,
        explanation: q.explanation || '',
        source: 'AI',
        topic: exam.topic
      })),
      totalQuestions: result.questions.length,
      generationMethod: 'AI',
      aiModel: result.model,
      generationTime
    });

    // Link questions to exam
    exam.questionsId = questionDoc._id;
    exam.status = 'generated';
    exam.aiModel = result.model;
    exam.generatedAt = new Date();
    await exam.save();

    res.status(201).json({
      success: true,
      exam,
      questions: result.questions,
      generationTime,
      model: result.model,
      message: `Successfully generated ${result.questions.length} questions in ${(generationTime / 1000).toFixed(2)}s`
    });
  } catch (err) {
    console.error('Generation error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/exams/:id/pdf — Parse PDF and generate questions
router.post('/:id/pdf', protect, upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No PDF file uploaded' });
    }

    const exam = await Exam.findOne({ _id: req.params.id, createdBy: req.user._id });
    if (!exam) {
      return res.status(404).json({ success: false, message: 'Exam not found or not authorized.' });
    }

    const startTime = Date.now();

    // Parse PDF and generate questions
    const result = await parseQuestionsFromPDF({
      pdfBuffer: req.file.buffer,
      subject: exam.subject,
      difficulty: exam.difficulty,
      type: exam.type,
      count: exam.questions
    });

    const generationTime = Date.now() - startTime;

    if (!result.success || result.questions.length === 0) {
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to extract questions from PDF. Please try another PDF.' 
      });
    }

    // Store questions in Questions collection
    const questionDoc = await Question.create({
      examId: exam._id,
      questions: result.questions.map((q) => ({
        id: q.id,
        question: q.question,
        questionText: q.question,
        options: q.options || [],
        correctAnswer: q.correctAnswer,
        correctIndex: q.options ? q.options.indexOf(q.correctAnswer) : -1,
        difficulty: exam.difficulty,
        subject: exam.subject,
        type: exam.type,
        explanation: q.explanation || '',
        source: 'PDF',
        topic: exam.topic
      })),
      totalQuestions: result.questions.length,
      generationMethod: 'PDF',
      aiModel: result.model,
      generationTime
    });

    // Link questions to exam
    exam.questionsId = questionDoc._id;
    exam.status = 'generated';
    exam.aiModel = `${result.model} (PDF)`;
    exam.generatedAt = new Date();
    await exam.save();

    res.status(201).json({
      success: true,
      exam,
      questions: result.questions,
      generationTime,
      model: result.model,
      extractedText: result.extractedText,
      message: `Successfully extracted and generated ${result.questions.length} questions from PDF in ${(generationTime / 1000).toFixed(2)}s`
    });
  } catch (err) {
    console.error('PDF parsing error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/exams/:id/questions — Get questions for an exam
router.get('/:id/questions', protect, async (req, res) => {
  try {
    const exam = await Exam.findOne({ _id: req.params.id, createdBy: req.user._id }).populate('questionsId');
    if (!exam) {
      return res.status(404).json({ success: false, message: 'Exam not found or not authorized.' });
    }

    if (!exam.questionsId) {
      return res.status(404).json({ success: false, message: 'No questions generated yet. Please generate questions first.' });
    }

    res.json({ 
      success: true, 
      exam,
      questions: exam.questionsId.questions,
      generatedAt: exam.questionsId.createdAt,
      aiModel: exam.aiModel,
      source: exam.questionsId.generationMethod
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/exams/:id
router.delete('/:id', protect, async (req, res) => {
  try {
    const exam = await Exam.findOne({ _id: req.params.id, createdBy: req.user._id });
    if (!exam) return res.status(404).json({ success: false, message: 'Exam not found or not authorized.' });
    
    // Delete associated questions
    if (exam.questionsId) {
      await Question.deleteOne({ _id: exam.questionsId });
    }
    
    await exam.deleteOne();
    res.json({ success: true, deletedId: req.params.id });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
