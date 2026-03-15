import { useRef, useCallback, useEffect } from 'react';
import type { TouchEvent } from 'react';

interface UseTouchGesturesOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number;
  enabled?: boolean;
}

export function useTouchGestures<T extends HTMLElement = HTMLDivElement>({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  threshold = 50,
  enabled = true,
}: UseTouchGesturesOptions) {
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const touchEndY = useRef<number>(0);

  const handleTouchStart = useCallback((e: TouchEvent<T>) => {
    if (!enabled) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchEndX.current = e.touches[0].clientX;
    touchEndY.current = e.touches[0].clientY;
  }, [enabled]);

  const handleTouchMove = useCallback((e: TouchEvent<T>) => {
    if (!enabled) return;
    touchEndX.current = e.touches[0].clientX;
    touchEndY.current = e.touches[0].clientY;
  }, [enabled]);

  const handleTouchEnd = useCallback(() => {
    if (!enabled) return;

    const deltaX = touchEndX.current - touchStartX.current;
    const deltaY = touchEndY.current - touchStartY.current;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    if (absDeltaX > threshold && absDeltaX > absDeltaY) {
      deltaX > 0 ? onSwipeRight?.() : onSwipeLeft?.();
    } else if (absDeltaY > threshold && absDeltaY > absDeltaX) {
      deltaY > 0 ? onSwipeDown?.() : onSwipeUp?.();
    }
  }, [enabled, threshold, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown]);

  return { handleTouchStart, handleTouchMove, handleTouchEnd };
}

export function useSmoothScroll(
  ref: React.RefObject<HTMLElement>,
  enabled: boolean = true
) {
  useEffect(() => {
    if (!enabled || !ref.current) return;
    const element = ref.current;
    element.style.scrollBehavior = 'smooth';
    return () => { element.style.scrollBehavior = ''; };
  }, [ref, enabled]);
}