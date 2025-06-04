// // src/components/LocalTransfer.jsx

// src/components/LocalTransfer.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FiUser,
  FiCheckCircle,
  FiDollarSign,
  FiLock,
  FiArrowLeft,
  FiArrowRight,
  FiInfo,
  FiAlertTriangle,
} from "react-icons/fi";

const LocalTransfer = ({ onClose }) => {
  // ─── Form Data State ────────────────────────────────────────────────────────────
  const [formData, setFormData] = useState({
    recipientEmail: "",
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

  // ─── Wizard Step State ───────────────────────────────────────────────────────────
  // Steps: 1 = Recipient, 2 = Amount, 3 = Review, 4 = Security PIN
  const [currentStep, setCurrentStep] = useState(1);

  // ─── Validation & Error State ───────────────────────────────────────────────────
  const [errors, setErrors] = useState({});
  const [accountsError, setAccountsError] = useState("");

  // ─── Loading / Submission State ─────────────────────────────────────────────────
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ─── Fetched Account Data ────────────────────────────────────────────────────────
  const [savingsBalance, setSavingsBalance] = useState(0);
  const [savingsLast4, setSavingsLast4] = useState("0000");
  const [accountsLoading, setAccountsLoading] = useState(true);

  // ─── On mount: set today’s date and fetch user’s profile/accounts  ───────────────
  useEffect(() => {
    // 1) Default transferDate to today
    const today = new Date().toISOString().slice(0, 10);
    setFormData((prev) => ({ ...prev, transferDate: today }));

    // 2) Fetch user profile (including accounts) to get Savings Account balance
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        setAccountsError("Not authenticated. Please log in again.");
        setAccountsLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "https://hsbc-online-backend.onrender.com/api/user/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const user = response.data;
        // Find the Savings Account
        const savings = Array.isArray(user.accounts)
          ? user.accounts.find((acc) =>
              acc.type.toLowerCase().includes("savings")
            )
          : null;

        if (savings) {
          setSavingsBalance(savings.balance);
          const num = savings.number?.toString() || "";
          setSavingsLast4(num.slice(-4).padStart(4, "0"));
        } else {
          setSavingsBalance(0);
          setSavingsLast4("0000");
        }
      } catch (err) {
        console.error("[LocalTransfer] Error fetching profile:", err);
        if (err.response?.data?.message) {
          setAccountsError(err.response.data.message);
        } else {
          setAccountsError(err.message || "Failed to load accounts.");
        }
      } finally {
        setAccountsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // ─── Handle form field changes ────────────────────────────────────────────────────
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // ─── Validate each step ───────────────────────────────────────────────────────────
  const validateStep = () => {
    const errs = {};

    if (currentStep === 1) {
      // Step 1: Recipient Name, Account, Bank, Routing
      if (!formData.recipientName) {
        errs.recipientName = "Recipient's name is required.";
      }
      if (!formData.recipientAccount) {
        errs.recipientAccount = "Account number is required.";
      }
      if (!formData.recipientBank) {
        errs.recipientBank = "Bank name is required.";
      }
      if (!formData.recipientRouting) {
        errs.recipientRouting = "Bank code is required.";
      }
    } else if (currentStep === 2) {
      // Step 2: Amount
      if (!formData.amount) {
        errs.amount = "Amount is required.";
      } else if (isNaN(parseFloat(formData.amount))) {
        errs.amount = "Enter a valid number.";
      } else {
        const requested = parseFloat(formData.amount);
        if (requested > savingsBalance) {
          errs.amount = `Insufficient funds. Available: $${savingsBalance.toFixed(
            2
          )}`;
        }
      }
    } else if (currentStep === 4) {
      // Step 4: Security PIN
      if (!formData.securityPin) {
        errs.securityPin = "Security PIN is required.";
      }
      // We do NOT check correctness here; we just show disabled message
    }

    return errs;
  };

  // ─── Go to the next step ──────────────────────────────────────────────────────────
  const handleNext = () => {
    const stepErrs = validateStep();
    if (Object.keys(stepErrs).length) {
      setErrors(stepErrs);
    } else {
      setErrors({});
      setCurrentStep((prev) => prev + 1);
    }
  };

  // ─── Go back one step ────────────────────────────────────────────────────────────
  const handlePrevious = () => {
    setErrors({});
    setCurrentStep((prev) => prev - 1);
  };

  // ─── Step 4 Submit: Instead of creating transfer, immediately show “Account Disabled” ─
  const handleSubmitPin = (e) => {
    e.preventDefault();
    const stepErrs = validateStep();
    if (Object.keys(stepErrs).length) {
      setErrors(stepErrs);
      return;
    }

    setIsSubmitting(true);
    // short delay for UX
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 500);
  };

  // ─── Loading Overlay (shown during any network request) ─────────────────────────
  const LoadingOverlay = () => (
    <div className="fixed inset-0 bg-white/90 z-50 flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
      <p className="mt-4 text-red-600 font-medium">Processing...</p>
    </div>
  );

  // ─── Final “Account Disabled” Message ────────────────────────────────────────────
  const DisabledMessage = () => (
    <div className="text-center py-12 max-w-md mx-auto">
      <FiAlertTriangle className="mx-auto mb-4 text-red-500 text-5xl animate-pulse" />
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Account Temporarily Disabled
      </h2>
      <div className="text-left text-gray-600 mb-6 space-y-2">
        <p>
          We’ve temporarily disabled your bank account for security reasons. This may be due to:
        </p>
        <ul className="list-disc list-inside pl-4">
          <li>Suspicious activity</li>
          <li>Terms violation</li>
          <li>Failed login attempts</li>
          <li>Login access from unfamiliar geographic locations</li>
          <li>Unusual transaction amounts</li>
        </ul>
        <p>
          Please contact support immediately:
          <br />
          <a
            href="mailto:hsbc.securities.services.echannel@hsbc.com"
            className="text-red-600 underline"
          >
            hsbc.securities.services.echannel@hsbc.com
          </a>
        </p>
        <p>We take your security seriously. Our team is here to help resolve this issue as quickly as possible.</p>
      </div>
      <button
        onClick={onClose}
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition"
      >
        Back to Dashboard
      </button>
    </div>
  );

  // ─── Main Render Logic ──────────────────────────────────────────────────────────
  // 1) If accounts are still loading, show a spinner
  if (accountsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
        <p className="ml-4 text-red-600 font-medium">Loading account data...</p>
      </div>
    );
  }

  // 2) If there was an error fetching accounts, show it
  if (accountsError) {
    return (
      <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-6 rounded-lg max-w-md mx-auto mt-10">
        <p className="font-semibold">Error loading account:</p>
        <p>{accountsError}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          Close
        </button>
      </div>
    );
  }

  // 3) If final “disabled” message should be shown
  if (isSubmitted && !isSubmitting) {
    return <DisabledMessage />;
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      {isSubmitting && <LoadingOverlay />}

      {/* Render Steps 1–4 */}
      {!isSubmitting && !isSubmitted && (
        <>
          {/* ─── Progress Bar ──────────────────────────────────────────────────────── */}
          <div className="relative mb-8">
            <div className="absolute inset-y-5 left-0 right-0 h-1 bg-gray-200 rounded"></div>
            <div
              className="absolute inset-y-5 left-0 h-1 bg-red-600 rounded transition-all"
              style={{
                width: `${((currentStep - 1) / 3) * 100}%`, // 4 steps → 3 intervals
              }}
            />
            <div className="flex justify-between relative z-10">
              {[
                { id: 1, label: "Recipient", icon: <FiUser /> },
                { id: 2, label: "Amount", icon: <FiDollarSign /> },
                { id: 3, label: "Review", icon: <FiCheckCircle /> },
                { id: 4, label: "Security", icon: <FiLock /> },
              ].map((s) => (
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

          <form
            onSubmit={currentStep === 4 ? handleSubmitPin : (e) => e.preventDefault()}
            className="space-y-8"
          >
            {/* ─ Step 1: Recipient Details ─────────────────────────────────────────── */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="bg-red-50 p-3 rounded-lg flex items-start gap-3">
                  <FiInfo className="text-xl text-red-600 mt-1" />
                  <p className="text-sm text-gray-600">Enter the recipient’s bank details.</p>
                </div>

                <div>
                  <label className="block mb-2 text-gray-700">Recipient Name</label>
                  <input
                    name="recipientName"
                    value={formData.recipientName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.recipientName ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-red-500`}
                    placeholder=""
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
                      placeholder=""
                    />
                    {errors.recipientAccount && (
                      <p className="text-red-500 text-sm mt-1">{errors.recipientAccount}</p>
                    )}
                  </div>
                  <div>
                    <label className="block mb-2 text-gray-700">Bank Code</label>
                    <input
                      name="recipientRouting"
                      value={formData.recipientRouting}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.recipientRouting ? "border-red-500" : "border-gray-200"
                      } focus:outline-none focus:ring-2 focus:ring-red-500`}
                      placeholder=""
                    />
                    {errors.recipientRouting && (
                      <p className="text-red-500 text-sm mt-1">{errors.recipientRouting}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-gray-700">Bank Name</label>
                  <input
                    name="recipientBank"
                    value={formData.recipientBank}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.recipientBank ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-red-500`}
                    placeholder=""
                  />
                  {errors.recipientBank && (
                    <p className="text-red-500 text-sm mt-1">{errors.recipientBank}</p>
                  )}
                </div>
              </div>
            )}

            {/* ─ Step 2: Amount ────────────────────────────────────────────────────────── */}
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
                      placeholder=""
                    />
                  </div>
                  {errors.amount && (
                    <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
                  )}
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-sm text-red-800">Available: ${savingsBalance.toFixed(2)}</p>
                </div>
              </div>
            )}

            {/* ─ Step 3: Review ─────────────────────────────────────────────────────────── */}
            {currentStep === 3 && (
              <div className="space-y-4 text-sm text-gray-700">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Review Transfer Details
                </h3>
                <div>
                  <strong>Recipient Name:</strong> {formData.recipientName}
                </div>
                <div>
                  <strong>Account Number:</strong> {formData.recipientAccount}
                </div>
                <div>
                  <strong>Routing Number:</strong> {formData.recipientRouting}
                </div>
                <div>
                  <strong>Bank Name:</strong> {formData.recipientBank}
                </div>
                <div>
                  <strong>Amount:</strong> ${parseFloat(formData.amount).toFixed(2)}
                </div>
                <div>
                  <strong>Transfer Type:</strong> {formData.transferType}
                </div>
                <div>
                  <strong>Date:</strong> {formData.transferDate}
                </div>
                <div>
                  <strong>Reference:</strong> {formData.reference || "N/A"}
                </div>
                <p className="text-gray-500 mt-4">
                  Please confirm that the above information is correct before continuing.
                </p>
              </div>
            )}

            {/* ─ Step 4: Security PIN ────────────────────────────────────────────────────── */}
            {currentStep === 4 && (
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
                    placeholder="Enter 4-digit PIN"
                  />
                  {errors.securityPin && (
                    <p className="text-red-500 text-sm mt-1">{errors.securityPin}</p>
                  )}
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-sm text-red-800">
                    By proceeding, you authorize this transfer from Savings ending in{" "}
                    <strong>{savingsLast4}</strong>
                  </p>
                </div>
              </div>
            )}

            {/* ─ Navigation Buttons for Steps 1–4 ────────────────────────────────────── */}
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
                {currentStep < 4 ? (
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
                    Confirm PIN <FiLock className="ml-2" />
                  </button>
                )}
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default LocalTransfer;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   FiUser,
//   FiDollarSign,
//   FiLock,
//   FiCheckCircle,
//   FiArrowLeft,
//   FiArrowRight,
// } from "react-icons/fi";

// const LocalTransfer = ({ onClose }) => {
//   // ─── Form Data State ────────────────────────────────────────────────────────────
//   const [formData, setFormData] = useState({
//     recipientEmail: "",
//     recipientName: "",
//     recipientAccount: "",
//     recipientBank: "",
//     recipientRouting: "",
//     amount: "",
//     transferType: "Personal",
//     transferDate: "",
//     reference: "",
//     securityPin: "",
//   });

//   // ─── Wizard Step State ───────────────────────────────────────────────────────────
//   // Steps: 1 = Recipient, 2 = Amount, 3 = Review, 4 = Security PIN → createTransfer, 
//   //        5 = Enter Verification Code → verifyTransfer
//   const [currentStep, setCurrentStep] = useState(1);

//   // ─── Validation & Error State ───────────────────────────────────────────────────
//   const [errors, setErrors] = useState({});
//   const [apiError, setApiError] = useState("");
//   const [verifyError, setVerifyError] = useState("");

//   // ─── Loading / Submission State ─────────────────────────────────────────────────
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false); // After successful verify
//   const [approvalStatus, setApprovalStatus] = useState("Pending"); // From createTransfer/verify

//   // ─── Transfer ID from createTransfer ─────────────────────────────────────────────
//   const [transferId, setTransferId] = useState(null);

//   // ─── Verification Code Input ─────────────────────────────────────────────────────
//   const [verificationCodeInput, setVerificationCodeInput] = useState("");

//   // ─── Fetched Account Data ────────────────────────────────────────────────────────
//   const [savingsBalance, setSavingsBalance] = useState(0);
//   const [savingsLast4, setSavingsLast4] = useState("0000");
//   const [accountsLoading, setAccountsLoading] = useState(true);
//   const [accountsError, setAccountsError] = useState("");

//   // ─── On mount: set today’s date and fetch user’s profile/accounts  ───────────────
//   useEffect(() => {
//     // 1) Default transferDate to today
//     const today = new Date().toISOString().slice(0, 10);
//     setFormData((prev) => ({ ...prev, transferDate: today }));

//     // 2) Fetch user profile (including accounts) to get Savings Account balance
//     const fetchUserProfile = async () => {
//       const token = localStorage.getItem("jwtToken");
//       if (!token) {
//         setAccountsError("Not authenticated. Please log in again.");
//         setAccountsLoading(false);
//         return;
//       }

//       try {
//         const response = await axios.get(
//           "https://hsbc-online-backend.onrender.com/api/user/me",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const user = response.data;
//         // Find the Savings Account
//         const savings = Array.isArray(user.accounts)
//           ? user.accounts.find((acc) =>
//               acc.type.toLowerCase().includes("savings")
//             )
//           : null;

//         if (savings) {
//           setSavingsBalance(savings.balance);
//           const num = savings.number?.toString() || "";
//           setSavingsLast4(num.slice(-4).padStart(4, "0"));
//         } else {
//           setSavingsBalance(0);
//           setSavingsLast4("0000");
//         }
//       } catch (err) {
//         console.error("[LocalTransfer] Error fetching profile:", err);
//         if (err.response?.data?.message) {
//           setAccountsError(err.response.data.message);
//         } else {
//           setAccountsError(err.message || "Failed to load accounts.");
//         }
//       } finally {
//         setAccountsLoading(false);
//       }
//     };

//     fetchUserProfile();
//   }, []);

//   // ─── Handle form field changes ────────────────────────────────────────────────────
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: "" }));
//     setApiError("");
//     setVerifyError("");
//   };

//   // ─── Validate each step ───────────────────────────────────────────────────────────
//   const validateStep = () => {
//     const errs = {};

//     if (currentStep === 1) {
//       // Step 1: Recipient Email, Name, Account, Bank, Routing
//       // if (!formData.recipientEmail) {
//       //   errs.recipientEmail = "Recipient's email is required.";
//       // } else {
//       //   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       //   if (!emailPattern.test(formData.recipientEmail)) {
//       //     errs.recipientEmail = "Enter a valid email address.";
//       //   }
//       // }
//       if (!formData.recipientName) {
//         errs.recipientName = "Recipient's name is required.";
//       }
//       if (!formData.recipientAccount) {
//         errs.recipientAccount = "Account number is required.";
//       }
//       if (!formData.recipientBank) {
//         errs.recipientBank = "Bank name is required.";
//       }
//       if (!formData.recipientRouting) {
//         errs.recipientRouting = "Bank code is required.";
//       }
//     } else if (currentStep === 2) {
//       // Step 2: Amount
//       if (!formData.amount) {
//         errs.amount = "Amount is required.";
//       } else if (isNaN(parseFloat(formData.amount))) {
//         errs.amount = "Enter a valid number.";
//       } else {
//         const requested = parseFloat(formData.amount);
//         if (requested > savingsBalance) {
//           errs.amount = `Insufficient funds. Available: $${savingsBalance.toFixed(
//             2
//           )}`;
//         }
//       }
//     } else if (currentStep === 4) {
//       // Step 4: Security PIN
//       if (!formData.securityPin) {
//         errs.securityPin = "Security PIN is required.";
//       } else if (formData.securityPin !== "0094") {
//         errs.securityPin = "Security PIN is incorrect.";
//       }
//     }
//     // No validation for Step 3 (Review) or Step 5 (we’ll validate the code separately)
//     return errs;
//   };

//   // ─── Go to the next step ──────────────────────────────────────────────────────────
//   const handleNext = () => {
//     const stepErrs = validateStep();
//     if (Object.keys(stepErrs).length) {
//       setErrors(stepErrs);
//     } else {
//       setErrors({});
//       setApiError("");
//       setVerifyError("");
//       setCurrentStep((prev) => prev + 1);
//     }
//   };

//   // ─── Go back one step ────────────────────────────────────────────────────────────
//   const handlePrevious = () => {
//     setErrors({});
//     setApiError("");
//     setVerifyError("");
//     setCurrentStep((prev) => prev - 1);
//   };

//   // ─── Step 4 Submit: Create Transfer → backend emails 6-digit code ───────────────
//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   const stepErrs = validateStep();
//   if (Object.keys(stepErrs).length) {
//     setErrors(stepErrs);
//     return;
//   }

//   setIsSubmitting(true);
//   setApiError("");

//   try {
//     // Build payload so that bankAddress, recipientSwift, recipientCountry are non‐empty:
//     const payload = {
//       recipientEmail: "N/A",
//       recipientName: formData.recipientName,
//       recipientAccount: formData.recipientAccount,
//       recipientBank: formData.recipientBank,

//       // These three MUST be non‐empty to satisfy backend validation:
//       bankAddress: "N/A",
//       branchCode: "",               // branchCode is not checked by backend
//       recipientRouting: formData.recipientRouting,
//       recipientSwift: "N/A",
//       recipientIban: "",            // recipientIban is not checked
//       recipientCountry: "N/A",

//       amount: parseFloat(formData.amount),
//       currency: "USD",
//       transferType: formData.transferType,
//       transferDate: formData.transferDate,
//       reference: formData.reference,
//       securityPin: formData.securityPin,
//     };

//     const token = localStorage.getItem("jwtToken");
//     if (!token) {
//       throw new Error("Not authenticated. Please log in again.");
//     }

//     const response = await axios.post(
//       "https://hsbc-online-backend.onrender.com/api/transfers",
//       payload,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     // On success, the backend returns { _id, status: "PendingVerification" }
//     const { _id, status } = response.data;
//     setTransferId(_id);
//     setApprovalStatus(status); // contains "PendingVerification"
//     setCurrentStep(5); // move to “Enter Verification Code” step
//   } catch (err) {
//     console.error("[LocalTransfer] createTransfer error:", err);
//     if (err.response?.data?.message) {
//       setApiError(err.response.data.message);
//     } else {
//       setApiError(err.message || "An unknown error occurred.");
//     }
//   } finally {
//     setIsSubmitting(false);
//   }
// };

//   // ─── Step 5 Submit: Verify the emailed code ──────────────────────────────────────
//   const handleVerifyCode = async (e) => {
//     e.preventDefault();
//     setVerifyError("");
//     if (!verificationCodeInput.trim()) {
//       setVerifyError("Verification code is required.");
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const token = localStorage.getItem("jwtToken");
//       if (!token) {
//         throw new Error("Not authenticated. Please log in again.");
//       }

//       const response = await axios.post(
//         `https://hsbc-online-backend.onrender.com/api/transfers/${transferId}/verify`,
//         { verificationCode: verificationCodeInput.trim() },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       // Backend returns { _id, status: "Pending" }
//       const { status } = response.data;
//       setApprovalStatus(status); // "Pending"
//       setIsSubmitted(true);

//       // Auto-close after 3 seconds
//       setTimeout(onClose, 3000);
//     } catch (err) {
//       console.error("[LocalTransfer] verifyTransfer error:", err);
//       if (err.response?.data?.message) {
//         setVerifyError(err.response.data.message);
//       } else {
//         setVerifyError(err.message || "Verification failed.");
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // ─── Steps Metadata ──────────────────────────────────────────────────────────────
//   const steps = [
//     { id: 1, label: "Recipient", icon: <FiUser /> },
//     { id: 2, label: "Amount", icon: <FiDollarSign /> },
//     { id: 3, label: "Review", icon: <FiCheckCircle /> },
//     { id: 4, label: "Security", icon: <FiLock /> },
//     { id: 5, label: "Verify Code", icon: <FiLock /> },
//   ];

//   // ─── Loading Overlay (shown during any network request) ─────────────────────────
//   const LoadingOverlay = () => (
//     <div className="fixed inset-0 bg-white/90 z-50 flex flex-col items-center justify-center">
//       <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
//       <p className="mt-4 text-red-600 font-medium">
//         {currentStep === 5 ? "Verifying code..." : "Processing transfer..."}
//       </p>
//     </div>
//   );

//   // ─── Final Success Message (“Transfer Pending!”) ─────────────────────────────────
//   const SuccessMessage = () => (
//     <div className="text-center py-12">
//       <FiCheckCircle className="mx-auto mb-4 text-green-500 text-5xl animate-pulse" />
//       <h2 className="text-2xl font-semibold text-gray-800 mb-2">
//         Transfer {approvalStatus === "Pending" ? "Pending" : approvalStatus}!
//       </h2>
//       <p className="text-gray-600 mb-6">
//         {approvalStatus === "Pending"
//           ? "We’ll notify you once it’s complete."
//           : "Funds will arrive within 1 business day."}
//       </p>
//       <button
//         onClick={onClose}
//         className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition"
//       >
//         Return
//       </button>
//     </div>
//   );

//   // ─── “Enter Verification Code” Screen (Step 5) ───────────────────────────────────
//   const RenderVerificationStep = () => (
//     <div className="space-y-6 max-w-md mx-auto">
//       <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
//         Enter Verification Code
//       </h3>
//       <p className="text-sm text-gray-600 mb-4">
//         A 6-digit code was just emailed to{" "}
//          Please enter it below:
//       </p>
//       <form onSubmit={handleVerifyCode} className="space-y-4">
//         <div>
//           <label className="block mb-2 text-gray-700">Verification Code</label>
//           <input
//             type="text"
//             maxLength={6}
//             name="verificationCode"
//             value={verificationCodeInput}
//             onChange={(e) => {
//               setVerificationCodeInput(e.target.value);
//               setVerifyError("");
//             }}
//             className={`w-full px-4 py-3 rounded-lg border ${
//               verifyError ? "border-red-500" : "border-gray-200"
//             } focus:outline-none focus:ring-2 focus:ring-red-500`}
//             placeholder="Enter 6-digit code"
//           />
//           {verifyError && (
//             <p className="text-red-500 text-sm mt-1">{verifyError}</p>
//           )}
//         </div>

//         <div className="flex justify-between items-center">
//           <button
//             type="button"
//             onClick={handlePrevious}
//             className="flex items-center text-gray-600 hover:text-red-600 transition"
//           >
//             <FiArrowLeft className="mr-2" /> Back
//           </button>
//           <button
//             type="submit"
//             className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg flex items-center transition"
//           >
//             Verify <FiArrowRight className="ml-2" />
//           </button>
//         </div>
//       </form>
//       {apiError && (
//         <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded">
//           {apiError}
//         </div>
//       )}
//     </div>
//   );

//   // ─── Main Render Logic ──────────────────────────────────────────────────────────
//   // 1) If accounts are still loading, show a spinner
//   if (accountsLoading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
//         <p className="ml-4 text-red-600 font-medium">Loading account data...</p>
//       </div>
//     );
//   }

//   // 2) If there was an error fetching accounts, show it
//   if (accountsError) {
//     return (
//       <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-6 rounded-lg max-w-md mx-auto mt-10">
//         <p className="font-semibold">Error loading account:</p>
//         <p>{accountsError}</p>
//         <button
//           onClick={onClose}
//           className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
//         >
//           Close
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 max-w-xl mx-auto">
//       {/* Loading overlay if a network call is in progress */}
//       {isSubmitting && <LoadingOverlay />}

//       {/* Final success screen, once the code is verified */}
//       {isSubmitted && !isSubmitting && <SuccessMessage />}

//       {/* Otherwise, show either Steps 1–4 or Step 5 */}
//       {!isSubmitting && !isSubmitted && (
//         <>
//           {/* ─── Progress Bar ──────────────────────────────────────────────────────── */}
//           <div className="relative mb-8">
//             <div className="absolute inset-y-5 left-0 right-0 h-1 bg-gray-200 rounded"></div>
//             <div
//               className="absolute inset-y-5 left-0 h-1 bg-red-600 rounded transition-all"
//               style={{
//                 width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
//               }}
//             />
//             <div className="flex justify-between relative z-10">
//               {steps.map((s) => (
//                 <div key={s.id} className="flex flex-col items-center">
//                   <div
//                     className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 transition ${
//                       currentStep >= s.id
//                         ? "bg-red-600 text-white"
//                         : "bg-gray-100 text-gray-400"
//                     }`}
//                   >
//                     {s.icon}
//                   </div>
//                   <span
//                     className={`text-sm ${
//                       currentStep >= s.id ? "text-gray-800" : "text-gray-400"
//                     }`}
//                   >
//                     {s.label}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* ─── If Steps 1–4: render the multi-step form ───────────────────────────── */}
//           {currentStep < 5 && (
//             <form
//               onSubmit={currentStep === 4 ? handleSubmit : (e) => e.preventDefault()}
//               className="space-y-8"
//             >
//               {/* ─ Step 1: Recipient Details ─────────────────────────────────────────── */}
//               {currentStep === 1 && (
//                 <div className="space-y-6">
//                   {/* <div>
//                     <label className="block mb-2 text-gray-700">
//                       Recipient Email
//                     </label>
//                     <input
//                       type="email"
//                       name="recipientEmail"
//                       value={formData.recipientEmail}
//                       onChange={handleInputChange}
//                       className={`w-full px-4 py-3 rounded-lg border ${
//                         errors.recipientEmail ? "border-red-500" : "border-gray-200"
//                       } focus:outline-none focus:ring-2 focus:ring-red-500`}
//                       placeholder="recipient@example.com"
//                     />
//                     {errors.recipientEmail && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.recipientEmail}
//                       </p>
//                     )}
//                   </div> */}

//                   <div>
//                     <label className="block mb-2 text-gray-700">
//                       Recipient Name
//                     </label>
//                     <input
//                       name="recipientName"
//                       value={formData.recipientName}
//                       onChange={handleInputChange}
//                       className={`w-full px-4 py-3 rounded-lg border ${
//                         errors.recipientName ? "border-red-500" : "border-gray-200"
//                       } focus:outline-none focus:ring-2 focus:ring-red-500`}
//                       placeholder=""
//                     />
//                     {errors.recipientName && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.recipientName}
//                       </p>
//                     )}
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block mb-2 text-gray-700">
//                         Account Number
//                       </label>
//                       <input
//                         name="recipientAccount"
//                         value={formData.recipientAccount}
//                         onChange={handleInputChange}
//                         className={`w-full px-4 py-3 rounded-lg border ${
//                           errors.recipientAccount
//                             ? "border-red-500"
//                             : "border-gray-200"
//                         } focus:outline-none focus:ring-2 focus:ring-red-500`}
//                         placeholder=""
//                       />
//                       {errors.recipientAccount && (
//                         <p className="text-red-500 text-sm mt-1">
//                           {errors.recipientAccount}
//                         </p>
//                       )}
//                     </div>
//                     <div>
//                       <label className="block mb-2 text-gray-700">
//                         Bank Code
//                       </label>
//                       <input
//                         name="recipientRouting"
//                         value={formData.recipientRouting}
//                         onChange={handleInputChange}
//                         className={`w-full px-4 py-3 rounded-lg border ${
//                           errors.recipientRouting
//                             ? "border-red-500"
//                             : "border-gray-200"
//                         } focus:outline-none focus:ring-2 focus:ring-red-500`}
//                         placeholder=""
//                       />
//                       {errors.recipientRouting && (
//                         <p className="text-red-500 text-sm mt-1">
//                           {errors.recipientRouting}
//                         </p>
//                       )}
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block mb-2 text-gray-700">
//                       Bank Name
//                     </label>
//                     <input
//                       name="recipientBank"
//                       value={formData.recipientBank}
//                       onChange={handleInputChange}
//                       className={`w-full px-4 py-3 rounded-lg border ${
//                         errors.recipientBank ? "border-red-500" : "border-gray-200"
//                       } focus:outline-none focus:ring-2 focus:ring-red-500`}
//                       placeholder=""
//                     />
//                     {errors.recipientBank && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.recipientBank}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* ─ Step 2: Amount ────────────────────────────────────────────────────────── */}
//               {currentStep === 2 && (
//                 <div className="space-y-6">
//                   <div>
//                     <label className="block mb-2 text-gray-700">Amount</label>
//                     <div className="relative">
//                       <span className="absolute left-3 top-3 text-gray-400">
//                         $
//                       </span>
//                       <input
//                         name="amount"
//                         value={formData.amount}
//                         onChange={handleInputChange}
//                         className={`w-full pl-8 pr-4 py-3 rounded-lg border ${
//                           errors.amount ? "border-red-500" : "border-gray-200"
//                         } focus:outline-none focus:ring-2 focus:ring-red-500`}
//                         placeholder=""
//                       />
//                     </div>
//                     {errors.amount && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.amount}
//                       </p>
//                     )}
//                   </div>
//                   <div className="bg-red-50 p-4 rounded-lg">
//                     <p className="text-sm text-red-800">
//                       Available: ${savingsBalance.toFixed(2)}
//                     </p>
//                   </div>
//                 </div>
//               )}

//               {/* ─ Step 3: Review ─────────────────────────────────────────────────────────── */}
//               {currentStep === 3 && (
//                 <div className="space-y-4 text-sm text-gray-700">
//                   <h3 className="text-lg font-semibold text-gray-800 mb-4">
//                     Review Transfer Details
//                   </h3>
//                   <div>
//                     <strong>Recipient Email:</strong> {formData.recipientEmail}
//                   </div>
//                   <div>
//                     <strong>Recipient Name:</strong> {formData.recipientName}
//                   </div>
//                   <div>
//                     <strong>Account Number:</strong> {formData.recipientAccount}
//                   </div>
//                   <div>
//                     <strong>Routing Number:</strong> {formData.recipientRouting}
//                   </div>
//                   <div>
//                     <strong>Bank Name:</strong> {formData.recipientBank}
//                   </div>
//                   <div>
//                     <strong>Amount:</strong> ${parseFloat(formData.amount).toFixed(2)}
//                   </div>
//                   <div>
//                     <strong>Transfer Type:</strong> {formData.transferType}
//                   </div>
//                   <div>
//                     <strong>Date:</strong> {formData.transferDate}
//                   </div>
//                   <div>
//                     <strong>Reference:</strong> {formData.reference || "N/A"}
//                   </div>
//                   <p className="text-gray-500 mt-4">
//                     Please confirm that the above information is correct before continuing.
//                   </p>
//                 </div>
//               )}

//               {/* ─ Step 4: Security PIN ────────────────────────────────────────────────────── */}
//               {currentStep === 4 && (
//                 <div className="space-y-6">
//                   <div>
//                     <label className="block mb-2 text-gray-700">
//                       Security PIN
//                     </label>
//                     <input
//                       type="password"
//                       name="securityPin"
//                       value={formData.securityPin}
//                       onChange={handleInputChange}
//                       className={`w-full px-4 py-3 rounded-lg border ${
//                         errors.securityPin ? "border-red-500" : "border-gray-200"
//                       } focus:outline-none focus:ring-2 focus:ring-red-500`}
//                       placeholder="Enter 4-digit PIN"
//                     />
//                     {errors.securityPin && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.securityPin}
//                       </p>
//                     )}
//                   </div>
//                   <div className="bg-red-50 p-4 rounded-lg">
//                     <p className="text-sm text-red-800">
//                       By proceeding, you authorize this transfer from Savings ending in{" "}
//                       <strong>{savingsLast4}</strong>
//                     </p>
//                   </div>
//                 </div>
//               )}

//               {/* ─ Navigation Buttons for Steps 1–4 ────────────────────────────────────── */}
//               <div className="flex items-center justify-between pt-4 border-t border-gray-200">
//                 {currentStep > 1 && (
//                   <button
//                     type="button"
//                     onClick={handlePrevious}
//                     className="flex items-center text-gray-600 hover:text-red-600 transition"
//                   >
//                     <FiArrowLeft className="mr-2" /> Back
//                   </button>
//                 )}
//                 <div className="ml-auto">
//                   {currentStep < 4 ? (
//                     <button
//                       type="button"
//                       onClick={handleNext}
//                       className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg flex items-center transition"
//                     >
//                       Continue <FiArrowRight className="ml-2" />
//                     </button>
//                   ) : (
//                     <button
//                       type="submit"
//                       className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg flex items-center transition"
//                     >
//                       Confirm <FiCheckCircle className="ml-2" />
//                     </button>
//                   )}
//                 </div>
//               </div>

//               {/* Show any API error from createTransfer */}
//               {apiError && (
//                 <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded">
//                   {apiError}
//                 </div>
//               )}
//             </form>
//           )}

//           {/* ─── If Step 5: render the verification‐code input screen ───────────────────── */}
//           {currentStep === 5 && <RenderVerificationStep />}
//         </>
//       )}
//     </div>
//   );
// };

// export default LocalTransfer;
