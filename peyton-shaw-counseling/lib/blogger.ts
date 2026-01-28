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

type BloggerIndexItem = {
  item: BloggerPostItem;
  canonicalSlug: string;
  aliases: string[];
};

type BloggerIndex = {
  items: BloggerIndexItem[];
  canonicalByAny: Map<string, string>;
  itemByCanonical: Map<string, BloggerIndexItem>;
};

export type BloggerResolvedPost = {
  kind: 'canonical' | 'alias';
  canonicalSlug: string;
  post: BlogPost;
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

const rewriteInternalLinks = (
  html: string,
  blogHost: string | null,
  siteUrl: string,
  resolveCanonicalSlug: (value: string) => string | null
) => {
  if (!html || !blogHost) return html;

  return html.replace(/href=(['"])(https?:\/\/[^'"]+)\1/gi, (match, quote, url) => {
    try {
      const parsed = new URL(url);
      if (parsed.host !== blogHost) return match;
      const slug = getSlugFromUrl(url);
      if (!slug) return match;
      const canonical = resolveCanonicalSlug(slug) ?? slug;
      return `href=${quote}${siteUrl}/blog/${canonical}${quote}`;
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

const fetchAllPosts = async (blogId: string, apiKey: string) => {
  const items: BloggerPostItem[] = [];
  let pageToken: string | undefined;

  for (let page = 0; page < BLOGGER_PAGE_LIMIT; page += 1) {
    const pageTokenQuery = pageToken ? `&pageToken=${pageToken}` : '';
    const response = await fetch(
      `${BLOGGER_API_BASE}/blogs/${blogId}/posts?key=${apiKey}&maxResults=${BLOGGER_PAGE_SIZE}&fetchBodies=true&fetchImages=true${pageTokenQuery}`,
      { next: { revalidate: 300 } }
    );

    if (!response.ok) {
      console.warn('Failed to load Blogger posts.');
      return [];
    }

    const data = (await response.json()) as BloggerPostsResponse;
    const pageItems = data.items ?? [];
    items.push(...pageItems);

    if (!data.nextPageToken) {
      break;
    }

    pageToken = data.nextPageToken;
  }

  return items;
};

const buildCanonicalSlug = (title: string, id: string, counts: Map<string, number>) => {
  const base = slugify(title) || slugify(id) || `post-${id}`;
  const nextCount = (counts.get(base) ?? 0) + 1;
  counts.set(base, nextCount);
  return nextCount === 1 ? base : `${base}-${nextCount}`;
};

const buildBloggerIndex = (items: BloggerPostItem[]): BloggerIndex => {
  const sorted = [...items].sort((a, b) => {
    const dateDelta = new Date(a.published).getTime() - new Date(b.published).getTime();
    if (dateDelta !== 0) return dateDelta;
    return a.id.localeCompare(b.id);
  });

  const counts = new Map<string, number>();
  const canonicalByAny = new Map<string, string>();
  const itemByCanonical = new Map<string, BloggerIndexItem>();
  const results: BloggerIndexItem[] = [];

  for (const item of sorted) {
    const canonicalSlug = buildCanonicalSlug(item.title, item.id, counts);
    const canonicalKey = normalizeSlug(canonicalSlug);
    canonicalByAny.set(canonicalKey, canonicalSlug);

    const aliases: string[] = [];
    const aliasCandidate = getSlugFromUrl(item.url, item.title);
    const aliasKey = normalizeSlug(aliasCandidate);
    if (aliasCandidate && aliasKey && aliasKey !== canonicalKey && !canonicalByAny.has(aliasKey)) {
      canonicalByAny.set(aliasKey, canonicalSlug);
      aliases.push(aliasCandidate);
    }

    const entry = { item, canonicalSlug, aliases };
    results.push(entry);
    itemByCanonical.set(canonicalKey, entry);
  }

  return { items: results, canonicalByAny, itemByCanonical };
};

const getBloggerIndex = async (): Promise<BloggerIndex> => {
  if (!isBloggerConfigured()) {
    return { items: [], canonicalByAny: new Map(), itemByCanonical: new Map() };
  }

  const apiKey = getApiKey();
  const blogId = await getBlogId(apiKey);
  if (!blogId) {
    console.warn('Blogger blog ID or URL not configured.');
    return { items: [], canonicalByAny: new Map(), itemByCanonical: new Map() };
  }

  const items = await fetchAllPosts(blogId, apiKey);
  return buildBloggerIndex(items);
};

const toListItem = (
  item: BloggerPostItem,
  canonicalSlug: string,
  siteUrl: string,
  blogHost: string | null,
  resolveCanonicalSlug: (value: string) => string | null
): BlogListItem => {
  const rawContent = item.content ?? '';
  const content = rewriteInternalLinks(rawContent, blogHost, siteUrl, resolveCanonicalSlug);
  const textContent = stripHtml(content);
  const labels = item.labels ?? [];

  return {
    id: canonicalSlug || item.id,
    title: item.title,
    content,
    excerpt: buildExcerpt(textContent),
    publishedAt: item.published,
    updatedAt: item.updated,
    readTime: calculateReadingTime(textContent),
    category: labels[0] ?? 'Insights',
    tags: labels.slice(1),
    url: `/blog/${canonicalSlug}`,
    image: extractFirstImage(content),
    author: item.author?.displayName,
  };
};

const toBlogPost = (
  item: BloggerPostItem,
  canonicalSlug: string,
  aliases: string[],
  siteUrl: string,
  blogHost: string | null,
  resolveCanonicalSlug: (value: string) => string | null
): BlogPost => {
  const rawContent = item.content ?? '';
  const contentHtml = rewriteInternalLinks(rawContent, blogHost, siteUrl, resolveCanonicalSlug);
  const textContent = stripHtml(contentHtml);
  const labels = item.labels ?? [];

  return {
    slug: canonicalSlug,
    aliases,
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
  const index = await getBloggerIndex();
  if (index.items.length === 0) return [];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || businessInfo.url;
  const blogHost = getBloggerHost();
  const resolveCanonicalSlug = (value: string) => index.canonicalByAny.get(normalizeSlug(value)) ?? null;

  const listItems = index.items.map((entry) =>
    toListItem(entry.item, entry.canonicalSlug, siteUrl, blogHost, resolveCanonicalSlug)
  );

  return listItems
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, maxResults);
};

export const getBloggerPostBySlugOrAlias = async (
  slug: string
): Promise<BloggerResolvedPost | null> => {
  const index = await getBloggerIndex();
  if (index.items.length === 0) return null;

  const normalizedSlug = normalizeSlug(slug);
  const canonicalSlug = index.canonicalByAny.get(normalizedSlug);
  if (!canonicalSlug) return null;

  const entry = index.itemByCanonical.get(normalizeSlug(canonicalSlug));
  if (!entry) return null;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || businessInfo.url;
  const blogHost = getBloggerHost();
  const resolveCanonicalSlug = (value: string) => index.canonicalByAny.get(normalizeSlug(value)) ?? null;
  const post = toBlogPost(entry.item, entry.canonicalSlug, entry.aliases, siteUrl, blogHost, resolveCanonicalSlug);
  const kind = normalizedSlug === normalizeSlug(entry.canonicalSlug) ? 'canonical' : 'alias';

  return { kind, canonicalSlug: entry.canonicalSlug, post };
};
