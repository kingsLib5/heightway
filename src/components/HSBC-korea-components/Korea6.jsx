import React from 'react'
import korea2 from '../../assets/korea2.png'; // Import the image

function Korea6() {
  return (
    <div className='bg-white min-h-screen flex items-center justify-center py-12 lg:py-24 px-4 sm:px-8 lg:px-32'>
      {/* Image section */}
      <div className='w-full max-w-6xl relative h-[60vh] sm:h-[70vh]'>
        <img 
          src={korea2}  // Use the imported image
          alt="Description of image"
          className='w-full h-full object-cover rounded-lg shadow-md md:shadow-xl'
        />
      </div>
    </div>
  )
}

export default Korea6