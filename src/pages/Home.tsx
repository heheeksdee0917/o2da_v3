import { useNavigate } from 'react-router-dom';
import { heroSections } from '../data/heroData';
import Footer from '../components/Footer';
import React, { useState, useEffect, useRef } from 'react';

export default function HeroSection() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const [imagesCanLoad, setImagesCanLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleSectionClick = (slug: string) => {
    navigate(`/portfolio/${slug}`);
  };

  // Load video and images together on mount
  useEffect(() => {
    // Always allow images to load immediately
    setImagesCanLoad(true);

    const videoSection = heroSections.find(s => s.img.endsWith('.mp4'));
    if (!videoSection) return;

    const video = videoRef.current;
    if (!video) return;

    // Video can play through smoothly - hide thumbnail
    const handleCanPlayThrough = () => {
      setVideoReady(true);
    };

    video.addEventListener('canplaythrough', handleCanPlayThrough);

    return () => {
      video.removeEventListener('canplaythrough', handleCanPlayThrough);
    };
  }, []);

  // Scroll handling
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      setScrollProgress(progress);

      sectionRefs.current.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;
          if (isVisible) {
            setActiveSection(index);
          }
        }
      });
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for text animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-visible');
        } else {
          entry.target.classList.remove('section-visible');
        }
      });
    }, observerOptions);

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Preload video with highest priority */}
      {heroSections.find(s => s.img.endsWith('.mp4')) && (
        <link
          rel="preload"
          as="video"
          href={heroSections.find(s => s.img.endsWith('.mp4'))!.img}
          type="video/mp4"
        />
      )}

      {/* Section Navigation Indicators */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3">
        {heroSections.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${activeSection === index
                ? 'bg-white h-8'
                : 'bg-white/30 hover:bg-white/60'
              }`}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>

      <div
        ref={containerRef}
        className="h-screen overflow-y-scroll scrollbar-hide smooth-scroll"
      >
        {heroSections.map((section, index) => {
          const isVideo = section.img.endsWith('.mp4');
          const isLastSection = index === heroSections.length - 1;

          return (
            <React.Fragment key={section.id}>
              <div
                ref={(el) => (sectionRefs.current[index] = el)}
                data-theme="dark"
                className="hero-section sticky top-0 h-screen w-full overflow-hidden cursor-pointer bg-black"
                style={{ zIndex: section.zIndex }}
                onClick={() => handleSectionClick(section.slug)}
              >
                <div className="absolute inset-0 w-full h-full">
                  {isVideo ? (
                    <>
                      {/* Thumbnail shows first (instant) */}
                      {section.thumbnail && (
                        <img
                          src={section.thumbnail}
                          alt={section.title}
                          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${videoReady ? 'opacity-0' : 'opacity-100'
                            }`}
                        />
                      )}

                      {/* Video loads and replaces thumbnail when ready */}
                      <video
                        ref={videoRef}
                        src={section.img}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className={`w-full h-full object-cover transition-opacity duration-500 ${videoReady ? 'opacity-100' : 'opacity-0'
                          }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    </>
                  ) : (
                    <>
                      {/* Images load immediately (no lazy loading) */}
                      {imagesCanLoad && (
                        <img
                          src={section.img}
                          alt={section.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    </>
                  )}
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 pb-24 text-center z-10">
                  <h2 className="text-white text-4xl md:text-5xl uppercase font-light mb-4 tracking-wider opacity-0 translate-y-8 transition-all duration-1000 delay-300 hero-title">
                    {section.title}
                  </h2>
                  <p className="text-white/70 text-lg md:text-xl font-light tracking-widest opacity-0 translate-y-8 transition-all duration-1000 delay-500 hero-location">
                    {section.location}
                  </p>
                </div>
              </div>

              {!isLastSection && <div className="h-64 md:h-128 bg-black"></div>}
            </React.Fragment>
          );
        })}

        <div data-theme="light" className="relative" style={{ zIndex: 70 }}>
          <Footer />
        </div>
      </div>

      <style>{`
        .hero-section.section-visible .hero-title,
        .hero-section.section-visible .hero-location {
          opacity: 1;
          transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-title,
          .hero-location {
            transition: none !important;
          }
          
          .scroll-smooth {
            scroll-behavior: auto;
          }
        }
      `}</style>
    </>
  );
}