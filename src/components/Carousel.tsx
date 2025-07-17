"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface CarouselSlide {
  id: number;
  image: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

interface CarouselProps {
  slides: CarouselSlide[];
  autoSlideInterval?: number;
}

const Carousel: React.FC<CarouselProps> = ({
  slides,
  autoSlideInterval = 3000,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [slides.length, autoSlideInterval]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className=" relative w-full h-screen overflow-hidden">
      {/* Slides Container */}
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={slide.id} className="relative w-full h-full flex-shrink-0">
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              {/* Overlay untuk memberikan kesan gelap agar teks lebih terlihat */}
              <div className="absolute inset-0 bg-black opacity-60" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex items-center justify-center h-full">
              <div className="text-center text-white max-w-4xl px-6">
                <h1
                  className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in drop-shadow-lg"
                  style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
                >
                  {slide.title}
                </h1>
                <p
                  className="text-lg md:text-xl mb-8 animate-fade-in-delay drop-shadow-md"
                  style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.7)" }}
                >
                  {slide.description}
                </p>
                <button
                  onClick={() => (window.location.href = slide.buttonLink)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 animate-fade-in-delay-2 shadow-lg"
                >
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300 z-20"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300 z-20"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === currentSlide ? "bg-white" : "bg-white bg-opacity-50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
