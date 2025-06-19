import React from 'react'
import Search from '../components/Search'
import Trending from '../components/Trending'
import PopulationChief from '../components/PopulationChief'

function Explore() {
  return (
    <div>
      <Search/>
      <div className='flex flex-col my-10 gap-10 mx-10 '>
        <Trending/>
        <PopulationChief/>
    </div>

    </div>
  )
}

export default Explore