/* DEE disability-impact poster -> SVG -> PNG (no browser; resvg + opentype) */
const fs = require('fs');
const path = require('path');
const opentype = require('opentype.js');
const { Resvg } = require('@resvg/resvg-js');

const DJ = '/usr/share/fonts/truetype/dejavu/';
const loadFont = p => { const b = fs.readFileSync(p); return opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength)); };
const fontReg = loadFont(DJ + 'DejaVuSans.ttf');
const fontBold = loadFont(DJ + 'DejaVuSans-Bold.ttf');

/* ---------- palette ---------- */
const C = {
  ink:'#15303A', inkSoft:'#3A5560', muted:'#5F7A85', line:'#DCE6EA',
  paper:'#FFFFFF', bg1:'#EEF4F6', bg2:'#E4EEF1',
  brand:'#0E7C86', brandDeep:'#0B5A62',
  cog:'#5B53C6', cogT:'#ECEBFB',
  mot:'#0E8C9B', motT:'#DFF2F4',
  sen:'#B0700A', senT:'#FAEFD8',
  med:'#C2475C', medT:'#FBE6EA',
  beh:'#2E8B57', behT:'#E2F2E9',
  warnBg:'#FDECEF', warnBd:'#F3D6DC', tealBg:'#E2F2F3', tealBd:'#CDE6E7',
};

/* ---------- icons (24x24 inner markup, stroke-based) ---------- */
const I = {
  cog:'<path d="M12 3a6 6 0 0 0-4 10.5c.6.6 1 1.5 1 2.5h6c0-1 .4-1.9 1-2.5A6 6 0 0 0 12 3z"/><path d="M9 18h6"/><path d="M10 21h4"/>',
  mot:'<circle cx="12" cy="5" r="2.2"/><path d="M12 7.2v6"/><path d="M12 13.2 9 20"/><path d="M12 13.2 15 20"/><path d="M7 9.6l5 1.9 5-1.9"/>',
  sen:'<path d="M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-4 4v-4H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"/><circle cx="8.5" cy="10.5" r="1"/><circle cx="12" cy="10.5" r="1"/><circle cx="15.5" cy="10.5" r="1"/>',
  med:'<path d="M12 20S4 14.6 4 8.9A3.8 3.8 0 0 1 12 6a3.8 3.8 0 0 1 8 2.9C20 14.6 12 20 12 20z"/>',
  beh:'<circle cx="12" cy="12" r="9"/><circle cx="9" cy="10.5" r="1"/><circle cx="15" cy="10.5" r="1"/><path d="M8.8 15c1-.9 1.9-.9 2.9 0s1.9.9 2.9 0"/>',
  person:'<circle cx="12" cy="7" r="3.6"/><path d="M5 21c0-3.9 3.1-7 7-7s7 3.1 7 7"/>',
  warn:'<path d="M10.3 3.2 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.2a2 2 0 0 0-3.4 0z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  systems:'<circle cx="12" cy="12" r="9"/><path d="M12 3v18"/><path d="M3 12h18"/>',
  check:'<path d="M20 7 9 18l-5-5"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  heart:'<path d="M12 21s-7-4.7-7-10.5A3.5 3.5 0 0 1 12 7a3.5 3.5 0 0 1 7 3.5C19 16.3 12 21 12 21z"/><circle cx="12" cy="10.3" r="2.1"/>',
  care:'<path d="M12 21s-7-4.7-7-10.5A3.5 3.5 0 0 1 12 7a3.5 3.5 0 0 1 7 3.5C19 16.3 12 21 12 21z"/><circle cx="12" cy="10.3" r="2"/>',
  spark:'<path d="M12 2v4"/><path d="M12 18v4"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="M5 5l2.5 2.5"/><path d="M16.5 16.5 19 19"/><path d="M19 5l-2.5 2.5"/><path d="M7.5 16.5 5 19"/><circle cx="12" cy="12" r="3.2"/>',
};

