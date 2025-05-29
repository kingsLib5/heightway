// src/components/AdminNavBar.jsx
import React from 'react';
import { FaBell, FaSearch, FaUserCircle, FaChartLine } from 'react-icons/fa';

export default function AdminNavBar() {
  return (
    <nav className="bg-white shadow-sm px-4 py-3 lg:px-6 lg:py-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-red-600 hidden lg:block">HSBC Admin Console</h1>
        <div className="flex items-center bg-red-50 rounded-lg px-3 py-2">
          <FaSearch className="text-red-400 mr-2" />
          <input
            type="text"
            placeholder="Search users, transactions..."
            className="bg-transparent outline-none placeholder-red-300 text-red-600"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 relative text-red-500 hover:bg-red-50 rounded-lg">
          <FaBell className="text-xl" />
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 text-xs">3</span>
        </button>
        
        <div className="flex items-center gap-2 bg-red-50 px-3 py-2 rounded-lg">
          <FaUserCircle className="text-red-500" />
          <span className="text-red-600 font-medium">Admin User</span>
        </div>
      </div>
    </nav>
  );
}