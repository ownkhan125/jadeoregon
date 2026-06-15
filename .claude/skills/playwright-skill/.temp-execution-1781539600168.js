const { chromium } = require('playwright');
const BASE = 'http://localhost:3003';
const viewports = [
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'tablet-1024', width: 1024, height: 900 },
  { name: 'tablet-900',  width: 900, height: 1180 },
  { name: 'tablet-820',  width: 820, height: 1180 },
  { name: 'tablet-767',  width: 767, height: 1024 },
  { name: 'mobile-390',  width: 390, height: 844 },
];
const SLUGS = ['feed-06-awareness-abstract', 'story-04-event-vertical'];
(async () => {
  const browser = await chromium.launch({ headless: false });
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push('console.error: ' + msg.text());
  });
  for (const slug of SLUGS) {
    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(BASE + '/social-media-posts/' + slug, { waitUntil: 'domcontentloaded' });
      await page.waitForLoadState('networkidle', { timeout: 12000 }).catch(() => {});
      await page.waitForTimeout(1000);
      const info = await page.evaluate(() => {
        const ifr = document.querySelector('iframe');
        const r = ifr ? ifr.getBoundingClientRect() : null;
        return { iframeW: r ? Math.round(r.width) : null, iframeH: r ? Math.round(r.height) : null, docW: document.documentElement.scrollWidth, winW: window.innerWidth };
      });
      console.log(slug + ' @ ' + vp.name + ': iframe=' + info.iframeW + 'x' + info.iframeH + ' overflow=' + (info.docW > info.winW));
      await page.screenshot({ path: '/tmp/detail-v2-' + slug + '-' + vp.name + '.png', fullPage: true });
    }
  }
  console.log('\nKeyboard nav test (desktop)');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(BASE + '/social-media-posts/feed-01-quote', { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {});
  await page.waitForTimeout(800);
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(800);
  const url = page.url();
  console.log('After ArrowRight: ' + url);
  console.log('\nErrors:', errors.length === 0 ? 'none' : errors);
  await browser.close();
})();
