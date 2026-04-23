const mongoose = require('mongoose');

const attemptSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  exam: { type: String, required: true },
  subject: { type: String, default: 'General' },
  difficulty: { type: String, default: 'Medium' },
  qType: { type: String, default: 'MCQ' },
  score: { type: Number, required: true, min: 0, max: 100 },
  total: { type: Number, default: 100 },
  correct: { type: Number, default: 0 },
  totalQ: { type: Number, default: 0 },
  time: { type: String, default: '00:00' },
  date: { type: String, default: () => new Date().toISOString().slice(0, 10) },
  status: { type: String, enum: ['passed', 'failed'], default: 'failed' }
}, { timestamps: true });

module.exports = mongoose.model('Attempt', attemptSchema);
