import { useState, useEffect, useRef } from "react";
import { Icon } from "./icons";
import { WEDGES, WEDGE_CONFIG, BADGES, getLevel } from "./data";

// Annular-sector geometry per the Sky & Tide handoff: each wedge is a ring
// segment from r0 to a fill radius proportional to its score, drawn over a
// full-height track at low opacity, with concentric grid rings and a white
// hub showing the live average.
function polar(cx, cy, r, deg) {
  const a = (deg - 90) * Math.PI / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}
function sector(cx, cy, r0, r1, a0, a1) {
  const [x0, y0] = polar(cx, cy, r1, a0);
  const [x1, y1] = polar(cx, cy, r1, a1);
  const [x2, y2] = polar(cx, cy, r0, a1);
  const [x3, y3] = polar(cx, cy, r0, a0);
  const laf = (a1 - a0) > 180 ? 1 : 0;
  return `M${x0} ${y0} A${r1} ${r1} 0 ${laf} 1 ${x1} ${y1} L${x2} ${y2} A${r0} ${r0} 0 ${laf} 0 ${x3} ${y3} Z`;
}

// Wedges grow outward from the hub to their score depth when the wheel
// appears, one after another around the circle. Purely presentational, not
// interactive; collapses to a static render under prefers-reduced-motion.
const WEDGE_STAGGER = 90;   // ms between each wedge starting
const WEDGE_GROW = 700;     // ms each wedge takes to reach its depth
function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