/* ---------- helpers ---------- */
const W = 1240, M = 64, CW = W - M*2;       // content width 1112
const r2 = n => Math.round(n*10)/10;
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const advCache = new Map();
function adv(s, size, bold){
  const key = (bold?'b':'r')+size+'|'+s;
  if(advCache.has(key)) return advCache.get(key);
  const font = bold?fontBold:fontReg;
  const scale = size/font.unitsPerEm;
  let w=0;
  for(const ch of s){ const g = font.charToGlyph(ch); w += (g && g.advanceWidth ? g.advanceWidth : font.unitsPerEm*0.6)*scale; }
  advCache.set(key, w);
  return w;
}
const out = [];
const push = (...x) => out.push(...x);

const n = t => ({t, b:false});       // normal segment
const b = t => ({t, b:true});        // bold segment

function icon(name, x, y, size, color, sw=1.8){
  const s = size/24;
  return `<g transform="translate(${r2(x)},${r2(y)}) scale(${r2(s)})" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${I[name]}</g>`;
}
function rrect(x,y,w,h,r,fill,stroke,sw=1){
  return `<rect x="${r2(x)}" y="${r2(y)}" width="${r2(w)}" height="${r2(h)}" rx="${r}" fill="${fill}"${stroke?` stroke="${stroke}" stroke-width="${sw}"`:''}/>`;
}
// render a text run as vector glyph paths (font-independent, portable SVG)
function pathFor(str,x,y,size,{bold=false,color='#000',anchor='start',ls=0}={}){
  const font=bold?fontBold:fontReg, scale=size/font.unitsPerEm;
  const gw = g => ((g && g.advanceWidth ? g.advanceWidth : font.unitsPerEm*0.6)*scale);
  if(anchor!=='start'){
    let w=0; for(const ch of str){ w += gw(font.charToGlyph(ch))+ls; } if(ls) w-=ls;
    x = anchor==='middle' ? x-w/2 : x-w;
  }
  let X=x, d='';
  for(const ch of str){ const g=font.charToGlyph(ch); d += g.getPath(X,y,size).toPathData(2); X += gw(g)+ls; }
  return d ? `<path d="${d}" fill="${color}"/>` : '';
}
function text(x,y,str,opts={}){ return pathFor(str,x,y,opts.size||14,{bold:!!opts.bold,color:opts.color||C.ink,anchor:opts.anchor||'start',ls:opts.ls||0}); }
function tokens(segs){
  const toks=[];
  segs.forEach(s => s.t.trim().split(/\s+/).filter(Boolean).forEach(w => toks.push({t:w,b:s.b})));
  // attach pure trailing punctuation to the previous word (avoid "SUDEP .")
  const merged=[];
  for(const tk of toks){
    if(merged.length && /^[.,;:!?)]+$/.test(tk.t)){ const p=merged[merged.length-1]; merged[merged.length-1]={t:p.t+tk.t, b:p.b}; }
    else merged.push({...tk});
  }
  return merged;
}
function wrap(toks, maxW, size){
  const sp = adv(' ', size, false);
  const lines=[]; let line=[]; let x=0;
  for(const tk of toks){
    const w = adv(tk.t, size, tk.b);
    if(line.length===0){ tk.x=0; line.push(tk); x=w; }
    else if(x+sp+w > maxW){ lines.push(line); tk.x=0; line=[tk]; x=w; }
    else { tk.x = x+sp; line.push(tk); x = x+sp+w; }
  }
  if(line.length) lines.push(line);
  return lines;
}
/* rich wrapped text; returns {svg,height,lines} */
function rich(x, yTop, maxW, segs, {size=14, color=C.inkSoft, boldColor=C.ink, lh=1.45}={}){
  const lines = wrap(tokens(segs), maxW, size);
  const lineH = size*lh; let svg='';
  lines.forEach((ln,i)=>{
    const yb = yTop + size + i*lineH;
    ln.forEach(tk=>{ svg += pathFor(tk.t, x+tk.x, yb, size, {bold:tk.b, color: tk.b?boldColor:color}); });
  });
  return {svg, height: lines.length*lineH, lines: lines.length};
}
function richHeight(maxW, segs, size, lh=1.45){ return wrap(tokens(segs), maxW, size).length * size*lh; }

