import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Popup from '../Pop-up-component/Popup'

function HomeSub() {
  const [showPopup, setShowPopup] = useState(false)
  const [proceedTo, setProceedTo] = useState('')
  const navigate = useNavigate()

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  }

  const hoverEffect = {
    scale: 1.05,
    originX: 0,
    transition: { type: 'spring', stiffness: 300 }
  }

  const tapEffect = {
    y: 2,
    transition: { duration: 0.1 }
  }

  const containerAnimation = {
    hidden: { y: -20, boxShadow: "0 0 0 rgba(0,0,0,0)" },
    visible: { 
      y: 0, 
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      transition: { 
        duration: 0.5,
        shadow: {
          duration: 0.3,
          ease: "easeOut"
        }
      }
    }
  }

   const items = [
    { label: 'HSBC Korea',     path: '/korea' },
    { label: 'Global Markets', path: '/market' },
    { label: 'Global Banking', path: '/banking' },
  ]

  const handleLinkClick = (e, path) => {
    e.preventDefault()
    setProceedTo(path)
    setShowPopup(true)
  }

  return (
    <>
      <motion.div 
        className="bg-white border-b border-gray-200 h-auto md:h-[10vh] py-3 md:py-0"
        variants={containerAnimation}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center justify-center md:justify-start">
          <motion.ul 
            className="flex flex-wrap justify-center gap-4 md:gap-8 
                       text-sm md:text-base lg:text-[17px] 
                       px-4 md:pl-16 lg:pl-[95px] font-serif"
            variants={listVariants}
            initial="hidden"
            animate="visible"
          >
            {items.map(({ label, path }, idx) => (
              <motion.li 
                key={idx}
                variants={itemVariants}
                whileHover={hoverEffect}
                whileTap={tapEffect}
                className="relative  px-2 py-1 md:px-0 md:py-4"
              >
                <a
                  href={path}
                  className="block relative"
                  onClick={e => handleLinkClick(e, path)}
                >
                  {label}
                  <motion.span 
                    className="absolute bottom-0 left-0 w-0 h-px bg-current 
                              transition-all duration-300 md:block hidden"
                    whileHover={{ width: '100%' }}
                  />
                  {/* Mobile underline (always visible) */}
                  <span className="absolute bottom-0 left-0 w-full h-px bg-gray-200 
                                 md:hidden block" />
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </motion.div>

      <Popup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        proceedTo={proceedTo}
      />
    </>
  )
}

export default HomeSub