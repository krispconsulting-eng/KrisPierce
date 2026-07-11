import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await b.newPage({ viewport: { width: 1030, height: 1030 } });
await p.goto('file:///home/user/KrisPierce/picture-book/cover-dev/comp-v2.html');
await p.waitForTimeout(600);
for (const id of ['graze', 'advance'])
  await p.locator('#' + id).screenshot({ path: `cover-dev/comp2-${id}.png` });
await b.close(); console.log('ok');
