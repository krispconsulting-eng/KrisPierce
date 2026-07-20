// Server-only configuration. Never import from client components — this is
// only read inside API routes and getServerSideProps.
//
// Secrets resolve in this order:
//   1. Environment variables (Vercel → Project → Settings → Environment Variables)
//   2. lib/secrets.local.js — an UNTRACKED file (gitignored) that ships with
//      the deployment but never enters git. Copy lib/secrets.example.js to
//      lib/secrets.local.js and fill it in.
//
// Rotate anything by changing the env var (or local file) and redeploying.

let local = {};
try {
  // eslint-disable-next-line global-require
  local = require("./secrets.local");
} catch (e) {
  local = {};
}

module.exports = {
  PIN: process.env.KP_PIN || local.PIN || "",
  COOKIE_SECRET: process.env.KP_COOKIE_SECRET || local.COOKIE_SECRET || "",
  N8N_WEBHOOK_URL:
    process.env.KP_N8N_WEBHOOK_URL ||
    local.N8N_WEBHOOK_URL ||
    "https://scn2a-krispierce.app.n8n.cloud/webhook/kp-todo-api",
  N8N_API_KEY: process.env.KP_N8N_API_KEY || local.N8N_API_KEY || "",
};
