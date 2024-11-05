import { useState, useEffect } from 'react';
import * as db from '../database/db';
import { Student, MemorizationRecord, CommonMistake } from '../types';

export function useStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refreshStudents = async () => {
    try {
      const data = await db.getStudents();
      setStudents(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshStudents();
  }, []);

  const addStudent = async (student: Omit<Student, 'id'>) => {
    try {
      await db.createStudent(student);
      refreshStudents();
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const updateStudent = async (id: number, data: Partial<Student>) => {
    try {
      await db.updateStudent(id, data);
      refreshStudents();
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const deleteStudent = async (id: number) => {
    try {
      await db.deleteStudent(id);
      refreshStudents();
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return {
    students,
    loading,
    error,
    refreshStudents,
    addStudent,
    updateStudent,
    deleteStudent,
  };
}

export function useStudentRecords(studentId: number) {
  const [records, setRecords] = useState<MemorizationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refreshRecords = async () => {
    try {
      const data = await db.getStudentRecords(studentId);
      setRecords(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshRecords();
  }, [studentId]);

  const addRecord = async (record: Omit<MemorizationRecord, 'id'>) => {
    try {
      await db.createRecord(record);
      refreshRecords();
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return {
    records,
    loading,
    error,
    refreshRecords,
    addRecord,
  };
}

export function useStudentMistakes(studentId: number) {
  const [mistakes, setMistakes] = useState<CommonMistake[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refreshMistakes = async () => {
    try {
      const data = await db.getStudentMistakes(studentId);
      setMistakes(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshMistakes();
  }, [studentId]);

  const addMistake = async (mistake: Omit<CommonMistake, 'id'>) => {
    try {
      await db.createMistake(mistake);
      refreshMistakes();
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const updateFrequency = async (id: number, frequency: number, lastOccurrence: string) => {
    try {
      await db.updateMistakeFrequency(id, frequency, lastOccurrence);
      refreshMistakes();
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return {
    mistakes,
    loading,
    error,
    refreshMistakes,
    addMistake,
    updateFrequency,
  };
}