// src/components/article/ArticleHero.tsx
import React from "react";
import { Search } from "lucide-react";

interface ArticleHeroProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const ArticleHero: React.FC<ArticleHeroProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Artikel & Berita Desa Sidomulyo
        </h1>
        <p className="text-xl mb-8 opacity-90">
          Temukan informasi terkini tentang kesehatan, budaya, agro, dan
          kehidupan desa
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto relative">
          <input
            type="text"
            placeholder="Cari artikel..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <Search className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default ArticleHero;
