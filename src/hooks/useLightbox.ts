import { useState, useEffect, useCallback } from 'react';

interface UseLightboxOptions {
  enabled?: boolean;
}

interface UseLightboxReturn {
  isOpen: boolean;
  currentIndex: number;
  openLightbox: (index: number) => void;
  closeLightbox: () => void;
  goToNext: () => void;
  goToPrevious: () => void;
}

export function useLightbox(
  images: string[],
  options: UseLightboxOptions = { enabled: true }
): UseLightboxReturn {
  const count = images.length;
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Clamp index if images array shrinks
  useEffect(() => {
    if (count === 0) { setIsOpen(false); return; }
    setCurrentIndex((prev) => Math.min(prev, count - 1));
  }, [count]);

  const openLightbox = useCallback((index: number) => {
    if (index < 0 || index >= count) return;
    setCurrentIndex(index);
    setIsOpen(true);
  }, [count]);

  const closeLightbox = useCallback(() => setIsOpen(false), []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % count);
  }, [count]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + count) % count);
  }, [count]);

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

  return { isOpen, currentIndex, openLightbox, closeLightbox, goToNext, goToPrevious };
}