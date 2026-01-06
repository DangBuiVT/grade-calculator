/* Now  */

import React from 'react';

// Home page button logic

const handleGetStarted = () => {
  // Logic to navigate to the calculator page
  window.location.href = '/home';
}

export default function Introduction() {
  return (
    <div className='relative w-full h-full overflow-y-hidden'>
        <img src="images/desktop-intro-img.png" alt="" className='absolute z-[-5] -top-20 right-0 hidden md:block'/>
        <img src="images/mobile-intro-img.png" alt="" className='absolute block md:hidden right-0 -top-0'/>
        <div className="absolute top-0 md:bottom-0 mt-7 ml-3 p-5 md:p-15 flex flex-col gap-8 justify-end w-3/5">
          <h1 className='font-bold text-5xl md:text-7xl relative bottom-0 w-1/2 text-left'>GPA CALCULATOR</h1>
          <button id="intro-button" className='!bg-[#03045e] text-white px-4 py-2 text-xl rounded-full font-bold cursor-pointer md:w-1/2' onClick={handleGetStarted}>Get Started</button>
        </div>
        
    </div>
  );
}