import React from 'react'
import { IoMdShare } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { motion } from 'framer-motion';

function Korea1() {
  return (
    <>
    <div className='bg-white h-[40vh] md:h-[60vh] relative'>
      {/* Image Section */}
      <div className='bg-[url(././assets/korea.jpg)] h-full w-full bg-no-repeat bg-cover bg-center'></div>
      
      {/* Share Section - Positioned Over Image */}
      <motion.div 
        className='absolute bottom-[10%] md:bottom-0 left-1/2 md:left-auto md:right-1.5 -translate-x-1/2 md:-translate-x-0 translate-y-1/2 w-[90%] md:w-[30%] flex flex-col md:flex-row shadow-xl rounded-sm'
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className='w-full md:w-[40%] flex items-center justify-center font-semibold text-white gap-2 md:gap-[20px] text-[14px] md:text-[18px] bg-[#353333] py-3 md:py-4'>
          <IoMdShare className='hidden md:block' size={25}/>
          <IoMdShare className='md:hidden' size={20}/>
          <p>SHARE</p>
        </div>
        
        <div className='flex md:flex-grow'>
          <div className='w-1/3 md:w-[20%] border-r border-gray-300 flex items-center justify-center bg-white py-2 md:py-0'>
            <FaXTwitter className='text-red-500' size={20} md:size={30} />
          </div>
          <div className='w-1/3 md:w-[20%] border-r border-gray-300 flex items-center justify-center bg-white py-2 md:py-0'>
            <FaFacebookF className='text-red-500' size={20} md:size={30} />
          </div>
          <div className='w-1/3 md:w-[20%] border-r border-gray-300 flex items-center justify-center bg-white py-2 md:py-0'>
            <FaLinkedinIn className='text-red-500' size={20} md:size={30} />
          </div>
        </div>
      </motion.div>
    </div>
    </>
  )
}

export default Korea1;