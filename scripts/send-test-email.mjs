import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname);
const envPath = resolve(root, ".env.local");
const required = [
  "RESEND_API_KEY",
  "RESEND_FROM_EMAIL",
  "RESEND_TEST_EMAIL",
  "ADMIN_SECRET",
  "NEXT_PUBLIC_SITE_URL",
];

function parseEnv(contents) {
  return Object.fromEntries(
    contents
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#") && line.includes("="))
      .map((line) => {
        const [key, ...valueParts] = line.split("=");
        const rawValue = valueParts.join("=").trim();
        return [key.trim(), rawValue.replace(/^["']|["']$/g, "")];
      }),
  );
}

function fail(message) {
  console.error(message);
  process.exit(1);
}

if (!existsSync(envPath)) {
  fail(".env.local missing. Create it from .env.example before sending a test.");
}

const env = parseEnv(await readFile(envPath, "utf8"));
const missing = required.filter((key) => !env[key]);

if (missing.length > 0) {
  fail(`Missing required env vars: ${missing.join(", ")}`);
}

if (!env.RESEND_FROM_EMAIL.includes("@ethny.be")) {
  console.warn(
    "Warning: RESEND_FROM_EMAIL does not appear to use @ethny.be. Resend may reject the send if the domain is not verified.",
  );
}

const siteUrl = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
const endpoint = `${siteUrl}/api/email/send-test`;

const payload = {
  to: env.RESEND_TEST_EMAIL,
  campaignId: "new-website-announcement",
  variables: {
    firstName: "Reginald",
    websiteLink: "https://ethny.be",
    unsubscribeLink: "https://ethny.be/unsubscribe",
  },
};

console.log(`Sending test campaign ${payload.campaignId} to RESEND_TEST_EMAIL via ${endpoint}`);

let response;
try {
  response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-admin-secret": env.ADMIN_SECRET,
    },
    body: JSON.stringify(payload),
  });
} catch (error) {
  fail(
    `Could not reach ${endpoint}. Start Next first with: npm run next:dev`,
  );
}

const text = await response.text();
let result;
try {
  result = JSON.parse(text);
} catch {
  result = { raw: text };
}

if (!response.ok || result.ok === false) {
  console.error("Email test failed.");
  console.error(JSON.stringify(result, null, 2));
  process.exit(1);
}

console.log("Email test sent.");
console.log(JSON.stringify({
  id: result.id,
  campaignId: result.campaignId,
  subject: result.subject,
}, null, 2));
