// TEMPORARY diagnostic. Delete with the workflow that calls it.
//
// The shell probe reaches the optimizer on 127.0.0.1 and every request
// succeeds. Playwright reaches it on http://localhost:3000, and the first
// image request there never returns. This drives a real browser at a base URL
// given on the command line and reports what happened to each image request,
// so the two addresses can be compared directly.

import { chromium, firefox, webkit } from "playwright";

const [, , baseURL, browserName = "chromium"] = process.argv;
if (!baseURL) {
  console.error("usage: probe-image-browser.mjs <baseURL> [chromium|firefox|webkit]");
  process.exit(2);
}

const engines = { chromium, firefox, webkit };
const engine = engines[browserName];

// deviceScaleFactor 2 is what Playwright's "Desktop Safari" uses, and webkit is
// the one project that passes — so keep the scale factor tied to the engine to
// reproduce the widths each project actually asks for.
const deviceScaleFactor = browserName === "webkit" ? 2 : 1;

const browser = await engine.launch();
const context = await browser.newContext({
  deviceScaleFactor,
  viewport: { height: 720, width: 1280 },
});
const page = await context.newPage();

const started = new Map();
const results = [];
const short = (url) => decodeURIComponent(url).split("/screenshots/")[1] ?? url;

page.on("request", (req) => {
  if (req.url().includes("/_next/image")) started.set(req, Date.now());
});
page.on("response", async (res) => {
  const req = res.request();
  if (!started.has(req)) return;
  results.push({
    ms: Date.now() - started.get(req),
    status: res.status(),
    type: (await res.headerValue("content-type")) ?? "",
    url: short(req.url()),
  });
});
page.on("requestfailed", (req) => {
  if (!started.has(req)) return;
  results.push({
    ms: Date.now() - started.get(req),
    status: "FAILED " + (req.failure()?.errorText ?? ""),
    type: "",
    url: short(req.url()),
  });
});

console.log(`\n--- ${browserName} @ ${baseURL} (dsf ${deviceScaleFactor}) ---`);

const t0 = Date.now();
await page.goto(`${baseURL}/pro`, { waitUntil: "domcontentloaded" });
console.log(`  page loaded in ${Date.now() - t0}ms`);

for (const section of ["#database", "#dashboard", "#internationalization"]) {
  const figure = page.locator(section).locator("figure");
  // A missing figure means we are on the wrong page, not that the image is
  // slow — say so instead of dying with a 30s locator timeout.
  try {
    await figure.scrollIntoViewIfNeeded({ timeout: 5000 });
  } catch {
    console.log(`  ${section.padEnd(22)} NO FIGURE ON PAGE (wrong server? title=${await page.title()})`);
    continue;
  }
  const image = figure.locator("img");
  const t = Date.now();
  let width = 0;
  // Same 5s budget the failing assertion uses.
  while (Date.now() - t < 5000) {
    width = await image.evaluate((img) => img.naturalWidth).catch(() => 0);
    if (width > 0) break;
    await page.waitForTimeout(100);
  }
  console.log(
    `  ${section.padEnd(22)} naturalWidth=${String(width).padEnd(6)} after ${Date.now() - t}ms ${width > 0 ? "OK" : "<-- STUCK"}`,
  );
}

// Give anything still in flight a moment to resolve before reporting.
await page.waitForTimeout(1000);

console.log("  image requests:");
if (results.length === 0) console.log("    (none recorded)");
for (const r of results) {
  console.log(`    ${String(r.ms).padStart(6)}ms  ${String(r.status).padEnd(24)} ${r.type.padEnd(12)} ${r.url}`);
}
const pending = [...started.keys()].filter(
  (req) => !results.some((r) => r.url === short(req.url())),
);
for (const req of pending) {
  console.log(`    ${"pending".padStart(6)}     NO RESPONSE EVER         ${" ".repeat(12)} ${short(req.url())}`);
}

await browser.close();
