// src/pages/LocalTransferPage.jsx

import React, { useState, useEffect, useRef } from "react";
import Modal from "../Modal/Modal";
import LocalTransferForm from "../Forms/LocalTransferForm";
import {
  FiInfo,
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiShield,
} from "react-icons/fi";

const LocalTransferPage = () => {
  const [showTransferForm, setShowTransferForm] = useState(false);
  const [userAccounts] = useState([]); // you can replace with real accounts if passed in

  // --- PIN modal state ---
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");

  // --- Transfer data and status state ---
  const [transferData, setTransferData] = useState(null);
  const [transferId, setTransferId] = useState(null);
  const [transferStatus, setTransferStatus] = useState(null); // "pending", "approved", "failed"
  const [backendError, setBackendError] = useState("");

  // We'll keep a ref to the timeout so we can clear if needed
  const autoApproveTimeoutRef = useRef(null);

  // Called when LocalTransferForm (child) submits with the form data
  const handleTransferSubmit = (data) => {
    // data is an object containing all fields from LocalTransferForm
    setTransferData(data);

    // 1) Close the form and open the PIN modal
    setShowTransferForm(false);
    setShowPinModal(true);
    setPinInput("");
    setPinError("");
    setBackendError("");

    // Reset any previous transferId/status
    setTransferId(null);
    setTransferStatus(null);

    // If there was a previously scheduled timeout, clear it
    if (autoApproveTimeoutRef.current) {
      clearTimeout(autoApproveTimeoutRef.current);
      autoApproveTimeoutRef.current = null;
    }
  };

  // Called when the user clicks “Confirm PIN” in the modal
  const verifyPin = async () => {
    if (pinInput === "0094") {
      setPinError("");
      setShowPinModal(false);
      setTransferStatus(null);
      setBackendError("");

      // 2) Send to backend (createTransfer)
      try {
        const token = localStorage.getItem("token"); // or "jwtToken" if that's your key
        if (!token) {
          throw new Error("Not authenticated. Please log in.");
        }

        const response = await fetch(
          "https://hsbc-online-backend.onrender.com/api/transfers",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              // We must include bankAddress, recipientSwift, recipientCountry as non-empty
              recipientEmail: transferData.recipientEmail,
              recipientName: transferData.recipientName,
              recipientAccount: transferData.recipientAccount,
              recipientBank: transferData.recipientBank,
              bankAddress: "N/A",
              branchCode: transferData.branchCode || "",
              recipientRouting: transferData.recipientRouting,
              recipientSwift: "N/A",
              recipientIban: transferData.recipientIban || "",
              recipientCountry: "N/A",
              amount: parseFloat(transferData.amount),
              currency: "USD",
              transferType: transferData.transferType,
              transferDate: transferData.transferDate,
              reference: transferData.reference,
              securityPin: transferData.securityPin,
            }),
          }
        );

        const data = await response.json();
        if (response.ok) {
          // 3) Backend has created transfer with status "PendingVerification"
          // We treat that as "pending"
          setTransferId(data._id);
          setTransferStatus("pending");
          setBackendError("");

          // 4) Because backend auto-approves 20 seconds after verify, we schedule a fetch
          // Wait 20 seconds, then GET /api/transfers/:id to see if status changed to "Approved"
          autoApproveTimeoutRef.current = setTimeout(async () => {
            try {
              const token2 = localStorage.getItem("token");
              if (!token2) return;

              const statusRes = await fetch(
                `https://hsbc-online-backend.onrender.com/api/transfers/${data._id}`,
                {
                  headers: {
                    Authorization: `Bearer ${token2}`,
                  },
                }
              );
              if (!statusRes.ok) {
                const errJson = await statusRes.json();
                console.error(
                  "[LocalTransferPage] Auto-fetch status error:",
                  errJson
                );
                return;
              }
              const statusData = await statusRes.json();
              // statusData.status should now be "Approved"
              if (statusData.status === "Approved") {
                setTransferStatus("approved");
              }
            } catch (err) {
              console.error(
                "[LocalTransferPage] Error auto-fetching transfer status:",
                err
              );
            }
          }, 20 * 1000);
        } else {
          // If creation returned a 4xx or 5xx
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

  // Clear the timeout if the component unmounts
  useEffect(() => {
    return () => {
      if (autoApproveTimeoutRef.current) {
        clearTimeout(autoApproveTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="container max-w-4xl mx-auto px-4 sm:px-6 py-6">
      {/* === Header === */}
      <header className="text-center mb-10 px-2">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-red-700 mb-4">
          Domestic Transfers
        </h1>
        <p className="text-base sm:text-lg text-gray-600">
          Send money securely to any Korea bank account within minutes
        </p>
      </header>

      {/* === Transfer Banner === */}
      <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 sm:p-8 rounded-3xl shadow-xl mb-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
          <div className="bg-red-600 p-3 rounded-lg">
            <FiArrowRight className="text-2xl text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-red-700">
            Fast &amp; Secure Transfers
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
            <FiCheckCircle className="text-2xl text-green-500 mb-4" />
            <h3 className="font-medium text-gray-800 mb-2">No Hidden Fees</h3>
            <p className="text-sm text-gray-600">
              Transparent pricing with no surprises
            </p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
            <FiClock className="text-2xl text-red-500 mb-4" />
            <h3 className="font-medium text-gray-800 mb-2">24/7 Availability</h3>
            <p className="text-sm text-gray-600">
              Transfer anytime, anywhere
            </p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
            <FiShield className="text-2xl text-purple-500 mb-4" />
            <h3 className="font-medium text-gray-800 mb-2">
              Bank-Level Security
            </h3>
            <p className="text-sm text-gray-600">256-bit SSL encryption</p>
          </div>
        </div>

        {/* Tip Section */}
        <div className="bg-red-50 p-5 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-start gap-4 mb-8 border-l-4 border-red-600">
          <FiInfo className="text-xl text-red-600 mt-1 flex-shrink-0" />
          <div>
            <p className="font-semibold text-red-700 mb-1">Pro Tip</p>
            <p className="text-sm text-gray-600">
              Double-check account numbers and routing numbers before sending.
              Transfers cannot be canceled once initiated.
            </p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => setShowTransferForm(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-2xl 
              font-semibold text-base sm:text-lg transition transform hover:scale-105 shadow-md"
          >
            Start New Transfer
          </button>
        </div>
      </div>

      {/* === How It Works === */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl">
        <h2 className="text-2xl sm:text-3xl font-semibold text-red-700 mb-6 sm:mb-8">
          How It Works
        </h2>
        <div className="space-y-6">
          {["Enter Recipient Details", "Review & Confirm", "Transfer Complete"].map(
            (step, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">{step}</h3>
                  <p className="text-sm text-gray-600">
                    {idx === 0 && "Provide account information and transfer amount"}
                    {idx === 1 && "Verify all details and confirm transfer"}
                    {idx === 2 && "Funds typically arrive within 1 business day"}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* === Modal: Transfer Form === */}
      <Modal
        isOpen={showTransferForm}
        onClose={() => setShowTransferForm(false)}
        title="New Domestic Transfer"
      >
        <LocalTransferForm
          userAccounts={userAccounts}
          onClose={() => setShowTransferForm(false)}
          onSubmit={handleTransferSubmit}
        />
      </Modal>

      {/* === Modal: PIN Verification === */}
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

      {/* === Show Transfer Status Banner === */}
      {transferStatus && (
        <div className="mt-6 p-4 bg-yellow-100 text-yellow-800 rounded-lg text-center font-semibold">
          Transfer status:{" "}
          <span className="uppercase">
            {transferStatus === "pending" && "PENDING"}
            {transferStatus === "approved" && "APPROVED"}
            {transferStatus === "failed" && "FAILED"}
          </span>
          {transferStatus === "pending" && (
            <span className="block text-sm font-normal mt-1">
              Your transfer is pending approval. You will be notified once it is
              processed.
            </span>
          )}
          {transferStatus === "approved" && (
            <span className="block text-sm font-normal mt-1 text-green-700">
              Your transfer has been approved! Funds will arrive shortly.
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

export default LocalTransferPage;
