import { useParams, Link, Navigate } from 'react-router-dom';
import { useState, useEffect, useMemo, useRef } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { projects } from '../data/mockData';
import React from 'react';
import { useLightbox } from '../hooks/useLightbox';
import { useTouchGestures } from '../hooks/useTouchGestures';
import LazyImage from '../components/LazyImage';

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

  // Early return if no project
  if (!project) {
    return <Navigate to="/portfolio" replace />;
  }

  const images = project.images;

  // Initialize lightbox hook
  const {
    isOpen: isLightboxOpen,
    currentIndex: lightboxImageIndex,
    openLightbox,
    closeLightbox,
    goToNext,
    goToPrevious,
    visibleThumbnails,
  } = useLightbox(images, { enabled: true });

  // Touch gestures for lightbox - swipe to navigate & close
  const lightboxGestures = useTouchGestures({
    onSwipeLeft: () => {
      setHasInteracted(true); // ← ADD THIS
      goToNext();
    },
    onSwipeRight: () => {
      setHasInteracted(true); // ← ADD THIS
      goToPrevious();
    },
    onSwipeDown: () => {
      setHasInteracted(true); // ← ADD THIS
      closeLightbox();
    },
    threshold: 60,
    enabled: isLightboxOpen,
  });

  // Memoize similar projects (deterministic shuffle based on project ID)
  const similarProjects = useMemo(() => {
    if (!project) return [];

    const filtered = projects.filter(
      p => p.category === project.category && p.slug !== project.slug
    );

    // Find the index of the current project in the filtered list
    const allInCategory = projects.filter(p => p.category === project.category);
    const currentIndex = allInCategory.findIndex(p => p.slug === project.slug);

    const result: typeof filtered = [];

    // Get neighbors: 1 before and 2 after (or adjust to fill 3 slots)
    for (let offset = -1; offset <= 2 && result.length < 3; offset++) {
      if (offset === 0) continue; // Skip the current project

      const index = currentIndex + offset;
      if (index >= 0 && index < allInCategory.length) {
        const neighborProject = allInCategory[index];
        if (neighborProject.slug !== project.slug) {
          result.push(neighborProject);
        }
      }
    }

    // If we don't have 3 yet, fill with remaining projects
    if (result.length < 3) {
      for (const p of filtered) {
        if (!result.find(r => r.id === p.id) && result.length < 3) {
          result.push(p);
        }
      }
    }

    return result.slice(0, 3);
  }, [project?.id, project?.category]);

  // Check if content needs "Show More"
  useEffect(() => {
    if (contentRef.current) {
      setNeedsShowMore(contentRef.current.scrollHeight > 600);
    }
  }, [project]);

  // Track active image on scroll
  useEffect(() => {
    const mobileGallery = mobileGalleryRef.current;
    const desktopGallery = desktopGalleryRef.current;

    const handleScroll = () => {
      if (window.innerWidth < 768 && mobileGallery) {
        // Mobile: horizontal scroll
        const scrollLeft = mobileGallery.scrollLeft;
        const itemWidth = mobileGallery.scrollWidth / images.length;
        const index = Math.round(scrollLeft / itemWidth);
        setActiveImageIndex(Math.min(index, images.length - 1));
      } else if (desktopGallery) {
        // Desktop: vertical scroll - check which image is most visible
        imageRefs.current.forEach((imgRef, index) => {
          if (imgRef) {
            const rect = imgRef.getBoundingClientRect();
            const galleryRect = desktopGallery.getBoundingClientRect();
            const visibleHeight = Math.min(rect.bottom, galleryRect.bottom) - Math.max(rect.top, galleryRect.top);
            const imgHeight = rect.height;

            if (visibleHeight / imgHeight > 0.5) {
              setActiveImageIndex(index);
            }
          }
        });
      }
    };

    if (mobileGallery) {
      mobileGallery.addEventListener('scroll', handleScroll, { passive: true });
    }
    if (desktopGallery) {
      desktopGallery.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (mobileGallery) {
        mobileGallery.removeEventListener('scroll', handleScroll);
      }
      if (desktopGallery) {
        desktopGallery.removeEventListener('scroll', handleScroll);
      }
    };
  }, [project, images.length]);

  // Reset on route change
  useEffect(() => {
    window.scrollTo(0, 0);

    requestAnimationFrame(() => {
      if (mobileGalleryRef.current) {
        mobileGalleryRef.current.scrollLeft = 0;
      }
      if (desktopGalleryRef.current) {
        desktopGalleryRef.current.scrollTop = 0;
      }
      if (sidebarRef.current) {
        sidebarRef.current.scrollTop = 0;
      }
    });

    setIsExpanded(false);
    setPageVisible(false);
    setActiveImageIndex(0);
    setHasInteracted(false);

    if (isLightboxOpen) {
      closeLightbox();
    }

    setImageKey(prev => prev + 1);

  }, [id]);

  // Fade in animation
  useEffect(() => {
    if (!project) return;
    const timer = setTimeout(() => setPageVisible(true), 50);
    return () => clearTimeout(timer);
  }, [project]);

  return (
    <div
      key={`project-${id}-${imageKey}`}
      data-theme="light"
      style={{
        opacity: pageVisible ? 1 : 0,
        transition: 'opacity 700ms ease-in-out'
      }}
      className="min-h-screen bg-white"
    >
      {/* Split Layout */}
      <div className="flex flex-col md:flex-row md:h-screen">
        {/* Images Gallery with Indicator */}
        <div className="relative w-full md:w-[60%] md:h-full px-4 pt-16 md:pt-16">

          {/* Image Counter - Desktop Only */}
          <div className="hidden md:block fixed top-20 left-8 z-10">
            <span className="text-sm text-neutral-600">
              {activeImageIndex + 1} / {images.length}
            </span>
          </div>

          {/* Mobile: Horizontal scroll */}
          <div ref={mobileGalleryRef} className="md:hidden flex gap-4 h-full py-6 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide">
            {images.map((image, index) => (
              <button
                key={`mobile-${index}-${imageKey}`}
                ref={(el) => (imageRefs.current[index] = el)}
                onClick={() => openLightbox(index)}
                className="relative flex-shrink-0 w-[80vw] bg-white overflow-hidden cursor-pointer group snap-center"
                style={{ height: 'calc(50vh - 3rem)' }}
                aria-label={`View image ${index + 1} in lightbox`}
              >
                <LazyImage
                  src={image}
                  alt={`${project.title} ${index + 1}`}
                  className="w-full h-full object-contain transition-opacity group-hover:opacity-90"
                  priority={index < 6}
                  loading={index < 6 ? "eager" : "lazy"}
                />
              </button>
            ))}
          </div>

          {/* Desktop: Vertical scroll */}
          <div
            ref={desktopGalleryRef}
            className="hidden md:block space-y-6 pb-6 overflow-y-auto overflow-x-hidden scrollbar-hide"
            style={{ height: 'calc(100vh - 4rem)' }}
          >
            {images.map((image, index) => (
              <button
                key={`desktop-${index}-${imageKey}`}
                ref={(el) => (imageRefs.current[index] = el)}
                onClick={() => openLightbox(index)}
                className="relative w-full bg-white overflow-hidden cursor-pointer group block"
                aria-label={`View image ${index + 1} in lightbox`}
              >
                <LazyImage
                  src={image}
                  alt={`${project.title} ${index + 1}`}
                  className="w-full h-auto object-cover transition-opacity group-hover:opacity-90"
                  priority={index < 3}
                  loading={index < 3 ? "eager" : "lazy"}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Project Info */}
        <div ref={sidebarRef} className="w-full md:w-[40%] md:h-full md:overflow-y-auto px-4 md:px-8 md:pt-24">
          <div className="pb-12 pt-6 md:pb-6">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-light mb-6 md:mb-8 uppercase">
              {project.title}
            </h1>

            <div className="space-y-3 md:space-y-4 mb-8 md:mb-12">
              <div className="flex items-baseline gap-2 border-b border-black/10 pb-3 md:pb-4">
                <span className="text-xs md:text-sm text-neutral-500 min-w-[120px] md:min-w-[140px]">Project Location:</span>
                <span className="text-sm md:text-base text-black">{project.location}</span>
              </div>

              <div className="flex items-baseline gap-2 border-b border-black/10 pb-3 md:pb-4">
                <span className="text-xs md:text-sm text-neutral-500 min-w-[120px] md:min-w-[140px]">Status:</span>
                <span className="text-sm md:text-base text-black">{project.status || 'Completed'}</span>
              </div>

              <div className="flex items-baseline gap-2 border-b border-black/10 pb-3 md:pb-4">
                <span className="text-xs md:text-sm text-neutral-500 min-w-[120px] md:min-w-[140px]">Project Team:</span>
                <span className="text-sm md:text-base text-black">
                  {(project.projectTeam || ['O2 Design Atelier']).join(', ')}
                </span>
              </div>
            </div>

            {/* Project Write-up with Show More */}
            <div className="relative">
              <div
                ref={contentRef}
                className={`transition-all duration-500 ease-in-out ${!isExpanded && needsShowMore ? 'max-h-[600px] overflow-hidden' : ''
                  }`}
              >
                {project.detailContent?.map((block, index) => {
                  if (block.type === 'text') {
                    const renderContent = () => {
                      if (!block.content) return null;

                      const contentText = Array.isArray(block.content)
                        ? block.content.join(' ')
                        : block.content;

                      // If there are multiple inline links
                      if (block.inlineLinks && block.inlineLinks.length > 0) {
                        const parts: (string | JSX.Element)[] = [];
                        let remainingText = contentText;

                        block.inlineLinks.forEach((link, linkIndex) => {
                          const linkPosition = remainingText.indexOf(link.text);
                          if (linkPosition !== -1) {
                            // Add text before the link
                            if (linkPosition > 0) {
                              parts.push(remainingText.substring(0, linkPosition));
                            }
                            // Add the link
                            parts.push(
                              <a
                                key={linkIndex}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline hover:text-black/70 transition-colors"
                              >
                                {link.text}
                              </a>
                            );
                            // Update remaining text
                            remainingText = remainingText.substring(linkPosition + link.text.length);
                          }
                        });

                        // Add any remaining text
                        if (remainingText) {
                          parts.push(remainingText);
                        }

                        return <>{parts}</>;
                      }

                      // No inline links - render normally
                      return Array.isArray(block.content) ? (
                        block.content.map((line, i) => (
                          <React.Fragment key={i}>
                            {line}
                            {i < (block.content as string[]).length - 1 && <br />}
                          </React.Fragment>
                        ))
                      ) : (
                        block.content
                      );
                    };

                    return (
                      <div key={index} className="mb-6">
                        {block.heading && (
                          <h2 className="text-xl md:text-2xl lg:text-3xl font-light mb-4">
                            {block.heading}
                          </h2>
                        )}
                        {block.content && (
                          <p
                            className="text-sm md:text-base leading-relaxed text-neutral-700"
                            dangerouslySetInnerHTML={{ __html: renderContent() as string }}
                          />
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
                  className="relative z-10 w-full mt-4 md:mt-6 py-4 flex items-center justify-center gap-2 text-base font-normal text-black hover:text-black/70 transition-colors"
                >
                  <span>{isExpanded ? 'Show Less' : 'Show More'}</span>
                  <ChevronDown
                    size={20}
                    strokeWidth={1.5}
                    className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''
                      }`}
                  />
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
              <h3 className="caption text-neutral-500 mb-8">
                Similar Projects
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {similarProjects.map((similarProject) => (
                  <Link
                    key={similarProject.id}
                    to={`/portfolio/${similarProject.slug}`}
                    className="block group"
                  >
                    <div className="relative overflow-hidden mb-3 bg-neutral-100 aspect-video">
                      <LazyImage
                        src={similarProject.images[0]}
                        alt={similarProject.title}
                        className="w-full h-full"
                        imgClassName="transition-transform duration-700 group-hover:scale-110"
                        imgStyle={{
                          objectPosition: similarProject.imagePosition === 'top' ? 'top' :
                            similarProject.imagePosition === 'bottom' ? 'bottom' :
                              'center'
                        }}
                        loading="lazy"
                      />
                    </div>
                    <h4 className="text-base font-light mb-1 relative inline-block uppercase">
                      <span className="relative">
                        {similarProject.title}
                        <span className="absolute left-0 bottom-0 w-full h-[1px] bg-black scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100"></span>
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

      {/* Lightbox with Touch Gestures */}
      {isLightboxOpen && (
        <div
          onTouchStart={lightboxGestures.handleTouchStart}
          onTouchMove={lightboxGestures.handleTouchMove}
          onTouchEnd={lightboxGestures.handleTouchEnd}
          className="fixed inset-0 bg-black z-[100]"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors z-[103]"
            aria-label="Close lightbox"
          >
            <X size={32} strokeWidth={1.5} />
          </button>

          <div className="absolute top-6 left-6 text-sm text-white/80 tracking-wider z-[103]">
            {lightboxImageIndex + 1} / {images.length}
          </div>

          {/* Swipe hint - only show on mobile, fades out after first interaction */}
          {!hasInteracted && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[103] md:hidden">
              <div className="text-white/40 text-xs text-center animate-pulse">
                Swipe to navigate • Swipe down to close
              </div>
            </div>
          )}

          <div
            className="absolute inset-0 z-[101] flex items-center justify-center px-12 py-16"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              key={`lightbox-${lightboxImageIndex}-${imageKey}`}
              src={images[lightboxImageIndex]}
              alt={`${project.title} ${lightboxImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
              loading="eager"
            />
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setHasInteracted(true);
              goToPrevious();
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors z-[102]"
            aria-label="Previous image"
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors z-[102]"
            aria-label="Next image"
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          <div
            className="absolute bottom-0 left-0 right-0 z-[102] bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-20 pb-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-center gap-2">
              {visibleThumbnails.map((thumb, displayIndex) => {
                const isCenter = images.length <= 7
                  ? thumb.actualIndex === lightboxImageIndex
                  : displayIndex === 3;

                return (
                  <button
                    key={`thumb-${thumb.actualIndex}-${imageKey}`}
                    onClick={() => openLightbox(thumb.actualIndex)}
                    className={`flex-shrink-0 transition-all duration-300 overflow-hidden rounded ${isCenter ? 'ring-2 ring-white opacity-100 scale-110' : 'opacity-50 hover:opacity-100'
                      }`}
                    aria-label={`Go to image ${thumb.actualIndex + 1}`}
                  >
                    <img
                      src={thumb.src}
                      alt={`Thumbnail ${thumb.actualIndex + 1}`}
                      className="w-16 h-12 object-cover"
                      loading="eager"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}