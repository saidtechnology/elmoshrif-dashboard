import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Users, BookOpen, BarChart2, Settings, UserCog } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import Dashboard from './components/Dashboard';
import StudentsList from './components/StudentsList';
import StudentDetails from './components/StudentDetails';
import { UserManagement } from './components/UserManagement';
import { Login } from './components/Login';
import { Student } from './types';

function App() {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const [activeView, setActiveView] = useState<'dashboard' | 'students' | 'details' | 'users'>('dashboard');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8f4ec] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  const isAdmin = user?.email === 'admin@example.com' || user?.[`${window.location.origin}/roles`]?.includes('admin');

  return (
    <div className="flex min-h-screen bg-[#f8f4ec]" dir="rtl">
      <Toaster position="top-center" />
      
      {/* Sidebar */}
      <aside className="w-64 bg-emerald-800 text-white p-6">
        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="w-8 h-8" />
          <h1 className="text-xl font-bold">نظام إدارة التحفيظ</h1>
        </div>
        
        <nav className="space-y-2">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeView === 'dashboard' ? 'bg-emerald-700' : 'hover:bg-emerald-700/50'
            }`}
          >
            <BarChart2 className="w-5 h-5" />
            <span>لوحة التحكم</span>
          </button>
          
          <button
            onClick={() => {
              setActiveView('students');
              setSelectedStudent(null);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeView === 'students' ? 'bg-emerald-700' : 'hover:bg-emerald-700/50'
            }`}
          >
            <Users className="w-5 h-5" />
            <span>الطلاب</span>
          </button>

          {isAdmin && (
            <button
              onClick={() => setActiveView('users')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeView === 'users' ? 'bg-emerald-700' : 'hover:bg-emerald-700/50'
              }`}
            >
              <UserCog className="w-5 h-5" />
              <span>إدارة المستخدمين</span>
            </button>
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {activeView === 'dashboard' && <Dashboard />}
        {activeView === 'students' && (
          <StudentsList 
            onSelectStudent={(student) => {
              setSelectedStudent(student);
              setActiveView('details');
            }}
          />
        )}
        {activeView === 'details' && selectedStudent && (
          <StudentDetails 
            student={selectedStudent}
            onBack={() => {
              setActiveView('students');
              setSelectedStudent(null);
            }}
          />
        )}
        {activeView === 'users' && isAdmin && <UserManagement />}
      </main>
    </div>
  );
}

export default App;