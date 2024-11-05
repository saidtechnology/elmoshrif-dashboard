import { Users, BookOpen, AlertTriangle, TrendingUp } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const stats = {
    totalStudents: 25,
    averageProgress: 85,
    activeStudents: 22,
    needAttention: 3
  };

  const progressData = {
    labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
    datasets: [
      {
        label: 'متوسط التقدم',
        data: [65, 70, 75, 80, 85, 90],
        borderColor: 'rgb(16, 185, 129)',
        tension: 0.4,
      }
    ]
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">لوحة التحكم</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 mb-1">إجمالي الطلاب</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.totalStudents}</h3>
            </div>
            <Users className="w-10 h-10 text-emerald-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 mb-1">متوسط التقدم</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.averageProgress}%</h3>
            </div>
            <TrendingUp className="w-10 h-10 text-emerald-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 mb-1">الطلاب النشطون</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.activeStudents}</h3>
            </div>
            <BookOpen className="w-10 h-10 text-emerald-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 mb-1">يحتاجون اهتمام</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.needAttention}</h3>
            </div>
            <AlertTriangle className="w-10 h-10 text-amber-500" />
          </div>
        </div>
      </div>

      {/* Progress Chart */}
      <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">تقدم الطلاب</h3>
        <div className="h-[400px]">
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
  );
}

export default Dashboard;