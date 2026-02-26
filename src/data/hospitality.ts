import { getOptimizedImage } from '../utils/cloudinary';
import type { Project } from './mockData';

export const hospitalityProjects: Project[] = [

  // Bukit Emas VIlla
  {
    id: 1,
    slug: 'bukit-emas-villa',
    title: 'Bukit Emas Villa',
    location: 'Langkawi, Kedah',
    category: 'Hospitality',
    status: 'Proposal',
    projectTeam: ['Edric Choo Poo Liang', 'Lim Min Syn'],
    images: [
      '/Gallery/Hospitality/BukitEmas/CP.avif',
      '/Gallery/Hospitality/BukitEmas/A1.avif',
      '/Gallery/Hospitality/BukitEmas/A2.avif',
      '/Gallery/Hospitality/BukitEmas/A3.avif',
      '/Gallery/Hospitality/BukitEmas/A4.avif',
      '/Gallery/Hospitality/BukitEmas/A5.avif',
    ],
    detailContent: [
      {
        type: 'text',
        content: '16 private individual villas and 4 private family villas are proposed on a 4.6 acre land. The land is located at the foothill near to the southern tip of Langkawi Island overlooking the Strait of Malacca.'
      },
      {
        type: 'text',
        content: 'The 20 units of villas are arranged in upward tiers where every unit has the luxury of view towards the sea.'
      },
    ],
  },

  // Retreat Ulu Yam
  {
    id: 2,
    slug: 'Retreat',
    title: 'Ulu Yam Retreat Homestay',
    location: 'Ulu Yam, Selangor',
    category: 'Hospitality',
    status: 'Proposal',
    projectTeam: ['Edric Choo Poo Liang', 'Ng Yi Meng', 'Khor Jia Xin','Lim Min Syn'],
    images: [
      '/Gallery/Hospitality/Retreat/CP.avif',
      '/Gallery/Hospitality/Retreat/A1.avif',
      '/Gallery/Hospitality/Retreat/A2.avif',
      '/Gallery/Hospitality/Retreat/A3.avif',
      '/Gallery/Hospitality/Retreat/A4.avif',
      '/Gallery/Hospitality/Retreat/A5.avif',
      '/Gallery/Hospitality/Retreat/A6.avif',
      '/Gallery/Hospitality/Retreat/A7.avif',
      '/Gallery/Hospitality/Retreat/A8.avif',
      '/Gallery/Hospitality/Retreat/A9.avif',
      '/Gallery/Hospitality/Retreat/A10.avif',
      '/Gallery/Hospitality/Retreat/A11.avif',
      '/Gallery/Hospitality/Retreat/A12.avif',
      '/Gallery/Hospitality/Retreat/A13.avif',
      '/Gallery/Hospitality/Retreat/A14.avif',
      '/Gallery/Hospitality/Retreat/A15.avif',
      '/Gallery/Hospitality/Retreat/A16.avif',
      '/Gallery/Hospitality/Retreat/A17.avif',
      '/Gallery/Hospitality/Retreat/A18.avif',
      '/Gallery/Hospitality/Retreat/A19.avif',
    ],
    detailContent: [
      {
        type: 'text',
        content: 'The site is a durian orchard with a natural river running across, located in the rural area of Ulu Yam. It is a homestay retreat catering for urban dwellers spending weekends and holidays close to nature.'
      },
      {
        type: 'text',
        content: 'The design preserves the matured durian trees and the majestic scenery on the site. Visitors will feel a sense of journey from entering the site to arriving at each unique hut before continuing to explore the activity area and the river.'
      },
    ],
  },
  // Valley OF Wind
  {
    id: 3,
    slug: 'valley-of-wind',
    title: 'Valley Of Wind',
    location: 'Langkawi, Kedah',
    category: 'Hospitality',
    status: 'Proposal',
    projectTeam: ['Edric Choo Poo Liang', 'Lim Min Syn'],
    images: [
      '/Gallery/Hospitality/ValleyOfWind/CP.avif',
      '/Gallery/Hospitality/ValleyOfWind/A1.avif',
      '/Gallery/Hospitality/ValleyOfWind/A2.avif',
      '/Gallery/Hospitality/ValleyOfWind/A3.avif',
      '/Gallery/Hospitality/ValleyOfWind/A4.avif',
      '/Gallery/Hospitality/ValleyOfWind/A5.avif',
      '/Gallery/Hospitality/ValleyOfWind/A6.avif',
      '/Gallery/Hospitality/ValleyOfWind/A7.avif',
      '/Gallery/Hospitality/ValleyOfWind/A8.avif',
      '/Gallery/Hospitality/ValleyOfWind/A9.avif',
      '/Gallery/Hospitality/ValleyOfWind/A10.avif',
      '/Gallery/Hospitality/ValleyOfWind/A11.avif',
      '/Gallery/Hospitality/ValleyOfWind/A12.avif',
      '/Gallery/Hospitality/ValleyOfWind/A13.avif',
      '/Gallery/Hospitality/ValleyOfWind/A14.avif',
      '/Gallery/Hospitality/ValleyOfWind/A15.avif',
      '/Gallery/Hospitality/ValleyOfWind/A16.avif',
      '/Gallery/Hospitality/ValleyOfWind/A17.avif',
      '/Gallery/Hospitality/ValleyOfWind/A18.avif',
      '/Gallery/Hospitality/ValleyOfWind/A19.avif',
    ],
    detailContent: [
      {
        type: 'text',
        content: [
          'Valley of Wind is Resort located at Langkawi. ',
          'The Client intended to build a Family-based villa for vacation.',
        ]
      },
      {
        type: 'text',
        content: 'Due to the site located near the valley of the mountain and has no much view to the surrounding, the project was designed with invert looking pond and water feature.'
      },
    ],
  },
];
