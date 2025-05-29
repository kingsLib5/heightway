import React, { useState, useEffect } from "react";
import { FiUser, FiDollarSign, FiLock, FiCheckCircle, FiArrowLeft, FiArrowRight } from "react-icons/fi";

const LocalTransfer = ({ onClose, userAccounts, userEmail }) => {
  const [formData, setFormData] = useState({
    recipientName: "",
    recipientAccount: "",
    recipientBank: "",
    recipientRouting: "",
    amount: "",
    transferType: "Personal",
    transferDate: "",
    reference: "",
    securityPin: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [approvalStatus, setApprovalStatus] = useState("Pending");

  // For verification step
  const [showVerification, setShowVerification] = useState(false);
  const [transferId, setTransferId] = useState(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationError, setVerificationError] = useState("");

  // Set today's date on mount
  useEffect(() => {
    const currentDate = new Date().toISOString().slice(0, 10);
    setFormData((prev) => ({ ...prev, transferDate: currentDate }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateStep = () => {
    const errs = {};
    if (currentStep === 1) {
      if (!formData.recipientName) errs.recipientName = "Recipient's name is required.";
      if (!formData.recipientAccount) errs.recipientAccount = "Account number is required.";
      if (!formData.recipientBank) errs.recipientBank = "Bank name is required.";
      if (!formData.recipientRouting) errs.recipientRouting = "Routing number is required.";
    } else if (currentStep === 2) {
      if (!formData.amount) errs.amount = "Amount is required.";
    } else if (currentStep === 3) {
      if (!formData.securityPin) errs.securityPin = "Security PIN is required.";
      else if (formData.securityPin !== "0094") errs.securityPin = "Security PIN is incorrect.";
    }
    return errs;
  };

  const handleNext = () => {
    const stepErrs = validateStep();
    if (Object.keys(stepErrs).length) {
      setErrors(stepErrs);
    } else {
      setCurrentStep((s) => s + 1);
    }
  };

  const handlePrevious = () => setCurrentStep((s) => s - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const stepErrs = validateStep();
    if (Object.keys(stepErrs).length) {
      setErrors(stepErrs);
      return;
    }
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token"); // JWT from login
      // Use userEmail from props, context, or hardcode for now
      const email = "jamesphilips0480@gmail.com";
      const res = await fetch("http://localhost:5000/api/transfer/local", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          recipientAccount: formData.recipientAccount,
          recipientName: formData.recipientName,
          recipientBank: formData.recipientBank,
          recipientRouting: formData.recipientRouting,
          amount: formData.amount,
          transferType: formData.transferType,
          transferDate: formData.transferDate,
          reference: formData.reference,
          securityPin: formData.securityPin,
          email, // <-- send email for verification
        }),
      });

      let data;
      try {
        data = await res.json();
      } catch (jsonErr) {
        setErrors({ general: "Server returned invalid JSON." });
        setIsSubmitting(false);
        return;
      }

      if (!res.ok) {
        setErrors({ general: data.message || data.error || "Transfer failed." });
        setIsSubmitting(false);
        return;
      }

      // Show verification input
      setTransferId(data.transferId);
      setShowVerification(true);
      setIsSubmitting(false);
    } catch (err) {
      setErrors({ general: "Network error: " + err.message });
      setIsSubmitting(false);
    }
  };

  // Handle verification code submission
  const handleVerify = async () => {
    setIsSubmitting(true);
    setVerificationError("");
    try {
      const res = await fetch("http://localhost:5000/api/transfer/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transferId, code: verificationCode.trim() }),
      });
      const result = await res.json();
      if (!res.ok) {
        setVerificationError(result.message || "Verification failed.");
      } else {
        setApprovalStatus("Pending"); // You can set to "Approved" if your backend returns that status
        setIsSubmitted(true);
        setTimeout(onClose, 3000);
      }
    } catch (err) {
      setVerificationError("Network error: " + err.message);
    }
    setIsSubmitting(false);
  };

  const steps = [
    { id: 1, label: "Recipient", icon: <FiUser /> },
    { id: 2, label: "Amount", icon: <FiDollarSign /> },
    { id: 3, label: "Security", icon: <FiLock /> },
  ];

  return (
    <div className="p-6 max-w-xl mx-auto">
      {/* Loading */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-white/90 z-50 flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
          <p className="mt-4 text-red-600 font-medium">Processing transfer...</p>
        </div>
      )}

      {/* Success */}
      {isSubmitted && (
        <div className="text-center py-12">
          <FiCheckCircle className="mx-auto mb-4 text-green-500 text-5xl animate-pulse" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Transfer {approvalStatus === "Pending" ? "Pending" : "Approved"}!
          </h2>
          <p className="text-gray-600 mb-6">
            {approvalStatus === "Pending"
              ? "We’ll notify you once it’s complete."
              : "Funds will arrive within 1 business day."}
          </p>
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition"
          >
            Return
          </button>
        </div>
      )}

      {/* Verification Step */}
      {showVerification && !isSubmitted && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Verify Transfer</h2>
          <p className="text-gray-600 mb-4">
            Enter the verification code sent to your email to approve this transfer.
          </p>
          <input
            type="text"
            value={verificationCode}
            onChange={e => setVerificationCode(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Verification code"
          />
          {verificationError && <p className="text-red-500">{verificationError}</p>}
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
            onClick={handleVerify}
            disabled={isSubmitting}
          >
            Verify & Approve
          </button>
        </div>
      )}

      {/* Form */}
      {!isSubmitting && !isSubmitted && !showVerification && (
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Progress */}
          <div className="relative mb-8">
            <div className="absolute inset-y-5 left-0 right-0 h-1 bg-gray-200 rounded"></div>
            <div
              className="absolute inset-y-5 left-0 h-1 bg-red-600 rounded transition-all"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            />
            <div className="flex justify-between relative z-10">
              {steps.map((s) => (
                <div key={s.id} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 transition ${
                      currentStep >= s.id ? "bg-red-600 text-white" : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {s.icon}
                  </div>
                  <span
                    className={`text-sm ${
                      currentStep >= s.id ? "text-gray-800" : "text-gray-400"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Recipient */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-gray-700">Full Name</label>
                <input
                  name="recipientName"
                  value={formData.recipientName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.recipientName ? "border-red-500" : "border-gray-200"
                  } focus:outline-none focus:ring-2 focus:ring-red-500`}
                  placeholder="John Doe"
                />
                {errors.recipientName && (
                  <p className="text-red-500 text-sm mt-1">{errors.recipientName}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-gray-700">Account Number</label>
                  <input
                    name="recipientAccount"
                    value={formData.recipientAccount}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.recipientAccount ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-red-500`}
                    placeholder="1234567890"
                  />
                  {errors.recipientAccount && (
                    <p className="text-red-500 text-sm mt-1">{errors.recipientAccount}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-gray-700">Routing Number</label>
                  <input
                    name="recipientRouting"
                    value={formData.recipientRouting}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.recipientRouting ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-red-500`}
                    placeholder="021000021"
                  />
                  {errors.recipientRouting && (
                    <p className="text-red-500 text-sm mt-1">{errors.recipientRouting}</p>
                  )}
                </div>
              </div>
              {/* Bank Name input */}
              <div>
                <label className="block mb-2 text-gray-700">Bank Name</label>
                <input
                  name="recipientBank"
                  value={formData.recipientBank}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.recipientBank ? "border-red-500" : "border-gray-200"
                  } focus:outline-none focus:ring-2 focus:ring-red-500`}
                  placeholder="e.g. KEB Hana Bank"
                />
                {errors.recipientBank && (
                  <p className="text-red-500 text-sm mt-1">{errors.recipientBank}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Amount */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-gray-700">Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">$</span>
                  <input
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className={`w-full pl-8 pr-4 py-3 rounded-lg border ${
                      errors.amount ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-red-500`}
                    placeholder="0.00"
                  />
                </div>
                {errors.amount && (
                  <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
                )}
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-sm text-red-800">
                  Available: $
                  {userAccounts.find((a) => a.type === "Savings Account")?.balance ?? "53000.00"}
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Security */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-gray-700">Security PIN</label>
                <input
                  type="password"
                  name="securityPin"
                  value={formData.securityPin}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.securityPin ? "border-red-500" : "border-gray-200"
                  } focus:outline-none focus:ring-2 focus:ring-red-500`}
                  placeholder="••••"
                />
                {errors.securityPin && (
                  <p className="text-red-500 text-sm mt-1">{errors.securityPin}</p>
                )}
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-sm text-red-800">
                  By proceeding, you authorize this transfer from Savings ending in{" "}
                  {userAccounts.find((a) => a.type === "Savings Account")?.number.slice(-4) ??
                    "0000"}
                </p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="flex items-center text-gray-600 hover:text-red-600 transition"
              >
                <FiArrowLeft className="mr-2" /> Back
              </button>
            )}
            <div className="ml-auto">
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg flex items-center transition"
                >
                  Continue <FiArrowRight className="ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg flex items-center transition"
                >
                  Confirm <FiCheckCircle className="ml-2" />
                </button>
              )}
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default LocalTransfer;