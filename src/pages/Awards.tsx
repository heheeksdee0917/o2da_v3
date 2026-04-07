import { awards } from '../data/mockData';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import React from 'react';

export default function Awards() {
  const [visibleYears, setVisibleYears] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  const awardsList = awards.filter(item => item.type === 'award').sort((a, b) => b.year - a.year);
  const competitionsList = awards.filter(item => item.type === 'competition').sort((a, b) => b.year - a.year);

  const groupByYear = (list: typeof awards) =>
    list.reduce((acc, item) => {
      if (!acc[item.year]) acc[item.year] = [];
      acc[item.year].push(item);
      return acc;
    }, {} as Record<number, typeof awards>);

  const awardsByYear = groupByYear(awardsList);
  const competitionsByYear = groupByYear(competitionsList);
  const awardYears = Object.keys(awardsByYear).map(Number).sort((a, b) => b - a);
  const competitionYears = Object.keys(competitionsByYear).map(Number).sort((a, b) => b - a);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const yearId = entry.target.getAttribute('data-year-section');
            if (yearId) setVisibleYears((prev) => new Set([...prev, yearId]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    container.querySelectorAll('[data-year-section]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const renderSection = (
    title: string,
    years: number[],
    byYear: Record<number, typeof awards>,
    prefix: string
  ) => {
    if (years.length === 0) return null;
    return (
      <div className="mb-32 last:mb-0">
        <div className="mb-16">
          <h2 className="text-3xl font-light text-black/70">{title}</h2>
        </div>
        <div className="space-y-0">
          {years.map((year) => {
            const key = `${prefix}-${year}`;
            return (
              <div
                key={key}
                data-year-section={key}
                className={`transition-all duration-700 ${visibleYears.has(key) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                {byYear[year].map((item, index) => (
                  <Link
                    key={item.id}
                    to={item.slug ? `/portfolio/${item.slug}` : '#'}
                    className={`group block ${!item.slug ? 'pointer-events-none' : ''}`}
                  >
                    {/* Mobile layout */}
                    <div className="md:hidden border-b border-black/5 py-6">
                      {index === 0 && (
                        <span className="block text-2xl font-light text-black/30 mb-3">{year}</span>
                      )}
                      <h3 className="text-xl font-normal text-black mb-1">{item.competition}</h3>
                      <p className="text-base font-light text-black/90 mb-1">{item.project} - {item.place}</p>
                    </div>

                    {/* Desktop layout */}
                    <div className="hidden md:flex md:flex-row md:items-start py-6 transition-all duration-300">

                      {/* 10% left — Year */}
                      <div className="md:w-[10%] shrink-0">
                        {index === 0 && (
                          <span className="text-2xl md:text-3xl font-light text-black/30">{year}</span>
                        )}
                      </div>

                      {/* 90% right — bordered wrapper */}
                      <div className="flex flex-row items-center md:w-[90%] border-b border-black/5 pb-6 transition-all duration-300">

                        <div className="w-[67%] min-w-0">
                          <h3 className="text-2xl font-normal text-black mb-1">{item.competition}</h3>
                          <p className="text-xl font-light text-black/90">
                            <span className="md:group-hover:bg-lime-400/30 md:group-hover:text-black transition-all">
                              {item.project}
                            </span>
                          </p>
                        </div>

                        {/* 33% right — project */}
                        <div className="w-[33%] shrink-0">
                          <span className="text-base font-light text-black/90">
                            {item.place}
                          </span>
                        </div>

                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="page-fade-in">
      <div data-theme="light" className="bg-white min-h-screen">
        <div ref={containerRef} className="max-w-[2340px] mx-auto px-4 md:px-8 pt-32 pb-32">

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl font-light tracking-wide text-black/90 mb-4">Recognition</h1>
            <p className="text-base font-light text-black/50 leading-relaxed">
              A curated collection of awards and recognitions celebrating our commitment to design excellence and innovation in architecture
            </p>
          </div>

          {renderSection('Awards', awardYears, awardsByYear, 'award')}
          {renderSection('Competitions', competitionYears, competitionsByYear, 'competition')}

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