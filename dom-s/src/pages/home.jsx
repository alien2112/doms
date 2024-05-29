import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImageSlider from '../components/ImageSlider';
import Explore from './Explore';

function Home() {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/v1/products/find`);
        // Assuming the response data is an array of objects with url and title properties
        const slideData = res.data.map(item => ({
          url: item.imageUrl, 
          title: item.title
        }));
        setSlides(slideData);
      } catch (err) {
        console.error('Error fetching slides:', err);
      }
    };

    fetchSlides();
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden sm:overflow-x-auto">
      <div className="mb-10">
        {slides.length > 0 ? (
          <ImageSlider id="first" slides={slides} />
        ) : (
          <p>Loading slides...</p>
        )}
      </div>
      <div className="mt-5 mb-2">
        <Explore />
      </div>
    </div>
  );
}

export default Home;
