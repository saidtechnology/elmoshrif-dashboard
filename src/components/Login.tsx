import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';

export function Login() {
  const { loginWithRedirect } = useAuth0();
  const [showCustomLogin, setShowCustomLogin] = useState(false);

  if (showCustomLogin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
          <h2 className="text-center text-3xl font-bold">مرحباً بك</h2>
          <div className="space-y-4">
            <button
              onClick={() => loginWithRedirect({
                authorizationParams: {
                  connection: 'google-oauth2'
                }
              })}
              className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <FcGoogle className="text-xl" />
              تسجيل الدخول باستخدام جوجل
            </button>
          
            <button
              onClick={() => setShowCustomLogin(true)}
              className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700"
            >
              تسجيل الدخول باستخدام البريد الإلكتروني
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
          <h2 className="text-center text-3xl font-bold">تسجيل الدخول</h2>
          <form className="space-y-6" onSubmit={(e) => {
            e.preventDefault();
            loginWithRedirect();
          }}>
            <div>
              <label className="block text-right mb-2">البريد الإلكتروني</label>
              <input
                type="email"
                required
                className="w-full px-3 py-2 border rounded-md text-right"
              />
            </div>
            <div>
              <label className="block text-right mb-2">كلمة المرور</label>
              <input
                type="password"
                required
                className="w-full px-3 py-2 border rounded-md text-right"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700"
            >
              تسجيل الدخول
            </button>
            <button
              type="button"
              onClick={() => setShowCustomLogin(false)}
              className="w-full text-gray-600 underline"
            >
              العودة
            </button>
          </form>
        </div>
      </div>
    );
  }
  }