function useWheelAnimation(active) {
  const [elapsed, setElapsed] = useState(0);
  const raf = useRef(null);
  useEffect(() => {
    if (!active) return;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const total = WEDGE_STAGGER * 7 + WEDGE_GROW;
    if (reduced) { setElapsed(total); return; }
    const start = performance.now();
    const tick = (now) => {
      const t = now - start;
      setElapsed(t);
      if (t < total) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [active]);
  // per-wedge progress 0..1, staggered around the circle
  return (i) => easeOutCubic(Math.min(1, Math.max(0, (elapsed - i * WEDGE_STAGGER) / WEDGE_GROW)));
}

export function WellnessWheelSVG({ scores = {}, size = 300, showRings = true, showLabels = true }) {
  const cx = 220, cy = 220, r0 = 60, R = 172, pad = 1.6, seg = 45;
  const hasScores = WEDGES.some(w => (scores[w] ?? 0) > 0);
  const avg = Math.round(WEDGES.reduce((s, w) => s + (scores[w] ?? 0), 0) / 8);
  const progress = useWheelAnimation(hasScores);
  const overallProgress = progress(3.5); // hub counts up on the mid-sweep timing

  return (
    <svg viewBox="-40 0 520 440" width="100%" style={{ maxWidth: size, display: "block" }}>
      {showRings && [1, 2, 3, 4, 5].map(g => (
        <circle key={g} cx={cx} cy={cy} r={r0 + (R - r0) * g / 5} fill="none" stroke="rgba(32,48,58,.08)" strokeWidth="1" />
      ))}
      {WEDGES.map((wedge, i) => {
        const a0 = i * seg + pad, a1 = (i + 1) * seg - pad;
        const cfg = WEDGE_CONFIG[wedge];
        const score = (scores[wedge] ?? 0) * progress(i);
        const rr = r0 + (R - r0) * score / 100;
        const [lx, ly] = polar(cx, cy, R + 24, i * seg + seg / 2);
        return (
          <g key={wedge}>
            <path d={sector(cx, cy, r0, R, a0, a1)} fill={cfg.color} opacity="0.13" />
            {score > 0 && <path d={sector(cx, cy, r0, rr, a0, a1)} fill={cfg.color} opacity="0.92" />}
            {showLabels && (
              <text x={lx} y={ly + 4} textAnchor="middle" style={{ font: "600 13px Hanken Grotesk,sans-serif", fill: cfg.color }}>{wedge}</text>
            )}
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r={r0 - 6} fill="#fff" stroke="rgba(32,48,58,.1)" />
      {hasScores ? (
        (() => {
          const words = getLevel(avg).label.split(" ");
          return (
            <g opacity={overallProgress}>
              {words.length === 1 ? (
                <text x={cx} y={cy + 6} textAnchor="middle" style={{ font: "400 20px Newsreader,serif", fill: "#20303A" }}>{words[0]}</text>
              ) : (
                <>
                  <text x={cx} y={cy - 4} textAnchor="middle" style={{ font: "400 17px Newsreader,serif", fill: "#20303A" }}>{words[0]}</text>
                  <text x={cx} y={cy + 17} textAnchor="middle" style={{ font: "400 17px Newsreader,serif", fill: "#20303A" }}>{words.slice(1).join(" ")}</text>
                </>
              )}
            </g>
          );
        })()
      ) : (
        <>
          <text x={cx} y={cy - 2} textAnchor="middle" style={{ font: "400 15px Newsreader,serif", fill: "#20303A" }}>Wellness</text>
          <text x={cx} y={cy + 16} textAnchor="middle" style={{ font: "400 15px Newsreader,serif", fill: "#20303A" }}>Wheel</text>
        </>
      )}
    </svg>
  );
}

export function ProgressRing({ score, color, size=60 }) {
  const r=size/2-6, circ=2*Math.PI*r, dash=(score/100)*circ;
  return (
    <svg width={size} height={size}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#E4EAED" strokeWidth="5"/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="5"
        strokeDasharray={`${dash} ${circ-dash}`} strokeDashoffset={circ*0.25} strokeLinecap="round"
        style={{transition:"stroke-dasharray 0.8s ease"}}/>
    </svg>
  );
}

// The Earned Gold Rule carries over into Sky & Tide: locked badges sit in
// muted paper tones; unlocked badges alone get the warm sand-gold fill plus
// the achievement glow, so gold reads as "earned" rather than decorative.
export function BadgeMedallion({ iconName, unlocked, size = 64 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      display: "flex", alignItems: "center", justifyContent: "center",
      background: unlocked ? "#F0E6D2" : "#ECEEEA",
      color: unlocked ? "#A5813C" : "#9AA5AB",
      boxShadow: unlocked
        ? "0 0 0 1px rgba(205,166,107,0.4), 0 8px 28px rgba(205,166,107,0.3)"
        : "none",
      transition: "all 320ms cubic-bezier(0.165,0.84,0.44,1)",
      flexShrink: 0,
    }}>
      <Icon name={iconName} size={Math.round(size * 0.42)} />
    </div>
  );
}

export function BadgeModal({ badgeId, onClose }) {
  const b = BADGES.find(x=>x.id===badgeId);
  if (!b) return null;
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(44,70,82,0.6)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,padding:16}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#fff",borderRadius:22,padding:"40px 32px",textAlign:"center",maxWidth:320,width:"100%",animation:"popIn 0.4s cubic-bezier(0.165,0.84,0.44,1)",boxShadow:"0 1px 2px rgba(30,40,45,.06), 0 20px 50px -30px rgba(30,40,45,.34)"}}>
        <style>{`@keyframes popIn{from{transform:scale(0.85);opacity:0}to{transform:scale(1);opacity:1}} @media (prefers-reduced-motion: reduce){[style*="popIn"]{animation:none !important}}`}</style>
        <div style={{display:"flex",justifyContent:"center",marginBottom:18}}><BadgeMedallion iconName={b.icon} unlocked size={84}/></div>
        <div style={{fontSize:11,fontWeight:600,color:"#A5813C",letterSpacing:"0.24em",textTransform:"uppercase",marginBottom:8,fontFamily:"Hanken Grotesk,sans-serif"}}>Badge Earned</div>
        <h2 style={{fontFamily:"Newsreader,serif",fontWeight:400,color:"#20303A",marginBottom:8,fontSize:24}}>{b.name}</h2>
        <p style={{color:"#5c6b72",fontSize:14,marginBottom:28,lineHeight:1.6,fontFamily:"Hanken Grotesk,sans-serif"}}>{b.desc}</p>
        <button onClick={onClose} style={{padding:"12px 28px",background:"#4A7690",color:"white",border:"none",borderRadius:999,fontWeight:500,cursor:"pointer",fontFamily:"Hanken Grotesk,sans-serif",fontSize:14}}>
          Keep going
        </button>
      </div>
    </div>
  );
}
