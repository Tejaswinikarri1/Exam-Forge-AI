const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = path.join(__dirname, '../examforge.db');

let db;

function getDB() {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    initSchema();
  }
  return db;
}

function initSchema() {
  const db = getDB();

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'Student',
      avatar TEXT,
      joined_date TEXT NOT NULL,
      created_at INTEGER DEFAULT (strftime('%s','now'))
    );

    CREATE TABLE IF NOT EXISTS exams (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      title TEXT NOT NULL,
      subject TEXT NOT NULL,
      difficulty TEXT NOT NULL DEFAULT 'Medium',
      question_count INTEGER NOT NULL DEFAULT 10,
      time_limit INTEGER NOT NULL DEFAULT 45,
      question_type TEXT NOT NULL DEFAULT 'MCQ',
      is_preset INTEGER NOT NULL DEFAULT 0,
      is_custom INTEGER NOT NULL DEFAULT 0,
      questions_json TEXT,
      created_at INTEGER DEFAULT (strftime('%s','now')),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS attempts (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      exam_id TEXT,
      exam_title TEXT NOT NULL,
      subject TEXT NOT NULL,
      difficulty TEXT NOT NULL DEFAULT 'Medium',
      question_type TEXT NOT NULL DEFAULT 'MCQ',
      score INTEGER NOT NULL DEFAULT 0,
      correct INTEGER NOT NULL DEFAULT 0,
      total_questions INTEGER NOT NULL DEFAULT 0,
      time_taken TEXT,
      date TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'failed',
      created_at INTEGER DEFAULT (strftime('%s','now')),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_attempts_user ON attempts(user_id);
    CREATE INDEX IF NOT EXISTS idx_exams_user ON exams(user_id);
  `);

  // Seed preset exams if not already done
  const count = db.prepare('SELECT COUNT(*) as c FROM exams WHERE is_preset = 1').get();
  if (count.c === 0) {
    seedPresetExams(db);
  }
}

const ALL_SUBJECTS = [
  "C Programming","Python","Java","C++","DSA","SQL",
  "HTML","CSS","JavaScript","Computer Networks","DBMS",
  "Compiler Design","Computer Organization","Operating Systems",
  "Discrete Mathematics","Formal Languages & Automata",
  "Software Engineering","Design & Analysis of Algorithms",
  "Cryptography & Network Security","Big Data Analytics",
  "Cloud Computing","Machine Learning","Deep Learning"
];

function seedPresetExams(db) {
  const insert = db.prepare(`
    INSERT INTO exams (id, user_id, title, subject, difficulty, question_count, time_limit, question_type, is_preset)
    VALUES (?, NULL, ?, ?, ?, ?, ?, 'MCQ', 1)
  `);
  const insertMany = db.transaction((exams) => {
    for (const e of exams) insert.run(...e);
  });
  const presets = ALL_SUBJECTS.map((subj, i) => [
    `preset_${i}`,
    `${subj} — Complete Mock Test`,
    subj,
    'Medium',
    45,
    90
  ]);
  insertMany(presets);
}

module.exports = { getDB };
