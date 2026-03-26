import { Instagram, Linkedin, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';
import React from 'react';

export default function Footer() {
  return (
    <footer id="footer" className="bg-white text-black min-h-screen flex items-center justify-center">
      <div className="max-w-[2340px] mx-auto px-4 md:px-8 w-full py-20">
        {/* Logo and Tagline */}
        <div className="mb-16">
          <h3 className="text-4xl lg:text-5xl font-medium mb-6" style={{ fontFamily: "'Gill Sans', system-ui, -apple-system, sans-serif" }}>
            O<span className="lime-accent">2</span>DA + CPL<span className="hot-rod-accent">A</span>
          </h3>
          <p className="text-black/80 text-xl leading-relaxed max-w-md">
            Architecture of Form and Pattern languages
          </p>
        </div>

        {/* 3 Column Layout: Follow, Contact, Studio */}
        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          {/* Follow - LEFT */}
          <div>
            <h4 className="caption text-black/50 mb-6">Follow</h4>
            <div className="flex space-x-6">
              <a
                href="https://www.facebook.com/o2DesignAtelier"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black/70 hover:text-black transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook size={20} strokeWidth={1.5} />
              </a>
              <a
                href="https://www.instagram.com/o2designatelier/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black/70 hover:text-black transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} strokeWidth={1.5} />
              </a>
              <a
                href="https://www.linkedin.com/company/o2da-cpla"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black/70 hover:text-black transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Contact - CENTER */}
          <div>
            <h4 className="caption text-black/50 mb-6">Contact</h4>
            <a
              href="mailto:info@o2dacpla.com"
              className="text-base text-black hover:text-black/60 transition-colors duration-300 block"
            >
              info@o2dacpla.com
            </a>
          </div>

          {/* Studio - RIGHT */}
          <div>
            <h4 className="caption text-black/50 mb-4">Studio</h4>
            <address className="text-black/70 not-italic leading-relaxed mb-6">
              <a
                href="https://maps.app.goo.gl/1HV7esYH66uMrwQr5"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-black hover:text-black/60 transition-colors duration-300 block"
              >
                9-1 Block A, Zenith Corporate Park<br />
                Jalan SS7/26<br />
                47301 Petaling Jaya, Selangor
              </a>
            </address>
          </div>
        </div>

        {/* Bottom - Quick Links & Copyright */}
        <div className="border-t border-black/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <nav className="flex flex-wrap justify-start gap-6 md:gap-8">
              <Link to="/" className="text-sm text-black/70 hover:text-black transition-colors duration-300">
                Home
              </Link>
              <Link to="/about" className="text-sm text-black/70 hover:text-black transition-colors duration-300">
                About
              </Link>
              <Link to="/projects" className="text-sm text-black/70 hover:text-black transition-colors duration-300">
                Projects
              </Link>
              <Link to="/awards" className="text-sm text-black/70 hover:text-black transition-colors duration-300">
                Awards
              </Link>
              <Link to="/news" className="text-sm text-black/70 hover:text-black transition-colors duration-300">
                News
              </Link>
            </nav>
            <p className="text-black/40 text-sm">
              © 2026 O2DA + CPLA. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}