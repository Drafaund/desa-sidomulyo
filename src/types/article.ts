// types/article.ts
export interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string; // Will be converted from Date to string
  image_url: string;
  featured: boolean;
  tags: string[];
}
