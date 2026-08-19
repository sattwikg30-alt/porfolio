"use client";
import React, { useEffect, useRef, useState } from "react";
const COLOR="#f59e0b",RGB="245,158,11";
const p=(cx:number,cy:number,r:number,deg:number)=>{const rad=deg*Math.PI/180;return{x:cx+r*Math.cos(rad),y:cy+r*Math.sin(rad)};};
const SHOPS=[{id:"s1",angle:-120},{id:"s2",angle:0},{id:"s3",angle:120}];
const PIPE=[{id:"match",label:"PRODUCT MATCH",sub:"Geospatial + inventory filter"},{id:"ai",label:"AI RECOMMENDATION",sub:"Smart ranking & personalisation"},{id:"order",label:"ORDER",sub:"Cart & payment workflow"},{id:"delivery",label:"LOCAL DELIVERY",sub:"Last-mile logistics"}];
export default function VendorAIFlow(){
  const [hov,setHov]=useState<string|null>(null);
  const [pT,setPT]=useState(0);const [rm,setRm]=useState(false);
  const raf=useRef<number>(0);const t0=useRef<number|null>(null);
  useEffect(()=>{const mq=window.matchMedia("(prefers-reduced-motion: reduce)");setRm(mq.matches);const h=(e:MediaQueryListEvent)=>setRm(e.matches);mq.addEventListener("change",h);return()=>mq.removeEventListener("change",h);},[]);
  useEffect(()=>{if(rm)return;const a=(ts:number)=>{if(!t0.current)t0.current=ts;setPT(((ts-t0.current)/3800)%1);raf.current=requestAnimationFrame(a);};raf.current=requestAnimationFrame(a);return()=>cancelAnimationFrame(raf.current);},[rm]);
  const W=500,CX=250,HCY=140,OR=90,RP=30,PS=270,PSTEP=95;
  const pYs=PIPE.map((_,i)=>PS+i*PSTEP);
  const lastY=pYs[pYs.length-1],totalH=lastY+RP+30;
  const pY=(t:number)=>(PS+RP)+t*(lastY-PS-RP);
  return(
    <svg viewBox={`0 0 ${W} ${totalH}`} style={{width:"100%",height:"100%",display:"block"}} fill="none"
      role="img" aria-label="VendorAI: Buyer Location → Nearby Sellers → Product Match → AI Recommendation → Order → Local Delivery">
      <circle cx={CX} cy={HCY} r={OR+30} stroke={`rgba(${RGB},0.06)`} strokeWidth="1" strokeDasharray="2 12"/>
      <circle cx={CX} cy={HCY} r={OR} stroke={`rgba(${RGB},0.12)`} strokeWidth="1.5" strokeDasharray="3 8"/>
      {SHOPS.map(s=>{const pt=p(CX,HCY,OR,s.angle);return(<line key={s.id} x1={CX} y1={HCY} x2={pt.x} y2={pt.y} stroke={hov===s.id?`rgba(${RGB},0.5)`:`rgba(${RGB},0.12)`} strokeWidth="1" style={{transition:"stroke 0.3s ease"}}/>);})}
      <g onMouseEnter={()=>setHov("buyer")} onMouseLeave={()=>setHov(null)} style={{cursor:"default"}}>
        <circle cx={CX} cy={HCY} r={hov==="buyer"?40:34} fill={hov==="buyer"?`rgba(${RGB},0.22)`:"rgba(8,8,20,0.95)"} stroke={hov==="buyer"?COLOR:`rgba(${RGB},0.4)`} strokeWidth={hov==="buyer"?"2":"1.5"} style={{transition:"all 0.35s ease"}}/>
        <text x={CX} y={HCY-6} textAnchor="middle" fill={hov==="buyer"?COLOR:`rgba(${RGB},0.7)`} style={{fontSize:11,fontFamily:"monospace",fontWeight:"bold",letterSpacing:"0.1em"}}>BUYER</text>
        <text x={CX} y={HCY+10} textAnchor="middle" fill={hov==="buyer"?COLOR:`rgba(${RGB},0.5)`} style={{fontSize:11,fontFamily:"monospace",fontWeight:"bold",letterSpacing:"0.08em"}}>LOCATION</text>
        <text x={CX} y={HCY+24} textAnchor="middle" fill={`rgba(${RGB},0.5)`} style={{fontSize:13,opacity:hov==="buyer"?1:0,transition:"opacity 0.3s ease"}}>◎</text>
      </g>
      {SHOPS.map(s=>{const pt=p(CX,HCY,OR,s.angle),h=hov===s.id;return(
        <g key={s.id} onMouseEnter={()=>setHov(s.id)} onMouseLeave={()=>setHov(null)} style={{cursor:"default"}}>
          <circle cx={pt.x} cy={pt.y} r={h?34:28} fill={h?`rgba(${RGB},0.22)`:"rgba(8,8,20,0.95)"} stroke={h?COLOR:`rgba(${RGB},0.28)`} strokeWidth={h?"2":"1.5"} style={{transition:"all 0.35s ease"}}/>
          <text x={pt.x} y={pt.y+6} textAnchor="middle" fill={h?COLOR:`rgba(${RGB},0.58)`} style={{fontSize:11,fontFamily:"monospace",fontWeight:"bold",transition:"fill 0.3s ease"}}>SHOP</text>
        </g>);})}
      <line x1={CX} y1={HCY+34} x2={CX} y2={PS} stroke={`rgba(${RGB},0.12)`} strokeWidth="1.5" strokeDasharray="4 8"/>
      <text x={CX-5} y={(HCY+34+PS)/2+6} fill={`rgba(${RGB},0.28)`} style={{fontSize:16}}>↓</text>
      <line x1={CX} y1={PS+RP} x2={CX} y2={lastY} stroke={`rgba(${RGB},0.15)`} strokeWidth="1.5" strokeDasharray="5 9"/>
      {!rm&&<circle cx={CX} cy={pY(pT)} r="6" fill={COLOR} style={{filter:`drop-shadow(0 0 10px ${COLOR})`}}/>}
      {PIPE.map((pp,i)=>{const y=pYs[i],h=hov===pp.id,last=i===PIPE.length-1;return(
        <g key={pp.id} onMouseEnter={()=>setHov(pp.id)} onMouseLeave={()=>setHov(null)} style={{cursor:"default"}}>
          <circle cx={CX} cy={y} r={h?RP+12:RP+3} fill="none" stroke={h?`rgba(${RGB},0.4)`:`rgba(${RGB},0.07)`} strokeWidth="1.5" style={{transition:"all 0.35s ease"}}/>
          <circle cx={CX} cy={y} r={h?RP+4:RP} fill={h?`rgba(${RGB},0.22)`:last?`rgba(${RGB},0.12)`:"rgba(8,8,20,0.95)"} stroke={h?COLOR:last?`rgba(${RGB},0.5)`:`rgba(${RGB},0.3)`} strokeWidth={h?"2":"1.5"} style={{transition:"all 0.35s ease"}}/>
          <line x1={CX-RP} y1={y} x2={CX-RP-16} y2={y} stroke={h?`rgba(${RGB},0.6)`:`rgba(${RGB},0.18)`} strokeWidth="1.5" style={{transition:"stroke 0.3s ease"}}/>
          <text x={CX-RP-24} y={y-8} textAnchor="end" fill={h?"#fde68a":"#c4c4d8"} style={{fontSize:h?14:12,fontFamily:"monospace",fontWeight:"bold",letterSpacing:"0.1em",transition:"all 0.3s ease"}}>{pp.label}</text>
          <text x={CX-RP-24} y={y+10} textAnchor="end" fill={`rgba(${RGB},0.75)`} style={{fontSize:11,fontFamily:"monospace",opacity:h?1:0.3,transition:"opacity 0.3s ease"}}>{pp.sub}</text>
          {i<PIPE.length-1&&<text x={CX-5} y={(y+pYs[i+1])/2+6} fill={`rgba(${RGB},0.3)`} style={{fontSize:16}}>↓</text>}
        </g>);})}
    </svg>);
}
