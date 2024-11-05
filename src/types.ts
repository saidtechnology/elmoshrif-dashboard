export interface Student {
  id: string;
  name: string;
  age: number;
  startDate: string;
  currentSurah: string;
  currentJuz: number;
  totalMemorized: number;
  lastAssessment: string;
}

export interface MemorizationRecord {
  id: string;
  studentId: string;
  date: string;
  surah: string;
  verses: string;
  mistakes: number;
  quality: 1 | 2 | 3 | 4 | 5;
  notes: string;
}

export interface CommonMistake {
  id: string;
  studentId: string;
  type: string;
  description: string;
  frequency: number;
  lastOccurrence: string;
}

export interface StudentProgress {
  weeklyProgress: number[];
  monthlyProgress: number[];
  yearlyProgress: number[];
  labels: string[];
}