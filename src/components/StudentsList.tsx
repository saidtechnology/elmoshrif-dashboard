import React, { useState } from 'react';
import { Plus, Search, ChevronLeft } from 'lucide-react';
import { Student } from '../types';
import { mockStudents } from '../data/mockData';

interface StudentsListProps {
  onSelectStudent: (student: Student) => void;
}

function StudentsList({ onSelectStudent }: StudentsListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const students = mockStudents;

  const filteredStudents = students.filter(student =>
    student.name.includes(searchTerm)
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">قائمة الطلاب</h2>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-emerald-700 transition-colors">
          <Plus className="w-5 h-5" />
          <span>إضافة طالب</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="بحث عن طالب..."
          className="w-full pl-4 pr-12 py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map(student => (
          <div
            key={student.id}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onSelectStudent(student)}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-800">{student.name}</h3>
                <p className="text-gray-500 text-sm">العمر: {student.age} سنة</p>
              </div>
              <ChevronLeft className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="space-y-2">
              <p className="text-sm">
                <span className="text-gray-500">السورة الحالية: </span>
                <span className="font-medium">{student.currentSurah}</span>
              </p>
              <p className="text-sm">
                <span className="text-gray-500">الجزء: </span>
                <span className="font-medium">{student.currentJuz}</span>
              </p>
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">نسبة الحفظ</span>
                  <span className="font-medium">{student.totalMemorized}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-emerald-500 h-2 rounded-full"
                    style={{ width: `${student.totalMemorized}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentsList;