import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Popup from '../Pop-up-component/Popup';
import { FiMenu, FiX } from 'react-icons/fi';

function BankingNavBar() {
  const [showPopup, setShowPopup] = useState(false);
  const [pendingRoute, setPendingRoute] = useState(null);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('Korean');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { 
      title: 'Insight',
      submenu: [
        { title: 'Insight', 
          // path: '/market/insight'

         },
      ]
    },
    { 
      title: 'Solutions',
      submenu: [
        { title: 'Solution', 
          // path: '/market/solution'
         },
      ]
    },
    { 
      title: 'Events',
      submenu: [
        { title: 'History', 
          // path: '/market/event'
         },
      ]
    },
    { 
      title: 'Financial Regulation',
      submenu: [
        { title: 'History', 
          // path: '/market/finacial'
        },
      ]
    },
    { 
      title: 'About us',
      submenu: [
        { title: 'History', 
          // path: '/market/about'
         },
      ]
    }
  ];

  const languages = [
    { code: 'en',    name: 'English',    flag: '🇺🇸' },
    { code: 'ko',    name: 'Korean',     flag: '🇰🇷' },
    { code: 'es',    name: 'Spanish',    flag: '🇪🇸' },
    { code: 'ja',    name: 'Japanese',   flag: '🇯🇵' },
    { code: 'de',    name: 'German',     flag: '🇩🇪' },
    { code: 'fr',    name: 'French',     flag: '🇫🇷' },
   
    
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const requestRoute = (path) => {
    setPendingRoute(path);
    setShowPopup(true);
  };

  return (
    <>
      <motion.div
        className="bg-black grid grid-cols-12 h-[11vh] md:h-[11vh] relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="col-span-2 md:hidden flex items-center pl-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white text-2xl"
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        <div className="col-span-8 md:col-span-2 flex justify-center md:justify-end items-center pr-0 md:pr-[40px]">
          <a href="/market">
            <div className="bg-[url(././assets/Hssbbcc.jpg)] bg-center bg-contain w-[60px] md:w-[80px] h-[30px] md:h-[40px] bg-no-repeat" />
          </a>
        </div>

        <div className="hidden md:flex items-center col-span-6">
          <ul className="flex gap-[20px] pl-[40px] text-white text-[15px] font-serif font-light">
            {menuItems.map((item, index) => {
              const firstPath = item.submenu[0]?.path || '/';
              const onClickHandler = ['Markets and Securities Services', 'About HSBC Korea']
                .includes(item.title)
                ? () => requestRoute(firstPath)
                : () => handleNavigation(firstPath);

              return (
                <li key={index} className="py-2 px-2">
                  <motion.span
                    className="cursor-pointer text-white"
                    whileHover={{ scale: 1.05, color: '#e3342f' }}
                    transition={{ duration: 0.2 }}
                    onClick={onClickHandler}
                  >
                    {item.title}
                  </motion.span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="col-span-2 md:col-span-4 pr-4 md:pr-[90px] gap-[15px] md:gap-[30px] flex items-center justify-end">
          <div className="hidden md:flex items-center justify-center relative">
            <button
              className="flex items-center gap-2 h-[45px] text-white bg-[#4e4b4b] w-[170px] justify-center"
              onClick={() => setLanguageOpen(!languageOpen)}
            >
              <span>{languages.find(l => l.name === selectedLanguage)?.flag}</span>
              {selectedLanguage}
              <motion.span
                animate={{ rotate: languageOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-sm text-white"
              >
                ▼
              </motion.span>
            </button>

            <AnimatePresence>
              {languageOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full mt-2 w-full bg-[#4e4b4b] shadow-lg z-50 max-h-64 overflow-auto"
                >
                  {languages.map((lang, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-center gap-2 p-3 cursor-pointer text-white hover:bg-white/10"
                      transition={{ duration: 0.2 }}
                      onClick={() => {
                        setSelectedLanguage(lang.name);
                        setLanguageOpen(false);
                        window.changeLanguage(lang.code);
                      }}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            className="bg-red-600 text-white h-[35px] md:h-[45px] w-[80px] md:w-[40%] text-sm md:text-base hover:bg-red-700 transition-colors"
            onClick={() => setShowPopup(true)}
          >
            Login
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden absolute top-full left-0 right-0 bg-black z-50"
            >
              <ul className="flex flex-col p-4 text-white">
                {menuItems.map((item, index) => {
                  const firstPath = item.submenu[0]?.path || '/';
                  return (
                    <motion.li
                      key={index}
                      className="py-3 border-b border-gray-700"
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.span
                        className="cursor-pointer"
                        onClick={() => {
                          handleNavigation(firstPath);
                          setMobileMenuOpen(false);
                        }}
                      >
                        {item.title}
                      </motion.span>
                    </motion.li>
                  );
                })}
                <li className="pt-4">
                  <div className="relative">
                    <button
                      className="flex items-center gap-2 h-[45px] text-white bg-[#4e4b4b] w-full justify-center"
                      onClick={() => setLanguageOpen(!languageOpen)}
                    >
                      <span>{languages.find(l => l.name === selectedLanguage)?.flag}</span>
                      {selectedLanguage}
                      <motion.span
                        animate={{ rotate: languageOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-sm text-white"
                      >
                        ▼
                      </motion.span>
                    </button>
                    <AnimatePresence>
                      {languageOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full mt-2 w-full bg-[#4e4b4b] shadow-lg z-50 max-h-64 overflow-auto"
                        >
                          {languages.map((lang, idx) => (
                            <motion.div
                              key={idx}
                              className="flex items-center gap-2 p-3 cursor-pointer text-white hover:bg-white/10"
                              transition={{ duration: 0.2 }}
                              onClick={() => {
                                setSelectedLanguage(lang.name);
                                setLanguageOpen(false);
                                window.changeLanguage(lang.code);
                              }}
                            >
                              <span>{lang.flag}</span>
                              <span>{lang.name}</span>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <Popup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        proceedTo={pendingRoute || '/login'}
      />
    </>
  );
}

export default BankingNavBar;