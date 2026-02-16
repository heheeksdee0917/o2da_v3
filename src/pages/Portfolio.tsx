import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { projects, Project } from '../data/mockData';
import React from 'react';
import { useInfiniteScroll } from '../components/ScrollLoad';
import { usePortfolioFilter, CATEGORIES } from '../components/usePortfolioFilter';
import { useCardPreload } from '../hooks/useCardPreload';
import ProjectCard from '../components/ProjectCard';

type FilterCategory = 'All' | Project['category'];

export default function Portfolio() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isAnimating, setIsAnimating] = useState(false);
  const [filterVersion, setFilterVersion] = useState(0);

  // Read filter from URL, default to 'All'
  const categoryParam = searchParams.get('category') as FilterCategory | null;
  const filter: FilterCategory = categoryParam && CATEGORIES.includes(categoryParam as FilterCategory)
    ? categoryParam
    : 'All';

  // Use portfolio filter hook
  const { filteredProjects, projectsByCategory } = usePortfolioFilter({
    projects,
    filter,
  });

  // Use infinite scroll hook (only enabled for non-"All" views)
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

  // Use card preload hook (only for single category views with infinite scroll)
  const {
    getCardRef,
    handleImageLoad,
    isCardVisible,
    isImageLoaded,
    shouldPreload,
  } = useCardPreload({
    itemCount: displayedProjects.length,
    preloadCount: 3,
    rootMargin: '200px',
    enabled: filter !== 'All',
  });

  const handleFilterChange = useCallback((category: FilterCategory) => {
    if (category === filter) return;
    
    setFilterVersion(prev => prev + 1);
    setIsAnimating(true);
    
    // Update URL with new category
    if (category === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
    
    requestAnimationFrame(() => {
      setTimeout(() => {
        requestAnimationFrame(() => {
          setTimeout(() => setIsAnimating(false), 50);
        });
      }, 150);
    });
  }, [filter, setSearchParams]);

  // Scroll to top when filter changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [filter]);

  return (
    <div data-theme="light" className="pt-24 bg-white grid-background animate-fade-in">
      <div className="max-w-[1800px] mx-auto px-12 py-4">
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

        {/* Project Grid - "All" view with category sections */}
        {filter === 'All' ? (
          <div 
            key={filterVersion}
            className={`transition-opacity duration-300 ${
              isAnimating ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {Object.entries(projectsByCategory).map(([category, categoryProjects]) => (
              <div key={category} className="mb-20">
                {/* Category Title */}
                <h2 className="text-3xl md:text-4xl font-light mb-8 uppercase tracking-wide text-black/80">
                  {category}
                </h2>
                
                {/* Category Grid - Simple rendering without preload */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-8">
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
            ))}
          </div>
        ) : (
          /* Single Category View with infinite scroll and preload */
          <div 
            key={filterVersion}
            className={`transition-opacity duration-300 ${
              isAnimating ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {/* Category Title */}
            <h2 className="text-3xl md:text-4xl font-light mb-8 uppercase tracking-wide text-black/80">
              {filter}
            </h2>
            
            {/* Grid with preload */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-8">
              {displayedProjects.map((project, index) => (
                <div 
                  key={project.id}
                  ref={getCardRef(index)}
                >
                  <ProjectCard 
                    project={project}
                    batchLoad={true}
                    batchIndex={index}
                    priority={index < 3}
                    shouldPreload={shouldPreload(index)}
                    onImageLoad={() => handleImageLoad(index)}
                    isVisible={isCardVisible(index)}
                    isImageLoaded={isImageLoaded(index)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Loading Indicator */}
        {isLoading && filter !== 'All' && (
          <div className="flex justify-center items-center py-8 mt-8">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-black/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-black/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-black/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}

        {/* Observer target for infinite scroll */}
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