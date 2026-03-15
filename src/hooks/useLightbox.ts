// src/hooks/useLightbox.ts
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';

interface UseLightboxOptions {
  imageCount?: number;
  enabled?: boolean;
}

interface UseLightboxReturn {
  isOpen: boolean;
  currentIndex: number;
  openLightbox: (index: number) => void;
  closeLightbox: () => void;
  goToNext: () => void;
  goToPrevious: () => void;
  visibleThumbnails: { src: string; actualIndex: number }[];
  imageRef: React.RefObject<HTMLImageElement>;
  showSwipeHint: boolean;
  hideSwipeHint: () => void;
}

export function useLightbox(
  images: string[],
  options: UseLightboxOptions = { enabled: true }
): UseLightboxReturn {
  const imageCount = images.length;
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imageCount === 0) {
      setIsOpen(false);
      return;
    }
    setCurrentIndex((prev) => Math.min(prev, imageCount - 1));
  }, [imageCount]);

  const openLightbox = useCallback((index: number) => {
    if (index < 0 || index >= imageCount) return;
    setCurrentIndex(index);
    setIsOpen(true);
  }, [imageCount]);

  const closeLightbox = useCallback(() => setIsOpen(false), []);

  const hideSwipeHint = useCallback(() => setShowSwipeHint(false), []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % imageCount);
    setShowSwipeHint(false);
  }, [imageCount]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + imageCount) % imageCount);
    setShowSwipeHint(false);
  }, [imageCount]);

  const visibleThumbnails = useMemo(() => {
    const VISIBLE = 5;
    const CENTER = 3;

    if (imageCount <= VISIBLE) {
      return images.map((src, idx) => ({ src, actualIndex: idx }));
    }

    const result: { src: string; actualIndex: number }[] = [];
    for (let i = -CENTER; i <= CENTER; i++) {
      const idx = ((currentIndex + i) % imageCount + imageCount) % imageCount;
      result.push({ src: images[idx], actualIndex: idx });
    }
    return result;
  }, [currentIndex, images, imageCount]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen || !options.enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, options.enabled, closeLightbox, goToNext, goToPrevious]);

  useEffect(() => {
    if (isOpen) {
      setShowSwipeHint(true);
      const timer = setTimeout(() => {
        setShowSwipeHint(false);
      }, 3000); // Hide after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !options.enabled) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (imageRef.current && imageRef.current.contains(target)) {
        return;
      }
      
      if (target.tagName === 'BUTTON' || target.closest('button')) {
        return;
      }
      
      closeLightbox();
    };

    window.addEventListener('click', handleClickOutside, true);
    return () => window.removeEventListener('click', handleClickOutside, true);
  }, [isOpen, options.enabled, closeLightbox]);

  return {
    isOpen,
    currentIndex,
    openLightbox,
    closeLightbox,
    goToNext,
    goToPrevious,
    visibleThumbnails,
    imageRef,
    showSwipeHint,
    hideSwipeHint,
  };
}