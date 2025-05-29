import React from "react";
import banner from "../../assets/banner.jpg";
import banner2 from "../../assets/banner2.jpg";
import treasury23 from "../../assets/treasury23.png";

const sections = [
  {
    title: "What's New",
    description: "Information relating to our services and other updates.",
    image: banner,
  },
  {
    title: "Notices",
    description: "Access all important information about HSBC Korea.",
    image: banner2,
  },
  {
    title: "Need Help?",
    description: "Find our address, service hours, and how to contact us.",
    image: treasury23,
  },
];

const Banking3 = () => {
  return (
    <div className="bg-white mx-[95px] py-10 px-4 md:px-10 max-w-7xl ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {sections.map((section, idx) => (
          <div key={idx} className="text-center">
            <img
              src={section.image}
              alt={section.title}
              className="w-full h-64 object-cover mb-4 mx-auto"
            />
            <h3 className="text-lg font-semibold">
              <span className="border-l-4 border-red-600 pl-2 text-red-600">
                {section.title}
              </span>
            </h3>
            <p className="text-sm text-gray-600 mt-2">{section.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banking3;
