const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true
  },
  questions: [{
    id: String,
    question: String,
    questionText: String,
    options: [String],
    correctAnswer: String,
    correctIndex: Number,
    difficulty: String,
    subject: String,
    type: {
      type: String,
      enum: ['MCQ', 'True/False', 'Short Answer'],
      default: 'MCQ'
    },
    explanation: String,
    source: {
      type: String,
      enum: ['AI', 'PDF', 'Manual', 'Bank'],
      default: 'AI'
    },
    topic: String
  }],
  totalQuestions: Number,
  generationMethod: {
    type: String,
    enum: ['AI', 'PDF', 'Manual'],
    default: 'AI'
  },
  aiModel: String,
  generationTime: Number,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);
