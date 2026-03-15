import { useMemo } from 'react';
import { Project } from '../data/mockData';

type FilterCategory = 'All' | Project['category'];

export const CATEGORIES: FilterCategory[] = [
  'All', 'Residential', 'Housing', 'Commercial', 'Hospitality', 'Interior', 'Competition'
];

interface UsePortfolioFilterOptions {
  projects: Project[];
  filter: FilterCategory;
}

interface UsePortfolioFilterReturn {
  filteredProjects: Project[];
  projectsByCategory: Record<string, Project[]>;
}

export function usePortfolioFilter({
  projects,
  filter,
}: UsePortfolioFilterOptions): UsePortfolioFilterReturn {
  
  const filteredProjects = useMemo(() => {
    return filter === 'All'
      ? projects
      : projects.filter(project => project.category === filter);
  }, [projects, filter]);

  const projectsByCategory = useMemo(() => {
    return CATEGORIES.slice(1).reduce((acc, category) => {
      const categoryProjects = projects.filter(p => p.category === category);
      if (categoryProjects.length > 0) {
        acc[category] = categoryProjects;
      }
      return acc;
    }, {} as Record<string, Project[]>);
  }, [projects]);

  return {
    filteredProjects,
    projectsByCategory,
  };
}