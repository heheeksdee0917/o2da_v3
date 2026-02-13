import { Link } from 'react-router-dom';
import { newsItems } from '../data/news';
import LazyImage from '../components/LazyImage';
import React, { useState, useEffect, useRef } from 'react';
import { useInfiniteScroll } from '../components/ScrollLoad';
import { useCardPreload } from '../hooks/useCardPreload';

// Sort news items by date (newest to oldest)
const sortedNewsItems = [...newsItems].sort((a, b) => {
  const dateA = a.date ? new Date(a.date) : new Date(0);
  const dateB = b.date ? new Date(b.date) : new Date(0);
  return dateB.getTime() - dateA.getTime();
});

export default function News() {
  const [fadeIn, setFadeIn] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement | null>(null);

  // Use sorted items for infinite scroll
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

  // Use card preload hook
  const {
    getCardRef,
    handleImageLoad,
    isCardVisible,
    isImageLoaded,
    shouldPreload,
  } = useCardPreload({
    itemCount: displayedNews.length,
    preloadCount: 3,
    rootMargin: '200px',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    setFadeIn(false);
    const timer = setTimeout(() => setFadeIn(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Only observe the header for fade-in animation
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
        }
      });
    }, observerOptions);

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Date not available';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className={`transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      <div data-theme="light" className="bg-white min-h-screen">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-32 pb-32">
          
          {/* Header */}
          <div 
            ref={headerRef}
            className={`mb-24 text-center transition-all duration-1000 ease-out ${
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <h1 className="text-4xl md:text-5xl font-light tracking-wide text-black/90 mb-4">News & Updates</h1>
            <p className="text-base font-light text-black/50 max-w-2xl mx-auto leading-relaxed">
              Recent developments, project updates, and insights from the studio
            </p>
          </div>

          {/* News Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedNews.map((item, index) => (
              <Link
                key={item.id}
                to={`/news/${item.slug}`}
                className="group block"
              >
                {/* Card - shows when visible */}
                <div 
                  ref={getCardRef(index)}
                  className={`bg-white border border-black/5 overflow-hidden transition-all duration-300 ${
                    isCardVisible(index)
                      ? 'opacity-100 scale-100 hover:scale-105 hover:-translate-y-2 hover:border-black/20 hover:shadow-lg' 
                      : 'opacity-0 scale-95'
                  }`}
                >
                  {/* Image area - shows immediately, image fades in subtly */}
                  <div className="relative overflow-hidden aspect-[16/10] bg-neutral-100">
                    <LazyImage
                      src={item.image}
                      alt={item.title}
                      className={`w-full h-full transition-opacity duration-300 ${
                        isImageLoaded(index) ? 'opacity-100' : 'opacity-0'
                      }`}
                      batchLoad={true}
                      batchIndex={index}
                      loading={index < 6 || shouldPreload(index) ? 'eager' : 'lazy'}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      onLoad={() => handleImageLoad(index)}
                    />
                    {/* Loading skeleton */}
                    {!isImageLoaded(index) && (
                      <div className="absolute inset-0 bg-gradient-to-r from-neutral-100 via-neutral-50 to-neutral-100 animate-pulse" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Category & Date */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-light text-black/40">
                        {formatDate(item.date)}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-light mb-3 relative inline-block">
                      {item.title}
                    </h2>

                    {/* Excerpt */}
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
                <div className="w-2 h-2 bg-black/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-black/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-black/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}

          {/* Observer target for infinite scroll */}
          <div ref={observerTarget} className="h-4" />

          {/* End message */}
          {!hasMore && sortedNewsItems.length > 0 && (
            <div className="text-center py-12 mt-8">
              <p className="text-sm font-light text-black/40">You've reached the end</p>
            </div>
          )}

          {/* Empty State */}
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