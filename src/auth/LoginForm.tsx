import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginWithRedirect } = useAuth0();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginWithRedirect({
      authorizationParams: {
        login_hint: email,
        screen_hint: 'login'
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-center text-3xl font-bold">تسجيل الدخول</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-right">البريد الإلكتروني</label>
            <input
              id="email"
              type="email"
              required
              className="w-full px-3 py-2 border rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-right">كلمة المرور</label>
            <input
              id="password"
              type="password"
              required
              className="w-full px-3 py-2 border rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              تسجيل الدخول
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}