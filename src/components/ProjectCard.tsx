import { Link } from 'react-router-dom';
import { Project } from '../data/mockData';
import LazyImage from './LazyImage';
import React from 'react';

interface ProjectCardProps {
  project: Project;
  batchLoad?: boolean;
  priority?: boolean; 
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
  priority = false,
  onImageLoad,
  isVisible = true,
  isImageLoaded = true,
}: ProjectCardProps) {
  // Use coverPhoto if defined, otherwise fall back to first image
  const displayImage = project.coverPhoto || project.images[0];

  return (
    <Link
      to={`/projects/${project.slug}`}
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
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            batchLoad={batchLoad}
            batchIndex={batchIndex}
            priority={priority}
            loading={shouldPreload || batchIndex < 6 ? 'eager' : 'lazy'}
            onLoad={onImageLoad}
          />
          {/* Loading skeleton */}
          {!isImageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-100 via-neutral-50 to-neutral-100 animate-pulse" />
          )}
        </div>

        <div className="p-5 pl-0 md:p-6">
          <h3 className="text-2xl md:text-xl font-light mb-2 md:mb-3 uppercase inline">
            <span className="bg-gradient-to-r from-black to-black bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 md:group-hover:bg-[length:100%_1px] pb-0.5">
              {project.title}
            </span>
          </h3>

          <p className="text-base md:text-sm font-light text-black/60 mb-1 md:mb-1">
            {project.location}
          </p>
        </div>
      </div>
    </Link>
  );
}