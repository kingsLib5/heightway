import React from 'react';
import { IoIosArrowRoundUp } from "react-icons/io";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { motion } from 'framer-motion';

function BankingFooter() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const listVariants = {
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <div className='min-h-[60vh] md:min-h-[80vh] grid grid-rows-[auto_1fr_auto]'>
      <motion.div 
        className='bg-gray-100 py-4 md:py-0'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className='mt-4 md:mt-[40px] gap-2 md:gap-[10px] flex justify-center items-center'>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className='cursor-pointer flex items-center'
            onClick={scrollToTop}
          >
            <IoIosArrowRoundUp size={30} className='text-white bg-black h-10 w-10 md:h-[50px] p-2' />
            <p className='hover:underline ml-2 text-sm md:text-base'>Back to top</p>
          </motion.div>
        </div>
      </motion.div>

      <div className='bg-[#353333] grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-0 py-8 md:py-0'>
        <div className='col-span-1 md:col-span-3 flex justify-center md:justify-start md:items-center'>
          <motion.ul 
            className='flex flex-col gap-2 md:gap-[5px] px-4 md:pl-[95px] text-white text-sm md:text-[17px] font-serif font-light'
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.li variants={itemVariants} className='text-2xl md:text-[30px] mb-2 md:mb-4'>Resources</motion.li>
            {['Interest rates', 'Electronic Banking Dispute Settlement', 
              'Use of Electronic Financial Services', 'Disclaimer'].map((item, index) => (
              <motion.li 
                key={index}
                variants={itemVariants}
                className='hover:underline cursor-pointer flex gap-1 items-center'
                whileHover={{ x: 5 }}
              >
                {item}
                <motion.span whileHover={{ x: 5 }}>
                  <MdOutlineKeyboardArrowRight />
                </motion.span>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <div className='col-span-1 md:col-span-3 flex justify-center md:justify-start md:items-center'>
          <motion.ul 
            className='flex flex-col gap-2 md:gap-[5px] px-4 md:pl-[95px] text-white text-sm md:text-[17px] font-serif font-light'
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.li variants={itemVariants} className='text-2xl md:text-[30px] mb-2 md:mb-4'>Tools</motion.li>
            {['Right to Ask for Lower Interest Rate (408KB, PDF)', 
              'Regulation on Prevention of Unsound Sales Activity (51KB, PDF)', 
              'Staff Information – Sales Activities via Visits and Telephone (265KB, PDF)'].map((item, index) => (
              <motion.li 
                key={index}
                variants={itemVariants}
                className='flex gap-0.5 hover:underline cursor-pointer items-center'
                whileHover={{ x: 5 }}
              >
                {item}
                <motion.span whileHover={{ x: 5 }}>
                  <MdOutlineKeyboardArrowRight />
                </motion.span>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <div className='hidden md:block md:col-span-6'></div>
      </div>

      <motion.div 
        className='bg-black py-4 md:py-0'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className='flex flex-col md:flex-row gap-4 md:gap-0'>
          <motion.ul 
            className='flex flex-wrap justify-center md:justify-start items-center px-4 md:pl-[95px] text-white gap-4 md:gap-[45px] text-sm md:text-base'
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {['How Your Credit Information is Used', 'Personal Information Processing Guideline',
              'Terms of Use', 'Hyperlink Policy', 'FAQ', 'HSBC Group'].map((item, index) => (
              <motion.li 
                key={index}
                variants={itemVariants}
                className='hover:underline cursor-pointer'
                whileHover={{ scale: 1.05 }}
              >
                <a href="">{item}</a>
              </motion.li>
            ))}
          </motion.ul>
        </div>
        
        <motion.div 
          className='flex justify-center md:justify-start px-4 md:pl-[95px] text-white text-sm md:text-base mt-4 md:mt-0'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>© HSBC Bank 2025</p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default BankingFooter;