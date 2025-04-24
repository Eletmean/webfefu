import React, { useState, useEffect } from 'react';

import bg1 from '../images/background.png';
import bg2 from '../images/background2.jpg';
import bg3 from '../images/background3.jpg';

import '../styles/Carousel.css';

const images = [bg1, bg2, bg3];

function CarouselSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="info">
      <div className="carousel-container">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`background-${index}`}
            className={`carousel-image ${index === currentIndex ? 'active' : ''}`}
          />
        ))}
      </div>
      <div className="overlay-box">
        <h2>QUALITY HIKING GEAR</h2>
        <div className="line"></div>
        <p>Your hiking gear for every adventure</p>
      </div>
      <button className="arrow left" onClick={prevImage}>&#10094;</button>
      <button className="arrow right" onClick={nextImage}>&#10095;</button>
    </section>
  );
}

export default CarouselSection;
