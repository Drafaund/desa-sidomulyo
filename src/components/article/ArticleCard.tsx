// src/components/article/ArticleCard.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";
import { Article } from "../../../types/article";

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  // Function to determine category color
  const getCategoryColorClass = (category: string) => {
    switch (category) {
      case "Kesehatan":
        return "bg-red-100 text-red-800";
      case "Budaya & Sejarah":
        return "bg-purple-100 text-purple-800";
      case "Agro & Lingkungan":
        return "bg-green-100 text-green-800";
      case "Pembangunan":
        return "bg-blue-100 text-blue-800";
      case "Pendidikan":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-pink-100 text-pink-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <Link href={`/Artikel/${article.slug}`}>
        <Image
          width={400}
          height={250}
          src={article.image}
          alt={article.title}
          className="w-full h-48 object-cover cursor-pointer"
        />
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
          <h3 className="text-xl font-bold mb-3 hover:text-blue-600 cursor-pointer line-clamp-2">
            {article.title}
          </h3>
        </Link>
        <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{article.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
