import Image from 'next/image';
import React, { useState, useEffect } from 'react';

interface SlideType {
    image: string
}

interface Slides {
    slides : SlideType[]
}

export default function Carousel({slides} : Slides) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full overflow-hidden rounded-lg">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="min-w-full flex items-center justify-center bg-gray-100">
            <Image  src={slide.image} alt={`offer-slide-${index}`} height={1000} width={1000} className="w-full object-cover" />
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
          <button
            className="absolute hidden md:block w-10 left-2 top-1/2 transform -translate-y-1/2 bg-gray-100 text-gray-900 p-2 rounded-full hover:bg-gray-200"
            onClick={handlePrevious}
          >
            &#10094;
          </button>
          <button
            className="absolute hidden md:block w-10 right-2 top-1/2 transform -translate-y-1/2 bg-gray-100 text-gray-900 p-2 rounded-full hover:bg-gray-200"
            onClick={handleNext}
          >
            &#10095;
          </button>
        
    </div>
  );
};