export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  duration: string;
  price?: string;
  detailedDescription?: string;
  benefits?: string[];
}

export interface Testimonial {
  id: string;
  name: string; // First name only for privacy
  content: string;
  rating: number;
  date?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  author: string;
  tags?: string[];
  readingTime?: string;
}