import React, { useState, useEffect } from "react";

const PayBills = ({ onClose }) => {
  const [formData, setFormData] = useState({
    billerName: "",
    billerAccount: "",
    amountDue: "",
    paymentDate: "",
    paymentType: "One-Time",
    securityPin: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const currentDate = new Date().toISOString().slice(0, 10);
    setFormData((prevData) => ({
      ...prevData,
      paymentDate: currentDate,
    }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateStep = () => {
    const stepErrors = {};
    if (currentStep === 1) {
      if (!formData.billerName) stepErrors.billerName = "Biller name is required.";
      if (!formData.billerAccount) stepErrors.billerAccount = "Biller account number is required.";
    } else if (currentStep === 2) {
      if (!formData.amountDue) stepErrors.amountDue = "Amount due is required.";
    } else if (currentStep === 3) {
      if (!formData.securityPin) stepErrors.securityPin = "Security PIN is required.";
    }
    return stepErrors;
  };

  const handleNext = () => {
    const stepErrors = validateStep();
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const stepErrors = validateStep();
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
    } else {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setTimeout(() => onClose(), 3000);
      }, 5000);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#B91C1C]">Pay Bills</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
      </div>

      {/* Progress Steps */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((step) => (
            <React.Fragment key={step}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center 
                ${currentStep >= step ? "bg-[#B91C1C] text-white" : "bg-gray-200 text-gray-500"}`}>
                {step}
              </div>
              {step < 3 && (
                <div className={`flex-1 h-1 mx-1 ${currentStep > step ? "bg-[#B91C1C]" : "bg-gray-200"}`}></div>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>Biller Info</span>
          <span>Payment</span>
          <span>Confirm</span>
        </div>
      </div>

      {/* Loading State */}
      {isSubmitting && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#B91C1C] border-t-transparent"></div>
          <p className="mt-4 text-[#B91C1C] font-medium">Processing Payment...</p>
        </div>
      )}

      {/* Success Message */}
      {isSubmitted && (
        <div className="flex flex-col items-center justify-center py-12">
          <svg className="w-16 h-16 text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Payment Successful!</h3>
          <p className="text-gray-600">Your payment has been processed.</p>
        </div>
      )}

      {/* Form */}
      {!isSubmitting && !isSubmitted && (
        <form onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Biller Name</label>
                <input
                  type="text"
                  name="billerName"
                  value={formData.billerName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 mt-1 border rounded-lg ${errors.billerName ? "border-red-500" : "border-gray-300 focus:border-[#B91C1C]"} focus:ring-2 focus:ring-[#B91C1C]/30`}
                  placeholder="Enter biller name"
                />
                {errors.billerName && <p className="mt-1 text-sm text-red-600">{errors.billerName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Biller Account</label>
                <input
                  type="text"
                  name="billerAccount"
                  value={formData.billerAccount}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 mt-1 border rounded-lg ${errors.billerAccount ? "border-red-500" : "border-gray-300 focus:border-[#B91C1C]"} focus:ring-2 focus:ring-[#B91C1C]/30`}
                  placeholder="Enter biller account"
                />
                {errors.billerAccount && <p className="mt-1 text-sm text-red-600">{errors.billerAccount}</p>}
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="w-full bg-[#B91C1C] text-white py-3 rounded-lg hover:bg-red-700 transition-colors"
              >
                Continue
              </button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Amount Due</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    name="amountDue"
                    value={formData.amountDue}
                    onChange={handleInputChange}
                    className={`w-full pl-8 pr-4 py-3 mt-1 border rounded-lg ${errors.amountDue ? "border-red-500" : "border-gray-300 focus:border-[#B91C1C]"} focus:ring-2 focus:ring-[#B91C1C]/30`}
                    placeholder="0.00"
                  />
                </div>
                {errors.amountDue && <p className="mt-1 text-sm text-red-600">{errors.amountDue}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Payment Date</label>
                <input
                  type="date"
                  name="paymentDate"
                  value={formData.paymentDate}
                  disabled
                  className="w-full px-4 py-3 mt-1 border border-gray-200 bg-gray-100 rounded-lg text-gray-600"
                />
              </div>

              <div className="flex gap-4">
                <button type="button" onClick={handlePrevious} className="w-1/2 py-3 border rounded-lg text-gray-700 hover:bg-gray-100">
                  Back
                </button>
                <button type="button" onClick={handleNext} className="w-1/2 bg-[#B91C1C] text-white py-3 rounded-lg hover:bg-red-700">
                  Continue
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Security PIN</label>
                <input
                  type="password"
                  name="securityPin"
                  value={formData.securityPin}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 mt-1 border rounded-lg ${errors.securityPin ? "border-red-500" : "border-gray-300 focus:border-[#B91C1C]"} focus:ring-2 focus:ring-[#B91C1C]/30`}
                  placeholder="••••"
                  maxLength="4"
                />
                {errors.securityPin && <p className="mt-1 text-sm text-red-600">{errors.securityPin}</p>}
              </div>

              <div className="flex gap-4">
                <button type="button" onClick={handlePrevious} className="w-1/2 py-3 border rounded-lg text-gray-700 hover:bg-gray-100">
                  Back
                </button>
                <button type="submit" className="w-1/2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
                  Confirm Payment
                </button>
              </div>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default PayBills;
