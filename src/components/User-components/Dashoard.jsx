// src/pages/Dashboard.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Modal from "../../components/Modal/Modal";
import LocalTransfer from "../Forms/LocalTransferForm";
import InternationalTransfer from "../Forms/InternationTransfer";
import PayBills from "../Forms/PayBills";
import TransactionHistoryTable from "./TransactionHistoryTable";

import {
  FaExchangeAlt,
  FaFileInvoice,
  FaMobileAlt,
  FaChartLine,
  FaUserCircle,
  FaSearch,
  FaMoneyCheckAlt,
  FaGlobeAmericas,
} from "react-icons/fa";
import { FiEye } from "react-icons/fi";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModal, setActiveModal] = useState(null);
  const [username, setUsername] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [greeting, setGreeting] = useState("Good morning");

  const navigate = useNavigate();

  // Log out handler: clear jwtToken and redirect to login page
  const handleLogout = () => {
    localStorage.removeItem("jwtToken"); // ← remove the same key we read
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  // Fetch accounts from backend (GET /api/user/me)
  const fetchAccounts = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      console.error("[Dashboard] No JWT found. User is not authenticated.");
      return;
    }

    try {
      const res = await fetch("https://hsbc-online-backend.onrender.com/api/user/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // <<< include real JWT
        },
      });

      if (!res.ok) {
        const errData = await res.json();
        console.error("[Dashboard] Failed to fetch accounts:", errData.message || errData);
        return;
      }

      const data = await res.json();
      console.log("[Dashboard] Fetched accounts data:", data);

      // Username is always “김남준”
      setUsername("김남준");

      // The endpoint returns at least { accounts: [...] }
      setAccounts(data.accounts || []);
    } catch (err) {
      console.error("[Dashboard] Error fetching accounts:", err);
    }
  };

  useEffect(() => {
    fetchAccounts();

    // Determine Korean time and greeting
    const updateGreeting = () => {
      const now = new Date();
      // Convert current time to Korean Time (UTC+9)
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const koreaTime = new Date(utc + 9 * 60 * 60000);
      const hour = koreaTime.getHours();

      if (hour >= 5 && hour < 12) {
        setGreeting("Good morning");
      } else if (hour >= 12 && hour < 17) {
        setGreeting("Good afternoon");
      } else if (hour >= 17 && hour < 21) {
        setGreeting("Good evening");
      } else {
        setGreeting("Good night");
      }
    };

    updateGreeting();
    const interval = setInterval(updateGreeting, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Fetch transactions from backend (GET /api/transfers/all)
    const fetchTransactions = async () => {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        console.error("[Dashboard] No JWT found. Cannot fetch transactions.");
        return;
      }

      try {
        const res = await fetch("https://hsbc-online-backend.onrender.com/api/transfers/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // <<< include real JWT
          },
        });

        if (!res.ok) {
          const errData = await res.json();
          console.error("[Dashboard] Failed to fetch transactions:", errData.message || errData);
          return;
        }

        const data = await res.json();
        if (!Array.isArray(data)) {
          console.error("[Dashboard] API did not return an array:", data);
          return;
        }

        // Show only the 3 most recent transactions
        const lastThree = data
          .sort((a, b) => new Date(b.transferDate) - new Date(a.transferDate))
          .slice(0, 3);

        setTransactions(lastThree);
        setFilteredTransactions(lastThree);
      } catch (err) {
        console.error("[Dashboard] Error fetching transactions:", err);
      }
    };

    fetchTransactions();
  }, []);

  // Update search logic to always filter from the last three
  useEffect(() => {
    const filtered = transactions.filter((t) =>
      [t.recipientName, t.recipientBank, t.currency]
        .join(" ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
    setFilteredTransactions(filtered);
  }, [searchQuery, transactions]);

  // Calculate total balance
  const totalBalance = accounts.reduce((sum, a) => sum + (a.balance || 0), 0);

  const quickActions = [
    {
      id: 1,
      name: "Send Money",
      icon: <FaExchangeAlt className="text-xl text-blue-600" />,
      content: (
        <div className="text-center space-y-4">
          <h6 className="text-lg font-semibold text-neutral-800">Choose Transfer</h6>
          <div className="flex justify-center gap-4 flex-wrap">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-4 rounded-2xl bg-white shadow-md cursor-pointer border border-gray-100"
              onClick={() => {
                setActiveModal(null);
                navigate("/user/local-transfer");
              }}
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <FaMoneyCheckAlt className="text-blue-600 text-xl" />
              </div>
              <span className="text-sm font-medium text-neutral-700">Local</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-4 rounded-2xl bg-white shadow-md cursor-pointer border border-gray-100"
              onClick={() => {
                setActiveModal(null);
                navigate("/user/international-transfer");
              }}
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <FaGlobeAmericas className="text-blue-600 text-xl" />
              </div>
              <span className="text-sm font-medium text-neutral-700">International</span>
            </motion.div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      name: "Pay Bills",
      icon: <FaFileInvoice className="text-xl text-blue-600" />,
      content: <PayBills />,
    },
    {
      id: 3,
      name: "E-Statement",
      icon: <FaMobileAlt className="text-xl text-blue-600" />,
      content: (
        <div className="space-y-4">
          <p className="text-neutral-600">
            Your e-statement will arrive in your registered email within 10 minutes.
          </p>
          <button
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-2xl hover:opacity-90"
            onClick={() => setActiveModal(null)}
          >
            Close
          </button>
        </div>
      ),
    },
    {
      id: 4,
      name: "Invest",
      icon: <FaChartLine className="text-xl text-blue-600" />,
      content: (
        <div className="space-y-4">
          <p className="text-neutral-600">
            Explore secure investment options to grow your wealth.
          </p>
          <button
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-2xl hover:opacity-90"
            onClick={() => setActiveModal("InvestDetails")}
          >
            Contact Advisor
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl sm:rounded-2xl shadow-sm sm:shadow-md p-4 sm:p-6 mb-6 flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-semibold text-neutral-800">
            {greeting}, {username}
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Here's what's happening with your money today
          </p>
        </div>

        {/* Profile Icon with Logout */}
        <button
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center shrink-0"
          onClick={handleLogout}
        >
          <FaUserCircle className="text-xl sm:text-2xl" />
        </button>
      </motion.div>

      {/* Account Overview */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-neutral-800">Account Overview</h2>
          <span className="text-xl sm:text-2xl font-bold text-blue-600">
            ${totalBalance.toLocaleString()}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {accounts.map((acct) => (
            <motion.div
              key={acct.number}
              whileHover={{ scale: 1.02 }}
              className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white shadow-md border border-gray-100"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-neutral-700">{acct.type} Account</h3>
                <FiEye className="text-neutral-400" />
              </div>
              <p className="text-2xl font-bold text-blue-600">
                ${acct.balance.toLocaleString()}
              </p>
              <p className="text-sm text-neutral-500 mt-1">Account No: {acct.number}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-bold text-neutral-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {quickActions.map(({ id, name, icon }) => (
            <motion.div
              key={id}
              whileHover={{ scale: 1.05 }}
              className="p-4 rounded-2xl bg-white shadow-md cursor-pointer border border-gray-100"
              onClick={() => setActiveModal(id)}
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                {icon}
              </div>
              <span className="text-sm font-medium text-neutral-700">{name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Transaction History Search */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-3 mb-4">
          <FaSearch className="text-neutral-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full rounded-xl border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <TransactionHistoryTable transactions={filteredTransactions} />
      </div>

      {/* Modals */}
      {activeModal === 1 && (
        <Modal isOpen={true} onClose={() => setActiveModal(null)} title="Send Money">
          <div className="text-center space-y-4">
            <h6 className="text-lg font-semibold text-neutral-800">Choose Transfer</h6>
            <div className="flex justify-center gap-4 flex-wrap">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 rounded-2xl bg-white shadow-md cursor-pointer border border-gray-100"
                onClick={() => {
                  setActiveModal(null);
                  navigate("/user/local-transfer");
                }}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <FaMoneyCheckAlt className="text-blue-600 text-xl" />
                </div>
                <span className="text-sm font-medium text-neutral-700">Local</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 rounded-2xl bg-white shadow-md cursor-pointer border border-gray-100"
                onClick={() => {
                  setActiveModal(null);
                  navigate("/user/international-transfer");
                }}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <FaGlobeAmericas className="text-blue-600 text-xl" />
                </div>
                <span className="text-sm font-medium text-neutral-700">International</span>
              </motion.div>
            </div>
          </div>
        </Modal>
      )}
      {activeModal === 2 && (
        <Modal isOpen={true} onClose={() => setActiveModal(null)} title="Pay Bills">
          <PayBills />
        </Modal>
      )}
      {activeModal === 3 && (
        <Modal isOpen={true} onClose={() => setActiveModal(null)} title="E-Statement">
          <div className="space-y-4">
            <p className="text-neutral-600">
              Your e-statement will arrive in your registered email within 10 minutes.
            </p>
            <button
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-2xl hover:opacity-90"
              onClick={() => setActiveModal(null)}
            >
              Close
            </button>
          </div>
        </Modal>
      )}
      {activeModal === 4 && (
        <Modal isOpen={true} onClose={() => setActiveModal(null)} title="Invest">
          <div className="p-4 text-center">Contact your financial advisor for investment details.</div>
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;
