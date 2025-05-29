import React, { useState, useEffect, useMemo } from "react";
import { FiChevronDown, FiChevronUp, FiSearch } from "react-icons/fi";

const CollapseTransition = ({ children, isOpen }) => (
  <div
    className={`grid transition-all duration-300 ease-in-out overflow-hidden ${
      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
    }`}
  >
    <div className="min-h-0">{children}</div>
  </div>
);

const TransactionSection = ({ title, children }) => (
  <div className="space-y-4">
    <h2 className="text-2xl sm:text-3xl font-bold text-rose-800">{title}</h2>
    {children}
  </div>
);

const TransactionTable = ({ transactions, showBalance = false }) => (
  <div className="overflow-x-auto rounded-lg shadow-sm">
    <table className="min-w-full">
      <thead className="bg-rose-100">
        <tr>
          {["Date", "Description", "Amount", "Type", ...(showBalance ? ["Balance"] : [])].map(
            (header) => (
              <th
                key={header}
                className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-rose-800"
              >
                {header}
              </th>
            )
          )}
        </tr>
      </thead>
      <tbody className="divide-y divide-rose-200">
        {transactions.map((transaction) => (
          <tr
            key={`${transaction.date}-${transaction.balance || transaction.amount}-${transaction.description}`}
            className="hover:bg-rose-50 transition-colors"
          >
            <td className="px-4 py-3 text-xs sm:text-sm text-rose-700">{transaction.date}</td>
            <td className="px-4 py-3 text-xs sm:text-sm text-rose-600">{transaction.description}</td>
            <td className="px-4 py-3 text-xs sm:text-sm text-right font-medium text-green-600">
              {transaction.amount}
            </td>
            <td className="px-4 py-3 text-right">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-200 text-rose-800">
                {transaction.type}
              </span>
            </td>
            {showBalance && (
              <td className="px-4 py-3 text-xs sm:text-sm text-right font-medium text-purple-600">
                {transaction.balance}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Transactions = () => {
  const [transactionsByYear, setTransactionsByYear] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedYears, setExpandedYears] = useState(new Set());
  const [expandedMonths, setExpandedMonths] = useState(new Set());
  const [activeTab, setActiveTab] = useState("recent");

  const bankChargeAmount = 5; // $5 bank charge per transaction

  const allTransactions = useMemo(() => {
    const startDate = new Date("2022-03-01");
    const endDate = new Date();
    const transactions = [];
    let balance = 2000;
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const day = currentDate.getDay();
      if (day !== 0 && day !== 6) {
        // Daily income
        balance += 3000;
        const date = new Date(currentDate);
        const formattedDate = date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        transactions.push({
          date: formattedDate,
          description: "Daily Business Income",
          amount: "+$3,000.00",
          type: "Credit",
          balance: balance.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          }),
          rawDate: date.toISOString().split("T")[0],
          year: date.getFullYear().toString(),
          month: date.toLocaleString("default", { month: "long" }),
          day: date.getDate().toString(),
          timestamp: date.getTime(),
        });

        // Bank charge transaction (deduct)
        balance -= bankChargeAmount;
        transactions.push({
          date: formattedDate,
          description: "Bank Charges",
          amount: `-$${bankChargeAmount.toFixed(2)}`,
          type: "Charge",
          balance: balance.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          }),
          rawDate: date.toISOString().split("T")[0],
          year: date.getFullYear().toString(),
          month: date.toLocaleString("default", { month: "long" }),
          day: date.getDate().toString(),
          timestamp: date.getTime() + 1, // slightly after income to keep order
        });
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return transactions.reverse();
  }, []);

  useEffect(() => {
    const yearlyData = {};
    allTransactions.forEach((txn) => {
      const { year, month } = txn;
      if (!yearlyData[year]) yearlyData[year] = {};
      if (!yearlyData[year][month]) yearlyData[year][month] = [];
      yearlyData[year][month].push(txn);
    });

    setTransactionsByYear(yearlyData);

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear().toString();
    const currentMonth = currentDate.toLocaleString("default", { month: "long" });
    setExpandedYears(new Set([currentYear]));
    setExpandedMonths(new Set([`${currentYear}-${currentMonth}`]));
  }, [allTransactions]);

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return transactionsByYear;

    const lowerQuery = searchQuery.toLowerCase().trim();
    const parts = lowerQuery.split(/\s+|[-/]/);
    const filtered = {};

    for (const [year, months] of Object.entries(transactionsByYear)) {
      for (const [month, txns] of Object.entries(months)) {
        const matches = txns.filter((txn) => {
          const combinedFields = [
            txn.rawDate,
            txn.description.toLowerCase(),
            txn.amount.toLowerCase(),
            txn.type.toLowerCase(),
            txn.year,
            txn.month.toLowerCase(),
            txn.day,
          ];
          return parts.every((part) => combinedFields.some((field) => field.includes(part)));
        });

        if (matches.length) {
          if (!filtered[year]) filtered[year] = {};
          filtered[year][month] = matches;
        }
      }
    }

    return filtered;
  }, [searchQuery, transactionsByYear]);

  const recentTransactions = useMemo(() => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return allTransactions.filter(txn => new Date(txn.rawDate) >= thirtyDaysAgo).reverse();
  }, [allTransactions]);

  const accountStatement = useMemo(() => {
    const statement = [];
    let runningBalance = 2000;

    statement.push({
      date: "March 1, 2022",
      description: "Opening Balance",
      amount: "$2,000.00",
      type: "Initial",
      balance: "$2,000.00",
      rawDate: "2022-03-01",
    });

    recentTransactions.forEach(txn => {
      // Recalculate balance with income and charges
      if (txn.type === "Credit") {
        runningBalance += 3000;
      } else if (txn.type === "Charge") {
        runningBalance -= bankChargeAmount;
      }
      statement.push({
        ...txn,
        balance: runningBalance.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        }),
      });
    });

    return statement;
  }, [recentTransactions]);

  const toggleYear = (year) => {
    setExpandedYears((prev) =>
      new Set(prev.has(year) ? [...prev].filter((y) => y !== year) : [...prev, year])
    );
  };

  const toggleMonth = (monthKey) => {
    setExpandedMonths((prev) =>
      new Set(prev.has(monthKey) ? [...prev].filter((m) => m !== monthKey) : [...prev, monthKey])
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-12 bg-white">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-rose-800 mb-2">Transaction History</h1>
        <p className="text-sm sm:text-base text-rose-600 mb-6">Monitor your financial activity in real time</p>

        <div className="relative max-w-md mx-auto">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-rose-400" />
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 text-sm sm:text-base border border-rose-300 rounded-lg shadow-sm focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
            placeholder="Search transactions by date, type or amount"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {["recent", "statement", "history"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm sm:text-base rounded-lg font-medium transition-colors ${
              activeTab === tab
                ? "bg-rose-500 text-white"
                : "bg-rose-100 text-rose-800 hover:bg-rose-200"
            }`}
          >
            {tab === "recent" ? "Recent Transactions" : tab === "statement" ? "Account Statement" : "Full History"}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "recent" && (
        <TransactionSection title="🔄 Recent Transactions (Last 30 Days)">
          <div className="bg-white rounded-lg shadow-md p-4">
            <TransactionTable transactions={recentTransactions} />
          </div>
        </TransactionSection>
      )}

      {activeTab === "statement" && (
        <TransactionSection title="📄 Account Statement">
          <div className="bg-white rounded-lg shadow-md p-4">
            <TransactionTable transactions={accountStatement} showBalance={true} />
          </div>
        </TransactionSection>
      )}

      {activeTab === "history" && (
        <TransactionSection title="📚 Full Transaction History">
          <div className="space-y-4">
            {Object.entries(filteredData).map(([year, months]) => (
              <div key={year}>
                <button
                  className="w-full text-left text-base sm:text-lg font-semibold text-rose-700 hover:text-rose-900 flex justify-between items-center border-b border-rose-300 pb-1"
                  onClick={() => toggleYear(year)}
                >
                  {year}
                  {expandedYears.has(year) ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                <CollapseTransition isOpen={expandedYears.has(year)}>
                  <div className="pl-4 mt-2 space-y-3">
                    {Object.entries(months).map(([month, txns]) => {
                      const monthKey = `${year}-${month}`;
                      return (
                        <div key={month}>
                          <button
                            className="w-full text-left font-medium text-rose-600 hover:text-rose-800 flex justify-between items-center border-b border-rose-200 pb-0.5"
                            onClick={() => toggleMonth(monthKey)}
                          >
                            {month}
                            {expandedMonths.has(monthKey) ? <FiChevronUp /> : <FiChevronDown />}
                          </button>
                          <CollapseTransition isOpen={expandedMonths.has(monthKey)}>
                            <div className="mt-1">
                              <TransactionTable transactions={txns} />
                            </div>
                          </CollapseTransition>
                        </div>
                      );
                    })}
                  </div>
                </CollapseTransition>
              </div>
            ))}
          </div>
        </TransactionSection>
      )}
    </div>
  );
};

export default Transactions;