/* ============================================================= HEADER */
const headBuf = [];
let hy = 40;
// eyebrow
const ebText='RARE DISEASE AWARENESS';
const ebW = adv(ebText,12,true)+18+22;
headBuf.push(rrect(M, hy, ebW, 30, 15, 'rgba(255,255,255,0.12)', 'rgba(255,255,255,0.24)',1));
headBuf.push(icon('spark', M+11, hy+6, 18, '#EAFBFB', 1.9));
headBuf.push(text(M+35, hy+20, ebText, {size:12, bold:true, color:'#CFF3F2', ls:2}));
hy += 30 + 22;
// title — two fixed lines, all bold; measured with bold metrics (contiguous runs)
const tLines = [
  [{t:'Developmental & Epileptic', col:'#FFFFFF'}],
  [{t:'Encephalopathies ', col:'#FFFFFF'}, {t:'(DEE)', col:'#BFEFEC'}],
];
const tSize=40, tLH=tSize*1.18;
tLines.forEach((ln,i)=>{
  const yb = hy + tSize + i*tLH;
  let x=M;
  ln.forEach(seg=>{ headBuf.push(pathFor(seg.t, x, yb, tSize, {bold:true, color:seg.col})); x += adv(seg.t, tSize, true); });
});
hy += tSize + tLH + 16;
// tagline (mixed)
const tag=[n('One diagnosis —'), b(' multiple disabilities at once,'), n(' reaching across'), b(' every body system'), n(' and'), b(' every stage of life.')];
const tagR = rich(M, hy, 940, tag, {size:20, color:'#E4FBFA', boldColor:'#FFFFFF', lh:1.4});
headBuf.push(tagR.svg); hy += tagR.height + 12;
// definition
const def=[n('DEE is a group of severe, early-onset epilepsies in which frequent epileptiform brain activity itself drives developmental slowing and regression — producing not one impairment, but a web of co-occurring disabilities that compound over a lifetime.')];
// left rule
const defR = rich(M+16, hy, 1000, def, {size:14, color:'#D3F1F0', boldColor:'#fff', lh:1.5});
headBuf.push(`<rect x="${M}" y="${r2(hy+2)}" width="3" height="${r2(defR.height-6)}" fill="rgba(255,255,255,0.45)"/>`);
headBuf.push(defR.svg); hy += defR.height + 22;
// glance pills
const pills=[
  {ic:'systems', big:'5 body systems', small:'brain to behaviour'},
  {ic:'clock',   big:'Lifelong',       small:'infancy → adulthood'},
  {ic:'heart',   big:'Nearly all',     small:'intellectual disability'},
  {ic:'warn',    big:'SUDEP risk',     small:'at every life stage'},
];
const pillGap=14, pillW=(CW-pillGap*3)/4, pillH=62;
pills.forEach((p,i)=>{
  const px=M+i*(pillW+pillGap);
  headBuf.push(rrect(px,hy,pillW,pillH,14,'rgba(255,255,255,0.13)','rgba(255,255,255,0.24)',1));
  headBuf.push(icon(p.ic, px+16, hy+(pillH-22)/2, 22, '#EAFBFB',1.9));
  headBuf.push(text(px+50, hy+28, p.big, {size:15, bold:true, color:'#FFFFFF'}));
  headBuf.push(text(px+50, hy+45, p.small, {size:11.5, color:'#CDEFEE'}));
});
hy += pillH + 38;
const headerH = hy;
// header background + dotted motif
push(`<defs>
  <linearGradient id="hg" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#0C6770"/><stop offset="0.46" stop-color="#0E7C86"/><stop offset="1" stop-color="#149AA0"/>
  </linearGradient>
  <linearGradient id="numg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.brand}"/><stop offset="1" stop-color="${C.brandDeep}"/></linearGradient>
  <linearGradient id="trk" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="${C.cog}"/><stop offset="0.25" stop-color="${C.mot}"/><stop offset="0.5" stop-color="${C.sen}"/><stop offset="0.75" stop-color="${C.med}"/><stop offset="1" stop-color="${C.beh}"/>
  </linearGradient>
  <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#FFFFFF" opacity="0.16"/></pattern>
</defs>`);
push(`<rect x="0" y="0" width="${W}" height="${r2(headerH)}" fill="url(#hg)"/>`);
push(`<rect x="0" y="0" width="${W}" height="${r2(headerH)}" fill="url(#dots)"/>`);
push(...headBuf);

