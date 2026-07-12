const config = require("../../lib/config");
const { authCookieHeader } = require("../../lib/auth");

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "method" });
  const { pin } = req.body || {};
  if (!config.PIN || !config.COOKIE_SECRET) {
    return res.status(500).json({ error: "app secrets not configured" });
  }
  if (String(pin) === config.PIN) {
    res.setHeader("Set-Cookie", authCookieHeader());
    return res.status(200).json({ ok: true });
  }
  return res.status(401).json({ error: "wrong pin" });
}
