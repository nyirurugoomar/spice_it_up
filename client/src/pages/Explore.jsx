import React from 'react'
import Search from '../components/Search'
import Trending from '../components/Trending'
import PopulationChief from '../components/PopulationChief'

function Explore() {
  return (
    <div className='flex flex-col my-10 gap-10 mx-20 '>
        <Search/>
        <Trending/>
        <PopulationChief/>

    </div>
  )
}

export default Explore