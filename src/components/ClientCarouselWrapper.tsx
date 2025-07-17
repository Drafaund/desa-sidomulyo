"use client";

import dynamic from "next/dynamic";

interface CarouselSlide {
  id: number;
  image: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

interface ClientCarouselWrapperProps {
  slides: CarouselSlide[];
  autoSlideInterval?: number;
}

// Dynamically import Carousel with loading state
const Carousel = dynamic(() => import("@/components/Carousel"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-gray-200 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  ),
});

export default function ClientCarouselWrapper({
  slides,
  autoSlideInterval = 5000,
}: ClientCarouselWrapperProps) {
  return <Carousel slides={slides} autoSlideInterval={autoSlideInterval} />;
}
