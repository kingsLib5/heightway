// // src/components/transfers/InternationalTransfer.jsx

// src/components/transfers/InternationalTransfer.jsx

// src/components/transfers/InternationalTransfer.jsx

import React, { useState, useEffect } from 'react';
import {
  FiUser,
  FiDollarSign,
  FiLock,
  FiCheckCircle,
  FiArrowLeft,
  FiArrowRight,
  FiInfo,
  FiAlertTriangle,
} from 'react-icons/fi';

const InternationalTransfer = ({ onClose }) => {
  // 1. Form fields
  const [formData, setFormData] = useState({
    recipientName: '',
    recipientAccount: '',
    recipientBank: '',
    bankAddress: '',
    branchCode: '',
    recipientRouting: '',
    recipientSwift: '',
    recipientIban: '',
    recipientCountry: '',
    amount: '',
    currency: 'USD',
    transferType: 'Personal',
    transferDate: '',
    reference: '',
    securityPin: '', // Step 4: user types PIN
  });

  // 2. Wizard state (steps: 1=Details, 2=Amount, 3=Review, 4=PIN)
  const [currentStep, setCurrentStep] = useState(1);

  // 3. UI states
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // On mount, set transferDate to today: YYYY-MM-DD
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    setFormData(prev => ({ ...prev, transferDate: today }));
  }, []);

  // Handle input changes
  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  // Validate each step’s required fields
  const validateStep = () => {
    const err = {};

    if (currentStep === 1) {
      if (!formData.recipientName) {
        err.recipientName = 'Recipient name is required.';
      }
      if (!formData.recipientAccount) {
        err.recipientAccount = 'Account number is required.';
      }
      if (!formData.recipientBank) {
        err.recipientBank = 'Bank name is required.';
      }
      if (!formData.recipientSwift) {
        err.recipientSwift = 'SWIFT/BIC code is required.';
      }
      if (!formData.recipientCountry) {
        err.recipientCountry = 'Country is required.';
      }
      if (!formData.bankAddress) {
        err.bankAddress = 'Bank address is required.';
      }
    } else if (currentStep === 2) {
      if (!formData.amount) {
        err.amount = 'Amount is required.';
      } else if (isNaN(parseFloat(formData.amount)) || parseFloat(formData.amount) <= 0) {
        err.amount = 'Enter a valid positive amount.';
      }
    } else if (currentStep === 4) {
      if (!formData.securityPin) {
        err.securityPin = 'Security PIN is required.';
      }
      // No backend PIN-check here; simply validate presence
    }

    return err;
  };

  // Move to next step
  const handleNext = () => {
    const stepErrs = validateStep();
    if (Object.keys(stepErrs).length) {
      setErrors(stepErrs);
      return;
    }
    if (currentStep === 3) {
      setCurrentStep(4);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  // Move to previous step
  const handlePrevious = () => {
    setErrors({});
    setCurrentStep(prev => prev - 1);
  };

  // ================================
  // Step 4: User has entered PIN → immediately show “Account Disabled” message
  // ================================
  const submitPIN = e => {
    e.preventDefault();

    const stepErrs = validateStep();
    if (Object.keys(stepErrs).length) {
      setErrors(stepErrs);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    // Instead of calling backend or going to verification, show the disabled message
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 500); // small delay for UX
  };

  // If we’ve reached final state:
  if (isSubmitted) {
    return (
      <div className="text-center py-8 max-w-xl mx-auto">
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
  }

  // Render the wizard form (except final)
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

        {/* Loading Overlay */}
        {isSubmitting && (
          <div className="fixed inset-0 bg-white/90 z-50 flex flex-col items-center justify-center">
            <div className="animate-spin h-12 w-12 border-4 border-red-600 border-t-transparent rounded-full"></div>
            <p className="mt-4 text-red-600 font-medium">
              Processing...
            </p>
          </div>
        )}

        {!!errors.form && (
          <p className="text-red-500 text-center mb-4">{errors.form}</p>
        )}

        <form
          onSubmit={currentStep === 4 ? submitPIN : e => e.preventDefault()}
          className="space-y-6"
        >
          {/* Progress Bar: 4 steps total */}
          <div className="relative mb-6">
            <div className="absolute inset-y-5 left-0 right-0 h-1 bg-gray-200 rounded"></div>
            <div
              className="absolute inset-y-5 left-0 h-1 bg-red-600 rounded transition-all"
              style={{
                width: `${((currentStep - 1) / (4 - 1)) * 100}%`,
              }}
            />
            <div className="flex justify-between relative z-10">
              {[
                { id: 1, label: 'Details', icon: <FiUser /> },
                { id: 2, label: 'Amount', icon: <FiDollarSign /> },
                { id: 3, label: 'Review', icon: <FiCheckCircle /> },
                { id: 4, label: 'PIN', icon: <FiLock /> },
              ].map(s => (
                <div key={s.id} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 transition ${
                      currentStep >= s.id
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {s.icon}
                  </div>
                  <span
                    className={`text-sm ${
                      currentStep >= s.id ? 'text-gray-800' : 'text-gray-400'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Recipient Details */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="bg-red-50 p-3 rounded-lg flex items-start gap-3">
                <FiInfo className="text-xl text-red-600 mt-1" />
                <p className="text-sm text-gray-600">
                  Enter the recipient’s bank details.
                </p>
              </div>

              <div>
                <label className="block mb-2 text-gray-700">Full Name</label>
                <input
                  name="recipientName"
                  value={formData.recipientName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.recipientName ? 'border-red-500' : 'border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-red-500`}
                  placeholder=""
                />
                {errors.recipientName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.recipientName}
                  </p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-gray-700">
                    Account Number
                  </label>
                  <input
                    name="recipientAccount"
                    value={formData.recipientAccount}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.recipientAccount
                        ? 'border-red-500'
                        : 'border-gray-200'
                    } focus:outline-none focus:ring-2 focus:ring-red-500`}
                    placeholder=""
                  />
                  {errors.recipientAccount && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.recipientAccount}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-gray-700">SWIFT/BIC</label>
                  <input
                    name="recipientSwift"
                    value={formData.recipientSwift}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.recipientSwift
                        ? 'border-red-500'
                        : 'border-gray-200'
                    } focus:outline-none focus:ring-2 focus:ring-red-500`}
                    placeholder=""
                  />
                  {errors.recipientSwift && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.recipientSwift}
                    </p>
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
                      errors.recipientBank
                        ? 'border-red-500'
                        : 'border-gray-200'
                    } focus:outline-none focus:ring-2 focus:ring-red-500`}
                    placeholder=""
                  />
                  {errors.recipientBank && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.recipientBank}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-gray-700">Country</label>
                  <select
                    name="recipientCountry"
                    value={formData.recipientCountry}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.recipientCountry
                        ? 'border-red-500'
                        : 'border-gray-200'
                    } focus:outline-none focus:ring-2 focus:ring-red-500`}
                  >
                    <option value="">Select Country</option>
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
                    <p className="text-red-500 text-sm mt-1">
                      {errors.recipientCountry}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block mb-2 text-gray-700">Bank Address</label>
                <input
                  name="bankAddress"
                  value={formData.bankAddress}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.bankAddress ? 'border-red-500' : 'border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-red-500`}
                  placeholder=""
                />
                {errors.bankAddress && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.bankAddress}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-gray-700">
                  Branch Code <span className="text-gray-400">(optional)</span>
                </label>
                <input
                  name="branchCode"
                  value={formData.branchCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder=""
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-700">IBAN (optional)</label>
                <input
                  name="recipientIban"
                  value={formData.recipientIban}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder=""
                />
              </div>
            </div>
          )}

          {/* Step 2: Amount & Info */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-gray-700">
                  Amount ({formData.currency})
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-400">$</span>
                  <input
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className={`w-full pl-8 pr-4 py-2 rounded-lg border ${
                      errors.amount ? 'border-red-500' : 'border-gray-200'
                    } focus:outline-none focus:ring-2 focus:ring-red-500`}
                    placeholder=""
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
                  <span className="font-semibold">One‐time limit:</span> $500,000
                </p>
                <p className="text-xs text-gray-700">
                  <span className="font-semibold">Daily limit:</span> $1,000,000
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Review All Entered Data */}
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
                <strong>SWIFT/BIC:</strong> {formData.recipientSwift}
              </div>
              <div>
                <strong>IBAN:</strong> {formData.recipientIban || 'N/A'}
              </div>
              <div>
                <strong>Bank Name:</strong> {formData.recipientBank}
              </div>
              <div>
                <strong>Bank Address:</strong> {formData.bankAddress}
              </div>
              <div>
                <strong>Branch Code:</strong> {formData.branchCode || 'N/A'}
              </div>
              <div>
                <strong>Country:</strong> {formData.recipientCountry}
              </div>
              <div>
                <strong>Amount:</strong> ${formData.amount} {formData.currency}
              </div>
              <div>
                <strong>Transfer Type:</strong> {formData.transferType}
              </div>
              <div>
                <strong>Date:</strong> {formData.transferDate}
              </div>
              <div>
                <strong>Reference:</strong> {formData.reference || 'N/A'}
              </div>
              <p className="text-gray-500 mt-4">
                Please confirm that all details are correct before continuing.
              </p>
            </div>
          )}

          {/* Step 4: Security PIN */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="bg-red-50 p-3 rounded-lg">
                <p className="text-sm text-red-800">
                  Enter your 4-digit security PIN to proceed.
                </p>
              </div>
              <div>
                <label className="block mb-2 text-gray-700">
                  Security PIN
                </label>
                <input
                  type="password"
                  name="securityPin"
                  value={formData.securityPin}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.securityPin ? 'border-red-500' : 'border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-red-500`}
                  placeholder="Enter 4-digit PIN"
                />
                {errors.securityPin && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.securityPin}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
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
              {currentStep < 3 && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg flex items-center transition"
                >
                  Continue <FiArrowRight className="ml-2" />
                </button>
              )}

              {currentStep === 3 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg flex items-center transition"
                >
                  Continue <FiArrowRight className="ml-2" />
                </button>
              )}

              {currentStep === 4 && (
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg flex items-center transition"
                >
                  Confirm PIN <FiLock className="ml-2" />
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InternationalTransfer;



// import React, { useState, useEffect } from 'react';
// import {
//   FiUser,
//   FiDollarSign,
//   FiLock,
//   FiCheckCircle,
//   FiArrowLeft,
//   FiArrowRight,
//   FiInfo,
//   FiAlertTriangle,
// } from 'react-icons/fi';

// const InternationalTransfer = ({ onClose }) => {
//   // 1. Form fields (now including recipientEmail)
//   const [formData, setFormData] = useState({
//     recipientEmail: '',    // ← Recipient Email is now part of state
//     recipientName: '',
//     recipientAccount: '',
//     recipientBank: '',
//     bankAddress: '',
//     branchCode: '',
//     recipientRouting: '',
//     recipientSwift: '',
//     recipientIban: '',
//     recipientCountry: '',
//     amount: '',
//     currency: 'USD',
//     transferType: 'Personal',
//     transferDate: '',
//     reference: '',
//     securityPin: '',       // Step 4: user types "0094"
//     verificationCode: '',  // Step 5: user types the emailed code
//   });

//   // 2. Wizard state (steps: 1=Details, 2=Amount, 3=Review, 4=PIN, 5=Verification)
//   const [currentStep, setCurrentStep] = useState(1);

//   // 3. UI states
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   // Store the newly‐created transfer’s _id so we can call /:id/verify
//   const [createdTransferId, setCreatedTransferId] = useState(null);

//   // After verifying code successfully, backend sets status → "Pending"
//   const [approvalStatus, setApprovalStatus] = useState('PendingVerification');

//   // On mount, set transferDate to today: YYYY-MM-DD
//   useEffect(() => {
//     const today = new Date().toISOString().slice(0, 10);
//     setFormData((prev) => ({ ...prev, transferDate: today }));
//   }, []);

//   // Handle input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: '' }));
//   };

//   // Basic email‐format check
//   const isValidEmail = (email) => {
//     // Simple regex; adjust if you need more strict validation
//     return /\S+@\S+\.\S+/.test(email);
//   };

//   // Validate each step’s required fields
//   const validateStep = () => {
//     const err = {};

//     if (currentStep === 1) {
//       // Step 1: recipientEmail, recipientName, recipientAccount, recipientBank, recipientSwift, recipientCountry, bankAddress
//       // if (!formData.recipientEmail) {
//       //   err.recipientEmail = 'Recipient email is required.';
//       // } else if (!isValidEmail(formData.recipientEmail)) {
//       //   err.recipientEmail = 'Enter a valid email address.';
//       // }

//       if (!formData.recipientName) {
//         err.recipientName = 'Recipient name is required.';
//       }
//       if (!formData.recipientAccount) {
//         err.recipientAccount = 'Account number is required.';
//       }
//       if (!formData.recipientBank) {
//         err.recipientBank = 'Bank name is required.';
//       }
//       if (!formData.recipientSwift) {
//         err.recipientSwift = 'SWIFT/BIC code is required.';
//       }
//       if (!formData.recipientCountry) {
//         err.recipientCountry = 'Country is required.';
//       }
//       if (!formData.bankAddress) {
//         err.bankAddress = 'Bank address is required.';
//       }
//     } else if (currentStep === 2) {
//       // Step 2: amount must be a positive number
//       if (!formData.amount) {
//         err.amount = 'Amount is required.';
//       } else if (isNaN(parseFloat(formData.amount)) || parseFloat(formData.amount) <= 0) {
//         err.amount = 'Enter a valid positive amount.';
//       }
//     } else if (currentStep === 4) {
//       // Step 4: securityPin
//       if (!formData.securityPin) {
//         err.securityPin = 'Security PIN is required.';
//       }
//       // We do NOT check correctness here; backend will validate it.
//     } else if (currentStep === 5) {
//       // Step 5: verificationCode
//       if (!formData.verificationCode) {
//         err.verificationCode = 'Verification code is required.';
//       }
//     }

//     return err;
//   };

//   // Move to next step (or submit for certain steps)
//   const handleNext = () => {
//     const stepErrs = validateStep();
//     if (Object.keys(stepErrs).length) {
//       setErrors(stepErrs);
//       return;
//     }
//     // If we’re on Step 3 (Review) → Step 4 is entering PIN
//     if (currentStep === 3) {
//       setCurrentStep(4);
//     } else {
//       setCurrentStep((prev) => prev + 1);
//     }
//   };

//   // Move to previous step
//   const handlePrevious = () => {
//     setErrors({});
//     setCurrentStep((prev) => prev - 1);
//   };

//   // ================================
//   // Step 4: User has entered PIN → call backend to create Transfer (and email code)
//   // ================================
//   const submitPINAndCreateTransfer = async (e) => {
//     e.preventDefault();

//     const stepErrs = validateStep();
//     if (Object.keys(stepErrs).length) {
//       setErrors(stepErrs);
//       return;
//     }

//     setIsSubmitting(true);
//     setErrors({});

//     try {
//       // 1) Read the JWT from localStorage (must match key used in Login.jsx)
//       const token = localStorage.getItem('jwtToken');

//       // 2) Guard: if no token, show an error and stop
//       if (!token) {
//         setErrors({ form: 'You must be logged in to perform this action.' });
//         setIsSubmitting(false);
//         return;
//       }

//       // 3) Build the payload exactly as before
//       const payload = {
//         recipientEmail: "N/A",
//         recipientName: formData.recipientName.trim(),
//         recipientAccount: formData.recipientAccount.trim(),
//         recipientBank: formData.recipientBank.trim(),
//         bankAddress: formData.bankAddress.trim(),
//         branchCode: formData.branchCode.trim(),
//         recipientRouting: formData.recipientRouting.trim(),
//         recipientSwift: formData.recipientSwift.trim(),
//         recipientIban: formData.recipientIban.trim(),
//         recipientCountry: formData.recipientCountry,
//         amount: parseFloat(formData.amount),
//         currency: formData.currency,
//         transferType: formData.transferType,
//         transferDate: formData.transferDate,
//         reference: formData.reference.trim(),
//         securityPin: formData.securityPin.trim(),
//       };

//       // 4) Call the protected endpoint (/api/transfers), including the Authorization header
//       const res = await fetch('https://hsbc-online-backend.onrender.com/api/transfers', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`, // ← using the real JWT now
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) {
//         const errData = await res.json();
//         throw new Error(errData.message || 'Failed to create transfer.');
//       }

//       const created = await res.json();
//       setCreatedTransferId(created._id);
//       setApprovalStatus(created.status); // "PendingVerification"
//       setCurrentStep(5);
//     } catch (err) {
//       console.error('[submitPINAndCreateTransfer] Error:', err);
//       setErrors({ securityPin: err.message });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // ================================
//   // Step 5: User types verificationCode → call backend to verify
//   // ================================
//   const handleVerifyCode = async (e) => {
//     e.preventDefault();

//     const stepErrs = validateStep();
//     if (Object.keys(stepErrs).length) {
//       setErrors(stepErrs);
//       return;
//     }

//     if (!createdTransferId) {
//       setErrors({ form: 'No transfer ID available. Please restart the flow.' });
//       return;
//     }

//     setIsSubmitting(true);
//     setErrors({});

//     try {
//       const res = await fetch(
//         `https://hsbc-online-backend.onrender.com/api/transfers/${createdTransferId}/verify`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ verificationCode: formData.verificationCode.trim() }),
//         }
//       );

//       if (!res.ok) {
//         const errData = await res.json();
//         throw new Error(errData.message || 'Verification failed.');
//       }

//       const updated = await res.json();
//       setApprovalStatus(updated.status); // should now be "Pending"
//       setIsSubmitted(true);

//       // Auto-close after 3 seconds
//       setTimeout(onClose, 3000);
//     } catch (err) {
//       console.error('[handleVerifyCode] Error:', err);
//       setErrors({ verificationCode: err.message });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // If we’ve reached final success state:
//   if (isSubmitted) {
//     return (
//       <div className="text-center py-8 max-w-xl mx-auto">
//         <FiCheckCircle className="mx-auto mb-4 text-yellow-500 text-5xl animate-pulse" />
//         <h2 className="text-2xl font-semibold text-gray-800 mb-2">
//           Transfer {approvalStatus === 'Pending' ? 'Pending' : approvalStatus}!
//         </h2>
//         <p className="text-gray-600 mb-6">
//           {approvalStatus === 'Pending'
//             ? "Verification successful. We’ll notify you once it’s approved."
//             : 'Funds will arrive within 1–3 business days.'}
//         </p>
//         <button
//           onClick={onClose}
//           className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition"
//         >
//           Back to Dashboard
//         </button>
//       </div>
//     );
//   }

//   // Render the wizard form (except final success)
//   return (
//     <div className="p-4 max-w-xl mx-auto">
//       <div className="max-h-[80vh] overflow-y-auto scroll-container">
//         <style jsx>{`
//           .scroll-container {
//             scrollbar-width: thin;
//             scrollbar-color: #c53030 #f1f1f1;
//           }
//           .scroll-container::-webkit-scrollbar {
//             width: 10px;
//           }
//           .scroll-container::-webkit-scrollbar-track {
//             background: #f8f8f8;
//             border-radius: 10px;
//           }
//           .scroll-container::-webkit-scrollbar-thumb {
//             background-color: #c53030;
//             border-radius: 10px;
//             border: 2px solid #f8f8f8;
//             background-clip: padding-box;
//           }
//           .scroll-container::-webkit-scrollbar-thumb:hover {
//             background-color: #9b2c2c;
//           }
//         `}</style>

//         {/* Loading Overlay */}
//         {isSubmitting && (
//           <div className="fixed inset-0 bg-white/90 z-50 flex flex-col items-center justify-center">
//             <div className="animate-spin h-12 w-12 border-4 border-red-600 border-t-transparent rounded-full"></div>
//             <p className="mt-4 text-red-600 font-medium">
//               {currentStep < 5 ? 'Processing...' : 'Verifying code...'}
//             </p>
//           </div>
//         )}

//         {/* Show a form‐level error if present */}
//         {!!errors.form && (
//           <p className="text-red-500 text-center mb-4">{errors.form}</p>
//         )}

//         <form
//           onSubmit={
//             currentStep === 4
//               ? submitPINAndCreateTransfer
//               : currentStep === 5
//               ? handleVerifyCode
//               : (e) => e.preventDefault()
//           }
//           className="space-y-6"
//         >
//           {/* Progress Bar: 5 steps total */}
//           <div className="relative mb-6">
//             <div className="absolute inset-y-5 left-0 right-0 h-1 bg-gray-200 rounded"></div>
//             <div
//               className="absolute inset-y-5 left-0 h-1 bg-red-600 rounded transition-all"
//               style={{
//                 width: `${((currentStep - 1) / (5 - 1)) * 100}%`,
//               }}
//             />
//             <div className="flex justify-between relative z-10">
//               {[
//                 { id: 1, label: 'Details', icon: <FiUser /> },
//                 { id: 2, label: 'Amount', icon: <FiDollarSign /> },
//                 { id: 3, label: 'Review', icon: <FiCheckCircle /> },
//                 { id: 4, label: 'PIN', icon: <FiLock /> },
//                 { id: 5, label: 'Code', icon: <FiLock /> },
//               ].map((s) => (
//                 <div key={s.id} className="flex flex-col items-center">
//                   <div
//                     className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 transition ${
//                       currentStep >= s.id
//                         ? 'bg-red-600 text-white'
//                         : 'bg-gray-100 text-gray-400'
//                     }`}
//                   >
//                     {s.icon}
//                   </div>
//                   <span
//                     className={`text-sm ${
//                       currentStep >= s.id ? 'text-gray-800' : 'text-gray-400'
//                     }`}
//                   >
//                     {s.label}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Step 1: Recipient Details (now includes Email) */}
//           {currentStep === 1 && (
//             <div className="space-y-4">
//               <div className="bg-red-50 p-3 rounded-lg flex items-start gap-3">
//                 <FiInfo className="text-xl text-red-600 mt-1" />
//                 <p className="text-sm text-gray-600">
//                   Enter the recipient’s bank details.
//                 </p>
//               </div>

//               {/* Recipient Email */}
//               {/* <div>
//                 <label className="block mb-2 text-gray-700">Email</label>
//                 <input
//                   type="email"
//                   name="recipientEmail"
//                   value={formData.recipientEmail}
//                   onChange={handleInputChange}
//                   className={`w-full px-4 py-2 rounded-lg border ${
//                     errors.recipientEmail ? 'border-red-500' : 'border-gray-200'
//                   } focus:outline-none focus:ring-2 focus:ring-red-500`}
//                   placeholder="recipient@example.com"
//                 />
//                 {errors.recipientEmail && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.recipientEmail}
//                   </p>
//                 )}
//               </div> */}

//               {/* Recipient Name */}
//               <div>
//                 <label className="block mb-2 text-gray-700">Full Name</label>
//                 <input
//                   name="recipientName"
//                   value={formData.recipientName}
//                   onChange={handleInputChange}
//                   className={`w-full px-4 py-2 rounded-lg border ${
//                     errors.recipientName ? 'border-red-500' : 'border-gray-200'
//                   } focus:outline-none focus:ring-2 focus:ring-red-500`}
//                   placeholder=""
//                 />
//                 {errors.recipientName && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.recipientName}
//                   </p>
//                 )}
//               </div>

//               <div className="grid md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block mb-2 text-gray-700">
//                     Account Number
//                   </label>
//                   <input
//                     name="recipientAccount"
//                     value={formData.recipientAccount}
//                     onChange={handleInputChange}
//                     className={`w-full px-4 py-2 rounded-lg border ${
//                       errors.recipientAccount
//                         ? 'border-red-500'
//                         : 'border-gray-200'
//                     } focus:outline-none focus:ring-2 focus:ring-red-500`}
//                     placeholder=""
//                   />
//                   {errors.recipientAccount && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {errors.recipientAccount}
//                     </p>
//                   )}
//                 </div>
//                 <div>
//                   <label className="block mb-2 text-gray-700">SWIFT/BIC</label>
//                   <input
//                     name="recipientSwift"
//                     value={formData.recipientSwift}
//                     onChange={handleInputChange}
//                     className={`w-full px-4 py-2 rounded-lg border ${
//                       errors.recipientSwift
//                         ? 'border-red-500'
//                         : 'border-gray-200'
//                     } focus:outline-none focus:ring-2 focus:ring-red-500`}
//                     placeholder=""
//                   />
//                   {errors.recipientSwift && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {errors.recipientSwift}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div className="grid md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block mb-2 text-gray-700">Bank Name</label>
//                   <input
//                     name="recipientBank"
//                     value={formData.recipientBank}
//                     onChange={handleInputChange}
//                     className={`w-full px-4 py-2 rounded-lg border ${
//                       errors.recipientBank
//                         ? 'border-red-500'
//                         : 'border-gray-200'
//                     } focus:outline-none focus:ring-2 focus:ring-red-500`}
//                     placeholder=""
//                   />
//                   {errors.recipientBank && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {errors.recipientBank}
//                     </p>
//                   )}
//                 </div>
//                 <div>
//                   <label className="block mb-2 text-gray-700">Country</label>
//                   <select
//                     name="recipientCountry"
//                     value={formData.recipientCountry}
//                     onChange={handleInputChange}
//                     className={`w-full px-4 py-2 rounded-lg border ${
//                       errors.recipientCountry
//                         ? 'border-red-500'
//                         : 'border-gray-200'
//                     } focus:outline-none focus:ring-2 focus:ring-red-500`}
//                   >
//                     <option value="">Select Country</option>
//                     <option value="US">United States</option>
//                     <option value="GB">United Kingdom</option>
//                     <option value="DE">Germany</option>
//                     <option value="CN">China</option>
//                     <option value="JP">Japan</option>
//                     <option value="TW">Taiwan</option>
//                     <option value="HK">Hong Kong</option>
//                     <option value="PH">Philippines</option>
//                     <option value="VN">Vietnam</option>
//                     <option value="ID">Indonesia</option>
//                     <option value="TH">Thailand</option>
//                     <option value="MY">Malaysia</option>
//                     <option value="SG">Singapore</option>
//                     <option value="MM">Myanmar (Burma)</option>
//                     <option value="KH">Cambodia</option>
//                     <option value="LA">Laos</option>
//                     <option value="BN">Brunei</option>
//                     <option value="AE">United Arab Emirates (UAE)</option>
//                     <option value="SA">Saudi Arabia</option>
//                     <option value="QA">Qatar</option>
//                     <option value="KW">Kuwait</option>
//                     <option value="OM">Oman</option>
//                     <option value="BH">Bahrain</option>
//                     <option value="IL">Israel</option>
//                     <option value="TR">Turkey</option>
//                     <option value="JO">Jordan</option>
//                     <option value="LB">Lebanon</option>
//                     <option value="PK">Pakistan</option>
//                     <option value="BD">Bangladesh</option>
//                     <option value="NP">Nepal</option>
//                     <option value="LK">Sri Lanka</option>
//                     <option value="MV">Maldives</option>
//                   </select>
//                   {errors.recipientCountry && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {errors.recipientCountry}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div>
//                 <label className="block mb-2 text-gray-700">Bank Address</label>
//                 <input
//                   name="bankAddress"
//                   value={formData.bankAddress}
//                   onChange={handleInputChange}
//                   className={`w-full px-4 py-2 rounded-lg border ${
//                     errors.bankAddress ? 'border-red-500' : 'border-gray-200'
//                   } focus:outline-none focus:ring-2 focus:ring-red-500`}
//                   placeholder=""
//                 />
//                 {errors.bankAddress && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.bankAddress}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label className="block mb-2 text-gray-700">
//                   Branch Code <span className="text-gray-400">(optional)</span>
//                 </label>
//                 <input
//                   name="branchCode"
//                   value={formData.branchCode}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
//                   placeholder=""
//                 />
//               </div>

//               <div>
//                 <label className="block mb-2 text-gray-700">IBAN (optional)</label>
//                 <input
//                   name="recipientIban"
//                   value={formData.recipientIban}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
//                   placeholder=""
//                 />
//               </div>
//             </div>
//           )}

//           {/* Step 2: Amount & Info */}
//           {currentStep === 2 && (
//             <div className="space-y-4">
//               <div>
//                 <label className="block mb-2 text-gray-700">
//                   Amount ({formData.currency})
//                 </label>
//                 <div className="relative">
//                   <span className="absolute left-3 top-2 text-gray-400">$</span>
//                   <input
//                     name="amount"
//                     value={formData.amount}
//                     onChange={handleInputChange}
//                     className={`w-full pl-8 pr-4 py-2 rounded-lg border ${
//                       errors.amount ? 'border-red-500' : 'border-gray-200'
//                     } focus:outline-none focus:ring-2 focus:ring-red-500`}
//                     placeholder=""
//                   />
//                 </div>
//                 {errors.amount && (
//                   <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
//                 )}
//               </div>
//               <div className="bg-red-50 p-3 rounded-lg space-y-1">
//                 <p className="text-sm text-red-800">
//                   Exchange rate: 1 USD = 0.85 EUR
//                 </p>
//                 <p className="text-xs text-gray-700">
//                   <span className="font-semibold">One‐time limit:</span> $500,000
//                 </p>
//                 <p className="text-xs text-gray-700">
//                   <span className="font-semibold">Daily limit:</span> $1,000,000
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* Step 3: Review All Entered Data */}
//           {currentStep === 3 && (
//             <div className="space-y-4 text-sm text-gray-700">
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">
//                 Review Transfer Details
//               </h3>
//               <div>
//                 <strong>Recipient Email:</strong> {formData.recipientEmail}
//               </div>
//               <div>
//                 <strong>Recipient Name:</strong> {formData.recipientName}
//               </div>
//               <div>
//                 <strong>Account Number:</strong> {formData.recipientAccount}
//               </div>
//               <div>
//                 <strong>SWIFT/BIC:</strong> {formData.recipientSwift}
//               </div>
//               <div>
//                 <strong>IBAN:</strong> {formData.recipientIban || 'N/A'}
//               </div>
//               <div>
//                 <strong>Bank Name:</strong> {formData.recipientBank}
//               </div>
//               <div>
//                 <strong>Bank Address:</strong> {formData.bankAddress}
//               </div>
//               <div>
//                 <strong>Branch Code:</strong> {formData.branchCode || 'N/A'}
//               </div>
//               <div>
//                 <strong>Country:</strong> {formData.recipientCountry}
//               </div>
//               <div>
//                 <strong>Amount:</strong> ${formData.amount} {formData.currency}
//               </div>
//               <div>
//                 <strong>Transfer Type:</strong> {formData.transferType}
//               </div>
//               <div>
//                 <strong>Date:</strong> {formData.transferDate}
//               </div>
//               <div>
//                 <strong>Reference:</strong> {formData.reference || 'N/A'}
//               </div>
//               <p className="text-gray-500 mt-4">
//                 Please confirm that all details are correct before continuing.
//               </p>
//             </div>
//           )}

//           {/* Step 4: Security PIN */}
//           {currentStep === 4 && (
//             <div className="space-y-4">
//               <div className="bg-red-50 p-3 rounded-lg">
//                 <p className="text-sm text-red-800">
//                   Enter your 4-digit security PIN to generate a verification code.
//                   We sent the code to your email the code.
//                 </p>
//               </div>
//               <div>
//                 <label className="block mb-2 text-gray-700">Security PIN</label>
//                 <input
//                   type="password"
//                   name="securityPin"
//                   value={formData.securityPin}
//                   onChange={handleInputChange}
//                   className={`w-full px-4 py-2 rounded-lg border ${
//                     errors.securityPin ? 'border-red-500' : 'border-gray-200'
//                   } focus:outline-none focus:ring-2 focus:ring-red-500`}
//                   placeholder="Enter 4-digit PIN"
//                 />
//                 {errors.securityPin && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.securityPin}
//                   </p>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Step 5: Verification Code */}
//           {currentStep === 5 && (
//             <div className="space-y-4">
//               <div className="bg-red-50 p-3 rounded-lg">
//                 <p className="text-sm text-red-800">
//                   A 6-digit verification code has been emailed to{' '}
//                   <strong>jamesphilips0480@gmail.com</strong>. Enter it below to verify your transfer.
//                 </p>
//               </div>
//               <div>
//                 <label className="block mb-2 text-gray-700">
//                   Verification Code
//                 </label>
//                 <input
//                   name="verificationCode"
//                   value={formData.verificationCode}
//                   onChange={handleInputChange}
//                   className={`w-full px-4 py-2 rounded-lg border ${
//                     errors.verificationCode ? 'border-red-500' : 'border-gray-200'
//                   } focus:outline-none focus:ring-2 focus:ring-red-500`}
//                   placeholder="Enter 6-digit code"
//                 />
//                 {errors.verificationCode && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.verificationCode}
//                   </p>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Navigation Buttons */}
//           <div className="flex justify-between pt-4 border-t border-gray-200">
//             {currentStep > 1 && (
//               <button
//                 type="button"
//                 onClick={handlePrevious}
//                 className="flex items-center text-gray-600 hover:text-red-600 transition"
//               >
//                 <FiArrowLeft className="mr-2" /> Back
//               </button>
//             )}
//             <div className="ml-auto">
//               {currentStep < 4 && (
//                 <button
//                   type="button"
//                   onClick={handleNext}
//                   className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg flex items-center transition"
//                 >
//                   Continue <FiArrowRight className="ml-2" />
//                 </button>
//               )}

//               {currentStep === 4 && (
//                 <button
//                   type="submit"
//                   className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg flex items-center transition"
//                 >
//                   Generate Code <FiArrowRight className="ml-2" />
//                 </button>
//               )}

//               {currentStep === 5 && (
//                 <button
//                   type="submit"
//                   className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg flex items-center transition"
//                 >
//                   Verify <FiCheckCircle className="ml-2" />
//                 </button>
//               )}
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default InternationalTransfer;
