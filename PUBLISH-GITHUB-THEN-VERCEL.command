#!/bin/bash
set -e

cd "$(dirname "$0")"

echo "Step 1/2 - Publish Ethny Email Dashboard to GitHub"
echo ""
bash scripts/publish-to-github.sh

echo ""
echo "Step 2/2 - Open Vercel project import"
echo ""
echo "Use these settings:"
echo "Project Name: ethny-email-dashboard"
echo "Framework Preset: Next.js"
echo "Root Directory: ./"
echo "Build Command: npm run next:build"
echo "Install Command: npm install"
echo ""

open "https://vercel.com/new/import?repository-url=https://github.com/ethnyfusion/ethny-operating-system" >/dev/null 2>&1 || true

read -r -p "Press Enter to close..."
