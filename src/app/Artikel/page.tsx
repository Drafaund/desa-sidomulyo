// src/app/Artikel/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "../../../utils/supabase";

// Import komponen
import ArticleHero from "../../components/article/ArticleHero";
import FeaturedArticle from "../../components/article/FeaturedArticle";
import ArticleList from "../../components/article/ArticleList";
import LoadMoreButton from "../../components/article/LoadMoreButton";
import Newsletter from "../../components/article/NewsLetter";

// Interface untuk article dari Supabase
interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  read_time: string;
  image_url: string;
  featured: boolean;
  tags: string[];
}

const DesaArticlePage = () => {
  const [activeTab, setActiveTab] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleArticles, setVisibleArticles] = useState(6);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>(["Semua"]);

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
      text: "text-emerald-600",
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

  // Fetch articles dari Supabase
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from("articles")
          .select("*")
          .order("date", { ascending: false });

        if (error) {
          throw error;
        }

        if (data) {
          setArticles(data);

          // Extract unique categories from articles
          const uniqueCategories = Array.from(
            new Set(data.map((article) => article.category))
          );
          setCategories(["Semua", ...uniqueCategories]);
        }
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError("Gagal memuat artikel");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

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

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat artikel...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{error}</h1>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

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

        {/* No Articles Message */}
        {articles.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              Belum ada artikel yang tersedia
            </p>
          </div>
        )}

        {/* No Filtered Articles Message */}
        {filteredArticles.length === 0 && articles.length > 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              Tidak ada artikel yang sesuai dengan pencarian "{searchTerm}"
              {activeTab !== "Semua" && ` dalam kategori "${activeTab}"`}
            </p>
          </div>
        )}

        {/* Featured Article */}
        {featuredArticle && (
          <div className="mb-12">
            <FeaturedArticle article={featuredArticle} />
          </div>
        )}

        {/* Articles Grid */}
        {regularArticles.length > 0 && (
          <ArticleList articles={regularArticles} />
        )}

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
