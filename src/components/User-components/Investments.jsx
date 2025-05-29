import React, { useState } from "react";
import Modal from "../../components/Modal/Modal";

const Investments = () => {
  const [isTransferModalOpen, setTransferModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [transferAmount, setTransferAmount] = useState("");

  const checkingBalance = 5000.0;

  const recentTransactions = [
    { id: 1, date: "2023-03-01", description: "Investment in Mutual Fund", amount: 1000.0 },
    { id: 2, date: "2023-03-05", description: "Investment in Stocks", amount: 1500.0 },
    { id: 3, date: "2023-03-10", description: "Dividend Earned", amount: 200.0 },
  ];

  const investmentAccounts = [
    { id: 1, type: "Mutual Fund", number: "****5678", balance: 10000.0 },
    { id: 2, type: "Stocks", number: "****1234", balance: 15000.0 },
    { id: 3, type: "Investment Account", number: "****7890", balance: 25000.0 },
  ];

  const totalInvestments = investmentAccounts
    .filter((acc) => acc.type !== "Investment Account")
    .reduce((sum, acc) => sum + acc.balance, 0);

  const mainInvestmentAccount = investmentAccounts.find(acc => acc.type === "Investment Account");
  if (mainInvestmentAccount) {
    mainInvestmentAccount.balance = totalInvestments;
  }

  const handleTransferClick = (account) => {
    setSelectedAccount(account);
    setTransferAmount("");
    setTransferModalOpen(true);
  };

  const handleTransferSubmit = (e) => {
    e.preventDefault();
    console.log(`Transferred $${transferAmount} to ${selectedAccount.type}`);
    setTransferModalOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      {/* Overview */}
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-rose-600">Your Investment Overview</h2>
      <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow mb-6">
        <h5 className="text-base sm:text-lg font-semibold text-rose-600 mb-1">Total Investment Balance</h5>
        <p className="text-xl sm:text-2xl font-bold text-rose-600">
          ${totalInvestments.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </p>
      </div>

      {/* Investment Breakdown */}
      <h4 className="text-lg sm:text-xl font-semibold text-rose-600 mb-3">Investment Breakdown</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {investmentAccounts
          .filter((account) => account.type !== "Investment Account")
          .map((account) => (
            <div key={account.id} className="bg-rose-600 text-white p-4 rounded-lg shadow">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1 sm:gap-0">
                <h5 className="text-lg font-bold">{account.type}</h5>
                <span className="text-sm">{account.number}</span>
              </div>
              <p className="text-xl font-bold">
                ${account.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </p>
              <div className="flex flex-col sm:flex-row gap-2 mt-4">
                <button
                  className="border border-white text-white rounded-full px-3 py-1 text-sm hover:bg-white hover:text-rose-600 transition"
                  onClick={() => handleTransferClick(account)}
                >
                  Add Funds
                </button>
                <button className="border border-white text-white rounded-full px-3 py-1 text-sm hover:bg-white hover:text-rose-600 transition">
                  Details
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Tips */}
      <div className="mt-8">
        <h4 className="text-lg sm:text-xl font-semibold text-rose-600 mb-3">Investment Tips</h4>
        <ul className="space-y-2 bg-white p-4 sm:p-6 rounded-lg shadow text-sm sm:text-base">
          <li>
            <strong>Diversify:</strong> Spread your investments across different asset classes to reduce risk.
          </li>
          <li>
            <strong>Invest Regularly:</strong> Make consistent contributions to your investment accounts.
          </li>
          <li>
            <strong>Monitor Performance:</strong> Regularly review your portfolio to ensure it aligns with your goals.
          </li>
          <li>
            <strong>Stay Informed:</strong> Keep up with market trends and news to make informed decisions.
          </li>
        </ul>
      </div>

      {/* Transactions */}
      <div className="mt-8">
        <h4 className="text-lg sm:text-xl font-semibold text-rose-600 mb-3">Recent Transactions</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow text-sm">
            <thead>
              <tr className="text-left text-rose-600 border-b">
                <th className="p-3">Date</th>
                <th className="p-3">Description</th>
                <th className="p-3">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((tx) => (
                <tr key={tx.id} className="border-t hover:bg-gray-100">
                  <td className="p-3">{tx.date}</td>
                  <td className="p-3">{tx.description}</td>
                  <td className="p-3">${tx.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isTransferModalOpen}
        onClose={() => setTransferModalOpen(false)}
        title={`Transfer to ${selectedAccount?.type}`}
      >
        <form onSubmit={handleTransferSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-rose-600 mb-1">Amount to Transfer</label>
            <input
              type="number"
              placeholder="e.g. 200.00"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
              min="0"
              max={checkingBalance}
              step="0.01"
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-rose-600"
            />
            <p className="text-sm text-gray-500 mt-1">
              Available from checking: ${checkingBalance.toFixed(2)}
            </p>
          </div>
          <button
            type="submit"
            className="w-full bg-rose-600 text-white py-2 rounded hover:bg-rose-700 transition"
          >
            Transfer Funds
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Investments;
