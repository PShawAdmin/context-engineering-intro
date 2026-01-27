import { marked } from 'marked';

const renderer = new marked.Renderer();

// Keep a single H1 per page (the page title), downgrade markdown H1 to H2.
renderer.heading = (text, level) => {
  const safeLevel = level === 1 ? 2 : level;
  return `<h${safeLevel}>${text}</h${safeLevel}>`;
};

marked.setOptions({
  gfm: true,
  breaks: false,
  mangle: false,
  renderer,
});

export const renderMarkdownToHtml = (content: string) => {
  if (!content) return '';
  return marked.parse(content) as string;
};
