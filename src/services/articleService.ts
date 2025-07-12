// src/services/articleService.ts
import { supabase } from "../utils/supabase";

export interface Article {
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
  created_at?: string;
  updated_at?: string;
}

export interface ArticleStats {
  total: number;
  featured: number;
  categories: number;
  totalTags: number;
  byCategory: { [key: string]: number };
}

// Database article type (what comes from Supabase)
interface DatabaseArticle {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string | null;
  image_url: string;
  featured: boolean;
  tags: string[] | null;
  created_at?: string;
  updated_at?: string;
}

// Transform database result to match our Article interface
const transformArticle = (dbArticle: DatabaseArticle): Article => {
  return {
    ...dbArticle,
    date: dbArticle.date
      ? new Date(dbArticle.date).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    tags: Array.isArray(dbArticle.tags) ? dbArticle.tags : [],
  };
};

// Error handling wrapper
const handleSupabaseError = (
  error: Error | { message: string },
  operation: string
) => {
  console.error(`${operation} error:`, error);
  throw new Error(`${operation} gagal: ${error.message}`);
};

// Get all articles with pagination and filtering
export const getAllArticles = async (
  page: number = 1,
  limit: number = 10,
  category?: string,
  featured?: boolean
): Promise<{ articles: Article[]; total: number; hasMore: boolean }> => {
  try {
    let query = supabase
      .from("articles")
      .select("*", { count: "exact" })
      .order("date", { ascending: false });

    // Apply filters
    if (category) {
      query = query.eq("category", category);
    }
    if (featured !== undefined) {
      query = query.eq("featured", featured);
    }

    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      handleSupabaseError(error, "Mengambil artikel");
    }

    const articles = data?.map(transformArticle) || [];
    const total = count || 0;
    const hasMore = articles.length === limit;

    return { articles, total, hasMore };
  } catch (error) {
    handleSupabaseError(error as Error, "Mengambil artikel");
    return { articles: [], total: 0, hasMore: false };
  }
};

// Get article by slug with error handling
export const getArticleBySlug = async (
  slug: string
): Promise<Article | null> => {
  try {
    if (!slug) {
      throw new Error("Slug tidak boleh kosong");
    }

    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        // No rows returned
        return null;
      }
      handleSupabaseError(error, "Mengambil artikel");
    }

    return data ? transformArticle(data) : null;
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("tidak boleh kosong")
    ) {
      throw error;
    }
    handleSupabaseError(error as Error, "Mengambil artikel");
    return null;
  }
};

// Get featured articles
export const getFeaturedArticles = async (
  limit: number = 6
): Promise<Article[]> => {
  try {
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("featured", true)
      .order("date", { ascending: false })
      .limit(limit);

    if (error) {
      handleSupabaseError(error, "Mengambil artikel unggulan");
    }

    return data?.map(transformArticle) || [];
  } catch (error) {
    handleSupabaseError(error as Error, "Mengambil artikel unggulan");
    return [];
  }
};

