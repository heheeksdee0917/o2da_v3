import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { newsItems, ContentBlock } from '../data/news';
import LazyImage from '../components/LazyImage';
import React from 'react';

export default function NewsDetails() {
  const { slug } = useParams<{ slug: string }>();
  const newsItem = newsItems.find(item => item.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!newsItem) return <Navigate to="/news" replace />;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const relatedNews = newsItems
    .filter(item => item.slug !== newsItem.slug)
    .slice(0, 3);

  return (
    <div data-theme="light" className="bg-white min-h-screen">

      {/* Back Button */}
      <Link
        to="/news"
        className="fixed top-24 left-4 flex items-center gap-2 text-black/60 hover:text-black transition-colors z-50 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span className="text-sm font-light">Back to News</span>
      </Link>

      {/* Hero Image */}
      <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden bg-neutral-100 pt-14">
        <LazyImage
          src={newsItem.image}
          alt={newsItem.title}
          className="w-full h-full object-cover"
          priority={true}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-4 md:px-8 py-16">

        {/* Date */}
        <div className="mb-6">
          <span className="text-sm font-light text-black/40">
            {formatDate(newsItem.date)}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-light text-black/90 mb-6 leading-tight">
          {newsItem.title}
        </h1>

        {/* Excerpt */}
        <p className="text-lg font-light text-black/60 mb-12 leading-relaxed border-l-2 border-black/10 pl-6">
          {newsItem.excerpt}
        </p>

        {/* Content Blocks */}
        <div className="space-y-12 text-black/70 font-light leading-relaxed">
          {newsItem.content.map((block: ContentBlock, index: number) => {
            if (block.type === 'text') {
              return (
                <p key={index} className="text-base">
                  {block.content}
                </p>
              );
            }

            if (block.type === 'image') {
              return (
                <figure key={index} className="my-12">
                  <div className="relative w-full aspect-[16/9] bg-neutral-100 overflow-hidden rounded-lg shadow-md">
                    <LazyImage
                      src={block.content}
                      alt={block.caption || newsItem.title}
                      className="w-full h-full object-cover"
                      sizes="(max-width: 900px) 100vw, 900px"
                    />
                  </div>
                  {block.caption && (
                    <figcaption className="mt-4 text-sm font-light text-black/50 text-center italic">
                      {block.caption}
                    </figcaption>
                  )}
                </figure>
              );
            }

            return null;
          })}
        </div>
      </div>

      {/* Related News */}
      {relatedNews.length > 0 && (
        <div className="bg-neutral-50 py-16 mt-16">
          <div className="max-w-[2340px] mx-auto px-4 md:px-8">
            <h3 className="text-2xl font-light text-black/90 mb-12">Related News</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedNews.map((item) => (
                <Link key={item.id} to={`/news/${item.slug}`} className="group block">
                  <div className="bg-white border border-black/5 overflow-hidden transition-all duration-300 md:hover:border-black/20 md:hover:shadow-lg">
                    <div className="relative overflow-hidden aspect-[16/10] bg-neutral-100">
                      <LazyImage
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out md:group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-6">
                      <h4 className="text-lg font-light mb-2 md:group-hover:text-black/60 transition-colors leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-sm font-light text-black/60 leading-relaxed line-clamp-2">
                        {item.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}