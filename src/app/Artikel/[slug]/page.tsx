"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar, User, Tag, Share2, Clock } from "lucide-react";
import Link from "next/link";
import {
  getArticleBySlug,
  getRecentArticles,
  type Article,
} from "../../../services/articleService";
import { CldImage } from "next-cloudinary";

const ArticleDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shareSuccess, setShareSuccess] = useState(false);

  // Fetch article and related articles from Supabase
  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch main article
        const articleData = await getArticleBySlug(slug);

        if (!articleData) {
          setError("Artikel tidak ditemukan");
          return;
        }

        setArticle(articleData);

        // Fetch related articles (recent articles excluding current one)
        const recentArticles = await getRecentArticles(4);
        const filteredRelated = recentArticles.filter(
          (relatedArticle) => relatedArticle.slug !== slug
        );
        setRelatedArticles(filteredRelated.slice(0, 3));
      } catch (err) {
        console.error("Error fetching article:", err);
        setError("Gagal memuat artikel");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchArticleData();
    }
  }, [slug]);

  // Enhanced share functionality
  const handleShare = async () => {
    if (!article) return;

    const shareData = {
      title: article.title,
      text: article.excerpt,
      url: window.location.href,
    };

    try {
      if (navigator.share && navigator.canShare?.(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 3000);
      }
    } catch (err) {
      console.log("Error sharing:", err);
      // Fallback for clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 3000);
      } catch (clipboardErr) {
        console.error("Clipboard error:", clipboardErr);
      }
    }
  };

  // Format date with better locale support
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  // Estimate reading time
  const estimateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const textContent = content.replace(/<[^>]*>/g, ""); // Remove HTML tags
    const wordCount = textContent.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes;
  };

  // Loading state with skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded-lg mb-4 w-1/4"></div>
            <div className="h-12 bg-gray-200 rounded-lg mb-6 w-3/4"></div>
            <div className="h-64 bg-gray-200 rounded-lg mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-4">😔</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Oops!</h1>
          <p className="text-gray-600 mb-8">{error}</p>
          <Link href="/Artikel">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Kembali ke Artikel
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // Article not found (shouldn't happen with better error handling above)
  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-4">📝</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
          <p className="text-gray-600 mb-8">Artikel tidak ditemukan</p>
          <Link href="/Artikel">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Kembali ke Artikel
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <div className="bg-white/90 shadow-sm sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Kembali</span>
          </button>
        </div>
      </div>

      {/* Success message for share */}
      {shareSuccess && (
        <div className="fixed top-20 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
          Link berhasil disalin ke clipboard!
        </div>
      )}

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                article.category === "Sains & Teknologi"
                  ? "bg-red-100 text-red-800"
                  : article.category === "Sejarah & Budaya"
                  ? "bg-purple-100 text-purple-800"
                  : article.category === "Agrikultur & Lingkungan"
                  ? "bg-green-100 text-green-800"
                  : article.category === "Kesehatan & Medis"
                  ? "bg-blue-100 text-blue-800"
                  : article.category === "Hewan & Peternakan"
                  ? "bg-yellow-100 text-orange-800"
                  : "bg-pink-100 text-pink-800"
              }`}
            >
              {article.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{formatDate(article.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{estimateReadingTime(article.content)} menit baca</span>
            </div>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <Share2 className="w-5 h-5" />
              <span>Bagikan</span>
            </button>
          </div>

          {/* Featured Image */}
          <div className="mb-8">
            <CldImage
              src={article.image_url}
              alt={article.title}
              width={800}
              height={400}
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
              priority={true}
            />
          </div>

          {/* Article Excerpt */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
            <p className="text-lg text-gray-700 leading-relaxed font-medium">
              {article.excerpt}
            </p>
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-blockquote:text-gray-700 prose-blockquote:border-l-blue-500">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-5 h-5 text-gray-500" />
              <span className="font-medium text-gray-700">Tags:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Share Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <h3 className="text-xl font-bold mb-4">Bagikan Artikel Ini</h3>
          <button
            onClick={handleShare}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            Bagikan
          </button>
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="bg-white py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Artikel Terkait
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  href={`/Artikel/${relatedArticle.slug}`}
                  className="group"
                >
                  <div className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <CldImage
                      src={relatedArticle.image_url}
                      alt={relatedArticle.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="p-4">
                      <span className="text-sm text-blue-600 font-medium">
                        {relatedArticle.category}
                      </span>
                      <h3 className="font-bold text-gray-900 mt-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                        {relatedArticle.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="bg-gray-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Baca Artikel Lainnya</h2>
          <p className="text-gray-300 mb-8">
            Temukan informasi menarik lainnya tentang Desa Sidomulyo
          </p>
          <Link href="/Artikel">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Lihat Semua Artikel
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
