import React from 'react'
import Featured from '../components/Featured'
import Latest from '../components/Latest'


function Home() {
  return (
    <div className='flex flex-col my-10 gap-10 mx-20 '>
        <div className='flex flex-row items-center justify-center gap-10'>
            <input type="text" placeholder='Search recipe' className='w-full bg-[#2E3829] p-4   outline-none rounded-[12px] text-white text-[16px]' />
            <button className='w-[100px] h-[50px] p-2 rounded-md bg-[#54D12B] text-black font-bold cursor-pointer'>Search</button>
        </div>
        <Featured/>
        <Latest/>
    </div>
  )
}

export default Home