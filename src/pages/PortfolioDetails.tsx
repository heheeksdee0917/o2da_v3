import { useParams, Link, Navigate } from 'react-router-dom';
import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { projects } from '../data/mockData';
import React from 'react';
import { useLightbox } from '../hooks/useLightbox';
import { useTouchGestures } from '../hooks/useTouchGestures';
import LazyImage from '../components/LazyImage';

// ─── Helpers ─────────────────────────────────────────────────────────────────

// Silently jump a scroll container to center a child element (no animation)
function jumpToCenter(strip: HTMLElement, child: HTMLElement) {
  strip.style.scrollBehavior = 'auto';
  child.scrollIntoView({ block: 'nearest', inline: 'center' });
  strip.style.scrollBehavior = '';
}

// After a smooth scroll settles, silently re-center on copy B
function resetToB(stripRef: React.RefObject<HTMLElement>, count: number, index: number, isJumping: React.MutableRefObject<boolean>) {
  setTimeout(() => {
    const s = stripRef.current;
    if (!s || isJumping.current) return;
    const target = s.children[count + index] as HTMLElement;
    if (!target) return;
    isJumping.current = true;
    jumpToCenter(s, target);
    requestAnimationFrame(() => { isJumping.current = false; });
  }, 450);
}

// ─── Thumbnail Strip ──────────────────────────────────────────────────────────
//
// Renders 3 copies of the image list [A | B | C]. Always starts at B (center).
// Navigation scrolls to the correct copy by direction. On drag release, snaps
// to nearest thumb and selects it. Edge teleport keeps infinite feel on manual drag.

