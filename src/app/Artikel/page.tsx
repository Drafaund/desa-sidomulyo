// src/app/Artikel/page.tsx
"use client";
import React, { useState } from "react";
import { articles } from "../../../data/article";

// Import komponen
import ArticleHero from "../../components/article/ArticleHero";
import FeaturedArticle from "../../components/article/FeaturedArticle";
import ArticleList from "../../components/article/ArticleList";
import LoadMoreButton from "../../components/article/LoadMoreButton";
import Newsletter from "../../components/article/NewsLetter";

const DesaArticlePage = () => {
  const [activeTab, setActiveTab] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleArticles, setVisibleArticles] = useState(6);

  const categories = [
    "Semua",
    "Kesehatan",
    "Budaya & Sejarah",
    "Agro & Lingkungan",
    "Pembangunan",
    "Pendidikan",
  ];

  const categoryColors = {
    Kesehatan: {
      bg: "bg-green-500",
      text: "text-green-600",
      bgLight: "bg-green-100",
      hover: "hover:bg-green-200",
    },
    "Budaya & Sejarah": {
      bg: "bg-purple-500",
      text: "text-purple-600",
      bgLight: "bg-purple-50",
      hover: "hover:bg-purple-100",
    },
    "Agro & Lingkungan": {
      bg: "bg-emerald-500",
      text: "text-emarald-600",
      bgLight: "bg-emerald-50",
      hover: "hover:bg-emerald-100",
    },
    Pembangunan: {
      bg: "bg-orange-500",
      text: "text-orange-600",
      bgLight: "bg-orange-50",
      hover: "hover:bg-orange-100",
    },
    Pendidikan: {
      bg: "bg-indigo-500",
      text: "text-indigo-600",
      bgLight: "bg-indigo-50",
      hover: "hover:bg-indigo-100",
    },
  };

  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      activeTab === "Semua" || article.category === activeTab;
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = filteredArticles.find((article) => article.featured);
  const regularArticles = filteredArticles
    .filter((article) => !article.featured)
    .slice(0, visibleArticles);

  const handleLoadMore = () => {
    setVisibleArticles((prev) => prev + 3);
  };

  const getCategoryColor = (categoryName: string) => {
    const category = categories.find((cat) => cat === categoryName);
    return category ? categoryColors[category] : null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Search */}
      <ArticleHero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Category Tabs */}
      <div className="bg-white py-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => {
              const isActive = activeTab === category;

              // Get category color
              const getCategoryColors = () => {
                if (category === "Semua") {
                  return {
                    active: "bg-gray-600 text-white",
                    inactive: "bg-gray-100 text-gray-600 hover:bg-gray-200",
                  };
                }

                const colorConfig = categoryColors[category];
                if (!colorConfig) {
                  return {
                    active: "bg-gray-600 text-white",
                    inactive: "bg-white text-gray-600 hover:bg-gray-100",
                  };
                }

                return {
                  active: `${colorConfig.bg} text-white`,
                  inactive: `${colorConfig.bgLight} ${colorConfig.text} ${colorConfig.hover}`,
                };
              };

              const colors = getCategoryColors();

              return (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${
                    isActive ? colors.active : colors.inactive
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Articles Section */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Artikel Terbaru
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Featured Article */}
        {featuredArticle && (
          <div className="mb-12">
            <FeaturedArticle article={featuredArticle} />
          </div>
        )}

        {/* Articles Grid */}
        <ArticleList articles={regularArticles} />

        {/* Load More Button - only show if there are more articles to load */}
        {regularArticles.length <
          filteredArticles.filter((a) => !a.featured).length && (
          <LoadMoreButton onClick={handleLoadMore} />
        )}
      </div>

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  );
};

export default DesaArticlePage;
