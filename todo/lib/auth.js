const crypto = require("crypto");
const config = require("./config");

const COOKIE_NAME = "kp_auth";

function token() {
  return crypto
    .createHmac("sha256", config.COOKIE_SECRET)
    .update("kp-todo-authorised")
    .digest("hex");
}

function parseCookies(req) {
  const header = req.headers.cookie || "";
  const out = {};
  header.split(";").forEach((part) => {
    const idx = part.indexOf("=");
    if (idx > -1) out[part.slice(0, idx).trim()] = part.slice(idx + 1).trim();
  });
  return out;
}

function isAuthed(req) {
  // Fail closed if the app is deployed without its secrets.
  if (!config.COOKIE_SECRET || !config.PIN) return false;
  return parseCookies(req)[COOKIE_NAME] === token();
}

function authCookieHeader() {
  // 180 days, httpOnly, secure.
  return `${COOKIE_NAME}=${token()}; Path=/; Max-Age=15552000; HttpOnly; Secure; SameSite=Lax`;
}

function requireAuthSSR(ctx) {
  if (!isAuthed(ctx.req)) {
    return {
      redirect: { destination: "/login", permanent: false },
    };
  }
  return null;
}

module.exports = { isAuthed, authCookieHeader, requireAuthSSR, COOKIE_NAME };
