// Copy this file to lib/secrets.local.js (which is gitignored) and fill in
// real values — or set the KP_* environment variables in Vercel instead.

module.exports = {
  PIN: "000000",
  COOKIE_SECRET: "any-long-random-string",
  N8N_WEBHOOK_URL: "https://YOUR-INSTANCE.app.n8n.cloud/webhook/kp-todo-api",
  N8N_API_KEY: "the-key-configured-in-the-KP-To-Do-API-workflow",
};
