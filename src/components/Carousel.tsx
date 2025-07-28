"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  autoSlideInterval = 5000,
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
    <div className="relative w-full h-[calc(100vh-60px)] sm:h-[calc(100vh-50px)] md:h-screen overflow-hidden">
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
                className="object-cover object-center"
                priority={index === 0}
                sizes="100vw"
              />
              {/* Overlay untuk memberikan kesan gelap agar teks lebih terlihat */}
              <div className="absolute inset-0 bg-black opacity-50 md:opacity-60" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex items-center justify-center h-full pt-4 sm:pt-4 md:pt-0 px-2">
              <div className="text-center text-white w-full max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl px-2 sm:px-4 md:px-6">
                <h1
                  className="text-lg sm:text-xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-3 md:mb-6 animate-fade-in drop-shadow-lg leading-tight"
                  style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
                >
                  {slide.title}
                </h1>
                <p
                  className="text-xs sm:text-sm md:text-lg lg:text-xl mb-3 sm:mb-4 md:mb-8 animate-fade-in-delay drop-shadow-md leading-relaxed"
                  style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.7)" }}
                >
                  {slide.description}
                </p>
                <button
                  onClick={() => (window.location.href = slide.buttonLink)}
                  className="bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold py-2 px-4 sm:py-2.5 sm:px-6 md:py-3 md:px-8 text-xs sm:text-sm md:text-base rounded-lg transition-all duration-300 animate-fade-in-delay-2 shadow-lg transform hover:scale-105 active:scale-95"
                >
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows - Hidden on small mobile, visible on larger screens */}
      <button
        onClick={prevSlide}
        className="hidden sm:block absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-2 md:p-3 rounded-full transition-all duration-300 z-20 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <svg
          className="w-4 h-4 md:w-6 md:h-6"
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
        className="hidden sm:block absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-2 md:p-3 rounded-full transition-all duration-300 z-20 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <svg
          className="w-4 h-4 md:w-6 md:h-6"
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
      <div className="absolute bottom-2 sm:bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white scale-110"
                : "bg-white bg-opacity-50 hover:bg-opacity-75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Touch/Swipe Indicators for Mobile - Using Lucide React Icons */}
      <div className="absolute bottom-12 sm:bottom-16 left-1/2 transform -translate-x-1/2 sm:hidden">
        <div className="flex items-center space-x-2 text-white text-xs opacity-70">
          <ChevronLeft className="w-4 h-4" />
          <span>Tap</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>

      {/* Mobile Swipe Areas - Invisible touch areas for easier swiping */}
      <div
        className="absolute left-0 top-0 w-1/3 h-full z-10 sm:hidden"
        onClick={prevSlide}
        aria-label="Previous slide touch area"
      />
      <div
        className="absolute right-0 top-0 w-1/3 h-full z-10 sm:hidden"
        onClick={nextSlide}
        aria-label="Next slide touch area"
      />
    </div>
  );
};

export default Carousel;
