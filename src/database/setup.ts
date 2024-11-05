import Database from 'better-sqlite3';
import { join } from 'path';

const db = new Database('quran_teaching.db');

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Create tables
db.exec(`
  -- Students table
  CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    start_date TEXT NOT NULL,
    current_surah TEXT NOT NULL,
    current_juz INTEGER NOT NULL,
    total_memorized INTEGER NOT NULL,
    last_assessment TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  -- Memorization records table
  CREATE TABLE IF NOT EXISTS memorization_records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    date TEXT NOT NULL,
    surah TEXT NOT NULL,
    verses TEXT NOT NULL,
    mistakes INTEGER NOT NULL DEFAULT 0,
    quality INTEGER NOT NULL CHECK(quality BETWEEN 1 AND 5),
    notes TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(student_id) REFERENCES students(id) ON DELETE CASCADE
  );

  -- Common mistakes table
  CREATE TABLE IF NOT EXISTS common_mistakes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    type TEXT NOT NULL,
    description TEXT NOT NULL,
    frequency INTEGER NOT NULL DEFAULT 1,
    last_occurrence TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(student_id) REFERENCES students(id) ON DELETE CASCADE
  );

  -- Triggers for updated_at
  CREATE TRIGGER IF NOT EXISTS students_updated_at 
  AFTER UPDATE ON students
  BEGIN
    UPDATE students SET updated_at = CURRENT_TIMESTAMP
    WHERE id = NEW.id;
  END;

  CREATE TRIGGER IF NOT EXISTS common_mistakes_updated_at
  AFTER UPDATE ON common_mistakes
  BEGIN
    UPDATE common_mistakes SET updated_at = CURRENT_TIMESTAMP
    WHERE id = NEW.id;
  END;
`);

// Insert some initial data
const insertStudent = db.prepare(`
  INSERT INTO students (name, age, start_date, current_surah, current_juz, total_memorized, last_assessment)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

const insertMemorizationRecord = db.prepare(`
  INSERT INTO memorization_records (student_id, date, surah, verses, mistakes, quality, notes)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

const insertCommonMistake = db.prepare(`
  INSERT INTO common_mistakes (student_id, type, description, frequency, last_occurrence)
  VALUES (?, ?, ?, ?, ?)
`);

// Transaction for initial data
const initData = db.transaction(() => {
  // Add sample student
  const studentId = insertStudent.run(
    'أحمد محمد',
    12,
    '2023-09-01',
    'البقرة',
    2,
    75,
    '2024-03-15'
  ).lastInsertRowId;

  // Add sample memorization record
  insertMemorizationRecord.run(
    studentId,
    '2024-03-15',
    'البقرة',
    'الآيات 142-145',
    2,
    4,
    'أداء جيد مع بعض الأخطاء البسيطة في المخارج'
  );

  // Add sample common mistake
  insertCommonMistake.run(
    studentId,
    'مخارج الحروف',
    'صعوبة في نطق حرف الضاد',
    5,
    '2024-03-15'
  );
});

// Run initial data transaction
try {
  initData();
  console.log('Database setup completed successfully!');
} catch (err) {
  console.error('Error setting up database:', err);
}