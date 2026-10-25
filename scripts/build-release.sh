#!/usr/bin/env bash
set -euo pipefail
# HOLLOW//30 release 4.4.0-beta from the user-supplied source archive.
RELEASE_URL="https://d2ol7oe51mr4n9.cloudfront.net/user_3L16t1gAiY47M16CGgL8zbB7hws/0b2c10b9-b85b-4ea3-a08d-a3db9f7941b0.gz"
RELEASE_SHA256="e2511f1ef601d6eef686740d786b54dc392684672a05cb9ed6f173751913eb78"
echo "Fetching HOLLOW//30 4.4 release archive"
curl --fail --location --silent --show-error --retry 4 --max-time 120 "$RELEASE_URL" -o /tmp/hollow30-release.tar.gz
echo "$RELEASE_SHA256  /tmp/hollow30-release.tar.gz" | sha256sum --check --
tar -xzf /tmp/hollow30-release.tar.gz
rm -f /tmp/hollow30-release.tar.gz
npm ci --omit=dev --no-audit --no-fund
echo "HOLLOW//30 build installed"
