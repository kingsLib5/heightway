import React from 'react';
import { motion } from 'framer-motion';

function KoreaSub() {
  const linkVariants = {
    hover: {
      y: -3,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  const underlineVariants = {
    hover: {
      width: "100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <>
      <div className='bg-white grid grid-cols-12 h-auto md:h-[9vh] py-4 md:py-0 px-4 md:px-0'>
        <div className='flex col-span-12 md:col-span-2 justify-center md:justify-end items-center md:pl-[40px]'>
          <a href="/korea">
            <div className='bg-[url(././assets/Hssbbcc.jpg)] bg-center bg-contain w-[100px] h-[40px] bg-no-repeat'></div>
          </a>
        </div>
        
        <div className='col-span-12 md:col-span-10 mt-4 md:mt-0'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 md:mx-[20px] md:my-[20px]'>
            {/* HSBC in Korea */}
            <div className='flex items-center justify-center border-b md:border-r border-gray-400 py-2 md:py-0'>
              <motion.a 
                href=""
                className='relative'
                whileHover="hover"
              >
                <motion.span variants={linkVariants} className='text-base md:text-[20px]'>HSBC in Korea</motion.span>
                <motion.div
                  className='absolute bottom-0 left-0 h-px bg-black'
                  variants={underlineVariants}
                  style={{ width: 0 }}
                />
              </motion.a>
            </div>

            {/* News and media */}
            <div className='flex items-center justify-center border-b md:border-r border-gray-400 py-2 md:py-0'>
              <motion.a 
                href=""
                className='relative'
                whileHover="hover"
              >
                <motion.span variants={linkVariants} className='text-base md:text-[20px]'>News and media</motion.span>
                <motion.div
                  className='absolute bottom-0 left-0 h-px bg-black'
                  variants={underlineVariants}
                  style={{ width: 0 }}
                />
              </motion.a>
            </div>

            {/* Careers */}
            <div className='flex items-center justify-center py-2 md:py-0'>
              <motion.a 
                href=""
                className='relative'
                whileHover="hover"
              >
                <motion.span variants={linkVariants} className='text-base md:text-[20px]'>Careers</motion.span>
                <motion.div
                  className='absolute bottom-0 left-0 h-px bg-black'
                  variants={underlineVariants}
                  style={{ width: 0 }}
                />
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default KoreaSub;