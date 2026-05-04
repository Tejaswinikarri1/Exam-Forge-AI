const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  subject: { type: String, required: true },
  topic: { type: String, default: '' },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
  questions: { type: Number, default: 10 },
  questionsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    default: null
  },
  time: { type: Number, default: 45 },
  type: { type: String, enum: ['MCQ', 'True/False', 'Short Answer'], default: 'MCQ' },
  isPreset: { type: Boolean, default: false },
  isCustom: { type: Boolean, default: false },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  status: { type: String, enum: ['draft', 'generated', 'published'], default: 'draft' },
  aiModel: { type: String, default: null },
  generatedAt: { type: Date, default: null }
}, { timestamps: true });

module.exports = mongoose.model('Exam', examSchema);
