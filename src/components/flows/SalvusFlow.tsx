"use client";
import React, { useEffect, useRef, useState } from "react";
const COLOR="#a855f7",RGB="168,85,247";
const NODES=[
  {id:"donor",   label:"DONOR",         sub:"Contributes to relief campaign",   icon:"◎"},
  {id:"campaign",label:"CAMPAIGN",       sub:"Aid campaign created & tracked",   icon:"▣"},
  {id:"contract",label:"SMART CONTRACT", sub:"Solidity rules enforced on-chain", icon:"⬡"},
  {id:"verify",  label:"BENEFICIARY",   sub:"Identity confirmed before release", icon:"◈"},
  {id:"vendor",  label:"VERIFIED VENDOR",sub:"Pre-approved purchase point",      icon:"▦"},
  {id:"purchase",label:"PURCHASE",       sub:"Restricted spending executed",     icon:"◆"},
  {id:"audit",   label:"PUBLIC AUDIT",   sub:"Full on-chain transaction record", icon:"◉"},
];
export default function SalvusFlow(){
  const [hov,setHov]=useState<string|null>(null);
  const [pT,setPT]=useState(0);const [rm,setRm]=useState(false);
  const raf=useRef<number>(0);const t0=useRef<number|null>(null);
  useEffect(()=>{const mq=window.matchMedia("(prefers-reduced-motion: reduce)");setRm(mq.matches);const h=(e:MediaQueryListEvent)=>setRm(e.matches);mq.addEventListener("change",h);return()=>mq.removeEventListener("change",h);},[]);
  useEffect(()=>{if(rm)return;const a=(ts:number)=>{if(!t0.current)t0.current=ts;setPT(((ts-t0.current)/4000)%1);raf.current=requestAnimationFrame(a);};raf.current=requestAnimationFrame(a);return()=>cancelAnimationFrame(raf.current);},[rm]);
  const CX=120,R=24,STEP=72,START=48;
  const ys=NODES.map((_,i)=>START+i*STEP);
  const firstY=ys[0],lastY=ys[ys.length-1];
  const pY=(t:number)=>firstY+t*(lastY-firstY);
  return(
    <svg viewBox={`0 0 500 ${lastY+R+24}`} style={{width:"100%",height:"100%",display:"block"}} fill="none"
      role="img" aria-label="Salvus: Donor→Campaign→Smart Contract→Beneficiary→Vendor→Purchase→Audit">
      <line x1={CX} y1={firstY} x2={CX} y2={lastY} stroke={`rgba(${RGB},0.18)`} strokeWidth="1.5" strokeDasharray="5 9"/>
      {!rm&&<circle cx={CX} cy={pY(pT)} r="5" fill={COLOR} style={{filter:`drop-shadow(0 0 8px ${COLOR})`}}/>}
      {NODES.map((n,i)=>{const y=ys[i],h=hov===n.id,last=i===NODES.length-1;return(
        <g key={n.id} onMouseEnter={()=>setHov(n.id)} onMouseLeave={()=>setHov(null)} style={{cursor:"default"}}>
          <circle cx={CX} cy={y} r={h?R+12:R+3} fill="none" stroke={h?`rgba(${RGB},0.4)`:`rgba(${RGB},0.07)`} strokeWidth="1.5" style={{transition:"all 0.3s ease"}}/>
          <circle cx={CX} cy={y} r={h?R+3:R} fill={h?`rgba(${RGB},0.24)`:last?`rgba(${RGB},0.12)`:"rgba(8,8,20,0.95)"} stroke={h?COLOR:last?`rgba(${RGB},0.5)`:`rgba(${RGB},0.28)`} strokeWidth={h?"2":"1.5"} style={{transition:"all 0.3s ease"}}/>
          <text x={CX} y={y+6} textAnchor="middle" fill={h?COLOR:`rgba(${RGB},0.6)`} style={{fontSize:16,transition:"fill 0.3s ease"}}>{n.icon}</text>
          <line x1={CX+R} y1={y} x2={CX+R+16} y2={y} stroke={h?`rgba(${RGB},0.6)`:`rgba(${RGB},0.18)`} strokeWidth="1.5" style={{transition:"stroke 0.3s ease"}}/>
          <text x={CX+R+24} y={y-7} fill={h?"#f0e8ff":"#c4c4d8"} style={{fontSize:h?14:12,fontFamily:"monospace",fontWeight:"bold",letterSpacing:"0.11em",transition:"all 0.3s ease"}}>{n.label}</text>
          <text x={CX+R+24} y={y+9} fill={`rgba(${RGB},0.72)`} style={{fontSize:10.5,fontFamily:"monospace",opacity:h?1:0.35,transition:"opacity 0.3s ease"}}>{n.sub}</text>
          {i<NODES.length-1&&<text x={CX-6} y={(y+ys[i+1])/2+5} fill={`rgba(${RGB},0.28)`} style={{fontSize:13}}>↓</text>}
        </g>);})}
    </svg>);
}
