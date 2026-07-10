// Screenshot spreads from render.html.
// usage: node shot.mjs [sceneName ...]   (no args = every scene found)
// writes shots/<scene>.png ; add GUIDES=0 env to hide gutter overlay.
import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const here = dirname(fileURLToPath(import.meta.url));
mkdirSync(join(here, 'shots'), { recursive: true });
const guides = process.env.GUIDES === '0' ? '&guides=0' : '';

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium' })
  .catch(() => chromium.launch());
const page = await browser.newPage({ viewport: { width: 1620, height: 830 } });

const want = process.argv.slice(2);
await page.goto('file://' + join(here, 'render.html') + '?x=1' + guides);
const all = await page.evaluate(() => Object.keys(window.Scenes || {}));
const names = want.length ? want : all;

for (const n of names) {
  await page.goto('file://' + join(here, 'render.html') + `?scene=${n}${guides}`);
  const el = page.locator('#frame-' + n);
  if (await el.count() === 0) { console.error('no scene:', n); continue; }
  await el.screenshot({ path: join(here, 'shots', `${n}.png`) });
  console.log('shot:', n);
}
await browser.close();
