import { useState, useEffect, useRef } from "react";
import { Icon } from "./icons";
import { Landing, Assessment, Report, SignUp, GamifiedPlan } from "./screens";
import { loadState, saveState } from "./persistence";
import { sendEnrolled, sendReassessment } from "./events";

export default function App() {
  const [hydrated, setHydrated] = useState(false);
  const [stage, setStage] = useState("landing");
  const [scores, setScores] = useState({});
  const [userName, setUserName] = useState("");
  const [focusAreas, setFocusAreas] = useState([]);
  const [planState, setPlanState] = useState(null);
  // Set only when the caregiver opted in to email check-ins on sign-up:
  // { participantId, enrollmentId } from the course CRM, so the week-8
  // reassessment can be recorded against the same enrolment.
  const [remote, setRemote] = useState(null);
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
        setRemote(saved.remote ?? null);
      }
      setHydrated(true);
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (skipNextSave.current) { skipNextSave.current = false; return; }
    saveState({ stage, scores, userName, focusAreas, planState, remote });
  }, [hydrated, stage, scores, userName, focusAreas, planState, remote]);

  function handleStart(name, focus, email) {
    setUserName(name);
    setFocusAreas(focus);
    setStage("plan");
    if (email) {
      sendEnrolled({ name, email, scores }).then((ids) => { if (ids) setRemote(ids); });
    }
  }

  function handleReassessed(newScores) {
    if (remote) sendReassessment({ name: userName, ...remote, scores: newScores });
  }

  if (!hydrated) {
    return (
      <div style={{minHeight:"100vh",background:"#EDEFEA",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <Icon name="mark" size={28} color="#4A7690"/>
      </div>
    );
  }

  return (
    <div style={{minHeight:"100vh",background:"#EDEFEA",fontFamily:"Hanken Grotesk,sans-serif"}}>
      <div style={{background:"rgba(247,248,246,0.92)",backdropFilter:"blur(8px)",borderBottom:"1px solid #DDE4E6",padding:"12px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:100}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:32,height:32,background:"#4A7690",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",color:"white"}}><Icon name="mark" size={18}/></div>
          <div><div style={{fontWeight:600,fontSize:14,color:"#20303A",fontFamily:"Newsreader,Georgia,serif"}}>Wellness Wheel</div><div style={{fontSize:10,color:"#93a0a6"}}>For family caregivers</div></div>
        </div>
        {stage!=="landing"&&<div style={{display:"flex",gap:6}}>
          {["assessment","report","plan"].map((s,i)=>{const stages=["assessment","report","signup","plan"];const done=stages.indexOf(stage)>i;const current=stage===s||(s==="report"&&stage==="signup");return <div key={s} style={{width:24,height:6,borderRadius:3,background:done?"#4A7690":current?"#5FA0A0":"#dde3e6",transition:"background 0.3s"}}/>;})}
        </div>}
      </div>
      <div style={{paddingBottom:48}}>
        {stage==="landing"&&<Landing onStart={()=>setStage("assessment")}/>}
        {stage==="assessment"&&<Assessment onComplete={s=>{setScores(s);setPlanState(null);setStage("report");}}/>}
        {stage==="report"&&<Report scores={scores} onSignUp={()=>setStage("signup")}/>}
        {stage==="signup"&&<SignUp scores={scores} onStart={handleStart}/>}
        {stage==="plan"&&<GamifiedPlan scores={scores} userName={userName} focusAreas={focusAreas} initialState={planState} onStateChange={setPlanState} onReassessed={handleReassessed}/>}
      </div>
    </div>
  );
}
