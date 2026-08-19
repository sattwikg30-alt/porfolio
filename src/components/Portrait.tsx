"use client";

import React from "react";

interface PortraitProps {
  style?: React.CSSProperties;
}

export default function Portrait({ style }: PortraitProps) {
  return (
    <div
      style={style}
      className="relative w-full max-w-[320px] sm:max-w-[420px] lg:max-w-[480px] xl:max-w-[520px] aspect-square mx-auto group transition-all duration-300 ease-out"
    >
      {/* Outermost slow dashed tilt ring */}
      <div
        className="absolute -inset-10 rounded-full pointer-events-none orbit-spin-slow"
        style={{
          border: "1px dashed rgba(0,212,255,0.15)",
          transform: "rotateX(68deg)",
        }}
      />

      {/* Cyan spinning ring + glowing dot */}
      <div
        className="absolute -inset-6 rounded-full pointer-events-none orbit-spin"
        style={{ border: "1px solid rgba(0,212,255,0.25)" }}
      >
        {/* orbiting dot */}
        <div
          className="absolute w-2.5 h-2.5 rounded-full"
          style={{
            top: "50%",
            left: "-5px",
            marginTop: "-5px",
            background: "#00d4ff",
            boxShadow: "0 0 12px 4px rgba(0,212,255,0.7)",
          }}
        />
      </div>

      {/* Violet counter-spin ring + glowing dot */}
      <div
        className="absolute -inset-3 rounded-full pointer-events-none orbit-spin-reverse"
        style={{ border: "1px solid rgba(168,85,247,0.22)" }}
      >
        <div
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            top: "0%",
            left: "50%",
            marginLeft: "-3px",
            background: "#a855f7",
            boxShadow: "0 0 8px 3px rgba(168,85,247,0.6)",
          }}
        />
      </div>

      {/* Main portrait circle */}
      <div
        className="relative w-full h-full overflow-hidden rounded-full flex items-center justify-center animate-clip-reveal [clip-path:circle(50%_at_50%_50%)]"
        style={{ background: "#0a0a0a" }}
      >
        {/* Portrait image */}
        <img
          src="https://res.cloudinary.com/dzjn1u0ln/image/upload/v1787104281/WhatsApp_Image_2026-08-19_at_7.18.54_AM_1_snfm9h.jpg"
          alt="Sattwik Ghosh"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.04]"
        />

        {/* Cyan spotlight top-left */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(0,212,255,0.35), transparent 65%)",
          }}
        />

        {/* Bottom dark fade */}
        <div
          className="absolute bottom-0 inset-x-0 h-2/5 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(8,8,8,0.85), transparent)",
          }}
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.04,
            backgroundImage:
              "linear-gradient(to right,#00d4ff 1px,transparent 1px),linear-gradient(to bottom,#00d4ff 1px,transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Crosshair lines */}
        <div className="absolute top-1/2 left-0 right-0 h-[1px] pointer-events-none"
          style={{ background: "rgba(0,212,255,0.12)" }} />
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] pointer-events-none"
          style={{ background: "rgba(0,212,255,0.12)" }} />

        {/* Inner coordinate circles */}
        <div className="absolute inset-10 border rounded-full pointer-events-none"
          style={{ borderColor: "rgba(0,212,255,0.1)" }} />
        <div className="absolute inset-20 border rounded-full pointer-events-none"
          style={{ borderColor: "rgba(168,85,247,0.08)" }} />

        {/* Focus brackets */}
        <div className="absolute top-1/4 left-1/4 w-5 h-5 border-t-2 border-l-2 transition-transform duration-500 group-hover:-translate-x-1.5 group-hover:-translate-y-1.5"
          style={{ borderColor: "rgba(0,212,255,0.65)" }} />
        <div className="absolute top-1/4 right-1/4 w-5 h-5 border-t-2 border-r-2 transition-transform duration-500 group-hover:translate-x-1.5 group-hover:-translate-y-1.5"
          style={{ borderColor: "rgba(0,212,255,0.65)" }} />
        <div className="absolute bottom-1/4 left-1/4 w-5 h-5 border-b-2 border-l-2 transition-transform duration-500 group-hover:-translate-x-1.5 group-hover:translate-y-1.5"
          style={{ borderColor: "rgba(0,212,255,0.65)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-5 h-5 border-b-2 border-r-2 transition-transform duration-500 group-hover:translate-x-1.5 group-hover:translate-y-1.5"
          style={{ borderColor: "rgba(0,212,255,0.65)" }} />

        {/* Coordinate label */}
        <span className="absolute top-[26%] left-1/2 -translate-x-1/2 text-[7px] font-mono tracking-widest uppercase select-none z-10"
          style={{ color: "rgba(0,212,255,0.35)" }}>
          23.54°N · 87.31°E
        </span>

        {/* Bottom name plate */}
        <div className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-1.5 z-10 select-none">
          <span className="text-xs font-black tracking-[0.25em] text-white group-hover:text-[#00d4ff] transition-colors duration-300">
            SATTWIK GHOSH
          </span>
        </div>

        {/* Hover glint */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg,rgba(0,212,255,0.06),transparent 60%,rgba(168,85,247,0.06))",
          }}
        />

        {/* Ring highlight */}
        <div className="absolute inset-0 pointer-events-none rounded-full"
          style={{ boxShadow: "inset 0 0 0 1px rgba(0,212,255,0.12)" }} />
      </div>

      {/* Nebula glow behind portrait */}
      <div
        className="absolute inset-0 rounded-full nebula-pulse pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(circle, rgba(0,212,255,0.28) 0%, rgba(168,85,247,0.12) 50%, transparent 72%)",
          filter: "blur(32px)",
        }}
      />
    </div>
  );
}