import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { teamMembers } from '../data/mockData.ts';
import LazyImage from '../components/LazyImage';
import React from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const philosophyRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(philosophyRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: philosophyRef.current,
          start: 'top 80%',
        },
      });

      gsap.from('.process-step', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: processRef.current,
          start: 'top 80%',
        },
      });

      gsap.from('.team-member', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: teamRef.current,
          start: 'top 80%',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div data-theme="light" className="bg-white">
      <div className="page-fade-in">
        <div className="max-w-[2340px] mx-auto px-4 md:px-8 pt-32 pb-32">

          {/* Philosophy */}
          <div ref={philosophyRef} className="mb-24 max-w-6xl mx-auto text-center">
            <h2 className="mb-8 text-3xl font-normal">
              O<span className="lime-accent">2</span>DA+CPL<span className="hot-rod-accent">A</span>
            </h2>
            <p className="mb-6 leading-relaxed">
              Established in 2015 by Malaysian architect <span className="font-medium">Ar. Edric Choo Poo Liang</span>, O2DA + CPLA — comprising <span className="font-medium">O2 Design Atelier and Choo Poo Liang Architect</span> — is a multidisciplinary design practice rooted in the creative industries. The studio operates at the intersection of architecture, culture, and environmental consciousness, offering design solutions that are both innovative and contextually grounded.
            </p>
            <p className="mb-6 leading-relaxed">
              Rather than adhering to a singular aesthetic or style, <span className="font-medium">CPLA's design philosophy is responsive</span> — each project is shaped by its site, cultural backdrop, client vision, and the formal architectural language. Central to our approach is a deep awareness of climate change and its implications for the built environment. This drives us to engage critically with issues of sustainability, social behavior, and urban culture.
            </p>
            <p className="mb-6 leading-relaxed">
              Our work is defined by a rigorous, research-driven design process. We believe that meaningful architecture begins with <span className="font-medium">listening</span> — to our clients, to communities, and to the environment. This dialogue informs bespoke, design-led outcomes that are tailored, purposeful, and enduring.
            </p>
            <p className="mb-6 leading-relaxed">
              CPLA delivers <span className="font-medium">integrated design services</span> across a wide range of scales and disciplines — including master planning, architecture, landscape, interior, lighting, and furniture design. This holistic approach allows us to craft environments that are cohesive, thoughtful, and attuned to human experience.
            </p>
            <p className="mb-6 leading-relaxed">
              Over the years, the studio has completed a diverse portfolio of work in Singapore and across <span className="font-medium">Malaysia</span>, following the establishment of Edric's independent practice. Our projects have received widespread recognition, winning <span className="font-medium">local and international awards</span>, including accolades from the <span className="font-medium">Pertubuhan Akitek Malaysia (PAM), World Architecture Festival (WAF)</span>, and the <span className="font-medium">Asia Pacific Awards</span>.
            </p>
            <p className="leading-relaxed">
              CPLA's work continues to be featured in <span className="font-medium">leading architectural publications</span> both locally and globally, reflecting the studio's commitment to design excellence, innovation, and cultural relevance.
            </p>
          </div>

          {/* Design Process */}
          <div ref={processRef} className="mb-24">
            <h2 className="text-center mb-20 text-3xl font-light">Design Process</h2>
            <div className="grid md:grid-cols-4 gap-12">
              <div className="process-step">
                <div className="caption text-black/40 mb-4">01.</div>
                <h3 className="text-2xl font-medium mb-4">Concept</h3>
                <p className="text-black/60 leading-relaxed">
                  We begin with questions, not answers. Listening, researching, and understanding context precede form-making.
                </p>
              </div>
              <div className="process-step">
                <div className="caption text-black/40 mb-4">02.</div>
                <h3 className="text-2xl font-medium mb-4">Context</h3>
                <p className="text-black/60 leading-relaxed">
                  Every site tells a story. We study climate, culture, history, and materiality to inform design decisions.
                </p>
              </div>
              <div className="process-step">
                <div className="caption text-black/40 mb-4">03.</div>
                <h3 className="text-2xl font-medium mb-4">Craft</h3>
                <p className="text-black/60 leading-relaxed">
                  Details matter. We collaborate closely with builders and artisans to ensure design intent is realized.
                </p>
              </div>
              <div className="process-step">
                <div className="caption text-black/40 mb-4">04.</div>
                <h3 className="text-2xl font-medium mb-4">Completion</h3>
                <p className="text-black/60 leading-relaxed">
                  Architecture is experienced over time. We design for longevity, adaptation, and graceful aging.
                </p>
              </div>
            </div>
          </div>

          {/* Team Members */}
          <div ref={teamRef}>
            <h2 className="text-center mb-20 text-3xl font-light">Team Members</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="team-member relative group overflow-hidden">
                  <LazyImage
                    src={member.image}
                    alt={member.name}
                    className="w-full aspect-[9/16] object-cover transition-all duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 20vw"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/50 to-transparent pt-16">
                    <h3 className="text-lg font-medium text-white">{member.name}</h3>
                    <p className="caption text-white/90">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}