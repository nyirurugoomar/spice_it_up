import React, { useState } from 'react'
import Latest from '../components/Latest'
import Search from '../components/Search'
import Featured from '../components/Featured'

function Home() {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className='flex flex-col my-10 gap-10 mx-10 '>
      <Search onResults={setSearchResults}/>
      <Featured recipes={searchResults}/>
      {searchResults.length > 0 ? (
        <Latest recipes={searchResults} title="Search Results" />
      ) : (
        <Latest />
      )}
    </div>
  )
}

export default Home