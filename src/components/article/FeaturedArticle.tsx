// src/components/article/FeaturedArticle.tsx
import React from "react";
import Link from "next/link";
import { Calendar, User, ChevronRight } from "lucide-react";
import { Article } from "../../types/article";
import { CldImage } from "next-cloudinary";

interface FeaturedArticleProps {
  article: Article;
}

const FeaturedArticle: React.FC<FeaturedArticleProps> = ({ article }) => {
  return (
    <div className="relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative h-64 lg:h-full">
          <CldImage
            src={article.image_url} // Changed from article.image to article.image_url
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="p-8">
          <div className="mb-4">
            <span className="inline-block rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-800">
              {article.category}
            </span>
          </div>

          <h2 className="mb-4 text-2xl font-bold text-gray-900 lg:text-3xl">
            {article.title}
          </h2>

          <p className="mb-6 text-gray-600 line-clamp-3">{article.excerpt}</p>

          <div className="mb-6 flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{article.date}</span>
            </div>
          </div>

          <Link
            href={`/Artikel/${article.slug}`}
            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-white transition-colors hover:bg-red-700"
          >
            Baca Selengkapnya
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedArticle;
