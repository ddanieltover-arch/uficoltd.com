export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  url: string;
  email: string;
  phone: string;
  address: string;
  hours: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  category: string;
  categoryName: string;
  image: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  updatedAt?: string | Date;
}

export interface Category {
  slug: string;
  name: string;
  count: number;
}

export interface PageContent {
  title: string;
  slug: string;
  paragraphs: string[];
  metaTitle?: string | null;
  metaDescription?: string | null;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  paragraphs: string[];
  publishedAt?: string | Date | null;
  updatedAt?: string | Date;
  metaTitle?: string | null;
  metaDescription?: string | null;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface GlossaryTerm {
  term: string;
  slug: string;
  definition: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  country: string;
}
