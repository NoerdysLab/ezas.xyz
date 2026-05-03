// Optional Cloudflare Worker backend for the Fat Cat Naming Society.
//
// Quick deploy:
//   1) npm i -g wrangler
//   2) wrangler kv:namespace create FATCATS
//   3) Add to wrangler.toml:
//        name = "fatcats-api"
//        main = "worker.js"
//        compatibility_date = "2025-05-01"
//        [[kv_namespaces]]
//        binding = "FATCATS"
//        id = "<id-from-step-2>"
//   4) wrangler deploy
//   5) In the static site, set:  window.FATCATS_API = "https://fatcats-api.<your>.workers.dev";
//      (e.g. inline before app.js loads)
//
// Endpoints:
//   GET  /api/cats             → { cats: [...] }
//   POST /api/vote             → body { catId, name }
//   POST /api/submit           → body { catId, name }
//
// Storage:
//   Single key "state" holds the same shape as localStorage.

const PROFANITY = ["fuck", "shit", "bitch", "asshole", "cunt", "nigger", "faggot", "retard"];

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const RATE = { window: 60_000, max: 30 };

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...CORS },
  });
}

function validateName(name) {
  if (typeof name !== "string") return "invalid";
  const t = name.trim();
  if (t.length < 2 || t.length > 48) return "length";
  const lower = t.toLowerCase();
  for (const w of PROFANITY) if (lower.includes(w)) return "profanity";
  if (/(.)\1{4,}/.test(t)) return "spam";
  return null;
}

async function loadState(env) {
  const raw = await env.FATCATS.get("state");
  if (raw) return JSON.parse(raw);
  return { cats: [], interactions: {} };
}
async function saveState(env, state) {
  await env.FATCATS.put("state", JSON.stringify(state));
}

async function rateLimit(env, ip) {
  const key = `rl:${ip}`;
  const now = Date.now();
  const raw = await env.FATCATS.get(key);
  let bucket = raw ? JSON.parse(raw) : { count: 0, start: now };
  if (now - bucket.start > RATE.window) bucket = { count: 0, start: now };
  bucket.count += 1;
  await env.FATCATS.put(key, JSON.stringify(bucket), { expirationTtl: 120 });
  return bucket.count <= RATE.max;
}

export default {
  async fetch(req, env) {
    if (req.method === "OPTIONS") return new Response(null, { headers: CORS });

    const url = new URL(req.url);
    const ip = req.headers.get("CF-Connecting-IP") || "anon";

    if (req.method === "GET" && url.pathname === "/api/cats") {
      const state = await loadState(env);
      return json({ cats: state.cats });
    }

    if (req.method === "POST" && url.pathname === "/api/vote") {
      if (!(await rateLimit(env, ip))) return json({ error: "rate_limited" }, 429);
      const body = await req.json().catch(() => ({}));
      const { catId, name } = body;
      const state = await loadState(env);
      const cat = state.cats.find(c => c.id === catId);
      if (!cat) return json({ error: "not_found" }, 404);
      const entry = cat.names.find(n => n[0] === name);
      if (!entry) return json({ error: "name_not_found" }, 404);
      entry[1] += 1;
      await saveState(env, state);
      return json({ ok: true });
    }

    if (req.method === "POST" && url.pathname === "/api/submit") {
      if (!(await rateLimit(env, ip))) return json({ error: "rate_limited" }, 429);
      const body = await req.json().catch(() => ({}));
      const { catId, name } = body;
      const err = validateName(name);
      if (err) return json({ error: err }, 400);
      const trimmed = name.trim();
      const state = await loadState(env);
      const cat = state.cats.find(c => c.id === catId);
      if (!cat) return json({ error: "not_found" }, 404);
      const existing = cat.names.find(n => n[0].toLowerCase() === trimmed.toLowerCase());
      if (existing) existing[1] += 1;
      else cat.names.push([trimmed, 1]);
      await saveState(env, state);
      return json({ ok: true });
    }

    return json({ error: "not_found" }, 404);
  },
};