function ThumbnailStrip({
  images,
  currentIndex,
  imageKey,
  onSelect,
}: {
  images: string[];
  currentIndex: number;
  imageKey: number;
  onSelect: (index: number) => void;
}) {
  const count = images.length;
  const stripRef = useRef<HTMLDivElement>(null);
  const isJumping = useRef(false);
  const prevIndexRef = useRef(currentIndex);

  const tripled = useMemo(() =>
    [...images, ...images, ...images].map((src, i) => ({
      src,
      actualIndex: i % count,
      copyIndex: Math.floor(i / count),
      globalIndex: i,
    })),
  [images, count]);

  // On project change — instant jump to copy B, reset state
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    prevIndexRef.current = currentIndex;
    isJumping.current = true;
    const target = strip.children[count + currentIndex] as HTMLElement;
    if (target) jumpToCenter(strip, target);
    requestAnimationFrame(() => { isJumping.current = false; });
  }, [imageKey]);

  // On navigation — pick the copy in the correct direction and scroll to it
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip || isJumping.current) return;

    const prev = prevIndexRef.current;
    const curr = currentIndex;
    prevIndexRef.current = curr;

    const isBackward = curr === (prev - 1 + count) % count;
    const center = strip.scrollLeft + strip.clientWidth / 2;

    const candidates = [0, 1, 2]
      .map(ci => strip.children[ci * count + curr] as HTMLElement)
      .filter(Boolean);

    let target: HTMLElement;
    if (isBackward) {
      const left = candidates.filter(el => el.offsetLeft + el.offsetWidth / 2 < center);
      target = left.at(-1) ?? candidates[1] ?? candidates[0];
    } else {
      const right = candidates.filter(el => el.offsetLeft + el.offsetWidth / 2 > center);
      target = right[0] ?? candidates[1] ?? candidates[0];
    }

    target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    resetToB(stripRef as React.RefObject<HTMLElement>, count, curr, isJumping);
  }, [currentIndex]);

  // Edge teleport — keep infinite feel when user manually drags near the ends
  const handleScroll = useCallback(() => {
    const strip = stripRef.current;
    if (!strip || isJumping.current) return;
    const { scrollLeft, scrollWidth } = strip;
    const third = scrollWidth / 3;
    if (scrollLeft < third * 0.3 || scrollLeft > third * 2.7) {
      isJumping.current = true;
      strip.style.scrollBehavior = 'auto';
      strip.scrollLeft = third + (scrollLeft % third);
      requestAnimationFrame(() => {
        strip.style.scrollBehavior = '';
        isJumping.current = false;
      });
    }
  }, []);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    strip.addEventListener('scroll', handleScroll, { passive: true });
    return () => strip.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[102] bg-gradient-to-t from-black via-black/80 to-transparent"
      style={{ paddingTop: '60px', paddingBottom: '24px' }}
      onClick={(e) => e.stopPropagation()}
    >
      <div ref={stripRef} className="flex gap-2 overflow-x-auto scrollbar-hide py-2">
        {tripled.map((thumb) => (
          <button
            key={`thumb-${thumb.globalIndex}-${imageKey}`}
            onClick={() => onSelect(thumb.actualIndex)}
            style={{ scrollMarginInline: '40vw' }}
            className={`flex-shrink-0 transition-all duration-300 rounded ${
              thumb.copyIndex === 1 && thumb.actualIndex === currentIndex
                ? 'ring-2 ring-white opacity-100 scale-110 relative z-10'
                : 'opacity-40 hover:opacity-70 scale-100'
            }`}
            aria-label={`Go to image ${thumb.actualIndex + 1}`}
          >
            <img
              src={thumb.src}
              alt={`Thumbnail ${thumb.actualIndex + 1}`}
              className="w-16 h-12 md:w-20 md:h-14 object-cover rounded block pointer-events-none"
              loading="eager"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PortfolioDetails() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find(p => p.slug === id);

  const [isExpanded, setIsExpanded] = useState(false);
  const [needsShowMore, setNeedsShowMore] = useState(false);
  const [pageVisible, setPageVisible] = useState(false);
  const [imageKey, setImageKey] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const mobileGalleryRef = useRef<HTMLDivElement>(null);
  const desktopGalleryRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLButtonElement | null)[]>([]);

  if (!project) return <Navigate to="/portfolio" replace />;

  const images = project.images;

  const {
    isOpen: isLightboxOpen,
    currentIndex: lightboxImageIndex,
    openLightbox,
    closeLightbox,
    goToNext,
    goToPrevious,
  } = useLightbox(images, { enabled: true });

  const lightboxGestures = useTouchGestures({
    onSwipeLeft: () => { setHasInteracted(true); goToNext(); },
    onSwipeRight: () => { setHasInteracted(true); goToPrevious(); },
    onSwipeDown: () => { setHasInteracted(true); closeLightbox(); },
    threshold: 60,
    enabled: isLightboxOpen,
  });

  const similarProjects = useMemo(() => {
    const allInCategory = projects.filter(p => p.category === project.category);
    const currentIdx = allInCategory.findIndex(p => p.slug === project.slug);
    const result: typeof allInCategory = [];
    for (let offset = -1; offset <= 2 && result.length < 3; offset++) {
      if (offset === 0) continue;
      const neighbor = allInCategory[currentIdx + offset];
      if (neighbor && neighbor.slug !== project.slug) result.push(neighbor);
    }
    // Fill remaining slots from rest of category
    for (const p of allInCategory) {
      if (result.length >= 3) break;
      if (p.slug !== project.slug && !result.find(r => r.id === p.id)) result.push(p);
    }
    return result;
  }, [project.id, project.category]);

  // Show More detection
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (contentRef.current) setNeedsShowMore(contentRef.current.scrollHeight > 600);
    });
    if (contentRef.current) observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, [project]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    const lock = isLightboxOpen;
    document.body.style.overflow = lock ? 'hidden' : '';
    document.documentElement.style.overflow = lock ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isLightboxOpen]);

  // Desktop gallery — track active image + snap on scroll end
  useEffect(() => {
    const gallery = desktopGalleryRef.current;
    if (!gallery) return;

    const getClosest = () => {
      const center = gallery.getBoundingClientRect().top + gallery.getBoundingClientRect().height / 2;
      let closestIndex = 0;
      let minDist = Infinity;
      imageRefs.current.forEach((ref, i) => {
        if (!ref) return;
        const dist = Math.abs(ref.getBoundingClientRect().top + ref.getBoundingClientRect().height / 2 - center);
        if (dist < minDist) { minDist = dist; closestIndex = i; }
      });
      return closestIndex;
    };

    let snapTimer: number | null = null;
    let rafId: number | null = null;

    const onScroll = () => {
      if (window.innerWidth < 768) return;
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (snapTimer !== null) clearTimeout(snapTimer);
        snapTimer = window.setTimeout(() => {
          const idx = getClosest();
          const ref = imageRefs.current[idx];
          if (!ref) return;
          const center = gallery.getBoundingClientRect().top + gallery.getBoundingClientRect().height / 2;
          const offset = ref.getBoundingClientRect().top + ref.getBoundingClientRect().height / 2 - center;
          gallery.scrollBy({ top: offset, behavior: 'smooth' });
        }, 150);
      });
    };

    const initialTimer = setTimeout(() => getClosest(), 200);
    gallery.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      clearTimeout(initialTimer);
      if (snapTimer !== null) clearTimeout(snapTimer);
      if (rafId !== null) cancelAnimationFrame(rafId);
      gallery.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [images.length]);

  // Reset on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    requestAnimationFrame(() => {
      if (mobileGalleryRef.current) mobileGalleryRef.current.scrollLeft = 0;
      if (desktopGalleryRef.current) desktopGalleryRef.current.scrollTop = 0;
      if (sidebarRef.current) sidebarRef.current.scrollTop = 0;
    });
    setIsExpanded(false);
    setPageVisible(false);
    setHasInteracted(false);
    if (isLightboxOpen) closeLightbox();
    setImageKey(prev => prev + 1);
  }, [id]);

  // Fade in
  useEffect(() => {
    const timer = setTimeout(() => setPageVisible(true), 50);
    return () => clearTimeout(timer);
  }, [project]);

  // Render content blocks with inline links and <br /> support
  const renderContent = (block: typeof project.detailContent[number]) => {
    if (!block.content) return null;
    const text = Array.isArray(block.content) ? block.content.join(' ') : block.content;

    if (block.inlineLinks?.length) {
      const parts: (string | JSX.Element)[] = [];
      let remaining = text;
      block.inlineLinks.forEach((link, i) => {
        const pos = remaining.indexOf(link.text);
        if (pos === -1) return;
        if (pos > 0) parts.push(remaining.substring(0, pos));
        parts.push(
          <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
            className="underline hover:text-black/70 transition-colors">
            {link.text}
          </a>
        );
        remaining = remaining.substring(pos + link.text.length);
      });
      if (remaining) parts.push(remaining);
      return <>{parts}</>;
    }

    if (text.includes('<br />')) {
      return (
        <>
          {text.split('<br />').map((seg, i, arr) => (
            <React.Fragment key={i}>{seg}{i < arr.length - 1 && <br />}</React.Fragment>
          ))}
        </>
      );
    }

    if (Array.isArray(block.content)) {
      return (
        <>
          {block.content.map((line, i, arr) => (
            <React.Fragment key={i}>{line}{i < arr.length - 1 && <br />}</React.Fragment>
          ))}
        </>
      );
    }

    return block.content;
  };

  return (
    <div
      key={`project-${id}-${imageKey}`}
      data-theme="light"
      style={{ opacity: pageVisible ? 1 : 0, transition: 'opacity 700ms ease-in-out' }}
      className="min-h-screen bg-white"
    >
      <div className="flex flex-col md:flex-row md:h-screen md:overflow-hidden">

        {/* Gallery column */}
        <div className="relative w-full md:w-[60%] md:h-full md:overflow-y-auto md:overflow-x-hidden scrollbar-hide px-4 pt-12 md:pt-16">

          {/* Mobile: horizontal snap scroll */}
          <div
            ref={mobileGalleryRef}
            className="md:hidden flex gap-4 h-full py-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          >
            {images.map((image, index) => (
              <button
                key={`mobile-${index}-${imageKey}`}
                onClick={() => openLightbox(index)}
                className="relative flex-shrink-0 w-[80vw] bg-white overflow-hidden cursor-pointer group snap-center snap-always"
                style={{ height: 'calc(50svh - 3rem)' }}
                aria-label={`View image ${index + 1} in lightbox`}
              >
                <LazyImage
                  src={image}
                  alt={`${project.title} ${index + 1}`}
                  className="w-full h-full object-contain transition-opacity group-hover:opacity-90"
                  priority={index < 6}
                  loading={index < 6 ? 'eager' : 'lazy'}
                />
              </button>
            ))}
          </div>

          {/* Desktop: vertical scroll */}
          <div ref={desktopGalleryRef} className="hidden md:block space-y-6 pb-6">
            {images.map((image, index) => (
              <button
                key={`desktop-${index}-${imageKey}`}
                ref={(el) => { imageRefs.current[index] = el; }}
                onClick={() => openLightbox(index)}
                className="relative w-full bg-white overflow-hidden cursor-pointer group block"
                aria-label={`View image ${index + 1} in lightbox`}
              >
                <LazyImage
                  src={image}
                  alt={`${project.title} ${index + 1}`}
                  className="w-full h-auto object-cover transition-opacity group-hover:opacity-90"
                  priority={index < 3}
                  loading={index < 3 ? 'eager' : 'lazy'}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Project info sidebar */}
        <div ref={sidebarRef} className="w-full md:w-[40%] md:h-full md:overflow-y-auto scrollbar-hide px-4 md:px-8 md:pt-24">
          <div className="pb-12 pt-6 md:pb-6">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-light mb-6 md:mb-8 uppercase">
              {project.title}
            </h1>

            <div className="space-y-3 md:space-y-4 mb-8 md:mb-12">
              <div className="flex items-baseline gap-2 border-b border-black/10 pb-3 md:pb-4">
                <span className="text-xs md:text-sm text-neutral-500 min-w-[120px] md:min-w-[140px]">Project Location:</span>
                <span className="text-sm md:text-base text-black">{project.location}</span>
              </div>

              {project.accolades && project.accolades.length > 0 && (
                <div className="flex items-baseline gap-2 border-b border-black/10 pb-3 md:pb-4">
                  <span className="text-xs md:text-sm text-neutral-500 min-w-[120px] md:min-w-[140px]">Accolades:</span>
                  <div className="text-sm md:text-base text-black">
                    {project.accolades.map((accolade, i) => (
                      <div key={i} className="mb-1 last:mb-0">{accolade}</div>
                    ))}
                  </div>
                </div>
              )}

              {project.status && (
                <div className="flex items-baseline gap-2 border-b border-black/10 pb-3 md:pb-4">
                  <span className="text-xs md:text-sm text-neutral-500 min-w-[120px] md:min-w-[140px]">Status:</span>
                  <span className="text-sm md:text-base text-black">{project.status}</span>
                </div>
              )}

              <div className="flex items-baseline gap-2 border-b border-black/10 pb-3 md:pb-4">
                <span className="text-xs md:text-sm text-neutral-500 min-w-[120px] md:min-w-[140px]">Project Team:</span>
                <span className="text-sm md:text-base text-black">
                  {(project.projectTeam || ['O2 Design Atelier']).join(', ')}
                </span>
              </div>
            </div>

            <div className="relative">
              <div
                ref={contentRef}
                className={`transition-all duration-500 ease-in-out ${!isExpanded && needsShowMore ? 'max-h-[600px] overflow-hidden' : ''}`}
              >
                {project.detailContent?.map((block, i) => {
                  if (block.type !== 'text') return null;
                  return (
                    <div key={i} className="mb-6">
                      {block.heading && (
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-light mb-4">{block.heading}</h2>
                      )}
                      {block.content && (
                        <p className="text-sm md:text-base leading-relaxed text-neutral-700">
                          {renderContent(block)}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              {needsShowMore && !isExpanded && (
                <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white via-white/95 to-transparent pointer-events-none" />
              )}

              {needsShowMore && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  aria-expanded={isExpanded}
                  className="relative z-10 w-full mt-4 md:mt-6 py-4 flex items-center justify-center gap-2 text-base font-normal text-black hover:text-black/70 transition-colors"
                >
                  <span>{isExpanded ? 'Show Less' : 'Show More'}</span>
                  <ChevronDown size={20} strokeWidth={1.5}
                    className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Similar Projects */}
      {similarProjects.length > 0 && (
        <div className="w-full bg-white py-12">
          <div className="w-full max-w-[2340px] mx-auto px-4 md:px-8">
            <h3 className="caption text-neutral-500 mb-8">Similar Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProjects.map((p) => (
                <Link key={p.id} to={`/portfolio/${p.slug}`} className="block group">
                  <div className="relative overflow-hidden mb-3 aspect-video">
                    <LazyImage
                      src={p.images[0]}
                      alt={p.title}
                      className="w-full h-full"
                      imgClassName="transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <h4 className="text-xl font-light mb-1 relative inline-block uppercase">
                    <span className="relative">
                      {p.title}
                      <span className="absolute left-0 bottom-0 w-full h-[1px] bg-black scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />
                    </span>
                  </h4>
                  <p className="text-sm text-neutral-500">{p.location}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="w-full bg-white py-16">
        <div className="w-full max-w-[2340px] mx-auto px-4 md:px-8">
          <p className="text-xs uppercase tracking-widest text-black/40 mb-2">Like the project?</p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 text-sm uppercase tracking-widest text-black hover:text-black/50 transition-colors duration-300"
          >
            Get in touch
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
              className="transition-transform duration-300 group-hover:translate-x-1">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95"
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
          onClick={closeLightbox}
          onTouchStart={lightboxGestures.handleTouchStart}
          onTouchMove={lightboxGestures.handleTouchMove}
          onTouchEnd={lightboxGestures.handleTouchEnd}
        >
          {/* Close */}
          <button
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            className="fixed top-6 right-6 text-white/80 hover:text-white transition-colors z-[103]"
            aria-label="Close lightbox"
          >
            <X size={32} strokeWidth={1.5} />
          </button>

          {/* Counter */}
          <div className="fixed top-6 left-6 text-sm text-white/80 tracking-wider z-[103]">
            {lightboxImageIndex + 1} / {images.length}
          </div>

          {/* Swipe hint — mobile only, disappears after first interaction */}
          {!hasInteracted && (
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[104] md:hidden">
              <p className="text-white/40 text-xs text-center animate-pulse">
                Swipe to navigate • Swipe down to close
              </p>
            </div>
          )}

          {/* Main image */}
          <div
            className="fixed inset-0 z-[101] flex items-center justify-center px-4 md:px-16"
            style={{ paddingTop: '60px', paddingBottom: '140px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              key={`lightbox-${lightboxImageIndex}-${imageKey}`}
              src={images[lightboxImageIndex]}
              alt={`${project.title} ${lightboxImageIndex + 1}`}
              className="max-w-full max-h-full w-auto h-auto object-contain"
              loading="eager"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); setHasInteracted(true); goToPrevious(); }}
            className="fixed left-4 md:left-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors z-[102]"
            aria-label="Previous image"
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); setHasInteracted(true); goToNext(); }}
            className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors z-[102]"
            aria-label="Next image"
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          <ThumbnailStrip
            images={images}
            currentIndex={lightboxImageIndex}
            imageKey={imageKey}
            onSelect={(index) => { setHasInteracted(true); openLightbox(index); }}
          />
        </div>
      )}
    </div>
  );
}