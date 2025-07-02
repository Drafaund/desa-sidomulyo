import React from "react";
import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";

const TourismAttractions = () => {
  const attractions = [
    {
      id: 1,
      title: "Rice Terraces",
      description:
        "Stunning terraced rice fields that showcase traditional farming methods.",
      image: "/rice-terrace.jpg",
      rating: 4.8,
      category: "Nature",
      link: "/attractions/rice-terraces",
    },
    {
      id: 2,
      title: "Traditional Markets",
      description:
        "Experience authentic local culture and fresh agricultural products.",
      image: "/traditional-markets.jpg",
      rating: 4.6,
      category: "Culture",
      link: "/attractions/traditional-markets",
    },
    {
      id: 3,
      title: "Natural Landscapes",
      description:
        "Breathtaking mountain views and pristine natural environments.",
      image: "/natural-landscape.jpg",
      rating: 4.9,
      category: "Nature",
      link: "/attractions/natural-landscapes",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Tourism Attractions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the natural beauty and cultural richness that makes
            Sidomulyo a perfect destination for tourists and investors.
          </p>
        </div>

        {/* Attractions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {attractions.map((attraction) => (
            <div
              key={attraction.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
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
                  <span className="bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                    {attraction.category}
                  </span>
                </div>

                {/* Rating */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-700">
                    {attraction.rating}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                  {attraction.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {attraction.description}
                </p>

                {/* Learn More Button */}
                <button className="group/btn flex items-center text-green-600 hover:text-green-700 font-medium transition-colors">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="group bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-full font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            View All Attractions
            <ArrowRight className="ml-2 h-5 w-5 inline group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TourismAttractions;