/* ============================================================= SECTION SCAFFOLD */
let y = headerH + 38;
function sectionHead(num, title, sub){
  push(rrect(M, y, 34, 34, 9, 'url(#numg)'));
  push(text(M+17, y+23, String(num), {size:16, bold:true, color:'#fff', anchor:'middle'}));
  push(text(M+48, y+24, title, {size:26, bold:true, color:C.ink}));
  y += 40;
  const sr = rich(M+48, y, CW-48, [n(sub)], {size:14.5, color:C.muted, lh:1.45});
  push(sr.svg); y += sr.height + 24;
}

/* ---------------- SECTION 1 : ACROSS SYSTEMS ---------------- */
sectionHead(1, 'Disability across body systems',
  'DEE rarely affects one area in isolation. In the same person, impairments appear at once across the brain, the body, the senses, vital organs and behaviour — each amplifying the others.');

/* radial */
const cx = W/2, RAD=175, radTop=y, cy=radTop+205;
const nodes=[
  {a:-90, c:C.cog, ic:'cog', l1:'Cognitive', l2:'& intellectual'},
  {a:-18, c:C.sen, ic:'sen', l1:'Communication', l2:'& sensory'},
  {a:54,  c:C.beh, ic:'beh', l1:'Behavioural', l2:'& psychiatric'},
  {a:126, c:C.med, ic:'med', l1:'Medical', l2:'& systemic'},
  {a:198, c:C.mot, ic:'mot', l1:'Motor', l2:'& physical'},
];
// dashed ring
push(`<circle cx="${cx}" cy="${r2(cy)}" r="${RAD}" fill="none" stroke="#E1EAEC" stroke-width="1" stroke-dasharray="2 4"/>`);
// spokes
nodes.forEach(nd=>{
  const rad=nd.a*Math.PI/180, nx=cx+RAD*Math.cos(rad), ny=cy+RAD*Math.sin(rad);
  push(`<line x1="${cx}" y1="${r2(cy)}" x2="${r2(nx)}" y2="${r2(ny)}" stroke="#C9D9DC" stroke-width="1.4"/>`);
});
// emblem
push(`<circle cx="${cx}" cy="${r2(cy)}" r="66" fill="#FFFFFF" stroke="${C.line}" stroke-width="1.5"/>`);
push(icon('person', cx-22, cy-30, 44, C.brandDeep, 1.7));
push(text(cx, cy+24, 'One person', {size:14, bold:true, color:C.ink, anchor:'middle'}));
push(text(cx, cy+40, 'MANY SYSTEMS', {size:10, color:C.muted, anchor:'middle', ls:1.5}));
// nodes
nodes.forEach(nd=>{
  const rad=nd.a*Math.PI/180, nx=cx+RAD*Math.cos(rad), ny=cy+RAD*Math.sin(rad);
  push(rrect(nx-31, ny-31, 62, 62, 18, '#FFFFFF', nd.c, 1.6));
  push(`<rect x="${r2(nx-31)}" y="${r2(ny-31)}" width="62" height="62" rx="18" fill="${nd.c}" opacity="0.10"/>`);
  push(icon(nd.ic, nx-15, ny-15, 30, nd.c, 1.8));
  push(text(nx, ny+48, nd.l1, {size:13.5, bold:true, color:C.ink, anchor:'middle'}));
  push(text(nx, ny+64, nd.l2, {size:11.5, color:C.muted, anchor:'middle'}));
});
y = cy + RAD + 52;
// caption
const capSegs=[b('Co-occurring, not isolated. '), n('Most people with DEE live with several of these disabilities at the same time — the reason their care is so complex.')];
const capW=760, capX=(W-capW)/2;
const capInner=capW-58;
const capH = richHeight(capInner, capSegs, 14, 1.45)+26;
push(rrect(capX, y, capW, capH, 14, C.bg1, C.line,1));
push(icon('info', capX+18, y+(capH-20)/2, 20, C.brand,1.9));
const capR=rich(capX+48, y+13, capInner, capSegs, {size:14, color:C.inkSoft, boldColor:C.ink, lh:1.45});
push(capR.svg);
y += capH + 34;

