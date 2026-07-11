import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await b.newPage({ viewport: { width: 1030, height: 1030 } });
await p.goto('file:///home/user/KrisPierce/picture-book/cover-dev/comp-v1.html');
await p.waitForTimeout(600);
for (const id of ['duskA', 'goldB', 'emberC'])
  await p.locator('#' + id).screenshot({ path: `cover-dev/comp-${id}.png` });
await b.close(); console.log('ok');
