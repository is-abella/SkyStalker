import React from 'react'
import Header from '../components/Header'
import SearchFrom from '../components/SearchFrom'
import SearchTo from '../components/SearchTo'
import AirportData from '../airports.json'

function Home() {
  return (
    <div>
        <Header/>
        <div className='flex gap-5 justify-center'>
          <SearchFrom placeholder="Search for a city..." data={AirportData}/>
          <SearchTo placeholder="Search for a city..." data={AirportData}/>
        </div>
    </div>

  )
}

export default Home