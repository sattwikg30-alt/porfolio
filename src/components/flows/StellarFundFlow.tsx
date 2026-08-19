"use client";
import React, { useEffect, useRef, useState } from "react";
const COLOR="#38bdf8",RGB="56,189,248";
const NODES=[
  {id:"campaign",label:"CAMPAIGN",       sub:"Created by project owner",       y:40 },
  {id:"stellar", label:"STELLAR/SOROBAN",sub:"Decentralised Testnet infra",     y:90},
  {id:"contract",label:"SMART CONTRACT", sub:"Enforces campaign rules",         y:140},
];
const WALLETS=[{x:85,label:"FREIGHTER"},{x:215,label:"ALBEDO"},{x:345,label:"xBULL"}];
const LOWER=[
  {id:"xlm",     label:"XLM FUNDING",     sub:"Native Stellar Lumens contributions", y:230},
  {id:"activity",label:"PUBLIC AUDIT",    sub:"Live transparent activity feed",      y:280},
];
export default function StellarFundFlow(){
  const [hov,setHov]=useState<string|null>(null);
  const [pT,setPT]=useState(0);const [rm,setRm]=useState(false);
  const raf=useRef<number>(0);const t0=useRef<number|null>(null);
  useEffect(()=>{const mq=window.matchMedia("(prefers-reduced-motion: reduce)");setRm(mq.matches);const h=(e:MediaQueryListEvent)=>setRm(e.matches);mq.addEventListener("change",h);return()=>mq.removeEventListener("change",h);},[]);
  useEffect(()=>{if(rm)return;const a=(ts:number)=>{if(!t0.current)t0.current=ts;setPT(((ts-t0.current)/4000)%1);raf.current=requestAnimationFrame(a);};raf.current=requestAnimationFrame(a);return()=>cancelAnimationFrame(raf.current);},[rm]);
  const CX=215,R=20,RW=18,WALLET_Y=185,firstY=NODES[0].y,lastY=LOWER[LOWER.length-1].y;
  const pY=(t:number)=>firstY+t*(lastY-firstY);
  const totalH=lastY+R+24;
  return(
    <svg viewBox={`0 0 430 ${totalH}`} style={{width:"100%",height:"100%",display:"block"}} fill="none"
      role="img" aria-label="StellarFund: Campaign→Stellar Soroban→Smart Contract→Donors(XLM)→Funding→Audit">
      <line x1={CX} y1={firstY} x2={CX} y2={lastY} stroke={`rgba(${RGB},0.15)`} strokeWidth="1.5" strokeDasharray="5 9"/>
      {!rm&&<circle cx={CX} cy={pY(pT)} r="5" fill={COLOR} style={{filter:`drop-shadow(0 0 8px ${COLOR})`}}/>}
      {/* Top 3 nodes */}
      {NODES.map((n,i)=>{const h=hov===n.id;const nxt=NODES[i+1];return(
        <g key={n.id} onMouseEnter={()=>setHov(n.id)} onMouseLeave={()=>setHov(null)} style={{cursor:"default"}}>
          <circle cx={CX} cy={n.y} r={h?R+10:R+3} fill="none" stroke={h?`rgba(${RGB},0.4)`:`rgba(${RGB},0.07)`} strokeWidth="1.5" style={{transition:"all 0.3s ease"}}/>
          <circle cx={CX} cy={n.y} r={h?R+3:R} fill={h?`rgba(${RGB},0.22)`:"rgba(8,8,20,0.95)"} stroke={h?COLOR:`rgba(${RGB},0.28)`} strokeWidth={h?"2":"1.5"} style={{transition:"all 0.3s ease"}}/>
          <line x1={CX+R} y1={n.y} x2={CX+R+14} y2={n.y} stroke={h?`rgba(${RGB},0.6)`:`rgba(${RGB},0.18)`} strokeWidth="1.5" style={{transition:"stroke 0.3s ease"}}/>
          <text x={CX+R+22} y={n.y-5} fill={h?"#c0e8ff":"#c4c4d8"} style={{fontSize:h?12:11,fontFamily:"monospace",fontWeight:"bold",letterSpacing:"0.1em",transition:"all 0.3s ease"}}>{n.label}</text>
          <text x={CX+R+22} y={n.y+8} fill={`rgba(${RGB},0.72)`} style={{fontSize:9.5,fontFamily:"monospace",opacity:h?1:0.35,transition:"opacity 0.3s ease"}}>{n.sub}</text>
          {nxt&&<text x={CX-5} y={(n.y+nxt.y)/2+4} fill={`rgba(${RGB},0.28)`} style={{fontSize:12}}>↓</text>}
        </g>);})}
      {/* Fan lines from last NODES node to wallets */}
      {WALLETS.map((w,i)=><line key={i} x1={w.x} y1={WALLET_Y} x2={CX} y2={LOWER[0].y-R} stroke={`rgba(${RGB},0.18)`} strokeWidth="0.8" strokeDasharray="3 6"/>)}
      {/* connector node3→wallets */}
      <line x1={CX} y1={NODES[2].y+R} x2={CX} y2={WALLET_Y-RW} stroke={`rgba(${RGB},0.12)`} strokeWidth="1" strokeDasharray="3 8"/>
      <text x={CX-5} y={(NODES[2].y+R+WALLET_Y)/2+5} fill={`rgba(${RGB},0.25)`} style={{fontSize:13}}>↓</text>
      {/* Wallet nodes */}
      {WALLETS.map((w,i)=>{const h=hov===`w${i}`;return(
        <g key={i} onMouseEnter={()=>setHov(`w${i}`)} onMouseLeave={()=>setHov(null)} style={{cursor:"default"}}>
          <circle cx={w.x} cy={WALLET_Y} r={h?RW+6:RW} fill={h?`rgba(${RGB},0.2)`:"rgba(8,8,20,0.95)"} stroke={h?COLOR:`rgba(${RGB},0.28)`} strokeWidth={h?"2":"1.5"} style={{transition:"all 0.3s ease"}}/>
          <text x={w.x} y={WALLET_Y+4} textAnchor="middle" fill={h?COLOR:`rgba(${RGB},0.55)`} style={{fontSize:8,fontFamily:"monospace",fontWeight:"bold",letterSpacing:"0.05em",transition:"fill 0.3s ease"}}>{w.label}</text>
        </g>);})}
      {/* Lower nodes */}
      {LOWER.map((n,i)=>{const h=hov===n.id,last=i===LOWER.length-1;return(
        <g key={n.id} onMouseEnter={()=>setHov(n.id)} onMouseLeave={()=>setHov(null)} style={{cursor:"default"}}>
          <circle cx={CX} cy={n.y} r={h?R+10:R+3} fill="none" stroke={h?`rgba(${RGB},0.4)`:`rgba(${RGB},0.07)`} strokeWidth="1.5" style={{transition:"all 0.3s ease"}}/>
          <circle cx={CX} cy={n.y} r={h?R+3:R} fill={h?`rgba(${RGB},0.22)`:last?`rgba(${RGB},0.12)`:"rgba(8,8,20,0.95)"} stroke={h?COLOR:last?`rgba(${RGB},0.5)`:`rgba(${RGB},0.28)`} strokeWidth={h?"2":"1.5"} style={{transition:"all 0.3s ease"}}/>
          <line x1={CX+R} y1={n.y} x2={CX+R+14} y2={n.y} stroke={h?`rgba(${RGB},0.6)`:`rgba(${RGB},0.18)`} strokeWidth="1.5" style={{transition:"stroke 0.3s ease"}}/>
          <text x={CX+R+22} y={n.y-5} fill={h?"#c0e8ff":"#c4c4d8"} style={{fontSize:h?12:11,fontFamily:"monospace",fontWeight:"bold",letterSpacing:"0.1em",transition:"all 0.3s ease"}}>{n.label}</text>
          <text x={CX+R+22} y={n.y+8} fill={`rgba(${RGB},0.72)`} style={{fontSize:9.5,fontFamily:"monospace",opacity:h?1:0.35,transition:"opacity 0.3s ease"}}>{n.sub}</text>
          {i===0&&<text x={CX-5} y={(n.y+LOWER[1].y)/2+4} fill={`rgba(${RGB},0.28)`} style={{fontSize:12}}>↓</text>}
        </g>);})}
    </svg>);
}
