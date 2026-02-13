import { useState, useEffect, useRef, useCallback } from 'react';

interface UseCardPreloadOptions {
  /**
   * Total number of items currently displayed
   */
  itemCount: number;
  
  /**
   * How many cards ahead to preload when a card becomes visible
   * @default 3
   */
  preloadCount?: number;
  
  /**
   * Root margin for IntersectionObserver (how early to trigger)
   * @default '200px'
   */
  rootMargin?: string;
  
  /**
   * Intersection threshold (0-1, how much of card must be visible)
   * @default 0.1
   */
  threshold?: number;
  
  /**
   * Enable/disable the preload behavior
   * @default true
   */
  enabled?: boolean;
}

interface UseCardPreloadReturn {
  /**
   * Set of card indices that are currently visible in viewport
   */
  visibleCards: Set<number>;
  
  /**
   * Set of card indices that should be preloaded
   */
  preloadCards: Set<number>;
  
  /**
   * Set of card indices whose images have finished loading
   */
  loadedCards: Set<number>;
  
  /**
   * Ref callback to attach to card elements
   * Usage: <div ref={getCardRef(index)}>
   */
  getCardRef: (index: number) => (el: HTMLDivElement | null) => void;
  
  /**
   * Callback to mark a card's image as loaded
   * Usage: onLoad={() => handleImageLoad(index)}
   */
  handleImageLoad: (index: number) => void;
  
  /**
   * Check if a card is visible
   */
  isCardVisible: (index: number) => boolean;
  
  /**
   * Check if a card's image has loaded
   */
  isImageLoaded: (index: number) => boolean;
  
  /**
   * Check if a card should preload (even if not visible)
   */
  shouldPreload: (index: number) => boolean;
}

export function useCardPreload({
  itemCount,
  preloadCount = 3,
  rootMargin = '200px',
  threshold = 0.1,
  enabled = true,
}: UseCardPreloadOptions): UseCardPreloadReturn {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [preloadCards, setPreloadCards] = useState<Set<number>>(new Set());
  const [loadedCards, setLoadedCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  // Set up IntersectionObserver
  useEffect(() => {
    if (!enabled) return;

    const observerOptions = {
      threshold,
      rootMargin,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          
          // Mark card as visible
          setVisibleCards((prev) => new Set(prev).add(index));
          
          // Preload next N cards
          const nextIndexes = Array.from(
            { length: preloadCount },
            (_, i) => index + i + 1
          ).filter((i) => i < itemCount);
          
          if (nextIndexes.length > 0) {
            setPreloadCards((prev) => {
              const newSet = new Set(prev);
              nextIndexes.forEach((i) => newSet.add(i));
              return newSet;
            });
          }
        }
      });
    }, observerOptions);

    // Observe all current card refs
    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [itemCount, preloadCount, rootMargin, threshold, enabled]);

  // Ref callback generator
  const getCardRef = useCallback((index: number) => {
    return (el: HTMLDivElement | null) => {
      if (el) {
        el.setAttribute('data-index', index.toString());
        cardRefs.current.set(index, el);
      } else {
        cardRefs.current.delete(index);
      }
    };
  }, []);

  // Handle image load
  const handleImageLoad = useCallback((index: number) => {
    setLoadedCards((prev) => new Set(prev).add(index));
  }, []);

  // Helper functions
  const isCardVisible = useCallback(
    (index: number) => visibleCards.has(index),
    [visibleCards]
  );

  const isImageLoaded = useCallback(
    (index: number) => loadedCards.has(index),
    [loadedCards]
  );

  const shouldPreload = useCallback(
    (index: number) => preloadCards.has(index),
    [preloadCards]
  );

  return {
    visibleCards,
    preloadCards,
    loadedCards,
    getCardRef,
    handleImageLoad,
    isCardVisible,
    isImageLoaded,
    shouldPreload,
  };
}