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
};

type BloggerBlogResponse = {
  id?: string;
};

export type BloggerListItem = {
  id: string;
  title: string;
  content?: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  readTime: number;
  category: string;
  tags: string[];
  url: string;
  image?: string;
  author?: string;
};

const BLOGGER_API_BASE = 'https://www.googleapis.com/blogger/v3';

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

const getApiKey = () =>
  process.env.BLOGGER_API_KEY || process.env.GOOGLE_PLACES_API_KEY || '';

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

export const getBloggerPosts = async (maxResults = 9): Promise<BloggerListItem[]> => {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn('Blogger API key not configured.');
    return [];
  }

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

  return items.map((item) => {
    const labels = item.labels ?? [];
    const content = item.content ?? '';
    const textContent = stripHtml(content);

    return {
      id: item.id,
      title: item.title,
      content: item.content ?? '',
      excerpt: buildExcerpt(textContent),
      publishedAt: item.published,
      updatedAt: item.updated,
      readTime: calculateReadingTime(textContent),
      category: labels[0] ?? 'Insights',
      tags: labels.slice(1),
      url: item.url,
      image: extractFirstImage(content),
      author: item.author?.displayName,
    };
  });
};
