"use client";

import React, { useState, useEffect, useRef } from "react";

// Types
interface Skill {
  name: string;
  desc: string;
  project?: string;
}

interface SkillCategory {
  id: string;
  num: string;
  title: string;
  description: string;
  skills: Skill[];
  context: string;
  // Positioning for desktop orbit (centered around 250, 250 in a 500x500 box)
  x: number;
  y: number;
  // Fan out direction angles for child nodes (in degrees)
  fanAngleStart: number;
  fanAngleEnd: number;
}

// Skill Data
const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "languages",
    num: "01",
    title: "LANGUAGES",
    description: "Languages used for core application logic, system-level scripting, and smart contracts.",
    context: "Core syntax and compilation environments.",
    x: 105,
    y: 270,
    fanAngleStart: 120,
    fanAngleEnd: 240,
    skills: [
      { name: "JavaScript", desc: "Dynamic scripting language for web logic" },
      { name: "TypeScript", desc: "Typed superset of JavaScript for scalable apps" },
      { name: "Python", desc: "General-purpose scripting and backend services" },
      { name: "Java", desc: "Robust, object-oriented language for backend systems" },
      { name: "C", desc: "Low-level system programming and memory control" },
      { name: "C++", desc: "High-performance systems and application development" },
      { name: "Solidity", desc: "Smart contract development for Ethereum Virtual Machine", project: "SALVUS" },
    ],
  },
  {
    id: "frontend",
    num: "02",
    title: "FRONTEND",
    description: "Modern tools and libraries for crafting responsive, rich user interfaces.",
    context: "Client-side architecture and responsive rendering.",
    x: 330,
    y: 90,
    fanAngleStart: 200,
    fanAngleEnd: 340,
    skills: [
      { name: "React", desc: "Component-based user interface library" },
      { name: "Next.js", desc: "React framework for production-grade hybrid web apps" },
      { name: "Tailwind CSS", desc: "Utility-first CSS framework for rapid UI styling" },
      { name: "HTML", desc: "HyperText Markup Language for structured web content" },
      { name: "CSS", desc: "Cascading Style Sheets for layout design and styling" },
    ],
  },
  {
    id: "backend",
    num: "03",
    title: "BACKEND",
    description: "Server architectures, RESTful API design, and authentication flows.",
    context: "Secure, scalable server systems.",
    x: 510,
    y: 270,
    fanAngleStart: -60,
    fanAngleEnd: 60,
    skills: [
      { name: "Node.js", desc: "Chrome V8 runtime for executing JavaScript on servers" },
      { name: "Express.js", desc: "Minimalist web framework for Node.js APIs" },
      { name: "REST APIs", desc: "Representational State Transfer interface design" },
      { name: "JWT", desc: "JSON Web Tokens for secure authentication claims" },
      { name: "OAuth", desc: "Token-based open authorization standards" },
    ],
  },
  {
    id: "databases",
    num: "04",
    title: "DATABASES",
    description: "Relational and non-relational database management and object-relational mapping.",
    context: "Data durability, modeling, and queries.",
    x: 445,
    y: 490,
    fanAngleStart: 20,
    fanAngleEnd: 100,
    skills: [
      { name: "MongoDB", desc: "Document-based NoSQL database for flexible schemas" },
      { name: "PostgreSQL", desc: "Relational SQL database for robust transaction management" },
      { name: "Prisma", desc: "Next-generation ORM for Node.js and TypeScript" },
    ],
  },
  {
    id: "web3",
    num: "05",
    title: "WEB3 / BLOCKCHAIN",
    description: "Decentralized applications, smart contract compilation, and web3 wallet integrations.",
    context: "Used to build and experiment with blockchain-based applications.",
    x: 168,
    y: 490,
    fanAngleStart: 100,
    fanAngleEnd: 230,
    skills: [
      { name: "Solidity", desc: "Smart contract development for EVM blockchains", project: "SALVUS" },
      { name: "Hardhat", desc: "Ethereum development environment to compile, deploy and test", project: "SALVUS" },
      { name: "Ethers.js", desc: "Web3 wallet connection and RPC node interaction", project: "SALVUS" },
      { name: "Polygon", desc: "Ethereum Layer-2 scaling network deployment" },
      { name: "MetaMask", desc: "Browser wallet and user credential provider" },
      { name: "frighter", desc: "Stellar wallet and credential provider" },
    ],
  },
];

