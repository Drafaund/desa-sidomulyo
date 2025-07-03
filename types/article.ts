export interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string; // Konten lengkap artikel
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
  tags?: string[];
  slug: string; // URL-friendly version of title
}

export interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}
