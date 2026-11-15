// Run through vault: vault run -- node scripts/channel-init.ts
// Writes only the requested provider's key, never prints credentials.
import { randomBytes } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";

const key = process.env.OPENCODE_API_KEY;
if (!key || /[\r\n]/.test(key)) throw new Error("OPENCODE_API_KEY missing or invalid; run through vault");
const values: Record<string, string> = {
  SITE_URL: "http://localhost:3080",
  ADMIN_PASSWORD: randomBytes(18).toString("base64url"),
  SESSION_SECRET: randomBytes(32).toString("hex"),
  IMG_PROXY_SIGN_SECRET: randomBytes(32).toString("hex"),
  POSTGRES_PASSWORD: randomBytes(24).toString("hex"),
  LLM_BASE_URL: "https://opencode.ai/zen/go/v1",
  LLM_API_KEY: key,
  LLM_MODEL: "deepseek-v4.1-flash",
  LLM_EXTRA_JSON: JSON.stringify({ thinking: { type: "disabled" } }),
  COLLECT_ENABLED: "false",
  MODEL_CALLS_ENABLED: "false",
};
let text = readFileSync(".env.example", "utf8");
for (const [name, value] of Object.entries(values)) {
  text = text.replace(new RegExp(`^${name}=.*$`, "m"), () => `${name}=${value}`);
}
text += "\nPORT=127.0.0.1:3080\nCOMPOSE_PROJECT_NAME=china-us-ai-news\nAIHOT_ENVIRONMENT=local\n";
writeFileSync(".env", text, { flag: "wx", mode: 0o600 });
console.log("Local .env created; automatic collection and model calls are disabled. No credentials printed.");
