import React from 'react'
import { FaArrowLeftLong } from "react-icons/fa6"

function MarketSub() {
  return (
    <div className='bg-black min-h-[60px] md:h-[10vh] flex items-center border-t border-gray-500'>
      <div className='container mx-auto px-4 md:px-24'>
        <div className='group flex items-center gap-2.5 hover:underline w-fit'>
          <FaArrowLeftLong className='w-4 h-4 md:w-5 md:h-5 text-white' />
          <p className='text-sm md:text-base text-white font-medium transition-colors'>
            Back to products & solutions
          </p>
        </div>
      </div>
    </div>
  )
}

export default MarketSub