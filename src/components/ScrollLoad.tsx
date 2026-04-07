import { useState, useEffect, useRef, useCallback } from 'react';

interface UseInfiniteScrollOptions<T> {
  items: T[];
  initialLoad?: number;
  loadMoreCount?: number;
  enabled?: boolean;
}

interface UseInfiniteScrollReturn<T> {
  displayedItems: T[];
  isLoading: boolean;
  hasMore: boolean;
  loadMore: () => void;
  observerTarget: React.RefObject<HTMLDivElement>;
  reset: () => void;
}

export function useInfiniteScroll<T>({
  items,
  initialLoad = 6,
  loadMoreCount = 6,
  enabled = true,
}: UseInfiniteScrollOptions<T>): UseInfiniteScrollReturn<T> {
  const [displayedCount, setDisplayedCount] = useState(initialLoad);
  const [isLoading, setIsLoading] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);
  const loadingTimeoutRef = useRef<NodeJS.Timeout>();

  const displayedItems = items.slice(0, displayedCount);
  const hasMore = displayedCount < items.length;

  const loadMore = useCallback(() => {
    setIsLoading(prev => {
      if (prev) return true; // Already loading
      
      requestAnimationFrame(() => {
        setDisplayedCount(prevCount => Math.min(prevCount + loadMoreCount, items.length));
        
        // Simulate loading time
        loadingTimeoutRef.current = setTimeout(() => {
          setIsLoading(false);
        }, 100);
      });
      
      return true;
    });
  }, [items.length, loadMoreCount]);

  const reset = useCallback(() => {
    setDisplayedCount(initialLoad);
    setIsLoading(false);
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }
  }, [initialLoad]);

  // Reset when items array reference changes (filter/search change)
  useEffect(() => {
    reset();
  }, [items.length, reset]); // Only reset on items length change, not on every render

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, []);

  // Intersection Observer for auto-loading
  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { 
        threshold: 0.1, 
        rootMargin: '200px'
      }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, isLoading, loadMore, enabled]);

  return {
    displayedItems,
    isLoading,
    hasMore,
    loadMore,
    observerTarget,
    reset,
  };
}