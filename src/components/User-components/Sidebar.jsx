import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBars,
  FaTimes,
  FaChevronUp,
  FaChevronDown,
  FaHome,
  FaHistory,
  FaPlus,
  FaExchangeAlt,
  FaGlobe,
  FaReceipt,
  FaPiggyBank,
} from "react-icons/fa";

const scrollbarStyles = `
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #ef4444 transparent;
  }
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #ef4444;
    border-radius: 20px;
    border: 2px solid transparent;
    background-clip: content-box;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: #dc2626;
  }
  .scroll-controls {
    position: sticky;
    bottom: 0;
    background: linear-gradient(to bottom, transparent, white 40%);
    padding: 1rem 0;
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    pointer-events: none;
  }
  .scroll-button {
    pointer-events: auto;
    padding: 0.75rem;
    border-radius: 9999px;
    background-color: #ef4444;
    color: white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .scroll-button:hover {
    background-color: #dc2626;
    transform: scale(1.1);
    box-shadow: 0 4px 6px rgba(0,0,0,0.15);
  }
`;

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollControls, setShowScrollControls] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const location = useLocation();
  const sidebarRef = useRef(null);

  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const closeSidebar = () => setIsOpen(false);

  const languages = [
    { code: "en", name: "English" },
    { code: "ko", name: "Korean" },
    { code: "es", name: "Spanish" },
    { code: "bn", name: "Bengali" },
    { code: "ru", name: "Russian" },
    { code: "ja", name: "Japanese" },
    { code: "de", name: "German" },
    { code: "fr", name: "French" },
  ];

  const navCategories = [
    {
      header: "Main",
      links: [
        { path: "/user/dashboard", label: "Accounts", icon: FaHome },
        { path: "/user/transactions", label: "Transactions", icon: FaHistory },
        { path: "/user/deposit", label: "Deposit", icon: FaPlus },
      ],
    },
    {
      header: "Transfers",
      links: [
        {
          path: "/user/local-transfer",
          label: "Local Transfers",
          icon: FaExchangeAlt,
        },
        {
          path: "/user/international-transfer",
          label: "International Transfers",
          icon: FaGlobe,
        },
      ],
    },
    {
      header: "Services",
      links: [
        { path: "/user/pay-bills", label: "Bill Payment", icon: FaReceipt },
        { path: "/user/savings", label: "Savings", icon: FaPiggyBank },
      ],
    },
  ];

  const checkScroll = () => {
    if (sidebarRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = sidebarRef.current;
      setShowScrollControls(scrollHeight > clientHeight);
    }
  };

  const scroll = (direction) => {
    if (sidebarRef.current) {
      const scrollAmount = direction === "up" ? -200 : 200;
      sidebarRef.current.scrollBy({
        top: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const currentRef = sidebarRef.current;
    currentRef?.addEventListener("scroll", checkScroll);
    checkScroll();
    return () => currentRef?.removeEventListener("scroll", checkScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  const renderLinks = () => (
    <>
      {navCategories.map((category, idx) => (
        <div key={idx} className="mb-6">
          <h6 className="text-xs uppercase font-semibold text-gray-400 mb-4 pb-2 border-b border-gray-200">
            {category.header}
          </h6>
          <ul className="space-y-2">
            {category.links.map((link) => {
              const Active = location.pathname === link.path;
              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={closeSidebar}
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                      Active
                        ? "bg-red-100 border-l-4 border-red-500 text-black"
                        : "text-gray-600 hover:bg-red-500 hover:text-white"
                    }`}
                  >
                    <link.icon
                      className={`mr-3 w-6 h-6 flex-shrink-0 rounded-full p-1 transition ${
                        Active
                          ? "bg-red-100 text-red-500"
                          : "text-gray-500 group-hover:bg-red-500 group-hover:text-white"
                      }`}
                    />
                    <span className="flex-grow font-medium">{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </>
  );

  return (
    <>
      {/* Inject custom scrollbar styles */}
      <style>{scrollbarStyles}</style>

      {/* Hamburger Button (mobile only) */}
      <button
        onClick={toggleSidebar}
        className="fixed lg:hidden top-4 left-4 z-[1050] bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-red-600 active:scale-95 transition-transform"
      >
        <FaBars className="w-6 h-6" />
      </button>

      {/* Desktop Sidebar */}
      <div
        ref={sidebarRef}
        className="hidden lg:block fixed left-0 top-0 w-64 h-screen bg-white shadow-xl z-[1040] p-4 overflow-y-auto custom-scrollbar"
      >
        <div className="flex justify-between items-center mb-8">
          <div
            className="bg-[url(./assets/Hssbbcc.jpg)] bg-center bg-contain w-28 h-12 bg-no-repeat"
            aria-label="Logo"
          />
          <div className="relative">
            <button
              className="flex items-center gap-1 text-sm font-medium text-gray-700"
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            >
              {selectedLanguage}
              {isLanguageOpen ? <FaChevronUp className="ml-1" /> : <FaChevronDown className="ml-1" />}
            </button>
            {isLanguageOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 bg-black/90 p-2 rounded shadow-lg min-w-[120px] z-50"
              >
                {languages.map((lang) => (
                  <div
                    key={lang.code}
                    className="px-3 py-2 hover:bg-white/10 rounded-sm cursor-pointer text-sm text-white"
                    onClick={() => {
                      setSelectedLanguage(lang.name);
                      setIsLanguageOpen(false);
                      window.changeLanguage(lang.code);
                    }}
                  >
                    {lang.name}
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
        {renderLinks()}
        {showScrollControls && (
          <div className="scroll-controls">
            <button onClick={() => scroll("up")} className="scroll-button">
              <FaChevronUp className="w-4 h-4" />
            </button>
            <button onClick={() => scroll("down")} className="scroll-button">
              <FaChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={closeSidebar}
              className="fixed inset-0 bg-black z-[1040]"
            />

            {/* Sliding Sidebar Panel */}
            <motion.div
              ref={sidebarRef}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed inset-y-0 left-0 w-3/4 max-w-xs bg-white shadow-xl z-[1050] p-4 overflow-y-auto custom-scrollbar"
            >
              <div className="flex justify-between items-center mb-6">
                <div
                  className="bg-[url(./assets/Hssbbcc.jpg)] bg-center bg-contain w-24 h-10 bg-no-repeat"
                  aria-label="Logo"
                />
                <button
                  onClick={closeSidebar}
                  className="text-2xl text-gray-600 hover:text-red-500 transition-colors"
                >
                  <FaTimes />
                </button>
              </div>
              {renderLinks()}
              {showScrollControls && (
                <div className="scroll-controls">
                  <button onClick={() => scroll("up")} className="scroll-button">
                    <FaChevronUp className="w-4 h-4" />
                  </button>
                  <button onClick={() => scroll("down")} className="scroll-button">
                    <FaChevronDown className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
