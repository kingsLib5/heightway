import React from 'react';
import { motion } from 'framer-motion';

function HomeFooter() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1 }
    })
  };

  const underlineAnimation = {
    hover: { width: "100%" },
    initial: { width: "0%" }
  };

  return (
    <motion.div 
      className='bg-black min-h-[50vh] md:min-h-[70vh] grid grid-rows-[auto_1fr_auto] md:grid-rows-12'
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Top Section */}
      <div className='flex items-center py-4 md:py-0 md:row-span-1 border-b border-white'>
        <motion.ul className='flex flex-wrap gap-4 md:gap-[30px] text-white px-4 md:pl-[95px] font-serif'>
          {["Contact us", "Find a branch", "About Hsbc"].map((item, index) => (
            <motion.li 
              key={index}
              variants={listItemVariants}
              custom={index}
              className='relative hover:underline cursor-pointer text-sm md:text-base'
            >
              <a href="" className='block pb-1 relative'>
                {item}
                <motion.span
                  className='absolute bottom-0 left-0 h-px bg-white'
                  variants={underlineAnimation}
                  initial="initial"
                  whileHover="hover"
                  transition={{ duration: 0.3 }}
                />
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      {/* Middle Section */}
      <div className='row-span-9 grid grid-cols-1 md:grid-cols-12 border-b border-white'>
        <div className='col-span-1 md:col-span-6 py-8 md:py-0'>
          <motion.ul className='flex flex-col gap-2 md:gap-[5px] text-white text-sm md:text-[14px] px-4 md:pl-[95px] font-serif md:pt-[30px]'>
            <motion.li 
              className='text-lg md:text-[20px] font-semibold pb-4'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Tools and resources
            </motion.li>
            {[
              "SmartForm (2.6MB, PDF)", "Interest rates", 
              "Right to Ask for Lower Interest Rate (408KB, PDF)",
              "Electronic Banking Dispute Settlement",
              "Use of Electronic Financial Services",
              "How Your Credit Information is Used (231KB, PDF)",
              "Staff Information – Sales Activities via Visits and Telephone (265KB, PDF)",
              "Regulation on Prevention of Unsound Sales Activity (51KB, PDF)",
              "Personal Information Processing Guideline (271KB, PDF)",
              "Disclaimer",
            ].map((item, index) => (
              <motion.li
                key={index}
                variants={listItemVariants}
                custom={index}
                className='relative hover:underline cursor-pointer'
              >
                <a href="" className='block pb-1 relative'>
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
        </div>

        <div className='px-4 md:pl-[30px] py-8 md:py-0 col-span-1 md:col-span-6'>
          <motion.ul className='flex flex-col gap-2 md:gap-[5px] text-sm md:text-[14px] text-white font-serif'>
            <motion.li 
              className='text-lg md:text-[20px] font-semibold pb-4'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              HSBC Websites
            </motion.li>
            {["HSBC Group", "RMB Resource Centre"].map((item, index) => (
              <motion.li
                key={index}
                variants={listItemVariants}
                custom={index}
                className='relative hover:underline cursor-pointer'
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
        </div>
      </div>

      {/* Bottom Section */}
      <div className='text-white grid grid-cols-1 md:grid-cols-2 row-span-2 font-serif py-4 md:py-0'>
        <div className='flex items-center justify-center md:justify-start'>
          <motion.ul className='flex flex-wrap gap-4 md:gap-[30px] px-4 md:pl-[100px] text-sm md:text-[15px]'>
            {["Terms of use", "Hyperlink policy", "Career", "FAQ"].map((item, index) => (
              <motion.li
                key={index}
                variants={listItemVariants}
                custom={index}
                className='relative hover:underline cursor-pointer'
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
        </div>
        <motion.div 
          className='flex items-center justify-center md:justify-start px-4 md:pl-[70px] mt-4 md:mt-0 text-center md:text-left text-sm md:text-[14px]'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p>© Copyright. The Hongkong and Shanghai Banking Corporation Limited 2025</p>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default HomeFooter;