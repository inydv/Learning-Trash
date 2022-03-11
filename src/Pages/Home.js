import React from 'react'
import Navbar from '../Components/Navbar'
import NewsLetter from '../Components/NewsLetter'
import Products from '../Components/Products'
import Slider from '../Components/Slider'

function Home() {
  return (
    <div className='home'>
      <Navbar />
      <Slider />
      <Products />
      <NewsLetter />
    </div>
  )
}

export default Home
