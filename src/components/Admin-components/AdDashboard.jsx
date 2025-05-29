// src/components/AdDashboard.jsx
import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { FaUsers, FaShieldAlt, FaFileInvoice, FaChartPie } from 'react-icons/fa';
import ErrorBoundary from '../../components/Admin-components/ErrorBoundary';
// mmmm


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AdDashboard() {
  const metrics = [
    { title: "Total Users", value: "15,432", icon: <FaUsers />, trend: "+3.2%", color: "bg-red-100" },
    { title: "Fraud Cases", value: "23", icon: <FaShieldAlt />, trend: "-1.4%", color: "bg-yellow-100" },
    { title: "Transactions", value: "2.1M", icon: <FaChartPie />, trend: "+8.9%", color: "bg-green-100" },
    { title: "Pending Actions", value: "89", icon: <FaFileInvoice />, trend: "Urgent", color: "bg-purple-100" },
  ];

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'User Activity',
      data: [65, 59, 80, 81, 56, 55],
      backgroundColor: 'rgba(220, 38, 38, 0.2)',
      borderColor: 'rgb(220, 38, 38)',
      borderWidth: 1
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'User Activity Overview' }
    },
    scales: {
      y: { beginAtZero: true, grid: { color: 'rgba(254, 226, 226, 0.1)' } },
      x: { grid: { color: 'rgba(254, 226, 226, 0.1)' } }
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className={`${metric.color} p-4 rounded-xl shadow-sm`}>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{metric.title}</p>
                <p className="text-2xl font-bold text-red-600">{metric.value}</p>
                <span className={`text-sm ${
                  metric.trend.startsWith('+') ? 'text-green-600' : 
                  metric.trend.startsWith('-') ? 'text-red-600' : 'text-yellow-600'
                }`}>
                  {metric.trend}
                </span>
              </div>
              <div className="text-red-500 text-2xl p-2 bg-white rounded-lg">
                {metric.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-xl font-bold text-red-600 mb-4">User Activity Overview</h3>
        <div className="h-64">
          <ErrorBoundary>
            <Bar data={chartData} options={chartOptions} />
          </ErrorBoundary>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivities />
        <SystemHealth />
      </div>
    </div>
  );
}

// Helper components
function RecentActivities() {
  const activities = [
    { id: 1, user: 'John Doe', action: 'Password reset', time: '2h ago' },
    { id: 2, user: 'System', action: 'Security update', time: '4h ago' },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-xl font-bold text-red-600 mb-4">Recent Activities</h3>
      <div className="space-y-4">
        {activities.map(activity => (
          <div key={activity.id} className="flex items-center justify-between p-3 hover:bg-red-50 rounded-lg">
            <div>
              <p className="font-medium">{activity.user}</p>
              <p className="text-sm text-gray-500">{activity.action}</p>
            </div>
            <span className="text-sm text-gray-400">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SystemHealth() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-xl font-bold text-red-600 mb-4">System Health</h3>
      <div className="space-y-3">
        <HealthItem label="Database" status="Operational" value="99.9%" />
        <HealthItem label="API Response" status="Normal" value="142ms" />
      </div>
    </div>
  );
}

function HealthItem({ label, status, value }) {
  const statusColor = status === 'Operational' ? 'text-green-500' : 'text-yellow-500';
  return (
    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
      <div>
        <p className="font-medium">{label}</p>
        <p className={`text-sm ${statusColor}`}>{status}</p>
      </div>
      <span className="text-red-600 font-medium">{value}</span>
    </div>
  );
}