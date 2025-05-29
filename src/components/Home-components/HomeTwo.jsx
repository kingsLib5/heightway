import React, { useState } from 'react'
import { MdArrowForwardIos } from "react-icons/md"
import Popup from '../Pop-up-component/Popup'
import { useNavigate } from 'react-router-dom'

import GlobalMarketsImage from '../../assets/global-markets.jpg'
import CorporateCardImage from '../../assets/corporate-card-launches.jpg'

const HomeTwo = () => {
  const [showPopup, setShowPopup] = useState(false)
  const [proceedTo, setProceedTo] = useState('')
  const navigate = useNavigate()

  const handleLinkClick = (e, path) => {
    e.preventDefault()
    setProceedTo(path)
    setShowPopup(true)
  }

  return (
    <>
      <div className="bg-white p-4 md:p-12 lg:pl-[95px]">
        {/* Main Content Container */}
        <div className="max-w-7xl mx-auto">
          {/* Top Row */}
          <div className="grid md:grid-cols-2 gap-8 mb-8 md:mb-12">
            {/* Global Banking */}
            <div className="w-full">
              <div className="aspect-video md:h-48 mb-4 md:mb-6 rounded-lg overflow-hidden">
                <img 
                  src={GlobalMarketsImage} 
                  className="object-cover h-full w-full" 
                  alt="Global Markets" 
                />
              </div>
              <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-4">
                <a
                  href="/global-banking"
                  className="flex items-center gap-2 hover:underline"
                  onClick={e => handleLinkClick(e, '/banking')}
                >
                  Global Banking and Markets 
                  <MdArrowForwardIos className="hidden md:block flex-shrink-0" />
                </a>
              </h2>
              <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                Connecting institutional investors to global growth opportunities, with dedicated local support and expertise. HSBC opens global market opportunities.
              </p>
            </div>

            {/* Corporate Card */}
            <div className="w-full">
              <div className="aspect-video md:h-48 mb-4 md:mb-6 rounded-lg overflow-hidden">
                <img 
                  src={CorporateCardImage} 
                  className="object-cover h-full w-full" 
                  alt="Corporate Card Launch" 
                />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2 md:mb-4">
                <a
                  href="/corporate-card"
                  className="flex items-center gap-2 hover:underline"
                  onClick={e => handleLinkClick(e, '/corporate-card')}
                >
                  HSBC's first co-branded corporate card launches in Korea
                  <MdArrowForwardIos className="hidden md:block flex-shrink-0 mt-1" />
                </a>
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                HSBC launched the first co-branded corporate credit card in Korea, in partnership with Kookmin Card (KB), one of the top Korean card issuing companies, in March 2021.
              </p>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Notices */}
            <div className="w-full bg-gray-100 p-4 md:p-6 rounded-lg">
              <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-4">
                <a
                  href="/notices"
                  className="hover:underline"
                  onClick={e => handleLinkClick(e, '/notices')}
                >
                  Notices ⫸
                </a>
              </h2>
              <p className="text-sm md:text-base text-gray-600">
                Get the latest news, analysis and commentary from our business specialists by visiting the News and Insight section on our global corporate website.
              </p>
            </div>

            {/* About HSBC */}
            <div className="w-full">
              <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-4">
                <a
                  href="/about-hsbc"
                  className="flex items-center gap-2 hover:underline"
                  onClick={e => handleLinkClick(e, '/korea')}
                >
                  ABOUT HSBC
                  <MdArrowForwardIos className="hidden md:block flex-shrink-0" />
                </a>
              </h2>
              <p className="text-sm md:text-base text-gray-600">
                HSBC connects Korean and multinational companies to opportunities in the world based on the extensive global network and the expertise in the Korean market. HSBC in Korea also provides tailored financial solutions to Korea's financial institutions and public sector companies.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Popup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        proceedTo={proceedTo}
      />
    </>
  )
}

export default HomeTwo