/* system cards 2x3 */
const cards=[
  {c:C.cog,t:C.cogT,ic:'cog',title:'Cognitive & Intellectual',tag:'THE DEVELOPING BRAIN',items:[
    [b('Intellectual disability in nearly all'),n(' individuals — moderate to profound.')],
    [b('Global developmental delay'),n(' across skills and milestones.')],
    [n('Cognitive skills may '),b('plateau or regress'),n(' from ongoing epileptiform activity.')],
  ]},
  {c:C.mot,t:C.motT,ic:'mot',title:'Motor & Physical',tag:'MOVEMENT & BONES',items:[
    [b('Movement disorders:'),n(' spasticity, tremor, dyskinesia, dystonia.')],
    [b('Orthopaedic complications'),n(' from abnormal tone & limited mobility — scoliosis, hip dislocation.')],
    [b('Bone fragility & fracture risk'),n(' from anti-seizure medication and reduced weight-bearing.')],
  ]},
  {c:C.sen,t:C.senT,ic:'sen',title:'Communication & Sensory',tag:'SPEECH & VISION',items:[
    [b('Expressive & receptive speech'),n(' heavily impacted; some never speak and rely on '),b('non-verbal / AAC'),n(' methods.')],
    [b('Cortical Vision Impairment (CVI)'),n(' is a common co-occurring condition.')],
  ]},
  {c:C.med,t:C.medT,ic:'med',title:'Medical & Systemic',tag:'VITAL & LIFE-THREATENING',items:[
    [b('Gastrointestinal:'),n(' dysphagia & reflux (GERD) raise aspiration & pneumonia risk — feeding tubes often required.')],
    [b('Sleep dysregulation:'),n(' night-time wakefulness & daytime sleepiness limit participation.')],
    [b('Life-threatening risk:'),n(' severe seizures, status epilepticus, and '),b('SUDEP'),n('.')],
  ]},
  {c:C.beh,t:C.behT,ic:'beh',title:'Behavioural & Psychiatric',tag:'MOOD & NEURODEVELOPMENT',items:[
    [n('Frequent overlap with '),b('Autism Spectrum Disorder (ASD)'),n(' and '),b('ADHD'),n('.')],
    [b('Chronic behavioural problems,'),n(' mood disturbance & psychiatric issues complicate daily care and education.')],
  ]},
  {c:C.brand,t:'#E1F1F2',ic:'check',title:'The compounding effect',tag:'WHY IT MATTERS',items:[
    [n('A seizure is rarely one event — it can set back cognition, motor control and sleep '),b('all at once.')],
    [b('Disabilities interact:'),n(' poor sleep worsens seizures; low mobility worsens bones; vision loss limits communication.')],
    [b('Coordinated care'),n(' across many specialists is needed — for life.')],
  ]},
];
const cgap=24, cardW=(CW-cgap)/2;
const colX=[M, M+cardW+cgap];
const txtW = cardW-20-24-18;             // pad/dot/pad
function cardHeight(card){
  let h = 18 + 52 + 10;
  card.items.forEach(it=>{ h += richHeight(txtW, it, 14, 1.4) + 12; });
  return h + 8;
}
function drawCard(card, x, yTop, h){
  push(rrect(x, yTop, cardW, h, 18, '#FFFFFF', C.line,1));
  push(`<clipPath id="cc${x}-${r2(yTop)}"><rect x="${r2(x)}" y="${r2(yTop)}" width="${cardW}" height="${r2(h)}" rx="18"/></clipPath>`);
  push(`<g clip-path="url(#cc${x}-${r2(yTop)})"><rect x="${r2(x)}" y="${r2(yTop)}" width="${cardW}" height="6" fill="${card.c}"/></g>`);
  // header
  push(rrect(x+20, yTop+18, 46, 46, 13, card.t));
  push(icon(card.ic, x+20+10, yTop+18+10, 26, card.c,1.8));
  push(text(x+20+46+14, yTop+38, card.title, {size:17.5, bold:true, color:C.ink}));
  push(text(x+20+46+14, yTop+56, card.tag, {size:11, bold:true, color:card.c, ls:0.5}));
  // bullets
  let by = yTop+18+52+8;
  card.items.forEach(it=>{
    const rr = rich(x+20+24, by, txtW, it, {size:14, color:C.inkSoft, boldColor:C.ink, lh:1.4});
    push(`<rect x="${r2(x+20+4)}" y="${r2(by+6)}" width="9" height="9" rx="3" fill="${card.c}"/>`);
    push(rr.svg);
    by += rr.height + 12;
  });
}
for(let r=0;r<3;r++){
  const left=cards[r*2], right=cards[r*2+1];
  const rowH=Math.max(cardHeight(left), cardHeight(right));
  drawCard(left, colX[0], y, rowH);
  drawCard(right, colX[1], y, rowH);
  y += rowH + 22;
}
y += 16;

