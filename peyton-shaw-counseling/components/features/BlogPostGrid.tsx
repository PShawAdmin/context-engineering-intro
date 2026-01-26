'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '@heroui/card';
import { Chip } from '@heroui/chip';
import { Button } from '@heroui/button';
import { ScrollShadow } from '@heroui/scroll-shadow';
import type { BloggerListItem } from '@/lib/blogger';

type BlogPostGridProps = {
  posts: BloggerListItem[];
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(value));

const sanitizeHtml = (value: string) =>
  value
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '');

const closeDurationMs = 220;

export default function BlogPostGrid({ posts }: BlogPostGridProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activePost = posts.find((post) => post.id === activeId) ?? null;
  const [isClosing, setIsClosing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [modalSize, setModalSize] = useState({ width: 0, height: 0 });
  const dragStartRef = useRef<{ x: number; y: number; pointerId: number } | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);
  const resizeStartRef = useRef<{
    x: number;
    y: number;
    width: number;
    height: number;
    offsetX: number;
    offsetY: number;
    direction: 'nw' | 'ne' | 'sw' | 'se';
    pointerId: number;
  } | null>(null);

  const clearCloseTimeout = useCallback(() => {
    if (!closeTimeoutRef.current) return;
    window.clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = null;
  }, []);

  const openPost = useCallback(
    (id: string) => {
      clearCloseTimeout();
      setIsClosing(false);
      setActiveId(id);
    },
    [clearCloseTimeout]
  );

  const closeModal = useCallback(() => {
    if (!activePost || isClosing) return;
    clearCloseTimeout();
    setIsClosing(true);
    closeTimeoutRef.current = window.setTimeout(() => {
      setActiveId(null);
      setIsClosing(false);
      closeTimeoutRef.current = null;
    }, closeDurationMs);
  }, [activePost, clearCloseTimeout, isClosing]);

  useEffect(() => {
    if (!activePost) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        void closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePost, closeModal]);

  useEffect(() => {
    if (!activePost) return;
    clearCloseTimeout();
    setIsClosing(false);
    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    const originalTop = document.body.style.top;
    const originalWidth = document.body.style.width;
    const originalPaddingRight = document.body.style.paddingRight;
    const computedPaddingRight = Number.parseFloat(window.getComputedStyle(document.body).paddingRight) || 0;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const scrollY = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${computedPaddingRight + scrollbarWidth}px`;
    }
    setDragOffset({ x: 0, y: 0 });
    return () => {
      const restoreScrollY = Math.abs(Number.parseInt(document.body.style.top || '0', 10)) || scrollY;
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.top = originalTop;
      document.body.style.width = originalWidth;
      document.body.style.paddingRight = originalPaddingRight;
      window.scrollTo(0, restoreScrollY);
    };
  }, [activePost, clearCloseTimeout]);

  useEffect(() => {
    if (!activePost) return;

    const minWidth = 320;
    const minHeight = 280;

    const clampSize = (width: number, height: number) => {
      const maxWidth = Math.max(minWidth, window.innerWidth - 32);
      const maxHeight = Math.max(minHeight, window.innerHeight - 32);
      return {
        width: Math.min(maxWidth, Math.max(minWidth, Math.round(width))),
        height: Math.min(maxHeight, Math.max(minHeight, Math.round(height))),
      };
    };

    const setDefaultSize = () => {
      const baseWidth = Math.min(960, Math.round(window.innerWidth * 0.9));
      const baseHeight = Math.min(560, Math.round(window.innerHeight * 0.55));
      setModalSize((prev) =>
        prev.width && prev.height ? clampSize(prev.width, prev.height) : clampSize(baseWidth, baseHeight)
      );
    };

    setDefaultSize();
    const handleResize = () => {
      setModalSize((prev) => clampSize(prev.width || 0, prev.height || 0));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activePost]);

  useEffect(() => {
    return () => {
      clearCloseTimeout();
    };
  }, [clearCloseTimeout]);

  const activeContent = useMemo(() => {
    if (!activePost?.content) return '';
    return sanitizeHtml(activePost.content);
  }, [activePost]);

  const handleDragStart = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest('button') || target?.closest('[data-resize-handle]')) return;
      if (event.button !== 0) return;
      dragStartRef.current = {
        x: event.clientX - dragOffset.x,
        y: event.clientY - dragOffset.y,
        pointerId: event.pointerId,
      };
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [dragOffset.x, dragOffset.y]
  );

  const handleDragMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStartRef.current) return;
    setDragOffset({
      x: event.clientX - dragStartRef.current.x,
      y: event.clientY - dragStartRef.current.y,
    });
  }, []);

  const handleDragEnd = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStartRef.current) return;
    event.currentTarget.releasePointerCapture(dragStartRef.current.pointerId);
    dragStartRef.current = null;
  }, []);

  const clampResize = useCallback((width: number, height: number) => {
    const minWidth = 320;
    const minHeight = 280;
    const maxWidth = Math.max(minWidth, window.innerWidth - 32);
    const maxHeight = Math.max(minHeight, window.innerHeight - 32);
    return {
      width: Math.min(maxWidth, Math.max(minWidth, Math.round(width))),
      height: Math.min(maxHeight, Math.max(minHeight, Math.round(height))),
    };
  }, []);

  const handleResizeStart = useCallback(
    (event: React.PointerEvent<HTMLDivElement>, direction: 'nw' | 'ne' | 'sw' | 'se') => {
      event.preventDefault();
      event.stopPropagation();
      if (event.button !== 0) return;
      resizeStartRef.current = {
        x: event.clientX,
        y: event.clientY,
        width: modalSize.width,
        height: modalSize.height,
        offsetX: dragOffset.x,
        offsetY: dragOffset.y,
        direction,
        pointerId: event.pointerId,
      };
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [dragOffset.x, dragOffset.y, modalSize.height, modalSize.width]
  );

  const handleResizeMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!resizeStartRef.current) return;
      const deltaX = event.clientX - resizeStartRef.current.x;
      const deltaY = event.clientY - resizeStartRef.current.y;
      const isEast = resizeStartRef.current.direction.includes('e');
      const isSouth = resizeStartRef.current.direction.includes('s');
      const rawWidth = isEast
        ? resizeStartRef.current.width + deltaX
        : resizeStartRef.current.width - deltaX;
      const rawHeight = isSouth
        ? resizeStartRef.current.height + deltaY
        : resizeStartRef.current.height - deltaY;

      const clamped = clampResize(rawWidth, rawHeight);
      const deltaWidth = clamped.width - resizeStartRef.current.width;
      const deltaHeight = clamped.height - resizeStartRef.current.height;
      const shiftX = (deltaWidth / 2) * (isEast ? 1 : -1);
      const shiftY = (deltaHeight / 2) * (isSouth ? 1 : -1);

      setModalSize(clamped);
      setDragOffset({
        x: resizeStartRef.current.offsetX + shiftX,
        y: resizeStartRef.current.offsetY + shiftY,
      });
    },
    [clampResize]
  );

  const handleResizeEnd = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (!resizeStartRef.current) return;
    event.currentTarget.releasePointerCapture(resizeStartRef.current.pointerId);
    resizeStartRef.current = null;
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Card key={post.id} className="hover:shadow-lg transition-shadow h-full">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start w-full">
                <Chip size="sm" variant="flat" color="primary">
                  {post.category}
                </Chip>
                <span className="text-sm text-gray-500">{post.readTime} min read</span>
              </div>
            </CardHeader>
            <CardBody className="py-2">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {post.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {post.excerpt}
              </p>
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </CardBody>
            <CardFooter className="pt-2">
              <div className="flex justify-between items-center w-full">
                <span className="text-sm text-gray-500">
                  {formatDate(post.publishedAt)}
                </span>
                <Button
                  variant="light"
                  color="primary"
                  size="sm"
                  onPress={() => openPost(post.id)}
                >
                  Read
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {activePost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 sm:px-6">
          <button
            type="button"
            className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-200 ease-out ${
              isClosing ? 'opacity-0' : 'opacity-100'
            }`}
            onClick={() => void closeModal()}
            aria-label="Close blog post"
          />
          <div
            style={{
              transform: `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0)`,
            }}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="blog-dialog-title"
              className={`relative rounded-3xl shadow-xl border border-gray-200 select-none bg-cover bg-center transform-gpu transition-[transform,opacity] duration-200 ease-out ${
                isClosing ? 'opacity-0 scale-[0.96]' : 'opacity-100 scale-100'
              }`}
              style={{
                width: modalSize.width ? `${modalSize.width}px` : '90vw',
                height: modalSize.height ? `${modalSize.height}px` : '55vh',
                maxWidth: 'calc(100vw - 2rem)',
                maxHeight: 'calc(100vh - 2rem)',
                backgroundImage: "url('/images/paper.png')",
                willChange: 'transform',
              }}
            >
              <div className="grid h-full w-full grid-rows-[auto,1fr] rounded-3xl overflow-hidden bg-white/80">
                <div
                  className="flex items-start justify-between gap-6 px-6 pt-6 pb-4 border-b border-gray-100 cursor-move touch-none"
                  onPointerDown={handleDragStart}
                  onPointerMove={handleDragMove}
                  onPointerUp={handleDragEnd}
                  onPointerCancel={handleDragEnd}
                >
                  <div className="space-y-3">
                    <Chip size="sm" variant="flat" color="primary">
                      {activePost.category}
                    </Chip>
                    <h2 id="blog-dialog-title" className="text-2xl md:text-3xl font-news text-gray-900">
                      {activePost.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                      <span>{formatDate(activePost.publishedAt)}</span>
                      <span aria-hidden="true">•</span>
                      <span>{activePost.readTime} min read</span>
                      {activePost.author && (
                        <>
                          <span aria-hidden="true">•</span>
                          <span>{activePost.author}</span>
                        </>
                      )}
                    </div>
                  </div>
                <button
                  type="button"
                  onClick={() => void closeModal()}
                  className="rounded-full border border-gray-200 p-2 text-gray-600 hover:text-gray-900 hover:border-gray-300 transition-colors"
                  aria-label="Close blog post"
                >
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <path d="M6 6l8 8M14 6l-8 8" />
                    </svg>
                  </button>
                </div>
                <ScrollShadow className="min-h-0">
                  <div className="px-6 py-6">
                    {activeContent ? (
                      <div
                        className="text-gray-700 leading-relaxed font-news [&_p]:mb-4 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-news [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-news [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_blockquote]:border-l-4 [&_blockquote]:border-nude-sand [&_blockquote]:pl-4 [&_blockquote]:text-gray-600 [&_img]:rounded-2xl [&_img]:my-6 [&_img]:w-full [&_a]:text-primary-600 [&_a]:underline"
                        dangerouslySetInnerHTML={{ __html: activeContent }}
                      />
                    ) : (
                      <p className="text-gray-600">
                        {activePost.excerpt}
                      </p>
                    )}
                  </div>
                </ScrollShadow>
              </div>
              {([
                {
                  corner: 'nw',
                  position: 'top-2 left-2',
                  cursor: 'cursor-nwse-resize',
                },
                {
                  corner: 'ne',
                  position: 'top-2 right-2',
                  cursor: 'cursor-nesw-resize',
                },
                {
                  corner: 'sw',
                  position: 'bottom-2 left-2',
                  cursor: 'cursor-nesw-resize',
                },
                {
                  corner: 'se',
                  position: 'bottom-2 right-2',
                  cursor: 'cursor-nwse-resize',
                },
              ] as const).map((handle) => (
                <div
                  key={handle.corner}
                  data-resize-handle
                  role="button"
                  aria-label={`Resize blog post from ${handle.corner.toUpperCase()} corner`}
                  className={`absolute ${handle.position} ${handle.cursor} z-20 h-5 w-5 touch-none`}
                  onPointerDown={(event) => handleResizeStart(event, handle.corner)}
                  onPointerMove={handleResizeMove}
                  onPointerUp={handleResizeEnd}
                  onPointerCancel={handleResizeEnd}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
