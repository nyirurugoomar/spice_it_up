import React from 'react'
import { featured } from '../assets/assets'

function Featured() {
  return (
    <div className='flex flex-col gap-4'>
        <h1 className='text-white text-[22px] font-bold font-manrope'>Featured Recipes</h1>
        <div className='flex flex-row gap-6  '>
            {featured.map((item)=>(
                <div key={item.id} className='flex flex-col gap-2 hover:translate-y-[-10px] transition-all duration-500 cursor-pointer'>
                    <img src={item.image} alt={item.title} className='w-[243px] h-[137px] object-cover' />
                    <h1 className='text-white text-[16px] font-bold font-manrope'>{item.title}</h1>
                    <p className='text-[#A6B5A1] text-[14px] font-manrope'>{item.Ingredients}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Featured