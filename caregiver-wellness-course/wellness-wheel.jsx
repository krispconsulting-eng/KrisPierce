import { useState, useEffect, useRef } from "react";

// ─── ICONS ───────────────────────────────────────────────────────────────────
// Hand-drawn line icons, matching the marketing site's icon set 1:1 (same
// path data) so the tool and the site read as one product. No emoji.
const ICON_PATHS = {
  social: <g><circle cx="9" cy="9.5" r="3.6"/><circle cx="15.5" cy="12.5" r="2.7"/><path d="M4.4 19.2c0.7-3 2.6-4.6 4.9-4.6 2.1 0 3.7 1.2 4.5 3.2"/><path d="M14.2 19.4c0.5-2 1.7-3.2 3.2-3.2 1.6 0 2.8 1.1 3.3 3"/></g>,
  occupational: <g><rect x="3.6" y="9" width="16.8" height="10.4" rx="2"/><path d="M8.6 9V7.2c0-1 0.8-1.8 1.8-1.8h3.2c1 0 1.8 0.8 1.8 1.8V9"/><path d="M3.6 13.4h16.8"/><path d="M10.7 13.4v2.2h2.6v-2.2"/></g>,
  environmental: <g><path d="M18.8 6.4c0.9 5.7-2 10.4-7.3 11.4-2.7-4.9-1.7-9.9 2.6-12.7 1.6 0.2 3.2 0.6 4.7 1.3z"/><path d="M11.5 17.8c-2.2 0.7-4.4 1-6.7 0.9"/><path d="M13.7 10.2c-1.9 1.6-3.2 3.6-3.9 6"/></g>,
  intellectual: <g><path d="M12 3.6c-3 0-5.4 2.3-5.4 5.4 0 2 1.1 3.3 2.1 4.2 0.6 0.6 1 1.1 1 1.8v0.6h4.6v-0.6c0-0.7 0.4-1.2 1-1.8 1-0.9 2.1-2.2 2.1-4.2 0-3.1-2.4-5.4-5.4-5.4z"/><path d="M9.7 18v0.6c0 0.8 0.6 1.4 1.4 1.4h1.8c0.8 0 1.4-0.6 1.4-1.4V18"/><path d="M12 6.6c-1.6 0-2.7 1.1-2.7 2.7"/></g>,
  spiritual: <g><path d="M12 20.4c-4-1.6-6.4-4.4-6.4-8.2 2.8 0.4 4.8 1.8 6.4 4.2 1.6-2.4 3.6-3.8 6.4-4.2 0 3.8-2.4 6.6-6.4 8.2z"/><path d="M12 16.4c-1.6-3.4-1.6-6.6 0-10.8 1.6 4.2 1.6 7.4 0 10.8z"/></g>,
  emotional: <path d="M12 19.4c-3.6-2.5-7.2-5.5-7.2-9.5 0-2.5 2-4.4 4.4-4.4 1.3 0 2.5 0.6 3.3 1.6 1.1-1.4 2.6-1.9 3.9-1.7 2.4 0.3 4 2.4 3.7 4.9-0.5 4-4.4 6.7-8.1 9.1z"/>,
  physical: <path d="M3.4 12.6h3.2l1.7-3.6 2.7 7.6 2.1-5.4 1.4 3h5.7"/>,
  financial: <g><path d="M4 17.4l4.4-4.6 3.3 2.6 5.2-6"/><path d="M14 9.4h3v3"/></g>,
  leaf: <g><path d="M18.8 6.4c0.9 5.7-2 10.4-7.3 11.4-2.7-4.9-1.7-9.9 2.6-12.7 1.6 0.2 3.2 0.6 4.7 1.3z"/><path d="M11.5 17.8c-2.2 0.7-4.4 1-6.7 0.9"/></g>,
  plant: <g><path d="M12 20.4V11"/><path d="M12 13.4c0-3.4-2.2-5.6-5.6-6 0.2 3.6 2.2 5.8 5.6 6z"/><path d="M12 11c0-3.8 2.4-6.2 6.2-6.6-0.2 4-2.4 6.4-6.2 6.6z"/><path d="M8.4 20.4h7.2"/></g>,
  flame: <path d="M12 3.8c1.4 2.6 0.6 4-0.6 5.4-1.4 1.7-2.4 3-2.4 5 0 3.3 2.7 5.6 6 4.9-1.3-0.6-2-1.7-2-3 0-1.6 1.1-2.4 2-3.6 0.7 1 1 1.9 1 3 0 1.1-0.4 1.9-1 2.6 2.7-0.4 4.6-2.6 4.6-5.5 0-4.1-3.4-6.3-6.6-8.8z"/>,
  moon: <path d="M17.4 14.2c-3.9 1.8-8-1.3-7.7-5.5 0.2-2.5 1.7-4.4 3.7-5.3-4.4 0.1-8 3.7-8 8.2 0 4.5 3.7 8.2 8.2 8.2 3.4 0 6.3-2 7.5-5-1.2 0.2-2.5 0-3.7-0.6z"/>,
  sparkle: <g><path fill="currentColor" stroke="none" d="M12 3.4c0.5 3.6 1.7 5.9 5.6 6.6-3.9 0.7-5.1 3-5.6 6.6-0.5-3.6-1.7-5.9-5.6-6.6 3.9-0.7 5.1-3 5.6-6.6z"/></g>,
  medal: <g><path d="M8.6 3.6l-2.3 6 3.9 2.6 3.9-2.6-2.3-6z"/><circle cx="12" cy="14.6" r="5.8"/><path d="M12 11.4l1.1 2.3 2.5 0.3-1.8 1.7 0.4 2.5-2.2-1.2-2.2 1.2 0.4-2.5-1.8-1.7 2.5-0.3z"/></g>,
  mark: <g><path d="M12 12c0-3.6 1.6-6.6 4.6-8.2 1 3.8-0.2 7.2-2.6 9.4"/><path d="M12 12c3.1-1.9 6.4-2.1 9.4-0.4-1.8 3.3-5 4.9-8.6 4.6"/><path d="M12 12c-1.1 3.5-3.6 5.9-7.2 6.8-1-3.8 0.4-7.1 3.1-9.1"/><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/></g>,
  chart: <g><path d="M4 20.4V6.4"/><path d="M4 20.4h16.4"/><path d="M7.2 17.4v-4.6"/><path d="M11.6 17.4v-8"/><path d="M16 17.4v-5.8"/><path d="M20.4 17.4v-10"/></g>,
  partnership: <g><path d="M4 13.6c0-4 2.7-7.6 6.6-8.8 0.9 3.9-0.4 7.4-3.4 9.8"/><path d="M20 13.6c0-4-2.7-7.6-6.6-8.8-0.9 3.9 0.4 7.4 3.4 9.8"/><path d="M7.6 15c1.4 2.3 2.8 3.6 4.4 4.4 1.6-0.8 3-2.1 4.4-4.4"/></g>,
  document: <g><path d="M6.4 3.6h8l4.2 4.2v12.6H6.4z"/><path d="M14.4 3.6v4.2h4.2"/><path d="M9 13h6M9 16.2h6M9 9.8h2.4"/></g>,
  target: <g><circle cx="12" cy="12" r="8.2"/><circle cx="12" cy="12" r="4.4"/><circle cx="12" cy="12" r="0.9" fill="currentColor" stroke="none"/></g>,
  check: <path d="M4.4 12.6l4.8 4.8L19.6 6.8" strokeWidth="1.9"/>,
  arrowRight: <path d="M4.4 12h15M13.6 6.2l5.8 5.8-5.8 5.8" strokeWidth="1.8"/>,
};
function Icon({ name, size = 18, color = "currentColor", style }) {
  const glyph = ICON_PATHS[name];
  if (!glyph) return null;
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color}
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0, display: "inline-block", verticalAlign: "middle", ...style }}>
      {glyph}
    </svg>
  );
}

