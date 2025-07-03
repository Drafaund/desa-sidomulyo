// src/app/Artikel/page.tsx
"use client";
import React, { useState } from "react";
import { articles } from "../../../data/article";

// Import komponen
import ArticleHero from "../../components/article/ArticleHero";
import CategoryTabs from "../../components/article/CategoryTabs";
import FeaturedArticle from "../../components/article/FeaturedArticle";
import ArticleList from "../../components/article/ArticleList";
import LoadMoreButton from "../../components/article/LoadMoreButton";
import Newsletter from "../../components/article/NewsLetter";

const DesaArticlePage = () => {
  const [activeTab, setActiveTab] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleArticles, setVisibleArticles] = useState(6); // Untuk fitur "Load More"

  const categories = [
    "Semua",
    "Kesehatan",
    "Budaya & Sejarah",
    "Agro & Lingkungan",
    "Pembangunan",
    "Pendidikan",
  ];

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Search */}
      <ArticleHero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Category Tabs */}
      <CategoryTabs
        categories={categories}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Articles Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-8">Artikel Terbaru</h2>

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
