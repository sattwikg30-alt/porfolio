"use client";
import React, { useEffect, useRef, useState } from "react";
const COLOR="#f43f5e",RGB="244,63,94";
const p=(cx:number,cy:number,r:number,deg:number)=>{const rad=deg*Math.PI/180;return{x:cx+r*Math.cos(rad),y:cy+r*Math.sin(rad)};};
const OUTER=[{id:"seller",label:"SELLER",angle:-90},{id:"buy",label:"BUY",angle:-30},{id:"trade",label:"TRADE",angle:30},{id:"auction",label:"AUCTION",angle:90},{id:"student",label:"STUDENT",angle:150},{id:"exchange",label:"EXCHANGE",angle:210}];
const INNER=[{id:"request",label:"REQUEST",angle:0},{id:"offer",label:"OFFER",angle:90},{id:"chat",label:"CHAT",angle:180},{id:"deal",label:"DEAL",angle:270}];
export default function CampusMartFlow(){
  const [hov,setHov]=useState<string|null>(null);
  const [rot,setRot]=useState(0);
  const [rm,setRm]=useState(false);
  const raf=useRef<number>(0);const t0=useRef<number|null>(null);
  useEffect(()=>{const mq=window.matchMedia("(prefers-reduced-motion: reduce)");setRm(mq.matches);const h=(e:MediaQueryListEvent)=>setRm(e.matches);mq.addEventListener("change",h);return()=>mq.removeEventListener("change",h);},[]);
  useEffect(()=>{if(rm)return;const a=(ts:number)=>{if(!t0.current)t0.current=ts;setRot(((ts-t0.current)/14000)*360);raf.current=requestAnimationFrame(a);};raf.current=requestAnimationFrame(a);return()=>cancelAnimationFrame(raf.current);},[rm]);
  const CX=250,CY=250,OR=165,IR=72,W=500,H=500;
  return(
    <svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%",height:"100%",display:"block"}} fill="none"
      role="img" aria-label="CampusMart circular flow: Seller → Marketplace → Buy/Trade/Auction → Student → Exchange">
      <circle cx={CX} cy={CY} r={OR+28} stroke={`rgba(${RGB},0.05)`} strokeWidth="1" strokeDasharray="2 10"/>
      <circle cx={CX} cy={CY} r={OR} stroke={`rgba(${RGB},0.12)`} strokeWidth="1.5" strokeDasharray="3 8"/>
      {OUTER.map(n=>{const pt=p(CX,CY,OR,n.angle);return(<line key={n.id} x1={CX} y1={CY} x2={pt.x} y2={pt.y} stroke={hov===n.id?`rgba(${RGB},0.5)`:`rgba(${RGB},0.1)`} strokeWidth="1" style={{transition:"stroke 0.3s ease"}}/>);})}
      <g style={{transformOrigin:`${CX}px ${CY}px`,transform:rm?"none":`rotate(${rot}deg)`}}>
        <circle cx={CX} cy={CY} r={IR} stroke={`rgba(${RGB},0.2)`} strokeWidth="1" strokeDasharray="4 9"/>
        {INNER.map(n=>{const pt=p(CX,CY,IR,n.angle),h=hov===n.id;return(
          <g key={n.id} onMouseEnter={()=>setHov(n.id)} onMouseLeave={()=>setHov(null)} style={{cursor:"default"}}>
            <circle cx={pt.x} cy={pt.y} r={h?24:20} fill={h?`rgba(${RGB},0.22)`:"rgba(8,8,20,0.95)"} stroke={h?COLOR:`rgba(${RGB},0.32)`} strokeWidth={h?"2":"1.5"} style={{transition:"all 0.35s ease"}}/>
            <text x={pt.x} y={pt.y+5} textAnchor="middle" fill={h?COLOR:`rgba(${RGB},0.6)`} style={{fontSize:11,fontFamily:"monospace",fontWeight:"bold",letterSpacing:"0.06em",transition:"fill 0.3s ease"}}>{n.label}</text>
          </g>);})}
      </g>
      <circle cx={CX} cy={CY} r={30} fill={`rgba(${RGB},0.1)`} stroke={`rgba(${RGB},0.4)`} strokeWidth="1.5"/>
      <text x={CX} y={CY-5} textAnchor="middle" fill={COLOR} style={{fontSize:9,fontFamily:"monospace",fontWeight:"bold",letterSpacing:"0.14em"}}>CAMPUS</text>
      <text x={CX} y={CY+10} textAnchor="middle" fill={`rgba(${RGB},0.65)`} style={{fontSize:9,fontFamily:"monospace",fontWeight:"bold",letterSpacing:"0.12em"}}>MART</text>
      {OUTER.map(n=>{const pt=p(CX,CY,OR,n.angle),h=hov===n.id;return(
        <g key={n.id} onMouseEnter={()=>setHov(n.id)} onMouseLeave={()=>setHov(null)} style={{cursor:"default"}}>
          <circle cx={pt.x} cy={pt.y} r={h?34:29} fill={h?`rgba(${RGB},0.22)`:"rgba(8,8,20,0.95)"} stroke={h?COLOR:`rgba(${RGB},0.28)`} strokeWidth={h?"2":"1.5"} style={{transition:"all 0.35s ease"}}/>
          <text x={pt.x} y={pt.y+6} textAnchor="middle" fill={h?COLOR:`rgba(${RGB},0.58)`} style={{fontSize:12,fontFamily:"monospace",fontWeight:"bold",letterSpacing:"0.06em",transition:"fill 0.3s ease"}}>{n.label}</text>
        </g>);})}
    </svg>);
}
