import React from 'react';

const Market5 = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100 flex justify-center">
      <div className="w-[95%] md:w-[80%] flex flex-col space-y-[10px] py-10">

        {/* 1. Market1 - Keep positioned */}
        <div className="relative bg-white shadow-lg p-6 rounded min-h-[200px]">
          <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-red-500 pl-2 mb-2">
            Our Terms of Dealing
          </h2><br />
          <p className="text-gray-600">
            The Terms of Dealing documents set out some of the key aspects of the relationship between HSBC and its clients when transacting in various products. These Terms of Dealing documents can be found within the following pages and may be updated from time to time.
          </p>
        </div>

        {/* 2. Brokers */}
        <div className="bg-white shadow-lg p-6 rounded min-h-[200px]">
          <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-blue-500 pl-2 mb-2">
            Our Terms of Dealing for Brokers
          </h2><br />
          <p className="text-gray-600">
            The Terms of Dealing documents set out some of the key aspects of the relationship between HSBC and its brokers when transacting in various products. These Terms of Dealing documents can be found within the following pages and may be updated from time to time.
          </p>
        </div>

        {/* 3. IOSCO */}
        <div className="bg-white shadow-lg p-6 rounded min-h-[140px]">
          <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-yellow-500 pl-2 mb-2">
            IOSCO Principles – Statement of Compliance
          </h2><br />
          <p className="text-gray-600">
            IOSCO Principles – Statement of Compliance
          </p>
        </div>

        {/* 4. Segregated */}
        <div className="bg-white shadow-lg p-6 rounded min-h-[220px]">
          <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-green-500 pl-2 mb-2">
            2022 Segregated, Secured, Sequestered Requirements
          </h2><br />
          <p className="text-gray-600">
            Daily Statement of Segregation Requirements for Customers Trading on U.S Exchanges, Daily Statement of Secured Amounts and Funds held in 30.7 Accounts, and Daily Statement of Cleared Swaps Customer Segregation Requirements and Funds in 4d(f) Accounts
          </p>
        </div>

        {/* 5. ETF */}
        <div className="bg-white shadow-lg p-6 rounded min-h-[180px]">
          <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-indigo-500 pl-2 mb-2">
            ETF Platform Solutions
          </h2><br />
          <p className="text-gray-600">
            Our “All of HSBC” integrated ETF Platform Solutions provides a complete range of services across the full value chain supporting clients in today’s rapidly evolving market.
          </p>
        </div>

        {/* 6. FX */}
        <div className="bg-white shadow-lg p-6 rounded min-h-[200px]">
          <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-pink-500 pl-2 mb-2">
            Foreign Exchange
          </h2><br />
          <p className="text-gray-600">
            HSBC is one of the leading global Foreign Exchange (FX) market makers. Whether your execution needs are driven by a transactional, hedging or investment strategy, you can leverage our global footprint, local knowledge and deep expertise to gain insights and manage your exposure in a manner best aligned with your objectives.
          </p>
        </div>

        {/* 7. FX Overlay */}
        <div className="bg-white shadow-lg p-6 rounded min-h-[160px]">
          <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-orange-500 pl-2 mb-2">
            HSBC FX Overlay
          </h2><br />
          <p className="text-gray-600">
            FX Overlay is an automation and outsourcing solution to help HSBC's clients improve FX hedging efficiency, reduce operational risk and increase transparency.
          </p>
        </div>

        {/* 8. Outsourcing FX Risk */}
        <div className="bg-white shadow-lg p-6 rounded min-h-[220px]">
          <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-teal-500 pl-2 mb-2">
            To Outsource or Not to Outsource Currency Risk Management?
          </h2><br />
          <p className="text-gray-600">
            Managing foreign exchange risk has become a major theme in the current market environment. This renewed focus on FX can be explained by the increase in FX volatility, as well as regulatory scrutiny and a low-yielding investment environment. Whether currency risk is caused by international assets or driven by demand from global investors, taking control of FX exposure is a major challenge for asset owners and managers.
          </p>
        </div>

        {/* 9. HSBC Indonesia */}
        <div className="bg-white shadow-lg p-6 rounded min-h-[120px]">
          <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-purple-500 pl-2 mb-2">
            PT HSBC Sekuritas Indonesia
          </h2><br />
          <p className="text-gray-600">
            PT HSBC Sekuritas Indonesia
          </p>
        </div>

      </div>
    </div>
  );
};

export default Market5;
