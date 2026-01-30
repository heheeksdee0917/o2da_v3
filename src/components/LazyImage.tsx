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
  loading
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [shouldLoad, setShouldLoad] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const [showBlur, setShowBlur] = useState(!!blurDataURL);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate a simple blur placeholder if none provided
  const defaultBlurDataURL = `data:image/svg+xml;base64,${btoa('<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="#f0f0f0"/></svg>')}`;

  // IMPROVED: Staggered loading - don't wait for entire batch
  useEffect(() => {
    if (!batchLoad || priority) return;

    // Load first 6 immediately
    if (batchIndex < 6) {
      setShouldLoad(true);
      return;
    }

    // For images 7+: stagger with small delays
    // Every image gets 300ms delay from the previous one
    const delay = batchIndex * 300;

    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [batchLoad, batchIndex, priority]);

  // Intersection Observer (fallback for non-batch images)
  useEffect(() => {
    if (priority || batchLoad) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority, batchLoad]);

  const handleLoad = () => {
    setIsLoaded(true);
    // Delay blur removal for smooth transition
    setTimeout(() => setShowBlur(false), 100);
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
      {/* Green pulsing circle loading state */}
      {!shouldLoad && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <div className="relative flex items-center justify-center w-16 h-16">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-lime-400/20 animate-ping" />
            </div>
            <span className="relative z-10 text-xs font-medium text-neutral-600">Loading...</span>
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
          loading="eager"
        />
      )}
      
      {/* Green pulsing circle for in-view images */}
      {shouldLoad && !isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <div className="relative flex items-center justify-center w-16 h-16">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-lime-400/20 animate-ping" />
            </div>
            <span className="relative z-10 text-xs font-medium text-neutral-600">Loading...</span>
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