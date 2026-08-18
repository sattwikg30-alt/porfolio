"use client";

import React, { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/* Scroll-reveal wrapper (same pattern as About)                        */
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
        transition:
          "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Animated GPA bar                                                     */
/* ------------------------------------------------------------------ */
function GpaBar({
  label,
  gpa,
  max = 10,
  delay = 0,
  color = "#00d4ff",
}: {
  label: string;
  gpa: number;
  max?: number;
  delay?: number;
  color?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [filled, setFilled] = useState(false);
  const [hover, setHover] = useState(false);
  const pct = (gpa / max) * 100;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setFilled(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className="group cursor-default"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex items-baseline justify-between mb-2">
        <span
          className="font-mono text-[10px] tracking-[0.25em] uppercase transition-colors duration-300"
          style={{ color: hover ? "#f0f0f0" : "#888899" }}
        >
          {label}
        </span>
        <span
          className="font-black font-mono text-xl transition-all duration-300"
          style={{ color: hover ? color : "#f0f0f0" }}
        >
          {gpa.toFixed(2)}
          <span className="text-[11px] font-normal ml-1" style={{ color: "#555566" }}>
            / {max}
          </span>
        </span>
      </div>

      {/* Bar track */}
      <div
        className="relative h-[3px] rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.06)" }}
      >
        {/* Filled portion */}
        <div
          className="absolute left-0 top-0 h-full rounded-full"
          style={{
            width: filled ? `${pct}%` : "0%",
            background: `linear-gradient(90deg, ${color}, ${
              color === "#00d4ff" ? "#a855f7" : "#00d4ff"
            })`,
            transition: "width 1.2s cubic-bezier(0.16,1,0.3,1)",
            boxShadow: filled
              ? `0 0 8px 1px ${color}60`
              : "none",
          }}
        />
        {/* Glowing dot at tip */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-all duration-300"
          style={{
            left: filled ? `calc(${pct}% - 4px)` : "0%",
            background: color,
            boxShadow: filled
              ? `0 0 10px 3px ${color}80`
              : "none",
            opacity: filled ? 1 : 0,
            transition:
              "left 1.2s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease",
          }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Stat pill                                                            */
/* ------------------------------------------------------------------ */
function StatPill({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="flex flex-col gap-1 px-5 py-4 transition-all duration-300 cursor-default"
      style={{
        border: `1px solid ${hover ? "rgba(0,212,255,0.35)" : "rgba(255,255,255,0.06)"}`,
        background: hover ? "rgba(0,212,255,0.04)" : "transparent",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span
        className="font-black font-mono text-3xl leading-none transition-colors duration-300"
        style={{ color: hover ? "#00d4ff" : "#f0f0f0" }}
      >
        {value}
      </span>
      <span
        className="font-mono text-[11px] tracking-[0.25em] uppercase transition-colors duration-300"
        style={{ color: hover ? "#aaaacc" : "#555566" }}
      >
        {label}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main Education section                                               */
/* ------------------------------------------------------------------ */
export default function Education() {
  return (
    <section
      id="education"
      className="relative w-full overflow-hidden"
      style={{ background: "#080808" }}
    >
      {/* Top rule */}
      <div
        className="absolute top-0 inset-x-0 h-[1px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,212,255,0.1) 40%, rgba(168,85,247,0.08) 70%, transparent)",
        }}
      />

      {/* Nebula glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2"
          style={{
            width: "40vw",
            height: "40vw",
            background:
              "radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-none px-6 md:px-12 lg:px-20 py-24 md:py-32 lg:py-40">

        {/* ======================================================== */}
        {/* HEADER ROW                                                */}
        {/* ======================================================== */}
        <Reveal delay={0}>
          <div className="flex items-center gap-3 mb-14 md:mb-20">
            <span
              className="font-mono text-[10px] font-bold tracking-[0.35em] uppercase"
              style={{ color: "#00d4ff" }}
            >
              02
            </span>
            <span
              className="h-[1px] w-8"
              style={{ background: "rgba(0,212,255,0.35)" }}
            />
            <span
              className="font-serif text-3xl sm:text-4xl font-bold tracking-widest uppercase"
              style={{ color: "#f0f0f0" }}
            >
              Education
            </span>
          </div>
        </Reveal>

        {/* ======================================================== */}
        {/* MAIN CONTENT GRID                                         */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          {/* LEFT — college identity */}
          <div className="lg:col-span-5 flex flex-col gap-8">

            <Reveal delay={80}>
              {/* Degree badge */}
              <div
                className="inline-flex items-center gap-2.5 px-4 py-2 mb-2"
                style={{ border: "1px solid rgba(0,212,255,0.2)" }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: "#00d4ff",
                    boxShadow: "0 0 8px 2px rgba(0,212,255,0.6)",
                  }}
                />
                <span
                  className="font-mono text-[10px] tracking-[0.25em] uppercase font-bold"
                  style={{ color: "#00d4ff" }}
                >
                  B.Tech &mdash; Undergraduate
                </span>
              </div>

              {/* College name */}
              <h2
                className="font-black tracking-tight leading-[0.9] uppercase font-sans"
                style={{
                  fontSize: "clamp(1.8rem, 4vw, 3rem)",
                  color: "#f0f0f0",
                }}
              >
                Heritage
                <br />
                Institute of
                <br />
                <span
                  style={{
                    background:
                      "linear-gradient(120deg, #00d4ff 0%, #a855f7 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Technology
                </span>
              </h2>
            </Reveal>

            <Reveal delay={160}>
              {/* Department block */}
              <div
                className="relative pl-5"
                style={{
                  borderLeft: "2px solid rgba(0,212,255,0.25)",
                }}
              >
                <p
                  className="font-mono text-[11px] tracking-[0.25em] uppercase mb-2"
                  style={{ color: "#555566" }}
                >
                  Department
                </p>
                <p
                  className="text-base leading-relaxed font-semibold"
                  style={{ color: "#d4d4e0" }}
                >
                  Internet of Things &amp; Cybersecurity
                  <br />
                  <span style={{ color: "#888899", fontWeight: 400 }}>
                    including Blockchain
                  </span>
                </p>
                <div
                  className="mt-3 inline-block px-2.5 py-1"
                  style={{
                    border: "1px solid rgba(168,85,247,0.25)",
                    background: "rgba(168,85,247,0.06)",
                  }}
                >
                  <span
                    className="font-mono text-[10px] tracking-[0.3em] uppercase font-bold"
                    style={{ color: "#a855f7" }}
                  >
                    IOTCS
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={240}>
              {/* Stat pills row */}
              <div className="flex flex-wrap gap-[1px]" style={{ background: "rgba(255,255,255,0.05)" }}>
                <StatPill value="2024" label="Enrolled" />
                <StatPill value="2028" label="Graduating" />
                <StatPill value="CSE" label="Stream" />
              </div>
            </Reveal>

          </div>

          {/* RIGHT — academic performance */}
          <div className="lg:col-span-7 flex flex-col gap-10">

            <Reveal delay={200}>
              <div
                className="p-8 lg:p-10"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {/* GPA section header */}
                <div className="flex items-center justify-between mb-1">
                  <span
                    className="font-mono text-[11px] tracking-[0.3em] uppercase"
                    style={{ color: "#555566" }}
                  >
                    Academic Performance
                  </span>
                  <span
                    className="font-mono text-[10px] tracking-[0.2em] uppercase"
                    style={{ color: "#333344" }}
                  >
                    Scale / 10
                  </span>
                </div>
                <div
                  className="h-[1px] w-full mb-8"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                />

                {/* Year bars */}
                <div className="flex flex-col gap-9">
                  <GpaBar
                    label="Year 1 — YGPA"
                    gpa={9.39}
                    delay={400}
                    color="#00d4ff"
                  />
                  <GpaBar
                    label="Year 2 — YGPA"
                    gpa={9.64}
                    delay={600}
                    color="#a855f7"
                  />
                </div>
              </div>


            </Reveal>

            <Reveal delay={500}>
              {/* Key info grid */}
              <div
                className="h-[1px] w-full mb-8"
                style={{ background: "rgba(255,255,255,0.05)" }}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    icon: "🔐",
                    title: "Cybersecurity Focus",
                    desc: "Specialized curriculum covering network security, cryptography, and ethical hacking fundamentals.",
                  },
                  {
                    icon: "⛓",
                    title: "Blockchain Track",
                    desc: "Hands-on exposure to distributed ledger architecture, smart contracts, and decentralized systems.",
                  },
                ].map((item) => {
                  return <InfoCard key={item.title} {...item} />;
                })}
              </div>
            </Reveal>

          </div>
        </div>
      </div>

      {/* Bottom rule */}
      <div
        className="absolute bottom-0 inset-x-0 h-[1px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,212,255,0.08) 50%, transparent)",
        }}
      />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Info card (sub-component)                                            */
/* ------------------------------------------------------------------ */
function InfoCard({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="flex flex-col gap-2.5 p-4 transition-all duration-300 cursor-default"
      style={{
        border: `1px solid ${
          hover ? "rgba(0,212,255,0.25)" : "rgba(255,255,255,0.06)"
        }`,
        background: hover ? "rgba(0,212,255,0.03)" : "transparent",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span className="text-xl leading-none">{icon}</span>
      <p
        className="text-sm font-bold tracking-wide uppercase transition-colors duration-300 mt-1"
        style={{ color: hover ? "#00d4ff" : "#f0f0f0" }}
      >
        {title}
      </p>
      <p
        className="text-[14px] leading-relaxed transition-colors duration-300"
        style={{ color: "#888899" }}
      >
        {desc}
      </p>
    </div>
  );
}
