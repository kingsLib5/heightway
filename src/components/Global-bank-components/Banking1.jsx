import React from 'react';
import { motion } from 'framer-motion';

function BankingOne() {
  const containerVariants = {
    rest: {},
    hover: { transition: { staggerChildren: 0.1 } }
  };

  const titleVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 }
  };

  const paragraphVariants = {
    rest: { opacity: 0, y: -10, height: 0 },
    hover: { opacity: 1, y: 0, height: 'auto' }
  };

  return (
    <div className="bg-black min-h-[90vh] grid">
      <div className="bg-[url(././assets/banking.jpg)] bg-no-repeat bg-center bg-cover md:bg-contain mx-4 md:mx-8 lg:mx-16 xl:mx-[95px] mb-8 md:mb-12 lg:mb-[60px] grid grid-rows-12">
        <div className="row-span-9" />
        <div className="row-span-3 pl-4 md:pl-8 lg:pl-12 xl:pl-[50px] pr-4">
          <motion.div
            initial="rest"
            whileHover="hover"
            variants={containerVariants}
          >
            <motion.h2
              className="text-white text-2xl md:text-3xl lg:text-4xl font-serif font-light cursor-pointer"
              variants={titleVariants}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              HSBC Korea
            </motion.h2>
            <motion.p
              className="mt-2 text-sm md:text-base text-white font-serif font-light overflow-hidden"
              variants={paragraphVariants}
              transition={{ duration: 0.3 }}
            >
              HSBC's Corporate and Institutional Banking group is a leading
              provider of financial services to top-tier global corporate and
              institutional clients.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default BankingOne;