/* divider */
push(`<line x1="${M}" y1="${r2(y)}" x2="${W-M}" y2="${r2(y)}" stroke="${C.line}" stroke-width="1"/>`);
y += 40;

/* ---------------- SECTION 2 : ACROSS THE LIFESPAN ---------------- */
sectionHead(2, 'Disability across the lifespan',
  'The impact does not pass with childhood. Disabilities emerge in infancy, deepen through development, and demand lifelong, intensive support — under a constant, heightened risk to life.');

/* ribbon: two boxes */
const rbGap=20, rbW=(CW-rbGap)/2, rbH=78;
const ribbons=[
  {bg:C.warnBg,bd:C.warnBd,ic:'warn',col:C.med, big:'A constant, lifelong risk', small:'Severe seizures, status epilepticus & SUDEP threaten life at every age.'},
  {bg:C.tealBg,bd:C.tealBd,ic:'care',col:C.brand, big:'24/7 care, for life', small:'Most individuals depend on full-time support from infancy through adulthood.'},
];
ribbons.forEach((rb,i)=>{
  const rx=M+i*(rbW+rbGap);
  push(rrect(rx,y,rbW,rbH,14,rb.bg,rb.bd,1));
  push(icon(rb.ic, rx+18, y+(rbH-26)/2, 26, rb.col,1.9));
  push(text(rx+58, y+32, rb.big, {size:15.5, bold:true, color:C.ink}));
  const sr=rich(rx+58, y+38, rbW-76, [n(rb.small)], {size:12.5, color:C.inkSoft, lh:1.35});
  push(sr.svg);
});
y += rbH + 30;

