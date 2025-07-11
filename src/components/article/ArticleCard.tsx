// src/components/article/ArticleCard.tsx
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { User, Calendar, Clock } from "lucide-react";
import { CldImage } from "next-cloudinary";

interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  image_url: string;
  featured: boolean;
  tags: string[];
}

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  // Function to determine category color
  const getCategoryColorClass = (category: string) => {
    switch (category.toLowerCase()) {
      case "kesehatan & medis":
        return "bg-blue-100 text-blue-800";
      case "sejarah & budaya":
        return "bg-purple-100 text-purple-800";
      case "agrikultur & lingkungan":
        return "bg-green-100 text-green-800";
      case "hewan dan peternakan":
        return "bg-orange-100 text-orange-800";
      case "sains dan teknologi":
        return "bg-red-100 text-red-800";
      case "berita":
        return "bg-blue-100 text-blue-800";
      case "tutorial":
        return "bg-indigo-100 text-indigo-800";
      case "lifestyle":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Function to calculate reading time (rough estimate)
  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200; // Average reading speed
    const wordCount = content.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readingTime} min read`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <Link href={`/Artikel/${article.slug}`}>
        <div className="relative">
          <CldImage
            width={400}
            height={250}
            src={article.image_url}
            alt={article.title}
            className="w-full h-48 object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
          />
          {article.featured && (
            <div className="absolute top-3 right-3">
              <span className="bg-yellow-400 text-yellow-800 px-2 py-1 rounded-full text-xs font-bold">
                Featured
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColorClass(
              article.category
            )}`}
          >
            {article.category}
          </span>
        </div>

        <Link href={`/Artikel/${article.slug}`}>
          <h3 className="text-xl font-bold mb-3 hover:text-blue-600 cursor-pointer line-clamp-2 transition-colors duration-200">
            {article.title}
          </h3>
        </Link>

        <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {article.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs"
              >
                #{tag}
              </span>
            ))}
            {article.tags.length > 3 && (
              <span className="text-gray-400 text-xs">
                +{article.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{article.author}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(article.date)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{calculateReadingTime(article.content)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
