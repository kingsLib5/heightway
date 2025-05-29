import React from 'react';

const Market4 = () => {
  return (
    <div className="relative w-full min-h-screen bg-gray-100">
      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-[95%] md:w-[80%] flex flex-col space-y-[10px]">

        {/* 1. FX Global Intermediary Services */}
        <div className="bg-white shadow-lg p-6 rounded min-h-[180px]">
          <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-indigo-500 pl-2 mb-2">
            FX Global Intermediary Services
          </h2><br />
          <p className="text-gray-600">
            FX Global Intermediary Services
          </p>
        </div>

        {/* 2. Derivatives Clearing Services */}
        <div className="bg-white shadow-lg p-6 rounded min-h-[220px]">
          <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-pink-500 pl-2 mb-2">
            Derivatives Clearing Services
          </h2><br />
          <p className="text-gray-600">
            Execute and clear Futures and Options, as well as clear eligible OTC derivatives, including interest rate swaps (IRS) and credit default swaps (CDS) across nearly 40 global exchanges and clearinghouses (CCPs). 24x6 "follow-the-sun" coverage by low and high touch desks, as well as a comprehensive suite of electronic trading solutions.
          </p>
        </div>

        {/* 3. Structured Products */}
        <div className="bg-white shadow-lg p-6 rounded min-h-[180px]">
          <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-orange-500 pl-2 mb-2">
            Structured Products
          </h2><br />
          <p className="text-gray-600">
            Protect capital, improve yields and more with a range of products tailored by HSBC’s structuring and sales professionals.
          </p>
        </div>

        {/* 4. Emerging Markets */}
        <div className="bg-white shadow-lg p-6 rounded min-h-[180px]">
          <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-emerald-500 pl-2 mb-2">
            Emerging Markets
          </h2><br />
          <p className="text-gray-600">
            Leverage HSBC’s demonstrated knowledge in emerging markets to capitalise on new opportunities for present day and future growth.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Market4;
