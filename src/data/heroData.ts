interface HeroSection {
  id: number;
  slug: string;
  title: string;
  location: string;
  img: string;
  vimeoId?: string;
  thumbnail?: string;
}

export const heroSections: HeroSection[] = [
  {
    id: 1,
    title: "Tropical Shift House",
    location: "Kuala Lumpur",
    slug: "tropical-shift-house",
    img: '/Gallery/Residential/TropicalShiftHouse/hero_video.mp4',
    thumbnail: '/Gallery/Residential/TropicalShiftHouse/tropical_thumbnail.avif',
  },
  {
    id: 2,
    slug: 'garisan',
    title: 'Garisan',
    location: 'Puchong, Selangor',
    img: '/Gallery/Housing/GarisanPuchong/CP.avif',
  },
  {
    id: 3,
    slug: 'resort-home',
    title: 'Resort Home',
    location: 'Kota Damansara, Selangor',
    img: '/Gallery/Residential/ResortHome/CP.avif',
  },
  {
    id: 4,
    slug: 'the-quartz',
    title: 'The Quartz',
    location: 'Cheras, Kuala Lumpur',
    img: '/Gallery/Housing/Quartz/CP.avif',
  },
  {
    id: 5,
    slug: 'kenyas-orphanage',
    title: 'ORPHANED & CHILDRE‘s ECO-VILLAGE',
    location: 'SOY, KENYA',
    img: '/Gallery/Competition/KenyaOrph/CP.avif',
  },
  {
    id: 6,
    slug: 'sentul-works',
    title: 'Sentul Works',
    location: 'Sentul, Kuala Lumpur',
    img: '/Gallery/Commercial/SentulWorks/CP.avif',
  },
];