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
  placeholder?: string;
  blurDataURL?: string;
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
  blurDataURL,
  priority = false,
  batchLoad = false,
  batchIndex = 0,
  sizes = '100vw',
  loading,
  onLoad
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const [showBlur, setShowBlur] = useState(!!blurDataURL);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate a simple blur placeholder if none provided
  const defaultBlurDataURL = `data:image/svg+xml;base64,${btoa('<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="#f0f0f0"/></svg>')}`;

  // OPTIMIZATION 1: Intersection Observer - Load when near viewport
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
      {
        threshold: 0.01,
        rootMargin: '200px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // OPTIMIZATION 2 & 3: Connection-Aware + Batch Limits
  useEffect(() => {
    if (!isInView || priority) return;
    if (!batchLoad) {
      setShouldLoad(true);
      return;
    }

    // Detect connection speed
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    const isSlow = connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g' || connection?.saveData;

    // First 3 images: Always load immediately
    if (batchIndex < 3) {
      setShouldLoad(true);
      return;
    }

    // Images 4+: Load with minimal delays
    if (isSlow) {
      // SLOW CONNECTION: Load in groups of 2 with 200ms delays
      const groupIndex = Math.floor((batchIndex - 3) / 2);
      const delay = groupIndex * 200;
      
      const timer = setTimeout(() => {
        setShouldLoad(true);
      }, delay);
      
      return () => clearTimeout(timer);
    } else {
      // FAST CONNECTION: Load immediately after first 3
      setShouldLoad(true);
    }
  }, [isInView, batchLoad, batchIndex, priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    // Delay blur removal for smooth transition
    setTimeout(() => setShowBlur(false), 100);
    
    // Call parent's onLoad callback if provided
    if (onLoad) {
      onLoad();
    }
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
    setShowBlur(false);
  };

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`} 
      style={style} 
      onClick={onClick}
    >
      {/* Bouncing dots loading state - before image starts loading */}
      {!shouldLoad && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-black/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-black/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-black/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      )}

      {/* Blur placeholder */}
      {shouldLoad && showBlur && !hasError && (
        <img
          src={blurDataURL || defaultBlurDataURL}
          alt=""
          className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-110 transition-opacity duration-300"
          style={{ opacity: isLoaded ? 0 : 1 }}
          aria-hidden="true"
        />
      )}

      {/* Main image */}
      {shouldLoad && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          sizes={sizes}
          className={`w-full h-full object-cover transition-all duration-500 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          } ${imgClassName}`} 
          style={imgStyle}  
          onLoad={handleLoad}
          onError={handleError}
          loading={loading || (priority ? 'eager' : 'lazy')}
        />
      )}
      
      {/* Bouncing dots for in-view images that are loading */}
      {shouldLoad && !isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-black/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-black/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-black/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      )}
      
      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <div className="text-2xl mb-2">📷</div>
            <div className="text-sm">Image unavailable</div>
          </div>
        </div>
      )}
    </div>
  );
}