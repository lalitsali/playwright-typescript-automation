const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://testautomationpractice.blogspot.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });

  console.log('title=', await page.title());
  const btn = page.locator('#alertBtn');
  console.log('visible=', await btn.isVisible());
  console.log('enabled=', await btn.isEnabled());

  page.on('dialog', async (dialog) => {
    console.log('dialog type=', dialog.type());
    console.log('dialog message=', dialog.message());
    await dialog.accept();
  });

  await btn.click();
  console.log('after click');
  await page.waitForTimeout(1000);
  await browser.close();
})();
