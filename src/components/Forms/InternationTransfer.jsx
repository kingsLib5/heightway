import React, { useState, useEffect } from "react";
import { FiUser, FiDollarSign, FiLock, FiCheckCircle, FiArrowLeft, FiArrowRight, FiGlobe, FiInfo } from "react-icons/fi";

const InternationalTransfer = ({ onClose }) => {
  const [formData, setFormData] = useState({
    recipientName: "",
    recipientAccount: "",
    recipientBank: "",
    bankAddress: "",      // <-- new
    branchCode: "",       // <-- new
    recipientSwift: "",
    recipientIban: "",
    recipientCountry: "",
    amount: "",
    currency: "USD",
    transferType: "Personal",
    transferDate: "",
    reference: "",
    securityPin: "",
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [approvalStatus, setApprovalStatus] = useState("");

  // Verification step state
  const [showVerification, setShowVerification] = useState(false);
  const [transferId, setTransferId] = useState(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationError, setVerificationError] = useState("");

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    setFormData((p) => ({ ...p, transferDate: today }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    setErrors((e) => ({ ...e, [name]: "" }));
  };

  // Limits
  const DAILY_LIMIT = 500000;
  const ONE_TIME_LIMIT = 250000;
  const getTodayKey = () => {
    const today = new Date().toISOString().slice(0, 10);
    return `intl_transfer_total_${today}`;
  };
  const getTodayTotal = () => Number(localStorage.getItem(getTodayKey()) || 0);
  const addToTodayTotal = (amount) => {
    const total = getTodayTotal() + Number(amount);
    localStorage.setItem(getTodayKey(), total);
  };

  const validateStep = () => {
    const err = {};
    if (currentStep === 1) {
      if (!formData.recipientName) err.recipientName = "Required.";
      if (!formData.recipientAccount) err.recipientAccount = "Required.";
      if (!formData.recipientBank) err.recipientBank = "Required.";
      if (!formData.recipientSwift) err.recipientSwift = "Required.";
      if (!formData.recipientCountry) err.recipientCountry = "Required.";
      if (!formData.bankAddress) err.bankAddress = "Required.";
      // branchCode is optional
    }
    if (currentStep === 2) {
      if (!formData.amount) err.amount = "Required.";
      else if (Number(formData.amount) > ONE_TIME_LIMIT)
        err.amount = `One-time transfer limit is $${ONE_TIME_LIMIT.toLocaleString()}.`;
      else if (getTodayTotal() + Number(formData.amount) > DAILY_LIMIT)
        err.amount = `Daily transfer limit is $${DAILY_LIMIT.toLocaleString()}.`;
    }
    if (currentStep === 3) {
      if (!formData.securityPin) err.securityPin = "Required.";
      else if (formData.securityPin !== "0094") err.securityPin = "Security PIN is incorrect.";
    }
    return err;
  };

  const handleNext = () => {
    const err = validateStep();
    if (Object.keys(err).length) setErrors(err);
    else setCurrentStep((s) => s + 1);
  };
  const handlePrevious = () => setCurrentStep((s) => s - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validateStep();
    if (Object.keys(err).length) {
      setErrors(err);
      return;
    }
    setIsSubmitting(true);

    addToTodayTotal(formData.amount);

    try {
      const token = localStorage.getItem("token");
      const email = "jamesphilips0480@gmail.com";
      const res = await fetch("https://hsbc-online-backend.onrender.com/api/transfer/international", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          senderAccount: "N/A",
          recipientName: formData.recipientName,
          recipientAccount: formData.recipientAccount,
          recipientBank: formData.recipientBank,
          bankAddress: formData.bankAddress,      // <-- new
          branchCode: formData.branchCode,        // <-- new
          recipientSwift: formData.recipientSwift,
          recipientIban: formData.recipientIban,
          recipientCountry: formData.recipientCountry,
          amount: formData.amount,
          currency: formData.currency,
          transferType: formData.transferType,
          transferDate: formData.transferDate,
          reference: formData.reference,
          securityPin: formData.securityPin,
          email,
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

      setTransferId(data.transferId);
      setShowVerification(true);
      setIsSubmitting(false);
    } catch (err) {
      setErrors({ general: "Network error: " + err.message });
      setIsSubmitting(false);
    }
  };

  const handleVerify = async () => {
    setIsSubmitting(true);
    setVerificationError("");
    try {
      const res = await fetch("https://hsbc-online-backend.onrender.com/api/transfer/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transferId, code: verificationCode.trim() }),
      });
      const result = await res.json();
      if (!res.ok) {
        setVerificationError(result.message || "Verification failed.");
      } else {
        setApprovalStatus("Pending");
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
    <div className="p-4 max-w-xl mx-auto">
      <div className="max-h-[80vh] overflow-y-auto scroll-container">
        <style jsx>{`
          .scroll-container {
            scrollbar-width: thin;
            scrollbar-color: #c53030 #f1f1f1;
          }
          .scroll-container::-webkit-scrollbar {
            width: 10px;
          }
          .scroll-container::-webkit-scrollbar-track {
            background: #f8f8f8;
            border-radius: 10px;
          }
          .scroll-container::-webkit-scrollbar-thumb {
            background-color: #c53030;
            border-radius: 10px;
            border: 2px solid #f8f8f8;
            background-clip: padding-box;
          }
          .scroll-container::-webkit-scrollbar-thumb:hover {
            background-color: #9b2c2c;
          }
        `}</style>

        {isSubmitting && (
          <div className="fixed inset-0 bg-white/90 z-50 flex flex-col items-center justify-center">
            <div className="animate-spin h-12 w-12 border-4 border-red-600 border-t-transparent rounded-full"></div>
            <p className="mt-4 text-red-600 font-medium">Processing Transfer...</p>
          </div>
        )}

        {isSubmitted && (
          <div className="text-center py-8">
            <FiCheckCircle className="mx-auto mb-4 text-yellow-500 text-5xl animate-pulse" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Transfer Pending</h2>
            <p className="text-gray-600 mb-6">We’ll notify you once it’s complete.</p>
            <button
              onClick={onClose}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition"
            >
              Back to Dashboard
            </button>
          </div>
        )}

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

        {!isSubmitting && !isSubmitted && !showVerification && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Progress */}
            <div className="relative mb-6">
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

            {/* Step 1 */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="bg-red-50 p-3 rounded-lg flex items-start gap-3">
                  <FiInfo className="text-xl text-red-600 mt-1" />
                  <p className="text-sm text-gray-600">
                    Enter recipient details accurately to avoid delays.
                  </p>
                </div>
                <div>
                  <label className="block mb-2 text-gray-700">Full Name</label>
                  <input
                    name="recipientName"
                    value={formData.recipientName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.recipientName ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-red-500`}
                    placeholder="Jane Doe"
                  />
                  {errors.recipientName && (
                    <p className="text-red-500 text-sm mt-1">{errors.recipientName}</p>
                  )}
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-gray-700">Account Number</label>
                    <input
                      name="recipientAccount"
                      value={formData.recipientAccount}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.recipientAccount ? "border-red-500" : "border-gray-200"
                      } focus:outline-none focus:ring-2 focus:ring-red-500`}
                      placeholder="123456789"
                    />
                    {errors.recipientAccount && (
                      <p className="text-red-500 text-sm mt-1">{errors.recipientAccount}</p>
                    )}
                  </div>
                  <div>
                    <label className="block mb-2 text-gray-700">SWIFT/BIC Code</label>
                    <input
                      name="recipientSwift"
                      value={formData.recipientSwift}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.recipientSwift ? "border-red-500" : "border-gray-200"
                      } focus:outline-none focus:ring-2 focus:ring-red-500`}
                      placeholder="ABCDUSXX"
                    />
                    {errors.recipientSwift && (
                      <p className="text-red-500 text-sm mt-1">{errors.recipientSwift}</p>
                    )}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-gray-700">Bank Name</label>
                    <input
                      name="recipientBank"
                      value={formData.recipientBank}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.recipientBank ? "border-red-500" : "border-gray-200"
                      } focus:outline-none focus:ring-2 focus:ring-red-500`}
                      placeholder="International Bank"
                    />
                    {errors.recipientBank && (
                      <p className="text-red-500 text-sm mt-1">{errors.recipientBank}</p>
                    )}
                  </div>
                  <div>
                    <label className="block mb-2 text-gray-700">Country</label>
                    <select
                      name="recipientCountry"
                      value={formData.recipientCountry}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.recipientCountry ? "border-red-500" : "border-gray-200"
                      } focus:outline-none focus:ring-2 focus:ring-red-500`}
                    >
                      <option value="">Select Country</option>
                      {/* ...country options... */}
                      <option value="US">United States</option>
                      <option value="GB">United Kingdom</option>
                      <option value="DE">Germany</option>
                      <option value="CN">China</option>
                      <option value="JP">Japan</option>
                      <option value="TW">Taiwan</option>
                      <option value="HK">Hong Kong</option>
                      <option value="PH">Philippines</option>
                      <option value="VN">Vietnam</option>
                      <option value="ID">Indonesia</option>
                      <option value="TH">Thailand</option>
                      <option value="MY">Malaysia</option>
                      <option value="SG">Singapore</option>
                      <option value="MM">Myanmar (Burma)</option>
                      <option value="KH">Cambodia</option>
                      <option value="LA">Laos</option>
                      <option value="BN">Brunei</option>
                      <option value="AE">United Arab Emirates (UAE)</option>
                      <option value="SA">Saudi Arabia</option>
                      <option value="QA">Qatar</option>
                      <option value="KW">Kuwait</option>
                      <option value="OM">Oman</option>
                      <option value="BH">Bahrain</option>
                      <option value="IL">Israel</option>
                      <option value="TR">Turkey</option>
                      <option value="JO">Jordan</option>
                      <option value="LB">Lebanon</option>
                      <option value="PK">Pakistan</option>
                      <option value="BD">Bangladesh</option>
                      <option value="NP">Nepal</option>
                      <option value="LK">Sri Lanka</option>
                      <option value="MV">Maldives</option>
                    </select>
                    {errors.recipientCountry && (
                      <p className="text-red-500 text-sm mt-1">{errors.recipientCountry}</p>
                    )}
                  </div>
                </div>
                {/* New: Bank Address */}
                <div>
                  <label className="block mb-2 text-gray-700">Bank Address</label>
                  <input
                    name="bankAddress"
                    value={formData.bankAddress}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.bankAddress ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-red-500`}
                    placeholder="123 Main St, City, Country"
                  />
                  {errors.bankAddress && (
                    <p className="text-red-500 text-sm mt-1">{errors.bankAddress}</p>
                  )}
                </div>
                {/* New: Branch Code (optional) */}
                <div>
                  <label className="block mb-2 text-gray-700">Branch Code <span className="text-gray-400">(optional)</span></label>
                  <input
                    name="branchCode"
                    value={formData.branchCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Branch code (if any)"
                  />
                </div>
              </div>
            )}

            {/* Step 2 */}
            {currentStep === 2 && (
  <div className="space-y-4">
    <div>
      <label className="block mb-2 text-gray-700">Amount (USD)</label>
      <div className="relative">
        <span className="absolute left-3 top-2 text-gray-400">$</span>
        <input
          name="amount"
          value={formData.amount}
          onChange={handleInputChange}
          className={`w-full pl-8 pr-4 py-2 rounded-lg border ${
            errors.amount ? "border-red-500" : "border-gray-200"
          } focus:outline-none focus:ring-2 focus:ring-red-500`}
          placeholder="0.00"
        />
      </div>
      {errors.amount && (
        <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
      )}
    </div>
    <div className="bg-red-50 p-3 rounded-lg space-y-1">
      <p className="text-sm text-red-800">
        Exchange rate: 1 USD = 0.85 EUR
      </p>
      <p className="text-xs text-gray-700">
        <span className="font-semibold">One-time transfer limit:</span> $250,000
      </p>
      <p className="text-xs text-gray-700">
        <span className="font-semibold">Daily transfer limit:</span> $500,000
      </p>
    </div>
  </div>
)}

            {/* Step 3 */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="bg-red-50 p-3 rounded-lg">
                  <p className="text-sm text-red-800">
                    Confirm to initiate; can’t be undone.
                  </p>
                </div>
                <div>
                  <label className="block mb-2 text-gray-700">Security PIN</label>
                  <input
                    type="password"
                    name="securityPin"
                    value={formData.securityPin}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.securityPin ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-red-500`}
                    placeholder="••••"
                  />
                  {errors.securityPin && (
                    <p className="text-red-500 text-sm mt-1">{errors.securityPin}</p>
                  )}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-4 border-t border-gray-200">
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
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg flex items-center transition"
                  >
                    Continue <FiArrowRight className="ml-2" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg flex items-center transition"
                  >
                    Confirm <FiCheckCircle className="ml-2" />
                  </button>
                )}
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default InternationalTransfer;