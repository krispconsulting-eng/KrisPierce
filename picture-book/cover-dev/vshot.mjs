import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await b.newPage({ viewport: { width: 1020, height: 1020 } });
await p.goto('file:///home/user/KrisPierce/picture-book/cover-dev/value-studies.html');
for (const id of ['v1', 'v2', 'v3'])
  await p.locator('#' + id).screenshot({ path: `cover-dev/${id}.png` });
await b.close(); console.log('ok');
