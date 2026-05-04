import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import React from 'react';

export default function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOverDark, setIsOverDark] = useState(true);
  const navRef = useRef<HTMLElement>(null);
  const rafId = useRef<number>();

  const isActive = (path: string) => location.pathname === path;
  const isProjectsPage = location.pathname === '/portfolio' || location.pathname.startsWith('/portfolio/');

  const categories = ['Residential', 'Housing', 'Commercial', 'Hospitality', 'Interior', 'Competition'];

  const checkBackground = useCallback(() => {
    if (!navRef.current) return;
    const navRect = navRef.current.getBoundingClientRect();
    const sampleY = navRect.top + navRect.height / 2;
    const sampleX = 100;

    const elementsAtPoint = document.elementsFromPoint(sampleX, sampleY);

    for (const el of elementsAtPoint) {
      if (el === navRef.current || el.closest('nav')) continue;

      let current: Element | null = el;
      while (current) {
        const theme = current.getAttribute('data-theme');
        if (theme === 'dark') { setIsOverDark(true); return; }
        if (theme === 'light') { setIsOverDark(false); return; }
        current = current.parentElement;
      }
    }
  }, []);

  useEffect(() => {
    const run = () => {
      rafId.current = requestAnimationFrame(() => {
        rafId.current = requestAnimationFrame(checkBackground);
      });
    };
  
    // Run immediately
    run();
  
    // Also run after everything (fonts, images) has loaded
    window.addEventListener('load', run);
  
    // Also run after a short delay as final fallback
    const fallback = setTimeout(run, 500);
  
    const handleScroll = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(checkBackground);
    };
  
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', checkBackground);
  
    const scrollContainers = document.querySelectorAll<HTMLElement>(
      '.overflow-y-scroll, .overflow-y-auto, .overflow-scroll'
    );
    scrollContainers.forEach(el => el.addEventListener('scroll', handleScroll, { passive: true }));
  
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      clearTimeout(fallback);
      window.removeEventListener('load', run);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkBackground);
      scrollContainers.forEach(el => el.removeEventListener('scroll', handleScroll));
    };
  }, [location.pathname, checkBackground]);

  const textColor = isOverDark ? 'text-white' : 'text-black';
  const underlineColor = isOverDark ? 'bg-white' : 'bg-black';

  return (
    <>
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-30">
        <div className="transition-all duration-500 backdrop-blur-xl bg-white/10 border-b border-white/20">
          <div className="max-w-[2340px] mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-12">
              <Link to="/">
                <span
                  className={`text-xl font-medium transition-colors duration-300 ${textColor}`}
                  style={{ fontFamily: "'Gill Sans', system-ui, -apple-system, sans-serif" }}
                >
                  O<span className="lime-accent">2</span>DA + CPL<span className="hot-rod-accent">A</span>
                </span>
              </Link>

              <div className="hidden md:flex items-center space-x-8">
                <Link to="/" className={`caption transition-all duration-300 ${textColor} relative group/link`}>
                  Home
                  <span className={`absolute bottom-0 left-0 h-px transition-all duration-300 ease-out ${underlineColor} ${isActive('/') ? 'w-full' : 'w-0 group-hover/link:w-full'}`}></span>
                </Link>

                <Link to="/about" className={`caption transition-all duration-300 ${textColor} relative group/link`}>
                  About
                  <span className={`absolute bottom-0 left-0 h-px transition-all duration-300 ease-out ${underlineColor} ${isActive('/about') ? 'w-full' : 'w-0 group-hover/link:w-full'}`}></span>
                </Link>

                <div className="relative group/portfolio">
                  <Link to="/portfolio" className={`caption transition-all duration-300 ${textColor} relative group/link`}>
                    Portfolio
                    <span className={`absolute bottom-0 left-0 h-px transition-all duration-300 ease-out ${underlineColor} ${isProjectsPage ? 'w-full' : 'w-0 group-hover/link:w-full'}`}></span>
                  </Link>
                  <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover/portfolio:opacity-100 group-hover/portfolio:visible transition-all duration-300">
                    <div className="backdrop-blur-xl bg-white/95 shadow-lg rounded-lg py-2 min-w-[160px] border border-white/20">
                      {categories.map((category) => (
                        <Link
                          key={category}
                          to={`/portfolio?category=${category}`}
                          className="block px-4 py-2 text-sm text-black/70 hover:text-black hover:bg-black/5 transition-colors"
                        >
                          {category}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <Link to="/awards" className={`caption transition-all duration-300 ${textColor} relative group/link`}>
                  Awards
                  <span className={`absolute bottom-0 left-0 h-px transition-all duration-300 ease-out ${underlineColor} ${isActive('/awards') ? 'w-full' : 'w-0 group-hover/link:w-full'}`}></span>
                </Link>

                <Link to="/news" className={`caption transition-all duration-300 ${textColor} relative group/link`}>
                  News
                  <span className={`absolute bottom-0 left-0 h-px transition-all duration-300 ease-out ${underlineColor} ${isActive('/news') ? 'w-full' : 'w-0 group-hover/link:w-full'}`}></span>
                </Link>
              </div>
            </div>

            <Link
              to="/contact"
              className={`hidden md:block caption transition-all duration-300 ${textColor} relative group/link`}
            >
              Contact Us
              <span className={`absolute bottom-0 left-0 h-px transition-all duration-300 ease-out ${underlineColor} ${isActive('/contact') ? 'w-full' : 'w-0 group-hover/link:w-full'}`}></span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(prev => !prev)}
        className="md:hidden fixed bottom-6 left-4 px-3 py-2 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 backdrop-blur-xl bg-white/10 border border-white/20 z-[30]"
      >
        {isMobileMenuOpen ? (
          <>
            <X size={20} className="text-black" />
            <span className="text-sm font-medium text-black">Close</span>
          </>
        ) : (
          <Menu size={20} className={textColor} />
        )}
      </button>

      {/* Mobile Contact Button */}
      <Link
        to="/contact"
        onClick={() => setIsMobileMenuOpen(false)}
        className="md:hidden fixed bottom-6 right-4 z-[30] px-5 py-1.5 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 backdrop-blur-xl bg-white/10 border border-white/20"
      >
        <span className={`text-sm font-medium ${textColor}`}>Contact</span>
      </Link>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-white z-[20]"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="h-full w-full flex items-center justify-center px-8"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="space-y-8 text-center">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={`block text-2xl ${isActive('/') ? 'text-black font-medium' : 'text-black/70 hover:text-black'}`}>
                Home
              </Link>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className={`block text-2xl ${isActive('/about') ? 'text-black font-medium' : 'text-black/70 hover:text-black'}`}>
                About
              </Link>
              <div>
                <Link to="/portfolio" onClick={() => setIsMobileMenuOpen(false)} className={`block text-2xl ${isProjectsPage ? 'text-black font-medium' : 'text-black/70 hover:text-black'}`}>
                  Projects
                </Link>
                <div className="mt-4 space-y-3">
                  {categories.map((cat) => (
                    <Link
                      key={cat}
                      to={`/portfolio?category=${cat}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-base text-black/60 hover:text-black"
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>
              <Link to="/awards" onClick={() => setIsMobileMenuOpen(false)} className={`block text-2xl ${isActive('/awards') ? 'text-black font-medium' : 'text-black/70 hover:text-black'}`}>
                Awards
              </Link>
              <Link to="/news" onClick={() => setIsMobileMenuOpen(false)} className={`block text-2xl ${isActive('/news') ? 'text-black font-medium' : 'text-black/70 hover:text-black'}`}>
                News
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}