// src/components/AdminFooter.jsx
import React from 'react';
import { FaGithub, FaShieldAlt, FaHeart } from 'react-icons/fa';

export default function AdminFooter() {
  return (
    <footer className="bg-white border-t border-red-100 mt-8 py-4 px-6">
      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        <div className="flex items-center gap-4 mb-2 md:mb-0">
          <span className="flex items-center gap-1">
            <FaShieldAlt className="text-red-500" />
            Secure Admin Portal
          </span>
          <span>v2.1.0</span>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="hover:text-red-600 flex items-center gap-1">
            <FaGithub />
            GitHub
          </button>
          <span className="hidden md:block">|</span>
          <button className="hover:text-red-600">Audit Logs</button>
          <span className="hidden md:block">|</span>
          <button className="hover:text-red-600 flex items-center gap-1">
            <FaHeart className="text-red-500" />
            Support
          </button>
        </div>
      </div>
    </footer>
  );
}