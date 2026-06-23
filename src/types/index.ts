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
}

export interface Testimonial {
  quote: string;
  name: string;
  country: string;
}
