"use client";
import React, { useEffect, useRef, useState } from "react";
const COLOR="#818cf8",RGB="129,140,248";
const STEPS=[
  {id:"wallet", label:"WALLET",         sub:"Freighter wallet connection",       y:48 },
  {id:"balance",label:"BALANCE",        sub:"Live XLM balance sync",             y:122},
  {id:"send",   label:"SEND XLM",       sub:"Native Stellar transfer",           y:196},
  {id:"sign",   label:"SIGN",           sub:"Wallet confirmation prompt",        y:270},
  {id:"testnet",label:"STELLAR TESTNET",sub:"Transaction broadcast",             y:344},
  {id:"ledger", label:"LEDGER",         sub:"Block confirmation & metadata",     y:418},
  {id:"history",label:"TX HISTORY",     sub:"Sent / received filter view",       y:492},
];
export default function StellarPayFlow(){
  const [hov,setHov]=useState<string|null>(null);
  const [pT,setPT]=useState(0);const [rm,setRm]=useState(false);
  const raf=useRef<number>(0);const t0=useRef<number|null>(null);
  useEffect(()=>{const mq=window.matchMedia("(prefers-reduced-motion: reduce)");setRm(mq.matches);const h=(e:MediaQueryListEvent)=>setRm(e.matches);mq.addEventListener("change",h);return()=>mq.removeEventListener("change",h);},[]);
  useEffect(()=>{if(rm)return;const a=(ts:number)=>{if(!t0.current)t0.current=ts;setPT(((ts-t0.current)/4200)%1);raf.current=requestAnimationFrame(a);};raf.current=requestAnimationFrame(a);return()=>cancelAnimationFrame(raf.current);},[rm]);
  const CX=120,R=24,firstY=STEPS[0].y,lastY=STEPS[STEPS.length-1].y;
  const pY=(t:number)=>firstY+t*(lastY-firstY);
  return(
    <svg viewBox={`0 0 500 ${lastY+R+24}`} style={{width:"100%",height:"100%",display:"block"}} fill="none"
      role="img" aria-label="StellarPay: Wallet→Balance→Send XLM→Sign→Stellar Testnet→Ledger→Transaction History">
      <line x1={CX} y1={firstY} x2={CX} y2={lastY} stroke={`rgba(${RGB},0.15)`} strokeWidth="1.5" strokeDasharray="5 9"/>
      {!rm&&<circle cx={CX} cy={pY(pT)} r="5" fill={COLOR} style={{filter:`drop-shadow(0 0 8px ${COLOR})`}}/>}
      {STEPS.map((s,i)=>{const h=hov===s.id,last=i===STEPS.length-1,confirm=s.id==="sign"||s.id==="ledger";return(
        <g key={s.id} onMouseEnter={()=>setHov(s.id)} onMouseLeave={()=>setHov(null)} style={{cursor:"default"}}>
          <circle cx={CX} cy={s.y} r={h?R+12:R+3} fill="none" stroke={h?`rgba(${RGB},0.42)`:`rgba(${RGB},0.07)`} strokeWidth="1.5" style={{transition:"all 0.3s ease"}}/>
          <circle cx={CX} cy={s.y} r={h?R+3:R} fill={h?`rgba(${RGB},0.22)`:last?`rgba(${RGB},0.12)`:"rgba(8,8,20,0.95)"} stroke={h?COLOR:last?`rgba(${RGB},0.5)`:`rgba(${RGB},0.28)`} strokeWidth={h?"2":"1.5"} style={{transition:"all 0.3s ease"}}/>
          {confirm&&<text x={CX} y={s.y+6} textAnchor="middle" fill={h?COLOR:`rgba(${RGB},0.5)`} style={{fontSize:16,transition:"fill 0.3s ease"}}>✓</text>}
          <line x1={CX+R} y1={s.y} x2={CX+R+16} y2={s.y} stroke={h?`rgba(${RGB},0.6)`:`rgba(${RGB},0.18)`} strokeWidth="1.5" style={{transition:"stroke 0.3s ease"}}/>
          <text x={CX+R+24} y={s.y-7} fill={h?"#dde0ff":"#c4c4d8"} style={{fontSize:h?14:12,fontFamily:"monospace",fontWeight:"bold",letterSpacing:"0.11em",transition:"all 0.3s ease"}}>{s.label}</text>
          <text x={CX+R+24} y={s.y+9} fill={`rgba(${RGB},0.72)`} style={{fontSize:10.5,fontFamily:"monospace",opacity:h?1:0.35,transition:"opacity 0.3s ease"}}>{s.sub}</text>
          {i<STEPS.length-1&&<text x={CX-6} y={(s.y+STEPS[i+1].y)/2+5} fill={`rgba(${RGB},0.28)`} style={{fontSize:13}}>↓</text>}
        </g>);})}
    </svg>);
}
