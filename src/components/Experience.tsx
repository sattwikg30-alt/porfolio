"use client";

import React, { useState, useEffect, useRef } from "react";

interface Hackathon {
  num: string;
  date: string;
  event: string;
  subtitle?: string;
  location: string;
  project: string;
  description: string;
  result?: string;
  resultIcon?: string;
  team?: string;
  side: "left" | "right";
  threshold: number;
}

const HACKATHONS: Hackathon[] = [
  {
    num: "01",
    date: "20–21 AUG 2025",
    event: "HackHeritage 3.0",
    location: "Heritage Institute of Technology",
    project: "HH309",
    description: "An e-governance platform for managing academic accreditation and institutional data for NAAC, NIRF, NIRF, QS, etc.",
    side: "right",
    threshold: 0.08,
  },
  {
    num: "02",
    date: "17–18 JAN 2026",
    event: "EIBS 2.0",
    subtitle: "East India Blockchain Summit",
    location: "IIT Kharagpur",
    project: "$alvus",
    description: "A blockchain-based emergency and disaster relief system using stablecoins for transparent, rule-enforced fund distribution.",
    result: "TOP 10 FINALIST 🏆",
    team: "NexChain",
    side: "left",
    threshold: 0.25,
  },
  {
    num: "03",
    date: "14 MAR 2026",
    event: "Vibe-A-Thon – DAKSHH 2026",
    location: "Heritage Institute of Technology",
    project: "Algora",
    description: "A decentralized AI-agent marketplace with pay-per-execution blockchain payments.",
    side: "right",
    threshold: 0.42,
  },
  {
    num: "04",
    date: "11–12 APR 2026",
    event: "HackForge – Srijan '26",
    location: "Jadavpur University",
    project: "Agri-Go",
    description: "An AI-powered agricultural platform for smarter crop selection and farming decisions.",
    result: "1ST POSITION — WINNER 🥇",
    side: "left",
    threshold: 0.58,
  },
  {
    num: "05",
    date: "11–12 APR 2026",
    event: "DevFusion – The Developer Hackathon",
    location: "IIT Bombay · Online",
    project: "VendorAI",
    description: "An AI-powered platform providing vendor insights, automated vendor management, smart recommendations, and business analytics.",
    side: "right",
    threshold: 0.75,
  },
  {
    num: "06",
    date: "17–18 APR 2026",
    event: "Innovatrix",
    location: "Netaji Subhas Engineering College",
    project: "CampusMart",
    description: "A student-focused marketplace for buying, selling, and exchanging items within the campus community.",
    result: "2ND RUNNER-UP 🥈",
    side: "left",
    threshold: 0.92,
  },
];

// SVG path configuration — wide-amplitude S-shaped curve
// ViewBox is 100 wide x 1200 tall. Left edge=0, Right edge=100, Centre=50.
// Curve sweeps from x=20 (left extreme) to x=80 (right extreme) forming a clear S.
const PATH_D = "M 50,0 C 80,30 80,70 80,100 C 80,130 20,270 20,300 C 20,330 80,470 80,500 C 80,530 20,670 20,700 C 20,730 80,870 80,900 C 80,930 20,1070 20,1100 C 20,1130 50,1170 50,1200";

