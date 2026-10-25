#!/usr/bin/env bash
set -euo pipefail
# HOLLOW//30 v4.4 beta — Blackwood cinematic loading screen release.
# Verified user-provided source snapshot. Rollback by restoring the previous script commit.
RELEASE_URL="https://d2ol7oe51mr4n9.cloudfront.net/user_3L16t1gAiY47M16CGgL8zbB7hws/7787ca62-a249-427d-b4ec-91757bcaa199.gz"
RELEASE_SHA256="7ec997f71efc9c099befcadf6d7bf940b66744ffaae84251065a5b64eddceb61"
echo "Fetching HOLLOW//30 Blackwood loading screen release"
curl --fail --location --silent --show-error --retry 4 --max-time 120 "$RELEASE_URL" -o /tmp/hollow30-release.tar.gz
echo "$RELEASE_SHA256  /tmp/hollow30-release.tar.gz" | sha256sum --check --
tar -xzf /tmp/hollow30-release.tar.gz
rm -f /tmp/hollow30-release.tar.gz
test -s assets/ui/loading-blackwood-screen.png
npm ci --omit=dev --no-audit --no-fund
echo "HOLLOW//30 Blackwood loading screen build installed"
