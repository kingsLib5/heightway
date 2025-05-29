import React from 'react';
import { FaSearch, FaFilter, FaMoneyCheckAlt, FaExchangeAlt } from 'react-icons/fa';

const transactions = [
  { id: 1, date: '2024-03-25', description: 'Account Funding', amount: '+$5,000', status: 'Completed' },
  { id: 2, date: '2024-03-24', description: 'Wire Transfer', amount: '-$2,300', status: 'Pending' },
  { id: 3, date: '2024-03-23', description: 'Service Charge', amount: '-$25', status: 'Completed' },
];

export default function AdTransactions() {
  return (
    <div className="bg-red-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl font-bold text-red-600 mb-4 md:mb-0">
            <FaMoneyCheckAlt className="inline mr-2" />
            Transaction Management
          </h1>
          
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search transactions..."
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-red-200 focus:outline-red-500"
              />
              <FaSearch className="absolute left-3 top-3 text-red-400" />
            </div>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center">
              <FaFilter className="mr-2" />
              Filter
            </button>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-red-50">
                <tr>
                  <th className="px-6 py-4 text-left text-red-600">Date</th>
                  <th className="px-6 py-4 text-left text-red-600">Description</th>
                  <th className="px-6 py-4 text-left text-red-600">Amount</th>
                  <th className="px-6 py-4 text-left text-red-600">Status</th>
                  <th className="px-6 py-4 text-left text-red-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-red-100 hover:bg-red-50">
                    <td className="px-6 py-4">{transaction.date}</td>
                    <td className="px-6 py-4">{transaction.description}</td>
                    <td className="px-6 py-4 font-medium">{transaction.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        transaction.status === 'Completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-red-600 hover:text-red-800 mr-4">
                        Details
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <FaExchangeAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}