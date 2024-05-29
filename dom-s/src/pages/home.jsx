import React from "react";
import ImageSlider from "../components/imageSlider";
import Explore from "./Explore";
function Home() {
  const slides = [
    { url: "src/assets/1.jpg", title: "vegan" },
    { url: "src/assets/2.jpg", title: "meat" },
    { url: "src/assets/3.jpg", title: "tacos" },
    { url: "src/assets/4.jpg", title: "r" },
    { url: "src/assets/5.jpg", title: "fancy" },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden sm:overflow-x-auto">
      <div className="mb-10">
        <ImageSlider id="first" slides={slides}></ImageSlider>
      </div>
      <div className="mt-5 mb-2">
        <Explore />
      </div>
    </div>
  );
}

export default Home;
