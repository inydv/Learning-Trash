import React from 'react'
import Navbar from '../Components/Navbar'
import Products from '../Components/Products'
import Slider from '../Components/Slider'

function Home() {
  return (
    <div className='home'>
      <Navbar />
      <Slider />
      <Products />
    </div>
  )
}

export default Home
