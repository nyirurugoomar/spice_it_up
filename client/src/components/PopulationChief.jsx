import React from 'react'
import { populationChief } from '../assets/assets'

function PopulationChief() {
  return (
    <div className='flex flex-col gap-4'>
        <h1 className='text-white text-[22px] font-bold font-manrope'>Population Chief</h1>
        <div className='flex flex-row gap-6'>
            {populationChief.map((item)=>(
                <div key={item.id} className='flex flex-col gap-2 hover:translate-y-[-10px] transition-all duration-500 cursor-pointer'>
                    <img src={item.image} alt={item.chiefName} className='w-[188px] h-[188px] rounded-full object-cover' />
                    <h1 className='text-white text-[16px] text-center font-bold font-manrope'>{item.chiefName}</h1>
                </div>
            ))}
        </div>
    </div>
  )
}

export default PopulationChief