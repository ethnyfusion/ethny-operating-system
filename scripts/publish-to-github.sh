#!/bin/bash
set -euo pipefail

REPO_URL="${REPO_URL:-https://github.com/ethnyfusion/ethny-operating-system.git}"
BRANCH="${BRANCH:-main}"
COMMIT_MESSAGE="${COMMIT_MESSAGE:-Prepare Ethny Email Dashboard for Vercel}"
PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
WORKDIR="$PROJECT_ROOT/.github-sync"
CLONE_DIR="$WORKDIR/ethny-operating-system"

echo "Ethny Email Dashboard -> GitHub"
echo "Repo: $REPO_URL"
echo "Branch: $BRANCH"
echo ""
echo "Secrets and local build folders are excluded."
echo ""
read -r -p "Type PUSH to publish to GitHub: " CONFIRMATION

if [ "$CONFIRMATION" != "PUSH" ]; then
  echo "Cancelled."
  exit 1
fi

mkdir -p "$WORKDIR"

if [ ! -d "$CLONE_DIR/.git" ]; then
  git clone --branch "$BRANCH" "$REPO_URL" "$CLONE_DIR"
else
  git -C "$CLONE_DIR" fetch origin "$BRANCH"
  git -C "$CLONE_DIR" checkout "$BRANCH"
  git -C "$CLONE_DIR" pull --ff-only origin "$BRANCH"
fi

rsync -a \
  --exclude ".git" \
  --exclude ".github-sync" \
  --include ".env.example" \
  --exclude ".env" \
  --exclude ".env.*" \
  --exclude ".admin-secret.local" \
  --exclude "ADMIN_SECRET.local.txt" \
  --exclude "admin-login-local.html" \
  --exclude "node_modules" \
  --exclude ".next" \
  --exclude "dist" \
  --exclude ".react-email" \
  --exclude ".DS_Store" \
  "$PROJECT_ROOT/" "$CLONE_DIR/"

git -C "$CLONE_DIR" status --short

if git -C "$CLONE_DIR" diff --quiet && git -C "$CLONE_DIR" diff --cached --quiet; then
  echo "No changes to publish."
  exit 0
fi

git -C "$CLONE_DIR" add -A
git -C "$CLONE_DIR" commit -m "$COMMIT_MESSAGE"
git -C "$CLONE_DIR" push origin "$BRANCH"

echo ""
echo "Published to GitHub."
echo "Now deploy or redeploy the Vercel project ethny-email-dashboard."
