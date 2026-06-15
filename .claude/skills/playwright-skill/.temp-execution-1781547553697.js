// Verify full-view modal close behavior across desktop / tablet / mobile.
//
// The Next.js dev overlay button sits in the bottom-left corner of the
// viewport in dev mode, so backdrop clicks must avoid that area.
const { chromium } = require('playwright');

const TARGET_URL = 'http://localhost:3003';

const VIEWPORTS = [
  { name: 'desktop', width: 1280, height: 800 },
  { name: 'tablet',  width: 768,  height: 1024 },
  { name: 'mobile',  width: 390,  height: 844 },
];

async function waitForDialogGone(page) {
  try {
    await page.waitForSelector('[role="dialog"]', { state: 'detached', timeout: 3000 });
    return true;
  } catch {
    return !(await page.locator('[role="dialog"]').isVisible().catch(() => false));
  }
}

async function openModal(page) {
  const trigger = page.getByRole('button', { name: /open full view/i });
  await trigger.waitFor({ state: 'attached', timeout: 8000 });
  // Scroll button into view (it's in the meta column, may be below the fold
  // on tablet/mobile where the creative renders first).
  await trigger.scrollIntoViewIfNeeded();
  await trigger.click();
  await page.waitForSelector('[role="dialog"]', { state: 'visible', timeout: 3000 });
  // Wait for the framer-motion enter animation to settle.
  await page.waitForTimeout(450);
}

async function runChecks(page, viewport) {
  const results = {};

  // (a) X close button
  await openModal(page);
  await page.screenshot({ path: `/tmp/modal-open-${viewport.name}.png` });
  await page.getByRole('button', { name: /close full view/i }).click();
  results.x = await waitForDialogGone(page);
  await page.screenshot({ path: `/tmp/after-x-${viewport.name}.png` });

  // (b) Backdrop click — click TOP-CENTER area of the dialog, well above the
  // centered post card and away from the close button (top-right) and Next.js
  // dev overlay (bottom-left).
  await openModal(page);
  const box = await page.locator('[role="dialog"]').boundingBox();
  // y = 20px from top: above the centered card in every viewport.
  // x = 30% from left: well left of the close button and right of the info span.
  await page.mouse.click(box.x + box.width * 0.3, box.y + 20);
  results.backdrop = await waitForDialogGone(page);
  await page.screenshot({ path: `/tmp/after-backdrop-${viewport.name}.png` });

  // (c) Escape key
  await openModal(page);
  await page.keyboard.press('Escape');
  results.escape = await waitForDialogGone(page);

  // (d) Click on the post content should NOT close the modal.
  await openModal(page);
  const dialogBox = await page.locator('[role="dialog"]').boundingBox();
  await page.mouse.click(dialogBox.x + dialogBox.width / 2, dialogBox.y + dialogBox.height / 2);
  await page.waitForTimeout(400);
  results.contentClickKeepsOpen = await page.locator('[role="dialog"]').isVisible().catch(() => false);
  // Clean up
  await page.keyboard.press('Escape');
  await page.waitForTimeout(450);

  return results;
}

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 30 });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Find a real post slug from the gallery.
  await page.goto(`${TARGET_URL}/social-media-posts`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('a[href^="/social-media-posts/"]', { timeout: 8000 });
  const firstHref = await page.locator('a[href^="/social-media-posts/"]').first().getAttribute('href');
  console.log('Using post URL:', firstHref);

  const allResults = {};

  for (const viewport of VIEWPORTS) {
    console.log(`\n=== Viewport: ${viewport.name} (${viewport.width}x${viewport.height}) ===`);
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto(`${TARGET_URL}${firstHref}`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(800);
    try {
      const r = await runChecks(page, viewport);
      allResults[viewport.name] = r;
      console.log(`  X button       : ${r.x ? 'PASS' : 'FAIL'}`);
      console.log(`  Backdrop click : ${r.backdrop ? 'PASS' : 'FAIL'}`);
      console.log(`  Escape key     : ${r.escape ? 'PASS' : 'FAIL'}`);
      console.log(`  Content keeps modal open: ${r.contentClickKeepsOpen ? 'PASS' : 'FAIL'}`);
    } catch (e) {
      console.log('  ERROR during checks:', e.message);
      allResults[viewport.name] = { error: e.message };
    }
  }

  console.log('\n===== SUMMARY =====');
  console.log(JSON.stringify(allResults, null, 2));

  await browser.close();
})();
