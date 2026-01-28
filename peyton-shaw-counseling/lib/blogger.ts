import { businessInfo } from '@/lib/constants';
import type { BlogListItem, BlogPost } from '@/lib/types';

type BloggerPostItem = {
  id: string;
  title: string;
  url: string;
  content?: string;
  labels?: string[];
  published: string;
  updated?: string;
  author?: {
    displayName?: string;
  };
};

type BloggerPostsResponse = {
  items?: BloggerPostItem[];
  nextPageToken?: string;
};

type BloggerBlogResponse = {
  id?: string;
};

const BLOGGER_API_BASE = 'https://www.googleapis.com/blogger/v3';
const BLOGGER_PAGE_SIZE = 100;
const BLOGGER_PAGE_LIMIT = 8;

const stripHtml = (value: string) =>
  value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

const buildExcerpt = (value: string, length = 160) => {
  if (!value) return '';
  if (value.length <= length) return value;
  return `${value.slice(0, length).trim()}...`;
};

const calculateReadingTime = (value: string) => {
  const words = value.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
};

const extractFirstImage = (html: string) => {
  if (!html) return undefined;
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match?.[1];
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const normalizeSlug = (value?: string) => slugify((value ?? '').replace(/\.html?$/i, ''));

const matchSlug = (candidate: string, target: string) => {
  const normalizedCandidate = normalizeSlug(candidate);
  const normalizedTarget = normalizeSlug(target);

  if (!normalizedCandidate || !normalizedTarget) return false;
  if (normalizedCandidate === normalizedTarget) return true;

  const isPrefixMatch =
    normalizedCandidate.startsWith(normalizedTarget) || normalizedTarget.startsWith(normalizedCandidate);

  if (!isPrefixMatch) return false;

  const shorter = Math.min(normalizedCandidate.length, normalizedTarget.length);
  const longer = Math.max(normalizedCandidate.length, normalizedTarget.length);

  return shorter / longer >= 0.7;
};

const getSlugFromUrl = (value: string, fallbackTitle?: string) => {
  try {
    const { pathname } = new URL(value);
    const segments = pathname.split('/').filter(Boolean);
    const last = segments[segments.length - 1] || '';
    const slug = last.replace(/\.html?$/i, '');
    const decoded = decodeURIComponent(slug);
    if (decoded) return decoded;
  } catch {
    // ignore parsing errors
  }
  return fallbackTitle ? slugify(fallbackTitle) : '';
};

const getApiKey = () => process.env.BLOGGER_API_KEY || process.env.GOOGLE_PLACES_API_KEY || '';

const getBloggerHost = () => {
  const blogUrl = process.env.BLOGGER_BLOG_URL;
  if (!blogUrl) return null;
  try {
    return new URL(blogUrl).host;
  } catch {
    return null;
  }
};

export const isBloggerConfigured = () => {
  const apiKey = getApiKey();
  const blogId = process.env.BLOGGER_BLOG_ID;
  const blogUrl = process.env.BLOGGER_BLOG_URL;
  return Boolean(apiKey && (blogId || blogUrl));
};

const rewriteInternalLinks = (html: string, blogHost: string | null, siteUrl: string) => {
  if (!html || !blogHost) return html;

  return html.replace(/href=(['"])(https?:\/\/[^'"]+)\1/gi, (match, quote, url) => {
    try {
      const parsed = new URL(url);
      if (parsed.host !== blogHost) return match;
      const slug = getSlugFromUrl(url);
      if (!slug) return match;
      return `href=${quote}${siteUrl}/blog/${slug}${quote}`;
    } catch {
      return match;
    }
  });
};

const getBlogId = async (apiKey: string) => {
  const configuredId = process.env.BLOGGER_BLOG_ID;
  if (configuredId) return configuredId;

  const blogUrl = process.env.BLOGGER_BLOG_URL;
  if (!blogUrl) return null;

  const response = await fetch(
    `${BLOGGER_API_BASE}/blogs/byurl?url=${encodeURIComponent(blogUrl)}&key=${apiKey}`,
    { next: { revalidate: 300 } }
  );

  if (!response.ok) {
    console.warn('Failed to resolve Blogger blog ID.');
    return null;
  }

  const data = (await response.json()) as BloggerBlogResponse;
  return data.id ?? null;
};

const toListItem = (item: BloggerPostItem, siteUrl: string, blogHost: string | null): BlogListItem => {
  const slug = getSlugFromUrl(item.url, item.title);
  const rawContent = item.content ?? '';
  const content = rewriteInternalLinks(rawContent, blogHost, siteUrl);
  const textContent = stripHtml(content);
  const labels = item.labels ?? [];

  return {
    id: slug || item.id,
    title: item.title,
    content,
    excerpt: buildExcerpt(textContent),
    publishedAt: item.published,
    updatedAt: item.updated,
    readTime: calculateReadingTime(textContent),
    category: labels[0] ?? 'Insights',
    tags: labels.slice(1),
    url: `/blog/${slug || slugify(item.title)}`,
    image: extractFirstImage(content),
    author: item.author?.displayName,
  };
};

const toBlogPost = (item: BloggerPostItem, siteUrl: string, blogHost: string | null): BlogPost => {
  const slug = getSlugFromUrl(item.url, item.title) || slugify(item.title);
  const rawContent = item.content ?? '';
  const contentHtml = rewriteInternalLinks(rawContent, blogHost, siteUrl);
  const textContent = stripHtml(contentHtml);
  const labels = item.labels ?? [];

  return {
    slug,
    title: item.title,
    excerpt: buildExcerpt(textContent),
    content: textContent,
    contentHtml,
    author: item.author?.displayName || 'Peyton Shaw',
    publishedAt: item.published,
    updatedAt: item.updated,
    keywords: labels,
    category: labels[0] ?? 'Insights',
    readingTime: calculateReadingTime(textContent),
    image: extractFirstImage(contentHtml),
  };
};

export const getBloggerPosts = async (maxResults = 9): Promise<BlogListItem[]> => {
  if (!isBloggerConfigured()) {
    return [];
  }

  const apiKey = getApiKey();
  const blogId = await getBlogId(apiKey);
  if (!blogId) {
    console.warn('Blogger blog ID or URL not configured.');
    return [];
  }

  const response = await fetch(
    `${BLOGGER_API_BASE}/blogs/${blogId}/posts?key=${apiKey}&maxResults=${maxResults}&fetchBodies=true&fetchImages=true`,
    { next: { revalidate: 300 } }
  );

  if (!response.ok) {
    console.warn('Failed to load Blogger posts.');
    return [];
  }

  const data = (await response.json()) as BloggerPostsResponse;
  const items = data.items ?? [];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || businessInfo.url;
  const blogHost = getBloggerHost();

  return items.map((item) => toListItem(item, siteUrl, blogHost));
};

export const getBloggerPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  if (!isBloggerConfigured()) {
    return null;
  }

  const apiKey = getApiKey();
  const blogId = await getBlogId(apiKey);
  if (!blogId) {
    return null;
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || businessInfo.url;
  const blogHost = getBloggerHost();
  let pageToken: string | undefined;

  for (let page = 0; page < BLOGGER_PAGE_LIMIT; page += 1) {
    const pageTokenQuery = pageToken ? `&pageToken=${pageToken}` : '';
    const response = await fetch(
      `${BLOGGER_API_BASE}/blogs/${blogId}/posts?key=${apiKey}&maxResults=${BLOGGER_PAGE_SIZE}&fetchBodies=true&fetchImages=true${pageTokenQuery}`,
      { next: { revalidate: 300 } }
    );

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as BloggerPostsResponse;
    const items = data.items ?? [];
    const match = items.find((item) => {
      const candidateFromUrl = getSlugFromUrl(item.url, item.title);
      const candidateFromTitle = slugify(item.title);
      return matchSlug(candidateFromUrl, slug) || matchSlug(candidateFromTitle, slug);
    });

    if (match) {
      return toBlogPost(match, siteUrl, blogHost);
    }

    if (!data.nextPageToken) {
      break;
    }

    pageToken = data.nextPageToken;
  }

  return null;
};