// ─── THEME ───────────────────────────────────────────────────────────────────
const WEDGE_CONFIG = {
  Social:        { color: "#3C6B4A", light: "#E8F0EA", icon: "social" },
  Occupational:  { color: "#6BAA75", light: "#EBF4EC", icon: "occupational" },
  Environmental: { color: "#8CAE93", light: "#F0F6EF", icon: "environmental" },
  Intellectual:  { color: "#5B8DB8", light: "#E8F1F8", icon: "intellectual" },
  Spiritual:     { color: "#7B9E87", light: "#EDF3EF", icon: "spiritual" },
  Emotional:     { color: "#C17A5A", light: "#F7EDE6", icon: "emotional" },
  Physical:      { color: "#A85D39", light: "#F9EEE5", icon: "physical" },
  Financial:     { color: "#8F6F35", light: "#F0EBE3", icon: "financial" },
};
const WEDGES = Object.keys(WEDGE_CONFIG);

// ─── QUESTIONS ────────────────────────────────────────────────────────────────
// Written for family caregivers of someone with a rare disease specifically,
// not generic wellness content. Each dimension is grounded in what's actually
// reported in caregiver research (isolation, chronic/anticipatory grief,
// income and career disruption, becoming disease-literate, home-as-care-
// environment, real financial strain) rather than a general audience's
// version of the same 8 dimensions.
const QUESTIONS = {
  Social: ["I have at least one person in my life who understands what caregiving for my situation actually involves.","I make time for relationships that have nothing to do with caregiving, even briefly.","I feel part of a community, whether that's other caregivers, family, or friends who show up.","I can say no to a request without guilt, even when someone is used to me saying yes.","When I'm struggling, I reach out rather than handling it alone.","My relationship with my partner, if I have one, gets attention beyond logistics and caregiving admin.","I've stayed in touch with at least one friendship this month that isn't about caregiving.","Being around people leaves me with more energy than it costs me, more often than not."],
  Occupational: ["I recognise caregiving itself as real work, not just \"what needs to be done.\"","If I'm employed, I've been able to adapt my work around caregiving without abandoning it entirely.","I feel more in control of my daily workload, paid work, caregiving, or both, than at the mercy of it.","I've told someone, an employer, a colleague, a family member, what I actually need to make things workable.","I get some acknowledgement for what I do, from myself if from no one else.","I'm not just surviving my responsibilities; I'm building something in them too, skills, insight, purpose.","My sense of who I am hasn't been entirely replaced by \"caregiver.\"","I end most days feeling like I did something that mattered, not just something that had to be done."],
  Environmental: ["My home functions well for the caregiving it needs to hold, without being only about that.","I have a space, even a small one, that belongs to me and not to the caregiving routine.","I get outside or into fresh air regularly, not just when there's time left over.","I feel safe and steady in my physical surroundings, not on edge.","I notice when my environment is adding to my stress, and I do something about it when I can.","My home has small things in it that are just for beauty or comfort, not function.","I have some kind of regular access to a change of scenery, even briefly.","I feel connected to where I live, not just like I'm passing through it."],
  Intellectual: ["I have at least one interest or pursuit that has nothing to do with managing anyone's health.","I make time to learn or engage with something new, even briefly, most weeks.","I have a creative outlet, however small, that I actually use.","My mind gets to be curious sometimes, not just vigilant.","I have conversations that stretch my thinking, not just logistics and updates.","I take in things, books, shows, podcasts, ideas, that have nothing to do with caregiving.","When I solve problems, it's more often with curiosity than with anxiety.","My intellectual life feels like it's still mine, not just reactive to whatever comes up."],
  Spiritual: ["I have a clear sense of what actually matters most to me right now.","I make time, even a few minutes, for stillness or reflection most days.","I have something, faith, values, practice, that holds steady when things don't make sense.","I can sit with uncertainty about the future without it undoing me.","I feel some sense of purpose in how I'm spending this season of my life, even amid the hard parts.","I have space to grieve what's been lost or changed, not just push through.","I allow myself moments of meaning or gratitude, even in a hard week.","My inner life gets tended to, not just set aside for later."],
  Emotional: ["I can name what I'm actually feeling, most days, even when it's complicated.","I have somewhere to put difficult feelings, rather than carrying them alone.","I give myself permission to grieve what's changed, even without a single clear loss to point to.","I don't feel guilty for needing rest or support, even when I still feel it.","I talk to myself kindly, especially on the days I feel like I'm failing at this.","I let myself feel joy or lightness without it feeling like a betrayal of how hard things are.","I ask for support before I'm completely depleted, not just after.","I feel steadier emotionally than I did a month ago, even slightly."],
  Physical: ["I move my body in some way I enjoy most weeks, even briefly.","I get enough sleep most nights, or find ways to recover when I don't.","I eat in a way that gives me energy, most of the time.","I attend to my own medical care as consistently as I manage it for someone else.","I notice my body's signals (pain, fatigue, hunger) instead of overriding them by default.","I'm managing my own health conditions or symptoms, not just everyone else's.","I'm mindful about alcohol, caffeine, or other things I use to get through the day.","My energy feels adequate for the life I'm actually living, most days."],
  Financial: ["I have a realistic picture of what caregiving actually costs our family, not just a general sense.","I know what financial assistance or support programs might be available to us.","Financial stress doesn't dominate my thinking most days, even if it's present.","I feel some sense of control over financial decisions, rather than just reacting to bills as they come.","I've had at least one honest conversation about money with someone I trust.","I'm not carrying financial decisions or knowledge alone, if I have a partner or family to share them with.","I can talk about money without shame, even when things are tight.","I feel like I have some financial choices left, even if they're small ones."],
};

