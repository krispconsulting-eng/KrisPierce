import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Undefined until the site owner connects a real Supabase project (see
// .env.example) — persistence.js falls back to local storage whenever this
// is null, so the app is fully usable with zero backend configured.
export const supabase = url && anonKey ? createClient(url, anonKey) : null;
