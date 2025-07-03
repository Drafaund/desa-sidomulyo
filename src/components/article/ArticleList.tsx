// src/components/article/ArticleList.tsx
import React, { useState } from "react";
import { Article } from "../../../types/article";
import ArticleCard from "./ArticleCard";

interface ArticleListProps {
  articles: Article[];
}

const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
  const [displayedCount, setDisplayedCount] = useState(7);
  const articlesPerPage = 7;

  // Get the articles to display based on current count
  const displayedArticles = articles.slice(0, displayedCount);

  // Check if there are more articles to load
  const hasMoreArticles = displayedCount < articles.length;

  // Handle load more button click
  const handleLoadMore = () => {
    setDisplayedCount((prev) => prev + articlesPerPage);
  };

  return (
    <div className="w-full">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {/* Load More Button */}
      {hasMoreArticles && (
        <div className="text-center mt-12">
          <button
            onClick={handleLoadMore}
            className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-all duration-300 inline-flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Muat Artikel Lainnya
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Articles counter */}
          <p className="text-gray-600 mt-4 text-sm">
            Menampilkan {displayedCount} dari {articles.length} artikel
          </p>
        </div>
      )}

      {/* Show message when all articles are displayed */}
      {!hasMoreArticles && articles.length > articlesPerPage && (
        <div className="text-center mt-12">
          <p className="text-gray-600 text-sm">
            Semua artikel telah ditampilkan ({articles.length} artikel)
          </p>
        </div>
      )}
    </div>
  );
};

export default ArticleList;
