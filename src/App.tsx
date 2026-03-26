import { BrowserRouter as Router, Routes, Route, useLocation, useParams } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProjectsDetails from './pages/ProjectsDetails';
import React from 'react';

const About = lazy(() => import('./pages/About'));
const Awards = lazy(() => import('./pages/Awards'));
const News = lazy(() => import('./pages/News'));
const NewsDetails = lazy(() => import('./pages/NewsDetails'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function ProjectsDetailsWithRemount() {
  const { id } = useParams<{ id: string }>();
  return <ProjectsDetails key={id} />;
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
            <Suspense fallback={<LoadingFallback />}>
              <About />
            </Suspense>
          } />

          <Route path="/awards" element={
            <Suspense fallback={<LoadingFallback />}>
              <Awards />
            </Suspense>
          } />

          <Route path="/news" element={
            <Suspense fallback={<LoadingFallback />}>
              <News />
            </Suspense>
          } />

          <Route path="/news/:slug" element={
            <Suspense fallback={<LoadingFallback />}>
              <NewsDetailsWithRemount />
            </Suspense>
          } />

          <Route path="/Projects" element={
            <Suspense fallback={<LoadingFallback />}>
              <Projects />
            </Suspense>
          } />

          <Route path="/Projects/:id" element={
            <ProjectsDetailsWithRemount />
          } />

          <Route path="/contact" element={
            <Suspense fallback={<LoadingFallback />}>
              <Contact />
            </Suspense>
          } />
        </Routes>

        {!isHomePage && <Footer />}
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;