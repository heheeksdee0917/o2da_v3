import { residentialProjects } from './residential';
import { commercialProjects } from './commercial';
import { housingProjects } from './housing';
import { interiorProjects } from './interior';
import { competitionProjects } from './competition';
import { hospitalityProjects } from './hospitality';
import { teamMembers } from './teammember';

export const projects = [
  ...residentialProjects,
  ...housingProjects,
  ...commercialProjects,
  ...hospitalityProjects,
  ...interiorProjects,
  ...competitionProjects,

];

// Export individual categories if needed
export { 
  residentialProjects,
  housingProjects,  
  commercialProjects,
  hospitalityProjects , 
  interiorProjects, 
  competitionProjects
};

export{
  teamMembers,
}

interface ContentBlock {
  type: 'text' | 'image';
  content?: string | string[]; 
  heading?: string;
  imageSrc?: string;
  imageAlt?: string;
  inlineLinks?: {
    text: string; 
    url: string;  
  }[];
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  location: string;
  category: 'Residential' | 'Commercial' | 'Housing' | 'Interior' | 'Competition'| 'Hospitality';
  images: string[];
  coverPhoto?: string;
  hero?: boolean;
  detailContent?: ContentBlock[];
  status?: string;
  projectTeam?: string[];
  accolades?: string[]; 
}

interface Award {
  id: number;
  year: number;
  competition: string;
  project: string;
  place: string;
  type: 'award' | 'competition';
  slug: string;
}

