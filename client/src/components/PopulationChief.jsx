import React from 'react'
import { populationChief } from '../assets/assets'

function PopulationChief() {
  return (
    <div className='flex flex-col gap-4'>
        <h1 className='text-xl sm:text-2xl lg:text-4xl font-bold text-white font-manrope'>Population Chief</h1>
        <div className='flex md:flex-row flex-col gap-6'>
            {populationChief.map((item)=>(
                <div key={item.id} className='flex items-center justify-center flex-col gap-2 hover:translate-y-[-10px] transition-all duration-500 cursor-pointer'>
                    <img src={item.image} alt={item.chiefName} className='w-[188px] h-[188px] rounded-full object-cover' />
                    <h1 className='text-white text-[16px] text-center font-bold font-manrope'>{item.chiefName}</h1>
                </div>
            ))}
        </div>
    </div>
  )
}

export default PopulationChief