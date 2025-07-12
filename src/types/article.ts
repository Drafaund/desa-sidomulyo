// src/types/article.ts
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
  view_count?: number;
  reading_time?: number;
}

export interface ArticleStats {
  total: number;
  featured: number;
  categories: number;
  totalTags: number;
  byCategory: { [key: string]: number };
  recentCount?: number;
  averageReadingTime?: number;
}

export interface ArticleFilters {
  category?: string;
  tag?: string;
  author?: string;
  featured?: boolean;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
}

export interface PaginatedArticles {
  articles: Article[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
  totalPages: number;
}

export interface ArticleCategory {
  category: string;
  count: number;
  description?: string;
}

export interface ArticleTag {
  tag: string;
  count: number;
}

export interface ArticleResponse {
  success: boolean;
  data?: Article | Article[] | PaginatedArticles;
  error?: string;
  message?: string;
}
