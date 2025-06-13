import React from 'react'
import Featured from '../components/Featured'
import Latest from '../components/Latest'
import Search from '../components/Search'


function Home() {
  return (
    <div className='flex flex-col my-10 gap-10 mx-20 '>
        <Search/>
        <Featured/>
        <Latest/>
    </div>
  )
}

export default Home