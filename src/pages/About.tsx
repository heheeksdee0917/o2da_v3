import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { teamMembers } from '../data/mockData.ts';
import React from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const philosophyRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  // Philosophy animation — separate effect, separate context
  useEffect(() => {
    if (!philosophyRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        philosophyRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: philosophyRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  // Design Process animation — whole section appears as one
  useEffect(() => {
    if (!processRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        processRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: processRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  // Team Members animation — whole section appears as one
  useEffect(() => {
    if (!teamRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        teamRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: teamRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div data-theme="light" className="bg-white">
      <div className="page-fade-in">
        <div className="max-w-[2340px] mx-auto px-4 md:px-8 pt-32 pb-0">

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl font-light tracking-wide text-black/90 mb-4">About O<span className="lime-accent">2</span>DA+CPL<span className="hot-rod-accent">A</span></h1>
          </div>
          {/* Philosophy */}
          <div ref={philosophyRef} className="mb-24 flex flex-col md:flex-row gap-12 md:gap-16">

            {/* Mobile hero image — hidden on desktop */}
            <div className="md:hidden w-full h-[50vh] overflow-hidden">
              <img
                src="/team_photo/team_1.avif"
                alt="CPLA Studio"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Left — 60% text, left aligned */}
            <div className="md:w-[60%] flex flex-col justify-center">
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
                Over the years, the studio has completed a diverse portfolio of work in Singapore and across <span className="font-medium">Malaysia</span>, following the establishment of Edric's independent practice. Our projects have received widespread recognition, winning <span className="font-medium">local and international awards</span>, including accolades from the <span className="font-medium">Pertubuhan Akitek Malaysia (PAM), World Architecture Festival (WAF), Fiabsi international, National awards</span>, and the <span className="font-medium">Asia Pacific Awards</span>.
              </p>
              <p className="leading-relaxed">
                CPLA's work continues to be featured in <span className="font-medium">leading architectural publications</span> both locally and globally, reflecting the studio's commitment to design excellence, innovation, and cultural relevance.
              </p>
            </div>

            <div
              className="md:w-[40%] shrink-0"
              style={{
                backgroundImage: 'url(/team_photo/team_1.avif)',
                backgroundSize: '125%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />

          </div>

        </div>{/* end philosophy container */}

        {/* Design Process — full width breakout */}
        <div ref={processRef} className="flex flex-col justify-center py-16 mb-24 border-t border-black/10 px-4 md:px-8">

          {/* Header */}
          <div className="mb-20">
            <p className="text-sm uppercase tracking-[0.15em] text-black/40 mb-6">Design Code</p>
            <h2 className="text-3xl md:text-4xl font-light text-black mb-4">
              Principle Driven &amp; Responsive Architecture
            </h2>
            <blockquote className="border-l border-black/20 pl-6">
              <p className="text-base italic text-neutral-1000 leading-relaxed">
                "The limits of my language mean the limits of my world."
              </p>
              <cite className="text-sm text-neutral-400 not-italic mt-2 block">
                — Tractatus Logico-Philosophicus 5.6.
              </cite>
            </blockquote>
          </div>

          {/* Intro paragraphs */}
          <div className="mb-20 space-y-5">
            <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
              Early Wittgenstein suggests that the world, insofar as it can be thought and shared, appears within the limits of language. Architecture, the art and science of place making, would then become the most intimate and fundamental to our world building.
            </p>
            <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
              Its building blocks are not only objects or components, but the coupled vocabularies of <span className="text-black font-medium">pattern language</span> and <span className="text-black font-medium">form language</span>: one organizing the recurring structures of life, the other organizing the formal means through which those structures are made tangible.
            </p>
          </div>

          {/* Equation grid — bordered boxes, operators centered */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-0 items-stretch">

            {/* Form Language */}
            <div className="border p-8">
              <p className="text-xl uppercase tracking-[0.12em] text-black/80 mb-4">Form Language</p>
              <p className="text-sm text-neutral-800 italic mb-6">visible, tangible</p>
              <p className="text-base text-neutral-700 leading-relaxed mb-4">
                Geometry, tectonics, compositions and proportions, materials — the vocabularies of built form.
              </p>
              <p className="text-base text-neutral-600 leading-relaxed">
                The many styles and movements created by the introduction and denial of certain elements — the sentences of architecture.
              </p>
            </div>

            {/* × operator */}
            <div className="hidden md:flex items-center justify-center px-6">
            </div>

            {/* Pattern Language */}
            <div className="border p-8">
              <p className="text-xl uppercase tracking-[0.12em] text-black/80 mb-4">Pattern Language</p>
              <p className="text-sm text-neutral-800 italic mb-6">immaterial, human</p>
              <p className="text-base text-neutral-700 leading-relaxed mb-6">
                Rules for how human beings interact with built forms — practical solutions developed over millennia, appropriate to local customs, society, and climate.
              </p>
              <p className="text-sm text-neutral-800 italic leading-relaxed">
                — A Theory on Architecture. Nikos A. Salingaros.
              </p>
            </div>

            {/* = operator */}
            <div className="hidden md:flex items-center justify-center px-6">
              <div className="flex flex-col gap-1.5">
              </div>
            </div>

            {/* Synthesis X */}
            <div className="border p-8">
              <p className="text-xl uppercase tracking-[0.12em] text-black/80 mb-4">Synthesis</p>
              <p className="text-sm text-neutral-800 italic mb-6">X :</p>
              <p className="text-base text-neutral-700 leading-relaxed">
                Human needs are negotiated with physical realities, and ideas are shaped through context. An interconnected web of solutions is generated, tested, and compiled.
              </p>
            </div>

            {/* → operator */}
            <div className="hidden md:flex items-center justify-center px-6">
            </div>

            {/* Resolution = */}
            <div className="border p-8">
              <p className="text-xl uppercase tracking-[0.12em] text-black/60 mb-4">Resolution</p>
              <p className="text-sm text-neutral-800 italic mb-6">= :</p>
              <p className="text-base text-neutral-700 leading-relaxed">
                An adaptive formal architecture — be it a built form or a design thesis. The rigorous process of synthesis produces architecture that is <span className="text-black font-medium">specific, responsive, and enduring</span>.
              </p>
            </div>

          </div>
        </div>{/* end process full-width */}

        <div className="max-w-[2340px] mx-auto px-4 md:px-8 pb-16">
          {/* Team Members */}
          <div ref={teamRef}>
            <h2 className="text-center mb-20 text-3xl font-light">Team Members</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="team-member relative group overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full aspect-[9/16] object-cover transition-all duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/80 to-transparent pt-16">
                    <h3 className="text-lg font-medium text-white">{member.name}</h3>
                    <p className="caption text-white/90">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>{/* end team container */}
    </div>
  );
}