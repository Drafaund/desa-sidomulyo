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
}

// Transform database result to match our Article interface
const transformArticle = (dbArticle: any): Article => {
  return {
    ...dbArticle,
    date: dbArticle.date
      ? new Date(dbArticle.date).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    tags: dbArticle.tags || [],
  };
};

// Get all articles
export const getAllArticles = async (): Promise<Article[]> => {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    throw new Error(`Error fetching articles: ${error.message}`);
  }

  return data?.map(transformArticle) || [];
};

// Get article by slug
export const getArticleBySlug = async (
  slug: string
): Promise<Article | null> => {
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
    throw new Error(`Error fetching article: ${error.message}`);
  }

  return data ? transformArticle(data) : null;
};

// Get featured articles
export const getFeaturedArticles = async (): Promise<Article[]> => {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("featured", true)
    .order("date", { ascending: false });

  if (error) {
    throw new Error(`Error fetching featured articles: ${error.message}`);
  }

  return data?.map(transformArticle) || [];
};

// Get articles by category
export const getArticlesByCategory = async (
  category: string
): Promise<Article[]> => {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("category", category)
    .order("date", { ascending: false });

  if (error) {
    throw new Error(`Error fetching articles by category: ${error.message}`);
  }

  return data?.map(transformArticle) || [];
};

// Get articles by tag
export const getArticlesByTag = async (tag: string): Promise<Article[]> => {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .contains("tags", [tag])
    .order("date", { ascending: false });

  if (error) {
    throw new Error(`Error fetching articles by tag: ${error.message}`);
  }

  return data?.map(transformArticle) || [];
};

// Search articles
export const searchArticles = async (query: string): Promise<Article[]> => {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .or(
      `title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`
    )
    .order("date", { ascending: false });

  if (error) {
    throw new Error(`Error searching articles: ${error.message}`);
  }

  return data?.map(transformArticle) || [];
};

// Get recent articles
export const getRecentArticles = async (
  limit: number = 5
): Promise<Article[]> => {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("date", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`Error fetching recent articles: ${error.message}`);
  }

  return data?.map(transformArticle) || [];
};

// Get all unique categories
export const getArticleCategories = async (): Promise<string[]> => {
  const { data, error } = await supabase
    .from("articles")
    .select("category")
    .order("category");

  if (error) {
    throw new Error(`Error fetching categories: ${error.message}`);
  }

  // Get unique categories
  const uniqueCategories = [
    ...new Set(data?.map((item) => item.category) || []),
  ];
  return uniqueCategories;
};

// Get all unique tags
export const getArticleTags = async (): Promise<string[]> => {
  const { data, error } = await supabase.from("articles").select("tags");

  if (error) {
    throw new Error(`Error fetching tags: ${error.message}`);
  }

  // Flatten and get unique tags
  const allTags = data?.flatMap((item) => item.tags || []) || [];
  const uniqueTags = [...new Set(allTags)];
  return uniqueTags;
};

// Get article statistics
export const getArticleStats = async () => {
  const { data, error } = await supabase
    .from("articles")
    .select("id, category, featured, tags");

  if (error) {
    throw new Error(`Error fetching article stats: ${error.message}`);
  }

  const stats = {
    total: data?.length || 0,
    featured: data?.filter((article) => article.featured).length || 0,
    categories:
      [...new Set(data?.map((article) => article.category))].length || 0,
    totalTags:
      [...new Set(data?.flatMap((article) => article.tags || []))].length || 0,
  };

  return stats;
};
