import React, { useState } from "react";
import Modal from "../Modal/Modal";
import InternationalTransferForm from "../Forms/InternationTransfer";
import {
  FiGlobe,
  FiShield,
  FiClock,
  FiAlertTriangle,
  FiArrowRight,
} from "react-icons/fi";

const InternationalTransfer = ({ userAccounts, loading, error }) => {
  const [showTransferForm, setShowTransferForm] = useState(false);

  // Step modals
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);

  // Form submission data
  const [transferData, setTransferData] = useState(null);

  // Email input state for verification
  const [emailInput, setEmailInput] = useState("");
  const [emailError, setEmailError] = useState("");

  // PIN input state
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");

  // Transfer status state
  const [transferStatus, setTransferStatus] = useState(null);

  // Backend error state
  const [backendError, setBackendError] = useState("");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 bg-red-50 p-8 rounded-xl">
        <FiAlertTriangle className="mr-2" /> Error: {error}
      </div>
    );
  }

  // Called when transfer form submits
  const handleTransferSubmit = (data) => {
    setTransferData(data);
    setShowTransferForm(false);
    setShowEmailModal(true);
    setEmailInput("");
    setEmailError("");
    setBackendError("");
  };

  // Simple email format check (basic)
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  // Handle email verification confirm
  const verifyEmail = () => {
    if (!validateEmail(emailInput)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    setShowEmailModal(false);
    setShowPinModal(true);
    setPinInput("");
    setPinError("");
  };

  // Handle PIN verification confirm and send to backend
  const verifyPin = async () => {
    if (pinInput === "0994") {
      setPinError("");
      setShowPinModal(false);
      setTransferStatus(null);
      setBackendError("");
      // Send to backend
      try {
        const token = localStorage.getItem("token"); // Adjust if you store token elsewhere
        const response = await fetch(
          "https://hsbc-backend-rc6o.onrender.com/api/transfer/international",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              ...transferData,
              email: emailInput,
            }),
          }
        );
        const data = await response.json();
        if (response.ok) {
          setTransferStatus("pending");
        } else {
          setTransferStatus("failed");
          setBackendError(data.message || "Transfer failed.");
        }
      } catch (err) {
        setTransferStatus("failed");
        setBackendError("Network error. Please try again.");
      }
    } else {
      setPinError("Incorrect PIN. Please try again.");
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <header className="text-center mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-700 mb-4">
          Global Money Transfers
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Send money worldwide instantly with competitive exchange rates and low fees
        </p>
      </header>

      <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl shadow-lg mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-8">
          <div className="bg-white p-6 rounded-xl border border-gray-100">
            <FiGlobe className="text-3xl text-red-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">150+ Countries</h3>
            <p className="text-gray-600 text-sm">Send to major banks worldwide</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100">
            <FiShield className="text-3xl text-red-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Secure Transactions</h3>
            <p className="text-gray-600 text-sm">Bank-level encryption & compliance</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100">
            <FiClock className="text-3xl text-red-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Fast Processing</h3>
            <p className="text-gray-600 text-sm">1-3 business day transfers</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 mb-8">
          <h4 className="font-medium text-red-700 mb-4">Supported Currencies</h4>
          <div className="flex flex-wrap gap-3">
            {["USD", "EUR", "GBP", "CAD", "AUD", "JPY", "CNY", "INR"].map(
              (currency) => (
                <span
                  key={currency}
                  className="px-3 py-1 bg-gray-50 rounded-full text-sm"
                >
                  {currency}
                </span>
              )
            )}
          </div>
        </div>

        <div className="bg-red-50 p-6 rounded-xl flex items-start gap-4">
          <FiAlertTriangle className="text-2xl text-red-600 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-red-700 mb-2">Important Notice</h4>
            <p className="text-sm text-red-700">
              Ensure recipient details include full name, IBAN/SWIFT codes, and
              bank address. Incorrect information may result in transfer delays or
              additional fees.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center my-8 sm:my-12">
        <button
          onClick={() => setShowTransferForm(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-12 py-4 rounded-xl
                     text-lg font-medium transition-all transform hover:scale-105
                     shadow-lg hover:shadow-xl flex items-center mx-auto"
        >
          Start New Transfer
          <FiArrowRight className="ml-3" />
        </button>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-red-700 mb-8">
          Process Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              title: "Select Country",
              desc: "Choose recipient's country and bank",
            },
            { title: "Enter Details", desc: "IBAN/SWIFT codes and amount" },
            {
              title: "Review Fees",
              desc: "See exchange rate & transfer fees",
            },
            { title: "Confirm & Send", desc: "Authorize with 2FA security" },
          ].map((step, index) => (
            <div key={step.title} className="text-center">
              <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                {index + 1}
              </div>
              <h3 className="font-medium mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-red-50 p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-red-700 mb-4">
          Fees & Limits
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Transfer Fee</span>
              <span className="font-medium">0.8% + $10</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Minimum Amount</span>
              <span className="font-medium">$100</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Daily Limit</span>
              <span className="font-medium">$25,000</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Exchange Margin</span>
              <span className="font-medium">1.2%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Transfer form modal with onSubmit prop */}
      <Modal
        isOpen={showTransferForm}
        onClose={() => setShowTransferForm(false)}
        title="International Transfer"
        size="xl"
      >
        <InternationalTransferForm
          userAccounts={userAccounts}
          onClose={() => setShowTransferForm(false)}
          onSubmit={handleTransferSubmit}
        />
      </Modal>

      {/* Email verification modal */}
      <Modal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        title="Email Verification"
        size="sm"
      >
        <div className="flex flex-col items-center gap-4">
          <p>Please enter your email address to verify your identity:</p>
          <input
            type="email"
            className="border border-gray-300 rounded p-2 w-full"
            placeholder="you@example.com"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          />
          {emailError && (
            <p className="text-red-600 text-sm">{emailError}</p>
          )}
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded mt-2"
            onClick={verifyEmail}
          >
            Verify Email
          </button>
        </div>
      </Modal>

      {/* PIN verification modal */}
      <Modal
        isOpen={showPinModal}
        onClose={() => setShowPinModal(false)}
        title="PIN Verification"
        size="sm"
      >
        <div className="flex flex-col items-center gap-4">
          <p>Enter your 4-digit security PIN:</p>
          <input
            type="password"
            maxLength={4}
            className="border border-gray-300 rounded p-2 w-full text-center text-xl tracking-widest"
            value={pinInput}
            onChange={(e) => setPinInput(e.target.value)}
          />
          {pinError && <p className="text-red-600 text-sm">{pinError}</p>}
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded mt-2"
            onClick={verifyPin}
          >
            Confirm PIN
          </button>
        </div>
      </Modal>

      {/* Show transfer status if set */}
      {transferStatus && (
        <div className="mt-6 p-4 bg-yellow-100 text-yellow-800 rounded-lg text-center font-semibold">
          Transfer status: <span className="uppercase">{transferStatus}</span>
          {transferStatus === "pending" && (
            <span className="block text-sm font-normal mt-1">
              Your transfer is pending approval. You will be notified once it is processed.
            </span>
          )}
          {transferStatus === "failed" && backendError && (
            <span className="block text-sm font-normal mt-1 text-red-600">
              {backendError}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default InternationalTransfer;