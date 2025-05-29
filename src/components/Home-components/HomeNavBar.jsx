import React, { useState } from 'react'
import Popup from '../Pop-up-component/Popup'
import { useNavigate } from 'react-router-dom'

function HomeNavBar() {
  const [showLangOptions, setShowLangOptions] = useState(false)
  const [selectedLang, setSelectedLang] = useState('Korean')
  const [showPopup, setShowPopup] = useState(false)
  const navigate = useNavigate()

  const languages = [
    { code: 'ko', name: 'Korean',  flag: '🇰🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'French',  flag: '🇫🇷' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'ar', name: 'Arabic',  flag: '🇸🇦' },
  ]

  return (
    <>
      <div className='bg-white h-16 border-b border-gray-200 flex justify-between items-center px-4 md:px-8'>
        {/* Logo - Always visible */}
        <div className='flex items-center'>
          <a href="/">
            <div
              className='bg-[url(././assets/Hssbbcc.jpg)]
                         bg-center bg-contain
                         w-[80px] md:w-[100px] h-[30px] md:h-[40px]
                         bg-no-repeat'
            />
          </a>
        </div>

        {/* Right Section - Login + Language */}
        <div className='flex items-center gap-3 md:gap-6'>
          {/* Login Button */}
          <button
            className='bg-red-600 text-white h-10 px-4 md:px-6 
                       hover:bg-red-700 transition-colors rounded
                       text-sm md:text-base'
            onClick={() => setShowPopup(true)}
          >
            Login
          </button>

          {/* Language Selector */}
          <div className='relative'>
            <div
              className='flex items-center gap-2 cursor-pointer 
                         hover:bg-gray-100 px-3 py-2 rounded-lg'
              onClick={() => setShowLangOptions(!showLangOptions)}
            >
              <span>{languages.find(l => l.name === selectedLang)?.flag}</span>
              <span className='hidden md:inline text-sm font-light'>
                {selectedLang}
              </span>
              <span className={`transform transition-transform ${showLangOptions ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </div>

            {/* Language Dropdown */}
            {showLangOptions && (
              <div className='absolute right-0 mt-2 min-w-[160px] 
                              bg-white border border-gray-200 rounded-lg 
                              shadow-lg z-10'>
                {languages.map(lang => (
                  <div
                    key={lang.code}
                    className='flex items-center gap-3 px-4 py-2 
                              hover:bg-gray-100 cursor-pointer'
                    onClick={() => {
                      setSelectedLang(lang.name)
                      setShowLangOptions(false)
                      changeLanguage(lang.code)
                    }}
                  >
                    <span>{lang.flag}</span>
                    <span className='text-sm'>{lang.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Popup for Login */}
      <Popup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        proceedTo="/login"
      />
    </>
  )
}

export default HomeNavBar