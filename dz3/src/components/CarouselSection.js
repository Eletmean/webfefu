import React, { useState, useEffect } from 'react'; //useEffect  для аватопереключение картинки

import bg1 from '../images/background.png';
import bg2 from '../images/background2.jpg';
import bg3 from '../images/background3.jpg';

import '../styles/Carousel.css';

const images = [bg1, bg2, bg3];

function CarouselSection() {
  const [currentIndex, setCurrentIndex] = useState(0); // 0 индекс первой картинки

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage(); //переключает картинку каждые 5 сек
    }, 5000);

    return () => clearInterval(interval); //старый таймер удаляется.Чтобы не было наложения нескольких интервалов
  }, [currentIndex]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length); // остаток от деления кол-ва картинок чтобы переход был циклический
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="info">
      <div className="carousel-container">
        {images.map((img, index) => ( // map для перебора элементов массива
          <img
            key={index}
            src={img} 
            alt={`background-${index}`} //текст, который будет отображаться, если картинка не загрузится
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
