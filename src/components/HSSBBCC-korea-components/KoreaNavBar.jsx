import React, { useState } from 'react';
import { IoSearch } from "react-icons/io5";
import { motion } from 'framer-motion';

function KoreaNavBar() {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('Korean');

  const languages = [
    { code: 'en',    name: 'English'    },
    { code: 'es',    name: 'Spanish'    },
    { code: 'zh-CN', name: 'Chinese'    },
    { code: 'hi',    name: 'Hindi'      },
    { code: 'ar',    name: 'Arabic'     },
    { code: 'pt',    name: 'Portuguese' },
    { code: 'bn',    name: 'Bengali'    },
    { code: 'ru',    name: 'Russian'    },
    { code: 'ja',    name: 'Japanese'   },
    { code: 'de',    name: 'German'     },
    { code: 'fr',    name: 'French'     },
    { code: 'it',    name: 'Italian'    },
    { code: 'ko',    name: 'Korean'     },
  ];

  return (
    <>
      <div className='bg-black grid grid-cols-2 h-auto md:h-[5vh] py-2 md:py-0 px-4 md:px-0'>
        <div className='underline text-xs md:text-[13px] text-white flex items-center md:pl-[125px]'>
          <p>Business</p>
        </div>
        
        <div className='flex text-white items-center justify-end gap-4 md:gap-[20px] pr-0 md:pr-[125px]'>
          <div className='flex items-center gap-2'>
            <IoSearch 
              className='cursor-pointer text-lg md:text-xl' 
              onClick={() => setShowSearchInput(!showSearchInput)}
            />
            {showSearchInput && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: ['150px', '100%'] }}
                transition={{ duration: 0.3 }}
                className='hidden md:block overflow-hidden'
              >
                <input
                  type="text"
                  placeholder="Search..."
                  className='bg-transparent border-b border-white text-white focus:outline-none w-full'
                />
              </motion.div>
            )}
          </div>

          {/* Mobile Search Input */}
          {showSearchInput && (
            <div className='md:hidden absolute top-full left-0 right-0 bg-black p-2'>
              <input
                type="text"
                placeholder="Search..."
                className='bg-transparent border-b border-white text-white focus:outline-none w-full'
              />
            </div>
          )}

          <div className='relative'>
            <button 
              className='flex items-center gap-1 text-xs md:text-sm cursor-pointer'
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            >
              {selectedLanguage}
              <motion.span
                animate={{ rotate: isLanguageOpen ? 180 : 0 }}
                className='text-xs'
              >
                ▼
              </motion.span>
            </button>

            {isLanguageOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className='absolute right-0 mt-2 bg-black/90 p-2 rounded shadow-lg min-w-[120px] z-50'
              >
                {languages.map((lang) => (
                  <div
                    key={lang.code}
                    className='px-3 py-2 hover:bg-white/10 rounded-sm cursor-pointer text-xs md:text-sm text-white'
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
      </div>
    </>
  );
}

export default KoreaNavBar;