import React from "react";

const defaultTransactions = [
  {
    _id: "1",
    transferDate: "2025-04-30T00:00:00Z",
    recipientName: "Daily Business Income",
    recipientBank: "Credit",
    amount: -3000,
    currency: "USD",
    status: "Approved",
  },
  {
    _id: "2",
    transferDate: "2025-04-30T00:00:00Z",
    recipientName: "Bank Charges",
    recipientBank: "Charge",
    amount: 5,
    currency: "USD",
    status: "Approved",
  },
  {
    _id: "3",
    transferDate: "2025-05-01T00:00:00Z",
    recipientName: "Daily Business Income",
    recipientBank: "Credit",
    amount: -3000,
    currency: "USD",
    status: "Approved",
  },
];

const TransactionHistoryTable = ({
  transactions = defaultTransactions,
  totalTransactions,
  limit = 10,
  currentPage = 1,
  onPageChange = () => {},
  showPagination = false,
}) => {
  // Show all transactions passed in, no filter
  const filteredTransactions = transactions;

  // Pagination calculations
  const totalPages = Math.ceil(
    (totalTransactions || filteredTransactions.length) / limit
  );
  const startIndex = (currentPage - 1) * limit;
  const paginatedTransactions = filteredTransactions.slice(
    startIndex,
    startIndex + limit
  );

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 font-medium text-gray-900">Date</th>
            <th className="px-4 py-3 font-medium text-gray-900">Recipient</th>
            <th className="px-4 py-3 font-medium text-gray-900">Bank</th>
            <th className="px-4 py-3 font-medium text-gray-900">Amount</th>
            <th className="px-4 py-3 font-medium text-gray-900">Currency</th>
            <th className="px-4 py-3 font-medium text-gray-900">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-200">
          {paginatedTransactions.length > 0 ? (
            paginatedTransactions.map((transaction) => (
              <tr
                key={transaction._id}
                className="hover:bg-gray-50 even:bg-gray-50"
              >
                <td className="px-4 py-3">
                  {transaction.transferDate
                    ? (() => {
                        const d = new Date(transaction.transferDate);
                        return isNaN(d)
                          ? "N/A"
                          : d.toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            });
                      })()
                    : "N/A"}
                </td>
                <td className="px-4 py-3">{transaction.recipientName}</td>
                <td className="px-4 py-3">{transaction.recipientBank || "N/A"}</td>
                <td className="px-4 py-3">
                  <span
                    className={`font-medium ${
                      transaction.amount >= 0 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {transaction.amount >= 0 ? "-" : "+"}
                    {(Math.abs(transaction.amount) || 0).toLocaleString("en-US", {
                      style: "currency",
                      currency: transaction.currency || "USD",
                    })}
                  </span>
                </td>
                <td className="px-4 py-3">{transaction.currency || "USD"}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      transaction.status === "Approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                className="text-center py-4 text-gray-400"
              >
                No transactions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showPagination && totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <nav className="flex isolate divide-x divide-gray-300 rounded-lg shadow-sm">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Previous
            </button>
            <div className="flex divide-x divide-gray-300">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => onPageChange(index + 1)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                    currentPage === index + 1
                      ? "bg-red-600 text-white focus:z-20"
                      : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 ${
                currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default TransactionHistoryTable;