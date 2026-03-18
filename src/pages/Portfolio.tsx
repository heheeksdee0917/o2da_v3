import { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { projects, Project } from '../data/mockData';
import React from 'react';
import { useInfiniteScroll } from '../components/ScrollLoad';
import { usePortfolioFilter, CATEGORIES } from '../components/usePortfolioFilter';
import ProjectCard from '../components/ProjectCard';

type FilterCategory = 'All' | Project['category'];

export default function Portfolio() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isAnimating, setIsAnimating] = useState(false);
  const animationTimer = useRef<number | null>(null);

  // Read filter from URL, default to 'All'
  const categoryParam = searchParams.get('category') as FilterCategory | null;
  const filter: FilterCategory = categoryParam && CATEGORIES.includes(categoryParam as FilterCategory)
    ? categoryParam
    : 'All';

  const { filteredProjects, projectsByCategory } = usePortfolioFilter({ projects, filter });

  const {
    displayedItems: displayedProjects,
    isLoading,
    hasMore,
    observerTarget,
  } = useInfiniteScroll({
    items: filteredProjects,
    initialLoad: 6,
    loadMoreCount: 6,
    enabled: filter !== 'All',
  });

  const handleFilterChange = useCallback((category: FilterCategory) => {
    if (category === filter) return;

    // Fade out → update URL → fade in
    setIsAnimating(true);
    if (animationTimer.current) clearTimeout(animationTimer.current);
    animationTimer.current = window.setTimeout(() => {
      setIsAnimating(false);
    }, 300);

    if (category === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  }, [filter, setSearchParams]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (animationTimer.current) clearTimeout(animationTimer.current);
    };
  }, []);

  // Scroll to top when filter changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [filter]);

  return (
    <div data-theme="light" className="pt-24 bg-white animate-fade-in">
      <div className="max-w-[2340px] mx-auto px-4 md:px-8 py-4">

        {/* Filter Tabs */}
        <nav className="flex justify-start md:justify-center items-center gap-4 md:gap-8 mb-20 overflow-x-auto scrollbar-hide px-4 -mx-4">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => handleFilterChange(category)}
              className={`caption transition-all duration-300 pb-1 whitespace-nowrap ${
                filter === category
                  ? 'text-black border-b border-black'
                  : 'text-black/40 hover:text-black'
              }`}
              aria-label={`Filter by ${category}`}
              aria-current={filter === category ? 'page' : undefined}
            >
              {category}
            </button>
          ))}
        </nav>

        {/* Project Grid */}
        <div
          key={filter}
          className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
        >
          {filter === 'All' ? (
            // All view — grouped by category
            Object.entries(projectsByCategory).map(([category, categoryProjects]) => (
              <div key={category} className="mb-20">
                <h2 className="text-3xl md:text-4xl font-light mb-8 uppercase tracking-wide text-black/80">
                  {category}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-4">
                  {categoryProjects.map((project, projectIndex) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      batchLoad={true}
                      batchIndex={projectIndex}
                      priority={projectIndex < 3}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            // Single category view with infinite scroll
            <>
              <h2 className="text-3xl md:text-4xl font-light mb-8 uppercase tracking-wide text-black/80">
                {filter}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-4">
                {displayedProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    batchLoad={true}
                    batchIndex={index}
                    priority={index < 3}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Loading indicator */}
        {isLoading && filter !== 'All' && (
          <div className="flex justify-center items-center py-8 mt-8">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-black/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-black/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-black/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        {/* Infinite scroll target */}
        {filter !== 'All' && <div ref={observerTarget} className="h-4" />}

        {/* End message */}
        {!hasMore && filteredProjects.length > 0 && filter !== 'All' && (
          <div className="text-center py-12">
            <p className="caption text-black/40">You've reached the end</p>
          </div>
        )}

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-32">
            <p className="text-black/40">No projects found in this category.</p>
          </div>
        )}

      </div>
    </div>
  );
}