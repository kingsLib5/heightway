import React, { useState } from "react";
import Modal from "../Modal/Modal";
import PayBillsForm from "../Forms/PayBills";

const PayBills = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="container mx-auto px-4 py-10 max-w-7xl">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#B91C1C] mb-4">
          Smart Bill Payments
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Manage all your bill payments in one place with instant processing and real-time tracking
        </p>
      </div>

      {/* Action Card */}
      <div className="bg-gradient-to-r from-[#EF4444] to-[#B91C1C] rounded-2xl p-8 mb-12 shadow-xl transform hover:scale-105 transition-transform">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-6">
            <svg className="w-16 h-16 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-white mb-4">
            Pay Bills in 3 Simple Steps
          </h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-[#B91C1C] px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all shadow-md"
          >
            Start Payment Now
          </button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {[
          {
            title: "Instant Processing",
            content: "Real-time payment verification and confirmation",
            icon: "M5 13l4 4L19 7",
          },
          {
            title: "Secure Transactions",
            content: "Bank-grade encryption and 2FA protection",
            icon:
              "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
          },
          {
            title: "24/7 Support",
            content: "Dedicated customer support team available anytime",
            icon:
              "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",
          },
        ].map((feature, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow"
          >
            <div className="w-12 h-12 bg-[#B91C1C] rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.content}</p>
          </div>
        ))}
      </div>

      {/* Bill Categories */}
      <div className="mb-16">
        <h3 className="text-3xl font-bold text-[#B91C1C] mb-8 text-center">
          Popular Payment Categories
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            { title: "Electricity", icon: "M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" },
            { title: "Water", icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" },
            { title: "Internet", icon: "M12 6v6m0 0v6m0-6h6m-6 0H6" },
            { title: "Rent", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
            { title: "Insurance", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
            { title: "Education", icon: "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" },
          ].map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setIsModalOpen(true)}
              className="group bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
            >
              <div className="w-full aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                <svg className="w-8 h-8 text-[#B91C1C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={cat.icon} />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-[#B91C1C] transition-colors">
                {cat.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Enhanced Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="New Bill Payment"
        maxWidth="max-w-2xl"
      >
        <div className="bg-gradient-to-b from-[#B91C1C]/10 to-white/50 p-6 rounded-lg">
          <PayBillsForm onClose={() => setIsModalOpen(false)} />
        </div>
      </Modal>
    </div>
  );
};

export default PayBills;
