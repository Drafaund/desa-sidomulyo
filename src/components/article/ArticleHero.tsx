// src/components/article/ArticleHero.tsx
import React from "react";
import Image from "next/image";
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
    <div className="relative text-white py-50  overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/newspaper-m1.jpg" // Ganti dengan path gambar Anda
          alt="Background Desa Sidomulyo"
          fill
          className="object-cover"
          priority
          quality={75}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Artikel & Berita Desa Sidomulyo
        </h1>
        <p className="text-xl mb-8 opacity-90">
          Temukan informasi terkini tentang kesehatan, budaya, agro, dan
          kehidupan desa
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto relative text-white">
          <input
            type="text"
            placeholder="Cari artikel..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white outline-white text-black focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <Search className="absolute right-3 top-3 w-5 h-5 text-black" />
        </div>
      </div>
    </div>
  );
};

export default ArticleHero;
