import React from "react";
import headquartersImg from "../../assets/headquarters.jpg";
import ceoImg from "../../assets/ceo.jpg";

const Korea4 = () => {
  return (
    <div className="bg-white py-16 px-6 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Headquarters */}
        <div>
          <img
            src={headquartersImg}
            alt="HSBC Headquarters"
            className="w-full object-contain rounded-xl"
          />
          <h2 className="text-2xl font-semibold mt-4">Our Headquarters</h2>
          <p className="text-gray-700 leading-relaxed mt-2">
            Level 7, HSBC Building<br />
            37, Chilpae-ro,<br />
            Jung-gu<br />
            Seoul, Korea
          </p>
        </div>

        {/* CEO */}
        <div>
          <img
            src={ceoImg}
            alt="Peter Y. Kim"
            className="w-full object-contain rounded-xl"
          />
          <h2 className="text-2xl font-semibold mt-4">Our CEO</h2>
          <p className="text-gray-700 leading-relaxed mt-2">
            <strong>Peter Y. Kim</strong><br />
            CEO and Head of Banking
          </p>
        </div>
      </div>
    </div>
  );
};

export default Korea4;
