import React from 'react'
import Carousel from './Carousel';


const images = [
    'https://via.placeholder.com/600x400/FF0000/FFFFFF?text=Image+1',
    'https://via.placeholder.com/600x400/00FF00/FFFFFF?text=Image+2',
    'https://via.placeholder.com/600x400/0000FF/FFFFFF?text=Image+3',
    // Add more image URLs here
  ];
const Home = () => {
  return (
          <div className="App">
      <h1>Image Carousel</h1>
      <Carousel/>
      <Carousel images={images} />
    </div>
  )
}

export default Home
