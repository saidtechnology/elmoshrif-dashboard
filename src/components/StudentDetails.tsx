import React, { useState } from 'react';
import { ArrowRight, Plus, BookOpen, AlertTriangle } from 'lucide-react';
import { Student, MemorizationRecord, CommonMistake } from '../types';
import { Line } from 'react-chartjs-2';
import { mockMemorizationRecords, mockCommonMistakes } from '../data/mockData';

interface StudentDetailsProps {
  student: Student;
  onBack: () => void;
}

function StudentDetails({ student, onBack }: StudentDetailsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'records' | 'mistakes'>('overview');
  
  const records = mockMemorizationRecords.filter(r => r.studentId === student.id);
  const mistakes = mockCommonMistakes.filter(m => m.studentId === student.id);

  const progressData = {
    labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
    datasets: [
      {
        label: 'نسبة الإتقان',
        data: [75, 78, 80, 85, 82, 88],
        borderColor: 'rgb(16, 185, 129)',
        tension: 0.4,
      }
    ]
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowRight className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{student.name}</h2>
          <p className="text-gray-500">آخر تقييم: {student.lastAssessment}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'overview'
              ? 'bg-emerald-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          نظرة عامة
        </button>
        <button
          onClick={() => setActiveTab('records')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'records'
              ? 'bg-emerald-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          سجل الحفظ
        </button>
        <button
          onClick={() => setActiveTab('mistakes')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'mistakes'
              ? 'bg-emerald-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          الأخطاء المتكررة
        </button>
      </div>

      {/* Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 mb-1">السورة الحالية</p>
                  <h3 className="text-xl font-bold text-gray-800">{student.currentSurah}</h3>
                </div>
                <BookOpen className="w-8 h-8 text-emerald-500" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 mb-1">نسبة الحفظ</p>
                  <h3 className="text-xl font-bold text-gray-800">{student.totalMemorized}%</h3>
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                  <span className="text-emerald-600 font-bold">%</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 mb-1">الأخطاء المتكررة</p>
                  <h3 className="text-xl font-bold text-gray-800">{mistakes.length}</h3>
                </div>
                <AlertTriangle className="w-8 h-8 text-amber-500" />
              </div>
            </div>
          </div>

          {/* Progress Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">تقدم الطالب</h3>
            <div className="h-[300px]">
              <Line 
                data={progressData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 100
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'records' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">سجل الحفظ</h3>
            <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-emerald-700 transition-colors">
              <Plus className="w-5 h-5" />
              <span>إضافة تسميع</span>
            </button>
          </div>
          
          <div className="space-y-4">
            {records.map(record => (
              <div key={record.id} className="border-b border-gray-100 pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-800">{record.surah}</h4>
                    <p className="text-sm text-gray-500">{record.verses}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-500">{record.date}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < record.quality ? 'bg-emerald-500' : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                {record.notes && (
                  <p className="mt-2 text-sm text-gray-600">{record.notes}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'mistakes' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">الأخطاء المتكررة</h3>
            <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-emerald-700 transition-colors">
              <Plus className="w-5 h-5" />
              <span>إضافة خطأ</span>
            </button>
          </div>
          
          <div className="space-y-4">
            {mistakes.map(mistake => (
              <div key={mistake.id} className="border-b border-gray-100 pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-800">{mistake.type}</h4>
                    <p className="text-sm text-gray-600 mt-1">{mistake.description}</p>
                  </div>
                  <div className="text-left">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                      {mistake.frequency}x
                    </span>
                    <p className="text-sm text-gray-500 mt-1">
                      آخر ظهور: {mistake.lastOccurrence}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentDetails;