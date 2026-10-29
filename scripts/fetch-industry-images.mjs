// node scripts/fetch-industry-images.mjs  -> downloads every /wp-content/... image used by migrated industry pages into public/
import { readFile, access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
const ORIGIN = "https://marketjoy.com";
const rows = (await readFile("migration/industries-images.csv", "utf8")).split(/\r?\n/).slice(1).filter(Boolean);
let ok = 0, skip = 0; const fail = [];
const one = async (p) => {
  const dest = path.join("public", decodeURI(p));
  try { await access(dest); skip++; return; } catch {}
  try {
    const r = await fetch(ORIGIN + p);
    if (!r.ok) throw new Error(String(r.status));
    await mkdir(path.dirname(dest), { recursive: true });
    await writeFile(dest, Buffer.from(await r.arrayBuffer()));
    ok++;
  } catch (e) { fail.push(`${p} (${e.message})`); }
};
const q = [...rows];
await Promise.all(Array.from({ length: 6 }, async () => { while (q.length) await one(q.shift()); }));
console.log(`downloaded ${ok}, already there ${skip}, failed ${fail.length}`);
if (fail.length) { await writeFile("migration/industries-images-failed.txt", fail.join("\n")); console.log("see migration/industries-images-failed.txt"); }
