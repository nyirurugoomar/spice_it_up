import React from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate();
  let username = '';
  const authData = localStorage.getItem('auth');
  if (authData) {
    try {
      const parsed = JSON.parse(authData);
      if (parsed && parsed.user && parsed.user.username) {
        username = parsed.user.username;
      }
    } catch (e) {
      username = '';
    }
  }

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-400'>
      <img onClick={()=>navigate('/home')} className='w-44 cursor-pointer' src={assets.logo} alt='logo'/>
      <ul className='hidden md:flex items-start gap-5 font-medium cursor-pointer text-white'>
        <NavLink to='/home'>
          <li className='py-1'>HOME</li>
          <hr className='border-none outline-none h-0.5 bg-white w-3/5 m-auto hidden'/>
        </NavLink>
        <NavLink to='/explore'>
          <li className='py-1'>Explore</li>
          <hr className='border-none outline-none h-0.5 bg-white w-3/5 m-auto hidden'/>
        </NavLink>
        <NavLink to='/create-recipe'>
          <li className='py-1'>Create Recipe</li>
          <hr className='border-none outline-none h-0.5 bg-white w-3/5 m-auto hidden'/>
        </NavLink>
      </ul>
      <div className='flex items-center gap-5'>
        {username && (
          <div className='flex items-center gap-2 cursor-pointer group relative'>
            <p className='text-white'>{username}</p>
            <img className='w-6 h-6 rounded-full bg-white ' src={assets.userProfile} alt='profile'/>
            <div className=' absolute top-0 right-0 pt-20 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
              <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-2 p-4'>
                <p onClick={()=>navigate('my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                <p onClick={() => {
                  localStorage.removeItem('auth');
                  navigate('/');
                }} className='hover:text-black cursor-pointer'>Logout</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar