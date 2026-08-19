"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Portrait from "./Portrait";

/* ------------------------------------------------------------------ */
/* Static star data — SSR-safe, no hydration mismatch                  */
/* ------------------------------------------------------------------ */
const STARS = Array.from({ length: 130 }, (_, i) => ({
  id: i,
  top: `${((i * 17 + 7) % 100)}%`,
  left: `${((i * 31 + 13) % 100)}%`,
  size: ((i * 7) % 3) + 1,
  duration: `${(((i * 11) % 4) + 2)}s`,
  delay: `${((i * 3) % 6)}s`,
  minOp: "0.06",
  maxOp: `${(((i * 13) % 7) + 3) / 10}`,
  glow: i % 7 === 0, // every 7th star gets a cyan glow
}));

const SHOOTING_STARS = [
  { top: "12%", left: "8%",  width: "200px", duration: "7s",  delay: "1s" },
  { top: "52%", left: "68%", width: "140px", duration: "10s", delay: "4s" },
  { top: "28%", left: "38%", width: "170px", duration: "8s",  delay: "12s" },
];

export default function Hero() {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      setMouseOffset({ x, y });
    };
    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] flex flex-col justify-between pt-32 pb-8 px-6 md:px-16 lg:px-24 w-full max-w-none overflow-hidden"
      style={{ background: "#080808" }}
    >
      {/* ============================================================ */}
      {/* BACKGROUND LAYER: subtle vignette + tiny nebula glows         */}
      {/* ============================================================ */}

      {/* Radial vignette — keeps edges truly black */}
      <div
        className="absolute inset-0 pointer-events-none -z-30"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 50%, #000 100%)",
        }}
      />

      {/* Cyan nebula — top-left, very faint */}
      <div
        className="absolute pointer-events-none -z-20"
        style={{
          top: "5%", left: "-5%",
          width: "55vw", height: "55vw",
          background:
            "radial-gradient(circle, rgba(0,212,255,0.055) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      {/* Violet nebula — bottom-right */}
      <div
        className="absolute pointer-events-none -z-20"
        style={{
          bottom: "0%", right: "-5%",
          width: "45vw", height: "45vw",
          background:
            "radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      {/* ============================================================ */}
      {/* TWINKLING STAR FIELD                                          */}
      {/* ============================================================ */}
      <div
        className="absolute inset-0 pointer-events-none -z-10 overflow-hidden"
        style={{
          transform: `translate3d(${mouseOffset.x * -10}px,${
            mouseOffset.y * -10 - scrollY * 0.07
          }px,0)`,
          transition: "transform 0.5s cubic-bezier(0.25,1,0.5,1)",
        }}
      >
        {STARS.map((s) => (
          <span
            key={s.id}
            className="star"
            style={{
              top: s.top,
              left: s.left,
              width: `${s.size}px`,
              height: `${s.size}px`,
              "--twinkle-duration": s.duration,
              "--twinkle-delay": s.delay,
              "--star-min-opacity": s.minOp,
              "--star-max-opacity": s.maxOp,
              ...(s.glow && {
                background: "#00d4ff",
                boxShadow: "0 0 5px 1px rgba(0,212,255,0.55)",
              }),
            } as React.CSSProperties}
          />
        ))}

        {SHOOTING_STARS.map((ss, i) => (
          <span
            key={i}
            className="shooting-star"
            style={{
              top: ss.top,
              left: ss.left,
              width: ss.width,
              "--shoot-duration": ss.duration,
              "--shoot-delay": ss.delay,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* ============================================================ */}
      {/* GHOST BACKGROUND NAME                                         */}
      {/* ============================================================ */}
      <div
        className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none select-none -z-10 overflow-hidden"
        style={{
          transform: `translate3d(${mouseOffset.x * -22}px,${
            mouseOffset.y * -22 - scrollY * 0.12
          }px,0)`,
          transition: "transform 0.3s cubic-bezier(0.25,1,0.5,1)",
        }}
      >
        {/* Ghost "SATTWIK" */}
        <div
          className="text-[18vw] font-black tracking-tighter leading-[0.75] uppercase text-center scale-y-[1.2] font-sans w-full"
          style={{
            WebkitTextStroke: "1px rgba(0,212,255,0.1)",
            color: "transparent",
          }}
        >
          SATTWIK
        </div>
        {/* Ghost "GHOSH" */}
        <div
          className="text-[18vw] font-black tracking-tighter leading-[0.75] uppercase text-center scale-y-[1.2] font-sans w-full"
          style={{
            marginTop: "-1vw",
            WebkitTextStroke: "1px rgba(168,85,247,0.1)",
            color: "transparent",
          }}
        >
          GHOSH
        </div>
      </div>

      {/* ============================================================ */}
      {/* MAIN CONTENT GRID                                             */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center my-auto w-full relative z-10 pt-4">

        {/* LEFT — 7 cols */}
        <div className="lg:col-span-7 flex flex-col text-left justify-center z-20">

          {/* Greeting */}
          <div className="overflow-hidden mb-2">
            <span
              className="inline-block font-script text-4xl md:text-5xl pl-1 tracking-wide animate-reveal-up"
              style={{ color: "#00d4ff", animationDelay: "100ms" }}
            >
              Hello, I&apos;m
            </span>
          </div>

          {/* Name — SATTWIK white, GHOSH cyan→violet gradient */}
          <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-[110px] xl:text-[125px] font-black tracking-tighter leading-[0.78] uppercase mb-8 font-sans select-none">
            <span className="block overflow-hidden">
              <span
                className="inline-block animate-reveal-up text-white"
                style={{ animationDelay: "200ms" }}
              >
                SATTWIK
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                className="inline-block animate-reveal-up"
                style={{
                  background: "linear-gradient(120deg, #00d4ff 0%, #a855f7 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animationDelay: "300ms",
                }}
              >
                GHOSH
              </span>
            </span>
          </h2>

          {/* Role */}
          <div className="overflow-hidden mb-6">
            <span
              className="inline-block text-xs md:text-sm font-bold tracking-[0.25em] uppercase animate-reveal-up"
              style={{ color: "#00d4ff", animationDelay: "400ms" }}
            >
              FULL-STACK DEVELOPER &amp; WEB3 BUILDER
            </span>
          </div>

          {/* Description */}
          <div className="max-w-md md:max-w-lg mb-8 overflow-hidden">
            <p
              className="text-xs md:text-[14px] leading-relaxed animate-reveal-up"
              style={{ color: "#888899", animationDelay: "500ms" }}
            >
              Computer Science student and developer building full-stack
              applications, exploring Web3, and turning ideas into practical
              digital products.
            </p>
          </div>

          {/* CTA buttons */}
          <div
            className="flex flex-wrap gap-4 mb-10 animate-reveal-up"
            style={{ animationDelay: "600ms" }}
          >
            {/* Primary — solid cyan */}
            <Link
              href="#projects"
              className="group/btn relative px-8 py-4 text-black text-[11px] font-bold tracking-widest uppercase transition-all duration-300 ease-out flex items-center gap-2 overflow-hidden"
              style={{ background: "#00d4ff" }}
            >
              <span
                className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                style={{ background: "#33ddff" }}
              />
              <span className="relative z-10 flex items-center gap-2">
                VIEW MY WORK
                <span className="inline-block transition-transform duration-300 group-hover/btn:translate-x-1.5">→</span>
              </span>
            </Link>

            {/* Secondary — ghost */}
            <Link
              href="#contact"
              className="group/btn px-8 py-4 text-[11px] font-bold tracking-widest uppercase transition-all duration-300 ease-out flex items-center gap-2"
              style={{
                border: "1px solid rgba(0,212,255,0.3)",
                color: "#f0f0f0",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "#00d4ff";
                el.style.background = "rgba(0,212,255,0.07)";
                el.style.color = "#00d4ff";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "rgba(0,212,255,0.3)";
                el.style.background = "";
                el.style.color = "#f0f0f0";
              }}
            >
              GET IN TOUCH
              <span className="inline-block transition-transform duration-300 group-hover/btn:translate-x-1.5">→</span>
            </Link>

            {/* Resume — violet ghost */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn px-8 py-4 text-[11px] font-bold tracking-widest uppercase transition-all duration-300 ease-out flex items-center gap-2"
              style={{
                border: "1px solid rgba(168,85,247,0.3)",
                color: "#f0f0f0",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "#a855f7";
                el.style.background = "rgba(168,85,247,0.07)";
                el.style.color = "#a855f7";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "rgba(168,85,247,0.3)";
                el.style.background = "";
                el.style.color = "#f0f0f0";
              }}
            >
              RESUME
              <span className="inline-block transition-transform duration-300 group-hover/btn:translate-y-[-2px] group-hover/btn:translate-x-[2px]">↗</span>
            </a>
          </div>

          {/* Status */}
          <div
            className="flex items-center gap-3 text-[10px] font-mono tracking-widest animate-reveal-up"
            style={{ color: "#888899", animationDelay: "700ms" }}
          >
            <svg
              className="w-4 h-4"
              style={{
                color: "#00d4ff",
                animation: "orbitSpin 14s linear infinite",
              }}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <ellipse cx="12" cy="12" rx="4" ry="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
            </svg>
            <span>AVAILABLE WORLDWIDE</span>
          </div>
        </div>

        {/* RIGHT — 5 cols */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center gap-8 z-20">

          {/* Sparkle badge */}
          <div
            className="flex items-center gap-4 animate-fade-in w-full max-w-[280px] sm:max-w-[340px] lg:max-w-none"
            style={{
              animationDelay: "750ms",
              transform: `translate3d(${mouseOffset.x * 5}px,${mouseOffset.y * 5}px,0)`,
              transition: "transform 0.4s cubic-bezier(0.25,1,0.5,1)",
            }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 hover:rotate-45 transition-transform duration-500"
              style={{ border: "1px solid rgba(0,212,255,0.2)" }}
            >
              <svg
                className="w-4 h-4 animate-pulse"
                style={{ color: "#00d4ff" }}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L14.7 9.3L22 12L14.7 14.7L12 22L9.3 14.7L2 12L9.3 9.3L12 2Z" />
              </svg>
            </div>
            <p className="text-[11px] leading-relaxed max-w-[200px]" style={{ color: "#888899" }}>
              Turning ideas into powerful digital experiences.
            </p>
          </div>

          {/* Portrait */}
          <div
            className="w-full flex justify-center lg:justify-end"
            style={{
              transform: `translate3d(${mouseOffset.x * 13}px,${mouseOffset.y * 13}px,0)`,
              transition: "transform 0.3s cubic-bezier(0.25,1,0.5,1)",
            }}
          >
            <Portrait />
          </div>

          {/* Stats */}
          <div
            className="flex flex-col gap-4 pt-6 w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[380px] animate-fade-in font-sans"
            style={{
              borderTop: "1px solid rgba(0,212,255,0.1)",
              animationDelay: "850ms",
              transform: `translate3d(${mouseOffset.x * 7}px,${mouseOffset.y * 7}px,0)`,
              transition: "transform 0.3s cubic-bezier(0.25,1,0.5,1)",
            }}
          >
            {[
              { val: "CSE",  sub1: "COMPUTER SCIENCE", sub2: "STUDENT" },
              { val: "WEB3", sub1: "DECENTRALIZED",   sub2: "BUILDER" },
              { val: "HACK", sub1: "HACKATHON",        sub2: "BUILDER" },
            ].map((row, i) => (
              <div
                key={row.val}
                className="flex items-center gap-4 pb-2.5"
                style={{
                  borderBottom:
                    i < 2 ? "1px solid rgba(255,255,255,0.05)" : "none",
                }}
              >
                <span
                  className="text-3xl font-extrabold leading-none min-w-[70px]"
                  style={{ color: "#00d4ff" }}
                >
                  {row.val}
                </span>
                <div
                  className="flex flex-col font-mono text-[8px] tracking-widest"
                  style={{ color: "#888899" }}
                >
                  <span>{row.sub1}</span>
                  <span className="font-bold text-white">{row.sub2}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* FOOTER ROW                                                    */}
      {/* ============================================================ */}
      <div
        className="w-full flex items-center justify-between pt-4 text-[9px] tracking-widest uppercase animate-fade-in font-mono"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          color: "#888899",
          animationDelay: "1000ms",
        }}
      >
        <span className="hidden sm:inline">STUDENT PORTFOLIO // INDIA</span>

        <div className="mx-auto sm:mx-0 flex items-center gap-2 group cursor-pointer">
          <span
            className="font-bold tracking-[0.25em] transition-colors duration-300 group-hover:text-[#00d4ff]"
          >
            SCROLL TO EXPLORE
          </span>
          <svg
            className="w-3.5 h-3.5 animate-float group-hover:text-[#00d4ff] transition-colors duration-300"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>

        <span className="hidden sm:inline">
          © {new Date().getFullYear()} SATTWIK GHOSH
        </span>
      </div>
    </section>
  );
}
