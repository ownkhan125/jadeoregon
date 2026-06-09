const { chromium } = require('playwright');
const BASE = 'http://localhost:3000';

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 60 });
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(`PE @ ${page.url()}: ${e.message}`));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(`CE @ ${page.url()}: ${m.text()}`); });

  // ── Desktop hover state ────────────────────────────────
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(BASE + '/about', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // capture default state with active pill on /about
  await page.screenshot({
    path: 'C:/Users/General/AppData/Local/Temp/nav-desktop-active.png',
    clip: { x: 0, y: 0, width: 1440, height: 130 },
  });
  console.log('saved desktop active-state');

  // hover Events
  await page.locator('nav[aria-label="Primary"] a:has-text("Events")').first().hover();
  await page.waitForTimeout(450);
  await page.screenshot({
    path: 'C:/Users/General/AppData/Local/Temp/nav-desktop-hover.png',
    clip: { x: 0, y: 0, width: 1440, height: 130 },
  });
  console.log('saved desktop hover');

  // move pointer away → pill should return to active route
  await page.mouse.move(20, 400);
  await page.waitForTimeout(450);
  await page.screenshot({
    path: 'C:/Users/General/AppData/Local/Temp/nav-desktop-restored.png',
    clip: { x: 0, y: 0, width: 1440, height: 130 },
  });
  console.log('saved desktop restored-to-active');

  // ── Mobile menu UX ─────────────────────────────────────
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);

  const hamburger = page.locator('button[aria-label="Open menu"]');
  await hamburger.click();
  await page.waitForTimeout(700);
  await page.screenshot({
    path: 'C:/Users/General/AppData/Local/Temp/nav-mobile-open.png',
    fullPage: false,
  });
  console.log('saved mobile menu open');

  // verify X button visible
  const x = page.locator('[role="dialog"] button[aria-label="Close menu"]');
  const xVisible = await x.isVisible();
  console.log(`X button visible: ${xVisible}`);

  // click X close
  await x.click();
  await page.waitForTimeout(700);
  const menuOpenAfterX = await page.locator('[role="dialog"]').count();
  console.log(`menu open after X click: ${menuOpenAfterX > 0 ? 'NO' : 'closed ✓'}`);

  // Escape key
  await hamburger.click();
  await page.waitForTimeout(500);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);
  const menuOpenAfterEsc = await page.locator('[role="dialog"]').count();
  console.log(`menu open after Escape: ${menuOpenAfterEsc > 0 ? 'NO' : 'closed ✓'}`);

  // Backdrop click
  await hamburger.click();
  await page.waitForTimeout(500);
  // click in the backdrop area (far bottom)
  await page.mouse.click(80, 780);
  await page.waitForTimeout(600);
  const menuOpenAfterBackdrop = await page.locator('[role="dialog"]').count();
  console.log(`menu open after backdrop click: ${menuOpenAfterBackdrop > 0 ? 'NO' : 'closed ✓'}`);

  // Route change close
  await hamburger.click();
  await page.waitForTimeout(500);
  await page.locator('[role="dialog"] a:has-text("Events")').first().click();
  await page.waitForURL('**/events');
  await page.waitForTimeout(500);
  const menuOpenAfterNav = await page.locator('[role="dialog"]').count();
  console.log(`menu open after route change: ${menuOpenAfterNav > 0 ? 'NO' : 'closed ✓'}`);

  // ── Tablet (820) — both nav modes should be tested ─────
  await page.setViewportSize({ width: 820, height: 1180 });
  await page.goto(BASE + '/events', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  await page.screenshot({
    path: 'C:/Users/General/AppData/Local/Temp/nav-tablet-820.png',
    clip: { x: 0, y: 0, width: 820, height: 130 },
  });

  // ── Mobile 320 too ─────────────────────────────────────
  await page.setViewportSize({ width: 320, height: 760 });
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  await page.screenshot({
    path: 'C:/Users/General/AppData/Local/Temp/nav-mobile-320.png',
    clip: { x: 0, y: 0, width: 320, height: 130 },
  });
  // open menu at 320
  await page.locator('button[aria-label="Open menu"]').click();
  await page.waitForTimeout(700);
  await page.screenshot({
    path: 'C:/Users/General/AppData/Local/Temp/nav-mobile-320-open.png',
    fullPage: false,
  });

  console.log('\n=== ERRORS ===');
  if (!errors.length) console.log('  none ✓');
  else errors.forEach((e) => console.log('  ' + e));

  await browser.close();
})();