export const awards: Award[] = [
  {
    id: 1,
    year: 2023,
    competition: 'PAM Awards',
    project: 'Uno Rivertree',
    place: 'Hon. Mention (COLLABORATION)',
    type: 'award',
    slug: 'uno-rivertree-bukit-raja'
  },
  {
    id: 2,
    year: 2023,
    competition: 'Design Competition',
    project: 'Uno Sg. Merab',
    place: '3rd Prize',
    type: 'competition',
    slug: 'uno-sg-merab' 
  },
  {
    id: 3,
    year: 2022,
    competition: 'PAM Awards',
    project: 'Garisan',
    place: 'Silver (Multiple Residential Low Rise)',
    type: 'award',
    slug: 'garisan'
  },
  {
    id: 4,
    year: 2021,
    competition: 'Asia Pacific Property Awards (Best Residential Development Malaysia)',
    project: 'Garisan',
    place: '5 Star Winner',
    type: 'award',
    slug: 'garisan'
  },
  {
    id: 5,
    year: 2021,
    competition: 'Asia Pacific Property Awards (Best Architecture Multiple Residence Malaysia)',
    project: 'Garisan',
    place: '5 Star Winner',
    type: 'award',
    slug: 'garisan'
  },
  {
    id: 6,
    year: 2021,
    competition: 'Asia Pacific Property Awards (Retail Development Malaysia)',
    project: 'UNO Rivertree Signature',
    place: 'Award Winner',
    type: 'award',
    slug: 'uno-rivertree-bukit-raja'
  },
  {
    id: 7,
    year: 2021,
    competition: 'Asia Pacific Property Awards (Best Development Marketing Malaysia)',
    project: 'UNO Rivertree Signature',
    place: '5 Star Winner',
    type: 'award',
    slug: 'uno-rivertree-bukit-raja'
  },
  {
    id: 8,
    year: 2021,
    competition: 'Asia Pacific Property Awards (Best Leisure Interior Malaysia)',
    project: 'UNO Rivertree Signature',
    place: '5 Star Winner',
    type: 'award',
    slug: 'uno-rivertree-bukit-raja'
  },
  {
    id: 9,
    year: 2020,
    competition: 'Property Guru Asia Property Awards (Best Retail Development)',
    project: 'UNO Rivertree Signature',
    place: 'Winner',
    type: 'award',
    slug: 'uno-rivertree-bukit-raja'
  },
  {
    id: 10,
    year: 2019,
    competition: 'ArchDaily Building of the Year',
    project: '3 Courtyard House',
    place: 'Nominated',
    type: 'award',
    slug: '3-courtyard-house'
  },
  {
    id: 11,
    year: 2019,
    competition: 'European Iconic Award',
    project: '3 Courtyard House',
    place: 'Winner',
    type: 'award',
    slug: '3-courtyard-house'
  },
  {
    id: 12,
    year: 2018,
    competition: 'International Architecture Review Future Project Awards',
    project: 'Kenya‘s Orphanage',
    place: 'COMMENDATION',
    type: 'award',
    slug: 'kenyas-orphanage'
  },
  {
    id: 13,
    year: 2017,
    competition: 'World Architecture Festival Award',
    project: 'Kenya‘s Orphanage',
    place: 'Comendation',
    type: 'award',
    slug: 'kenyas-orphanage'
  },
  {
    id: 14,
    year: 2017,
    competition: 'World Architecture Festival Award',
    project: 'Courtyard House',
    place: 'Finalist',
    type: 'award',
    slug: 'courtyard-house'
  },
  {
    id: 15,
    year: 2017,
    competition: 'Malaysia MIID REKA Award',
    project: 'Courtyard House',
    place: 'Shortlisted',
    type: 'award',
    slug: 'courtyard-house'
  },
  {
    id: 16,
    year: 2017,
    competition: 'Designer of the Year Award',
    project: 'Courtyard House',
    place: 'Winner',
    type: 'award',
    slug: 'courtyard-house'
  },
  {
    id: 17,
    year: 2017,
    competition: 'Malaysia MIID REKA Award',
    project: '3 Courtyard House',
    place: 'Shortlisted',
    type: 'award',
    slug: '3-courtyard-house'
  },
  {
    id: 18,
    year: 2015,
    competition: 'PAM-Homedec Award',
    project: 'Courtyard House',
    place: 'Silver',
    type: 'award',
    slug: 'courtyard-house'
  },
  {
    id: 19,
    year: 2017,
    competition: 'Kenyan ecovillage design competition',
    project: 'Kenya‘s Orphanage',
    place: '1st Prize',
    type: 'competition',
    slug: 'kenyas-orphanage'
  },
  {
    id: 20,
    year: 2017,
    competition: 'International Competition',
    project: 'Future House',
    place: '1st Prize',
    type: 'competition',
    slug: 'future-house'
  },
  {
    id: 21,
    year: 2016,
    competition: 'International Competition',
    project: 'Go Beyond',
    place: '1st Prize',
    type: 'competition',
    slug: 'go-beyond'
  },
  {
    id: 22,
    year: 2016,
    competition: 'National Competition',
    project: 'MGBC HQ',
    place: 'Honorable Mention',
    type: 'competition',
    slug: 'mgbc-hq'
  },
  {
    id: 23,
    year: 2016,
    competition: 'National Competition',
    project: 'Teluk Kumbar Market',
    place: '2nd Prize',
    type: 'competition',
    slug: 'teluk-kumbar-wet-market'
  },
  {
    id: 24,
    year: 2015,
    competition: 'International Competition',
    project: 'PR1MA Affordable Housing',
    place: '1st Prize',
    type: 'competition',
    slug: 'pr1ma-affordable-housing'
  },
  {
    id: 25,
    year: 2015,
    competition: 'National Competition',
    project: 'Imbauan Residence',
    place: '2nd Prize',
    type: 'competition',
    slug: 'imbauan-residence'
  },
  {
    id: 26,
    year: 2015,
    competition: 'National Competition',
    project: 'PAM Homeless Shelter',
    place: 'Honorable Mention',
    type: 'competition',
    slug: ''
  },
  {
    id: 27,
    year: 2024,
    competition: 'International Fiabci Award',
    project: 'Sentul Works',
    place: 'Silver Award',
    type: 'award',
    slug: 'sentul-works'
  },
  {
    id: 28,
    year: 2022,
    competition: 'World Architecture Festival Award 2022',
    project: 'Sentul Works',
    place: 'Finalist',
    type: 'award',
    slug: 'sentul-works'
  },
  {
    id: 29,
    year: 2016,
    competition: 'International Competition',
    project: 'Go Beyond',
    place: '1st Prize',
    type: 'competition',
    slug: 'go-beyond'
  },
  {
    id: 30,
    year: 2024,
    competition: 'Malaysia Fiabci Award Heritage & Office Category',
    project: 'Sentul Works',
    place: 'Winner',
    type: 'award',
    slug: 'sentul-works'
  },
  {
    id: 31,
    year: 2025,
    competition: 'Guang Zhou Ideal architecture festival Awards',
    project: 'Sentul Works',
    place: 'The best prize - Office (Built)',
    type: 'award',
    slug: 'sentul-works'
  },
];
