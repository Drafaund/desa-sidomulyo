// src/components/article/FeaturedArticle.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ChevronRight } from "lucide-react";
import { Article } from "../../types/article";

interface FeaturedArticleProps {
  article: Article;
}

const FeaturedArticle: React.FC<FeaturedArticleProps> = ({ article }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="md:flex">
        <div className="md:w-1/2">
          <Image
            width={600}
            height={400}
            src={article.image}
            alt={article.title}
            className="w-full h-64 md:h-full object-cover"
          />
        </div>
        <div className="md:w-1/2 p-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              {article.category}
            </span>
          </div>
          <Link href={`/Artikel/${article.slug}`}>
            <h3 className="text-2xl font-bold mb-4 hover:text-blue-600 cursor-pointer">
              {article.title}
            </h3>
          </Link>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{article.date}</span>
              </div>
            </div>
            <Link href={`/Artikel/${article.slug}`}>
              <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
                Baca Selengkapnya
                <ChevronRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedArticle;
