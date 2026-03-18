import { useState, useRef, useEffect } from 'react';
import React from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  imgClassName?: string;
  imgStyle?: React.CSSProperties;
  onClick?: () => void;
  priority?: boolean;
  batchLoad?: boolean;
  batchIndex?: number;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
}

export default function LazyImage({
  src,
  alt,
  className = '',
  style,
  imgClassName = '',
  imgStyle,
  onClick,
  priority = false,
  batchLoad = false,
  batchIndex = 0,
  sizes = '100vw',
  loading,
  onLoad,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load when near viewport
  useEffect(() => {
    if (priority) {
      setShouldLoad(true);
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: '200px' }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [priority]);

  // Connection-aware batch loading
  useEffect(() => {
    if (!isInView || priority) return;
    if (!batchLoad) { setShouldLoad(true); return; }

    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    const isSlow = connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g' || connection?.saveData;

    if (batchIndex < 3) { setShouldLoad(true); return; }

    if (isSlow) {
      const delay = Math.floor((batchIndex - 3) / 2) * 200;
      const timer = setTimeout(() => setShouldLoad(true), delay);
      return () => clearTimeout(timer);
    } else {
      setShouldLoad(true);
    }
  }, [isInView, batchLoad, batchIndex, priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  const isLoading = !isLoaded && !hasError;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={style}
      onClick={onClick}
    >
      {/* 3-dot loader — visible while image is loading */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-black/20 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-black/20 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-black/20 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      )}

      {/* Main image */}
      {shouldLoad && (
        <img
          src={src}
          alt={alt}
          sizes={sizes}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
          style={imgStyle}
          onLoad={handleLoad}
          onError={handleError}
          loading={loading || (priority ? 'eager' : 'lazy')}
        />
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-neutral-100 flex items-center justify-center">
          <div className="text-center text-neutral-400">
            <div className="text-2xl mb-2">📷</div>
            <div className="text-sm">Image unavailable</div>
          </div>
        </div>
      )}
    </div>
  );
}