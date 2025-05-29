import React, { useState } from "react";
import Modal from "../../components/Modal/Modal";

const Savings = () => {
  const [isTransferModalOpen, setTransferModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [transferAmount, setTransferAmount] = useState("");

  const checkingBalance = 3500.0;

  const recentTransactions = [
    // { id: 1, date: "2023-03-01", description: "Transfer to Emergency Fund", amount: 200.0 },
    // { id: 2, date: "2023-03-05", description: "Transfer to Vacation Fund", amount: 150.0 },
    // { id: 3, date: "2023-03-10", description: "Interest Earned", amount: 50.0 },
  ];

  const savingsAccounts = [
    { id: 1, type: "Emergency Fund", number: "****1234", balance: 500.0 },
    { id: 2, type: "Vacation Fund", number: "****9876", balance: 300.0 },
    { id: 3, type: "Savings Account", number: "****7890", balance: 10000.5 },
  ];

  const totalFunds = savingsAccounts
    .filter((account) => account.type !== "Savings Account")
    .reduce((sum, account) => sum + account.balance, 0);

  const mainSavingsAccount = savingsAccounts.find((account) => account.type === "Savings Account");
  if (mainSavingsAccount) {
    mainSavingsAccount.balance = totalFunds;
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
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Savings Overview */}
      <h2 className="text-2xl font-semibold text-rose-700 mb-4">Your Savings Overview</h2>
      <div className="bg-rose-100 rounded-lg p-6 shadow mb-8">
        <h5 className="text-lg text-rose-700 font-medium mb-2">Total Savings Balance</h5>
        <p className="text-3xl font-bold text-rose-700">
          ${totalFunds.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
      </div>

      {/* Funds Breakdown */}
      <h4 className="text-xl text-rose-700 font-semibold mb-4">Funds Breakdown</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {savingsAccounts
          .filter((account) => account.type !== "Savings Account")
          .map((account) => (
            <div key={account.id} className="bg-rose-500 text-white rounded-lg p-5 shadow-md">
              <div className="flex justify-between items-center mb-2">
                <h5 className="text-lg font-semibold">{account.type}</h5>
                <span className="text-sm">{account.number}</span>
              </div>
              <p className="text-2xl font-bold">
                ${account.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </p>
              <div className="flex gap-3 mt-4">
                <button
                  className="bg-white text-rose-700 hover:bg-rose-100 px-4 py-1 text-sm font-medium rounded-full"
                  onClick={() => handleTransferClick(account)}
                >
                  Add Funds
                </button>
                <button className="bg-white text-rose-700 hover:bg-rose-100 px-4 py-1 text-sm font-medium rounded-full">
                  Details
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Savings Tips */}
      <div className="mt-10">
        <h4 className="text-xl text-rose-700 font-semibold mb-4">Savings Tips</h4>
        <ul className="list-disc list-inside space-y-2 bg-white p-5 rounded-lg shadow">
          <li><strong>Set Goals:</strong> Define clear savings goals to stay motivated.</li>
          <li><strong>Automate Savings:</strong> Set up automatic transfers to your savings accounts.</li>
          <li><strong>Track Expenses:</strong> Monitor your spending to identify areas where you can save.</li>
          <li><strong>Build an Emergency Fund:</strong> Save at least 3-6 months' worth of expenses for emergencies.</li>
        </ul>
      </div>

      {/* Recent Transactions */}
      <div className="mt-10">
        <h4 className="text-xl text-rose-700 font-semibold mb-4">Recent Transactions</h4>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-rose-100 text-rose-700">
              <tr>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-700">
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-t">
                  <td className="p-3">{transaction.date}</td>
                  <td className="p-3">{transaction.description}</td>
                  <td className="p-3">${transaction.amount.toFixed(2)}</td>
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
        <form onSubmit={handleTransferSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-rose-700 mb-1">
              Amount to Transfer
            </label>
            <input
              type="number"
              className="w-full border border-rose-300 rounded px-3 py-2"
              placeholder="e.g. 200.00"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
              min="0"
              max={checkingBalance}
              step="0.01"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Available from checking: ${checkingBalance.toFixed(2)}
            </p>
          </div>
          <button
            type="submit"
            className="w-full bg-rose-700 text-white py-2 rounded hover:bg-rose-800 transition"
          >
            Transfer Funds
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Savings;
