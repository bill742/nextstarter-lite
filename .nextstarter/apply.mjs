/**
 * Turns a fresh clone of this repository into a starting point for someone
 * else's project.
 *
 * This repository is two things at once: the template people scaffold from,
 * and the live NextStarter marketing site. Everything that only makes sense
 * for the second — the sales pages, the changelog, the SEO copy, the landing
 * page itself — is listed in `manifest.json` next to this file, along with
 * replacement files under `overlays/`. Keeping that knowledge here, rather
 * than in create-nextstarter, means the template and its cleanup change in
 * the same commit, and CI (`.github/workflows/scaffold.yml`) proves every mode
 * still builds and passes its tests.
 *
 * Usage, from the project root:
 *
 *   node .nextstarter/apply.mjs <blank|full>
 *
 * - `blank` — an empty home page inside the app shell (header, footer, theme
 *   toggle, privacy notice, 404), with no NextStarter content.
 * - `full`  — the NextStarter landing page kept as example content, with the
 *   sales surface, changelog, and NextStarter's own metadata removed.
 *
 * Zero dependencies: it runs before `npm install`. It deletes `.nextstarter/`
 * when it finishes, so it can only be applied once.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.dirname(scriptDir);
const manifest = JSON.parse(
  fs.readFileSync(path.join(scriptDir, "manifest.json"), "utf8")
);

const mode = process.argv[2];

if (!Object.hasOwn(manifest.modes, mode)) {
  console.error(
    `Usage: node .nextstarter/apply.mjs <${Object.keys(manifest.modes).join("|")}>`
  );
  process.exit(1);
}

/**
 * Resolves a manifest path inside the project, refusing anything that would
 * escape it — a typo like `../src` must fail loudly, not delete a sibling.
 *
 * @param relPath - A path from the manifest, relative to the project root.
 * @returns The absolute path.
 */
const resolveInProject = (relPath) => {
  const absolute = path.resolve(projectRoot, relPath);
  if (!absolute.startsWith(projectRoot + path.sep)) {
    throw new Error(`Manifest path escapes the project: ${relPath}`);
  }
  return absolute;
};

for (const layerName of manifest.modes[mode]) {
  const layer = manifest.layers[layerName];

  const overlayDir = path.join(scriptDir, "overlays", layerName);
  if (fs.existsSync(overlayDir)) {
    fs.cpSync(overlayDir, projectRoot, { force: true, recursive: true });
  }

  for (const relPath of layer.remove) {
    fs.rmSync(resolveInProject(relPath), { force: true, recursive: true });
  }

  if (layer.removeScripts.length > 0) {
    const pkgPath = path.join(projectRoot, "package.json");
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
    for (const script of layer.removeScripts) {
      delete pkg.scripts?.[script];
    }
    fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);
  }
}

fs.rmSync(scriptDir, { force: true, recursive: true });

console.log(`Applied the "${mode}" starting point.`);
