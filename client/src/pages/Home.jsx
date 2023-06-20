import React from 'react'
import Header from '../components/Header'
import SearchFrom from '../components/SearchFrom'
import AirportData from '../airports.json'

function Home() {
  return (
    <div>
        <Header/>
        <SearchFrom placeholder="Search for a city..." data={AirportData}/>
    </div>

  )
}

export default Home