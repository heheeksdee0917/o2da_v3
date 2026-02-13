import { Link } from 'react-router-dom';
import { Project } from '../data/mockData';
import LazyImage from './LazyImage';
import React from 'react';

interface ProjectCardProps {
  project: Project;
  batchLoad?: boolean;
  batchIndex?: number;
  shouldPreload?: boolean;
  onImageLoad?: () => void;
  isVisible?: boolean;
  isImageLoaded?: boolean;
}

export default function ProjectCard({
  project,
  batchLoad = true,
  batchIndex = 0,
  shouldPreload = false,
  onImageLoad,
  isVisible = true,
  isImageLoaded = true,
}: ProjectCardProps) {
  // Use coverPhoto if defined, otherwise fall back to first image
  const displayImage = project.coverPhoto || project.images[0];

  return (
    <Link
      to={`/portfolio/${project.slug}`}
      className={`group block transition-all duration-300 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
    >
      <div className="bg-white border border-transparent overflow-hidden transition-all duration-300 md:hover:scale-105 md:hover:-translate-y-2 md:hover:border-black/20 md:hover:shadow-lg">
        <div className="relative overflow-hidden aspect-video">
          <LazyImage
            src={displayImage}
            alt={project.title}
            className={`w-full h-full transition-opacity duration-300 ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            imgStyle={{
              objectPosition: project.imagePosition === 'top' ? 'top' :
                project.imagePosition === 'bottom' ? 'bottom' :
                  'center'
            }}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            batchLoad={batchLoad}
            batchIndex={batchIndex}
            loading={shouldPreload || batchIndex < 6 ? 'eager' : 'lazy'}
            onLoad={onImageLoad}
          />
          {/* Loading skeleton */}
          {!isImageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-100 via-neutral-50 to-neutral-100 animate-pulse" />
          )}
        </div>

        <div className="p-5 pl-0 md:p-6">
          <h3 className="text-2xl md:text-xl font-light mb-2 md:mb-3 relative inline-block uppercase">
            <span className="relative">
              {project.title}
              <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-black transition-all duration-500 md:group-hover:w-full" />
            </span>
          </h3>

          <p className="text-base md:text-sm font-light text-black/60 mb-1 md:mb-1">
            {project.location}
          </p>
          <p className="text-sm md:text-xs font-light text-black/40">
            {project.category}
          </p>
        </div>
      </div>
    </Link>
  );
}