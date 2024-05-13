import { useEffect, useState } from "react";

const slideStyles = {
  width: "100%",
  height: "100%",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const sliderStyles = {
  position: "relative",
  height: "100%",
};

const dotsContainerStyles = {
  display: "flex",
  justifyContent: "center",
};

const dotStyle = {
  margin: "0 3px",
  cursor: "pointer",
  fontSize: "30px",
};

const ImageSlider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoSlideEnabled, setIsAutoSlideEnabled] = useState(true); // Flag to control auto-slide

  
  useEffect(() => {
    if (isAutoSlideEnabled) {
      const intervalId = setInterval(() => {
        setCurrentIndex(currentIndex => (currentIndex + 1) % slides.length);
      }, 6000);

      return () => clearInterval(intervalId);
    }
  }, [isAutoSlideEnabled, slides.length]);

  const goToSlide = (slideIndex) => {
    setIsAutoSlideEnabled(false); 
    setTimeout(() => setIsAutoSlideEnabled(true), 1000); 
    setCurrentIndex(slideIndex);
  };
  const slideStylesWidthBackground = {
    ...slideStyles,
    backgroundImage: `url(${slides[currentIndex].url})`,
  };

  return (
    
    <div style={sliderStyles}>
        
      <div>
      </div>
      <div  style={slideStylesWidthBackground}></div>
      <div className="flex transition-transform duration-500"  style={dotsContainerStyles}>
        {slides.map((slide, slideIndex) => (
          <div
            style={dotStyle}
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={ slideIndex === currentIndex ?"text-white" : ""}
          >

            ● 
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;