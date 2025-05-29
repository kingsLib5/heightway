import React, { useState, useRef } from "react";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcDiscover,
  FaCcAmex,
  FaCcDinersClub,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";
import { motion } from "framer-motion";

const CreditCard = ({ card }) => {
  // Defensive check for missing card prop
  if (!card || typeof card !== "object") {
    return (
      <div className="flex items-center justify-center h-40 text-red-500 font-semibold">
        Card data is missing or invalid.
      </div>
    );
  }

  const [isFlipped, setIsFlipped] = useState(false);
  const [showNumber, setShowNumber] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const cardEl = cardRef.current;
    if (!cardEl) return;

    const rect = cardEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardEl.style.setProperty('--x', `${x}px`);
    cardEl.style.setProperty('--y', `${y}px`);
  };

  const cardDesigns = {
    Visa: "bg-gradient-to-br from-red-900 via-red-700 to-red-900",
    MasterCard: "bg-gradient-to-br from-red-800 via-amber-600 to-red-800",
    Discover: "bg-gradient-to-br from-orange-700 via-yellow-600 to-orange-700",
    "American Express": "bg-gradient-to-br from-emerald-900 via-teal-600 to-emerald-900",
    Verve: "bg-gradient-to-br from-purple-900 via-fuchsia-700 to-purple-900",
  };

  const CardIcons = {
    Visa: FaCcVisa,
    MasterCard: FaCcMastercard,
    Discover: FaCcDiscover,
    "American Express": FaCcAmex,
    Verve: FaCcDinersClub,
  };

  // Defensive fallback for brand
  const brand = card.brand || "Visa";
  const CardIcon = CardIcons[brand] || FaCcVisa;

  return (
    <div className="flex flex-col items-center px-4 sm:px-6 md:px-0 w-full">
      <motion.div
        ref={cardRef}
        className="relative w-full max-w-[20rem] h-52 sm:h-60 md:h-64 perspective-1000 cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
      >
        {/* Front Side */}
        <div
          className={`
            absolute w-full h-full rounded-2xl p-6 shadow-2xl
            ${cardDesigns[brand]}
            overflow-hidden backface-hidden
          `}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x,_var(--y)),white/20,transparent)] pointer-events-none" />
          <div className="absolute top-4 left-0 w-full h-12 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50" />
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_5px,rgba(255,255,255,0.1)_5px,rgba(255,255,255,0.1)_10px)]" />
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="w-14 h-10 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-lg shadow-lg flex items-center justify-center">
                  <div className="w-10 h-6 bg-gradient-to-r from-amber-400 to-amber-200 rounded-md shadow-inner animate-pulse-slow" />
                </div>
                <div className="text-xs text-white/80 font-light tracking-widest">
                  PLATINUM EDITION
                </div>
              </div>
              <CardIcon className="text-4xl text-white/90 drop-shadow-lg" />
            </div>
            <div className="space-y-4 text-white">
              <div className="relative">
                <div className="absolute -top-1 left-0 w-4 h-4 bg-white/20 rounded-full shadow-sm" />
                <p className="text-lg sm:text-xl font-mono tracking-wider pl-6 drop-shadow-lg">
                  {showNumber ? card.number || "•••• •••• •••• 3456" : "•••• •••• •••• 3456"}
                </p>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <div>
                  <p className="text-[10px] opacity-80 mb-1 font-light">CARD HOLDER</p>
                  <p className="font-semibold tracking-widest">{card.holder || "CARD HOLDER"}</p>
                </div>
                <div>
                  <p className="text-[10px] opacity-80 mb-1 font-light">EXPIRES</p>
                  <p className="font-semibold tracking-widest">{card.expiry || "MM/YY"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div className="absolute w-full h-full rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl backface-hidden rotate-y-180 p-6 overflow-hidden">
          <div className="absolute top-6 -left-2 w-[110%] h-10 bg-gradient-to-r from-black via-gray-700 to-black transform -rotate-1 shadow-inner" />
          <div className="absolute top-20 left-2 right-2 text-[4px] text-white/30 text-center tracking-widest leading-tight uppercase">
            {Array(8).fill("SECURITY FEATURES INCLUDE HOLOGRAM AND MICROPRINTING ").join("")}
          </div>
          <div className="h-full flex flex-col justify-between relative z-10">
            <div className="relative mt-16">
              <div className="bg-gray-100 h-10 rounded-sm flex items-center justify-end pr-4 shadow-inner relative">
                <span className="text-gray-800 font-mono text-lg tracking-widest drop-shadow-sm">
                  {showNumber ? card.cvv || "•••" : "•••"}
                </span>
                <div className="absolute left-2 -top-6 text-xs text-white/70 font-light tracking-wider">
                  SECURITY CODE
                </div>
              </div>
              <div className="absolute right-0 -bottom-4 text-[6px] text-white/30 font-mono">
                CVV2/CVC2
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className="flex items-center justify-between">
                <div className="text-xs text-white/70 italic font-light tracking-wide">
                  Authorized Signature
                </div>
                <div className="w-24 h-8 bg-white/90 rounded-sm p-1">
                  <div className="h-full bg-gradient-to-br from-gray-100 to-gray-300 border border-white/50 rounded-sm" />
                </div>
              </div>
              <div className="flex justify-between items-center text-white/50 text-xs">
                <span className="font-light">24/7 SUPPORT</span>
                <CardIcon className="text-xl drop-shadow-md" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="mt-6 flex flex-wrap justify-center gap-3 w-full">
        <button
          onClick={() => setShowNumber((prev) => !prev)}
          className="px-4 py-2 text-sm font-medium flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all border border-white/10"
        >
          {showNumber ? (
            <FaEyeSlash className="text-red-400" />
          ) : (
            <FaEye className="text-red-400" />
          )}
          {showNumber ? "Mask Details" : "Reveal Details"}
        </button>
        <button
          onClick={() => setIsFlipped((prev) => !prev)}
          className="px-4 py-2 text-sm font-medium flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all border border-white/10"
        >
          <span className="text-red-400">🔄</span>
          {isFlipped ? "Front View" : "Security Details"}
        </button>
      </div>
    </div>
  );
};

export default CreditCard;