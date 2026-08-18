"use client";

import React, { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/* Scroll-reveal wrapper                                                */
/* ------------------------------------------------------------------ */
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

    // Respect prefers-reduced-motion
    const reduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisible(true);
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
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Keyword — inline span with hover accent                              */
/* ------------------------------------------------------------------ */
function Kw({ children }: { children: React.ReactNode }) {
  const [hover, setHover] = useState(false);
  return (
    <span
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        color: hover ? "#00d4ff" : "inherit",
        transition: "color 0.25s ease",
        cursor: "default",
      }}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Profile block data                                                   */
/* ------------------------------------------------------------------ */
type BlockVariant = "text" | "labels" | "cluster" | "stack";

interface Block {
  num: string;
  title: string;
  variant: BlockVariant;
  lines: string[];
}

const BLOCKS: Block[] = [
  {
    num: "01",
    title: "Education",
    variant: "text",
    lines: [
      "B.Tech — CSE",
      "Heritage Institute",
      "of Technology",
    ],
  },
  {
    num: "02",
    title: "What I Build",
    variant: "labels",
    lines: [
      "FULL-STACK APPS",
      "WEB3 / BLOCKCHAIN",
      "DIGITAL PRODUCTS",
      "HACKATHON BUILDS",
    ],
  },
  {
    num: "03",
    title: "Interests",
    variant: "cluster",
    lines: [
      "WEB3",
      "BLOCKCHAIN",
      "CYBERSECURITY",
      "AI",
      "SOFTWARE ENGINEERING",
    ],
  },
  {
    num: "04",
    title: "Currently",
    variant: "stack",
    lines: [
      "Building projects",
      "Exploring new tech",
      "Joining hackathons",
      "Learning by doing",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Individual profile block                                             */
/* ------------------------------------------------------------------ */
function ProfileBlock({ item }: { item: Block }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative flex flex-col h-full px-6 py-8 transition-colors duration-300 cursor-default"
      style={{
        background: hover ? "rgba(0,212,255,0.025)" : "transparent",
      }}
    >
      {/* Accent left border on hover */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-300"
        style={{
          background: hover
            ? "linear-gradient(to bottom, #00d4ff, rgba(168,85,247,0.6))"
            : "transparent",
        }}
      />

      {/* Number + title */}
      <div className="flex items-baseline gap-3 mb-5">
        <span
          className="font-mono text-[11px] font-bold tracking-[0.25em] transition-colors duration-300"
          style={{ color: hover ? "#00d4ff" : "rgba(0,212,255,0.45)" }}
        >
          {item.num}
        </span>
        <span className="h-[1px] w-4 bg-white/10 flex-shrink-0 self-center" />
        <span
          className="text-[11px] font-mono tracking-[0.2em] uppercase transition-colors duration-300"
          style={{ color: hover ? "#f0f0f0" : "#888899" }}
        >
          {item.title}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1">
        {item.variant === "text" &&
          item.lines.map((line, i) => (
            <p
              key={i}
              className="leading-snug transition-colors duration-300"
              style={{
                fontSize: i === 0 ? "1.05rem" : "0.85rem",
                fontWeight: i === 0 ? 700 : 400,
                color: i === 0 ? "#f0f0f0" : "#888899",
                marginBottom: i < item.lines.length - 1 ? "0.3rem" : 0,
              }}
            >
              {line}
            </p>
          ))}

        {item.variant === "labels" && (
          <div className="flex flex-col gap-2.5">
            {item.lines.map((line, i) => (
              <div key={i} className="flex items-center gap-2.5 group/label">
                <div
                  className="w-1 h-1 rounded-full flex-shrink-0 transition-all duration-300"
                  style={{
                    background: hover ? "#00d4ff" : "rgba(255,255,255,0.2)",
                    boxShadow: hover ? "0 0 6px rgba(0,212,255,0.5)" : "none",
                  }}
                />
                <span
                  className="text-[11px] font-bold tracking-[0.18em] uppercase transition-colors duration-300"
                  style={{ color: hover ? "#f0f0f0" : "#aaaabb" }}
                >
                  {line}
                </span>
              </div>
            ))}
          </div>
        )}

        {item.variant === "cluster" && (
          <div className="flex flex-wrap gap-x-2 gap-y-1">
            {item.lines.map((line, i) => (
              <React.Fragment key={i}>
                <span
                  className="text-[12px] font-semibold tracking-wide transition-colors duration-200"
                  style={{ color: hover ? "#f0f0f0" : "#aaaabb" }}
                >
                  {line}
                </span>
                {i < item.lines.length - 1 && (
                  <span
                    className="text-[12px] transition-colors duration-300"
                    style={{ color: hover ? "rgba(0,212,255,0.5)" : "#333344" }}
                  >
                    /
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {item.variant === "stack" &&
          item.lines.map((line, i) => (
            <p
              key={i}
              className="text-sm leading-relaxed transition-colors duration-300"
              style={{
                color: hover ? "#f0f0f0" : "#888899",
                marginBottom: i < item.lines.length - 1 ? "0.4rem" : 0,
              }}
            >
              {line}
            </p>
          ))}
      </div>

      {/* Bottom micro-indicator */}
      <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2">
        <div
          className="w-1 h-1 rounded-full transition-all duration-500"
          style={{
            background: hover ? "#00d4ff" : "rgba(255,255,255,0.1)",
            boxShadow: hover ? "0 0 8px rgba(0,212,255,0.6)" : "none",
          }}
        />
        <span className="text-[9px] font-mono tracking-[0.2em] text-[#555566] uppercase">
          {hover ? "Active" : "Overview"}
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main About section                                                   */
/* ------------------------------------------------------------------ */
export default function About() {
  const stagger = [0, 120, 240, 360, 480, 600, 780];

  return (
    <section
      id="about"
      className="relative w-full overflow-hidden"
      style={{ background: "#080808" }}
    >
      {/* ── subtle top rule divider from Hero ── */}
      <div
        className="absolute top-0 inset-x-0 h-[1px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,212,255,0.12) 30%, rgba(168,85,247,0.1) 70%, transparent)",
        }}
      />

      {/* ── faint nebula glows ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0"
          style={{
            width: "38vw",
            height: "38vw",
            background:
              "radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute bottom-0 left-0"
          style={{
            width: "32vw",
            height: "32vw",
            background:
              "radial-gradient(circle, rgba(0,212,255,0.055) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-32 lg:py-40">

        {/* ======================================================== */}
        {/* TOP — asymmetric two-column intro                          */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 mb-20 md:mb-28">

          {/* LEFT — label + headline */}
          <div className="lg:col-span-5">
            <Reveal delay={stagger[0]}>
              {/* Section label */}
              <div className="flex items-center gap-3 mb-10">
                <span
                  className="font-mono text-[10px] font-bold tracking-[0.35em] uppercase"
                  style={{ color: "#00d4ff" }}
                >
                  01
                </span>
                <span
                  className="h-[1px] w-8"
                  style={{ background: "rgba(0,212,255,0.35)" }}
                />
                <span
                  className="font-mono text-[10px] font-bold tracking-[0.35em] uppercase"
                  style={{ color: "#888899" }}
                >
                  About Me
                </span>
              </div>
            </Reveal>

            <Reveal delay={stagger[1]}>
              <h2
                className="font-black tracking-tighter uppercase leading-[0.88] font-sans mb-8"
                style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
              >
                <span style={{ color: "#f0f0f0" }}>Building</span>
                <br />
                <span style={{ color: "#f0f0f0" }}>with code.</span>
                <br />
                <span
                  style={{
                    background:
                      "linear-gradient(120deg, #00d4ff 0%, #a855f7 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Exploring
                </span>
                <br />
                <span
                  style={{
                    background:
                      "linear-gradient(120deg, #00d4ff 0%, #a855f7 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  what&apos;s next.
                </span>
              </h2>
            </Reveal>

            {/* Decorative vertical line — desktop only */}
            <Reveal delay={stagger[2]}>
              <div
                className="hidden lg:block w-[1px] h-20 mt-4"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(0,212,255,0.3), transparent)",
                }}
              />
            </Reveal>
          </div>

          {/* RIGHT — main introduction */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <Reveal delay={stagger[2]}>
              {/* Top thin rule */}
              <div
                className="h-[1px] w-full mb-8"
                style={{ background: "rgba(255,255,255,0.06)" }}
              />

              <p
                className="leading-[1.85] font-light"
                style={{
                  fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
                  color: "#d4d4e0",
                }}
              >
                I&apos;m a{" "}
                <Kw>Computer Science student</Kw> and developer who enjoys
                turning ideas into practical digital products. I work across{" "}
                <Kw>full-stack development</Kw> and{" "}
                <Kw>Web3</Kw>, and I like learning by building &mdash; through
                projects, experiments, <Kw>hackathons</Kw>, and real-world
                problem solving.
              </p>

              {/* Bottom thin rule */}
              <div
                className="h-[1px] w-full mt-8"
                style={{ background: "rgba(255,255,255,0.06)" }}
              />

              {/* Small context row */}
              <div className="mt-6 flex flex-wrap gap-6">
                {[
                  { label: "Based in", value: "India" },
                  { label: "Focus", value: "Full-Stack & Web3" },
                  { label: "Status", value: "Open to opportunities" },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col gap-0.5">
                    <span
                      className="font-mono text-[9px] tracking-[0.25em] uppercase"
                      style={{ color: "#555566" }}
                    >
                      {item.label}
                    </span>
                    <span
                      className="text-[13px] font-semibold"
                      style={{ color: "#aaaacc" }}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* ======================================================== */}
        {/* MIDDLE — four profile blocks, separated by 1px grid lines */}
        {/* ======================================================== */}
        <Reveal delay={stagger[3]}>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-20 md:mb-28"
            style={{
              border: "1px solid rgba(255,255,255,0.05)",
              gap: "1px",
              background: "rgba(255,255,255,0.05)",
            }}
          >
            {BLOCKS.map((block) => (
              <div
                key={block.num}
                style={{ background: "#080808" }}
              >
                <ProfileBlock item={block} />
              </div>
            ))}
          </div>
        </Reveal>

        {/* ======================================================== */}
        {/* BOTTOM — personal statement                               */}
        {/* ======================================================== */}
        <Reveal delay={stagger[5]}>
          <div className="max-w-5xl">
            {/* Label */}
            <div className="flex items-center gap-3 mb-8">
              <span
                className="font-mono text-[10px] font-bold tracking-[0.35em] uppercase"
                style={{ color: "#00d4ff" }}
              >
                —
              </span>
              <span
                className="font-mono text-[10px] font-bold tracking-[0.35em] uppercase"
                style={{ color: "#555566" }}
              >
                Philosophy
              </span>
            </div>

            {/* Large personal statement */}
            <p
              className="font-bold tracking-tight leading-[1.1]"
              style={{ fontSize: "clamp(1.8rem, 4.5vw, 3.5rem)", color: "#f0f0f0" }}
            >
              I like learning technologies{" "}
              <br className="hidden sm:block" />
              by{" "}
              <span
                style={{
                  background:
                    "linear-gradient(120deg, #00d4ff 0%, #a855f7 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                building things
              </span>{" "}
              with them.
            </p>

            {/* Small sub-note */}
            <p
              className="mt-6 text-sm font-light leading-relaxed max-w-md"
              style={{ color: "#555566" }}
            >
              Not just studying concepts &mdash; actually shipping them. That&apos;s
              how I learn what works.
            </p>
          </div>
        </Reveal>
      </div>

      {/* ── subtle bottom rule ── */}
      <div
        className="absolute bottom-0 inset-x-0 h-[1px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(168,85,247,0.1) 40%, rgba(0,212,255,0.08) 70%, transparent)",
        }}
      />
    </section>
  );
}
