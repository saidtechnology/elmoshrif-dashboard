import { Student, MemorizationRecord, CommonMistake } from '../types';

export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'أحمد محمد',
    age: 12,
    startDate: '2023-09-01',
    currentSurah: 'البقرة',
    currentJuz: 2,
    totalMemorized: 75,
    lastAssessment: '2024-03-15'
  },
  {
    id: '2',
    name: 'عمر خالد',
    age: 10,
    startDate: '2023-10-15',
    currentSurah: 'آل عمران',
    currentJuz: 3,
    totalMemorized: 60,
    lastAssessment: '2024-03-14'
  },
  {
    id: '3',
    name: 'فاطمة أحمد',
    age: 11,
    startDate: '2023-08-20',
    currentSurah: 'النساء',
    currentJuz: 5,
    totalMemorized: 85,
    lastAssessment: '2024-03-16'
  }
];

export const mockMemorizationRecords: MemorizationRecord[] = [
  {
    id: '1',
    studentId: '1',
    date: '2024-03-15',
    surah: 'البقرة',
    verses: 'الآيات 142-145',
    mistakes: 2,
    quality: 4,
    notes: 'أداء جيد مع بعض الأخطاء البسيطة في المخارج'
  },
  {
    id: '2',
    studentId: '1',
    date: '2024-03-12',
    surah: 'البقرة',
    verses: 'الآيات 138-141',
    mistakes: 1,
    quality: 5,
    notes: 'ممتاز! تحسن ملحوظ في التجويد'
  }
];

export const mockCommonMistakes: CommonMistake[] = [
  {
    id: '1',
    studentId: '1',
    type: 'مخارج الحروف',
    description: 'صعوبة في نطق حرف الضاد',
    frequency: 5,
    lastOccurrence: '2024-03-15'
  },
  {
    id: '2',
    studentId: '1',
    type: 'أحكام التجويد',
    description: 'عدم مراعاة الغنة في النون الساكنة',
    frequency: 3,
    lastOccurrence: '2024-03-12'
  }
];