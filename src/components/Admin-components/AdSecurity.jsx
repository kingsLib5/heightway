import React from 'react';
import { FaShieldAlt, FaLock, FaUserLock, FaClock } from 'react-icons/fa';

const activeSessions = [
  { id: 1, device: 'Windows Chrome', ip: '192.168.1.1', lastActive: '2h ago' },
  { id: 2, device: 'MacOS Safari', ip: '203.120.33.1', lastActive: '5d ago' },
];

export default function AdSecurity() {
  return (
    <div className="bg-red-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-red-600">
            <FaShieldAlt className="inline mr-2" />
            Security Dashboard
          </h1>
          <p className="text-red-400 mt-2">Last security audit: March 15, 2024</p>
        </div>

        {/* Security Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Sessions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-red-600 mb-4 flex items-center">
              <FaUserLock className="mr-2" />
              Active Sessions
            </h2>
            <div className="space-y-4">
              {activeSessions.map((session) => (
                <div key={session.id} className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="font-medium">{session.device}</p>
                    <p className="text-sm text-red-400">{session.ip}</p>
                  </div>
                  <span className="text-sm text-red-500 flex items-center">
                    <FaClock className="mr-2" />
                    {session.lastActive}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Security Controls */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-red-600 mb-6 flex items-center">
              <FaLock className="mr-2" />
              Security Controls
            </h2>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-red-600">Password Reset</h3>
                  <p className="text-sm text-red-400">Last changed 30 days ago</p>
                </div>
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                  Reset Password
                </button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-red-600">Two-Factor Authentication</h3>
                  <p className="text-sm text-red-400">Currently enabled</p>
                </div>
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider round bg-red-600"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .switch {
          position: relative;
          display: inline-block;
          width: 60px;
          height: 34px;
        }
        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: .4s;
          border-radius: 34px;
        }
        .slider:before {
          position: absolute;
          content: "";
          height: 26px;
          width: 26px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: .4s;
          border-radius: 50%;
        }
        input:checked + .slider {
          background-color: #dc2626;
        }
        input:checked + .slider:before {
          transform: translateX(26px);
        }
      `}</style>
    </div>
  );
}