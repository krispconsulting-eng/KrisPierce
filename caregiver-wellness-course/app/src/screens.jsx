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
          <span style={{fontSize:13,color:"#888",fontFamily:"Raleway,sans-serif"}}>{done} of {total}</span>
          <span style={{fontSize:13,fontWeight:700,color:cfg.color,fontFamily:"Literata,Georgia,serif",display:"flex",alignItems:"center",gap:6}}><Icon name={cfg.icon} size={15} color={cfg.color}/> {wedge}</span>
        </div>
        <div style={{background:"#f0f0f0",borderRadius:99,height:6,overflow:"hidden"}}>
          <div style={{width:`${pct}%`,background:cfg.color,height:"100%",transition:"width 0.3s",borderRadius:99}}/>
        </div>
      </div>
      <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:24}}>
        {WEDGES.map((w,i)=>{
          const isDone=i<cW; const isActive=i===cW;
          return <div key={w} style={{padding:"4px 10px",borderRadius:99,fontSize:11,background:isDone?WEDGE_CONFIG[w].color:isActive?WEDGE_CONFIG[w].light:"#f5f5f5",color:isDone?"white":isActive?WEDGE_CONFIG[w].color:"#bbb",fontWeight:isActive||isDone?700:400,border:`1.5px solid ${isActive||isDone?WEDGE_CONFIG[w].color:"#eee"}`,transition:"all 0.3s",fontFamily:"Raleway,sans-serif",display:"inline-flex",alignItems:"center",gap:4}}>{isDone?<Icon name="check" size={11}/>:<Icon name={WEDGE_CONFIG[w].icon} size={11}/>}{w}</div>;
        })}
      </div>
      <div style={{background:"white",borderRadius:16,padding:"28px 24px",boxShadow:"0 4px 24px rgba(0,0,0,0.07)",borderTop:`4px solid ${cfg.color}`,marginBottom:20}}>
        <div style={{fontSize:11,color:cfg.color,fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:10,fontFamily:"Raleway,sans-serif"}}>{wedge} · Q{cQ+1} of 8</div>
        <p style={{fontSize:17,fontWeight:600,color:"#2a2a2a",lineHeight:1.55,marginBottom:28,fontFamily:"Literata,Georgia,serif"}}>{qs[cQ]}</p>
        <div style={{display:"flex",gap:8}}>
          {[1,2,3,4,5].map(v=>(
            <button key={v} onClick={()=>setSel(v)} style={{flex:1,padding:"12px 4px",borderRadius:10,border:`2px solid ${sel===v?cfg.color:"#e8e8e8"}`,background:sel===v?cfg.color:"white",color:sel===v?"white":"#555",cursor:"pointer",transition:"all 0.2s",display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
              <span style={{fontSize:18,fontWeight:700}}>{v}</span>
              <span style={{fontSize:10}}>{labels[v-1]}</span>
            </button>
          ))}
        </div>
      </div>
      <button onClick={next} disabled={sel===null} style={{width:"100%",padding:"14px",background:sel!==null?cfg.color:"#ccc",color:"white",border:"none",borderRadius:999,fontSize:15,fontWeight:700,cursor:sel!==null?"pointer":"not-allowed",fontFamily:"Raleway,sans-serif",transition:"background 180ms"}}>
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
        <h1 style={{fontFamily:"Literata,Georgia,serif",fontSize:27,color:"#2a2a2a",marginBottom:8}}>Your Wellness Report</h1>
        <p style={{color:"#666",fontSize:15}}>Overall: <strong style={{color:lvl.color}}>{overall}% · {lvl.label}</strong></p>
      </div>
      <div style={{display:"flex",justifyContent:"center",marginBottom:32}}><div style={{width:280}}><WellnessWheelSVG scores={scores}/></div></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:28}}>
        {WEDGES.map(w=>{
          const cfg=WEDGE_CONFIG[w], sc=scores[w], lv=getLevel(sc);
          return <div key={w} style={{background:"white",borderRadius:12,padding:"14px 16px",border:"1px solid #eee",display:"flex",alignItems:"center",gap:12}}>
            <ProgressRing score={sc} color={cfg.color} size={52}/>
            <div><div style={{fontWeight:700,fontSize:14,fontFamily:"Literata,Georgia,serif",color:"#2a2a2a",display:"flex",alignItems:"center",gap:6}}><Icon name={cfg.icon} size={14} color={cfg.color}/> {w}</div><div style={{fontSize:11,color:lv.color,fontWeight:600}}>{lv.label}</div></div>
          </div>;
        })}
      </div>
      <div style={{background:"#F7EDE6",borderRadius:14,padding:"20px",marginBottom:16,border:"1px solid #EEDCCB"}}>
        <h3 style={{fontFamily:"Literata,Georgia,serif",color:"#A85D39",marginBottom:12,fontSize:16,display:"flex",alignItems:"center",gap:8}}><Icon name="target" size={17} color="#A85D39"/> Your Focus Areas</h3>
        <p style={{fontSize:13,color:"#777",marginBottom:12}}>Your lowest three scores. These are your biggest growth opportunity.</p>
        {lowest.map(w=><div key={w} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}><Icon name={WEDGE_CONFIG[w].icon} size={19} color={WEDGE_CONFIG[w].color}/><strong style={{fontFamily:"Literata,Georgia,serif",color:"#2a2a2a"}}>{w}</strong><span style={{color:"#aaa",fontSize:13}}>· {scores[w]}%</span></div>)}
      </div>
      <div style={{background:"#E8F0EA",borderRadius:14,padding:"20px",marginBottom:28,border:"1px solid #D3E3D7"}}>
        <h3 style={{fontFamily:"Literata,Georgia,serif",color:"#3C6B4A",marginBottom:12,fontSize:16,display:"flex",alignItems:"center",gap:8}}><Icon name="sparkle" size={17} color="#3C6B4A"/> Your Strengths</h3>
        <p style={{fontSize:13,color:"#777",marginBottom:12}}>Your strongest foundations. Build from here.</p>
        {highest.map(w=><div key={w} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}><Icon name={WEDGE_CONFIG[w].icon} size={19} color={WEDGE_CONFIG[w].color}/><strong style={{fontFamily:"Literata,Georgia,serif",color:"#2a2a2a"}}>{w}</strong><span style={{color:"#aaa",fontSize:13}}>· {scores[w]}%</span></div>)}
      </div>
      <button onClick={onSignUp} style={{width:"100%",padding:"16px",background:"#3C6B4A",color:"white",border:"none",borderRadius:999,fontSize:16,fontWeight:700,cursor:"pointer",fontFamily:"Raleway,sans-serif",transition:"background 180ms"}}>
        Start My 6-Week Wellness Plan →
      </button>
    </div>
  );
}

