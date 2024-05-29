import { useEffect, useState } from "react";
import "./imageSlider.css"; // Assume styles are here

const ImageSlider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoSlideEnabled, setIsAutoSlideEnabled] = useState(true); 

const handleTouchStart = (e) => {
  const touchDown = e.touches[0].clientX;
  setTouchPosition(touchDown);
};

const handleTouchMove = (e) => {
  if (!touchPosition) return;
  const currentTouch = e.touches[0].clientX;
  const diff = touchPosition - currentTouch;
  
  if (diff > 5) {
    // Swipe left
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
    setTouchPosition(null);
  } else if (diff < -5) {
    // Swipe right
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length)
    setTouchPosition(null)
  }
};

  useEffect(() => {
    const interval = isAutoSlideEnabled ? setInterval(() => {
      setCurrentIndex(currentIndex => (currentIndex + 1) % slides.length);
    }, 6000) : null;

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoSlideEnabled, slides.length, currentIndex]);

  const goToSlide = (slideIndex) => {
    setIsAutoSlideEnabled(false); 
    setTimeout(() => setIsAutoSlideEnabled(true), 1000); 
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="slider">
      <div className="slide-image" style={{ backgroundImage: `url(${slides[currentIndex].url})` }}></div>
      <div className="dots-container">
        {slides.map((slide, index) => (
          <div
            className={`dot ${index === currentIndex ? "active" : ""}`}
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          >
            ●
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
