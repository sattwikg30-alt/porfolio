"use client";
import React, { useState, useEffect } from "react";

function ArrowUpIcon({ size = 14, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  );
}

export default function Footer() {
  const [hovered, setHovered] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full border-t border-white/5 bg-[#060606] py-12 md:py-16 overflow-hidden">
      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 inset-x-0 h-40 pointer-events-none" style={{
        background: "radial-gradient(circle at bottom center, rgba(0, 212, 255, 0.02) 0%, transparent 70%)"
      }} />

      <div className="max-w-none px-6 md:px-12 lg:px-20 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left column - copyright */}
        <div className="flex flex-col gap-1.5 text-center md:text-left">
          <span className="font-mono text-[10px] tracking-[0.25em] text-[#444455] uppercase">
            © 2026 SATTWIK GHOSH
          </span>
          <span className="text-[12px] text-[#666677] tracking-wide">
            All rights reserved. Built with Next.js &amp; Turbopack.
          </span>
        </div>

        {/* Middle column - statement */}
        <div className="hidden lg:block text-center">
          <span className="font-mono text-[9px] tracking-[0.3em] text-[#333344] uppercase">
            DESIGNED &amp; ENGINEERED FROM THE GROUND UP
          </span>
        </div>

        {/* Right column - Back to top */}
        <div className="flex items-center gap-6">
          <button
            onClick={scrollToTop}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="flex items-center gap-2 px-4 py-2.5 font-mono text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300"
            style={{
              border: `1px solid ${hovered ? "#00d4ff" : "rgba(255,255,255,0.08)"}`,
              background: hovered ? "rgba(0, 212, 255, 0.05)" : "transparent",
              color: hovered ? "#00d4ff" : "#888899",
              cursor: "pointer",
            }}
            aria-label="Scroll back to top"
          >
            BACK TO TOP
            <span className="transition-transform duration-300" style={{
              transform: hovered ? "translateY(-3px)" : "translateY(0)"
            }}>
              <ArrowUpIcon size={12} />
            </span>
          </button>
        </div>

      </div>
    </footer>
  );
}
