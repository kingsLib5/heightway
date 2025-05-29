// src/components/Global-bank-components/Banking2.jsx
import React from "react";

// Import images from src/assets
import hex1 from "../../assets/hexagon1.jpg";
import hex2 from "../../assets/hexagon2.jpg";
import hex3 from "../../assets/hexagon3.jpg";
import hex4 from "../../assets/hexagon4.jpg";
import hex5 from "../../assets/hexagon5.jpg";
import hex6 from "../../assets/hexagon6.jpg";

// Service data with imported image references
const services = [
  {
    title: "Global Banking",
    img: hex1,
  },
  {
    title: "Global Markets",
    img: hex2,
  },
  {
    title: "Securities Services",
    img: hex3,
  },
  {
    title: "Global Payments Solutions",
    img: hex4,
  },
  {
    title: "Global Trade Solutions",
    img: hex5,
  },
  {
    title: "HSBCnet's Online Banking",
    img: hex6,
  },
];

const Banking2 = () => {
  return (
    <div className="p-4 sm:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div key={index} className="bg-white shadow-sm rounded-md">
            <img
              src={service.img}
              alt={service.title}
              className="w-full h-48 object-cover rounded-t-md"
            />
            <div className="p-4">
              <h3 className="text-gray-800 text-lg font-medium">
                {service.title}
              </h3>
              <a
                href="#"
                className="text-red-500 text-sm mt-2 inline-block hover:underline"
              >
                {/* Add link text if needed */}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banking2;
