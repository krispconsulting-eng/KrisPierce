/* DEE grant figure — landscape "envelope" format. Areas impacted -> how it compounds -> life course. */
const fs=require('fs'), path=require('path');
const opentype=require('opentype.js');
const { Resvg }=require('@resvg/resvg-js');
const DJ='/usr/share/fonts/truetype/dejavu/';
const loadFont=p=>{const b=fs.readFileSync(p);return opentype.parse(b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength));};
const fontReg=loadFont(DJ+'DejaVuSans.ttf'), fontBold=loadFont(DJ+'DejaVuSans-Bold.ttf');

const C={ink:'#15303A',inkSoft:'#3A5560',muted:'#5F7A85',line:'#DCE6EA',paper:'#FFFFFF',bg1:'#EEF4F6',bg2:'#E4EEF1',
  brand:'#0E7C86',brandDeep:'#0B5A62',
  cog:'#5B53C6',cogT:'#ECEBFB',mot:'#0E8C9B',motT:'#DFF2F4',sen:'#B0700A',senT:'#FAEFD8',med:'#C2475C',medT:'#FBE6EA',beh:'#2E8B57',behT:'#E2F2E9',
  warnBg:'#FDECEF',warnBd:'#F3D6DC',tealBg:'#E2F2F3',tealBd:'#CDE6E7'};
const I={
  cog:'<path d="M12 3a6 6 0 0 0-4 10.5c.6.6 1 1.5 1 2.5h6c0-1 .4-1.9 1-2.5A6 6 0 0 0 12 3z"/><path d="M9 18h6"/><path d="M10 21h4"/>',
  mot:'<circle cx="12" cy="5" r="2.2"/><path d="M12 7.2v6"/><path d="M12 13.2 9 20"/><path d="M12 13.2 15 20"/><path d="M7 9.6l5 1.9 5-1.9"/>',
  sen:'<path d="M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-4 4v-4H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"/><circle cx="8.5" cy="10.5" r="1"/><circle cx="12" cy="10.5" r="1"/><circle cx="15.5" cy="10.5" r="1"/>',
  med:'<path d="M12 20S4 14.6 4 8.9A3.8 3.8 0 0 1 12 6a3.8 3.8 0 0 1 8 2.9C20 14.6 12 20 12 20z"/>',
  beh:'<circle cx="12" cy="12" r="9"/><circle cx="9" cy="10.5" r="1"/><circle cx="15" cy="10.5" r="1"/><path d="M8.8 15c1-.9 1.9-.9 2.9 0s1.9.9 2.9 0"/>',
  warn:'<path d="M10.3 3.2 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.2a2 2 0 0 0-3.4 0z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  care:'<path d="M12 21s-7-4.7-7-10.5A3.5 3.5 0 0 1 12 7a3.5 3.5 0 0 1 7 3.5C19 16.3 12 21 12 21z"/><circle cx="12" cy="10.3" r="2"/>',
  overlap:'<circle cx="9.5" cy="12" r="5.4"/><circle cx="14.5" cy="12" r="5.4"/>',
  swap:'<path d="M4 9.5h13"/><path d="M14 6.5l3 3-3 3"/><path d="M20 14.5H7"/><path d="M10 11.5l-3 3 3 3"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
};

const W=1520, M=46, CW=W-M*2;
const r2=n=>Math.round(n*10)/10;
const out=[]; const push=(...x)=>out.push(...x);
const n=t=>({t,b:false}), b=t=>({t,b:true});
const advCache=new Map();
function adv(s,size,bold){const k=(bold?'b':'r')+size+'|'+s; if(advCache.has(k))return advCache.get(k);
  const f=bold?fontBold:fontReg, sc=size/f.unitsPerEm; let w=0;
  for(const ch of s){const g=f.charToGlyph(ch); w+=(g&&g.advanceWidth?g.advanceWidth:f.unitsPerEm*0.6)*sc;} advCache.set(k,w); return w;}
function icon(name,x,y,size,color,sw=1.8){const s=size/24;
  return `<g transform="translate(${r2(x)},${r2(y)}) scale(${r2(s)})" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${I[name]}</g>`;}
function rrect(x,y,w,h,r,fill,stroke,sw=1){return `<rect x="${r2(x)}" y="${r2(y)}" width="${r2(w)}" height="${r2(h)}" rx="${r}" fill="${fill}"${stroke?` stroke="${stroke}" stroke-width="${sw}"`:''}/>`;}
function pathFor(str,x,y,size,{bold=false,color='#000',anchor='start',ls=0}={}){
  const f=bold?fontBold:fontReg, sc=size/f.unitsPerEm, gw=g=>((g&&g.advanceWidth?g.advanceWidth:f.unitsPerEm*0.6)*sc);
  if(anchor!=='start'){let w=0;for(const ch of str){w+=gw(f.charToGlyph(ch))+ls;}if(ls)w-=ls; x=anchor==='middle'?x-w/2:x-w;}
  let X=x,d=''; for(const ch of str){const g=f.charToGlyph(ch); d+=g.getPath(X,y,size).toPathData(2); X+=gw(g)+ls;}
  return d?`<path d="${d}" fill="${color}"/>`:'';}
