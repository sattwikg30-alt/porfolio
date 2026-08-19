"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";

const SalvusFlow      = dynamic(() => import("@/components/flows/SalvusFlow"),      { ssr:false });
const AgriGoFlow      = dynamic(() => import("@/components/flows/AgriGoFlow"),      { ssr:false });
const CampusMartFlow  = dynamic(() => import("@/components/flows/CampusMartFlow"),  { ssr:false });
const StellarFundFlow = dynamic(() => import("@/components/flows/StellarFundFlow"), { ssr:false });
const StellarPayFlow  = dynamic(() => import("@/components/flows/StellarPayFlow"),  { ssr:false });
const VendorAIFlow    = dynamic(() => import("@/components/flows/VendorAIFlow"),    { ssr:false });

/* ------------------------------------------------------------------ */
/* Data                                                                 */
/* ------------------------------------------------------------------ */
interface Project {
  num:string; id:string; name:string; position:string; overview:string;
  features:string[]; stack:string[]; github:string; live:string;
  color:string; colorRgb:string; featured?:boolean;
}

const PROJECTS:Project[]=[
  {num:"01",id:"salvus",featured:true,
   name:"$ALVUS",position:"Emergency & Disaster Relief Stablecoin System",
   overview:"A blockchain-based emergency relief system that enforces transparent, rule-based distribution of aid via smart contracts. Funds are secured on-chain and spending is restricted to verified destinations — the project's core design goal is accountable, traceable relief.",
   features:["Donor contributions to aid campaigns","Smart contract fund security via Solidity","Beneficiary identity verification","Controlled spending via verified vendors","Full public on-chain audit trail"],
   stack:["SOLIDITY","HARDHAT","NEXT.JS","NODE.JS","MONGODB","POLYGON / EVM"],
   github:"https://github.com/Anurag8500/salvus1.git",live:"https://salvus0.vercel.app/",
   color:"#a855f7",colorRgb:"168,85,247"},
  {num:"02",id:"agrigo",
   name:"AGRIGO",position:"Climate-Aware Agriculture Intelligence",
   overview:"An agriculture intelligence platform combining environmental and agricultural data to estimate yield and provide actionable recommendations — analyzing climate, soil, rainfall, and temperature for smarter farming decisions.",
   features:["Expected yield estimation","Climate & rainfall analysis","Soil health scoring","Yield stability assessment","Smart farming recommendations"],
   stack:["NEXT.JS","PYTHON","TYPESCRIPT","TAILWIND CSS","AI / ML APIs"],
   github:"https://github.com/Anurag8500/agrigo-ai0.git",live:"https://agrigo-ai.vercel.app/",
   color:"#10b981",colorRgb:"16,185,129"},
  {num:"03",id:"campusmart",
   name:"CAMPUSMART",position:"Student-Centric Campus Marketplace",
   overview:"A campus marketplace for student-to-student buying, selling, renting, trading and auctioning. Features AI product-condition checking, real-time chat, seller verification, and Razorpay payment workflows.",
   features:["Buy, sell, rent & auction flow","AI product-condition check","Real-time messaging & offers","Seller verification","Razorpay + Cloudinary integration"],
   stack:["NEXT.JS","TYPESCRIPT","MONGODB","RAZORPAY","CLOUDINARY","GEMINI AI"],
   github:"https://github.com/Anurag8500/CampusMart-Innovatrix.git",live:"https://innovatrix-sigma.vercel.app/",
   color:"#f43f5e",colorRgb:"244,63,94"},
  {num:"04",id:"stellarfund",
   name:"STELLARFUND",position:"Decentralised Crowdfunding on Stellar",
   overview:"A decentralised crowdfunding platform on the Stellar network using Soroban smart contracts. Donors contribute XLM through Freighter, Albedo or xBull wallets — all activity is publicly visible on a live feed.",
   features:["Campaign creation & exploration","XLM donations via Soroban","Freighter / Albedo / xBull wallets","Live campaign leaderboard","Public activity & transaction feed"],
   stack:["NEXT.JS","TYPESCRIPT","SOROBAN","STELLAR SDK","FREIGHTER API"],
   github:"https://github.com/sattwikg30-alt/stellar-fund.git",live:"https://stellar-fund-rho.vercel.app/",
   color:"#38bdf8",colorRgb:"56,189,248"},
  {num:"05",id:"stellarpay",
   name:"STELLARPAY",position:"Fast XLM Payments on Stellar",
   overview:"A Stellar Testnet payment app for connecting a Freighter wallet, viewing live XLM balance, sending native XLM transfers, and browsing transaction history with sent/received filtering.",
   features:["Freighter wallet connection","Live XLM balance sync","Native XLM transfers","Address book support","Transaction history with filter"],
   stack:["NEXT.JS","TYPESCRIPT","STELLAR SDK","FREIGHTER API","TAILWIND CSS"],
   github:"https://github.com/sattwikg30-alt/Stellar-wallet-transaction.git",live:"https://stellarpay-now.vercel.app/",
   color:"#818cf8",colorRgb:"129,140,248"},
  {num:"06",id:"vendorai",
   name:"VENDORAI",position:"AI-Powered Hyperlocal Commerce",
   overview:"A hyperlocal marketplace connecting nearby buyers with verified local sellers using MongoDB geospatial filtering and AI-powered features — smart search, price suggestions, an AI chatbot, order tracking, and a return workflow.",
   features:["Geospatial hyperlocal discovery","Verified seller onboarding","AI-assisted search & chatbot","Smart price suggestions","Order tracking & returns"],
   stack:["NEXT.JS","TYPESCRIPT","MONGODB","GEMINI AI","RAZORPAY","FUSE.JS"],
   github:"https://github.com/sim675/DEvFusion.git",live:"https://vendorhub-ai.vercel.app/",
   color:"#f59e0b",colorRgb:"245,158,11"},
];

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */
function GitHubIcon({size=16,color="currentColor"}:{size?:number;color?:string}){
  return(
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}
function ExternalIcon({size=14,color="currentColor"}:{size?:number;color?:string}){
  return(
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Scroll reveal                                                        */
/* ------------------------------------------------------------------ */
function Reveal({children,delay=0}:{children:React.ReactNode;delay?:number}){
  const ref=useRef<HTMLDivElement>(null);
  const [visible,setVisible]=useState(false);
  useEffect(()=>{
    const el=ref.current;if(!el)return;
    if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){setTimeout(()=>setVisible(true),0);return;}
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setTimeout(()=>setVisible(true),delay);obs.disconnect();}},{threshold:0.06});
    obs.observe(el);return()=>obs.disconnect();
  },[delay]);
  return(
    <div ref={ref} style={{opacity:visible?1:0,transform:visible?"translateY(0)":"translateY(22px)",
      transition:"opacity 0.7s cubic-bezier(0.16,1,0.3,1),transform 0.7s cubic-bezier(0.16,1,0.3,1)"}}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Visualization dispatcher                                             */
/* ------------------------------------------------------------------ */
function ProjectVisualization({id}:{id:string}){
  switch(id){
    case"salvus":      return<SalvusFlow/>;
    case"agrigo":      return<AgriGoFlow/>;
    case"campusmart":  return<CampusMartFlow/>;
    case"stellarfund": return<StellarFundFlow/>;
    case"stellarpay":  return<StellarPayFlow/>;
    case"vendorai":    return<VendorAIFlow/>;
    default:return null;
  }
}

/* ------------------------------------------------------------------ */
/* CTA Buttons with icons                                              */
/* ------------------------------------------------------------------ */
function LiveButton({href,color,colorRgb}:{href:string;color:string;colorRgb:string}){
  const [hov,setHov]=useState(false);
  return(
    <a href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      className="inline-flex items-center gap-2.5 px-5 py-3 font-mono text-[11px] font-bold tracking-[0.18em] uppercase"
      style={{
        background:hov?color:`rgba(${colorRgb},0.12)`,
        color:hov?"#080808":color,
        transform:hov?"translateY(-3px) scale(1.03)":"translateY(0) scale(1)",
        boxShadow:hov?`0 8px 24px rgba(${colorRgb},0.4)`:"none",
        transition:"all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
        border:`1.5px solid ${hov?color:`rgba(${colorRgb},0.4)`}`,
        whiteSpace:"nowrap",
      }}
      aria-label="View live demo">
      <ExternalIcon size={13} color={hov?"#080808":color}/>
      VIEW LIVE
    </a>
  );
}
function GitHubButton({href,color,colorRgb}:{href:string;color:string;colorRgb:string}){
  const [hov,setHov]=useState(false);
  return(
    <a href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      className="inline-flex items-center gap-2.5 px-5 py-3 font-mono text-[11px] font-bold tracking-[0.18em] uppercase"
      style={{
        background:"transparent",
        color:hov?"#f0f0f0":"#888899",
        border:`1.5px solid ${hov?"rgba(255,255,255,0.35)":"rgba(255,255,255,0.12)"}`,
        transform:hov?"translateY(-3px) scale(1.03)":"translateY(0) scale(1)",
        boxShadow:hov?`0 8px 20px rgba(${colorRgb},0.15)`:"none",
        transition:"all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
        whiteSpace:"nowrap",
      }}
      aria-label="View source code on GitHub">
      <GitHubIcon size={14} color={hov?"#f0f0f0":"#888899"}/>
      VIEW CODE
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Project content panel                                               */
/* ------------------------------------------------------------------ */
function ProjectPanel({project,animKey}:{project:Project;animKey:number}){
  const {color,colorRgb,featured}=project;
  const [mounted,setMounted]=useState(false);
  useEffect(()=>{
    setMounted(false);
    const t=setTimeout(()=>setMounted(true),30);
    return()=>clearTimeout(t);
  },[animKey]);

  return(
    <div className="flex flex-col lg:flex-row h-full w-full" style={{
      opacity:mounted?1:0,
      transform:mounted?"scale(1) translateY(0)":"scale(0.97) translateY(12px)",
      transition:"opacity 0.45s cubic-bezier(0.34,1.56,0.64,1), transform 0.45s cubic-bezier(0.34,1.56,0.64,1)",
    }}>
      {/* ---- Content ---- */}
      <div className="flex flex-col justify-center gap-5 p-8 lg:p-10 xl:p-12 overflow-y-auto"
        style={{flex:"0 0 auto",width:"100%",maxWidth:520,scrollbarWidth:"none"}}>
        {/* Badge */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="font-mono text-[10px] font-bold tracking-[0.32em] uppercase" style={{color}}>
            {project.num}{featured?" / FEATURED":" / PROJECT"}
          </span>
          {featured&&(
            <span className="px-2.5 py-0.5 text-[9px] font-mono font-bold tracking-[0.2em] uppercase"
              style={{border:`1px solid ${color}`,color,background:`rgba(${colorRgb},0.1)`}}>FEATURED</span>
          )}
        </div>
        {/* Name */}
        <h3 className="font-black tracking-tighter uppercase leading-none font-sans"
          style={{fontSize:featured?"clamp(2.8rem,5vw,4.8rem)":"clamp(2.2rem,4vw,3.8rem)",color:"#f0f0f0"}}>
          {project.name}
        </h3>
        {/* Position */}
        <p className="font-mono text-xs tracking-[0.16em] uppercase" style={{color:`rgba(${colorRgb},0.75)`}}>
          {project.position}
        </p>
        {/* Divider */}
        <div style={{height:1,background:`rgba(${colorRgb},0.2)`}}/>
        {/* Overview */}
        <p className="font-light leading-relaxed"
          style={{fontSize:"clamp(0.88rem,1.4vw,1rem)",color:"#c0c0d4"}}>
          {project.overview}
        </p>
        {/* Features */}
        <div>
          <span className="block font-mono text-[9px] tracking-[0.28em] uppercase mb-2.5" style={{color:"#555566"}}>KEY CAPABILITIES</span>
          <ul className="flex flex-col gap-1.5">
            {project.features.map(f=>(
              <li key={f} className="flex items-start gap-2.5 text-sm" style={{color:"#aaaacc"}}>
                <span style={{color,marginTop:4,fontSize:6,flexShrink:0}}>◆</span>{f}
              </li>
            ))}
          </ul>
        </div>
        {/* Stack */}
        <div>
          <span className="block font-mono text-[9px] tracking-[0.28em] uppercase mb-2.5" style={{color:"#555566"}}>TECH STACK</span>
          <div className="flex flex-wrap gap-2">
            {project.stack.map(t=>(
              <span key={t} className="px-2.5 py-1 font-mono text-[9px] tracking-[0.12em] uppercase"
                style={{border:`1px solid rgba(${colorRgb},0.28)`,color:`rgba(${colorRgb},0.85)`,background:`rgba(${colorRgb},0.06)`}}>
                {t}
              </span>
            ))}
          </div>
        </div>
        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-3 pt-2">
          <LiveButton   href={project.live}   color={color} colorRgb={colorRgb}/>
          <GitHubButton href={project.github} color={color} colorRgb={colorRgb}/>
        </div>
      </div>

      {/* ---- Visualization ---- */}
      <div className="flex-1 p-6 lg:p-8 flex items-center justify-center" style={{minHeight:380,minWidth:0}}>
        <div className="relative w-full rounded-2xl overflow-hidden flex items-center justify-center"
          style={{
            background:"rgba(255,255,255,0.02)",
            border:`1px solid rgba(${colorRgb},0.2)`,
            height:"100%",minHeight:380,maxHeight:560,
          }}>
          <div style={{position:"absolute",top:0,right:0,width:"55%",height:"55%",pointerEvents:"none",
            background:`radial-gradient(circle at top right, rgba(${colorRgb},0.1) 0%, transparent 65%)`}}/>
          <div style={{width:"100%",height:"100%",padding:"1.25rem",boxSizing:"border-box",
            display:"flex",alignItems:"center",justifyContent:"center"}}>
            <ProjectVisualization id={project.id}/>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main section                                                         */
/* ------------------------------------------------------------------ */
export default function Projects(){
  const [active,setActive]=useState(0);
  const [animKey,setAnimKey]=useState(0);

  const goTo=useCallback((idx:number)=>{
    if(idx===active)return;
    setActive(idx);
    setAnimKey(k=>k+1);
  },[active]);

  const proj=PROJECTS[active];

  return(
    <section id="projects" className="relative w-full overflow-hidden" style={{background:"#080808"}}
      aria-label="Selected Projects">
      <div className="absolute top-0 inset-x-0 h-[1px]" style={{
        background:"linear-gradient(90deg,transparent,rgba(0,212,255,0.1) 30%,rgba(168,85,247,0.08) 70%,transparent)"}}/>
      {/* Ambient glows — shift on active change */}
      <div className="absolute inset-0 pointer-events-none" style={{transition:"all 0.8s ease"}}>
        <div style={{position:"absolute",top:"20%",right:0,width:"28vw",height:"28vw",
          background:`radial-gradient(circle,rgba(${proj.colorRgb},0.06) 0%,transparent 70%)`,
          filter:"blur(80px)",transition:"background 0.8s ease"}}/>
        <div style={{position:"absolute",bottom:"20%",left:0,width:"28vw",height:"28vw",
          background:`radial-gradient(circle,rgba(${proj.colorRgb},0.04) 0%,transparent 70%)`,
          filter:"blur(80px)",transition:"background 0.8s ease"}}/>
      </div>

      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 py-24 md:py-32 lg:py-40">

        {/* ---- Section Header ---- */}
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-[10px] font-bold tracking-[0.35em] uppercase" style={{color:"#00d4ff"}}>04</span>
            <span className="h-[1px] w-8" style={{background:"rgba(0,212,255,0.35)"}}/>
            <span className="font-serif text-3xl sm:text-4xl font-bold tracking-widest uppercase" style={{color:"#f0f0f0"}}>Projects</span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-14 md:mb-20">
          <div className="lg:col-span-5">
            <Reveal delay={100}>
              <h2 className="font-black tracking-tighter uppercase leading-[0.88] font-sans"
                style={{fontSize:"clamp(2.6rem,6vw,5rem)"}}>
                <span style={{color:"#f0f0f0"}}>THINGS</span><br/>
                <span style={{color:"#f0f0f0"}}>I&apos;VE</span><br/>
                <span style={{background:"linear-gradient(120deg,#00d4ff 0%,#a855f7 100%)",
                  WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>BUILT.</span>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7 flex flex-col justify-end">
            <Reveal delay={200}>
              <p className="font-light leading-relaxed max-w-xl mb-5"
                style={{fontSize:"clamp(1rem,1.8vw,1.2rem)",color:"#d4d4e0"}}>
                A collection of products, experiments and systems built around real problems.
              </p>
              <div style={{height:1,background:"rgba(255,255,255,0.06)",marginBottom:16}}/>
              <div className="flex gap-8">
                <div><span className="block font-mono text-[10px] tracking-widest text-[#555566] uppercase">PROJECTS</span><span className="text-sm font-semibold text-[#aaaacc]">06 Selected</span></div>
                <div><span className="block font-mono text-[10px] tracking-widest text-[#555566] uppercase">DOMAINS</span><span className="text-sm font-semibold text-[#aaaacc]">Web3 · AI · Marketplace</span></div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ---- Desktop Horizontal Tab Switcher ---- */}
        <Reveal delay={300}>
          <div className="hidden lg:block">
            {/* Tabs */}
            <div className="flex border-b" style={{borderColor:"rgba(255,255,255,0.07)"}}>
              {PROJECTS.map((p,i)=>{
                const isActive=active===i;
                return(
                  <button key={p.id} onClick={()=>goTo(i)}
                    className="relative flex flex-col items-start gap-0.5 py-4 px-4 xl:px-5 transition-all duration-300"
                    style={{
                      flex:isActive?2.5:1,
                      borderBottom:`2px solid ${isActive?p.color:"transparent"}`,
                      background:isActive?`rgba(${p.colorRgb},0.07)`:"transparent",
                      cursor:"pointer",minWidth:0,
                    }}
                    aria-pressed={isActive}>
                    <span className="font-mono whitespace-nowrap overflow-hidden" style={{
                      fontSize:9,letterSpacing:"0.28em",
                      color:isActive?p.color:"#444455",transition:"color 0.3s ease",
                    }}>{p.num}</span>
                    <span className="font-black uppercase overflow-hidden text-ellipsis whitespace-nowrap w-full" style={{
                      fontSize:isActive?13:11,
                      color:isActive?"#f0f0f0":"#555566",transition:"all 0.3s ease",
                    }}>{p.name}</span>
                    {isActive&&(
                      <div style={{position:"absolute",bottom:0,left:0,right:0,height:2,
                        background:`linear-gradient(90deg,transparent,rgba(${p.colorRgb},0.6),transparent)`,
                        filter:"blur(1.5px)"}}/>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Panel */}
            <div className="relative rounded-b-2xl overflow-hidden" style={{
              borderLeft:`1px solid rgba(${proj.colorRgb},0.18)`,
              borderRight:`1px solid rgba(${proj.colorRgb},0.18)`,
              borderBottom:`1px solid rgba(${proj.colorRgb},0.18)`,
              minHeight:540,
              background:"rgba(8,8,20,0.65)",
              backdropFilter:"blur(14px)",
              transition:"border-color 0.6s ease",
            }}>
              <ProjectPanel project={proj} animKey={animKey}/>
            </div>

            {/* Dot nav */}
            <div className="mt-4 flex items-center gap-3">
              <span className="font-mono text-[10px] tracking-widest" style={{color:proj.color}}>
                {String(active+1).padStart(2,"0")}&nbsp;/&nbsp;{String(PROJECTS.length).padStart(2,"0")}
              </span>
              <div className="flex gap-1.5 ml-1">
                {PROJECTS.map((p,i)=>(
                  <button key={p.id} onClick={()=>goTo(i)} aria-label={`Go to project ${p.num}`}
                    style={{
                      width:active===i?28:6,height:3,borderRadius:9999,border:"none",padding:0,cursor:"pointer",
                      background:active===i?p.color:"rgba(255,255,255,0.12)",
                      transition:"all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
                    }}/>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* ---- Mobile stacked layout ---- */}
        <div className="lg:hidden flex flex-col gap-14">
          {PROJECTS.map((p)=>(
            <article key={p.id} aria-labelledby={`m-proj-${p.id}`}>
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span className="font-mono text-[10px] font-bold tracking-[0.32em] uppercase" style={{color:p.color}}>
                  {p.num}{p.featured?" / FEATURED":" / PROJECT"}
                </span>
                {p.featured&&(
                  <span className="px-2 py-0.5 text-[9px] font-mono font-bold tracking-[0.2em] uppercase"
                    style={{border:`1px solid ${p.color}`,color:p.color,background:`rgba(${p.colorRgb},0.08)`}}>FEATURED</span>
                )}
              </div>
              <h3 id={`m-proj-${p.id}`} className="font-black tracking-tighter uppercase leading-none font-sans mb-2"
                style={{fontSize:"clamp(2rem,9vw,3rem)",color:"#f0f0f0"}}>{p.name}</h3>
              <p className="font-mono text-[10px] tracking-[0.16em] uppercase mb-4" style={{color:`rgba(${p.colorRgb},0.75)`}}>{p.position}</p>
              <div className="rounded-xl mb-5 overflow-hidden flex items-center justify-center"
                style={{border:`1px solid rgba(${p.colorRgb},0.2)`,background:"rgba(255,255,255,0.02)",height:320,padding:"1.25rem"}}>
                <ProjectVisualization id={p.id}/>
              </div>
              <p className="font-light leading-relaxed mb-4 text-sm" style={{color:"#c0c0d4"}}>{p.overview}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {p.stack.map(t=>(
                  <span key={t} className="px-2 py-0.5 font-mono text-[9px] tracking-[0.1em] uppercase"
                    style={{border:`1px solid rgba(${p.colorRgb},0.25)`,color:`rgba(${p.colorRgb},0.8)`,background:`rgba(${p.colorRgb},0.05)`}}>{t}</span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <LiveButton   href={p.live}   color={p.color} colorRgb={p.colorRgb}/>
                <GitHubButton href={p.github} color={p.color} colorRgb={p.colorRgb}/>
              </div>
              <div className="mt-10" style={{height:1,background:"rgba(255,255,255,0.04)"}}/>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
