import React from 'react';
import { motion } from 'framer-motion';

function HomeOne() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      className='bg-white min-h-[70vh] md:h-[70vh] flex flex-col md:grid md:grid-rows-12'
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Image Section */}
      <motion.div 
        className='md:row-span-5 h-[300px] md:h-auto 
                   mx-4 md:mx-0 mt-4 md:mt-0 mb-6 md:mb-[20px]
                   bg-[url(././assets/homepage.jpg)] 
                   bg-center bg-cover rounded-lg md:rounded-none'
        variants={imageVariants}
      />
      
      {/* Text Content Section */}
      <motion.div 
        className='md:row-span-7 flex flex-col gap-4 md:gap-[30px] 
                   px-4 md:px-8 lg:pr-[450px] pb-8 md:pb-0
                   justify-center max-w-7xl mx-auto'
        variants={containerVariants}
      >
          <motion.h2 
            className='text-3xl md:text-4xl lg:text-[50px] 
                       font-light leading-tight'
            variants={textVariants}
          >
            Welcome to HSBC Korea
          </motion.h2>
          
          <motion.h5 
            className='text-lg md:text-xl lg:text-[20px] 
                       text-gray-600'
            variants={textVariants}
          >
            Connecting customers to opportunities
          </motion.h5>
          
          <motion.p 
            className='text-base md:text-[15px] 
                       text-gray-600 leading-relaxed
                       max-w-3xl'
            variants={textVariants}
          >
            HSBC connects Korean and multinational companies to opportunities 
            in the world based on the extensive global network and the expertise 
            in the Korean market. HSBC in Korea also provides tailored financial 
            solutions to Korea's financial institutions and public sector companies.
          </motion.p>
      </motion.div>
    </motion.div>
  )
}

export default HomeOne;