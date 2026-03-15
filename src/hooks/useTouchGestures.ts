import { useRef, useCallback } from 'react';
import type { TouchEvent } from 'react';

interface UseTouchGesturesOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number;
  enabled?: boolean;
}

export function useTouchGestures({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  threshold = 50,
  enabled = true,
}: UseTouchGesturesOptions) {
  const startX = useRef(0);
  const startY = useRef(0);
  const endX = useRef(0);
  const endY = useRef(0);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!enabled) return;
    startX.current = endX.current = e.touches[0].clientX;
    startY.current = endY.current = e.touches[0].clientY;
  }, [enabled]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!enabled) return;
    endX.current = e.touches[0].clientX;
    endY.current = e.touches[0].clientY;
  }, [enabled]);

  const handleTouchEnd = useCallback(() => {
    if (!enabled) return;
    const dx = endX.current - startX.current;
    const dy = endY.current - startY.current;
    const adx = Math.abs(dx);
    const ady = Math.abs(dy);
    if (adx > threshold && adx > ady) {
      dx > 0 ? onSwipeRight?.() : onSwipeLeft?.();
    } else if (ady > threshold && ady > adx) {
      dy > 0 ? onSwipeDown?.() : onSwipeUp?.();
    }
  }, [enabled, threshold, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown]);

  return { handleTouchStart, handleTouchMove, handleTouchEnd };
}