// Get articles by category with pagination
export const getArticlesByCategory = async (
  category: string,
  page: number = 1,
  limit: number = 10
): Promise<{ articles: Article[]; total: number; hasMore: boolean }> => {
  try {
    if (!category) {
      throw new Error("Kategori tidak boleh kosong");
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await supabase
      .from("articles")
      .select("*", { count: "exact" })
      .eq("category", category)
      .order("date", { ascending: false })
      .range(from, to);

    if (error) {
      handleSupabaseError(error, "Mengambil artikel berdasarkan kategori");
    }

    const articles = data?.map(transformArticle) || [];
    const total = count || 0;
    const hasMore = articles.length === limit;

    return { articles, total, hasMore };
  } catch (error) {
    handleSupabaseError(
      error as Error,
      "Mengambil artikel berdasarkan kategori"
    );
    return { articles: [], total: 0, hasMore: false };
  }
};

// Get articles by tag with pagination
export const getArticlesByTag = async (
  tag: string,
  page: number = 1,
  limit: number = 10
): Promise<{ articles: Article[]; total: number; hasMore: boolean }> => {
  try {
    if (!tag) {
      throw new Error("Tag tidak boleh kosong");
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await supabase
      .from("articles")
      .select("*", { count: "exact" })
      .contains("tags", [tag])
      .order("date", { ascending: false })
      .range(from, to);

    if (error) {
      handleSupabaseError(error, "Mengambil artikel berdasarkan tag");
    }

    const articles = data?.map(transformArticle) || [];
    const total = count || 0;
    const hasMore = articles.length === limit;

    return { articles, total, hasMore };
  } catch (error) {
    handleSupabaseError(error as Error, "Mengambil artikel berdasarkan tag");
    return { articles: [], total: 0, hasMore: false };
  }
};

// Enhanced search with multiple criteria
export const searchArticles = async (
  query: string,
  page: number = 1,
  limit: number = 10,
  category?: string
): Promise<{ articles: Article[]; total: number; hasMore: boolean }> => {
  try {
    if (!query || query.trim().length < 2) {
      throw new Error("Query pencarian minimal 2 karakter");
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;
    const searchQuery = query.trim();

    let supabaseQuery = supabase
      .from("articles")
      .select("*", { count: "exact" })
      .or(
        `title.ilike.%${searchQuery}%,excerpt.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%,author.ilike.%${searchQuery}%`
      );

    // Apply category filter if provided
    if (category) {
      supabaseQuery = supabaseQuery.eq("category", category);
    }

    const { data, error, count } = await supabaseQuery
      .order("date", { ascending: false })
      .range(from, to);

    if (error) {
      handleSupabaseError(error, "Mencari artikel");
    }

    const articles = data?.map(transformArticle) || [];
    const total = count || 0;
    const hasMore = articles.length === limit;

    return { articles, total, hasMore };
  } catch (error) {
    handleSupabaseError(error as Error, "Mencari artikel");
    return { articles: [], total: 0, hasMore: false };
  }
};

// Get recent articles
export const getRecentArticles = async (
  limit: number = 5
): Promise<Article[]> => {
  try {
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .order("date", { ascending: false })
      .limit(limit);

    if (error) {
      handleSupabaseError(error, "Mengambil artikel terbaru");
    }

    return data?.map(transformArticle) || [];
  } catch (error) {
    handleSupabaseError(error as Error, "Mengambil artikel terbaru");
    return [];
  }
};

// Get articles related to a specific article (by category, excluding current article)
export const getRelatedArticles = async (
  currentSlug: string,
  category: string,
  limit: number = 3
): Promise<Article[]> => {
  try {
    if (!currentSlug || !category) {
      return [];
    }

    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("category", category)
      .neq("slug", currentSlug)
      .order("date", { ascending: false })
      .limit(limit);

    if (error) {
      handleSupabaseError(error, "Mengambil artikel terkait");
    }

    return data?.map(transformArticle) || [];
  } catch (error) {
    handleSupabaseError(error as Error, "Mengambil artikel terkait");
    return [];
  }
};

// Get all unique categories with count
export const getArticleCategories = async (): Promise<
  { category: string; count: number }[]
> => {
  try {
    const { data, error } = await supabase
      .from("articles")
      .select("category")
      .order("category");

    if (error) {
      handleSupabaseError(error, "Mengambil kategori artikel");
    }

    // Count occurrences of each category
    const categoryCount: { [key: string]: number } = {};
    data?.forEach((item) => {
      if (item.category) {
        categoryCount[item.category] = (categoryCount[item.category] || 0) + 1;
      }
    });

    return Object.entries(categoryCount)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count);
  } catch (error) {
    handleSupabaseError(error as Error, "Mengambil kategori artikel");
    return [];
  }
};

// Get all unique tags with count
export const getArticleTags = async (): Promise<
  { tag: string; count: number }[]
> => {
  try {
    const { data, error } = await supabase.from("articles").select("tags");

    if (error) {
      handleSupabaseError(error, "Mengambil tag artikel");
    }

    // Count occurrences of each tag
    const tagCount: { [key: string]: number } = {};
    data?.forEach((item) => {
      if (Array.isArray(item.tags)) {
        item.tags.forEach((tag: string) => {
          if (tag) {
            tagCount[tag] = (tagCount[tag] || 0) + 1;
          }
        });
      }
    });

    return Object.entries(tagCount)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count);
  } catch (error) {
    handleSupabaseError(error as Error, "Mengambil tag artikel");
    return [];
  }
};

// Get comprehensive article statistics
export const getArticleStats = async (): Promise<ArticleStats> => {
  try {
    const { data, error } = await supabase
      .from("articles")
      .select("id, category, featured, tags");

    if (error) {
      handleSupabaseError(error, "Mengambil statistik artikel");
    }

    const articles = data || [];
    const categoryCount: { [key: string]: number } = {};
    const allTags = new Set<string>();

    articles.forEach((article) => {
      // Count by category
      if (article.category) {
        categoryCount[article.category] =
          (categoryCount[article.category] || 0) + 1;
      }

      // Collect all unique tags
      if (Array.isArray(article.tags)) {
        article.tags.forEach((tag: string) => {
          if (tag) allTags.add(tag);
        });
      }
    });

    return {
      total: articles.length,
      featured: articles.filter((article) => article.featured).length,
      categories: Object.keys(categoryCount).length,
      totalTags: allTags.size,
      byCategory: categoryCount,
    };
  } catch (error) {
    handleSupabaseError(error as Error, "Mengambil statistik artikel");
    return {
      total: 0,
      featured: 0,
      categories: 0,
      totalTags: 0,
      byCategory: {},
    };
  }
};

// Get popular articles (can be extended with view count later)
export const getPopularArticles = async (
  limit: number = 5
): Promise<Article[]> => {
  try {
    // For now, return featured articles as popular
    // Later can be extended with actual view count or engagement metrics
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("featured", true)
      .order("date", { ascending: false })
      .limit(limit);

    if (error) {
      handleSupabaseError(error, "Mengambil artikel populer");
    }

    return data?.map(transformArticle) || [];
  } catch (error) {
    handleSupabaseError(error as Error, "Mengambil artikel populer");
    return [];
  }
};

// Get articles by date range
export const getArticlesByDateRange = async (
  startDate: string,
  endDate: string,
  page: number = 1,
  limit: number = 10
): Promise<{ articles: Article[]; total: number; hasMore: boolean }> => {
  try {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await supabase
      .from("articles")
      .select("*", { count: "exact" })
      .gte("date", startDate)
      .lte("date", endDate)
      .order("date", { ascending: false })
      .range(from, to);

    if (error) {
      handleSupabaseError(
        error,
        "Mengambil artikel berdasarkan rentang tanggal"
      );
    }

    const articles = data?.map(transformArticle) || [];
    const total = count || 0;
    const hasMore = articles.length === limit;

    return { articles, total, hasMore };
  } catch (error) {
    handleSupabaseError(
      error as Error,
      "Mengambil artikel berdasarkan rentang tanggal"
    );
    return { articles: [], total: 0, hasMore: false };
  }
};

// Batch operations for better performance
export const getArticlesBatch = async (slugs: string[]): Promise<Article[]> => {
  try {
    if (!slugs || slugs.length === 0) {
      return [];
    }

    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .in("slug", slugs)
      .order("date", { ascending: false });

    if (error) {
      handleSupabaseError(error, "Mengambil artikel secara batch");
    }

    return data?.map(transformArticle) || [];
  } catch (error) {
    handleSupabaseError(error as Error, "Mengambil artikel secara batch");
    return [];
  }
};

// Get article sitemap data (for SEO)
export const getArticlesSitemap = async (): Promise<
  { slug: string; date: string; category: string }[]
> => {
  try {
    const { data, error } = await supabase
      .from("articles")
      .select("slug, date, category")
      .order("date", { ascending: false });

    if (error) {
      handleSupabaseError(error, "Mengambil data sitemap artikel");
    }

    return (
      data?.map((item) => ({
        slug: item.slug,
        date: item.date
          ? new Date(item.date).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
        category: item.category || "",
      })) || []
    );
  } catch (error) {
    handleSupabaseError(error as Error, "Mengambil data sitemap artikel");
    return [];
  }
};

// Cache utilities (can be extended with Redis or similar)
interface CacheItem<T> {
  data: T;
  timestamp: number;
}

const cache = new Map<string, CacheItem<unknown>>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export const getCachedData = <T>(key: string): T | null => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data as T;
  }
  cache.delete(key);
  return null;
};

