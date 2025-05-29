// (No changes to import statements)
import React, { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import CreditCard from "../User-components/CreditCards";
import {
  FaCreditCard,
  FaMoneyCheckAlt,
  FaCcVisa,
  FaCcMastercard,
  FaCcDiscover,
  FaCcAmex,
  FaCcDinersClub,
  FaSpinner,
  FaTimes,
  FaExclamationTriangle
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Cards() {
  const [showModal, setShowModal] = useState(false);
  const [selectedCardType, setSelectedCardType] = useState(null);
  const [selectedCardBrand, setSelectedCardBrand] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cards, setCards] = useState({ credit: null, debit: null });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const storedCards = JSON.parse(localStorage.getItem("cards")) || { credit: null, debit: null };
    setCards(storedCards);
  }, []);

  const handleApplyForCard = () => {
    setShowModal(true);
    setSelectedCardType(null);
    setSelectedCardBrand(null);
    setErrorMessage("");
  };

  const handleCardSelection = (type, brand) => {
    if (cards[type.toLowerCase()]) {
      setErrorMessage(`You can only have one ${type} card.`);
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      const selectedBrand = cardBrands.find(b => b.brand === brand);
      const color = selectedBrand ? selectedBrand.color : 'from-gray-600 to-gray-400';
      const newCard = {
        type,
        brand,
        color,
        number: "1234 5678 9012 3456",
        expiry: "12/28",
        holder: "Kings Igboanusi",
        cvv: "123",
      };
      const updatedCards = { ...cards, [type.toLowerCase()]: newCard };
      setCards(updatedCards);
      localStorage.setItem("cards", JSON.stringify(updatedCards));
      setIsProcessing(false);
      setShowModal(false);
    }, 4000);
  };

  const cardBrands = [
    { brand: "Verve", Icon: FaCcDinersClub, color: "from-purple-600 to-purple-400" },
    { brand: "Visa", Icon: FaCcVisa, color: "from-red-600 to-red-400" },
    { brand: "MasterCard", Icon: FaCcMastercard, color: "from-red-800 to-red-600" },
    { brand: "Discover", Icon: FaCcDiscover, color: "from-orange-600 to-orange-400" },
    { brand: "American Express", Icon: FaCcAmex, color: "from-green-600 to-green-400" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-2xl p-6 sm:p-8 text-white shadow-xl mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Card Management</h2>
        <p className="text-center text-red-100 max-w-2xl mx-auto text-sm sm:text-base">
          Securely manage your payment cards, apply for new ones, and monitor your financial tools
          with our intuitive card management system.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {cards.credit ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <CreditCard card={cards.credit} />
          </motion.div>
        ) : (
          <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-dashed border-gray-200 flex items-center justify-center min-h-[250px]">
            <div className="text-center text-gray-400">
              <FaCreditCard className="w-12 h-12 mx-auto mb-4" />
              <p className="text-lg">No credit card added</p>
            </div>
          </div>
        )}

        {cards.debit ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <CreditCard card={cards.debit} />
          </motion.div>
        ) : (
          <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-dashed border-gray-200 flex items-center justify-center min-h-[250px]">
            <div className="text-center text-gray-400">
              <FaMoneyCheckAlt className="w-12 h-12 mx-auto mb-4" />
              <p className="text-lg">No debit card added</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center space-y-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-base sm:text-lg shadow-lg transition-all w-full sm:w-auto"
          onClick={handleApplyForCard}
        >
          Apply New Card
        </motion.button>

        <button
          className="text-red-500 hover:text-red-600 font-medium flex items-center gap-2 text-sm"
          onClick={() => {
            localStorage.removeItem("cards");
            window.location.reload();
          }}
        >
          <FaTimes className="w-4 h-4" />
          Reset All Cards
        </button>
      </div>

      <AnimatePresence>
        {showModal && (
          <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="New Card Application">
            <div className="space-y-6 px-2 sm:px-0">
              {isProcessing ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center p-6 space-y-4"
                >
                  <FaSpinner className="w-12 h-12 text-red-600 animate-spin" />
                  <p className="text-gray-600 text-center text-sm sm:text-base">
                    Securely processing your application...
                  </p>
                </motion.div>
              ) : !selectedCardType ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h5 className="text-lg sm:text-xl text-center font-semibold text-gray-700">
                    Select Card Type
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[{ type: "Debit", Icon: FaCreditCard }, { type: "Credit", Icon: FaMoneyCheckAlt }].map(
                      ({ type, Icon }) => (
                        <motion.button
                          key={type}
                          whileHover={{ scale: 1.02 }}
                          className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg border-2 border-red-100 transition-all"
                          onClick={() => setSelectedCardType(type)}
                        >
                          <Icon className="w-10 h-10 mb-3 text-red-600" />
                          <span className="text-base font-medium text-gray-700">{type} Card</span>
                        </motion.button>
                      )
                    )}
                  </div>
                </motion.div>
              ) : !selectedCardBrand ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h5 className="text-lg sm:text-xl text-center font-semibold text-gray-700">
                    Choose Card Brand
                  </h5>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {cardBrands.map(({ brand, Icon, color }) => (
                      <motion.button
                        key={brand}
                        whileHover={{ scale: 1.02 }}
                        className={`flex flex-col items-center justify-center p-4 bg-gradient-to-br ${color} text-white rounded-xl shadow-md hover:shadow-lg transition-all`}
                        onClick={() => handleCardSelection(selectedCardType, brand)}
                      >
                        <Icon className="w-7 h-7 mb-2" />
                        <span className="text-sm font-medium">{brand}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ) : null}

              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-red-50 p-4 rounded-lg flex items-center gap-3"
                >
                  <FaExclamationTriangle className="w-5 h-5 text-red-600" />
                  <p className="text-red-600 text-sm">{errorMessage}</p>
                </motion.div>
              )}
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
