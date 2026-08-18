"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navItems = [
  { name: "ABOUT", href: "#about" },
  { name: "SKILLS", href: "#skills" },
  { name: "EXPERIENCE", href: "#experience" },
  { name: "PROJECTS", href: "#projects" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${
        isScrolled
          ? "bg-[#08080a]/85 backdrop-blur-md border-b border-white/5 py-4"
          : "bg-transparent border-b border-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* LOGO / NAME */}
        <Link
          href="/"
          className="text-sm font-bold tracking-[0.25em] text-foreground hover:text-accent transition-colors duration-300 ease-out"
        >
          SATTWIK GHOSH
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative text-xs font-semibold tracking-widest text-[#a1a1aa] hover:text-foreground transition-colors duration-300 ease-out py-1 group"
            >
              {item.name}
              {/* Subtle Red Underline Slide Hover */}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-accent transition-all duration-300 ease-out group-hover:w-full" />
            </Link>
          ))}
          <Link
            href="#contact"
            className="text-xs font-semibold tracking-widest text-foreground border border-white/10 hover:border-accent hover:bg-accent px-5 py-2.5 rounded-full transition-all duration-300 ease-out"
          >
            CONTACT
          </Link>
        </nav>

        {/* MOBILE MENU TRIGGER */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex md:hidden text-foreground hover:text-accent transition-colors p-2 z-50 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? (
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="8" x2="20" y2="8"></line>
              <line x1="4" y1="16" x2="20" y2="16"></line>
            </svg>
          )}
        </button>
      </div>

      {/* MOBILE FULL-SCREEN OVERLAY */}
      <div
        className={`fixed inset-0 bg-[#08080a] z-40 flex flex-col justify-center px-8 md:hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-8 text-left mt-8">
          {navItems.map((item, idx) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative text-3xl font-bold tracking-widest text-[#a1a1aa] hover:text-accent transition-all duration-300 w-fit group"
              style={{
                transitionDelay: isMobileMenuOpen ? `${idx * 75}ms` : "0ms",
              }}
            >
              {item.name}
              <span className="absolute bottom-[-6px] left-0 w-0 h-[2.5px] bg-accent transition-all duration-300 ease-out group-hover:w-full" />
            </Link>
          ))}
          <Link
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="relative text-3xl font-bold tracking-widest text-accent hover:text-white transition-all duration-300 w-fit group"
            style={{
              transitionDelay: isMobileMenuOpen
                ? `${navItems.length * 75}ms`
                : "0ms",
            }}
          >
            CONTACT
            <span className="absolute bottom-[-6px] left-0 w-0 h-[2.5px] bg-white transition-all duration-300 ease-out group-hover:w-full" />
          </Link>
        </div>

        {/* Subtle Decorative Grid lines on mobile overlay */}
        <div className="absolute bottom-12 left-8 right-8 border-t border-white/5 pt-6 flex items-center justify-between text-[10px] tracking-widest text-[#71717a] uppercase">
          <span>Based in India</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </header>
  );
}
