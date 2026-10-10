// Consent-first bridge from the app to the course CRM (n8n -> Notion).
// Nothing here runs unless the caregiver chose to leave an email address on
// the sign-up screen. With no email, the app never contacts the network and
// everything stays on the device.
//
// Both calls are fire-and-forget: a failed or offline request never blocks
// or breaks the app experience.

const APP_EVENTS_URL =
  "https://scn2a-krispierce.app.n8n.cloud/webhook/caregiver-course-app-events";

async function post(payload) {
  const res = await fetch(APP_EVENTS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("app event rejected");
  return res.json();
}

// Called when a caregiver starts their plan having opted in with an email.
// Resolves to { participantId, enrollmentId } (kept in app state so the
// week-8 event can reference the same records), or null on any failure.
export async function sendEnrolled({ name, email, scores }) {
  try {
    const data = await post({ event: "enrolled", name, email, scores });
    return data && data.participantId
      ? { participantId: data.participantId, enrollmentId: data.enrollmentId }
      : null;
  } catch {
    return null;
  }
}

// Called after the week-8 reassessment for opted-in caregivers: records the
// before/after picture (anonymised in sponsor reporting) and marks the
// enrolment complete. Silently does nothing without the enrolment ids.
export function sendReassessment({ name, participantId, enrollmentId, scores }) {
  if (!participantId || !enrollmentId) return;
  post({ event: "reassessment", name, participantId, enrollmentId, scores }).catch(() => {});
}
