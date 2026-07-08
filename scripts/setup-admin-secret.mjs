import { copyFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const envPath = resolve(root, ".env.local");
const examplePath = resolve(root, ".env.example");

function readHidden(prompt) {
  return new Promise((resolveInput, rejectInput) => {
    if (!process.stdin.isTTY) {
      rejectInput(new Error("This command must be run in an interactive terminal."));
      return;
    }

    let value = "";

    function cleanup() {
      process.stdin.setRawMode(false);
      process.stdin.pause();
      process.stdin.off("data", onData);
    }

    function onData(chunk) {
      const key = chunk.toString("utf8");

      if (key === "\u0003") {
        cleanup();
        process.stdout.write("\nCancelled.\n");
        process.exit(130);
      }

      if (key === "\r" || key === "\n") {
        cleanup();
        process.stdout.write("\n");
        resolveInput(value);
        return;
      }

      if (key === "\u007f" || key === "\b") {
        value = value.slice(0, -1);
        return;
      }

      value += key;
    }

    process.stdout.write(prompt);
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", onData);
  });
}

function quoteEnvValue(value) {
  return `"${value.replaceAll("\\", "\\\\").replaceAll('"', '\\"')}"`;
}

function upsertEnvValue(source, key, value) {
  const lines = source.split(/\r?\n/);
  let replaced = false;
  const nextLines = lines.map((line) => {
    if (line.trimStart().startsWith(`${key}=`)) {
      if (replaced) {
        return null;
      }

      replaced = true;
      return `${key}=${quoteEnvValue(value)}`;
    }

    return line;
  }).filter((line) => line !== null);

  if (!replaced) {
    if (nextLines.length && nextLines[nextLines.length - 1] !== "") {
      nextLines.push("");
    }
    nextLines.push(`${key}=${quoteEnvValue(value)}`);
  }

  return `${nextLines.join("\n").replace(/\n+$/, "")}\n`;
}

if (!existsSync(envPath)) {
  if (existsSync(examplePath)) {
    copyFileSync(examplePath, envPath);
  } else {
    writeFileSync(envPath, "", { mode: 0o600 });
  }
}

const secret = await readHidden("Nouveau ADMIN_SECRET: ");
const confirmation = await readHidden("Confirmer ADMIN_SECRET: ");

if (secret !== confirmation) {
  console.error("Les deux valeurs ne correspondent pas. Rien n'a ete modifie.");
  process.exit(1);
}

if (secret.length < 12) {
  console.error("Choisis un secret d'au moins 12 caracteres. Rien n'a ete modifie.");
  process.exit(1);
}

if (secret.includes("\n") || secret.includes("\r")) {
  console.error("Le secret ne doit pas contenir de retour a la ligne.");
  process.exit(1);
}

const currentEnv = readFileSync(envPath, "utf8");
writeFileSync(envPath, upsertEnvValue(currentEnv, "ADMIN_SECRET", secret), {
  mode: 0o600,
});

console.log("ADMIN_SECRET mis a jour dans .env.local.");
console.log("Redemarre npm run next:dev, puis reconnecte-toi sur /email.");
