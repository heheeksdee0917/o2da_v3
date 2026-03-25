import { Link } from 'react-router-dom';
import { newsItems } from '../data/news';
import LazyImage from '../components/LazyImage';
import React, { useState, useEffect } from 'react';
import { useInfiniteScroll } from '../components/ScrollLoad';

// Sort news items by date (newest to oldest)
const sortedNewsItems = [...newsItems].sort((a, b) => {
  const dateA = a.date ? new Date(a.date) : new Date(0);
  const dateB = b.date ? new Date(b.date) : new Date(0);
  return dateB.getTime() - dateA.getTime();
});

export default function News() {
  const [fadeIn, setFadeIn] = useState(false);

  const {
    displayedItems: displayedNews,
    isLoading,
    hasMore,
    observerTarget,
  } = useInfiniteScroll({
    items: sortedNewsItems,
    initialLoad: 6,
    loadMoreCount: 6,
    enabled: true,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setFadeIn(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Date not available';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className={`transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      <div data-theme="light" className="bg-white min-h-screen">
        <div className="max-w-[2340px] mx-auto px-4 md:px-8 pt-32 pb-32">

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-light tracking-wide text-black/90 mb-4">News & Updates</h1>
            <p className="text-base font-light text-black/50 leading-relaxed">
              Recent developments, project updates, and insights from the studio
            </p>
          </div>

          {/* News Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedNews.map((item, index) => (
              <Link key={item.id} to={`/news/${item.slug}`} className="group block">
                <div className="bg-white border border-black/5 overflow-hidden transition-all duration-300 md:hover:scale-105 md:hover:-translate-y-2 md:hover:border-black/20 md:hover:shadow-lg">
                  {/* Image */}
                  <div className="aspect-[16/10]">
                    <LazyImage
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full"
                      batchLoad={true}
                      batchIndex={index}
                      loading={index < 6 ? 'eager' : 'lazy'}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="mb-4">
                      <span className="text-xs font-light text-black/40">
                        {formatDate(item.date)}
                      </span>
                    </div>
                    <h2 className="text-xl font-light mb-3">{item.title}</h2>
                    <p className="text-sm font-light text-black/60 leading-relaxed">
                      {item.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex justify-center items-center py-8 mt-8">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-black/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-black/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-black/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}

          <div ref={observerTarget} className="h-4" />

          {!hasMore && sortedNewsItems.length > 0 && (
            <div className="text-center py-12 mt-8">
              <p className="text-sm font-light text-black/40">You've reached the end</p>
            </div>
          )}

          {sortedNewsItems.length === 0 && (
            <div className="text-center py-32">
              <p className="text-xl font-light text-black/30">No news to display</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}