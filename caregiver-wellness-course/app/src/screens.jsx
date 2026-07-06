import { useState, useEffect } from "react";
import { Icon } from "./icons";
import {
  WEDGES, WEDGE_CONFIG, QUESTIONS, ACTIVITIES, BONUS_CHALLENGES, BADGES,
  LEVEL_THRESHOLDS, scoreWedge, getLevel, getUserLevel,
} from "./data";
import { WellnessWheelSVG, ProgressRing, BadgeMedallion, BadgeModal } from "./components";

export function Assessment({ onComplete }) {
  const [cW,setCW]=useState(0), [cQ,setCQ]=useState(0), [answers,setAnswers]=useState({}), [sel,setSel]=useState(null);
  const wedge=WEDGES[cW], cfg=WEDGE_CONFIG[wedge], qs=QUESTIONS[wedge];
  const total=64, done=cW*8+cQ, pct=Math.round(done/total*100);
  const labels=["Never","Rarely","Sometimes","Often","Always"];

  function next() {
    if(sel===null) return;
    const na={...answers,[`${wedge}_${cQ}`]:sel};
    setAnswers(na); setSel(null);
    if(cQ<7){setCQ(cQ+1);}
    else if(cW<7){setCW(cW+1);setCQ(0);}
    else {
      const scores={};
      WEDGES.forEach(w=>{scores[w]=scoreWedge(Array.from({length:8},(_,i)=>na[`${w}_${i}`]??0));});
      onComplete(scores);
    }
  }

  return (
    <div style={{maxWidth:680,margin:"0 auto",padding:"24px 16px"}}>
      <div style={{marginBottom:20}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
          <span style={{fontSize:13,color:"#8593a0",fontFamily:"Hanken Grotesk,sans-serif"}}>{done} of {total}</span>
          <span style={{fontSize:13,fontWeight:600,color:cfg.color,fontFamily:"Newsreader,Georgia,serif",display:"flex",alignItems:"center",gap:6}}><Icon name={cfg.icon} size={15} color={cfg.color}/> {wedge}</span>
        </div>
        <div style={{background:"#eef1f2",borderRadius:99,height:6,overflow:"hidden"}}>
          <div style={{width:`${pct}%`,background:cfg.color,height:"100%",transition:"width 0.3s",borderRadius:99}}/>
        </div>
      </div>
      <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:24}}>
        {WEDGES.map((w,i)=>{
          const isDone=i<cW; const isActive=i===cW;
          return <div key={w} style={{padding:"4px 10px",borderRadius:99,fontSize:11,background:isDone?WEDGE_CONFIG[w].color:isActive?WEDGE_CONFIG[w].light:"#f2f4f5",color:isDone?"white":isActive?WEDGE_CONFIG[w].color:"#a6b1b8",fontWeight:isActive||isDone?600:400,border:`1.5px solid ${isActive||isDone?WEDGE_CONFIG[w].color:"#e9edef"}`,transition:"all 0.3s",fontFamily:"Hanken Grotesk,sans-serif",display:"inline-flex",alignItems:"center",gap:4}}>{isDone?<Icon name="check" size={11}/>:<Icon name={WEDGE_CONFIG[w].icon} size={11}/>}{w}</div>;
        })}
      </div>
      <div style={{background:"white",borderRadius:16,padding:"28px 24px",boxShadow:"0 4px 24px rgba(0,0,0,0.07)",borderTop:`4px solid ${cfg.color}`,marginBottom:20}}>
        <div style={{fontSize:11,color:cfg.color,fontWeight:600,letterSpacing:1,textTransform:"uppercase",marginBottom:10,fontFamily:"Hanken Grotesk,sans-serif"}}>{wedge} · Q{cQ+1} of 8</div>
        <p style={{fontSize:17,fontWeight:600,color:"#20303A",lineHeight:1.55,marginBottom:28,fontFamily:"Newsreader,Georgia,serif"}}>{qs[cQ]}</p>
        <div style={{display:"flex",gap:8}}>
          {[1,2,3,4,5].map(v=>(
            <button key={v} onClick={()=>setSel(v)} style={{flex:1,padding:"12px 4px",borderRadius:10,border:`2px solid ${sel===v?cfg.color:"#e5eaec"}`,background:sel===v?cfg.color:"white",color:sel===v?"white":"#4a5760",cursor:"pointer",transition:"all 0.2s",display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
              <span style={{fontSize:18,fontWeight:600}}>{v}</span>
              <span style={{fontSize:10}}>{labels[v-1]}</span>
            </button>
          ))}
        </div>
      </div>
      <button onClick={next} disabled={sel===null} style={{width:"100%",padding:"14px",background:sel!==null?cfg.color:"#c3ccd1",color:"white",border:"none",borderRadius:999,fontSize:15,fontWeight:600,cursor:sel!==null?"pointer":"not-allowed",fontFamily:"Hanken Grotesk,sans-serif",transition:"background 180ms"}}>
        {cW===7&&cQ===7?"See My Results →":"Next →"}
      </button>
    </div>
  );
}

export function Report({ scores, onSignUp }) {
  const sorted=[...WEDGES].sort((a,b)=>scores[a]-scores[b]);
  const lowest=sorted.slice(0,3), highest=sorted.slice(-3).reverse();
  const overall=Math.round(WEDGES.reduce((s,w)=>s+scores[w],0)/8);
  const lvl=getLevel(overall);

  return (
    <div style={{maxWidth:720,margin:"0 auto",padding:"24px 16px"}}>
      <div style={{textAlign:"center",marginBottom:28}}>
        <h1 style={{fontFamily:"Newsreader,Georgia,serif",fontSize:27,color:"#20303A",marginBottom:8}}>Where you are today</h1>
        <p style={{color:"#5c6b72",fontSize:15,lineHeight:1.6,maxWidth:460,margin:"0 auto"}}>A snapshot of how the different parts of your life are feeling right now, not a score to pass. Right now, things look <strong style={{color:lvl.color}}>{lvl.label.toLowerCase()}</strong> overall.</p>
      </div>
      <div style={{display:"flex",justifyContent:"center",marginBottom:32}}><div style={{width:280}}><WellnessWheelSVG scores={scores}/></div></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(170px, 1fr))",gap:12,marginBottom:28}}>
        {WEDGES.map(w=>{
          const cfg=WEDGE_CONFIG[w], sc=scores[w], lv=getLevel(sc);
          return <div key={w} style={{background:"white",borderRadius:12,padding:"14px 16px",border:"1px solid #e9edef",display:"flex",alignItems:"center",gap:12}}>
            <ProgressRing score={sc} color={cfg.color} size={52}/>
            <div><div style={{fontWeight:600,fontSize:14,fontFamily:"Newsreader,Georgia,serif",color:"#20303A",display:"flex",alignItems:"center",gap:6}}><Icon name={cfg.icon} size={14} color={cfg.color}/> {w}</div><div style={{fontSize:11,color:lv.color,fontWeight:600}}>{lv.label}</div></div>
          </div>;
        })}
      </div>
      <div style={{background:"#F0DEE0",borderRadius:14,padding:"20px",marginBottom:16,border:"1px solid #E3CCD0"}}>
        <h3 style={{fontFamily:"Newsreader,Georgia,serif",color:"#B3707A",marginBottom:12,fontSize:16,display:"flex",alignItems:"center",gap:8}}><Icon name="target" size={17} color="#B3707A"/> Where you might start</h3>
        <p style={{fontSize:13,color:"#5c6b72",marginBottom:12,lineHeight:1.6}}>These parts of life seem to be asking for a little attention right now. There's no right answer here, and nothing you've done wrong. They're just a gentle place to begin.</p>
        {lowest.map(w=><div key={w} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}><Icon name={WEDGE_CONFIG[w].icon} size={19} color={WEDGE_CONFIG[w].color}/><strong style={{fontFamily:"Newsreader,Georgia,serif",color:"#20303A"}}>{w}</strong><span style={{color:"#93a0a6",fontSize:13}}>· {getLevel(scores[w]).label}</span></div>)}
      </div>
      <div style={{background:"#DCE8EF",borderRadius:14,padding:"20px",marginBottom:28,border:"1px solid #CBDDE9"}}>
        <h3 style={{fontFamily:"Newsreader,Georgia,serif",color:"#4A7690",marginBottom:12,fontSize:16,display:"flex",alignItems:"center",gap:8}}><Icon name="sparkle" size={17} color="#4A7690"/> What's holding you steady</h3>
        <p style={{fontSize:13,color:"#5c6b72",marginBottom:12,lineHeight:1.6}}>The parts you've managed to hold onto, even now. Worth noticing, and worth leaning on.</p>
        {highest.map(w=><div key={w} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}><Icon name={WEDGE_CONFIG[w].icon} size={19} color={WEDGE_CONFIG[w].color}/><strong style={{fontFamily:"Newsreader,Georgia,serif",color:"#20303A"}}>{w}</strong><span style={{color:"#93a0a6",fontSize:13}}>· {getLevel(scores[w]).label}</span></div>)}
      </div>
      <button onClick={onSignUp} style={{width:"100%",padding:"16px",background:"#4A7690",color:"white",border:"none",borderRadius:999,fontSize:16,fontWeight:600,cursor:"pointer",fontFamily:"Hanken Grotesk,sans-serif",transition:"background 180ms"}}>
        Start My 8-Week Wellness Plan →
      </button>
    </div>
  );
}

