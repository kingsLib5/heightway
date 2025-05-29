import React from 'react';
import { motion } from 'framer-motion';

function KoreaFooter() {
  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1 }
    })
  };

  return (
    <div className='bg-black min-h-[15vh] md:h-[10vh] flex items-center'>
      <div className='container mx-auto px-4'>
        <div className='text-white w-full flex flex-col md:flex-row justify-between items-center font-serif'>
          <motion.ul className='flex flex-wrap justify-center md:justify-start gap-4 md:gap-[30px] py-4 md:py-0'>
            {[ "Personal Information Processing Guideline (635 KB, PDF)", "Terms of use", "Hyperlink policy"].map((item, index) => (
              <motion.li
                key={index}
                variants={listItemVariants}
                custom={index}
                className='relative hover:underline cursor-pointer text-sm md:text-[15px] text-center md:text-left'
              >
                <a href="" className='block pb-1'>
                  {item}
                  <motion.span
                    className='absolute bottom-0 left-0 h-px bg-white'
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </a>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div 
            className='text-sm md:text-[14px] pb-4 md:pb-0'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p>© HSBC Group 2025</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default KoreaFooter;