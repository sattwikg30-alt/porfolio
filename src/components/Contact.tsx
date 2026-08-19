"use client";
import React, { useState, useEffect, useRef } from "react";

/* ------------------------------------------------------------------ */
/* Icons                                                              */
/* ------------------------------------------------------------------ */
function ArrowUpRight({ size = 16, color = "currentColor", className = "" }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

function SendIcon({ size = 14, color = "currentColor", className = "" }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function CheckIcon({ size = 20, color = "currentColor", className = "" }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function MailIcon({ size = 16, color = "currentColor", className = "" }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function PhoneIcon({ size = 16, color = "currentColor", className = "" }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MapPinIcon({ size = 16, color = "currentColor", className = "" }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function GitHubIcon({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Scroll Reveal                                                      */
/* ------------------------------------------------------------------ */
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
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

/* ------------------------------------------------------------------ */
/* Editable Contact Data                                              */
/* ------------------------------------------------------------------ */
const CONTACT_DATA = {
  email: "sattwikg40@gmail.com",
  phone: "+91 93828 01839",
  location: "Kolkata, India",
  github: "https://github.com/sattwikg30-alt",
  linkedin: "https://www.linkedin.com/in/sattwik-ghosh-6b21b5392/"
};

/* ------------------------------------------------------------------ */
/* Typographic Contact Info block                                      */
/* ------------------------------------------------------------------ */
function InfoRow({ label, value, href, isSocial = false, icon }: { label: string; value: string; href?: string; isSocial?: boolean; icon?: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);

  const content = (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col py-6 border-b border-white/5 group transition-colors duration-300"
    >
      <span className="font-mono text-[9px] tracking-[0.25em] text-[#555566] uppercase mb-1.5 transition-colors duration-300 group-hover:text-[#00d4ff]">
        {label}
      </span>
      <div className="flex items-center justify-between">
        <span className="text-base font-medium tracking-wide text-[#aaaacc] transition-colors duration-300 group-hover:text-[#ffffff] flex items-center gap-2">
          {icon && <span className="opacity-60 group-hover:opacity-100 transition-opacity duration-300">{icon}</span>}
          {value}
        </span>
        {href && (
          <ArrowUpRight
            size={16}
            className="text-[#555566] transition-all duration-300 transform group-hover:text-[#00d4ff] group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target={isSocial ? "_blank" : undefined} rel={isSocial ? "noopener noreferrer" : undefined} className="block w-full">
        {content}
      </a>
    );
  }

  return content;
}

/* ------------------------------------------------------------------ */
/* Main Contact Section Component                                     */
/* ------------------------------------------------------------------ */
export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [btnHover, setBtnHover] = useState(false);

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address";
    }
    if (!formData.subject.trim()) tempErrors.subject = "Subject is required";
    if (!formData.message.trim()) tempErrors.message = "Message cannot be empty";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    // Simulate mock submission delay
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden"
      style={{ background: "#080808" }}
      aria-label="Get In Touch"
    >
      {/* Top divider */}
      <div
        className="absolute top-0 inset-x-0 h-[1px]"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.08) 30%, rgba(168,85,247,0.08) 70%, transparent)",
        }}
      />

      {/* Decorative ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 right-0"
          style={{
            width: "35vw",
            height: "35vw",
            background: "radial-gradient(circle, rgba(0,212,255,0.03) 0%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />
        <div
          className="absolute top-1/4 left-1/4"
          style={{
            width: "45vw",
            height: "45vw",
            background: "radial-gradient(circle, rgba(168,85,247,0.02) 0%, transparent 75%)",
            filter: "blur(100px)",
          }}
        />
      </div>

      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 py-24 md:py-32 lg:py-40">
        
        {/* Section Header */}
        <Reveal>
          <div className="flex items-center gap-3 mb-12">
            <span className="font-mono text-[10px] font-bold tracking-[0.35em] uppercase" style={{ color: "#00d4ff" }}>
              05
            </span>
            <span className="h-[1px] w-8" style={{ background: "rgba(0,212,255,0.35)" }} />
            <span className="font-serif text-3xl sm:text-4xl font-bold tracking-widest uppercase" style={{ color: "#f0f0f0" }}>
              Get In Touch
            </span>
          </div>
        </Reveal>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* LEFT — Editorial Info */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full min-h-[480px]">
            <div>
              <Reveal delay={100}>
                <h2
                  className="font-black tracking-tighter uppercase leading-[0.88] font-sans mb-8"
                  style={{ fontSize: "clamp(2.6rem, 6vw, 4.8rem)" }}
                >
                  <span style={{ color: "#f0f0f0" }}>LET&apos;S BUILD</span>
                  <br />
                  <span style={{ color: "#f0f0f0" }}>SOMETHING</span>
                  <br />
                  <span
                    style={{
                      background: "linear-gradient(120deg, #00d4ff 0%, #a855f7 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    TOGETHER.
                  </span>
                </h2>
              </Reveal>

              <Reveal delay={200}>
                <p className="font-light leading-relaxed max-w-sm text-[#aaaacc] mb-12" style={{ fontSize: "1.05rem" }}>
                  Have an idea, project, collaboration, or just want to talk tech? I&apos;d love to hear from you.
                </p>
              </Reveal>

              <Reveal delay={300}>
                <div className="flex flex-col">
                  <InfoRow label="EMAIL" value={CONTACT_DATA.email} href={`mailto:${CONTACT_DATA.email}`} icon={<MailIcon size={16} />} />
                  <InfoRow label="PHONE" value={CONTACT_DATA.phone} href={`tel:${CONTACT_DATA.phone}`} icon={<PhoneIcon size={16} />} />
                  <InfoRow label="LOCATION" value={CONTACT_DATA.location} icon={<MapPinIcon size={16} />} />
                  <InfoRow label="GITHUB" value="GitHub Profile" href={CONTACT_DATA.github} isSocial icon={<GitHubIcon size={16} />} />
                  <InfoRow label="LINKEDIN" value="LinkedIn Connection" href={CONTACT_DATA.linkedin} isSocial icon={<LinkedInIcon size={16} />} />
                </div>
              </Reveal>
            </div>

            {/* Bottom mini statement */}
            <Reveal delay={400}>
              <div className="mt-16 pt-6 border-t border-white/5">
                <span className="font-mono text-[9px] tracking-[0.3em] text-[#555566] uppercase">
                  OPEN TO BUILDING SOMETHING MEANINGFUL.
                </span>
              </div>
            </Reveal>
          </div>

          {/* RIGHT — Interactive Form */}
          <div className="lg:col-span-7">
            <Reveal delay={150}>
              <div
                className="p-8 md:p-10 rounded-2xl border"
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  borderColor: "rgba(255, 255, 255, 0.06)",
                  backdropFilter: "blur(12px)",
                }}
              >
                {status === "success" ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center border mb-6"
                      style={{
                        borderColor: "#00d4ff",
                        background: "rgba(0, 212, 255, 0.08)",
                        boxShadow: "0 0 20px rgba(0, 212, 255, 0.15)",
                      }}
                    >
                      <CheckIcon size={28} color="#00d4ff" />
                    </div>
                    <h3 className="text-xl font-bold uppercase tracking-wider text-white mb-2">Message Sent</h3>
                    <p className="text-sm text-[#888899] max-w-xs leading-relaxed">
                      Thank you! Your message has been received successfully. I&apos;ll get back to you shortly.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-8 px-5 py-2 font-mono text-[10px] font-bold tracking-widest text-[#00d4ff] uppercase border border-[#00d4ff]/30 hover:border-[#00d4ff] hover:bg-[#00d4ff]/5 transition-all duration-300"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
                    
                    {/* Name input */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="font-mono text-[10px] tracking-[0.2em] text-[#888899] uppercase">
                        YOUR NAME
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={status === "submitting"}
                        placeholder="John Doe"
                        className="w-full bg-transparent border border-white/10 px-4 py-3 text-sm text-white focus:outline-none transition-all duration-300 placeholder:text-[#333344] focus:border-[#00d4ff]"
                        style={{
                          borderRadius: "4px",
                          boxShadow: "none",
                        }}
                      />
                      {errors.name && (
                        <span className="text-xs text-red-500 font-mono tracking-wide mt-1" role="alert">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    {/* Email input */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="font-mono text-[10px] tracking-[0.2em] text-[#888899] uppercase">
                        YOUR EMAIL
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={status === "submitting"}
                        placeholder="john@example.com"
                        className="w-full bg-transparent border border-white/10 px-4 py-3 text-sm text-white focus:outline-none transition-all duration-300 placeholder:text-[#333344] focus:border-[#00d4ff]"
                        style={{
                          borderRadius: "4px",
                        }}
                      />
                      {errors.email && (
                        <span className="text-xs text-red-500 font-mono tracking-wide mt-1" role="alert">
                          {errors.email}
                        </span>
                      )}
                    </div>

                    {/* Subject input */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="subject" className="font-mono text-[10px] tracking-[0.2em] text-[#888899] uppercase">
                        SUBJECT
                      </label>
                      <input
                        id="subject"
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        disabled={status === "submitting"}
                        placeholder="Project Collaboration"
                        className="w-full bg-transparent border border-white/10 px-4 py-3 text-sm text-white focus:outline-none transition-all duration-300 placeholder:text-[#333344] focus:border-[#00d4ff]"
                        style={{
                          borderRadius: "4px",
                        }}
                      />
                      {errors.subject && (
                        <span className="text-xs text-red-500 font-mono tracking-wide mt-1" role="alert">
                          {errors.subject}
                        </span>
                      )}
                    </div>

                    {/* Message textarea */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="message" className="font-mono text-[10px] tracking-[0.2em] text-[#888899] uppercase">
                        YOUR MESSAGE
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        disabled={status === "submitting"}
                        placeholder="Hello, I'd like to discuss a project..."
                        className="w-full bg-transparent border border-white/10 px-4 py-3 text-sm text-white focus:outline-none transition-all duration-300 placeholder:text-[#333344] focus:border-[#00d4ff] resize-none"
                        style={{
                          borderRadius: "4px",
                        }}
                      />
                      {errors.message && (
                        <span className="text-xs text-red-500 font-mono tracking-wide mt-1" role="alert">
                          {errors.message}
                        </span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      onMouseEnter={() => setBtnHover(true)}
                      onMouseLeave={() => setBtnHover(false)}
                      className="mt-4 flex items-center justify-center gap-2.5 px-6 py-4 font-mono text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 relative overflow-hidden"
                      style={{
                        background: status === "submitting" ? "rgba(255,255,255,0.03)" : "rgba(0, 212, 255, 0.1)",
                        color: "#00d4ff",
                        border: "1.5px solid #00d4ff",
                        borderRadius: "4px",
                        cursor: status === "submitting" ? "not-allowed" : "pointer",
                        transform: btnHover && status !== "submitting" ? "translateY(-2px)" : "translateY(0)",
                        boxShadow: btnHover && status !== "submitting" ? "0 8px 24px rgba(0, 212, 255, 0.2)" : "none",
                      }}
                    >
                      {status === "submitting" ? (
                        <>
                          <span className="w-1.5 h-1.5 bg-[#00d4ff] rounded-full animate-ping" />
                          SENDING...
                        </>
                      ) : (
                        <>
                          SEND MESSAGE
                          <span
                            className="transition-transform duration-300 transform"
                            style={{
                              transform: btnHover ? "translate(3px, -3px)" : "translate(0)",
                              display: "inline-flex",
                            }}
                          >
                            <SendIcon size={14} />
                          </span>
                        </>
                      )}
                    </button>
                    
                  </form>
                )}
              </div>
            </Reveal>
          </div>

        </div>

      </div>
    </section>
  );
}