// Helper to check prefers-reduced-motion
const useReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setTimeout(() => setReduced(media.matches), 0);
    const listener = (e: MediaQueryListEvent) => setReduced(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);
  return reduced;
};

// Scroll-reveal wrapper
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setTimeout(() => setVisible(true), 0);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {children}
    </div>
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | null>(null);
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const [orbitOnline, setOrbitOnline] = useState(false);
  const reducedMotion = useReducedMotion();

  // Scroll trigger to "boot" orbit system progressively
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = orbitRef.current;
    if (!el) return;

    if (reducedMotion) {
      setTimeout(() => setOrbitOnline(true), 0);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOrbitOnline(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  // Handle active Category and reset active skill details
  const handleCategoryActivate = (cat: SkillCategory | null) => {
    setActiveCategory(cat);
    setActiveSkill(null);
    setHoveredSkill(null);
  };

  return (
    <section
      id="skills"
      className="relative w-full overflow-hidden"
      style={{ background: "#080808" }}
    >
      {/* subtle top rule divider */}
      <div
        className="absolute top-0 inset-x-0 h-[1px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,212,255,0.08) 30%, rgba(168,85,247,0.08) 70%, transparent)",
        }}
      />

      {/* Nebula glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/3 -translate-y-1/2"
          style={{
            width: "45vw",
            height: "45vw",
            background:
              "radial-gradient(circle, rgba(168,85,247,0.04) 0%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />
        <div
          className="absolute top-1/3 right-1/4"
          style={{
            width: "35vw",
            height: "35vw",
            background:
              "radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-none px-6 md:px-12 lg:px-20 py-24 md:py-32 lg:py-40">
        
        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Sticky Info Header & Dynamic Skill Details Panel */}
          <div className="lg:col-span-5 flex flex-col gap-10 lg:sticky lg:top-32">
            <Reveal delay={0}>
              {/* Section label */}
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="font-mono text-[10px] font-bold tracking-[0.35em] uppercase"
                  style={{ color: "#00d4ff" }}
                >
                  03
                </span>
                <span
                  className="h-[1px] w-8"
                  style={{ background: "rgba(0,212,255,0.35)" }}
                />
                <span
                  className="font-serif text-3xl sm:text-4xl font-bold tracking-widest uppercase"
                  style={{ color: "#f0f0f0" }}
                >
                  Core Skills
                </span>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <h2
                className="font-black tracking-tighter uppercase leading-[0.9] font-sans mb-6"
                style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", color: "#f0f0f0" }}
              >
                CORE SKILLS
                <br />
                &amp; EXPERTISE
              </h2>
              <p
                className="leading-[1.7] font-light text-base max-w-md"
                style={{ color: "#888899" }}
              >
                The technologies I use to turn ideas into working, decentralized products.
              </p>
            </Reveal>

            {/* dynamic details panel */}
            <div className="w-full">
              <Reveal delay={240}>
                <div
                  className="p-6 md:p-8 rounded-xl border transition-all duration-500 ease-out min-h-[300px] flex flex-col justify-between"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    borderColor: activeCategory
                      ? "rgba(0,212,255,0.25)"
                      : "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  {activeCategory ? (
                    <div className="flex flex-col h-full justify-between gap-6">
                      <div>
                        {/* active Category */}
                        <div className="flex items-baseline justify-between mb-5 border-b border-white/5 pb-3">
                          <span
                            className="font-mono text-sm tracking-wider uppercase font-bold"
                            style={{ color: "#00d4ff" }}
                          >
                            {activeCategory.num} / {activeCategory.title}
                          </span>
                          <span className="text-[10px] font-mono text-white/40">Active Category</span>
                        </div>

                        {/* active Category desc */}
                        <p className="text-base font-light leading-relaxed mb-6 text-[#aaaacc]">
                          {activeCategory.description}
                        </p>

                        {/* building with / contextual details */}
                        <div className="mt-2">
                          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/40 block mb-3">
                            Building With:
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {activeCategory.skills.map((s) => (
                              <span
                                key={s.name}
                                className="px-3 py-1.5 text-sm border bg-white/[0.02] rounded-md transition-all duration-300 font-mono"
                                style={{
                                  borderColor:
                                    activeSkill?.name === s.name
                                      ? "#f59e0b"
                                      : "rgba(255,255,255,0.06)",
                                  color:
                                    activeSkill?.name === s.name
                                      ? "#f59e0b"
                                      : "#d4d4e0",
                                }}
                              >
                                {s.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* technology specific hover details */}
                      <div
                        className="mt-4 pt-4 border-t border-white/5 transition-opacity duration-300 min-h-[90px]"
                        style={{ opacity: activeSkill ? 1 : 0.4 }}
                      >
                        {activeSkill ? (
                          <div>
                            <div className="flex items-baseline gap-2 mb-2">
                              <span className="font-mono font-bold text-base text-white">
                                {activeSkill.name.toUpperCase()}
                              </span>
                              {activeSkill.project && (
                                <span
                                  className="text-[9px] font-mono tracking-widest px-1.5 py-0.5 border"
                                  style={{
                                    borderColor: "rgba(168,85,247,0.3)",
                                    background: "rgba(168,85,247,0.05)",
                                    color: "#a855f7",
                                  }}
                                >
                                  USED IN {activeSkill.project}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-[#888899] leading-relaxed">
                              {activeSkill.desc}
                            </p>
                          </div>
                        ) : (
                          <p className="text-sm text-[#555566] italic">
                            Hover over any node in the constellation on the right to discover technical details and projects.
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center h-full min-h-[220px] gap-3">
                      <div className="w-8 h-8 rounded-full border border-dashed border-white/10 flex items-center justify-center animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]" />
                      </div>
                      <span className="font-mono text-xs tracking-wider uppercase text-white/50">
                        Interactive Ecosystem
                      </span>
                      <p className="text-xs text-[#555566] max-w-[280px]">
                        Interact with the nodes on the constellation map to view technologies, integrations, and architectures.
                      </p>
                    </div>
                  )}
                </div>
              </Reveal>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Orbit System / Constellation */}
          <div className="lg:col-span-7 flex justify-center items-center w-full" ref={orbitRef}>
            
            {/* Desktop Constellation (hidden on mobile/tablet) */}
            <div className="hidden md:block relative w-[660px] h-[660px] select-none">
              
              {/* Ambient rotating orbit background ring */}
              <div
                className="absolute inset-0 border border-white/[0.03] rounded-full pointer-events-none"
                style={{
                  width: "430px",
                  height: "430px",
                  top: "115px",
                  left: "115px",
                  animation: !reducedMotion ? "spin 120s linear infinite" : "none",
                }}
              />
              <div
                className="absolute inset-0 border border-[#00d4ff]/[0.02] border-dashed rounded-full pointer-events-none"
                style={{
                  width: "530px",
                  height: "530px",
                  top: "65px",
                  left: "65px",
                  animation: !reducedMotion ? "spin-reverse 150s linear infinite" : "none",
                }}
              />

              {/* Dynamic SVGs for connecting lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                {/* Center to Category Lines */}
                {SKILL_CATEGORIES.map((cat) => {
                  const isActive = activeCategory?.id === cat.id;
                  const isAnyActive = activeCategory !== null;

                  return (
                    <line
                      key={cat.id}
                      x1={330}
                      y1={330}
                      x2={cat.x}
                      y2={cat.y}
                      className="transition-all duration-500"
                      stroke={isActive ? "#00d4ff" : "rgba(255,255,255,0.06)"}
                      strokeWidth={isActive ? 1.5 : 1}
                      strokeDasharray={isActive ? "none" : "3,3"}
                      opacity={isAnyActive && !isActive ? 0.35 : 1}
                    />
                  );
                })}

                {/* Category to Skill Node Lines (dynamic fan out) */}
                {activeCategory &&
                  orbitOnline &&
                  activeCategory.skills.map((skill, idx) => {
                    const total = activeCategory.skills.length;
                    // Spread skills in arc outwards
                    const angleStep =
                      total > 1
                        ? (activeCategory.fanAngleEnd - activeCategory.fanAngleStart) / (total - 1)
                        : 0;
                    const angleRad =
                      ((activeCategory.fanAngleStart + angleStep * idx) * Math.PI) / 180;
                    const targetR = 100;
                    const targetX = activeCategory.x + targetR * Math.cos(angleRad);
                    const targetY = activeCategory.y + targetR * Math.sin(angleRad);

                    return (
                      <line
                        key={skill.name}
                        x1={activeCategory.x}
                        x2={targetX}
                        y1={activeCategory.y}
                        y2={targetY}
                        stroke="#00d4ff"
                        strokeWidth={0.8}
                        strokeDasharray="2,2"
                        className="animate-draw-line"
                      />
                    );
                  })}
              </svg>

              {/* ANCHOR POINT: Center core expertise node */}
              <div
                className="absolute z-20 flex flex-col justify-center items-center rounded-full border transition-all duration-500 ease-out group cursor-default"
                style={{
                  width: "140px",
                  height: "140px",
                  top: "260px",
                  left: "260px",
                  background: "#080808",
                  borderColor: activeCategory ? "#00d4ff" : "rgba(255,255,255,0.1)",
                  boxShadow: activeCategory
                    ? "0 0 20px rgba(0, 212, 255, 0.2)"
                    : "none",
                }}
              >
                {/* Center breathing pulse rings */}
                <div
                  className="absolute inset-0 rounded-full border border-[#00d4ff]/10 animate-ping opacity-30"
                  style={{ animationDuration: reducedMotion ? "0s" : "3s" }}
                />
                <span
                  className="text-[9px] font-mono tracking-[0.2em] font-bold text-center select-none"
                  style={{ color: activeCategory ? "#00d4ff" : "#888899" }}
                >
                  CORE
                  <br />
                  EXPERTISE
                </span>
                <span className="text-[7px] font-mono tracking-widest text-[#555566] uppercase mt-2">
                  BUILD • EXPLORE
                </span>
              </div>

              {/* Category Nodes */}
              {SKILL_CATEGORIES.map((cat, catIdx) => {
                const isActive = activeCategory?.id === cat.id;
                const isAnyActive = activeCategory !== null;
                const isVisible = orbitOnline;

                return (
                  <div
                    key={cat.id}
                    className="absolute z-10 transition-all duration-700 ease-out"
                    style={{
                      top: cat.y - 28,
                      left: cat.x - 28,
                      opacity: isVisible ? (isAnyActive && !isActive ? 0.3 : 1) : 0,
                      transform: isVisible
                        ? `scale(${isActive ? 1.2 : 1})`
                        : "scale(0.5)",
                      transitionDelay: isVisible ? `${catIdx * 100}ms` : "0ms",
                    }}
                  >
                    <button
                      onClick={() => handleCategoryActivate(isActive ? null : cat)}
                      onMouseEnter={() => handleCategoryActivate(cat)}
                      onFocus={() => handleCategoryActivate(cat)}
                      className="w-14 h-14 rounded-full border flex items-center justify-center transition-all duration-300 relative group/node focus:outline-none hover:scale-110"
                      style={{
                        background: isActive ? "#00d4ff" : "#080808",
                        borderColor: isActive ? "#00d4ff" : "rgba(0, 212, 255, 0.3)",
                        boxShadow: isActive
                          ? "0 0 20px rgba(0, 212, 255, 0.5)"
                          : "0 0 0px rgba(0, 212, 255, 0)",
                      }}
                      aria-label={`Show ${cat.title} skills`}
                    >
                      <span
                        className="font-mono text-[10px] font-black transition-colors duration-300"
                        style={{ color: isActive ? "#080808" : "#00d4ff" }}
                      >
                        {cat.num}
                      </span>

                      {/* Orbit category floating labels */}
                      <span
                        className="absolute text-[11px] font-mono tracking-widest uppercase font-bold pointer-events-none whitespace-nowrap px-2.5 py-1 border rounded transition-all duration-300"
                        style={{
                          top: cat.y > 330 ? "62px" : "-30px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          background: isActive ? "rgba(0, 212, 255, 0.15)" : "rgba(8, 8, 10, 0.85)",
                          borderColor: isActive ? "rgba(0, 212, 255, 0.5)" : "rgba(255, 255, 255, 0.07)",
                          color: isActive ? "#00d4ff" : "#aaaacc",
                        }}
                      >
                        {cat.title}
                      </span>
                    </button>

                    {/* Pop-out child technology nodes */}
                    {isActive &&
                      cat.skills.map((skill, idx) => {
                        const total = cat.skills.length;
                        const angleStep =
                          total > 1 ? (cat.fanAngleEnd - cat.fanAngleStart) / (total - 1) : 0;
                        const angleRad = ((cat.fanAngleStart + angleStep * idx) * Math.PI) / 180;
                        // Increase radius for categories with many skills to prevent overlap
                        const targetR = total > 5 ? 130 : 115;
                        const targetX = targetR * Math.cos(angleRad);
                        const targetY = targetR * Math.sin(angleRad);
                        const isThisSkillHovered = hoveredSkill?.name === skill.name;
                        const isAnySkillHovered = hoveredSkill !== null;
                        // clicked/selected uses amber, hover is also amber
                        const isThisSkillActive = activeSkill?.name === skill.name;

                        return (
                          <div
                            key={skill.name}
                            className="absolute pointer-events-auto"
                            style={{
                              transform: `translate(${targetX}px, ${targetY}px) translate(-50%, -50%)`,
                              top: "28px",
                              left: "28px",
                              zIndex: isThisSkillHovered ? 30 : 10,
                              transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s ease",
                            }}
                          >
                            <button
                              onMouseEnter={() => { setHoveredSkill(skill); setActiveSkill(skill); }}
                              onMouseLeave={() => setHoveredSkill(null)}
                              onFocus={() => { setHoveredSkill(skill); setActiveSkill(skill); }}
                              onBlur={() => setHoveredSkill(null)}
                              onClick={() => setActiveSkill(skill)}
                              className="px-3.5 py-2 rounded-lg border flex items-center justify-center focus:outline-none whitespace-nowrap shadow-lg animate-fade-in"
                              style={{
                                background: isThisSkillHovered || isThisSkillActive
                                  ? "rgba(245,158,11,0.12)"
                                  : "#08080c",
                                borderColor: isThisSkillHovered || isThisSkillActive
                                  ? "#f59e0b"
                                  : "rgba(255,255,255,0.12)",
                                boxShadow: isThisSkillHovered || isThisSkillActive
                                  ? "0 0 16px rgba(245,158,11,0.4)"
                                  : "none",
                                transform: isThisSkillHovered
                                  ? "scale(1.22)"
                                  : isAnySkillHovered
                                  ? "scale(0.84)"
                                  : "scale(1)",
                                opacity: isAnySkillHovered && !isThisSkillHovered ? 0.5 : 1,
                                transition: "all 0.22s cubic-bezier(0.34,1.56,0.64,1)",
                              }}
                              aria-label={`View details for ${skill.name}`}
                            >
                              <span
                                className="font-mono text-[10px] font-bold tracking-wider"
                                style={{
                                  color: isThisSkillHovered || isThisSkillActive ? "#f59e0b" : "#d4d4e0",
                                  transition: "color 0.2s ease",
                                }}
                              >
                                {skill.name}
                              </span>
                            </button>
                          </div>
                        );
                      })}
                  </div>
                );
              })}
            </div>

            {/* Mobile / Tablet Interactive Stack Layout (hidden on Desktop) */}
            <div className="md:hidden flex flex-col gap-6 w-full max-w-lg">
              <Reveal delay={200}>
                <div
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/5"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                >
                  <div className="w-8 h-8 rounded-full border border-[#00d4ff] flex items-center justify-center shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]" />
                  </div>
                  <div>
                    <h3 className="font-mono text-xs font-bold text-white">CORE EXPERTISE</h3>
                    <p className="text-[10px] text-[#555566] tracking-wider">TAP CATEGORIES TO EXPLORE</p>
                  </div>
                </div>
              </Reveal>

              <div className="flex flex-col gap-3">
                {SKILL_CATEGORIES.map((cat) => {
                  const isOpen = activeCategory?.id === cat.id;

                  return (
                    <div
                      key={cat.id}
                      className="border rounded-xl transition-all duration-500 overflow-hidden"
                      style={{
                        background: isOpen ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.2)",
                        borderColor: isOpen ? "rgba(0,212,255,0.2)" : "rgba(255,255,255,0.05)",
                      }}
                    >
                      <button
                        onClick={() => handleCategoryActivate(isOpen ? null : cat)}
                        className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                      >
                        <div className="flex items-center gap-4">
                          <span
                            className="font-mono text-xs font-bold w-6 h-6 rounded-full border border-white/10 flex items-center justify-center"
                            style={{
                              color: isOpen ? "#00d4ff" : "#888899",
                              borderColor: isOpen ? "rgba(0,212,255,0.2)" : "rgba(255,255,255,0.08)",
                            }}
                          >
                            {cat.num}
                          </span>
                          <span
                            className="text-xs font-mono font-bold tracking-wider"
                            style={{ color: isOpen ? "#f0f0f0" : "#d4d4e0" }}
                          >
                            {cat.title}
                          </span>
                        </div>
                        <span
                          className="font-mono text-[10px] text-accent transition-transform duration-300"
                          style={{
                            color: "#00d4ff",
                            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                          }}
                        >
                          {isOpen ? "×" : "+"}
                        </span>
                      </button>

                      {/* Content panel */}
                      <div
                        className="transition-all duration-500 ease-in-out"
                        style={{
                          maxHeight: isOpen ? "480px" : "0px",
                          opacity: isOpen ? 1 : 0,
                        }}
                      >
                        <div className="px-5 pb-6 border-t border-white/5 pt-4">
                          <p className="text-xs text-[#aaaacc] font-light leading-relaxed mb-5">
                            {cat.description}
                          </p>

                          <div className="flex flex-col gap-3">
                            {cat.skills.map((skill) => {
                              const isSkillOpen = activeSkill?.name === skill.name;

                              return (
                                <div
                                  key={skill.name}
                                  onClick={() => setActiveSkill(isSkillOpen ? null : skill)}
                                  className="p-3.5 border rounded-lg transition-all duration-300 cursor-pointer"
                                  style={{
                                    background: isSkillOpen ? "rgba(168,85,247,0.04)" : "rgba(255,255,255,0.01)",
                                    borderColor: isSkillOpen ? "rgba(168,85,247,0.25)" : "rgba(255,255,255,0.04)",
                                  }}
                                >
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="font-mono text-xs font-bold text-white">
                                      {skill.name}
                                    </span>
                                    <div className="flex items-center gap-2">
                                      {skill.project && (
                                        <span
                                          className="text-[8px] font-mono tracking-widest px-1.5 py-0.5 border"
                                          style={{
                                            borderColor: "rgba(168,85,247,0.25)",
                                            background: "rgba(168,85,247,0.05)",
                                            color: "#a855f7",
                                          }}
                                        >
                                          {skill.project}
                                        </span>
                                      )}
                                      <span
                                        className="font-mono text-[9px] transition-transform duration-300"
                                        style={{
                                          color: isSkillOpen ? "#a855f7" : "#555566",
                                          transform: isSkillOpen ? "rotate(90deg)" : "rotate(0deg)",
                                        }}
                                      >
                                        →
                                      </span>
                                    </div>
                                  </div>
                                  <div
                                    className="transition-all duration-300 overflow-hidden"
                                    style={{
                                      maxHeight: isSkillOpen ? "100px" : "0px",
                                      opacity: isSkillOpen ? 1 : 0,
                                      marginTop: isSkillOpen ? "8px" : "0px",
                                    }}
                                  >
                                    <p className="text-[11px] text-[#888899] leading-normal font-light">
                                      {skill.desc}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* CSS Keyframes for subtle orbit components */}
      <style jsx global>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes spin-reverse {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }
        @keyframes draw-line {
          from {
            stroke-dashoffset: 20;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        .animate-draw-line {
          stroke-dasharray: 4, 4;
          animation: draw-line 0.5s linear forwards;
        }
      `}</style>
    </section>
  );
}
