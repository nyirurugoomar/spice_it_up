import React from 'react'
import { featured } from '../assets/assets'

function Featured() {
  return (
    <div className='w-full flex flex-col px-4 sm:px-6 lg:px-4 gap-4 sm:gap-6'>
        <h1 className='text-xl sm:text-2xl lg:text-4xl font-bold text-white font-manrope'>Featured Recipes</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6'>
            {featured.map((item)=>(
                <div key={item.id} className='flex flex-col gap-2 hover:translate-y-[-5px] sm:hover:translate-y-[-10px] transition-all duration-300 cursor-pointer'>
                    <img 
                        src={item.image} 
                        alt={item.title} 
                        className='w-full h-full sm:h-[137px] md:h-[171px] object-cover rounded-lg' 
                    />
                    <h1 className='text-white text-sm sm:text-base font-bold font-manrope line-clamp-2'>{item.title}</h1>
                    <p className='text-[#A6B5A1] text-xs sm:text-sm font-manrope line-clamp-2'>{item.Ingredients}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Featured