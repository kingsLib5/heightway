import React, { useState } from "react";

const LoanApplication = () => {
  const [formData, setFormData] = useState({
    loanAmount: "",
    loanPurpose: "",
    loanTerm: "",
    income: "",
    employmentStatus: "",
    creditScore: "",
    additionalNotes: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.loanAmount) newErrors.loanAmount = "Loan amount is required";
    if (!formData.loanPurpose) newErrors.loanPurpose = "Purpose is required";
    if (!formData.loanTerm) newErrors.loanTerm = "Term is required";
    if (!formData.income) newErrors.income = "Income is required";
    if (!formData.employmentStatus) newErrors.employmentStatus = "Employment status is required";
    if (!formData.creditScore) newErrors.creditScore = "Credit score is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/loans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Loan application submitted successfully!");
        setFormData({
          loanAmount: "",
          loanPurpose: "",
          loanTerm: "",
          income: "",
          employmentStatus: "",
          creditScore: "",
          additionalNotes: "",
        });
      } else {
        alert(data.error || "Submission failed");
      }
    } catch {
      alert("Error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = (hasError) =>
    `w-full px-4 py-3 rounded-xl border-2 shadow-sm focus:ring-2 transition-all duration-200 ${
      hasError
        ? "border-red-400 focus:ring-red-100 bg-red-50"
        : "border-gray-200 focus:border-[#B91C1C] focus:ring-[#B91C1C]/30 hover:border-gray-300"
    }`;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-[#B91C1C] mb-2">Loan Application</h1>
        <p className="text-gray-600">Fill in the details below to apply for your loan</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Loan Details */}
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              name: 'loanAmount',
              label: 'Loan Amount (USD)',
              type: 'number',
              icon: (
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2" />
                </svg>
              ),
            },
            {
              name: 'loanTerm',
              label: 'Loan Term (months)',
              type: 'number',
              icon: (
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14" />
                </svg>
              ),
            },
            {
              name: 'income',
              label: 'Annual Income (USD)',
              type: 'number',
              icon: (
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5v6" />
                </svg>
              ),
            },
            {
              name: 'creditScore',
              label: 'Credit Score (300-850)',
              type: 'number',
              icon: (
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                </svg>
              ),
            },
          ].map(({ name, label, type, icon }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
              <div className="relative">
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className={`${inputClasses(errors[name])} pl-10`}
                  placeholder={label.split(' ')[0]}
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">{icon}</div>
              </div>
              {errors[name] && <p className="mt-2 text-sm text-red-500">{errors[name]}</p>}
            </div>
          ))}
        </div>

        {/* Dropdowns */}
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { name: 'loanPurpose', label: 'Loan Purpose', options: ['Personal', 'Home Mortgage', 'Auto Loan', 'Education'] },
            { name: 'employmentStatus', label: 'Employment Status', options: ['Employed', 'Self-Employed', 'Unemployed', 'Student'] },
          ].map(({ name, label, options }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
              <div className="relative">
                <select
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className={`${inputClasses(errors[name])} pr-10 appearance-none`}
                >
                  <option value="">Select {label.toLowerCase()}</option>
                  {options.map(opt => <option key={opt} value={opt.toLowerCase()}>{opt}</option>)}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {errors[name] && <p className="mt-2 text-sm text-red-500">{errors[name]}</p>}
            </div>
          ))}
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes (optional)</label>
          <textarea
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleChange}
            className={`${inputClasses(false)} resize-y min-h-[120px] w-full`}
            placeholder="Enter any additional details..."
            maxLength={500}
          />
          <div className="mt-1 text-right text-sm text-gray-500">
            {formData.additionalNotes.length}/500
          </div>
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#EF4444] to-[#B91C1C] text-white py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed relative"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                </svg>
                Submit Application
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoanApplication;
