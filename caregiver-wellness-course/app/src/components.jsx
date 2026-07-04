import { Icon } from "./icons";
import { WEDGES, WEDGE_CONFIG, BADGES } from "./data";

export function WellnessWheelSVG({ scores = {}, size = 300 }) {
  const cx = size/2, cy = size/2, r = size*0.42, innerR = size*0.14;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width="100%" style={{ maxWidth: size }}>
      {WEDGES.map((wedge, i) => {
        const sa = (i/8)*2*Math.PI - Math.PI/2;
        const ea = ((i+1)/8)*2*Math.PI - Math.PI/2;
        const score = scores[wedge] ?? 0;
        const fillR = innerR + ((r-innerR)*score/100);
        const cfg = WEDGE_CONFIG[wedge];
        const p = (a,rr) => [cx+rr*Math.cos(a), cy+rr*Math.sin(a)];
        const [x1,y1]=p(sa,r), [x2,y2]=p(ea,r), [xi1,yi1]=p(sa,innerR), [xi2,yi2]=p(ea,innerR);
        const [fx1,fy1]=p(sa,fillR), [fx2,fy2]=p(ea,fillR);
        const mid = (sa+ea)/2;
        const [lx,ly] = p(mid, r+size*0.055);
        const bgPath = `M${xi1},${yi1}L${x1},${y1}A${r},${r},0,0,1,${x2},${y2}L${xi2},${yi2}A${innerR},${innerR},0,0,0,${xi1},${yi1}Z`;
        const fillPath = score>0 ? `M${xi1},${yi1}L${fx1},${fy1}A${fillR},${fillR},0,0,1,${fx2},${fy2}L${xi2},${yi2}A${innerR},${innerR},0,0,0,${xi1},${yi1}Z` : null;
        return (
          <g key={wedge}>
            <path d={bgPath} fill={cfg.light} stroke="white" strokeWidth="2"/>
            {fillPath && <path d={fillPath} fill={cfg.color} opacity="0.88" stroke="white" strokeWidth="2"/>}
            <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontSize={size*0.033} fontWeight="600" fill={cfg.color} fontFamily="Literata,Georgia,serif">{wedge}</text>
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r={innerR} fill="white"/>
      <text x={cx} y={cy-size*0.022} textAnchor="middle" fontSize={size*0.036} fontWeight="700" fill="#3a3a3a" fontFamily="Literata,Georgia,serif">Wellness</text>
      <text x={cx} y={cy+size*0.022} textAnchor="middle" fontSize={size*0.036} fontWeight="700" fill="#3a3a3a" fontFamily="Literata,Georgia,serif">Wheel</text>
    </svg>
  );
}

export function ProgressRing({ score, color, size=60 }) {
  const r=size/2-6, circ=2*Math.PI*r, dash=(score/100)*circ;
  return (
    <svg width={size} height={size}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#eee" strokeWidth="5"/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="5"
        strokeDasharray={`${dash} ${circ-dash}`} strokeDashoffset={circ*0.25} strokeLinecap="round"
        style={{transition:"stroke-dasharray 0.8s ease"}}/>
      <text x={size/2} y={size/2+4} textAnchor="middle" fontSize="11" fontWeight="700" fill={color} fontFamily="Literata,Georgia,serif">{score}%</text>
    </svg>
  );
}

// The Earned Gold Rule: locked badges sit in muted stone tones; unlocked
// badges alone get the Antique Brass fill plus the achievement glow, so
// brass reads as "earned" rather than decorative.
export function BadgeMedallion({ iconName, unlocked, size = 64 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      display: "flex", alignItems: "center", justifyContent: "center",
      background: unlocked ? "#FBF3E1" : "#F1EEE6",
      color: unlocked ? "#8F6F35" : "#A6A395",
      boxShadow: unlocked
        ? "0 0 0 1px rgba(201,161,90,0.35), 0 8px 28px rgba(201,161,90,0.28)"
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
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(22,40,28,0.65)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,padding:16}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"white",borderRadius:20,padding:"40px 32px",textAlign:"center",maxWidth:320,width:"100%",animation:"popIn 0.4s cubic-bezier(0.165,0.84,0.44,1)"}}>
        <style>{`@keyframes popIn{from{transform:scale(0.85);opacity:0}to{transform:scale(1);opacity:1}} @media (prefers-reduced-motion: reduce){[style*="popIn"]{animation:none !important}}`}</style>
        <div style={{display:"flex",justifyContent:"center",marginBottom:18}}><BadgeMedallion iconName={b.icon} unlocked size={84}/></div>
        <div style={{fontSize:12,fontWeight:700,color:"#8F6F35",letterSpacing:2,textTransform:"uppercase",marginBottom:8}}>Badge Earned</div>
        <h2 style={{fontFamily:"Literata,Georgia,serif",color:"#2a2a2a",marginBottom:8,fontSize:22}}>{b.name}</h2>
        <p style={{color:"#777",fontSize:14,marginBottom:28,lineHeight:1.5}}>{b.desc}</p>
        <button onClick={onClose} style={{padding:"12px 28px",background:"#3C6B4A",color:"white",border:"none",borderRadius:999,fontWeight:700,cursor:"pointer",fontFamily:"Raleway,sans-serif",fontSize:15}}>
          Keep going
        </button>
      </div>
    </div>
  );
}
