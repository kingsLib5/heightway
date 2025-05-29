// src/components/ManageUsers.jsx
import React, { useState } from 'react';
import { FaEdit, FaTrash, FaSort } from 'react-icons/fa';

export default function ManageUsers() {
  const [users] = useState([
    { id: 1, name: 'John Doe', email: 'john@hsbc.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@hsbc.com', role: 'Manager', status: 'Inactive' },
    // Add more sample users
  ]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-red-600">User Management</h2>
        <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
          Add New User
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-red-50">
            <tr>
              <th className="p-3 text-left text-red-600"><FaSort className="inline mr-2" />Name</th>
              <th className="p-3 text-left text-red-600">Email</th>
              <th className="p-3 text-left text-red-600">Role</th>
              <th className="p-3 text-left text-red-600">Status</th>
              <th className="p-3 text-left text-red-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b border-red-100 hover:bg-red-50">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.role}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    user.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="p-3 flex gap-2">
                  <button className="text-red-600 hover:text-red-800 p-2">
                    <FaEdit />
                  </button>
                  <button className="text-red-600 hover:text-red-800 p-2">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}