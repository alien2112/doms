import React from 'react'
import ImageSlider from '../components/imageSlider'
import Explore from './Explore';
function Home() {
const slides =[
  {url:'src/assets/1.jpg',title:'vegan'},
  {url:'src/assets/2.jpg',title:'meat'},
  {url:'src/assets/3.jpg',title:'tacos'},
  {url:'src/assets/4.jpg',title:'r'},
  {url:'src/assets/5.jpg',title:'fancy'}
];
const conatinerStyle = {
  width: "1440px",
  height: "300px",
  margin: "0 auto"
};

  return <div className='min-h-screen'>
  <div  style={conatinerStyle}>
    <ImageSlider id='first' slides={slides}></ImageSlider>
   
</div>
<div className='mt-5 mb-2'>
  <Explore/>
 
  </div>

  </div>
}

export default Home