// ─── ACTIVITIES ───────────────────────────────────────────────────────────────
// 6 weeks × 3 activities per dimension, written for the same caregiver
// audience as QUESTIONS above.
const ACTIVITIES = {
  Social: [["Message one person who's been on your mind, just to check in","Say yes to one small social moment this week: a coffee, a call, a text back","Name one person who actually understands your situation, and reach out to them"],["Have one conversation this week that isn't about caregiving logistics","Ask for a specific piece of help from someone, instead of managing alone","Spend 15 minutes with your partner or a close friend, phones away"],["Reconnect with one relationship that's gone quiet since things got busy","Join or revisit one group, in person or online, connected to your situation or interests","Tell someone specifically what their support has meant to you"],["Set one boundary this week with someone who assumes you're always available","Do one thing with a sibling, partner, or other family member that's just for the two of you","Accept help when it's offered, instead of saying \"I've got it\""],["Plan one thing to look forward to with someone else, even small","Have one honest conversation about how you're actually coping","Thank someone who has quietly shown up for you"],["Reflect: who has been steady for you these six weeks? Let them know","Identify one relationship you want to invest in going forward","Celebrate a connection that got you through a hard week"]],
  Occupational: [["Write down three things caregiving has taught you that count as real skills","Identify one task this week you can hand to someone else, even partially","Name one part of your work or role that still feels like yours"],["Have one conversation about what flexibility you actually need, at work or at home","Protect one hour this week that's just for a task you find meaningful","Acknowledge one thing you handled well, out loud or in writing"],["Identify what's draining you most in your workload right now, and name it plainly","Ask for help with one specific task instead of absorbing it","Do one thing this week that uses a strength that has nothing to do with caregiving"],["Set a clear start or stop point for one part of your day","Have a direct conversation about expectations, at work or within the family","Write a \"done\" list at the end of one day instead of only a to-do list"],["Explore one resource, support, or piece of information that could lighten your load","Ask someone you trust for honest feedback on how you're managing","Protect one break today, even ten minutes, without guilt"],["Write one sentence about what you want your role, paid or unpaid, to look like next","Identify one thing about your current load you want to change going forward","Acknowledge a milestone you've reached, however small it looks from outside"]],
  Environmental: [["Spend 15 minutes outside today, even if it's just the yard or a nearby street","Clear one small surface that's been bothering you","Add one thing to your space that's just for you: a candle, a photo, a plant"],["Find ten minutes in a space that's just yours, even a corner or a car","Do a small digital declutter: one folder, one inbox, one photo album","Notice one thing in your environment that drains you, and change what you can"],["Spend time somewhere with a different view this week: a park, a friend's place, a drive","Tidy one space that affects how you feel each morning","Identify what your ideal home environment would feel like, and take one small step toward it"],["Set up or reclaim one small space that's just for rest or quiet","Spend a few minutes somewhere with no agenda, no task attached","Make one small change that makes mornings or evenings easier"],["Adjust one thing about your sleep environment: light, noise, temperature","Visit somewhere outdoors that isn't part of your usual routine","Reorganise one area so it better supports the days you actually have"],["Do a small seasonal reset: one drawer, one shelf, one bag","Add one lasting touch of comfort or beauty to your space","Reflect: does your home support the person you're becoming, or just the tasks you do?"]],
  Intellectual: [["Read or listen to something for 15 minutes that has nothing to do with caregiving","Start a simple log of one thing you're curious about lately","Pick one small creative outlet to return to this week: drawing, writing, music, cooking"],["Learn one small new thing, a recipe, a skill, a fact, that has nothing to do with your caregiving role","Have one conversation about something other than logistics or health updates","Do a puzzle, game, or something that occupies your mind playfully"],["Read or watch one full piece of long-form content, start to finish","Revisit an interest you used to have and dropped","Write for 10 minutes about anything except caregiving"],["Start or continue a small creative project, just for you","Ask someone about something they know well, and actually listen","Notice one moment this week where curiosity showed up instead of worry"],["Try something outside your usual genre or routine: a book, a show, an activity","Write down three questions you're genuinely curious about","Take a short break to learn something with zero practical use"],["Reflect on one thing you've learned about yourself in the past six weeks","Identify one interest you want to protect time for going forward","Share something you're excited about with someone else"]],
  Spiritual: [["Spend 5 minutes in silence or stillness this morning","Write down what matters most to you right now, in one sentence","Notice one moment of meaning today, however small"],["Start a short gratitude note: three things, each evening this week","Spend time outdoors with intention, not as exercise, just presence","Name one place where your daily life and your values feel out of step"],["Take 10 minutes to breathe or sit quietly, without your phone","Read, listen to, or reflect on something that nourishes you, not informs you","Let go of one obligation this week that isn't truly yours to carry"],["Create one small ritual, morning, evening, or weekly, that's just yours","Reflect on what's giving your life meaning right now, even in a hard season","Do one generous thing with no expectation of anything back"],["Write a short letter to your future self, a few months or years from now","Sit with one hard question without rushing to resolve it","Spend a few minutes doing absolutely nothing: no task, no screen, no purpose"],["Reflect on what you want to carry forward from these six weeks","Revisit what matters most to you: has anything shifted?","Write one intention for the next chapter, however small"]],
  Emotional: [["Name your emotional state honestly this morning, even just to yourself","Identify one feeling you've been avoiding, and just acknowledge it","Do one small thing today purely because it makes you feel good"],["Set aside 10 minutes for something gentle that helps you reset","Tell one person how you're actually doing, not the polished version","Write down what tends to trigger your hardest moments"],["Write yourself a short, kind note after a hard moment this week","Let go of one source of stress that isn't essential right now","Do something a little playful or silly, just because"],["Notice one pattern in how you respond when things go wrong","Let yourself fully feel something this week: grief, laughter, relief, whatever it is","Ask for help with one thing you've been carrying alone"],["Build a small emotional first-aid kit: a song, a walk, a person, a phrase","Name one strength in yourself that you tend to overlook","Have one honest conversation you've been putting off"],["Reflect on how your emotional load has shifted over six weeks","Identify one belief about yourself you're ready to update","Acknowledge how far you've come, not just how far there is to go"]],
  Physical: [["Move your body for 20 minutes in a way you actually enjoy","Drink water consistently through the day, not just when you remember","Go to bed 20 minutes earlier one night this week"],["Try one different form of movement this week: a walk, a stretch, a dance in the kitchen","Add one more vegetable or piece of fruit to a meal","Have one screen-free hour before bed"],["Get outside and walk, even ten minutes, every day this week","Prepare one meal from scratch, even something simple","Book or schedule a health check-up for yourself that you've been putting off"],["Do 10 minutes of stretching or gentle movement","Notice your caffeine or alcohol intake this week, without judgement","Track your sleep for a few nights and notice one pattern"],["Look for small ways to move more: stairs, a longer walk, standing breaks","Eat one meal slowly, without screens","Do one restorative thing for your body: a bath, a stretch, an early night"],["Reflect on how your body feels compared to six weeks ago","Choose one physical habit from these weeks to keep going","Do something today that celebrates what your body has carried you through"]],
  Financial: [["Look at last month's spending with curiosity, not judgement","Identify one non-essential expense and decide if it still fits","Set one small, realistic savings or budget goal for the week"],["Review or start a simple budget that reflects your actual life right now","Look into one financial assistance or support program that might apply to you","Have one honest conversation about money with someone you trust"],["Spend 15 minutes on one piece of financial information relevant to your situation","Identify one financial decision you've been avoiding, and take one small step on it","Cancel or pause one subscription or expense you don't need"],["Check in on savings, insurance, or benefits relevant to your family's situation","Identify one recurring expense you could reduce","Write down what financial security would actually look like for you"],["Make a plan for one financial goal, however modest: a buffer, a bill, a break","Check your overall financial picture: accounts, benefits, what's coming up","Name one belief about money you inherited that may not be serving you"],["Acknowledge one financial win from the past six weeks, however small","Set one financial intention for the next few months","Reflect: does your spending, right now, reflect what actually matters to you?"]],
};