export function SignUp({ scores, onStart }) {
  const [name,setName]=useState(""), [focus,setFocus]=useState([]);
  const suggested=[...WEDGES].sort((a,b)=>scores[a]-scores[b]).slice(0,3);
  const toggle=w=>focus.includes(w)?setFocus(focus.filter(x=>x!==w)):focus.length<3?setFocus([...focus,w]):null;
  const ok=name.trim()&&focus.length>=2;

  return (
    <div style={{maxWidth:560,margin:"0 auto",padding:"24px 16px"}}>
      <div style={{textAlign:"center",marginBottom:28}}>
        <div style={{display:"flex",justifyContent:"center",marginBottom:12}}><Icon name="mark" size={40} color="#3C6B4A"/></div>
        <h2 style={{fontFamily:"Literata,Georgia,serif",fontSize:25,color:"#2a2a2a",marginBottom:8}}>Build Your Plan</h2>
        <p style={{color:"#777",fontSize:14,lineHeight:1.7,maxWidth:400,margin:"0 auto"}}>3 activities per week for 6 weeks. Earn points, build streaks, unlock badges as you go.</p>
      </div>
      <div style={{background:"white",borderRadius:14,padding:"24px",border:"1px solid #eee",marginBottom:20}}>
        <label style={{display:"block",fontSize:13,fontWeight:700,color:"#555",marginBottom:6,fontFamily:"Literata,Georgia,serif"}}>Your first name</label>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="First name" style={{width:"100%",padding:"10px 14px",borderRadius:8,border:"1.5px solid #e0e0e0",fontSize:15,fontFamily:"Raleway,sans-serif",boxSizing:"border-box"}}/>
      </div>
      <div style={{background:"white",borderRadius:14,padding:"24px",border:"1px solid #eee",marginBottom:28}}>
        <div style={{fontSize:13,fontWeight:700,color:"#555",marginBottom:4,fontFamily:"Literata,Georgia,serif"}}>Choose 2–3 focus areas</div>
        <div style={{fontSize:12,color:"#aaa",marginBottom:16,display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>Suggested: {suggested.map((w,i)=><span key={w} style={{display:"inline-flex",alignItems:"center",gap:4}}><Icon name={WEDGE_CONFIG[w].icon} size={13} color={WEDGE_CONFIG[w].color}/>{w}{i<suggested.length-1?",":""}</span>)}</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          {WEDGES.map(w=>{const cfg=WEDGE_CONFIG[w],active=focus.includes(w);return(
            <button key={w} onClick={()=>toggle(w)} style={{padding:"10px 12px",borderRadius:10,border:`2px solid ${active?cfg.color:"#e8e8e8"}`,background:active?cfg.light:"white",cursor:"pointer",display:"flex",alignItems:"center",gap:8,transition:"all 0.2s"}}>
              <Icon name={cfg.icon} size={17} color={cfg.color}/>
              <div style={{textAlign:"left"}}><div style={{fontSize:13,fontWeight:700,color:active?cfg.color:"#444",fontFamily:"Literata,Georgia,serif"}}>{w}</div><div style={{fontSize:11,color:"#aaa"}}>{scores[w]}%</div></div>
              {active&&<span style={{marginLeft:"auto",color:cfg.color,fontWeight:700}}><Icon name="check" size={14} color={cfg.color}/></span>}
            </button>
          );})}
        </div>
      </div>
      <button onClick={()=>ok&&onStart(name,focus)} style={{width:"100%",padding:"16px",background:ok?"#3C6B4A":"#ddd",color:ok?"white":"#aaa",border:"none",borderRadius:999,fontSize:16,fontWeight:700,cursor:ok?"pointer":"not-allowed",fontFamily:"Raleway,sans-serif"}}>
        Begin My Journey →
      </button>
    </div>
  );
}

export function GamifiedPlan({ scores: initialScores, userName, focusAreas, initialState, onStateChange }) {
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
  const [buddyEmail,setBuddyEmail]=useState(init.buddyEmail ?? "");
  const [buddyShared,setBuddyShared]=useState(init.buddyShared ?? false);
  const [checkIns,setCheckIns]=useState(init.checkIns ?? {});
  const [showCheckIn,setShowCheckIn]=useState(false);
  const [checkInWeek,setCheckInWeek]=useState(null);
  const [reassessMode,setReassessMode]=useState(false);
  const [reassessScores,setReassessScores]=useState(init.reassessScores ?? null);
  const [scores,setScores]=useState(init.scores ?? initialScores);

  // Build plan: 3 activities per week per focus area (trimmed to exactly 3/week total across focus areas)
  const plan = Array.from({length:6},(_,wi)=>{
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
    onStateChange?.({ completed, bonusDone, points, badges, streak, lastActiveDate, currentWeek, tab, buddyEmail, buddyShared, checkIns, reassessScores, scores });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completed, bonusDone, points, badges, streak, lastActiveDate, currentWeek, tab, buddyEmail, buddyShared, checkIns, reassessScores, scores]);

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
        if(currentWeek===3) awardBadge("halfway");
        if(currentWeek===6) awardBadge("finisher");
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

  function shareWithBuddy() {
    if(!buddyEmail.trim()) return;
    setBuddyShared(true);
    awardBadge("buddy");
  }

  function submitCheckIn(week, mood, note) {
    const nci={...checkIns,[week]:{mood,note,date:new Date().toLocaleDateString()}};
    setCheckIns(nci);
    if(Object.keys(nci).length>=6) awardBadge("check_in6");
    setShowCheckIn(false);
  }

  function handleReassessComplete(newScores) {
    setReassessScores(newScores);
    setReassessMode(false);
    awardBadge("reassessed");
    setTab("compare");
  }

  const MOOD_LABELS=["Struggling","Flat","Okay","Good","Great"];

  if(reassessMode) return (
    <div style={{maxWidth:680,margin:"0 auto",padding:"16px"}}>
      <div style={{textAlign:"center",padding:"20px",background:"#3C6B4A",borderRadius:16,color:"white",marginBottom:20}}>
        <h2 style={{fontFamily:"Literata,Georgia,serif",margin:0,fontSize:20}}>6-Week Reassessment</h2>
        <p style={{margin:"8px 0 0",fontSize:13,opacity:0.9}}>Same 64 questions. See how far you've come.</p>
      </div>
      <Assessment onComplete={handleReassessComplete}/>
    </div>
  );

  return (
    <div style={{maxWidth:720,margin:"0 auto",padding:"16px"}}>
      {badgeModal && <BadgeModal badgeId={badgeModal} onClose={()=>setBadgeModal(null)}/>}
      {showCheckIn && <WeeklyCheckIn week={checkInWeek} existing={checkIns[checkInWeek]} onSubmit={submitCheckIn} onClose={()=>setShowCheckIn(false)}/>}

      {/* Header */}
      <div style={{background:"#16281C",borderRadius:20,padding:"22px 18px",color:"white",marginBottom:20,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",width:220,height:220,borderRadius:"50%",top:-90,right:-70,background:"radial-gradient(circle,rgba(107,170,117,0.35),transparent 70%)",pointerEvents:"none"}}/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14,position:"relative"}}>
          <div>
            <div style={{fontSize:12,opacity:0.8,marginBottom:3}}>Welcome back,</div>
            <h2 style={{fontFamily:"Literata,Georgia,serif",fontSize:21,margin:0,display:"flex",alignItems:"center",gap:8}}>{userName} <Icon name={userLevel.icon} size={19}/></h2>
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
            <span>6-Week Journey</span><span>{progressPct}% complete</span>
          </div>
          <div style={{background:"rgba(255,255,255,0.3)",borderRadius:99,height:6}}>
            <div style={{width:`${progressPct}%`,background:"rgba(255,255,255,0.9)",height:"100%",borderRadius:99,transition:"width 0.5s"}}/>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{display:"flex",gap:6,marginBottom:20,overflowX:"auto",paddingBottom:4}}>
        {[["plan","document","Plan"],["bonus","sparkle","Bonus"],["checkin","document","Check-in"],["buddy","partnership","Buddy"],["badges","medal","Badges"],["wheel","target","Wheel"],[reassessScores?"compare":"reassess","chart",reassessScores?"Compare":"Week 6"]].map(([t,icon,label])=>(
          <button key={t} onClick={()=>t==="reassess"?setReassessMode(true):setTab(t)} style={{flexShrink:0,padding:"8px 14px",borderRadius:999,border:"1.5px solid",borderColor:tab===t?"#3C6B4A":"#e8e8e8",background:tab===t?"#E8F0EA":"white",color:tab===t?"#3C6B4A":"#888",fontWeight:700,cursor:"pointer",fontFamily:"Raleway,sans-serif",fontSize:12,transition:"all 180ms",display:"inline-flex",alignItems:"center",gap:6}}>
            <Icon name={icon} size={14}/>{label}
          </button>
        ))}
      </div>

      {/* ── PLAN TAB ── */}
      {tab==="plan" && (
        <div>
          <div style={{display:"flex",gap:8,marginBottom:20,overflowX:"auto",paddingBottom:4}}>
            {[1,2,3,4,5,6].map(w=>{
              const wp=plan.find(p=>p.week===w);
              const wDone=wp?.activities.filter(a=>completed[a.id]).length??0;
              const wTotal=wp?.activities.length??0;
              const full=wDone===wTotal;
              const ci=checkIns[w];
              return <button key={w} onClick={()=>setCurrentWeek(w)} style={{minWidth:72,padding:"8px 6px",borderRadius:12,border:"1.5px solid",borderColor:currentWeek===w?"#3C6B4A":full?"#6BAA75":"#e8e8e8",background:currentWeek===w?"#E8F0EA":full?"#EBF4EC":"white",cursor:"pointer",textAlign:"center",flexShrink:0}}>
                <div style={{fontSize:11,fontWeight:700,color:currentWeek===w?"#3C6B4A":full?"#6BAA75":"#888",fontFamily:"Literata,Georgia,serif"}}>Week {w}</div>
                <div style={{fontSize:10,color:"#aaa"}}>{wDone}/{wTotal}</div>
                <div style={{display:"flex",justifyContent:"center",marginTop:2,height:14}}>{full?<Icon name="check" size={13} color="#6BAA75"/>:ci?<Icon name="document" size={13} color="#bbb"/>:null}</div>
              </button>;
            })}
          </div>

          {plan.find(p=>p.week===currentWeek)?.activities.map(act=>{
            const cfg=WEDGE_CONFIG[act.wedge], done=completed[act.id];
            return <div key={act.id} style={{background:done?cfg.light:"white",borderRadius:14,padding:"16px 18px",marginBottom:12,border:`1px solid ${done?"transparent":"#eee"}`,boxShadow:done?"none":"0 1px 3px rgba(22,40,28,0.05)",display:"flex",alignItems:"flex-start",gap:14,transition:"all 220ms",opacity:done?0.82:1}}>
              <button onClick={()=>toggleActivity(act.id,act.wedge,act.points)} style={{width:28,height:28,borderRadius:8,border:`2px solid ${done?cfg.color:"#ddd"}`,background:done?cfg.color:"white",cursor:"pointer",flexShrink:0,marginTop:2,display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s"}}>
                {done&&<Icon name="check" size={14} color="white"/>}
              </button>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
                  <Icon name={cfg.icon} size={14} color={cfg.color}/>
                  <span style={{fontSize:11,fontWeight:700,color:cfg.color,fontFamily:"Literata,Georgia,serif"}}>{act.wedge}</span>
                  <span style={{marginLeft:"auto",fontSize:11,color:done?cfg.color:"#bbb",fontWeight:600}}>+{act.points} pts</span>
                </div>
                <p style={{fontSize:14,color:done?"#888":"#2a2a2a",lineHeight:1.5,margin:0,textDecoration:done?"line-through":"none"}}>{act.text}</p>
              </div>
            </div>;
          })}

          <div style={{marginTop:16}}>
            {!checkIns[currentWeek]&&<button onClick={()=>{setCheckInWeek(currentWeek);setShowCheckIn(true);}} style={{width:"100%",padding:"12px",background:"white",color:"#7B9E87",border:"1.5px solid #7B9E87",borderRadius:999,fontWeight:700,cursor:"pointer",fontFamily:"Raleway,sans-serif",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
              <Icon name="document" size={15}/> Log Week {currentWeek} Check-in
            </button>}
            {checkIns[currentWeek]&&<div style={{background:"#EDF3EF",borderRadius:12,padding:"12px 16px",border:"1px solid #C8D8CC"}}>
              <div style={{fontSize:13,fontWeight:700,color:"#7B9E87",marginBottom:4,fontFamily:"Literata,Georgia,serif"}}>Week {currentWeek} check-in logged · {MOOD_LABELS[checkIns[currentWeek].mood-1]}</div>
              {checkIns[currentWeek].note&&<p style={{fontSize:13,color:"#666",margin:0}}>{checkIns[currentWeek].note}</p>}
            </div>}
          </div>
        </div>
      )}

      {/* ── BONUS TAB ── */}
      {tab==="bonus" && (
        <div>
          <div style={{background:"#F7EDE6",borderRadius:12,padding:"14px 16px",marginBottom:20,border:"1px solid #EEDCCB"}}>
            <div style={{fontSize:13,fontWeight:700,color:"#A85D39",marginBottom:4,fontFamily:"Literata,Georgia,serif",display:"flex",alignItems:"center",gap:6}}><Icon name="sparkle" size={15} color="#A85D39"/> Bonus Challenges</div>
            <p style={{fontSize:13,color:"#888",margin:0,lineHeight:1.6}}>Optional harder activities worth 40–50 pts each. Complete them any time during your 6 weeks.</p>
          </div>
          {BONUS_CHALLENGES.map(bc=>{
            const cfg=WEDGE_CONFIG[bc.wedge], done=bonusDone[bc.id];
            return <div key={bc.id} style={{background:done?cfg.light:"white",borderRadius:14,padding:"16px 18px",marginBottom:12,border:`1px solid ${done?"transparent":"#eee"}`,boxShadow:done?"none":"0 1px 3px rgba(22,40,28,0.05)",display:"flex",alignItems:"flex-start",gap:14,transition:"all 220ms",opacity:done?0.82:1}}>
              <button onClick={()=>toggleBonus(bc.id,bc.points)} style={{width:28,height:28,borderRadius:8,border:`2px solid ${done?cfg.color:"#ddd"}`,background:done?cfg.color:"white",cursor:"pointer",flexShrink:0,marginTop:2,display:"flex",alignItems:"center",justifyContent:"center"}}>
                {done&&<Icon name="check" size={14} color="white"/>}
              </button>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
                  <Icon name={cfg.icon} size={16} color={cfg.color}/>
                  <span style={{fontSize:11,fontWeight:700,color:cfg.color,fontFamily:"Literata,Georgia,serif"}}>{bc.wedge}</span>
                  <span style={{marginLeft:"auto",fontSize:12,fontWeight:700,color:done?cfg.color:"#A85D39"}}>+{bc.points} pts</span>
                </div>
                <p style={{fontSize:14,color:done?"#888":"#2a2a2a",lineHeight:1.5,margin:0,textDecoration:done?"line-through":"none"}}>{bc.text}</p>
              </div>
            </div>;
          })}
        </div>
      )}

      {/* ── CHECK-IN TAB ── */}
      {tab==="checkin" && (
        <div>
          <div style={{background:"#EDF3EF",borderRadius:12,padding:"14px 16px",marginBottom:20,border:"1px solid #C8D8CC"}}>
            <div style={{fontSize:13,fontWeight:700,color:"#7B9E87",marginBottom:4,fontFamily:"Literata,Georgia,serif",display:"flex",alignItems:"center",gap:6}}><Icon name="document" size={15} color="#7B9E87"/> Weekly Check-ins</div>
            <p style={{fontSize:13,color:"#777",margin:0,lineHeight:1.6}}>One quick check-in per week. Mood + an optional note. Complete 6 to earn the Honest Reflection badge.</p>
          </div>
          {[1,2,3,4,5,6].map(w=>{
            const ci=checkIns[w];
            return <div key={w} style={{background:"white",borderRadius:12,padding:"16px",marginBottom:10,border:`1.5px solid ${ci?"#7B9E87":"#e8e8e8"}`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{fontWeight:700,fontSize:14,fontFamily:"Literata,Georgia,serif",color:ci?"#7B9E87":"#aaa"}}>Week {w} {ci?`· ${MOOD_LABELS[ci.mood-1]}`:""}</div>
                {ci?<span style={{fontSize:11,color:"#aaa"}}>{ci.date}</span>:<button onClick={()=>{setCheckInWeek(w);setShowCheckIn(true);}} style={{padding:"6px 14px",background:"#EDF3EF",color:"#7B9E87",border:"1.5px solid #7B9E87",borderRadius:999,fontWeight:700,cursor:"pointer",fontSize:12,fontFamily:"Raleway,sans-serif"}}>Log</button>}
              </div>
              {ci?.note&&<p style={{fontSize:13,color:"#666",margin:"8px 0 0",lineHeight:1.5}}>{ci.note}</p>}
            </div>;
          })}
        </div>
      )}

      {/* ── BUDDY TAB ── */}
      {tab==="buddy" && (
        <div>
          <div style={{background:"white",borderRadius:14,padding:"24px",border:"1px solid #eee",marginBottom:20}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{display:"flex",justifyContent:"center",marginBottom:12}}><Icon name="partnership" size={40} color="#3C6B4A"/></div>
              <h3 style={{fontFamily:"Literata,Georgia,serif",fontSize:18,color:"#2a2a2a",marginBottom:8}}>Accountability Partner</h3>
              <p style={{fontSize:14,color:"#777",lineHeight:1.6}}>Research is clear: people who have an accountability partner are significantly more likely to follow through. Invite someone to do this alongside you: a partner, a friend, another caregiver in your cohort.</p>
            </div>
            {!buddyShared?<>
              <label style={{display:"block",fontSize:13,fontWeight:700,color:"#555",marginBottom:6,fontFamily:"Literata,Georgia,serif"}}>Partner's email</label>
              <input value={buddyEmail} onChange={e=>setBuddyEmail(e.target.value)} placeholder="partner@example.com" style={{width:"100%",padding:"10px 14px",borderRadius:8,border:"1.5px solid #e0e0e0",fontSize:15,fontFamily:"Raleway,sans-serif",boxSizing:"border-box",marginBottom:16}}/>
              <button onClick={shareWithBuddy} style={{width:"100%",padding:"12px",background:buddyEmail.trim()?"#3C6B4A":"#ddd",color:buddyEmail.trim()?"white":"#aaa",border:"none",borderRadius:999,fontWeight:700,cursor:buddyEmail.trim()?"pointer":"not-allowed",fontFamily:"Raleway,sans-serif",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                Send Invitation &amp; Earn Badge <Icon name="arrowRight" size={15} color={buddyEmail.trim()?"white":"#aaa"}/>
              </button>
            </>:<div style={{textAlign:"center",padding:"20px",background:"#E8F0EA",borderRadius:12}}>
              <div style={{display:"flex",justifyContent:"center",marginBottom:10}}><Icon name="partnership" size={32} color="#3C6B4A"/></div>
              <div style={{fontWeight:700,fontFamily:"Literata,Georgia,serif",color:"#3C6B4A",marginBottom:4}}>Invitation sent to {buddyEmail}</div>
              <div style={{fontSize:13,color:"#888"}}>You earned the Better Together badge.</div>
            </div>}
          </div>
          <div style={{background:"#F7EDE6",borderRadius:12,padding:"16px",border:"1px solid #EEDCCB"}}>
            <div style={{fontSize:13,fontWeight:700,color:"#A85D39",marginBottom:8,fontFamily:"Literata,Georgia,serif",display:"flex",alignItems:"center",gap:6}}><Icon name="sparkle" size={15} color="#A85D39"/> What good accountability looks like</div>
            <div style={{fontSize:13,color:"#777",lineHeight:1.7}}>
              A brief check-in once a week. "Did you do your three activities?" "How was your mood?" That's it. You don't need to share your scores, talk through your feelings, or do it together. You just need someone who will ask.
            </div>
          </div>
        </div>
      )}

      {/* ── BADGES TAB ── */}
      {tab==="badges" && (
        <div>
          <p style={{fontSize:14,color:"#888",marginBottom:20}}>{badges.length} of {BADGES.length} earned.</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:24}}>
            {BADGES.map(b=>{const earned=badges.includes(b.id);return(
              <div key={b.id} style={{background:earned?"white":"#FAFAF7",borderRadius:14,padding:"18px 14px",textAlign:"center",border:`1px solid ${earned?"transparent":"#eee"}`,boxShadow:earned?"0 1px 3px rgba(22,40,28,0.06)":"none",transition:"all 320ms cubic-bezier(0.165,0.84,0.44,1)"}}>
                <div style={{display:"flex",justifyContent:"center",marginBottom:10}}><BadgeMedallion iconName={b.icon} unlocked={earned}/></div>
                <div style={{fontSize:13,fontWeight:700,fontFamily:"Literata,Georgia,serif",color:earned?"#2a2a2a":"#bbb",marginBottom:4}}>{b.name}</div>
                <div style={{fontSize:11,color:"#aaa",lineHeight:1.4}}>{b.desc}</div>
                {earned&&<div style={{marginTop:8,fontSize:11,color:"#8F6F35",fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",gap:4}}><Icon name="check" size={12} color="#8F6F35"/> Earned</div>}
              </div>
            );})}
          </div>
          <div style={{background:"white",borderRadius:14,padding:"20px",border:"1px solid #eee"}}>
            <h3 style={{fontFamily:"Literata,Georgia,serif",fontSize:15,color:"#2a2a2a",marginBottom:12,display:"flex",alignItems:"center",gap:8}}><Icon name="target" size={17} color="#3C6B4A"/> Point guide</h3>
            {[["Complete an activity","10–22 pts"],["Full week complete","+25 bonus pts"],["Bonus challenge","40–50 pts"],["3-day streak","Streak badge"],["7-day streak","Unstoppable badge"],["Invite an accountability partner","Better Together badge"],["Complete 6 check-ins","Honest Reflection badge"],["Complete 6-week reassessment","Growth Visible badge"]].map(([a,r])=>(
              <div key={a} style={{display:"flex",justifyContent:"space-between",paddingBottom:8,marginBottom:8,borderBottom:"1px solid #f0f0f0",fontSize:13}}>
                <span style={{color:"#444"}}>{a}</span><span style={{fontWeight:700,color:"#4A7C59"}}>{r}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── WHEEL TAB ── */}
      {tab==="wheel" && (
        <div>
          <p style={{fontSize:14,color:"#888",marginBottom:16,lineHeight:1.6}}>Your baseline assessment. Come back after 6 weeks to compare.</p>
          <div style={{display:"flex",justifyContent:"center",marginBottom:24}}><div style={{width:300}}><WellnessWheelSVG scores={scores}/></div></div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {WEDGES.map(w=>{const cfg=WEDGE_CONFIG[w],sc=scores[w],lv=getLevel(sc),active=focusAreas.includes(w);return(
              <div key={w} style={{background:active?cfg.light:"#f9f9f9",borderRadius:10,padding:"12px",border:`1.5px solid ${active?cfg.color:"#e8e8e8"}`}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
                  <Icon name={cfg.icon} size={15} color={active?cfg.color:"#999"}/>
                  <span style={{fontWeight:700,fontSize:13,fontFamily:"Literata,Georgia,serif",color:active?cfg.color:"#666"}}>{w}</span>
                  {active&&<span style={{marginLeft:"auto",fontSize:10,color:cfg.color,fontWeight:700}}>FOCUS</span>}
                </div>
                <div style={{background:"#e8e8e8",borderRadius:99,height:5}}><div style={{width:`${sc}%`,background:cfg.color,height:"100%",borderRadius:99}}/></div>
                <div style={{fontSize:11,color:lv.color,marginTop:4,fontWeight:600}}>{sc}% · {lv.label}</div>
              </div>
            );})}
          </div>
          {!reassessScores&&<button onClick={()=>setReassessMode(true)} style={{width:"100%",marginTop:24,padding:"14px",background:"#3C6B4A",color:"white",border:"none",borderRadius:999,fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"Raleway,sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
            <Icon name="chart" size={16}/> Take the 6-Week Reassessment
          </button>}
        </div>
      )}

      {/* ── COMPARE TAB ── */}
      {tab==="compare" && reassessScores && (
        <div>
          <div style={{textAlign:"center",marginBottom:24}}>
            <h2 style={{fontFamily:"Literata,Georgia,serif",fontSize:22,color:"#2a2a2a",marginBottom:8,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}><Icon name="chart" size={22} color="#3C6B4A"/> Before &amp; After</h2>
            <p style={{fontSize:14,color:"#777"}}>Six weeks of real effort, made visible.</p>
          </div>
          <div style={{display:"flex",gap:16,justifyContent:"center",marginBottom:28,flexWrap:"wrap"}}>
            <div style={{textAlign:"center"}}><div style={{fontSize:13,color:"#aaa",marginBottom:8,fontFamily:"Raleway,sans-serif"}}>Week 1 Baseline</div><WellnessWheelSVG scores={scores} size={240}/></div>
            <div style={{textAlign:"center"}}><div style={{fontSize:13,color:"#3C6B4A",marginBottom:8,fontFamily:"Raleway,sans-serif",fontWeight:700}}>Week 6 Reassessment</div><WellnessWheelSVG scores={reassessScores} size={240}/></div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {WEDGES.map(w=>{
              const cfg=WEDGE_CONFIG[w], before=scores[w], after=reassessScores[w], diff=after-before;
              return <div key={w} style={{background:"white",borderRadius:12,padding:"14px",border:"1px solid #eee"}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
                  <Icon name={cfg.icon} size={15} color={cfg.color}/>
                  <span style={{fontWeight:700,fontSize:13,fontFamily:"Literata,Georgia,serif",color:"#2a2a2a"}}>{w}</span>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontSize:13,color:"#aaa"}}>{before}%</span>
                  <span style={{fontSize:12,color:"#ccc"}}>→</span>
                  <span style={{fontSize:15,fontWeight:700,color:cfg.color}}>{after}%</span>
                  <span style={{marginLeft:"auto",fontSize:13,fontWeight:700,color:diff>0?"#4A7C59":diff<0?"#C17A5A":"#aaa"}}>
                    {diff>0?"+":""}{diff}%
                  </span>
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
  const moodColors=["#A85D39","#C17A5A","#C9A15A","#6BAA75","#3C6B4A"];
  const moodLabels=["Struggling","Flat","Okay","Good","Great"];

  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(22,40,28,0.55)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9998,padding:16}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"white",borderRadius:20,padding:"32px 24px",maxWidth:380,width:"100%"}}>
        <h3 style={{fontFamily:"Literata,Georgia,serif",fontSize:20,color:"#2a2a2a",marginBottom:6}}>Week {week} Check-in</h3>
        <p style={{fontSize:14,color:"#888",marginBottom:20,lineHeight:1.5}}>How are you feeling this week, overall?</p>
        <div style={{display:"flex",gap:8,marginBottom:20}}>
          {[1,2,3,4,5].map(v=>(
            <button key={v} onClick={()=>setMood(v)} style={{flex:1,padding:"12px 4px",borderRadius:12,border:`1.5px solid ${mood===v?moodColors[v-1]:"#e8e8e8"}`,background:mood===v?"#FAFAF7":"white",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:6,transition:"all 180ms"}}>
              <span style={{width:16,height:16,borderRadius:"50%",background:moodColors[v-1],opacity:mood===v?1:0.35,transition:"opacity 180ms"}}/>
              <span style={{fontSize:10,color:mood===v?moodColors[v-1]:"#aaa",fontWeight:600}}>{moodLabels[v-1]}</span>
            </button>
          ))}
        </div>
        <textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Anything to note this week? (optional)" rows={3} style={{width:"100%",padding:"10px 14px",borderRadius:8,border:"1.5px solid #e0e0e0",fontSize:14,fontFamily:"Raleway,sans-serif",resize:"vertical",boxSizing:"border-box",marginBottom:16}}/>
        <div style={{display:"flex",gap:10}}>
          <button onClick={onClose} style={{flex:1,padding:"12px",background:"#f5f5f5",color:"#888",border:"none",borderRadius:999,fontWeight:700,cursor:"pointer",fontFamily:"Raleway,sans-serif"}}>Cancel</button>
          <button onClick={()=>onSubmit(week,mood,note)} style={{flex:2,padding:"12px",background:"#3C6B4A",color:"white",border:"none",borderRadius:999,fontWeight:700,cursor:"pointer",fontFamily:"Raleway,sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>Save Check-in <Icon name="check" size={15} color="white"/></button>
        </div>
      </div>
    </div>
  );
}

export function Landing({ onStart }) {
  return (
    <div style={{maxWidth:560,margin:"0 auto",padding:"32px 16px",textAlign:"center"}}>
      <div style={{display:"flex",justifyContent:"center",marginBottom:20}}><WellnessWheelSVG/></div>
      <h1 style={{fontFamily:"Literata,Georgia,serif",fontSize:28,color:"#2a2a2a",marginBottom:10,lineHeight:1.3}}>Your Caregiver Wellness Wheel</h1>
      <p style={{color:"#666",fontSize:15,lineHeight:1.7,marginBottom:28,maxWidth:420,margin:"0 auto 28px"}}>Built for family caregivers of someone with a rare disease. Eight dimensions of wellbeing. A 64-question assessment, a personalised report, and a gamified 6-week plan built around your actual life, not someone else's.</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:28,textAlign:"left"}}>
        {[["document","64-question assessment","8 questions across all 8 dimensions"],["chart","Personalised report","Scores, strengths, and focus areas"],["target","6-week plan","3 activities per week, your focus areas"],["medal","Points, badges & levels","Gamified progress that keeps you going"],["partnership","Accountability partner","Invite someone to keep you on track"],["moon","Weekly check-ins","Track your mood alongside your actions"],["sparkle","Bonus challenges","Optional harder activities, more points"],["chart","Before & after comparison","Reassess at week 6 to see your growth"]].map(([icon,title,desc],i)=>(
          <div key={i} style={{background:"white",borderRadius:12,padding:"14px",border:"1px solid #eee"}}>
            <div style={{marginBottom:8,color:"#3C6B4A"}}><Icon name={icon} size={22}/></div>
            <div style={{fontWeight:700,fontSize:13,fontFamily:"Literata,Georgia,serif",color:"#2a2a2a",marginBottom:3}}>{title}</div>
            <div style={{fontSize:11,color:"#888",lineHeight:1.4}}>{desc}</div>
          </div>
        ))}
      </div>
      <button onClick={onStart} style={{width:"100%",padding:"16px",background:"#3C6B4A",color:"white",border:"none",borderRadius:999,fontSize:16,fontWeight:700,cursor:"pointer",fontFamily:"Raleway,sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
        Begin My Assessment <Icon name="arrowRight" size={17} color="white"/>
      </button>
      <p style={{fontSize:12,color:"#aaa",marginTop:12}}>Takes about 10 minutes. No account needed to start.</p>
      <p style={{fontSize:11,color:"#bbb",marginTop:20,lineHeight:1.6,maxWidth:420,marginLeft:"auto",marginRight:"auto"}}>This is a wellbeing programme, not a substitute for medical or mental health care. If you're in crisis, please contact a crisis line or your GP.</p>
    </div>
  );
}
