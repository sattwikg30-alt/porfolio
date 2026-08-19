"use client";
import React, { useEffect, useRef, useState } from "react";
const COLOR="#10b981",RGB="16,185,129";
const INPUTS=[{id:"loc",label:"LOCATION",icon:"◎",x:75},{id:"soil",label:"SOIL",icon:"▣",x:195},{id:"weather",label:"WEATHER",icon:"◈",x:315},{id:"climate",label:"CLIMATE",icon:"⬡",x:435}];
const PIPELINE=[{id:"analysis",label:"CLIMATE ANALYSIS",sub:"Multi-factor environmental scoring"},{id:"yield",label:"YIELD PREDICTION",sub:"Expected crop output estimation"},{id:"risk",label:"RISK / STABILITY",sub:"Volatility and crop stress index"},{id:"recommend",label:"SMART RECOMMENDATION",sub:"Actionable farming guidance output"}];
export default function AgriGoFlow() {
  const [hov,setHov]=useState<string|null>(null);
  const [pT,setPT]=useState(0);
  const [rm,setRm]=useState(false);
  const raf=useRef<number>(0);const t0=useRef<number|null>(null);
  useEffect(()=>{const mq=window.matchMedia("(prefers-reduced-motion: reduce)");setRm(mq.matches);const h=(e:MediaQueryListEvent)=>setRm(e.matches);mq.addEventListener("change",h);return()=>mq.removeEventListener("change",h);},[]);
  useEffect(()=>{if(rm)return;const a=(ts:number)=>{if(!t0.current)t0.current=ts;setPT(((ts-t0.current)/3500)%1);raf.current=requestAnimationFrame(a);};raf.current=requestAnimationFrame(a);return()=>cancelAnimationFrame(raf.current);},[rm]);
  const W=510,CX=W/2,RIN=33,RP=32,FY=78,MY=190,PS=280,PSTEP=100;
  const pYs=PIPELINE.map((_,i)=>PS+i*PSTEP);
  const lastY=pYs[pYs.length-1],totalH=lastY+RP+30;
  const pY=(t:number)=>MY+20+t*(lastY-MY-20);
  return(
    <svg viewBox={`0 0 ${W} ${totalH}`} style={{width:"100%",height:"100%",display:"block"}} fill="none"
      role="img" aria-label="AgriGo: Farm inputs → Climate Analysis → Yield Prediction → Risk → Recommendation">
      <text x={CX} y={22} textAnchor="middle" fill={`rgba(${RGB},0.5)`} style={{fontSize:11,fontFamily:"monospace",fontWeight:"bold",letterSpacing:"0.22em"}}>FARM DATA INPUT</text>
      {INPUTS.map(inp=><line key={inp.id} x1={inp.x} y1={FY} x2={CX} y2={MY} stroke={hov===inp.id?COLOR:`rgba(${RGB},0.2)`} strokeWidth={hov===inp.id?"2":"1"} strokeDasharray="4 7" style={{transition:"all 0.3s ease"}}/>)}
      {INPUTS.map(inp=>{const h=hov===inp.id;return(<g key={inp.id} onMouseEnter={()=>setHov(inp.id)} onMouseLeave={()=>setHov(null)} style={{cursor:"default"}}>
        <circle cx={inp.x} cy={FY} r={h?RIN+7:RIN} fill={h?`rgba(${RGB},0.22)`:"rgba(8,8,20,0.95)"} stroke={h?COLOR:`rgba(${RGB},0.32)`} strokeWidth={h?"2":"1.5"} style={{transition:"all 0.35s ease"}}/>
        <text x={inp.x} y={FY+8} textAnchor="middle" fill={h?COLOR:`rgba(${RGB},0.65)`} style={{fontSize:20,transition:"fill 0.3s ease"}}>{inp.icon}</text>
        <text x={inp.x} y={FY+RIN+17} textAnchor="middle" fill={h?"#d4f5ea":"#aaaacc"} style={{fontSize:10,fontFamily:"monospace",fontWeight:"bold",letterSpacing:"0.1em",transition:"fill 0.3s ease"}}>{inp.label}</text>
      </g>);})}
      <circle cx={CX} cy={MY} r={22} fill={`rgba(${RGB},0.1)`} stroke={`rgba(${RGB},0.45)`} strokeWidth="1.5"/>
      <text x={CX} y={MY+8} textAnchor="middle" fill={`rgba(${RGB},0.75)`} style={{fontSize:18}}>⬡</text>
      <line x1={CX} y1={MY+22} x2={CX} y2={lastY} stroke={`rgba(${RGB},0.15)`} strokeWidth="1.5" strokeDasharray="5 9"/>
      {!rm&&<circle cx={CX} cy={pY(pT)} r="6" fill={COLOR} style={{filter:`drop-shadow(0 0 10px ${COLOR})`}}/>}
      {PIPELINE.map((p,i)=>{const y=pYs[i],h=hov===p.id,last=i===PIPELINE.length-1;return(
        <g key={p.id} onMouseEnter={()=>setHov(p.id)} onMouseLeave={()=>setHov(null)} style={{cursor:"default"}}>
          <circle cx={CX} cy={y} r={h?RP+12:RP+3} fill="none" stroke={h?`rgba(${RGB},0.4)`:`rgba(${RGB},0.07)`} strokeWidth="1.5" style={{transition:"all 0.35s ease"}}/>
          <circle cx={CX} cy={y} r={h?RP+4:RP} fill={h?`rgba(${RGB},0.22)`:last?`rgba(${RGB},0.12)`:"rgba(8,8,20,0.95)"} stroke={h?COLOR:last?`rgba(${RGB},0.48)`:`rgba(${RGB},0.3)`} strokeWidth={h?"2":"1.5"} style={{transition:"all 0.35s ease"}}/>
          <line x1={CX-RP} y1={y} x2={CX-RP-16} y2={y} stroke={h?`rgba(${RGB},0.6)`:`rgba(${RGB},0.18)`} strokeWidth="1.5" style={{transition:"stroke 0.3s ease"}}/>
          <text x={CX-RP-22} y={y-8} textAnchor="end" fill={h?"#d4f5ea":"#b8b8cc"} style={{fontSize:h?14:12,fontFamily:"monospace",fontWeight:"bold",letterSpacing:"0.12em",transition:"all 0.3s ease"}}>{p.label}</text>
          <text x={CX-RP-22} y={y+10} textAnchor="end" fill={`rgba(${RGB},0.75)`} style={{fontSize:11,fontFamily:"monospace",opacity:h?1:0.3,transition:"opacity 0.3s ease"}}>{p.sub}</text>
          {i<pYs.length-1&&<text x={CX-5} y={(y+pYs[i+1])/2+6} fill={`rgba(${RGB},0.3)`} style={{fontSize:16}}>↓</text>}
        </g>);
      })}
    </svg>);
}
