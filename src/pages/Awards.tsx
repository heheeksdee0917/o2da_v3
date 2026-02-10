import { awards } from '../data/mockData';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import React from 'react';

export default function Awards() {
  const [visibleYears, setVisibleYears] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Separate awards and competitions
  const awardsList = awards.filter(item => item.type === 'award').sort((a, b) => b.year - a.year);
  const competitionsList = awards.filter(item => item.type === 'competition').sort((a, b) => b.year - a.year);

  // Group awards by year
  const awardsByYear = awardsList.reduce((acc, item) => {
    if (!acc[item.year]) {
      acc[item.year] = [];
    }
    acc[item.year].push(item);
    return acc;
  }, {} as Record<number, typeof awards>);

  // Group competitions by year
  const competitionsByYear = competitionsList.reduce((acc, item) => {
    if (!acc[item.year]) {
      acc[item.year] = [];
    }
    acc[item.year].push(item);
    return acc;
  }, {} as Record<number, typeof awards>);

  const awardYears = Object.keys(awardsByYear).map(Number).sort((a, b) => b - a);
  const competitionYears = Object.keys(competitionsByYear).map(Number).sort((a, b) => b - a);

  // Intersection Observer for scroll animations - observe year sections
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const yearId = entry.target.getAttribute('data-year-section');
            if (yearId) {
              setVisibleYears((prev) => new Set([...prev, yearId]));
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe all year sections
    const elements = document.querySelectorAll('[data-year-section]');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="page-fade-in">
      <div data-theme="light" className="bg-white min-h-screen">
        <div className="max-w-[1200px] mx-auto px-12 pt-32 pb-32">

          {/* Header */}
          <div className="mb-24 text-center">
            <h1 className="text-5xl font-light tracking-wide text-black/90 mb-4">Recognition</h1>
            <p className="text-base font-light text-black/50 max-w-2xl mx-auto leading-relaxed">
              A curated collection of awards and recognitions celebrating our commitment to design excellence and innovation in architecture
            </p>
          </div>

          {/* AWARDS SECTION */}
          {awardYears.length > 0 && (
            <div className="mb-32">
              {/* Awards Category Header */}
              <div className="mb-16">
                <h2 className="text-3xl font-light text-black/70 mb-2">Awards</h2>
              </div>

              {/* Awards by Year */}
              <div className="space-y-20">
                {awardYears.map((year) => (
                  <div
                    key={`award-${year}`}
                    data-year-section={`award-${year}`}
                    className={`transition-all duration-700 ${visibleYears.has(`award-${year}`)
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                      }`}
                  >
                    {/* Year Divider */}
                    <div className="flex items-center gap-8 mb-12">
                      <div className="text-6xl font-light text-black/20">{year}</div>
                      <div className="flex-1 h-px bg-black/10"></div>
                    </div>

                    {/* Awards for this year */}
                    <div className="grid grid-cols-1 gap-8">
                      {awardsByYear[year].map((award) => (
                        <Link
                          key={award.id}
                          to={award.slug ? `/portfolio/${award.slug}` : '#'}
                          className={`group block ${!award.slug ? 'pointer-events-none' : ''}`}
                        >
                          <div className="flex items-start justify-between gap-8 py-6 border-b border-black/5 hover:border-black/20 transition-all duration-300">
                            {/* Left: Award Name & Project */}
                            <div className="flex-1 min-w-0">
                              <h3 className="text-xl font-light text-black mb-2">
                                {award.competition}
                              </h3>
                              <p className="text-sm font-light uppercase tracking-widest text-black/50">
                                <span className="px-2 py-1 group-hover:bg-lime-400/30 group-hover:text-black transition-all">
                                  {award.project}
                                </span>
                              </p>
                            </div>

                            {/* Right: Place */}
                            <div className="flex flex-col items-end gap-2 flex-shrink-0">
                              <span className="text-lg font-light text-black/80">
                                {award.place}
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* COMPETITIONS SECTION */}
          {competitionYears.length > 0 && (
            <div>
              {/* Competitions Category Header */}
              <div className="mb-16">
                <h2 className="text-3xl font-light text-black/70 mb-2">Competitions</h2>
              </div>

              {/* Competitions by Year */}
              <div className="space-y-20">
                {competitionYears.map((year) => (
                  <div
                    key={`competition-${year}`}
                    data-year-section={`competition-${year}`}
                    className={`transition-all duration-700 ${visibleYears.has(`competition-${year}`)
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                      }`}
                  >
                    {/* Year Divider */}
                    <div className="flex items-center gap-8 mb-12">
                      <div className="text-6xl font-light text-black/20">{year}</div>
                      <div className="flex-1 h-px bg-black/10"></div>
                    </div>

                    {/* Competitions for this year */}
                    <div className="grid grid-cols-1 gap-8">
                      {competitionsByYear[year].map((competition) => (
                        <Link
                          key={competition.id}
                          to={competition.slug ? `/portfolio/${competition.slug}` : '#'}
                          className={`group block ${!competition.slug ? 'pointer-events-none' : ''}`}
                        >
                          <div className="flex items-start justify-between gap-8 py-6 border-b border-black/5 hover:border-black/20 transition-all duration-300">
                            {/* Left: Competition Name & Project */}
                            <div className="flex-1 min-w-0">
                              <h3 className="text-xl font-light text-black mb-2">
                                {competition.competition}
                              </h3>
                              <p className="text-sm font-light uppercase tracking-widest text-black/50">
                                <span className="px-2 py-1 group-hover:bg-lime-400/30 group-hover:text-black transition-all">
                                  {competition.project}
                                </span>
                              </p>
                            </div>

                            {/* Right: Place */}
                            <div className="flex flex-col items-end gap-2 flex-shrink-0">
                              <span className="text-lg font-light text-black/80">
                                {competition.place}
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {awardYears.length === 0 && competitionYears.length === 0 && (
            <div className="text-center py-32">
              <p className="text-xl font-light text-black/30">No awards or competitions to display</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}