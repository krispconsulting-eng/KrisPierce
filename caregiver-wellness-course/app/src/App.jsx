import { useState, useEffect, useRef } from "react";
import { Icon } from "./icons";
import { Landing, Assessment, Report, JoinGate, SignUp, GamifiedPlan } from "./screens";
import { loadState, saveState } from "./persistence";
import { sendEnrolled, sendReassessment } from "./events";

export default function App() {
  const [hydrated, setHydrated] = useState(false);
  const [stage, setStage] = useState("landing");
  const [scores, setScores] = useState({});
  const [userName, setUserName] = useState("");
  const [focusAreas, setFocusAreas] = useState([]);
  const [planState, setPlanState] = useState(null);
  // True only for the manually-enrolled pilot cohort: Kris hands out a link
  // with ?enrolled=1 once she's confirmed payment or a sponsored seat
  // outside the app (no live checkout/redemption exists yet). Everyone else
  // hits the JoinGate after their free report instead of the free plan.
  const [enrolled, setEnrolled] = useState(false);
  // Set only when the caregiver opted in to email check-ins on sign-up:
  // { participantId, enrollmentId } from the course CRM, so the week-8
  // reassessment can be recorded against the same enrolment.
  const [remote, setRemote] = useState(null);
  // Holds the opt-in details until the CRM confirms them (network hiccup or
  // a temporarily unreachable webhook must not lose consent silently) —
  // retried once per app open until remote is set.
  const [pendingEnroll, setPendingEnroll] = useState(null);
  const retriedThisSession = useRef(false);
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
        setPendingEnroll(saved.pendingEnroll ?? null);
        setEnrolled(saved.enrolled ?? false);
      }
      // A ?enrolled=1 link always wins over saved state (never demotes an
      // already-enrolled device, and lets Kris re-send the link if needed).
      if (new URLSearchParams(window.location.search).get("enrolled") === "1") {
        setEnrolled(true);
      }
      setHydrated(true);
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (skipNextSave.current) { skipNextSave.current = false; return; }
    saveState({ stage, scores, userName, focusAreas, planState, remote, pendingEnroll, enrolled });
  }, [hydrated, stage, scores, userName, focusAreas, planState, remote, pendingEnroll, enrolled]);

  // Retries a still-pending opt-in once per app open (covers a webhook that
  // was unreachable or briefly failing when the caregiver first signed up),
  // rather than dropping their consent the moment the first attempt fails.
  useEffect(() => {
    if (!hydrated || !pendingEnroll || remote || retriedThisSession.current) return;
    retriedThisSession.current = true;
    sendEnrolled(pendingEnroll).then((ids) => { if (ids) { setRemote(ids); setPendingEnroll(null); } });
  }, [hydrated, pendingEnroll, remote]);

  function handleStart(name, focus, email) {
    setUserName(name);
    setFocusAreas(focus);
    setStage("plan");
    if (email) {
      const enroll = { name, email, scores };
      setPendingEnroll(enroll);
      sendEnrolled(enroll).then((ids) => { if (ids) { setRemote(ids); setPendingEnroll(null); } });
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
          <div><div style={{fontWeight:600,fontSize:14,color:"#20303A",fontFamily:"Newsreader,Georgia,serif"}}>Wellbeing Journey</div><div style={{fontSize:10,color:"#93a0a6"}}>For family caregivers</div></div>
        </div>
        {stage!=="landing"&&<div style={{display:"flex",gap:6}}>
          {["assessment","report","plan"].map((s,i)=>{const stages=["assessment","report","join","signup","plan"];const done=stages.indexOf(stage)>i;const current=stage===s||(s==="report"&&(stage==="join"||stage==="signup"));return <div key={s} style={{width:24,height:6,borderRadius:3,background:done?"#4A7690":current?"#5FA0A0":"#dde3e6",transition:"background 0.3s"}}/>;})}
        </div>}
      </div>
      <div style={{paddingBottom:48}}>
        {stage==="landing"&&<Landing onStart={()=>setStage("assessment")}/>}
        {stage==="assessment"&&<Assessment onComplete={s=>{setScores(s);setPlanState(null);setStage("report");}}/>}
        {stage==="report"&&<Report scores={scores} onContinue={()=>setStage(enrolled?"signup":"join")}/>}
        {stage==="join"&&<JoinGate/>}
        {stage==="signup"&&<SignUp scores={scores} onStart={handleStart}/>}
        {stage==="plan"&&<GamifiedPlan scores={scores} userName={userName} focusAreas={focusAreas} initialState={planState} onStateChange={setPlanState} onReassessed={handleReassessed}/>}
      </div>
    </div>
  );
}