function text(x,y,str,o={}){return pathFor(str,x,y,o.size||14,{bold:!!o.bold,color:o.color||C.ink,anchor:o.anchor||'start',ls:o.ls||0});}
function tokens(segs){const t=[];segs.forEach(s=>s.t.trim().split(/\s+/).filter(Boolean).forEach(w=>t.push({t:w,b:s.b})));
  const m=[];for(const tk of t){if(m.length&&/^[.,;:!?)]+$/.test(tk.t)){const p=m[m.length-1];m[m.length-1]={t:p.t+tk.t,b:p.b};}else m.push({...tk});}return m;}
function wrap(toks,maxW,size){const sp=adv(' ',size,false);const lines=[];let line=[],x=0;
  for(const tk of toks){const w=adv(tk.t,size,tk.b);
    if(!line.length){tk.x=0;line.push(tk);x=w;}
    else if(x+sp+w>maxW){lines.push(line);tk.x=0;line=[tk];x=w;}
    else{tk.x=x+sp;line.push(tk);x+=sp+w;}}
  if(line.length)lines.push(line);return lines;}
function rich(x,yTop,maxW,segs,{size=14,color=C.inkSoft,boldColor=C.ink,lh=1.42}={}){
  const lines=wrap(tokens(segs),maxW,size),lineH=size*lh;let svg='';
  lines.forEach((ln,i)=>{const yb=yTop+size+i*lineH; ln.forEach(tk=>{svg+=pathFor(tk.t,x+tk.x,yb,size,{bold:tk.b,color:tk.b?boldColor:color});});});
  return {svg,height:lines.length*lineH,lines:lines.length};}
function richH(maxW,segs,size,lh=1.42){return wrap(tokens(segs),maxW,size).length*size*lh;}

/* defs */
push(`<defs>
<linearGradient id="numg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.brand}"/><stop offset="1" stop-color="${C.brandDeep}"/></linearGradient>
<linearGradient id="trk" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.cog}"/><stop offset="0.25" stop-color="${C.mot}"/><stop offset="0.5" stop-color="${C.sen}"/><stop offset="0.75" stop-color="${C.med}"/><stop offset="1" stop-color="${C.beh}"/></linearGradient>
</defs>`);

let y=44;

/* ---- slim identifier (condition only; no branding) ---- */
let tx=M;
[{t:'Developmental & Epileptic Encephalopathies ',c:C.ink},{t:'(DEE)',c:C.brand}].forEach(s=>{push(pathFor(s.t,tx,y+22,23,{bold:true,color:s.c}));tx+=adv(s.t,23,true);});
const thesis=[n('A single diagnosis produces '),b('multiple, co-occurring disabilities'),n(' that span '),b('every body system'),n(' — and '),b('compound across an entire lifetime.')];
const thr=rich(M,y+34,CW,thesis,{size:15,color:C.inkSoft,boldColor:C.ink,lh:1.4});push(thr.svg);
y+=34+thr.height+14;
push(`<rect x="${M}" y="${r2(y)}" width="${CW}" height="3" rx="1.5" fill="url(#trk)"/>`);
y+=22;

/* ============ ROW A : AREAS OF DISABILITY IMPACT ============ */
function secLabel(txt,yy,col=C.brandDeep){push(`<rect x="${M}" y="${r2(yy-10)}" width="12" height="12" rx="3" fill="${col}"/>`);push(text(M+22,yy,txt,{size:12.5,bold:true,color:col,ls:1.2}));}
secLabel('AREAS OF DISABILITY IMPACT', y+4); y+=24;

