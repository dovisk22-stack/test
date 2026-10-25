#!/usr/bin/env bash
set -euo pipefail
# HOLLOW//30 v4.4 beta — Blackwood cinematic loading screen with approved PNG asset route.
# Verified source snapshot. Roll back by restoring an earlier build-release.sh commit.
RELEASE_URL="https://d2ol7oe51mr4n9.cloudfront.net/user_3L16t1gAiY47M16CGgL8zbB7hws/eeecb2b8-fee5-4ac8-bffd-a9d42fb9b703.gz"
RELEASE_SHA256="0879c4dfaea750a3a07cc3c54d8fcbad2aa1fd4914aa7df3f3d7faa3993293c1"
echo "Fetching HOLLOW//30 Blackwood loading screen release"
curl --fail --location --silent --show-error --retry 4 --max-time 120 "$RELEASE_URL" -o /tmp/hollow30-release.tar.gz
echo "$RELEASE_SHA256  /tmp/hollow30-release.tar.gz" | sha256sum --check --
tar -xzf /tmp/hollow30-release.tar.gz
rm -f /tmp/hollow30-release.tar.gz
test -s assets/ui/loading-blackwood-screen.png
grep -q 'loading-blackwood-screen.png' server/index.js
npm ci --omit=dev --no-audit --no-fund
echo "HOLLOW//30 Blackwood loading screen with image route installed"
