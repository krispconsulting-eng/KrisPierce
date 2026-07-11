import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await b.newPage({ viewport: { width: 1030, height: 1030 } });
await p.goto('file:///home/user/KrisPierce/picture-book/cover-dev/comp-v3.html');
await p.waitForTimeout(600);
for (const id of ['duskA', 'coralC'])
  await p.locator('#' + id).screenshot({ path: `cover-dev/comp3-${id}.png` });
await b.close(); console.log('ok');