// Scroll-reveal wrapper component
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

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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
      { threshold: 0.1 }
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
        transition: "opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {children}
    </div>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [progress, setProgress] = useState(0);
  const [pathLength, setPathLength] = useState(0);
  const [markerPos, setMarkerPos] = useState({ x: 50, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setTimeout(() => setReducedMotion(media.matches), 0);
    const listener = (e: MediaQueryListEvent) => {
      setTimeout(() => setReducedMotion(e.matches), 0);
    };
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  // Update path length measurement on mount & resize
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const updateLength = () => {
      setPathLength(path.getTotalLength());
    };

    updateLength();
    window.addEventListener("resize", updateLength);
    return () => window.removeEventListener("resize", updateLength);
  }, []);

  // Track scroll position to update progress
  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start scrolling when section top is in the middle of the viewport
      // Complete scrolling when section bottom is in the middle of the viewport
      const scrolled = windowHeight * 0.5 - rect.top;
      const range = rect.height;
      const currentProgress = Math.max(0, Math.min(1, scrolled / Math.max(range, 1)));

      setProgress(currentProgress);

      const path = pathRef.current;
      if (path) {
        const totalLen = path.getTotalLength();
        const point = path.getPointAtLength(totalLen * currentProgress);
        setMarkerPos({ x: point.x, y: point.y });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial call
    setTimeout(handleScroll, 100);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ background: "#080808" }}
    >
      {/* Top divider */}
      <div
        className="absolute top-0 inset-x-0 h-[1px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,212,255,0.12) 30%, rgba(168,85,247,0.1) 70%, transparent)",
        }}
      />

      {/* Decorative glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-0"
          style={{
            width: "35vw",
            height: "35vw",
            background: "radial-gradient(circle, rgba(168,85,247,0.04) 0%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-0"
          style={{
            width: "35vw",
            height: "35vw",
            background: "radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-none px-6 md:px-12 lg:px-20 py-24 md:py-32 lg:py-40">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 mb-20 md:mb-32">
          
          <div className="lg:col-span-5">
            <Reveal>
              <div className="flex items-center gap-3 mb-10">
                <span
                  className="font-mono text-[10px] font-bold tracking-[0.35em] uppercase"
                  style={{ color: "#00d4ff" }}
                >
                  04
                </span>
                <span
                  className="h-[1px] w-8"
                  style={{ background: "rgba(0,212,255,0.35)" }}
                />
                <span
                  className="font-serif text-3xl sm:text-4xl font-bold tracking-widest uppercase"
                  style={{ color: "#f0f0f0" }}
                >
                  Build Log
                </span>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <h2
                className="font-black tracking-tighter uppercase leading-[0.88] font-sans"
                style={{ fontSize: "clamp(2.4rem, 5vw, 4.5rem)" }}
              >
                <span style={{ color: "#f0f0f0" }}>BUILT</span>
                <br />
                <span style={{ color: "#f0f0f0" }}>UNDER</span>
                <br />
                <span
                  style={{
                    background: "linear-gradient(120deg, #00d4ff 0%, #a855f7 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  PRESSURE.
                </span>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-end">
            <Reveal delay={240}>
              <p
                className="font-light leading-relaxed max-w-lg mb-4"
                style={{
                  fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                  color: "#d4d4e0",
                }}
              >
                &ldquo;Six builds. Different problems. One deadline.&rdquo;
              </p>
              <div
                className="h-[1px] w-full"
                style={{ background: "rgba(255,255,255,0.06)" }}
              />
              <div className="mt-4 flex gap-8">
                <div>
                  <span className="block font-mono text-[10px] tracking-widest text-[#555566] uppercase">TYPE</span>
                  <span className="text-sm font-semibold text-[#aaaacc]">Hackathons</span>
                </div>
                <div>
                  <span className="block font-mono text-[10px] tracking-widest text-[#555566] uppercase">SPAN</span>
                  <span className="text-sm font-semibold text-[#aaaacc]">Aug 2025 - Apr 2026</span>
                </div>
              </div>
            </Reveal>
          </div>

        </div>

        {/* Timeline Path & Cards Container */}
        <div className="relative mt-12 md:mt-24">
          
          {/* Start Point */}
          <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 hidden lg:flex">
            <span className="font-mono text-[9px] tracking-[0.3em] text-[#00d4ff] font-bold">START</span>
            <span className="font-mono text-[9px] tracking-widest text-[#555566]">20 AUG 2025</span>
          </div>

          {/* Desktop SVG S-Path */}
          <div className="absolute inset-0 pointer-events-none hidden lg:block">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 1200"
              preserveAspectRatio="none"
              fill="none"
            >
              {/* Background faint path — very thin dots */}
              <path
                d={PATH_D}
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth="0.4"
                strokeDasharray="2 7"
              />

              {/* Active progressive path (uses SVG masking) */}
              <mask id="path-mask">
                <path
                  d={PATH_D}
                  stroke="white"
                  strokeWidth="3"
                  strokeDasharray={pathLength}
                  strokeDashoffset={reducedMotion ? 0 : pathLength * (1 - progress)}
                  fill="none"
                />
              </mask>
              <path
                ref={pathRef}
                d={PATH_D}
                stroke="#00d4ff"
                strokeWidth="0.4"
                strokeDasharray="2 7"
                mask="url(#path-mask)"
                style={{
                  filter: "drop-shadow(0 0 1.5px rgba(0, 212, 255, 0.4))",
                }}
              />

              {/* Nodes along the path */}
              {HACKATHONS.map((hack, index) => {
                const nodeX = hack.side === "right" ? 55 : 45;
                const nodeY = 100 + index * 200;
                const isActive = progress >= hack.threshold;

                return (
                  <g key={index} className="transition-all duration-500">
                    {/* Glow ring */}
                    <circle
                      cx={nodeX}
                      cy={nodeY}
                      r={isActive ? 5 : 0}
                      fill="none"
                      stroke="rgba(0, 212, 255, 0.15)"
                      strokeWidth="1"
                      className="animate-pulse"
                      style={{ transition: "all 0.5s ease" }}
                    />
                    {/* Node point */}
                    <circle
                      cx={nodeX}
                      cy={nodeY}
                      r={2.5}
                      fill={isActive ? "#00d4ff" : "#1e1e24"}
                      stroke={isActive ? "#ffffff" : "rgba(255, 255, 255, 0.1)"}
                      strokeWidth="0.8"
                      style={{ transition: "all 0.5s ease" }}
                    />
                    {/* Node text identifier */}
                    <text
                      x={hack.side === "right" ? nodeX + 6 : nodeX - 6}
                      y={nodeY + 2}
                      textAnchor={hack.side === "right" ? "start" : "end"}
                      fill={isActive ? "#00d4ff" : "#444455"}
                      className="font-mono font-bold"
                      style={{ fontSize: "5px", transition: "color 0.5s ease" }}
                    >
                      {hack.num}
                    </text>
                  </g>
                );
              })}

              {/* Scroll-tracked Active Travelling Dot */}
              {!reducedMotion && progress > 0 && progress < 1 && (
                <circle
                  cx={markerPos.x}
                  cy={markerPos.y}
                  r="3.5"
                  fill="#00d4ff"
                  style={{
                    filter: "drop-shadow(0 0 4px #00d4ff)",
                  }}
                />
              )}
            </svg>
          </div>

          {/* Desktop alternating cards grid */}
          <div className="hidden lg:grid grid-cols-12 relative z-10">
            {HACKATHONS.map((hack, index) => {
              const isActive = progress >= hack.threshold;
              
              return (
                <div
                  key={index}
                  className="col-span-12 grid grid-cols-12 items-center min-h-[200px] py-6"
                >
                  {/* Left Column for Left cards */}
                  <div className="col-span-5">
                    {hack.side === "left" && (
                      <Reveal delay={100}>
                        <HackathonCard hack={hack} active={isActive} />
                      </Reveal>
                    )}
                  </div>

                  {/* Center spacing representing S-path */}
                  <div className="col-span-2" />

                  {/* Right Column for Right cards */}
                  <div className="col-span-5">
                    {hack.side === "right" && (
                      <Reveal delay={100}>
                        <HackathonCard hack={hack} active={isActive} />
                      </Reveal>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile simplified vertical layout */}
          <div className="lg:hidden relative pl-6 border-l border-dashed border-white/10 flex flex-col gap-12">
            
            {/* Mobile progress line */}
            <div
              className="absolute left-[-1px] top-0 bottom-0 w-[2px] transition-all duration-300 pointer-events-none"
              style={{
                height: `${progress * 100}%`,
                background: "linear-gradient(to bottom, #00d4ff, #a855f7)",
                boxShadow: "0 0 8px rgba(0, 212, 255, 0.5)",
              }}
            />

            {HACKATHONS.map((hack, index) => {
              const isActive = progress >= hack.threshold;

              return (
                <div key={index} className="relative">
                  
                  {/* Node point */}
                  <div
                    className="absolute left-[-31px] top-[24px] w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-300"
                    style={{
                      background: isActive ? "#00d4ff" : "#080808",
                      borderColor: isActive ? "#ffffff" : "rgba(255,255,255,0.15)",
                      boxShadow: isActive ? "0 0 10px rgba(0, 212, 255, 0.4)" : "none",
                    }}
                  >
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#080808]" />
                    )}
                  </div>

                  <Reveal>
                    <HackathonCard hack={hack} active={isActive} />
                  </Reveal>

                </div>
              );
            })}
          </div>

          {/* End Point / Currently Building */}
          <div className="mt-16 lg:mt-24 flex flex-col items-center gap-3">
            <div className="flex items-center gap-3 select-none">
              <span
                className="w-2.5 h-2.5 rounded-full inline-block animate-ping"
                style={{
                  background: "#00d4ff",
                  boxShadow: "0 0 12px rgba(0, 212, 255, 0.6)",
                }}
              />
              <span
                className="font-mono text-xs font-bold tracking-[0.4em] uppercase"
                style={{ color: "#00d4ff" }}
              >
                CURRENTLY BUILDING
              </span>
              <span
                className="text-[#00d4ff] font-bold text-sm tracking-widest"
                style={{ animation: "bounceRight 2s infinite" }}
              >
                →
              </span>
            </div>
          </div>

        </div>

      </div>

      <style jsx global>{`
        @keyframes bounceRight {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(4px); }
        }
      `}</style>
    </section>
  );
}

// Single Hackathon placard component
function HackathonCard({ hack, active }: { hack: Hackathon; active: boolean }) {
  const [hovered, setHovered] = useState(false);

  // Project-based win configurations
  const isSalvus = hack.project.toLowerCase().includes("alvus");
  const isAgriGo = hack.project.toLowerCase().includes("agri");
  const isCampusMart = hack.project.toLowerCase().includes("campus");

  const resultColor = isAgriGo
    ? "#f59e0b" // Gold for Agri-Go
    : isSalvus
    ? "#a855f7" // Violet for $alvus
    : isCampusMart
    ? "#f43f5e" // Vibrant Rose for CampusMart
    : "rgba(255,255,255,0.7)";

  const resultBg = isAgriGo
    ? "rgba(245, 158, 11, 0.08)"
    : isSalvus
    ? "rgba(168, 85, 247, 0.08)"
    : isCampusMart
    ? "rgba(244, 63, 94, 0.08)"
    : "rgba(255, 255, 255, 0.03)";

  const themeColor = isAgriGo
    ? "#f59e0b"
    : isSalvus
    ? "#a855f7"
    : isCampusMart
    ? "#f43f5e"
    : "#00d4ff"; // Cyan for others

  const themeRgb = isAgriGo
    ? "245, 158, 11"
    : isSalvus
    ? "168, 85, 247"
    : isCampusMart
    ? "244, 63, 94"
    : "0, 212, 255";

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-xl border p-5 md:p-7 transition-all duration-300 ease-out select-none cursor-default"
      style={{
        background: hovered
          ? "rgba(10, 15, 30, 0.75)" // Rich Slate glass tint
          : active
          ? "rgba(255, 255, 255, 0.03)"
          : "rgba(255, 255, 255, 0.01)",
        borderColor: hovered
          ? themeColor
          : active
          ? `rgba(${themeRgb}, 0.25)`
          : "rgba(255, 255, 255, 0.05)",
        boxShadow: hovered
          ? `0 20px 40px -15px rgba(${themeRgb}, 0.22)`
          : "none",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        backdropFilter: "blur(12px)",
        opacity: active ? 1 : 0.55,
      }}
    >
      {/* Date & Index */}
      <div className="flex items-center justify-between mb-5">
        <span className="font-mono text-[10px] tracking-[0.25em] text-[#555566] uppercase">
          BUILD_{hack.num}
        </span>
        <span
          className="font-mono text-xs md:text-sm tracking-wider font-semibold"
          style={{
            color: hovered || active ? themeColor : "#888899",
            transition: "color 0.3s ease",
          }}
        >
          {hack.date}
        </span>
      </div>

      {/* Title & Location */}
      <div className="mb-6">
        <h3
          className="font-black tracking-tight uppercase leading-tight font-sans transition-colors duration-300"
          style={{
            fontSize: "clamp(1.3rem, 2vw, 1.8rem)",
            color: hovered || active ? "#ffffff" : "#cccccc",
          }}
        >
          {hack.event}
        </h3>
        {hack.subtitle && (
          <p className="font-mono text-xs tracking-wider text-[#888899] uppercase mt-1">
            {hack.subtitle}
          </p>
        )}
        <p className="font-mono text-[10px] md:text-xs tracking-widest text-[#666677] uppercase mt-1.5">
          {hack.location}
        </p>
      </div>

      {/* Connecting hairline divider */}
      <div
        className="w-full h-[1px] mb-6 transition-colors duration-300"
        style={{
          background: hovered || active ? `rgba(${themeRgb}, 0.18)` : "rgba(255, 255, 255, 0.05)",
        }}
      />

      {/* Project name (Visually Stronger) */}
      <div className="mb-5">
        <span className="block font-mono text-[9px] tracking-[0.35em] text-[#555566] uppercase mb-1">
          PROJECT
        </span>
        <p
          className="font-black tracking-tighter uppercase font-sans transition-all duration-300"
          style={{
            fontSize: "clamp(2rem, 4vw, 2.8rem)",
            color: hovered || active ? themeColor : "#888899",
            transform: hovered ? "translateX(4px)" : "none",
          }}
        >
          {hack.project}
        </p>
      </div>

      {/* Project Description */}
      <p
        className="text-sm md:text-base font-light leading-relaxed mb-7"
        style={{ color: "#aaaacc" }}
      >
        {hack.description}
      </p>

      {/* Achievement / Result Tag */}
      {hack.result && (
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-300"
          style={{
            background: resultBg,
            borderColor: hovered || active
              ? `rgba(${themeRgb}, 0.35)`
              : "rgba(255,255,255,0.05)",
            boxShadow: (hovered || active) && (isAgriGo || isSalvus || isCampusMart)
              ? `0 0 15px rgba(${themeRgb}, 0.15)`
              : "none",
          }}
        >
          <div className="flex flex-col">
            <span
              className="font-mono text-xs md:text-sm font-extrabold tracking-[0.25em] uppercase"
              style={{ color: resultColor }}
            >
              {hack.result}
            </span>
            {hack.team && (
              <span className="font-mono text-[9px] tracking-wider text-[#666677] uppercase mt-0.5">
                TEAM {hack.team}
              </span>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
