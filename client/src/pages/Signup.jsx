import React from 'react'
import { Link } from 'react-router-dom'

function Signup() {
  return (
    <div className='flex flex-col items-center justify-center h-screen gap-10'>
        <h1 className='text-4xl font-bold text-white font-manrope'>Create your account</h1>
        <form className='flex flex-col  gap-6'>
            <div className='flex flex-col gap-2'>
                <label htmlFor='email' className='text-white '>Username</label>
                <input type='text' placeholder='Enter  your username' className='w-[500px] bg-[#2E3829] p-4   outline-none rounded-[12px] text-white text-[16px]' />
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor='email' className='text-white '>Email</label>
                <input type='email' placeholder='Enter  your email' className='w-[500px] bg-[#2E3829] p-4   outline-none rounded-[12px] text-white text-[16px]' />
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor='email' className='text-white '>Password</label>
                <input type='password' placeholder='Enter  your password' className='w-[500px] bg-[#2E3829] p-4   outline-none rounded-[12px] text-white text-[16px]' />
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor='password' className='text-white '>Confirm Password</label>
                <input type='password' placeholder='Corfirm  your password' className='w-[500px] bg-[#2E3829] p-4   outline-none rounded-[12px] text-white text-[16px]' />
            </div>
            

            <button type='submit' className='w-full p-2 rounded-md bg-[#54D12B] text-black font-bold'>Sign Up</button>
            <div className='flex flex-col'>
                <p className='text-[#A6B5A1] text-[14px]'>Already have an account? <Link className='text-white hover:underline' to='/'>Sign In</Link></p>
            </div>
        </form>
    </div>
  )
}

export default Signup