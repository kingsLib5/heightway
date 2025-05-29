import React from 'react';

const Market2 = () => {
  return (
    <div className="relative w-full min-h-screen bg-gray-100">
      <div className="absolute bottom-1 left-1/2 transform  -translate-x-1/2 w-[95%] md:w-[80%] flex flex-col space-y-[10px]">

        {/* 1. Payments & FX Solutions */}
        <div className="bg-white shadow-lg p-6 rounded min-h-[230px]">
          <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-red-500 pl-2 mb-2">
            Payments & FX Solutions
          </h2> <br />
          <p className="text-gray-600 mb-2">
            "What exchange rate will I get? How much will it cost? Where is my payment?"
          </p>
          {/* <a href="#" className="text-red-500 hover:underline">View more &rarr;</a> */}
        </div>

        {/* 2. HSBC AI Markets */}
        <div className="bg-white shadow-lg p-6 rounded min-h-[160px]">
          <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-red-500 pl-2 mb-2">
            HSBC AI Markets
          </h2><br />
          <p className="text-gray-600">
            AI Markets is an award-winning, digital services offering that uses purpose-built natural language processing (NLP) to enrich the way institutional investors interact with global markets.
          </p>
        </div>

        {/* 3. Commodities */}
        <div className="bg-white shadow-lg p-6 rounded min-h-[160px]">
          <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-yellow-500 pl-2 mb-2">
            Commodities
          </h2><br />
          <p className="text-gray-600 mb-2">
            With over 150 years of experience and a global leader in precious metals, HSBC is your natural first point of contact when trading commodities.
          </p>
          {/* <a href="#" className="text-yellow-500 hover:underline">View more &rarr;</a> */}
        </div>

        {/* 4. Credit */}
        <div className="bg-white shadow-lg p-6 rounded min-h-[160px]">
          <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-green-500 pl-2 mb-2">
            Credit
          </h2><br />
          <p className="text-gray-600 mb-2">
            Maximise opportunities with HSBC’s Global Credit business through our strategically located dealing rooms and global offices, offering 24-hour trading and sales coverage and delivering innovative ideas and liquidity globally.
          </p>
          {/* <a href="#" className="text-green-500 hover:underline">View more &rarr;</a> */}
        </div>

      </div>
    </div>
  );
};

export default Market2;
