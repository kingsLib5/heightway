import React from 'react'

function Market1() {
  return (
    <div className='relative bg-[url(././assets/global.jpg)] bg-no-repeat bg-cover bg-center min-h-[60vh] md:min-h-[60vh] lg:min-h-[60vh] flex items-end pb-[10vh]'>
      <div className='container mx-auto px-4 md:px-8 lg:px-16 relative z-10'>
        <h2 className='text-4xl md:text-6xl lg:text-7xl text-white font-light font-serif text-center md:text-left mb-[8vh] md:mb-[9vh]'>
          Global Markets
        </h2>
        
        {/* Spacer for Market2's absolute positioning */}
        <div className='h-[30vh] md:h-[40vh] w-full'></div>
      </div>
      
      {/* Gradient overlay for better text visibility */}
      <div className='absolute inset-0 bg-gradient-to-b from-black/30 to-transparent'></div>
    </div>
  )
}

export default Market1