const areas=[
 {c:C.cog,t:C.cogT,ic:'cog',title:'Cognitive & Intellectual',items:[[b('Intellectual disability'),n(' — near-universal')],[b('Developmental delay'),n(' & regression')]]},
 {c:C.mot,t:C.motT,ic:'mot',title:'Motor & Physical',items:[[b('Spasticity, dystonia,'),n(' tremor')],[b('Scoliosis'),n(' & hip dislocation')],[b('Fragile bones,'),n(' fractures')]]},
 {c:C.sen,t:C.senT,ic:'sen',title:'Communication & Sensory',items:[[b('Often non-verbal'),n(' — AAC reliant')],[b('Cortical vision impairment')]]},
 {c:C.med,t:C.medT,ic:'med',title:'Medical & Systemic',items:[[b('Dysphagia & reflux'),n(' — tube fed')],[b('Disrupted sleep')],[b('Seizures, status, '),b('SUDEP')]]},
 {c:C.beh,t:C.behT,ic:'beh',title:'Behavioural & Psychiatric',items:[[b('Autism & ADHD'),n(' overlap')],[b('Mood & behaviour'),n(' needs')]]},
];
const aGap=14, aW=(CW-aGap*4)/5;
const aTitleW=aW-30, aTxtW=aW-18-16-10;
function areaH(a){let h=14+40+8; h+=richH(aTitleW,[n(a.title)],14.5,1.2)+8; a.items.forEach(it=>h+=richH(aTxtW,it,12.5,1.28)+9); return h+10;}
const aH=Math.max(...areas.map(areaH));
const aTop=y;
const aCenters=[];
areas.forEach((a,i)=>{
  const x=M+i*(aW+aGap); aCenters.push(x+aW/2);
  push(rrect(x,aTop,aW,aH,15,'#FFFFFF',C.line,1));
  push(`<clipPath id="a${i}"><rect x="${r2(x)}" y="${r2(aTop)}" width="${aW}" height="${aH}" rx="15"/></clipPath>`);
  push(`<g clip-path="url(#a${i})"><rect x="${r2(x)}" y="${r2(aTop)}" width="${aW}" height="5" fill="${a.c}"/></g>`);
  push(rrect(x+16,aTop+16,40,40,12,a.t)); push(icon(a.ic,x+16+8,aTop+16+8,24,a.c,1.8));
  const tr=rich(x+16,aTop+16+40+8,aTitleW,[n(a.title)],{size:14.5,color:C.ink,boldColor:C.ink,lh:1.2});
  // render title bold:
  push(rich(x+16,aTop+16+40+8,aTitleW, a.title.split(' ').map(w=>({t:w,b:true})), {size:14.5,boldColor:C.ink,lh:1.2}).svg);
  let by=aTop+16+40+8+richH(aTitleW,[n(a.title)],14.5,1.2)+8;
  a.items.forEach(it=>{push(`<circle cx="${r2(x+16+4)}" cy="${r2(by+7)}" r="2.6" fill="${a.c}"/>`);
    const rr=rich(x+16+14,by,aTxtW,it,{size:12.5,color:C.inkSoft,boldColor:C.ink,lh:1.28});push(rr.svg);by+=rr.height+9;});
});
y=aTop+aH;

/* ============ ROW B : HOW IMPACTS COMPOUND ============ */
const bandTop=y+34;
// convergence connectors from each card into the band
aCenters.forEach((cxp,i)=>{
  const col=[C.cog,C.mot,C.sen,C.med,C.beh][i];
  const x2=W/2 + (cxp-W/2)*0.18; // funnel toward centre
  push(`<path d="M${r2(cxp)} ${r2(y+4)} C ${r2(cxp)} ${r2(y+20)} ${r2(x2)} ${r2(bandTop-18)} ${r2(x2)} ${r2(bandTop-2)}" fill="none" stroke="${col}" stroke-width="2" opacity="0.55"/>`);
  push(`<circle cx="${r2(x2)}" cy="${r2(bandTop-2)}" r="2.6" fill="${col}"/>`);
});
const bandH=132;
push(rrect(M,bandTop,CW,bandH,16,'#F5F8FA',C.line,1));
push(`<clipPath id="bnd"><rect x="${M}" y="${r2(bandTop)}" width="${CW}" height="${bandH}" rx="16"/></clipPath>`);
push(`<g clip-path="url(#bnd)"><rect x="${M}" y="${r2(bandTop+bandH-7)}" width="${CW}" height="7" fill="url(#trk)"/></g>`);
secLabel('HOW IMPACTS COMPOUND', bandTop+24, C.brandDeep);
push(rrect(M+22,bandTop+38,34,34,10,'#E1F1F2')); push(icon('overlap',M+22+6,bandTop+38+6,22,C.brand,1.8));
push(text(M+68,bandTop+58,'These disabilities don’t occur in isolation — they magnify one another.',{size:17,bold:true,color:C.ink}));
const bodyB=[n('Each impairment worsens the rest: seizures fragment sleep, immobility weakens bones, and vision loss limits communication — so the '),b('lived disability is far greater than the sum of its parts,'),n(' and support must address the whole person.')];
const bbr=rich(M+68,bandTop+70,CW-460,bodyB,{size:13.5,color:C.inkSoft,boldColor:C.ink,lh:1.36});push(bbr.svg);
// loop chips on right
const loops=['Seizures ⇄ Sleep','Immobility ⇄ Bone loss','Vision ⇄ Communication'];
let chY=bandTop+34;
loops.forEach(lp=>{const cw=adv(lp,12.5,true)+50, cxr=W-M-22-cw;
  push(rrect(cxr,chY,cw,30,9,'#FFFFFF',C.line,1)); push(icon('swap',cxr+10,chY+5,20,C.brand,1.8));
  push(text(cxr+34,chY+20,lp,{size:12.5,bold:true,color:C.ink})); chY+=38;});
