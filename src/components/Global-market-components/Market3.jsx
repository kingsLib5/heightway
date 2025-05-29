import React from 'react';

const Market3 = () => {
  return (
    <div className="relative w-full min-h-screen bg-gray-100">
      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-[95%] md:w-[80%] flex flex-col space-y-[10px]">

        {/* 1. Rates */}
        <div className="bg-white shadow-lg p-6 rounded min-h-[230px]">
          <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-blue-500 pl-2 mb-2">
            Rates
          </h2><br />
          <p className="text-gray-600 mb-2">
            Take advantage of HSBC’s far-reaching presence and extensive product knowledge in the rates markets to gain access to global liquidity and streamline transactions. To help you access global liquidity and transact seamlessly, the HSBC Global Rates group provides debt issuance, financing, innovative risk management and investment solutions through a broad selection of vanilla and structured products.
          </p>
          {/* <a href="#" className="text-blue-500 hover:underline">View more &rarr;</a> */}
        </div>

        {/* 2. HSBC Evolve */}
        <div className="bg-white shadow-lg p-6 rounded min-h-[160px]">
          <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-blue-500 pl-2 mb-2">
            HSBC Evolve
          </h2><br />
          <p className="text-gray-600">
            HSBC Evolve
          </p>
        </div>

        {/* 3. Equities */}
        <div className="bg-white shadow-lg p-6 rounded min-h-[160px]">
          <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-purple-500 pl-2 mb-2">
            Equities
          </h2><br />
          <p className="text-gray-600 mb-2">
            Successfully meeting global growth objectives hinges on making the best-informed decisions and optimising liquidity to future-proof your business. By bringing together our cash and derivatives trading, sales and distribution, structured equity and equities finance expertise, that’s exactly what HSBC’s Global Equity group delivers.
          </p>
        </div>

        {/* 4. HSBC FX Algos */}
        <div className="bg-white shadow-lg p-6 rounded min-h-[160px]">
          <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-teal-500 pl-2 mb-2">
            HSBC FX Algos
          </h2><br />
          <p className="text-gray-600 mb-2">
            Adaptable Solution; Smart Execution
          </p>
        </div>

      </div>
    </div>
  );
};

export default Market3;
