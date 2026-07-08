#!/bin/bash
set -e

cd "$(dirname "$0")"

export PATH="$PWD/node_modules/node/bin:$PWD/node_modules/.bin:/Applications/Codex.app/Contents/Resources/cua_node/bin:$PATH"
export PORT="${PORT:-3000}"
export HOSTNAME="${HOSTNAME:-127.0.0.1}"

echo "Ethny Email Dashboard"
echo "Local URL: http://localhost:${PORT}/email"
echo ""
echo "Keep this window open while testing."
echo ""

if [ ! -x "$PWD/node_modules/node/bin/node" ]; then
  echo "Node local introuvable."
  echo "Lance d'abord : npm install"
  read -r -p "Appuie sur Entree pour fermer..."
  exit 1
fi

if [ ! -f "$PWD/node_modules/next/dist/bin/next" ]; then
  echo "Next introuvable."
  echo "Lance d'abord : npm install"
  read -r -p "Appuie sur Entree pour fermer..."
  exit 1
fi

(
  sleep 4
  open "http://localhost:${PORT}/email" >/dev/null 2>&1 || true
) &

"$PWD/node_modules/node/bin/node" "$PWD/node_modules/next/dist/bin/next" dev -H "$HOSTNAME" -p "$PORT"