y=bandTop+bandH;

/* ============ ROW C : ACROSS THE LIFE COURSE ============ */
secLabel('ACROSS THE LIFE COURSE', y+38, C.brandDeep); y+=58;
const stages=[
 {c:C.cog,age:'INFANCY',h:'Onset',items:['Seizures begin','Delay appears']},
 {c:C.mot,age:'EARLY CHILDHOOD',h:'Plateau & regression',items:['Skills lost','Movement disorder, CVI']},
 {c:C.sen,age:'SCHOOL AGE',h:'Complexity grows',items:['ID defined; scoliosis','ASD / ADHD, behaviour']},
 {c:C.med,age:'ADOLESCENCE',h:'Accumulating toll',items:['Fracture risk rises','Transition planning']},
 {c:C.beh,age:'ADULTHOOD',h:'Lifelong support',items:['Full-time complex care','Persistent SUDEP risk']},
];
const sGap=14, sW=(CW-sGap*4)/5, dotY=y+9;
push(`<rect x="${r2(M+sW/2)}" y="${r2(dotY-3)}" width="${r2(CW-sW)}" height="6" rx="3" fill="url(#trk)"/>`);
const sTxtW=sW-26; let sBoxH=0;
stages.forEach(st=>{let hh=12;st.items.forEach(it=>hh+=richH(sTxtW,[n(it)],12.5,1.28)+7);sBoxH=Math.max(sBoxH,hh+12);});
const boxTop=dotY+56;
stages.forEach((st,i)=>{const sx=M+i*(sW+sGap),mid=sx+sW/2;
  push(`<circle cx="${r2(mid)}" cy="${r2(dotY)}" r="9" fill="#fff" stroke="${st.c}" stroke-width="5"/>`);
  push(text(mid,dotY+28,st.age,{size:11,bold:true,color:st.c,anchor:'middle',ls:0.5}));
  push(text(mid,dotY+45,st.h,{size:14,bold:true,color:C.ink,anchor:'middle'}));
  push(rrect(sx,boxTop,sW,sBoxH,13,'#FFFFFF',C.line,1));
  push(`<clipPath id="s${i}"><rect x="${r2(sx)}" y="${r2(boxTop)}" width="${sW}" height="${r2(sBoxH)}" rx="13"/></clipPath>`);
  push(`<g clip-path="url(#s${i})"><rect x="${r2(sx)}" y="${r2(boxTop)}" width="${sW}" height="3" fill="${st.c}"/></g>`);
  let iy=boxTop+11; st.items.forEach(it=>{push(`<circle cx="${r2(sx+12)}" cy="${r2(iy+8)}" r="2.6" fill="${st.c}"/>`);
    const rr=rich(sx+20,iy,sTxtW-8,[n(it)],{size:12.5,color:C.inkSoft,lh:1.28});push(rr.svg);iy+=rr.height+7;});
});
y=boxTop+sBoxH+18;
// lifelong emphasis bar
const ebH=46;
push(rrect(M,y,CW,ebH,12,C.tealBg,C.tealBd,1));
push(icon('care',M+18,y+(ebH-24)/2,24,C.brand,1.9));
const emph=[b('Lifelong, 24/7 support'),n(' — under a constant, heightened risk to life ('),b('status epilepticus, SUDEP'),n(') at every stage.')];
const er=rich(M+54,y+(ebH-richH(CW-90,emph,14.5,1.3))/2,CW-90,emph,{size:14.5,color:C.ink,boldColor:C.ink,lh:1.3});push(er.svg);
y+=ebH;

/* assemble */
const H=Math.ceil(y+M);
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><rect width="${W}" height="${H}" fill="#FFFFFF"/>\n${out.join('\n')}\n</svg>`;
const dest=process.argv[2]||path.join(__dirname,'..','assets','dee-impact-grant.png');
const svgPath=dest.replace(/\.png$/i,'.svg');
fs.writeFileSync(svgPath,svg); console.log('SVG',svgPath,W+'x'+H,'ratio',(W/H).toFixed(2));
const png=new Resvg(svg,{fitTo:{mode:'width',value:W*2},background:'white'}).render().asPng();
fs.writeFileSync(dest,png); console.log('PNG',dest,(png.length/1024).toFixed(0)+'KB',W*2+'px');
