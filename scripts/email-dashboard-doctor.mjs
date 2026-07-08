import { existsSync, readFileSync } from "node:fs";
import { request } from "node:http";

const port = process.env.PORT ?? "3000";
const url = `http://127.0.0.1:${port}/email`;

function hasEnvValue(key) {
  if (!existsSync(".env.local")) {
    return false;
  }

  const match = readFileSync(".env.local", "utf8").match(
    new RegExp(`^${key}=(.*)$`, "m"),
  );
  return Boolean(match?.[1]?.trim().replace(/^['"]|['"]$/g, ""));
}

function checkUrl(targetUrl) {
  return new Promise((resolve) => {
    const req = request(targetUrl, { method: "HEAD", timeout: 2500 }, (res) => {
      resolve({ ok: true, statusCode: res.statusCode });
      res.resume();
    });

    req.on("timeout", () => {
      req.destroy();
      resolve({ ok: false, error: "timeout" });
    });

    req.on("error", (error) => {
      resolve({ ok: false, error: error.code ?? error.message });
    });

    req.end();
  });
}

console.log("Ethny Email Dashboard doctor");
console.log("");
console.log(".env.local:", existsSync(".env.local") ? "ok" : "missing");
console.log("ADMIN_SECRET:", hasEnvValue("ADMIN_SECRET") ? "set" : "missing");
console.log("RESEND_API_KEY:", hasEnvValue("RESEND_API_KEY") ? "set" : "missing");
console.log("NEXT_PUBLIC_SITE_URL:", hasEnvValue("NEXT_PUBLIC_SITE_URL") ? "set" : "missing");
console.log("local Node:", existsSync("node_modules/node/bin/node") ? "ok" : "missing");
console.log("Next:", existsSync("node_modules/next/dist/bin/next") ? "ok" : "missing");
console.log("");

const result = await checkUrl(url);

if (result.ok) {
  console.log(`${url}: HTTP ${result.statusCode}`);
  console.log("Dashboard reachable.");
  process.exit(0);
}

console.log(`${url}: unreachable (${result.error})`);
console.log("");
console.log("Solution:");
console.log("1. Double-clique start-email-dashboard.command");
console.log("2. Garde la fenetre Terminal ouverte");
console.log("3. Attends le message Next.js Ready");
console.log(`4. Ouvre http://localhost:${port}/email`);
process.exit(1);