export const setCachedData = <T>(key: string, data: T): void => {
  cache.set(key, { data, timestamp: Date.now() });
};

// Cached version of popular functions
export const getCachedArticleStats = async (): Promise<ArticleStats> => {
  const cacheKey = "article_stats";
  const cached = getCachedData<ArticleStats>(cacheKey);

  if (cached) {
    return cached;
  }

  const stats = await getArticleStats();
  setCachedData(cacheKey, stats);
  return stats;
};

export const getCachedArticleCategories = async (): Promise<
  { category: string; count: number }[]
> => {
  const cacheKey = "article_categories";
  const cached = getCachedData<{ category: string; count: number }[]>(cacheKey);

  if (cached) {
    return cached;
  }

  const categories = await getArticleCategories();
  setCachedData(cacheKey, categories);
  return categories;
};

export const getCachedArticleTags = async (): Promise<
  { tag: string; count: number }[]
> => {
  const cacheKey = "article_tags";
  const cached = getCachedData<{ tag: string; count: number }[]>(cacheKey);

  if (cached) {
    return cached;
  }

  const tags = await getArticleTags();
  setCachedData(cacheKey, tags);
  return tags;
};

// Helper function to validate slug format
export const isValidSlug = (slug: string): boolean => {
  if (!slug || typeof slug !== "string") return false;

  // Check if slug contains only allowed characters
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug) && slug.length >= 3 && slug.length <= 100;
};

// Helper function to generate slug from title
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .trim()
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
};

// Helper function to truncate content
export const truncateContent = (
  content: string,
  maxLength: number = 150
): string => {
  if (!content) return "";

  // Remove HTML tags
  const textContent = content.replace(/<[^>]*>/g, "");

  if (textContent.length <= maxLength) {
    return textContent;
  }

  return textContent.substring(0, maxLength).trim() + "...";
};

// Helper function to estimate reading time
export const estimateReadingTime = (
  content: string,
  wordsPerMinute: number = 200
): number => {
  if (!content) return 0;

  const textContent = content.replace(/<[^>]*>/g, "");
  const wordCount = textContent.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

// Export all utility functions
export const articleUtils = {
  isValidSlug,
  generateSlug,
  truncateContent,
  estimateReadingTime,
  getCachedData,
  setCachedData,
};
