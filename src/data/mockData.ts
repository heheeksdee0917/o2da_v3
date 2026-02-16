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
    project: 'UNO RIVERTTREE',
    place: 'HON. MENTION (COLLABORATION)',
    type: 'award',
    slug: 'uno-rivertree-bukit-raja'
  },
  {
    id: 2,
    year: 2023,
    competition: 'Design Competition',
    project: 'UNO SG. MERAB',
    place: '3rd Prize',
    type: 'award',
    slug: 'uno-sg-merab'  // not in current portfolio yet
  },
  {
    id: 3,
    year: 2022,
    competition: 'PAM Awards',
    project: 'Garisan @ Puchong',
    place: 'Sulver (Multiple Residential Low Rise)',
    type: 'award',
    slug: 'garisan'
  },
  {
    id: 4,
    year: 2021,
    competition: 'ASIA PACIFIC PROPERTY AWARDS (Best Residential Development Malaysia)',
    project: 'Garisan @ Puchong',
    place: '5 Star Winner',
    type: 'award',
    slug: 'garisan'
  },
  {
    id: 5,
    year: 2021,
    competition: 'ASIA PACIFIC PROPERTY AWARDS (Best Architecture Multiple Residence Malaysia)',
    project: 'Garisan @ Puchong',
    place: '5 Star Winner',
    type: 'award',
    slug: 'garisan'
  },
  {
    id: 6,
    year: 2021,
    competition: 'ASIA PACIFIC PROPERTY AWARDS (Retail Development Malaysia)',
    project: 'UNO 1 @ BUKIT RAJA',
    place: 'Award Winner',
    type: 'award',
    slug: 'uno-rivertree-bukit-raja'
  },
  {
    id: 7,
    year: 2021,
    competition: 'ASIA PACIFIC PROPERTY AWARDS (Best Development Marketing Malaysia)',
    project: 'UNO 1 @ BUKIT RAJA',
    place: '5 Star Winner',
    type: 'award',
    slug: 'uno-rivertree-bukit-raja'
  },
  {
    id: 8,
    year: 2021,
    competition: 'ASIA PACIFIC PROPERTY AWARDS (Best Leisure Interior Malaysia)',
    project: 'UNO 1 @ BUKIT RAJA',
    place: '5 Star Winner',
    type: 'award',
    slug: 'uno-rivertree-bukit-raja'
  },
  {
    id: 9,
    year: 2020,
    competition: 'Property Guru Asia Property Awards (Best Retail Development)',
    project: 'UNO 1 @ BUKIT RAJA',
    place: 'Winner',
    type: 'award',
    slug: 'uno-rivertree-bukit-raja'
  },
  {
    id: 10,
    year: 2019,
    competition: 'ArchDaily Building of the Year',
    project: '3 COURTYARD HOUSE @ BANDAR SRI DAMANSARA',
    place: 'Nominated',
    type: 'award',
    slug: '3-courtyard-house'
  },
  {
    id: 11,
    year: 2019,
    competition: 'European Iconic Award',
    project: '3 COURTYARD HOUSE @ BANDAR SRI DAMANSARA',
    place: 'Winner',
    type: 'award',
    slug: '3-courtyard-house'
  },
  {
    id: 12,
    year: 2018,
    competition: 'International Architecture Review Future Project Awards',
    project: 'ECO-VILLAGE ORPHANAGE CENTRE @ KENYA',
    place: 'COMMENDATION',
    type: 'award',
    slug: 'kenyas-orphanage'
  },
  {
    id: 13,
    year: 2017,
    competition: 'World Architecture Festival Award',
    project: 'ECO-VILLAGE ORPHANAGE CENTRE @ KENYA',
    place: 'Comendation',
    type: 'award',
    slug: 'kenyas-orphanage'
  },
  {
    id: 14,
    year: 2017,
    competition: 'World Architecture Festival Award',
    project: 'COURTYARD HOUSE @ SUNGAI BULOH',
    place: 'Finalist',
    type: 'award',
    slug: 'courtyard-house'
  },
  {
    id: 15,
    year: 2017,
    competition: 'Malaysia MIID REKA Award',
    project: 'COURTYARD HOUSE @ SUNGAI BULOH',
    place: 'Shortlisted',
    type: 'award',
    slug: 'courtyard-house'
  },
  {
    id: 16,
    year: 2017,
    competition: 'Designer of the Year Award',
    project: 'COURTYARD HOUSE @ SUNGAI BULOH',
    place: 'Winner',
    type: 'award',
    slug: 'courtyard-house'
  },
  {
    id: 17,
    year: 2017,
    competition: 'Malaysia MIID REKA Award',
    project: '3 COURTYARD HOUSE @ BANDAR SRI DAMANSARA',
    place: 'Shortlisted',
    type: 'award',
    slug: '3-courtyard-house'
  },
  {
    id: 18,
    year: 2015,
    competition: 'PAM-HOMEDEC Award',
    project: 'COURTYARD HOUSE@ SUNGAI BULOH',
    place: 'Silver',
    type: 'award',
    slug: 'courtyard-house'
  },
  {
    id: 19,
    year: 2017,
    competition: 'International Competition',
    project: 'ECO-VILLAGE ORPHANAGE CENTRE @ KENYA',
    place: '1st Prize',
    type: 'competition',
    slug: 'kenyas-orphanage'
  },
  {
    id: 20,
    year: 2017,
    competition: 'International Competition',
    project: 'FUTURE HOUSE @ MICRO HOUSE',
    place: '1st Prize',
    type: 'competition',
    slug: 'future-house'
  },
  {
    id: 21,
    year: 2016,
    competition: 'International Competition',
    project: 'GO-BEYOND GET REAL - CONTAINER ',
    place: '1st Prize',
    type: 'competition',
    slug: 'go-beyond'
  },
  {
    id: 22,
    year: 2016,
    competition: 'National Competition',
    project: 'PAM MGBC CENTRE',
    place: 'Honorable Mention',
    type: 'competition',
    slug: 'mgbc-hq'
  },
  {
    id: 23,
    year: 2016,
    competition: 'National Competition',
    project: 'PAM NORTHERN CHAPTER - WET MARKET',
    place: '2nd Prize',
    type: 'competition',
    slug: 'teluk-kumbar-market'
  },
  {
    id: 24,
    year: 2015,
    competition: 'International Competition',
    project: 'PAM PR1MA HOUSING',
    place: '1st Prize',
    type: 'competition',
    slug: 'pr1ma-housing'
  },
  {
    id: 25,
    year: 2015,
    competition: 'National Competition',
    project: 'PAM KWASA LAND HOUSING',
    place: '2nd Prize',
    type: 'competition',
    slug: ''
  },
  {
    id: 26,
    year: 2015,
    competition: 'National Competition',
    project: 'PAM HOMELESS SHELTER',
    place: 'Honorable Mention',
    type: 'competition',
    slug: ''
  },
  {
    id: 27,
    year: 2024,
    competition: 'Malaysia Fiabsi Award heritage & Office Category',
    project: 'Sentul Works',
    place: 'Winner',
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
];