/* timeline */
const stages=[
  {c:C.cog, age:'INFANCY', h:'Onset', items:['Seizures begin, often hard to control','Early developmental delay appears','Feeding & sleep difficulties start']},
  {c:C.mot, age:'EARLY CHILDHOOD', h:'Plateau & regression', items:['Skills plateau or are lost','Movement disorders & CVI emerge','AAC / non-verbal communication']},
  {c:C.sen, age:'SCHOOL AGE', h:'Complexity grows', items:['Intellectual disability defined','Scoliosis & hip problems develop','ASD / ADHD & behavioural needs']},
  {c:C.med, age:'ADOLESCENCE', h:'Accumulating toll', items:['Bone fragility & fracture risk rise','Scoliosis may progress','Transition-to-adult-care planning']},
  {c:C.beh, age:'ADULTHOOD', h:'Lifelong support', items:['Full-time complex daily care','Multi-system management ongoing','Persistent seizure & SUDEP risk']},
];
const sGap=16, sW=(CW-sGap*4)/5;
const dotY=y+10;
// track behind dots
push(`<rect x="${M+sW/2}" y="${r2(dotY-3)}" width="${CW-sW}" height="6" rx="3" fill="url(#trk)" opacity="0.9"/>`);
// boxes: compute height
const sTxtW=sW-26;
let sBoxH=0;
stages.forEach(st=>{ let hh=14; st.items.forEach(it=> hh+=richHeight(sTxtW,[n(it)],12.5,1.3)+8); sBoxH=Math.max(sBoxH,hh+14); });
const boxTop=dotY+58;
stages.forEach((st,i)=>{
  const sx=M+i*(sW+sGap), mid=sx+sW/2;
  // dot
  push(`<circle cx="${r2(mid)}" cy="${r2(dotY)}" r="9" fill="#fff" stroke="${st.c}" stroke-width="5"/>`);
  push(text(mid, dotY+30, st.age, {size:11, bold:true, color:st.c, anchor:'middle', ls:0.5}));
  push(text(mid, dotY+48, st.h, {size:15, bold:true, color:C.ink, anchor:'middle'}));
  // box
  push(rrect(sx, boxTop, sW, sBoxH, 14, '#FFFFFF', C.line,1));
  push(`<clipPath id="sb${i}"><rect x="${r2(sx)}" y="${r2(boxTop)}" width="${sW}" height="${r2(sBoxH)}" rx="14"/></clipPath>`);
  push(`<g clip-path="url(#sb${i})"><rect x="${r2(sx)}" y="${r2(boxTop)}" width="${sW}" height="3" fill="${st.c}"/></g>`);
  let iy=boxTop+12;
  st.items.forEach(it=>{
    push(`<circle cx="${r2(sx+12)}" cy="${r2(iy+8)}" r="3" fill="${st.c}"/>`);
    const rr=rich(sx+20, iy, sTxtW-8, [n(it)], {size:12.5, color:C.inkSoft, lh:1.3});
    push(rr.svg); iy += rr.height + 8;
  });
});
y = boxTop + sBoxH + 26;
// legend
const leg=[['Cognitive',C.cog],['Motor',C.mot],['Communication',C.sen],['Medical',C.med],['Behavioural',C.beh]];
let lx=M;
leg.forEach(([lab,col])=>{
  push(`<rect x="${r2(lx)}" y="${r2(y)}" width="13" height="13" rx="4" fill="${col}"/>`);
  push(text(lx+20, y+11.5, lab, {size:12.5, color:C.inkSoft}));
  lx += 20 + adv(lab,12.5,false) + 26;
});
y += 13 + 36;

/* ---------------- FOOTER ---------------- */
const footTop=y;
const noteSegs=[n('Educational summary of the disability impact of DEE, compiled for awareness. Presentation varies by individual and genetic cause; this is not medical advice.')];
const noteW=560;
const noteH=richHeight(noteW, noteSegs, 11.5, 1.5);
const footH=Math.max(50, noteH)+48;
push(`<rect x="0" y="${r2(footTop)}" width="${W}" height="${r2(footH)}" fill="${C.bg1}"/>`);
push(`<line x1="0" y1="${r2(footTop)}" x2="${W}" y2="${r2(footTop)}" stroke="${C.line}" stroke-width="1"/>`);
const fcy=footTop+footH/2;
push(rrect(M, fcy-21, 42,42,12,'url(#numg)'));
push(icon('care', M+9, fcy-12, 24, '#fff',1.8));
push(text(M+58, fcy-2, 'Kris Pierce Consulting', {size:15, bold:true, color:C.ink}));
push(text(M+58, fcy+16, 'Rare disease advocacy & awareness', {size:12.5, color:C.muted}));
const noteR=rich(W-M-noteW, footTop+(footH-noteH)/2, noteW, noteSegs, {size:11.5, color:C.muted, lh:1.5});
push(noteR.svg);
y = footTop + footH;

/* ============================================================= ASSEMBLE */
const H = Math.ceil(y);
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<rect width="${W}" height="${H}" fill="#FFFFFF"/>
${out.join('\n')}
</svg>`;

const dest = process.argv[2] || path.join(__dirname, '..', 'assets', 'dee-impact.png');
const svgPath = dest.replace(/\.png$/i, '.svg');
fs.writeFileSync(svgPath, svg);
console.log('SVG written:', svgPath, 'canvas', W+'x'+H);

const resvg = new Resvg(svg, {
  fitTo:{ mode:'width', value: W*2 },
  font:{ fontFiles:[DJ+'DejaVuSans.ttf', DJ+'DejaVuSans-Bold.ttf'], loadSystemFonts:false, defaultFontFamily:'DejaVu Sans' },
  background:'white',
});
const png = resvg.render().asPng();
fs.writeFileSync(dest, png);
console.log('PNG written:', dest, (png.length/1024).toFixed(0)+' KB', 'at', (W*2)+'px wide');
