import { useNavigate } from 'react-router-dom';
import { heroSections } from '../data/heroData';
import Footer from '../components/Footer';
import React, { useState, useEffect, useRef } from 'react';

export default function HeroSection() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleSectionClick = (slug: string) => {
    navigate(`/portfolio/${slug}`);
  };

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

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-visible');
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
      {/* Section Navigation Indicators */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3">
        {heroSections.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              activeSection === index ? 'bg-white h-8' : 'bg-white/30 hover:bg-white/60'
            }`}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>

      <div
        ref={containerRef}
        className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth"
      >
        {heroSections.map((section, index) => (
          <div
            key={section.id}
            ref={(el) => (sectionRefs.current[index] = el)}
            data-theme="dark"
            className="relative h-screen w-full overflow-hidden cursor-pointer snap-start snap-always bg-black"
            onClick={() => handleSectionClick(section.slug)}
          >
            <div className="absolute inset-0 w-full h-full">
              {section.img.endsWith('.mp4') ? (
                <>
                  {/* Thumbnail loads instantly — video fades over it once ready */}
                  {section.thumbnail && (
                    <img
                      src={section.thumbnail}
                      alt={section.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  <video
                    src={section.img}
                    poster={section.thumbnail}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </>
              ) : (
                <img
                  src={section.img}
                  alt={section.title}
                  className="w-full h-full object-cover zoom-reset"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 pb-24 text-center z-10">
              <h2 className="text-white text-4xl md:text-5xl uppercase font-light mb-4 tracking-wider">
                {section.title}
              </h2>
              <p className="text-white/70 text-lg md:text-1xl font-light tracking-widest">
                {section.location}
              </p>
            </div>
          </div>
        ))}

        <div data-theme="light" className="snap-start snap-always">
          <Footer />
        </div>
      </div>

      <style>{`
        @keyframes zoom-cycle {
          0% { transform: scale(1); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }

        .section-visible .zoom-reset {
          animation: zoom-cycle 20s ease-in-out forwards;
        }

        .overflow-y-scroll::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }

        @media (prefers-reduced-motion: reduce) {
          img, video {
            transition: none !important;
            animation: none !important;
          }
          .scroll-smooth {
            scroll-behavior: auto;
          }
        }
      `}</style>
    </>
  );
}