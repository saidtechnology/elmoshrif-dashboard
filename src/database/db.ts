import Database from 'better-sqlite3';
import { Student, MemorizationRecord, CommonMistake } from '../types';

const db = new Database('quran_teaching.db');

// Students
export const getStudents = (): Student[] => {
  return db.prepare('SELECT * FROM students ORDER BY name').all();
};

export const getStudentById = (id: number): Student | undefined => {
  return db.prepare('SELECT * FROM students WHERE id = ?').get(id);
};

export const createStudent = (student: Omit<Student, 'id'>): number => {
  const stmt = db.prepare(`
    INSERT INTO students (name, age, start_date, current_surah, current_juz, total_memorized, last_assessment)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    student.name,
    student.age,
    student.startDate,
    student.currentSurah,
    student.currentJuz,
    student.totalMemorized,
    student.lastAssessment
  );
  return result.lastInsertRowId as number;
};

export const updateStudent = (id: number, student: Partial<Student>): boolean => {
  const sets: string[] = [];
  const values: any[] = [];
  
  Object.entries(student).forEach(([key, value]) => {
    if (value !== undefined) {
      sets.push(`${key} = ?`);
      values.push(value);
    }
  });
  
  if (sets.length === 0) return false;
  
  const stmt = db.prepare(`
    UPDATE students 
    SET ${sets.join(', ')}
    WHERE id = ?
  `);
  
  const result = stmt.run(...values, id);
  return result.changes > 0;
};

export const deleteStudent = (id: number): boolean => {
  const result = db.prepare('DELETE FROM students WHERE id = ?').run(id);
  return result.changes > 0;
};

// Memorization Records
export const getStudentRecords = (studentId: number): MemorizationRecord[] => {
  return db.prepare('SELECT * FROM memorization_records WHERE student_id = ? ORDER BY date DESC').all(studentId);
};

export const createRecord = (record: Omit<MemorizationRecord, 'id'>): number => {
  const stmt = db.prepare(`
    INSERT INTO memorization_records (student_id, date, surah, verses, mistakes, quality, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    record.studentId,
    record.date,
    record.surah,
    record.verses,
    record.mistakes,
    record.quality,
    record.notes
  );
  return result.lastInsertRowId as number;
};

// Common Mistakes
export const getStudentMistakes = (studentId: number): CommonMistake[] => {
  return db.prepare('SELECT * FROM common_mistakes WHERE student_id = ? ORDER BY frequency DESC').all(studentId);
};

export const createMistake = (mistake: Omit<CommonMistake, 'id'>): number => {
  const stmt = db.prepare(`
    INSERT INTO common_mistakes (student_id, type, description, frequency, last_occurrence)
    VALUES (?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    mistake.studentId,
    mistake.type,
    mistake.description,
    mistake.frequency,
    mistake.lastOccurrence
  );
  return result.lastInsertRowId as number;
};

export const updateMistakeFrequency = (id: number, frequency: number, lastOccurrence: string): boolean => {
  const stmt = db.prepare(`
    UPDATE common_mistakes 
    SET frequency = ?, last_occurrence = ?
    WHERE id = ?
  `);
  const result = stmt.run(frequency, lastOccurrence, id);
  return result.changes > 0;
};