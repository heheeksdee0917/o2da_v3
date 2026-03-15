import { useParams, Link, Navigate } from 'react-router-dom';
import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { projects } from '../data/mockData';
import React from 'react';
import { useLightbox } from '../hooks/useLightbox';
import { useTouchGestures } from '../hooks/useTouchGestures';
import LazyImage from '../components/LazyImage';

// ─── Infinite Thumbnail Strip ────────────────────────────────────────────────
//
// Strategy: render 3 copies of the image list side by side (prev | real | next).
// On mount, silently jump to the "real" copy in the middle. When the user
// scrolls near either end, silently teleport back to the equivalent position
// in the middle copy — creating the illusion of infinite scroll.
// Clicking a thumb calls onSelect with the real image index.

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
  const activeRef = useRef<HTMLButtonElement | null>(null);
  const isJumping = useRef(false); // prevents scroll handler firing during teleport

  // Triple the list: [copy A (prev)] [copy B (real)] [copy C (next)]
  const tripled = useMemo(() =>
    [...images, ...images, ...images].map((src, i) => ({
      src,
      actualIndex: i % count,
      copyIndex: Math.floor(i / count), // 0=A, 1=B, 2=C
      globalIndex: i,
    })),
  [images, count]);

  // On mount and when imageKey changes (project changed), jump to copy B without animation
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    // Find the active thumb in copy B (middle copy, offset = count)
    const targetGlobal = count + currentIndex;
    const target = strip.children[targetGlobal] as HTMLElement;
    if (!target) return;

    isJumping.current = true;
    // Disable smooth scroll, center the target, re-enable
    strip.style.scrollBehavior = 'auto';
    target.scrollIntoView({ block: 'nearest', inline: 'center' });
    requestAnimationFrame(() => {
      strip.style.scrollBehavior = '';
      isJumping.current = false;
    });
  }, [imageKey]); // only on project change, not on every currentIndex change

  // When currentIndex changes (navigation), smooth-scroll the active thumb into center
  useEffect(() => {
    const strip = stripRef.current;
    const active = activeRef.current;
    if (!strip || !active || isJumping.current) return;

    active.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [currentIndex]);

  // After smooth scroll settles, check if we're in copy A or C and teleport to B
  const handleScroll = useCallback(() => {
    const strip = stripRef.current;
    if (!strip || isJumping.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = strip;
    const singleWidth = scrollWidth / 3;
    const leftEdge = singleWidth * 0.25;
    const rightEdge = singleWidth * 2.75;

    if (scrollLeft < leftEdge || scrollLeft + clientWidth > rightEdge + clientWidth) {
      // Teleport: find same visual position in copy B
      const offset = scrollLeft % singleWidth;
      isJumping.current = true;
      strip.style.scrollBehavior = 'auto';
      strip.scrollLeft = singleWidth + offset;
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
      {/* py-2 gives vertical room so scale-110 on active thumb isn't clipped */}
      <div
        ref={stripRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide py-2"
        style={{ scrollMarginInline: '50vw' }}
      >
        {tripled.map((thumb) => {
          const isActive = thumb.copyIndex === 1 && thumb.actualIndex === currentIndex;
          return (
            <button
              key={`thumb-${thumb.globalIndex}-${imageKey}`}
              ref={isActive ? activeRef : null}
              onClick={() => onSelect(thumb.actualIndex)}
              style={{ scrollMarginInline: '40vw' }}
              className={`flex-shrink-0 transition-all duration-300 rounded ${
                isActive
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
          );
        })}
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function PortfolioDetails() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find(p => p.slug === id);

  const [isExpanded, setIsExpanded] = useState(false);
  const [needsShowMore, setNeedsShowMore] = useState(false);
  const [pageVisible, setPageVisible] = useState(false);
  const [imageKey, setImageKey] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const contentRef = useRef<HTMLDivElement>(null);
  const mobileGalleryRef = useRef<HTMLDivElement>(null);
  const desktopGalleryRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [hasInteracted, setHasInteracted] = useState(false);
  const scrollTimeoutRef = useRef<number | null>(null);

  if (!project) {
    return <Navigate to="/portfolio" replace />;
  }

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
    if (!project) return [];
    const filtered = projects.filter(
      p => p.category === project.category && p.slug !== project.slug
    );
    const allInCategory = projects.filter(p => p.category === project.category);
    const currentIdx = allInCategory.findIndex(p => p.slug === project.slug);
    const result: typeof filtered = [];
    for (let offset = -1; offset <= 2 && result.length < 3; offset++) {
      if (offset === 0) continue;
      const index = currentIdx + offset;
      if (index >= 0 && index < allInCategory.length) {
        const neighbor = allInCategory[index];
        if (neighbor.slug !== project.slug) result.push(neighbor);
      }
    }
    if (result.length < 3) {
      for (const p of filtered) {
        if (!result.find(r => r.id === p.id) && result.length < 3) result.push(p);
      }
    }
    return result.slice(0, 3);
  }, [project?.id, project?.category]);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (contentRef.current) setNeedsShowMore(contentRef.current.scrollHeight > 600);
    });
    if (contentRef.current) observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, [project]);

  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isLightboxOpen]);

  useEffect(() => {
    const desktopGallery = desktopGalleryRef.current;
    if (!desktopGallery) return;

    const handleScroll = () => {
      if (window.innerWidth < 768) return;
      const galleryRect = desktopGallery.getBoundingClientRect();
      const viewportCenter = galleryRect.top + galleryRect.height / 2;
      let closestIndex = 0;
      let minDistance = Infinity;
      imageRefs.current.forEach((imgRef, index) => {
        if (!imgRef) return;
        const rect = imgRef.getBoundingClientRect();
        const imageCenter = rect.top + rect.height / 2;
        const distance = Math.abs(imageCenter - viewportCenter);
        if (distance < minDistance) { minDistance = distance; closestIndex = index; }
      });
      setActiveImageIndex(closestIndex);
    };

    const handleScrollEnd = () => {
      if (window.innerWidth < 768) return;
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = window.setTimeout(() => {
        const galleryRect = desktopGallery.getBoundingClientRect();
        const viewportCenter = galleryRect.top + galleryRect.height / 2;
        let closestIndex = 0;
        let minDistance = Infinity;
        imageRefs.current.forEach((imgRef, index) => {
          if (!imgRef) return;
          const rect = imgRef.getBoundingClientRect();
          const imageCenter = rect.top + rect.height / 2;
          const distance = Math.abs(imageCenter - viewportCenter);
          if (distance < minDistance) { minDistance = distance; closestIndex = index; }
        });
        const targetImage = imageRefs.current[closestIndex];
        if (targetImage) {
          const targetRect = targetImage.getBoundingClientRect();
          const scrollOffset = (targetRect.top + targetRect.height / 2) - viewportCenter;
          desktopGallery.scrollBy({ top: scrollOffset, behavior: 'smooth' });
        }
      }, 150);
    };

    let rafId: number | null = null;
    const debouncedScroll = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => { handleScroll(); handleScrollEnd(); });
    };

    const initialTimeout = setTimeout(() => handleScroll(), 200);
    desktopGallery.addEventListener('scroll', debouncedScroll, { passive: true });
    window.addEventListener('resize', debouncedScroll, { passive: true });

    return () => {
      clearTimeout(initialTimeout);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      if (rafId !== null) cancelAnimationFrame(rafId);
      desktopGallery.removeEventListener('scroll', debouncedScroll);
      window.removeEventListener('resize', debouncedScroll);
    };
  }, [images.length]);

  useEffect(() => {
    window.scrollTo(0, 0);
    requestAnimationFrame(() => {
      if (mobileGalleryRef.current) mobileGalleryRef.current.scrollLeft = 0;
      if (desktopGalleryRef.current) desktopGalleryRef.current.scrollTop = 0;
      if (sidebarRef.current) sidebarRef.current.scrollTop = 0;
    });
    setIsExpanded(false);
    setPageVisible(false);
    setActiveImageIndex(0);
    setHasInteracted(false);
    if (isLightboxOpen) closeLightbox();
    setImageKey(prev => prev + 1);
  }, [id]);

  useEffect(() => {
    if (!project) return;
    const timer = setTimeout(() => setPageVisible(true), 50);
    return () => clearTimeout(timer);
  }, [project]);

  return (
    <div
      key={`project-${id}-${imageKey}`}
      data-theme="light"
      style={{ opacity: pageVisible ? 1 : 0, transition: 'opacity 700ms ease-in-out' }}
      className="min-h-screen bg-white"
    >
      <div className="flex flex-col md:flex-row md:h-screen">
        <div className="relative w-full md:w-[60%] md:h-full px-4 pt-16 md:pt-16">

          {/* Mobile: Horizontal scroll with snap */}
          <div
            ref={mobileGalleryRef}
            className="md:hidden flex gap-4 h-full py-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
          >
            {images.map((image, index) => (
              <button
                key={`mobile-${index}-${imageKey}`}
                ref={(el) => (imageRefs.current[index] = el)}
                onClick={() => openLightbox(index)}
                className="relative flex-shrink-0 w-[80vw] bg-white overflow-hidden cursor-pointer group snap-center snap-always"
                style={{ height: 'calc(50svh - 3rem)', scrollSnapAlign: 'center', scrollSnapStop: 'always' }}
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

          {/* Desktop: Vertical scroll */}
          <div
            ref={desktopGalleryRef}
            className="hidden md:block space-y-6 pb-6 overflow-y-auto overflow-x-hidden scrollbar-hide"
            style={{ height: 'calc(100vh - 4rem)', scrollBehavior: 'smooth' }}
          >
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

        {/* Project Info Sidebar */}
        <div ref={sidebarRef} className="w-full md:w-[40%] md:h-full md:overflow-y-auto scrollbar-hide smooth-scroll px-4 md:px-8 md:pt-24">
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
                    {project.accolades.map((accolade, index) => (
                      <div key={index} className="mb-1 last:mb-0">{accolade}</div>
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
                {project.detailContent?.map((block, index) => {
                  if (block.type === 'text') {
                    const renderContent = () => {
                      if (!block.content) return null;
                      const contentText = Array.isArray(block.content)
                        ? block.content.join(' ')
                        : block.content;

                      if (block.inlineLinks && block.inlineLinks.length > 0) {
                        const parts: (string | JSX.Element)[] = [];
                        let remainingText = contentText;
                        block.inlineLinks.forEach((link, linkIndex) => {
                          const pos = remainingText.indexOf(link.text);
                          if (pos !== -1) {
                            if (pos > 0) parts.push(remainingText.substring(0, pos));
                            parts.push(
                              <a key={linkIndex} href={link.url} target="_blank" rel="noopener noreferrer"
                                className="underline hover:text-black/70 transition-colors">
                                {link.text}
                              </a>
                            );
                            remainingText = remainingText.substring(pos + link.text.length);
                          }
                        });
                        if (remainingText) parts.push(remainingText);
                        return <>{parts}</>;
                      }

                      if (contentText.includes('<br />')) {
                        const segments = contentText.split('<br />');
                        return (
                          <>
                            {segments.map((segment, i) => (
                              <React.Fragment key={i}>
                                {segment}
                                {i < segments.length - 1 && <br />}
                              </React.Fragment>
                            ))}
                          </>
                        );
                      }

                      return Array.isArray(block.content) ? (
                        block.content.map((line, i) => (
                          <React.Fragment key={i}>
                            {line}
                            {i < (block.content as string[]).length - 1 && <br />}
                          </React.Fragment>
                        ))
                      ) : block.content;
                    };

                    return (
                      <div key={index} className="mb-6">
                        {block.heading && (
                          <h2 className="text-xl md:text-2xl lg:text-3xl font-light mb-4">{block.heading}</h2>
                        )}
                        {block.content && (
                          <p className="text-sm md:text-base leading-relaxed text-neutral-700">{renderContent()}</p>
                        )}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>

              {needsShowMore && !isExpanded && (
                <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white via-white/95 to-transparent pointer-events-none" />
              )}

              {needsShowMore && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  aria-expanded={isExpanded}
                  aria-controls="project-content"
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
          <div className="flex justify-center">
            <div className="w-full max-w-[2340px] px-4 md:px-8">
              <h3 className="caption text-neutral-500 mb-8">Similar Projects</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {similarProjects.map((similarProject) => (
                  <Link key={similarProject.id} to={`/portfolio/${similarProject.slug}`} className="block group">
                    <div className="relative overflow-hidden mb-3 aspect-video">
                      <LazyImage
                        src={similarProject.images[0]}
                        alt={similarProject.title}
                        className="w-full h-full"
                        imgClassName="transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    <h4 className="text-xl font-light mb-1 relative inline-block uppercase">
                      <span className="relative">
                        {similarProject.title}
                        <span className="absolute left-0 bottom-0 w-full h-[1px] bg-black scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />
                      </span>
                    </h4>
                    <p className="text-sm text-neutral-500">{similarProject.location}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

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
          <button
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            className="fixed top-6 right-6 text-white/80 hover:text-white transition-colors z-[103]"
            aria-label="Close lightbox"
          >
            <X size={32} strokeWidth={1.5} />
          </button>

          <div className="fixed top-6 left-6 text-sm text-white/80 tracking-wider z-[103]">
            {lightboxImageIndex + 1} / {images.length}
          </div>

          {!hasInteracted && (
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[104] md:hidden">
              <div className="text-white/40 text-xs text-center animate-pulse">
                Swipe to navigate • Swipe down to close
              </div>
            </div>
          )}

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

          <button
            onClick={(e) => { e.stopPropagation(); setHasInteracted(true); goToPrevious(); }}
            className="fixed left-4 md:left-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors z-[102]"
            aria-label="Previous image"
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

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