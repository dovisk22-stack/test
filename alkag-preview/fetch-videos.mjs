/**
 * Build-time ALKAG video import.
 * Public videos are fetched once during the static-site build and served
 * from Render's CDN, never directly streamed from Instagram in the browser.
 * No runtime API key or client-side scraper.
 */
import fs from "node:fs";
import { mkdir, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";

const sources = [
  { id: "DfDB9s5Chxu", type: "Solar battery and inverter installation in progress" },
  { id: "De_mqQqiJ9Y", type: "FuseBox consumer unit replacement" },
  { id: "De2Gaiul9aM", type: "Ohme Home Pro EV charger installation" },
  { id: "DezeabAE1u0", type: "Dimplex Quantum storage heater upgrade" },
  { id: "DersibziflJ", type: "Home EV charger installation" },
  { id: "DekGa9UCBoy", type: "Solar PV and Sigenergy battery install" }
];
const root = path.resolve("media-public/videos");
await mkdir(root, { recursive: true });

async function download(uri, file, allowedMime) {
  const res = await fetch(uri, {
    headers: { "user-agent": "Mozilla/5.0 (X11; Linux x86_64) Chrome/131.0.0.0 Safari/537.36", "referer": "https://www.instagram.com/" },
    signal: AbortSignal.timeout(90000)
  });
  const mime = res.headers.get("content-type") || "";
  if (!res.ok || !mime.includes(allowedMime)) throw new Error(`Download failed for ${file}: ${res.status} (${mime})`);
  if (!res.body) throw new Error("Missing response body");
  await pipeline(Readable.fromWeb(res.body), fs.createWriteStream(file));
  const size = (await stat(file)).size;
  if (size < 20000) throw new Error(`Media file too small: ${file}`);
  console.log(`Saved ${path.basename(file)}: ${Math.round(size / 1024)} KiB`);
}

async function fetchOne(post) {
  const reel = `https://www.instagram.com/alkag_electrical_ltd/reel/${post.id}/`;
  let info;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(`https://igdl.app/api/resolve/?u=${encodeURIComponent(reel)}`, {
        headers: { "user-agent": "Mozilla/5.0", "accept": "application/json" },
        signal: AbortSignal.timeout(40000)
      });
      if (!response.ok) throw new Error(`Resolver HTTP ${response.status}`);
      info = await response.json();
      if (info.author?.username !== "alkag_electrical_ltd") throw new Error(`Unexpected owner for ${post.id}`);
      if (!info.items?.[0]?.url || info.items[0].kind !== "video") throw new Error(`No MP4 returned for ${post.id}`);
      break;
    } catch (err) {
      if (attempt === 2) throw err;
      await new Promise(resolve => setTimeout(resolve, (attempt + 1) * 1800));
    }
  }
  const item = info.items[0];
  await download(item.url, path.join(root, post.id + ".mp4"), "video/mp4");
  const bytes = fs.readFileSync(path.join(root, post.id + ".mp4"));
  if (bytes.toString("ascii", 4, 8) !== "ftyp") throw new Error(`Not an MP4 container: ${post.id}`);
  if (item.thumbnail) {
    try { await download(item.thumbnail, path.join(root, post.id + ".jpg"), "image/"); }
    catch (err) { console.warn("Poster unavailable for", post.id, String(err)); }
  }
  return { ...post, description: (info.caption || "").slice(0, 240), date: info.takenAt || null };
}

const jobs = [];
for (const post of sources) {
  console.log("Fetching verified ALKAG reel", post.id);
  jobs.push(await fetchOne(post));
}
await writeFile(path.resolve("media-public/jobs.json"), JSON.stringify(jobs, null, 2));
console.log(`Downloaded ${jobs.length} genuine ALKAG project MP4s for Render CDN.`);
