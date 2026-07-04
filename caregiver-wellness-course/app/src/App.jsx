import { useState, useEffect, useRef } from "react";
import { Icon } from "./icons";
import { Landing, Assessment, Report, SignUp, GamifiedPlan } from "./screens";
import { loadState, saveState } from "./persistence";

export default function App() {
  const [hydrated, setHydrated] = useState(false);
  const [stage, setStage] = useState("landing");
  const [scores, setScores] = useState({});
  const [userName, setUserName] = useState("");
  const [focusAreas, setFocusAreas] = useState([]);
  const [planState, setPlanState] = useState(null);
  const skipNextSave = useRef(true);

  useEffect(() => {
    let cancelled = false;
    loadState().then((saved) => {
      if (cancelled) return;
      if (saved) {
        setStage(saved.stage ?? "landing");
        setScores(saved.scores ?? {});
        setUserName(saved.userName ?? "");
        setFocusAreas(saved.focusAreas ?? []);
        setPlanState(saved.planState ?? null);
      }
      setHydrated(true);
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (skipNextSave.current) { skipNextSave.current = false; return; }
    saveState({ stage, scores, userName, focusAreas, planState });
  }, [hydrated, stage, scores, userName, focusAreas, planState]);

  if (!hydrated) {
    return (
      <div style={{minHeight:"100vh",background:"#FDFBF7",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <Icon name="mark" size={28} color="#3C6B4A"/>
      </div>
    );
  }

  return (
    <div style={{minHeight:"100vh",background:"#FDFBF7",fontFamily:"Raleway,sans-serif"}}>
      <div style={{background:"rgba(253,251,247,0.92)",backdropFilter:"blur(8px)",borderBottom:"1px solid #E5E0D5",padding:"12px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:100}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:32,height:32,background:"#3C6B4A",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",color:"white"}}><Icon name="mark" size={18}/></div>
          <div><div style={{fontWeight:700,fontSize:14,color:"#2a2a2a",fontFamily:"Literata,Georgia,serif"}}>Wellness Wheel</div><div style={{fontSize:10,color:"#aaa"}}>For family caregivers</div></div>
        </div>
        {stage!=="landing"&&<div style={{display:"flex",gap:6}}>
          {["assessment","report","plan"].map((s,i)=>{const stages=["assessment","report","signup","plan"];const done=stages.indexOf(stage)>i;const current=stage===s||(s==="report"&&stage==="signup");return <div key={s} style={{width:24,height:6,borderRadius:3,background:done?"#3C6B4A":current?"#6BAA75":"#e0e0e0",transition:"background 0.3s"}}/>;})}
        </div>}
      </div>
      <div style={{paddingBottom:48}}>
        {stage==="landing"&&<Landing onStart={()=>setStage("assessment")}/>}
        {stage==="assessment"&&<Assessment onComplete={s=>{setScores(s);setPlanState(null);setStage("report");}}/>}
        {stage==="report"&&<Report scores={scores} onSignUp={()=>setStage("signup")}/>}
        {stage==="signup"&&<SignUp scores={scores} onStart={(name,focus)=>{setUserName(name);setFocusAreas(focus);setStage("plan");}}/>}
        {stage==="plan"&&<GamifiedPlan scores={scores} userName={userName} focusAreas={focusAreas} initialState={planState} onStateChange={setPlanState}/>}
      </div>
    </div>
  );
}