// ─── BONUS CHALLENGES ─────────────────────────────────────────────────────────
// Icon is drawn from the challenge's own wedge (WEDGE_CONFIG) at render time,
// keeping every icon in the tool traceable to the same 8-dimension system.
const BONUS_CHALLENGES = [
  { id: "b1", wedge: "Physical", text: "Complete a 7-day movement streak, any movement, every day.", points: 50 },
  { id: "b2", wedge: "Social", text: "Organise one gathering, however small, with people who understand your situation.", points: 40 },
  { id: "b3", wedge: "Emotional", text: "Write a 500-word letter about the hardest part of this, to yourself or no one. You don't have to send it.", points: 45 },
  { id: "b4", wedge: "Financial", text: "Track every dollar spent on caregiving costs specifically for one full week.", points: 50 },
  { id: "b5", wedge: "Intellectual", text: "Finish one book that has nothing to do with health, caregiving, or your condition.", points: 40 },
  { id: "b6", wedge: "Spiritual", text: "Spend 20 minutes a day this week in intentional stillness or reflection.", points: 45 },
  { id: "b7", wedge: "Environmental", text: "Arrange real respite for one full day: someone else covers care, no screens, no obligations for you.", points: 40 },
  { id: "b8", wedge: "Occupational", text: "Take one full day genuinely off, from paid work or caregiving admin, and let yourself rest.", points: 50 },
];

