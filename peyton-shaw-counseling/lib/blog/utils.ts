import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost } from '@/lib/types';

const postsDirectory = path.join(process.cwd(), 'content/blog');

// Ensure the directory exists
function ensureDirectoryExists() {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
  }
}

// Calculate reading time (assuming 200 words per minute)
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export async function getAllPosts(): Promise<BlogPost[]> {
  ensureDirectoryExists();
  
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames
      .filter(fileName => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
      .map(fileName => {
        const slug = fileName.replace(/\.mdx?$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
          slug,
          title: data.title || slug,
          excerpt: data.excerpt || content.substring(0, 160) + '...',
          content,
          author: data.author || 'Peyton Shaw',
          publishedAt: data.publishedAt || new Date().toISOString(),
          updatedAt: data.updatedAt,
          keywords: data.keywords || [],
          category: data.category || 'Mental Health',
          readingTime: calculateReadingTime(content),
          image: data.image,
        } as BlogPost;
      });

    // Sort posts by date (newest first)
    return allPostsData.sort((a, b) => {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  ensureDirectoryExists();
  
  try {
    // Try both .md and .mdx extensions
    let fullPath = path.join(postsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
      fullPath = path.join(postsDirectory, `${slug}.mdx`);
      if (!fs.existsSync(fullPath)) {
        return null;
      }
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      excerpt: data.excerpt || content.substring(0, 160) + '...',
      content,
      author: data.author || 'Peyton Shaw',
      publishedAt: data.publishedAt || new Date().toISOString(),
      updatedAt: data.updatedAt,
      keywords: data.keywords || [],
      category: data.category || 'Mental Health',
      readingTime: calculateReadingTime(content),
      image: data.image,
    };
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => 
    post.category.toLowerCase() === category.toLowerCase()
  );
}

export async function getPostsByKeyword(keyword: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => 
    post.keywords.some(k => k.toLowerCase().includes(keyword.toLowerCase()))
  );
}

export async function getRelatedPosts(slug: string, limit: number = 3): Promise<BlogPost[]> {
  const currentPost = await getPostBySlug(slug);
  if (!currentPost) return [];

  const allPosts = await getAllPosts();
  
  // Find posts with overlapping keywords or same category
  const relatedPosts = allPosts
    .filter(post => post.slug !== slug)
    .map(post => {
      const keywordOverlap = post.keywords.filter(k => 
        currentPost.keywords.includes(k)
      ).length;
      const sameCategory = post.category === currentPost.category ? 1 : 0;
      const score = keywordOverlap + sameCategory;
      
      return { post, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);

  return relatedPosts;
}