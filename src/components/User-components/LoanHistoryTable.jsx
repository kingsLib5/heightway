import React, { useState } from "react";

const LoanHistoryTable = () => {
  const [mockLoans] = useState([
    { _id: "1", loanAmount: 5000, status: "Approved", createdAt: "2024-03-15T09:00:00Z" },
    { _id: "2", loanAmount: 15000, status: "Pending", createdAt: "2024-03-18T14:30:00Z" },
    { _id: "3", loanAmount: 10000, status: "Paid", createdAt: "2024-02-01T11:15:00Z" },
  ]);

  return (
    <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-red-50">
          <tr>
            {['Loan ID', 'Amount', 'Status', 'Date Created'].map((header) => (
              <th
                key={header}
                className="px-6 py-3 text-left text-sm font-semibold text-red-700 uppercase"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {mockLoans.map((loan) => (
            <tr
              key={loan._id}
              className="hover:bg-red-50 transition-colors"
            >
              <td className="px-6 py-4 text-sm text-gray-700">{loan._id}</td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                ${loan.loanAmount.toFixed(2)}
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap
                    ${loan.status === 'Approved'
                      ? 'bg-green-100 text-green-800'
                      : loan.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'}`}
                >
                  {loan.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {new Date(loan.createdAt).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {mockLoans.length === 0 && (
        <div className="mt-4 text-center text-gray-500">
          No loan history available
        </div>
      )}
    </div>
  );
};

export default LoanHistoryTable;
