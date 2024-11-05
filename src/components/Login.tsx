import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { BookOpen } from 'lucide-react';

export function Login() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="min-h-screen bg-[#f8f4ec] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">نظام إدارة تحفيظ القرآن</h1>
          <p className="text-gray-500 mt-2">الرجاء تسجيل الدخول للمتابعة</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => loginWithRedirect()}
            className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            تسجيل الدخول
          </button>
          
          <button
            onClick={() => loginWithRedirect({
              connection: 'google-oauth2'
            })}
            className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            <span>تسجيل الدخول باستخدام Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}