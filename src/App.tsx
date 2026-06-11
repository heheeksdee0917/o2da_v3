// src/App.tsx
import { BrowserRouter as Router, Routes, Route, useLocation, useParams } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import PortfolioDetails from './pages/PortfolioDetails';
import React from 'react';
import keystatic from '../keystatic.config';

// ── Keystatic ──────────────────────────────────────────────────────────────
const isKeystatic = window.location.pathname.startsWith('/keystatic');

const KeystaticApp = lazy(() =>
  import('@keystatic/core/ui').then((mod) => ({ default: mod.KeystaticApp }))
);

// ── Lazy pages ─────────────────────────────────────────────────────────────
const NotFound  = lazy(() => import('./pages/NotFound'));
const About     = lazy(() => import('./pages/About'));
const Awards    = lazy(() => import('./pages/Awards'));
const News      = lazy(() => import('./pages/News'));
const NewsDetails    = lazy(() => import('./pages/NewsDetails'));
const Portfolio      = lazy(() => import('./pages/Portfolio'));
const Contact        = lazy(() => import('./pages/Contact'));

// ── Helpers ────────────────────────────────────────────────────────────────
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function PortfolioDetailsWithRemount() {
  const { id } = useParams<{ id: string }>();
  return <PortfolioDetails key={id} />;
}

function NewsDetailsWithRemount() {
  const { slug } = useParams<{ slug: string }>();
  return <NewsDetails key={slug} />;
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="relative flex items-center justify-center w-16 h-16">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-lime-400/20 animate-ping" />
        </div>
        <span className="relative z-10 text-xs font-medium text-neutral-600">Loading</span>
      </div>
    </div>
  );
}

// ── Main app content ───────────────────────────────────────────────────────
function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <div className={isHomePage ? '' : 'min-h-screen smooth-scroll'}>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/about" element={
            <Suspense fallback={<LoadingFallback />}><About /></Suspense>
          } />

          <Route path="/awards" element={
            <Suspense fallback={<LoadingFallback />}><Awards /></Suspense>
          } />

          <Route path="/news" element={
            <Suspense fallback={<LoadingFallback />}><News /></Suspense>
          } />

          <Route path="/news/:slug" element={
            <Suspense fallback={<LoadingFallback />}><NewsDetailsWithRemount /></Suspense>
          } />

          <Route path="/portfolio" element={
            <Suspense fallback={<LoadingFallback />}><Portfolio /></Suspense>
          } />

          <Route path="/portfolio/:id" element={<PortfolioDetailsWithRemount />} />

          <Route path="/contact" element={
            <Suspense fallback={<LoadingFallback />}><Contact /></Suspense>
          } />

          <Route path="*" element={<NotFound />} />
        </Routes>

        {!isHomePage && <Footer />}
      </div>
    </>
  );
}

// ── Root ───────────────────────────────────────────────────────────────────
function App() {
  // Render Keystatic outside of your Router so its internal
  // routing doesn't conflict with React Router
  if (isKeystatic) {
    return (
      <Suspense fallback={<LoadingFallback />}>
        <KeystaticApp config={keystatic} />
      </Suspense>
    );
  }

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;