export function SignUp({ scores, onStart }) {
  const [name,setName]=useState(""), [focus,setFocus]=useState([]), [email,setEmail]=useState("");
  const suggested=[...WEDGES].sort((a,b)=>scores[a]-scores[b]).slice(0,3);
  const toggle=w=>focus.includes(w)?setFocus(focus.filter(x=>x!==w)):focus.length<3?setFocus([...focus,w]):null;
  const ok=name.trim()&&focus.length>=2;

  return (
    <div style={{maxWidth:560,margin:"0 auto",padding:"24px 16px"}}>
      <div style={{textAlign:"center",marginBottom:28}}>
        <div style={{display:"flex",justifyContent:"center",marginBottom:12}}><Icon name="mark" size={40} color="#4A7690"/></div>
        <h2 style={{fontFamily:"Newsreader,Georgia,serif",fontSize:25,color:"#20303A",marginBottom:8}}>Set up your plan</h2>
        <p style={{color:"#5c6b72",fontSize:14,lineHeight:1.7,maxWidth:400,margin:"0 auto"}}>Three small steps a week, for eight weeks. Little wins to notice as you go, at a pace that fits a caregiving life.</p>
      </div>
      <div style={{background:"white",borderRadius:14,padding:"24px",border:"1px solid #e9edef",marginBottom:20}}>
        <label style={{display:"block",fontSize:13,fontWeight:600,color:"#4a5760",marginBottom:6,fontFamily:"Newsreader,Georgia,serif"}}>Your first name</label>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="First name" style={{width:"100%",padding:"10px 14px",borderRadius:8,border:"1.5px solid #dde3e6",fontSize:15,fontFamily:"Hanken Grotesk,sans-serif",boxSizing:"border-box"}}/>
        <label style={{display:"block",fontSize:13,fontWeight:600,color:"#4a5760",margin:"18px 0 6px",fontFamily:"Newsreader,Georgia,serif"}}>A weekly check-in by email? (optional)</label>
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" style={{width:"100%",padding:"10px 14px",borderRadius:8,border:"1.5px solid #dde3e6",fontSize:15,fontFamily:"Hanken Grotesk,sans-serif",boxSizing:"border-box"}}/>
        <p style={{fontSize:12,color:"#93a0a6",lineHeight:1.6,margin:"8px 0 0"}}>Leave this blank and everything stays on your device. Add your email and we'll send one gentle check-in a week during your eight weeks, nothing else, and you can stop any time.</p>
      </div>
      <div style={{background:"white",borderRadius:14,padding:"24px",border:"1px solid #e9edef",marginBottom:28}}>
        <div style={{fontSize:13,fontWeight:600,color:"#4a5760",marginBottom:4,fontFamily:"Newsreader,Georgia,serif"}}>Choose 2–3 focus areas</div>
        <div style={{fontSize:12,color:"#93a0a6",marginBottom:16,display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>Suggested: {suggested.map((w,i)=><span key={w} style={{display:"inline-flex",alignItems:"center",gap:4}}><Icon name={WEDGE_CONFIG[w].icon} size={13} color={WEDGE_CONFIG[w].color}/>{w}{i<suggested.length-1?",":""}</span>)}</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(170px, 1fr))",gap:10}}>
          {WEDGES.map(w=>{const cfg=WEDGE_CONFIG[w],active=focus.includes(w);return(
            <button key={w} onClick={()=>toggle(w)} style={{padding:"10px 12px",borderRadius:10,border:`2px solid ${active?cfg.color:"#e5eaec"}`,background:active?cfg.light:"white",cursor:"pointer",display:"flex",alignItems:"center",gap:8,transition:"all 0.2s"}}>
              <Icon name={cfg.icon} size={17} color={cfg.color}/>
              <div style={{textAlign:"left"}}><div style={{fontSize:13,fontWeight:600,color:active?cfg.color:"#4a5760",fontFamily:"Newsreader,Georgia,serif"}}>{w}</div><div style={{fontSize:11,color:"#93a0a6"}}>{getLevel(scores[w]).label}</div></div>
              {active&&<span style={{marginLeft:"auto",color:cfg.color,fontWeight:600}}><Icon name="check" size={14} color={cfg.color}/></span>}
            </button>
          );})}
        </div>
      </div>
      <button onClick={()=>ok&&onStart(name,focus,email.trim())} style={{width:"100%",padding:"16px",background:ok?"#4A7690":"#d5dce0",color:ok?"white":"#93a0a6",border:"none",borderRadius:999,fontSize:16,fontWeight:600,cursor:ok?"pointer":"not-allowed",fontFamily:"Hanken Grotesk,sans-serif"}}>
        Begin when you're ready →
      </button>
    </div>
  );
}

export function GamifiedPlan({ scores: initialScores, userName, focusAreas, initialState, onStateChange, onReassessed }) {
  const init = initialState || {};
  const [completed,setCompleted]=useState(init.completed ?? {});
  const [bonusDone,setBonusDone]=useState(init.bonusDone ?? {});
  const [points,setPoints]=useState(init.points ?? 50);
  const [badges,setBadges]=useState(init.badges ?? ["first_step"]);
  const [badgeModal,setBadgeModal]=useState(null);
  const [streak,setStreak]=useState(init.streak ?? 0);
  const [lastActiveDate,setLastActiveDate]=useState(init.lastActiveDate ?? null);
  const [currentWeek,setCurrentWeek]=useState(init.currentWeek ?? 1);
  const [tab,setTab]=useState(init.tab ?? "plan");
  const [checkIns,setCheckIns]=useState(init.checkIns ?? {});
  const [showCheckIn,setShowCheckIn]=useState(false);
  const [checkInWeek,setCheckInWeek]=useState(null);
  const [reassessMode,setReassessMode]=useState(false);
  const [reassessScores,setReassessScores]=useState(init.reassessScores ?? null);
  const [scores,setScores]=useState(init.scores ?? initialScores);

  // Build plan: 3 activities per week per focus area (trimmed to exactly 3/week total across focus areas)
  const plan = Array.from({length:8},(_,wi)=>{
    const week=wi+1;
    const acts=[];
    focusAreas.forEach((wedge,fi)=>{
      const weekActs=ACTIVITIES[wedge][wi]??ACTIVITIES[wedge][0];
      weekActs.forEach((text,ai)=>acts.push({id:`w${week}_${wedge}_${ai}`,wedge,text,week,points:10+week*2}));
    });
    return {week, activities: acts.slice(0, 3 * focusAreas.length)};
  });

  const totalActs=plan.reduce((s,w)=>s+w.activities.length,0);
  const doneCount=Object.values(completed).filter(Boolean).length;
  const progressPct=Math.round(doneCount/totalActs*100);
  const userLevel=getUserLevel(points);
  const nextLevel=LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.indexOf(userLevel)+1];
  const levelPct=nextLevel?Math.round((points-userLevel.min)/(nextLevel.min-userLevel.min)*100):100;

  useEffect(() => {
    onStateChange?.({ completed, bonusDone, points, badges, streak, lastActiveDate, currentWeek, tab, checkIns, reassessScores, scores });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completed, bonusDone, points, badges, streak, lastActiveDate, currentWeek, tab, checkIns, reassessScores, scores]);

  function awardBadge(id) {
    if(!badges.includes(id)){setBadges(b=>[...b,id]);setBadgeModal(id);}
  }

  function toggleActivity(id,wedge,pts) {
    const was=completed[id];
    const nc={...completed,[id]:!was};
    setCompleted(nc);
    let np=points+(was?-pts:pts);

    if(!was){
      // streak
      const today=new Date().toDateString();
      const yesterday=new Date(Date.now()-86400000).toDateString();
      let ns=streak;
      if(lastActiveDate===yesterday){ns=streak+1;}
      else if(lastActiveDate!==today){ns=1;}
      setStreak(ns); setLastActiveDate(today);
      if(ns>=3) awardBadge("streak3");
      if(ns>=7) awardBadge("streak7");

      // week complete bonus
      const wplan=plan.find(p=>p.week===currentWeek);
      if(wplan?.activities.every(a=>nc[a.id])){
        np+=25;
        if(currentWeek===1) awardBadge("week1");
        if(currentWeek===4) awardBadge("halfway");
        if(currentWeek===8) awardBadge("finisher");
      }

      // all wedges
      const wedgesUsed=new Set(Object.keys(nc).filter(k=>nc[k]).map(k=>k.split("_")[1]));
      if(wedgesUsed.size>=8) awardBadge("all_wedges");

      // inner work
      const innerDone=Object.keys(nc).filter(k=>nc[k]&&(k.includes("Spiritual")||k.includes("Emotional"))).length;
      if(innerDone>=3) awardBadge("inner3");
    }
    setPoints(np);
  }

  function toggleBonus(id,pts) {
    const was=bonusDone[id];
    setBonusDone({...bonusDone,[id]:!was});
    setPoints(p=>p+(was?-pts:pts));
    if(!was) awardBadge("bonus1");
  }

  function submitCheckIn(week, mood, note) {
    const nci={...checkIns,[week]:{mood,note,date:new Date().toLocaleDateString()}};
    setCheckIns(nci);
    if(Object.keys(nci).length>=8) awardBadge("check_in8");
    setShowCheckIn(false);
  }

  function handleReassessComplete(newScores) {
    setReassessScores(newScores);
    setReassessMode(false);
    awardBadge("reassessed");
    setTab("compare");
    onReassessed?.(newScores);
  }

  const MOOD_LABELS=["Struggling","Flat","Okay","Good","Great"];

  if(reassessMode) return (
    <div style={{maxWidth:680,margin:"0 auto",padding:"16px"}}>
      <div style={{textAlign:"center",padding:"20px",background:"#4A7690",borderRadius:16,color:"white",marginBottom:20}}>
        <h2 style={{fontFamily:"Newsreader,Georgia,serif",margin:0,fontSize:20}}>A look back at week eight</h2>
        <p style={{margin:"8px 0 0",fontSize:13,opacity:0.9}}>The same reflection you started with. A gentle way to notice what has shifted.</p>
      </div>
      <Assessment onComplete={handleReassessComplete}/>
    </div>
  );

  return (
    <div style={{maxWidth:720,margin:"0 auto",padding:"16px"}}>
      {badgeModal && <BadgeModal badgeId={badgeModal} onClose={()=>setBadgeModal(null)}/>}
      {showCheckIn && <WeeklyCheckIn week={checkInWeek} existing={checkIns[checkInWeek]} onSubmit={submitCheckIn} onClose={()=>setShowCheckIn(false)}/>}

      {/* Header */}
      <div style={{background:"#2C4652",borderRadius:20,padding:"22px 18px",color:"white",marginBottom:20,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",width:220,height:220,borderRadius:"50%",top:-90,right:-70,background:"radial-gradient(circle,rgba(124,167,196,0.4),transparent 70%)",pointerEvents:"none"}}/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14,position:"relative"}}>
          <div>
            <div style={{fontSize:12,opacity:0.8,marginBottom:3}}>Welcome back,</div>
            <h2 style={{fontFamily:"Newsreader,Georgia,serif",fontSize:21,margin:0,display:"flex",alignItems:"center",gap:8}}>{userName} <Icon name={userLevel.icon} size={19}/></h2>
            <div style={{fontSize:13,opacity:0.9,marginTop:3}}>{userLevel.label} · <strong>{points}</strong> pts</div>
          </div>
          <div style={{textAlign:"right",fontSize:13,opacity:0.9,display:"flex",flexDirection:"column",gap:4,alignItems:"flex-end"}}>
            <div style={{display:"flex",alignItems:"center",gap:5}}><Icon name="flame" size={13}/> {streak}-day streak</div>
            <div style={{display:"flex",alignItems:"center",gap:5}}><Icon name="medal" size={13}/> {badges.length} badges</div>
            <div style={{display:"flex",alignItems:"center",gap:5}}><Icon name="check" size={13}/> {doneCount}/{totalActs} done</div>
          </div>
        </div>
        {/* Level bar */}
        <div style={{marginBottom:10}}>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:11,opacity:0.85,marginBottom:3}}>
            <span>{userLevel.label}</span>
            {nextLevel&&<span>Next: {nextLevel.label} ({nextLevel.min-points} pts)</span>}
          </div>
          <div style={{background:"rgba(255,255,255,0.3)",borderRadius:99,height:6}}>
            <div style={{width:`${levelPct}%`,background:"white",height:"100%",borderRadius:99,transition:"width 0.5s"}}/>
          </div>
        </div>
        {/* Progress bar */}
        <div>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:11,opacity:0.85,marginBottom:3}}>
            <span>Your eight weeks</span><span>{progressPct}% done</span>
          </div>
          <div style={{background:"rgba(255,255,255,0.3)",borderRadius:99,height:6}}>
            <div style={{width:`${progressPct}%`,background:"rgba(255,255,255,0.9)",height:"100%",borderRadius:99,transition:"width 0.5s"}}/>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{display:"flex",gap:6,marginBottom:20,overflowX:"auto",paddingBottom:4}}>
        {[["plan","document","Plan"],["bonus","sparkle","Bonus"],["checkin","document","Check-in"],["badges","medal","Badges"],["wheel","target","Wheel"],[reassessScores?"compare":"reassess","chart",reassessScores?"Compare":"Week 8"]].map(([t,icon,label])=>(
          <button key={t} onClick={()=>t==="reassess"?setReassessMode(true):setTab(t)} style={{flexShrink:0,padding:"8px 14px",borderRadius:999,border:"1.5px solid",borderColor:tab===t?"#4A7690":"#e5eaec",background:tab===t?"#DCE8EF":"white",color:tab===t?"#4A7690":"#8593a0",fontWeight:600,cursor:"pointer",fontFamily:"Hanken Grotesk,sans-serif",fontSize:12,transition:"all 180ms",display:"inline-flex",alignItems:"center",gap:6}}>
            <Icon name={icon} size={14}/>{label}
          </button>
        ))}
      </div>

      {/* ── PLAN TAB ── */}
      {tab==="plan" && (
        <div>
          <div style={{display:"flex",gap:8,marginBottom:20,overflowX:"auto",paddingBottom:4}}>
            {[1,2,3,4,5,6,7,8].map(w=>{
              const wp=plan.find(p=>p.week===w);
              const wDone=wp?.activities.filter(a=>completed[a.id]).length??0;
              const wTotal=wp?.activities.length??0;
              const full=wDone===wTotal;
              const ci=checkIns[w];
              return <button key={w} onClick={()=>setCurrentWeek(w)} style={{minWidth:72,padding:"8px 6px",borderRadius:12,border:"1.5px solid",borderColor:currentWeek===w?"#4A7690":full?"#5FA0A0":"#e5eaec",background:currentWeek===w?"#DCE8EF":full?"#D9E8E5":"white",cursor:"pointer",textAlign:"center",flexShrink:0}}>
                <div style={{fontSize:11,fontWeight:600,color:currentWeek===w?"#4A7690":full?"#5FA0A0":"#8593a0",fontFamily:"Newsreader,Georgia,serif"}}>Week {w}</div>
                <div style={{fontSize:10,color:"#93a0a6"}}>{wDone}/{wTotal}</div>
                <div style={{display:"flex",justifyContent:"center",marginTop:2,height:14}}>{full?<Icon name="check" size={13} color="#5FA0A0"/>:ci?<Icon name="document" size={13} color="#a6b1b8"/>:null}</div>
              </button>;
            })}
          </div>

          {plan.find(p=>p.week===currentWeek)?.activities.map(act=>{
            const cfg=WEDGE_CONFIG[act.wedge], done=completed[act.id];
            return <div key={act.id} style={{background:done?cfg.light:"white",borderRadius:14,padding:"16px 18px",marginBottom:12,border:`1px solid ${done?"transparent":"#e9edef"}`,boxShadow:done?"none":"0 1px 3px rgba(32,48,58,0.05)",display:"flex",alignItems:"flex-start",gap:14,transition:"all 220ms",opacity:done?0.82:1}}>
              <button onClick={()=>toggleActivity(act.id,act.wedge,act.points)} style={{width:28,height:28,borderRadius:8,border:`2px solid ${done?cfg.color:"#d5dce0"}`,background:done?cfg.color:"white",cursor:"pointer",flexShrink:0,marginTop:2,display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s"}}>
                {done&&<Icon name="check" size={14} color="white"/>}
              </button>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
                  <Icon name={cfg.icon} size={14} color={cfg.color}/>
                  <span style={{fontSize:11,fontWeight:600,color:cfg.color,fontFamily:"Newsreader,Georgia,serif"}}>{act.wedge}</span>
                  <span style={{marginLeft:"auto",fontSize:11,color:done?cfg.color:"#a6b1b8",fontWeight:600}}>+{act.points} pts</span>
                </div>
                <p style={{fontSize:14,color:done?"#8593a0":"#20303A",lineHeight:1.5,margin:0,textDecoration:done?"line-through":"none"}}>{act.text}</p>
              </div>
            </div>;
          })}

          <div style={{marginTop:16}}>
            {!checkIns[currentWeek]&&<button onClick={()=>{setCheckInWeek(currentWeek);setShowCheckIn(true);}} style={{width:"100%",padding:"12px",background:"white",color:"#5FA0A0",border:"1.5px solid #5FA0A0",borderRadius:999,fontWeight:600,cursor:"pointer",fontFamily:"Hanken Grotesk,sans-serif",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
              <Icon name="document" size={15}/> Log Week {currentWeek} Check-in
            </button>}
            {checkIns[currentWeek]&&<div style={{background:"#D9E8E5",borderRadius:12,padding:"12px 16px",border:"1px solid #C6DBD7"}}>
              <div style={{fontSize:13,fontWeight:600,color:"#5FA0A0",marginBottom:4,fontFamily:"Newsreader,Georgia,serif"}}>Week {currentWeek} check-in logged · {MOOD_LABELS[checkIns[currentWeek].mood-1]}</div>
              {checkIns[currentWeek].note&&<p style={{fontSize:13,color:"#5c6b72",margin:0}}>{checkIns[currentWeek].note}</p>}
            </div>}
          </div>
        </div>
      )}

      {/* ── BONUS TAB ── */}
      {tab==="bonus" && (
        <div>
          <div style={{background:"#F0DEE0",borderRadius:12,padding:"14px 16px",marginBottom:20,border:"1px solid #E3CCD0"}}>
            <div style={{fontSize:13,fontWeight:600,color:"#B3707A",marginBottom:4,fontFamily:"Newsreader,Georgia,serif",display:"flex",alignItems:"center",gap:6}}><Icon name="sparkle" size={15} color="#B3707A"/> Optional extras</div>
            <p style={{fontSize:13,color:"#8593a0",margin:0,lineHeight:1.6}}>A few extra steps, here for the weeks that feel lighter. There's no pressure to do any of them; pick one up whenever it suits, or leave them be.</p>
          </div>
          {BONUS_CHALLENGES.map(bc=>{
            const cfg=WEDGE_CONFIG[bc.wedge], done=bonusDone[bc.id];
            return <div key={bc.id} style={{background:done?cfg.light:"white",borderRadius:14,padding:"16px 18px",marginBottom:12,border:`1px solid ${done?"transparent":"#e9edef"}`,boxShadow:done?"none":"0 1px 3px rgba(32,48,58,0.05)",display:"flex",alignItems:"flex-start",gap:14,transition:"all 220ms",opacity:done?0.82:1}}>
              <button onClick={()=>toggleBonus(bc.id,bc.points)} style={{width:28,height:28,borderRadius:8,border:`2px solid ${done?cfg.color:"#d5dce0"}`,background:done?cfg.color:"white",cursor:"pointer",flexShrink:0,marginTop:2,display:"flex",alignItems:"center",justifyContent:"center"}}>
                {done&&<Icon name="check" size={14} color="white"/>}
              </button>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
                  <Icon name={cfg.icon} size={16} color={cfg.color}/>
                  <span style={{fontSize:11,fontWeight:600,color:cfg.color,fontFamily:"Newsreader,Georgia,serif"}}>{bc.wedge}</span>
                  <span style={{marginLeft:"auto",fontSize:12,fontWeight:600,color:done?cfg.color:"#B3707A"}}>+{bc.points} pts</span>
                </div>
                <p style={{fontSize:14,color:done?"#8593a0":"#20303A",lineHeight:1.5,margin:0,textDecoration:done?"line-through":"none"}}>{bc.text}</p>
              </div>
            </div>;
          })}
        </div>
      )}

      {/* ── CHECK-IN TAB ── */}
      {tab==="checkin" && (
        <div>
          <div style={{background:"#D9E8E5",borderRadius:12,padding:"14px 16px",marginBottom:20,border:"1px solid #C6DBD7"}}>
            <div style={{fontSize:13,fontWeight:600,color:"#5FA0A0",marginBottom:4,fontFamily:"Newsreader,Georgia,serif",display:"flex",alignItems:"center",gap:6}}><Icon name="document" size={15} color="#5FA0A0"/> Weekly check-ins</div>
            <p style={{fontSize:13,color:"#5c6b72",margin:0,lineHeight:1.6}}>A quick moment each week to notice how you're travelling, with a note if you feel like it. There are no wrong answers here.</p>
          </div>
          {[1,2,3,4,5,6,7,8].map(w=>{
            const ci=checkIns[w];
            return <div key={w} style={{background:"white",borderRadius:12,padding:"16px",marginBottom:10,border:`1.5px solid ${ci?"#5FA0A0":"#e5eaec"}`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{fontWeight:600,fontSize:14,fontFamily:"Newsreader,Georgia,serif",color:ci?"#5FA0A0":"#93a0a6"}}>Week {w} {ci?`· ${MOOD_LABELS[ci.mood-1]}`:""}</div>
                {ci?<span style={{fontSize:11,color:"#93a0a6"}}>{ci.date}</span>:<button onClick={()=>{setCheckInWeek(w);setShowCheckIn(true);}} style={{padding:"6px 14px",background:"#D9E8E5",color:"#5FA0A0",border:"1.5px solid #5FA0A0",borderRadius:999,fontWeight:600,cursor:"pointer",fontSize:12,fontFamily:"Hanken Grotesk,sans-serif"}}>Log</button>}
              </div>
              {ci?.note&&<p style={{fontSize:13,color:"#5c6b72",margin:"8px 0 0",lineHeight:1.5}}>{ci.note}</p>}
            </div>;
          })}
        </div>
      )}

      {/* ── BADGES TAB ── */}
      {tab==="badges" && (
        <div>
          <p style={{fontSize:14,color:"#8593a0",marginBottom:20}}>{badges.length} of {BADGES.length} earned.</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(170px, 1fr))",gap:12,marginBottom:24}}>
            {BADGES.map(b=>{const earned=badges.includes(b.id);return(
              <div key={b.id} style={{background:earned?"white":"#F7F9FA",borderRadius:14,padding:"18px 14px",textAlign:"center",border:`1px solid ${earned?"transparent":"#e9edef"}`,boxShadow:earned?"0 1px 3px rgba(32,48,58,0.06)":"none",transition:"all 320ms cubic-bezier(0.165,0.84,0.44,1)"}}>
                <div style={{display:"flex",justifyContent:"center",marginBottom:10}}><BadgeMedallion iconName={b.icon} unlocked={earned}/></div>
                <div style={{fontSize:13,fontWeight:600,fontFamily:"Newsreader,Georgia,serif",color:earned?"#20303A":"#a6b1b8",marginBottom:4}}>{b.name}</div>
                <div style={{fontSize:11,color:"#93a0a6",lineHeight:1.4}}>{b.desc}</div>
                {earned&&<div style={{marginTop:8,fontSize:11,color:"#A5813C",fontWeight:600,display:"flex",alignItems:"center",justifyContent:"center",gap:4}}><Icon name="check" size={12} color="#A5813C"/> Earned</div>}
              </div>
            );})}
          </div>
          <div style={{background:"white",borderRadius:14,padding:"20px",border:"1px solid #e9edef"}}>
            <h3 style={{fontFamily:"Newsreader,Georgia,serif",fontSize:15,color:"#20303A",marginBottom:12,display:"flex",alignItems:"center",gap:8}}><Icon name="target" size={17} color="#4A7690"/> Point guide</h3>
            {[["Do a small step","10 to 26 pts"],["Finish a full week","+25 bonus pts"],["Optional extra","40 to 50 pts"],["Three days in a row","Streak badge"],["Seven days in a row","Steady Going badge"],["Eight weekly check-ins","Honest Reflection badge"],["Look back at week eight","Growth Visible badge"]].map(([a,r])=>(
              <div key={a} style={{display:"flex",justifyContent:"space-between",paddingBottom:8,marginBottom:8,borderBottom:"1px solid #eef1f2",fontSize:13}}>
                <span style={{color:"#4a5760"}}>{a}</span><span style={{fontWeight:600,color:"#4A7690"}}>{r}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── WHEEL TAB ── */}
      {tab==="wheel" && (
        <div>
          <p style={{fontSize:14,color:"#8593a0",marginBottom:16,lineHeight:1.6}}>Your baseline assessment. Come back after 8 weeks to compare.</p>
          <div style={{display:"flex",justifyContent:"center",marginBottom:24}}><div style={{width:300}}><WellnessWheelSVG scores={scores}/></div></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(170px, 1fr))",gap:10}}>
            {WEDGES.map(w=>{const cfg=WEDGE_CONFIG[w],sc=scores[w],lv=getLevel(sc),active=focusAreas.includes(w);return(
              <div key={w} style={{background:active?cfg.light:"#f7f9fa",borderRadius:10,padding:"12px",border:`1.5px solid ${active?cfg.color:"#e5eaec"}`}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
                  <Icon name={cfg.icon} size={15} color={active?cfg.color:"#93a0a6"}/>
                  <span style={{fontWeight:600,fontSize:13,fontFamily:"Newsreader,Georgia,serif",color:active?cfg.color:"#5c6b72"}}>{w}</span>
                  {active&&<span style={{marginLeft:"auto",fontSize:10,color:cfg.color,fontWeight:600}}>FOCUS</span>}
                </div>
                <div style={{background:"#e5eaec",borderRadius:99,height:5}}><div style={{width:`${sc}%`,background:cfg.color,height:"100%",borderRadius:99}}/></div>
                <div style={{fontSize:11,color:lv.color,marginTop:4,fontWeight:600}}>{lv.label}</div>
              </div>
            );})}
          </div>
          {!reassessScores&&<button onClick={()=>setReassessMode(true)} style={{width:"100%",marginTop:24,padding:"14px",background:"#4A7690",color:"white",border:"none",borderRadius:999,fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"Hanken Grotesk,sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
            <Icon name="chart" size={16}/> Take the 8-Week Reassessment
          </button>}
        </div>
      )}

      {/* ── COMPARE TAB ── */}
      {tab==="compare" && reassessScores && (
        <div>
          <div style={{textAlign:"center",marginBottom:24}}>
            <h2 style={{fontFamily:"Newsreader,Georgia,serif",fontSize:22,color:"#20303A",marginBottom:8,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}><Icon name="chart" size={22} color="#4A7690"/> Before &amp; After</h2>
            <p style={{fontSize:14,color:"#5c6b72"}}>Eight weeks, side by side. Notice what has shifted, however gently.</p>
          </div>
          <div style={{display:"flex",gap:16,justifyContent:"center",marginBottom:28,flexWrap:"wrap"}}>
            <div style={{textAlign:"center"}}><div style={{fontSize:13,color:"#93a0a6",marginBottom:8,fontFamily:"Hanken Grotesk,sans-serif"}}>Week 1 Baseline</div><WellnessWheelSVG scores={scores} size={240}/></div>
            <div style={{textAlign:"center"}}><div style={{fontSize:13,color:"#4A7690",marginBottom:8,fontFamily:"Hanken Grotesk,sans-serif",fontWeight:600}}>Week 8 Reassessment</div><WellnessWheelSVG scores={reassessScores} size={240}/></div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(170px, 1fr))",gap:10}}>
            {WEDGES.map(w=>{
              const cfg=WEDGE_CONFIG[w], before=scores[w], after=reassessScores[w], diff=after-before;
              const move = diff>=3 ? {t:"a little more room here", c:"#4A7690"} : diff<=-3 ? {t:"asking for some care", c:"#C98F97"} : {t:"holding steady", c:"#93a0a6"};
              return <div key={w} style={{background:"white",borderRadius:12,padding:"14px",border:"1px solid #e9edef"}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
                  <Icon name={cfg.icon} size={15} color={cfg.color}/>
                  <span style={{fontWeight:600,fontSize:13,fontFamily:"Newsreader,Georgia,serif",color:"#20303A"}}>{w}</span>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                  <span style={{fontSize:13,color:"#93a0a6"}}>{getLevel(before).label}</span>
                  <span style={{fontSize:12,color:"#c3ccd1"}}>→</span>
                  <span style={{fontSize:14,fontWeight:600,color:cfg.color}}>{getLevel(after).label}</span>
                  <span style={{marginLeft:"auto",fontSize:12,fontWeight:600,color:move.c}}>{move.t}</span>
                </div>
              </div>;
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export function WeeklyCheckIn({ week, existing, onSubmit, onClose }) {
  const [mood,setMood]=useState(existing?.mood??3);
  const [note,setNote]=useState(existing?.note??"");
  // A colour ramp instead of face emoji: clay (struggling) through to cedar (great).
  const moodColors=["#B3707A","#C98F97","#CDA66B","#5FA0A0","#4A7690"];
  const moodLabels=["Struggling","Flat","Okay","Good","Great"];

  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(32,48,58,0.55)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9998,padding:16}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"white",borderRadius:20,padding:"32px 24px",maxWidth:380,width:"100%"}}>
        <h3 style={{fontFamily:"Newsreader,Georgia,serif",fontSize:20,color:"#20303A",marginBottom:6}}>Week {week} check-in</h3>
        <p style={{fontSize:14,color:"#8593a0",marginBottom:20,lineHeight:1.5}}>How are you travelling this week?</p>
        <div style={{display:"flex",gap:8,marginBottom:20}}>
          {[1,2,3,4,5].map(v=>(
            <button key={v} onClick={()=>setMood(v)} style={{flex:1,padding:"12px 4px",borderRadius:12,border:`1.5px solid ${mood===v?moodColors[v-1]:"#e5eaec"}`,background:mood===v?"#F7F9FA":"white",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:6,transition:"all 180ms"}}>
              <span style={{width:16,height:16,borderRadius:"50%",background:moodColors[v-1],opacity:mood===v?1:0.35,transition:"opacity 180ms"}}/>
              <span style={{fontSize:10,color:mood===v?moodColors[v-1]:"#93a0a6",fontWeight:600}}>{moodLabels[v-1]}</span>
            </button>
          ))}
        </div>
        <textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Anything to note this week? (optional)" rows={3} style={{width:"100%",padding:"10px 14px",borderRadius:8,border:"1.5px solid #dde3e6",fontSize:14,fontFamily:"Hanken Grotesk,sans-serif",resize:"vertical",boxSizing:"border-box",marginBottom:16}}/>
        <div style={{display:"flex",gap:10}}>
          <button onClick={onClose} style={{flex:1,padding:"12px",background:"#f2f4f5",color:"#8593a0",border:"none",borderRadius:999,fontWeight:600,cursor:"pointer",fontFamily:"Hanken Grotesk,sans-serif"}}>Cancel</button>
          <button onClick={()=>onSubmit(week,mood,note)} style={{flex:2,padding:"12px",background:"#4A7690",color:"white",border:"none",borderRadius:999,fontWeight:600,cursor:"pointer",fontFamily:"Hanken Grotesk,sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>Save Check-in <Icon name="check" size={15} color="white"/></button>
        </div>
      </div>
    </div>
  );
}

export function Landing({ onStart }) {
  return (
    <div style={{maxWidth:560,margin:"0 auto",padding:"32px 16px",textAlign:"center"}}>
      <div style={{display:"flex",justifyContent:"center",marginBottom:20}}><WellnessWheelSVG/></div>
      <h1 style={{fontFamily:"Newsreader,Georgia,serif",fontSize:28,color:"#20303A",marginBottom:10,lineHeight:1.3}}>Your Caregiver Wellness Wheel</h1>
      <p style={{color:"#5c6b72",fontSize:15,lineHeight:1.7,marginBottom:28,maxWidth:420,margin:"0 auto 28px"}}>Made for parents and family carers of a child with disability, complex medical needs or a rare condition. Eight parts of life that add up to your wellbeing, a short reflection to see where things sit, and eight weeks of small, doable steps that fit around real caregiving.</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(170px, 1fr))",gap:12,marginBottom:28,textAlign:"left"}}>
        {[["document","A short reflection","Eight gentle questions for each part of life"],["chart","Your wellbeing picture","Where you're steady, and where you might start"],["target","Eight weeks of tiny steps","A few small actions a week, around what matters to you"],["medal","Small wins to notice","Gentle encouragement as you go, at your own pace"],["mark","Private by default","Everything stays on your device, unless you ask for email check-ins"],["moon","Weekly check-ins","A moment to notice how you're travelling"],["sparkle","Optional extras","A little more, for the weeks that feel lighter"],["chart","Before and after","Look back at week eight and notice what has shifted"]].map(([icon,title,desc],i)=>(
          <div key={i} style={{background:"white",borderRadius:12,padding:"14px",border:"1px solid #e9edef"}}>
            <div style={{marginBottom:8,color:"#4A7690"}}><Icon name={icon} size={22}/></div>
            <div style={{fontWeight:600,fontSize:13,fontFamily:"Newsreader,Georgia,serif",color:"#20303A",marginBottom:3}}>{title}</div>
            <div style={{fontSize:11,color:"#8593a0",lineHeight:1.4}}>{desc}</div>
          </div>
        ))}
      </div>
      <button onClick={onStart} style={{width:"100%",padding:"16px",background:"#4A7690",color:"white",border:"none",borderRadius:999,fontSize:16,fontWeight:600,cursor:"pointer",fontFamily:"Hanken Grotesk,sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
        Start when you're ready <Icon name="arrowRight" size={17} color="white"/>
      </button>
      <p style={{fontSize:12,color:"#93a0a6",marginTop:12}}>About 10 minutes, and you can stop and come back any time. No account needed.</p>
      <p style={{fontSize:11,color:"#a6b1b8",marginTop:20,lineHeight:1.6,maxWidth:420,marginLeft:"auto",marginRight:"auto"}}>This is a wellbeing programme, not a substitute for medical or mental health care. If you're struggling or in crisis, please reach out to Lifeline on 13 11 14, or talk to your GP.</p>
    </div>
  );
}
