import { chromium } from 'playwright-core';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'screenshots');
const base = 'http://127.0.0.1:5173';

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });

async function shot(name, width, height, url, isMobile = false) {
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
    isMobile,
    hasTouch: isMobile,
  });
  const page = await context.newPage();
  await page.goto(`${base}${url}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(450);
  const file = path.join(outDir, `${name}.png`);
  await page.screenshot({ path: file, fullPage: false });
  console.log('saved', file);
  await context.close();
}

await shot('profile-mobile-390x844', 390, 844, '/profile', true);
await shot('rewards-mobile-390x844', 390, 844, '/rewards', true);
await shot('profile-desktop-1440x900', 1440, 900, '/profile');
await shot('rewards-desktop-1440x900', 1440, 900, '/rewards');

await browser.close();
console.log('done');
