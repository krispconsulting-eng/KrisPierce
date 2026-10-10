import { supabase } from "./supabaseClient";

const STORAGE_KEY = "caregiver-wellness-wheel:v1";

export const isSupabaseEnabled = Boolean(supabase);

function readLocal() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeLocal(state) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage unavailable (private browsing, quota exceeded) - progress
    // just won't survive a reload; the in-memory session still works.
  }
}

// Loads saved progress. Tries the signed-in Supabase user's row first (when
// Supabase is configured and a session exists), then falls back to the
// local copy — which also acts as the offline/no-account experience.
export async function loadState() {
  if (supabase) {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from("wellness_state")
        .select("state")
        .eq("user_id", user.id)
        .maybeSingle();
      if (!error && data) return data.state;
    }
  }
  return readLocal();
}

// Saves progress. Always writes local storage (so the app works with no
// account), and additionally upserts to Supabase when a user is signed in.
export async function saveState(state) {
  writeLocal(state);
  if (supabase) {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from("wellness_state").upsert({
        user_id: user.id,
        state,
        updated_at: new Date().toISOString(),
      });
    }
  }
}

export async function signInWithMagicLink(email) {
  if (!supabase) throw new Error("Supabase is not configured for this deployment.");
  return supabase.auth.signInWithOtp({ email });
}

export async function signOut() {
  if (!supabase) return;
  await supabase.auth.signOut();
}

export async function getCurrentUser() {
  if (!supabase) return null;
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}