// ─── BADGES ──────────────────────────────────────────────────────────────────
// Each badge is a hand-drawn medallion (see BadgeMedallion below), locked in
// muted stone tones and switching to the Antique Brass "earned" treatment
// only once unlocked — the achievement color is reserved for this moment.
const BADGES = [
  { id: "first_step",  name: "First Step",      icon: "leaf", desc: "Completed the assessment" },
  { id: "week1",       name: "One Week Strong",  icon: "target", desc: "Completed all Week 1 activities" },
  { id: "streak3",     name: "On a Roll",        icon: "flame", desc: "3-day activity streak" },
  { id: "halfway",     name: "Halfway There",    icon: "moon", desc: "Completed Week 3" },
  { id: "all_wedges",  name: "Full Circle",      icon: "mark", desc: "Completed an activity in every wedge" },
  { id: "finisher",    name: "Journey Complete", icon: "medal", desc: "Completed all 6 weeks" },
  { id: "streak7",     name: "Unstoppable",      icon: "sparkle", desc: "7-day activity streak" },
  { id: "inner3",      name: "Inner Work",       icon: "spiritual", desc: "Completed 3 Spiritual or Emotional activities" },
  { id: "bonus1",      name: "Over-Achiever",    icon: "sparkle", desc: "Completed a bonus challenge" },
  { id: "buddy",       name: "Better Together",  icon: "partnership", desc: "Shared your wheel with an accountability partner" },
  { id: "check_in6",   name: "Honest Reflection", icon: "document", desc: "Completed 6 weekly check-ins" },
  { id: "reassessed",  name: "Growth Visible",   icon: "chart", desc: "Completed the 6-week reassessment" },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function scoreWedge(answers) {
  return Math.round((answers.reduce((a,b)=>a+b,0) / (answers.length * 5)) * 100);
}
function getLevel(score) {
  if (score >= 80) return { label: "Thriving",         color: "#3C6B4A" };
  if (score >= 60) return { label: "Growing",          color: "#6BAA75" };
  if (score >= 40) return { label: "Developing",       color: "#C17A5A" };
  return            { label: "Needs Attention",  color: "#A85D39" };
}
const LEVEL_THRESHOLDS = [
  { min: 0,   label: "Seed",     icon: "leaf",    color: "#8CAE93" },
  { min: 100, label: "Sprout",   icon: "plant",   color: "#6BAA75" },
  { min: 250, label: "Bloom",    icon: "spiritual", color: "#3C6B4A" },
  { min: 500, label: "Flourish", icon: "sparkle", color: "#C9A15A" },
  { min: 800, label: "Radiant",  icon: "medal",   color: "#8F6F35" },
];
function getUserLevel(pts) {
  return LEVEL_THRESHOLDS.reduce((l,t) => pts >= t.min ? t : l, LEVEL_THRESHOLDS[0]);
}

// ─── WHEEL SVG ────────────────────────────────────────────────────────────────
function WellnessWheelSVG({ scores = {}, size = 300 }) {
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

function ProgressRing({ score, color, size=60 }) {
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

// ─── BADGE MEDALLION ──────────────────────────────────────────────────────────
// The Earned Gold Rule: locked badges sit in muted stone tones; unlocked
// badges alone get the Antique Brass fill plus the achievement glow, so
// brass reads as "earned" rather than decorative.
function BadgeMedallion({ iconName, unlocked, size = 64 }) {
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

// ─── BADGE MODAL ──────────────────────────────────────────────────────────────
function BadgeModal({ badgeId, onClose }) {
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

// ─── ASSESSMENT ───────────────────────────────────────────────────────────────
function Assessment({ onComplete }) {
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

// ─── REPORT ───────────────────────────────────────────────────────────────────
function Report({ scores, onSignUp }) {
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

// ─── SIGN UP ──────────────────────────────────────────────────────────────────
function SignUp({ scores, onStart }) {
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

// ─── GAMIFIED PLAN (main feature) ────────────────────────────────────────────
function GamifiedPlan({ scores: initialScores, userName, focusAreas }) {
  const [completed,setCompleted]=useState({});
  const [bonusDone,setBonusDone]=useState({});
  const [points,setPoints]=useState(50);
  const [badges,setBadges]=useState(["first_step"]);
  const [badgeModal,setBadgeModal]=useState(null);
  const [streak,setStreak]=useState(0);
  const [lastActiveDate,setLastActiveDate]=useState(null);
  const [currentWeek,setCurrentWeek]=useState(1);
  const [tab,setTab]=useState("plan");
  const [buddyEmail,setBuddyEmail]=useState("");
  const [buddyShared,setBuddyShared]=useState(false);
  const [checkIns,setCheckIns]=useState({});
  const [showCheckIn,setShowCheckIn]=useState(false);
  const [checkInWeek,setCheckInWeek]=useState(null);
  const [reassessMode,setReassessMode]=useState(false);
  const [reassessScores,setReassessScores]=useState(null);
  const [scores,setScores]=useState(initialScores);

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

// ─── WEEKLY CHECK-IN MODAL ────────────────────────────────────────────────────
function WeeklyCheckIn({ week, existing, onSubmit, onClose }) {
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

// ─── LANDING ──────────────────────────────────────────────────────────────────
function Landing({ onStart }) {
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

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [stage,setStage]=useState("landing");
  const [scores,setScores]=useState({});
  const [userName,setUserName]=useState("");
  const [focusAreas,setFocusAreas]=useState([]);

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
        {stage==="assessment"&&<Assessment onComplete={s=>{setScores(s);setStage("report");}}/>}
        {stage==="report"&&<Report scores={scores} onSignUp={()=>setStage("signup")}/>}
        {stage==="signup"&&<SignUp scores={scores} onStart={(name,focus)=>{setUserName(name);setFocusAreas(focus);setStage("plan");}}/>}
        {stage==="plan"&&<GamifiedPlan scores={scores} userName={userName} focusAreas={focusAreas}/>}
      </div>
    </div>
  );
}
