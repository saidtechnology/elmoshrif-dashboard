import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Users, UserPlus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface User {
  id: number;
  email: string;
  role: 'admin' | 'user';
}

interface Auth0User {
  email: string;
  sub: string;
}

export function UserManagement(): JSX.Element {
  const { user, isAuthenticated } = useAuth0<Auth0User>();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Initialize with admin user if authenticated
    if (isAuthenticated && user) {
      setUsers([
        { 
          id: 1, 
          email: user.email || 'admin@example.com',
          role: 'admin' 
        }
      ]);
    }
  }, [isAuthenticated, user]);

  const handleDeleteUser = async (userId: number) => {
    try {
      // In production, this would call Auth0 Management API
      setUsers(users.filter(u => u.id !== userId));
      toast.success('تم حذف المستخدم بنجاح');
    } catch (error) {
      toast.error('حدث خطأ أثناء حذف المستخدم');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">إدارة المستخدمين</h2>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-emerald-700 transition-colors">
          <UserPlus className="w-5 h-5" />
          <span>دعوة مستخدم جديد</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <Users className="w-8 h-8 text-emerald-600" />
            <div>
              <h3 className="text-xl font-bold text-gray-800">المستخدمون النشطون</h3>
              <p className="text-gray-500">إدارة صلاحيات وحسابات المستخدمين</p>
            </div>
          </div>

          <div className="space-y-4">
            {users.map(user => (
              <div key={user.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{user.email}</p>
                  <p className="text-sm text-gray-500">
                    {user.role === 'admin' ? 'مدير النظام' : 'مستخدم'}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <select
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                    defaultValue={user.role}
                  >
                    <option value="admin">مدير</option>
                    <option value="user">مستخدم</option>
                  </select>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-500 hover:text-red-600 p-2"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}