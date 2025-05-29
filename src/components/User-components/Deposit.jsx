import React, { useState } from "react";
import Modal from "../../components/Modal/Modal";

const Deposit = () => {
  // State management
  const [showCheckModal, setShowCheckModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [expectedDate, setExpectedDate] = useState("");
  const [copiedField, setCopiedField] = useState("");

  // Copy to clipboard functionality
  const handleCopy = async (label, value) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(label);
      setTimeout(() => setCopiedField(""), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  // Business day calculation
  const calculateNextBusinessDay = (startDate, daysToAdd) => {
    let currentDate = new Date(startDate);
    let addedDays = 0;

    while (addedDays < daysToAdd) {
      currentDate.setDate(currentDate.getDate() + 1);
      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        addedDays++;
      }
    }

    return currentDate;
  };

  // Check submission handler
  const handleSubmitCheck = () => {
    setIsLoading(true);
    const today = new Date();
    const nextBusinessDay = calculateNextBusinessDay(today, 3);
    const formattedDate = nextBusinessDay.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    setTimeout(() => {
      setExpectedDate(formattedDate);
      setIsLoading(false);
      setShowSuccess(true);
    }, 5000);
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Deposit Funds</h2>
        <p className="text-gray-600">Choose your preferred deposit method</p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bank Transfer Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 rounded-t-xl">
            <h5 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Bank Transfer
            </h5>
          </div>
          <div className="p-6">
            <p className="text-gray-600 mb-4 text-sm">
              Transfer funds from another bank using these details:
            </p>

            {[
              { label: "Bank Name", value: "HSBC Bank", icon: "🏦" },
              { label: "Routing Number", value: "123456789", icon: "🔗" },
              { label: "Account Number", value: "9876543210", icon: "🔢" },
            ].map((field) => (
              <div
                key={field.label}
                className="group flex justify-between items-center bg-gray-50 hover:bg-gray-100 rounded-lg p-4 mb-3 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-gray-500">{field.icon}</span>
                  <div>
                    <div className="text-xs text-gray-500">{field.label}</div>
                    <div className="text-gray-800 font-medium">{field.value}</div>
                  </div>
                </div>
                <button
                  className="text-sm text-red-600 hover:text-red-700 px-3 py-1.5 rounded-md hover:bg-red-50 transition-colors"
                  onClick={() => handleCopy(field.label, field.value)}
                >
                  {copiedField === field.label ? "✓ Copied" : "Copy"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Check Deposit Section */}
        <div className="bg-gradient-to-b from-red-50 to-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Mobile Check Deposit</h3>
            <p className="text-gray-600 text-sm mb-6">Snap photos of your check to deposit</p>
            <button
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              onClick={() => setShowCheckModal(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
              Deposit Check
            </button>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="mt-12 bg-white border border-gray-200 rounded-xl p-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          How It Works
        </h3>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: "Bank Transfer", text: "Use provided details to transfer from another bank", icon: "🔄" },
            { title: "Check Deposit", text: "Upload check images through our secure portal", icon: "📸" },
            { title: "Processing", text: "Funds typically available within 1-3 business days", icon: "⏳" },
          ].map((step, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center text-2xl">
                {step.icon}
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-1">{step.title}</h4>
                <p className="text-gray-600 text-sm">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Check Deposit Modal */}
      <Modal
        isOpen={showCheckModal}
        onClose={() => {
          setShowCheckModal(false);
          setShowSuccess(false);
          setIsLoading(false);
        }}
        title="Mobile Check Deposit"
      >
        {!showSuccess ? (
          !isLoading ? (
            <>
              <div className="space-y-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">
                    Ensure the check is signed and dated. Photos must show entire check with flat edges visible.
                  </p>
                </div>

                {/* Front Check Upload */}
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center cursor-pointer hover:border-red-200 transition-colors">
                  <div className="mb-4 text-red-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="mb-2 font-medium text-gray-800">Front of Check</div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    capture="environment" 
                    className="hidden" 
                    id="frontInput" 
                    onChange={(e) => console.log(e.target.files[0])} // Add actual file handling
                  />
                  <label htmlFor="frontInput" className="inline-block text-red-600 hover:text-red-700 text-sm font-medium cursor-pointer">
                    Upload Front Photo
                  </label>
                </div>

                {/* Back Check Upload */}
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center cursor-pointer hover:border-red-200 transition-colors">
                  <div className="mb-4 text-red-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="mb-2 font-medium text-gray-800">Back of Check</div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    capture="environment" 
                    className="hidden" 
                    id="backInput" 
                    onChange={(e) => console.log(e.target.files[0])} // Add actual file handling
                  />
                  <label htmlFor="backInput" className="inline-block text-red-600 hover:text-red-700 text-sm font-medium cursor-pointer">
                    Upload Back Photo
                  </label>
                </div>

                <button
                  onClick={handleSubmitCheck}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  Submit Check Deposit
                </button>
              </div>
            </>
          ) : (
            // Loading State
            <div className="text-center py-8 space-y-4">
              <div className="animate-spin mx-auto text-red-600" style={{ width: '40px', height: '40px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <p className="text-gray-600">Securely processing your check...</p>
            </div>
          )
        ) : (
          // Success State
          <div className="text-center p-6">
            <div className="text-green-600 text-4xl mb-4">✓</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Deposit Received!</h3>
            <p className="text-gray-600">
              Your check is being processed. Funds should be available by{" "}
              <span className="font-medium text-gray-800">{expectedDate}</span>.
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Deposit;