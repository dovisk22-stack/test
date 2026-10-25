# HOLLOW//30 — v4.4 beta launch branch

This branch deploys DovyStudio's provided HOLLOW//30 v4.4-beta game to Render using `scripts/build-release.sh`.

The build downloads a fixed, checksum-verified source release archive, unpacks the Node.js, Three.js, WebSocket game, and installs production dependencies with Node.js 24+. All original artwork and mobile HUD assets are bundled, but no guest database is bundled.

Smoke endpoint: `/api/health` should return JSON with `version: "4.4.0-beta"` and `status: "ok"`.

Unit regression suite: 57/57 tests passed after correcting four obsolete PWA cache-version assertions. Browser interaction suite could not run due to absent Playwright Chromium.

This initial free-plan deployment does not have a persistent disk. Its SQLite account/save data is ephemeral and may be lost on restart or redeploy. Move to durable storage before a production launch. The original Render services and `iinvuce/hollow-30` repository were left unchanged.
