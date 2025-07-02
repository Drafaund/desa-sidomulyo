import React from "react";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";
import Image from "next/image";

const ArticlesSection = () => {
  const articles = [
    {
      id: 1,
      title: "Traditional Medicine in Sidomulyo",
      excerpt: "Exploring the rich heritage of traditional healing practices.",
      category: "Health",
      author: "Medical Team",
      date: "December 15, 2024",
      readTime: "5 min read",
      image: "/traditional-medicine.png",
      categoryColor: "bg-green-100 text-green-700",
    },
    {
      id: 2,
      title: "Cultural Heritage of East Java",
      excerpt: "Preserving our archaeological and literary treasures.",
      category: "Culture",
      author: "Archaeology Team",
      date: "December 10, 2024",
      readTime: "7 min read",
      image: "/cultural-heritage.png",
      categoryColor: "bg-purple-100 text-purple-700",
    },
    {
      id: 3,
      title: "Flora and Fauna Diversity",
      excerpt: "Understanding the biodiversity that supports our ecosystem.",
      category: "Environment",
      author: "Agro Team",
      date: "December 8, 2024",
      readTime: "6 min read",
      image: "/flora-fauna.png",
      categoryColor: "bg-blue-100 text-blue-700",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Latest Articles
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Insights from our community service team covering health, culture,
            agriculture, and more.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article
              key={article.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${article.categoryColor}`}
                  >
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {article.excerpt}
                </p>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {article.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {article.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {article.readTime}
                  </div>
                </div>

                {/* Read More Button */}
                <button className="group/btn flex items-center text-green-600 hover:text-green-700 font-medium transition-colors">
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* View All Articles Button */}
        <div className="text-center mt-12">
          <button className="group bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-full font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            View All Articles
            <ArrowRight className="ml-2 h-5 w-5 inline group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;
