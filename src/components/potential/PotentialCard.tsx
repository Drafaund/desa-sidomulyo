"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CategoryColor {
  bg: string;
  hover: string;
  text: string;
  bgLight: string;
  borderLight: string;
}

interface Attraction {
  id: number;
  title: string;
  slug: string; // Added slug field
  description: string;
  image: string;
  rating: number;
  category: string;
  link: string;
}

interface PotensiCardProps {
  attractions: Attraction[];
  categoryColors: Record<string, CategoryColor>;
}

const PotensiCard: React.FC<PotensiCardProps> = ({
  attractions,
  categoryColors,
}) => {
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoading, setIsLoading] = useState(false);

  // Reset visible count when attractions change (e.g., when tab changes)
  useEffect(() => {
    setVisibleCount(6);
  }, [attractions]);

  if (!attractions || attractions.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">
          Tidak ada potensi ditemukan untuk kategori ini.
        </p>
      </div>
    );
  }

  const handleLoadMore = () => {
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setVisibleCount((prev) => prev + 3);
      setIsLoading(false);
    }, 500);
  };

  const visibleAttractions = attractions.slice(0, visibleCount);
  const hasMore = visibleCount < attractions.length;

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Attractions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleAttractions.map((attraction) => {
            const categoryColor = categoryColors[attraction.category];

            return (
              <div
                key={attraction.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Clickable Card Container - Using slug instead of id */}
                <Link href={`/PotensiDesa/${attraction.slug}`}>
                  <div className="cursor-pointer">
                    {/* Image */}
                    <div className="relative overflow-hidden">
                      <Image
                        src={attraction.image}
                        alt={attraction.title}
                        width={400}
                        height={300}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span
                          className={`${categoryColor.bgLight} ${categoryColor.text} px-3 py-1 rounded-full text-sm font-medium border-2 ${categoryColor.borderLight} backdrop-blur-sm`}
                        >
                          {attraction.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3
                        className={`text-xl font-semibold text-gray-900 mb-3 group-hover:${categoryColor.text} transition-colors`}
                      >
                        {attraction.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {attraction.description}
                      </p>
                    </div>
                  </div>
                </Link>

                {/* Learn More Button - Outside of Link to avoid nested links, using slug */}
                <div className="px-6 pb-6">
                  <Link href={`/PotensiDesa/${attraction.slug}`}>
                    <button
                      className={`group/btn flex items-center ${categoryColor.text} hover:opacity-80 font-medium transition-colors`}
                    >
                      Pelajari Lebih Lanjut
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="flex justify-center mt-12">
            <button
              onClick={handleLoadMore}
              disabled={isLoading}
              className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Memuat...
                </>
              ) : (
                <>
                  <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                  Muat Potensi Lainnya
                </>
              )}
            </button>
          </div>
        )}

        {/* Info Text */}
        <div className="text-center mt-8 text-gray-500">
          <p>
            Menampilkan {visibleAttractions.length} dari {attractions.length}{" "}
            potensi
            {hasMore && (
              <span className="block text-sm mt-1">
                Klik tombol di atas untuk melihat lebih banyak
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PotensiCard;
