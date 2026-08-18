const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://testautomationpractice.blogspot.com/', { waitUntil: 'domcontentloaded' });

  const simpleButton = page.locator('#alertBtn');
  const confirmButton = page.locator('#confirmBtn');
  const promptButton = page.locator('#promptBtn');
  const popupButton = page.locator('#PopUp');

  console.log('simple visible=', await simpleButton.isVisible());
  console.log('confirm visible=', await confirmButton.isVisible());
  console.log('prompt visible=', await promptButton.isVisible());
  console.log('popup visible=', await popupButton.isVisible());

  page.on('dialog', async (dialog) => {
    console.log('dialog type=', dialog.type());
    console.log('dialog message=', dialog.message());
    if (dialog.type() === 'alert') await dialog.accept();
    if (dialog.type() === 'confirm') await dialog.accept();
    if (dialog.type() === 'prompt') await dialog.accept('Automation User');
  });

  await simpleButton.click();
  await confirmButton.click();
  console.log('confirm result=', await page.locator('#demo').textContent());
  await promptButton.click();
  console.log('prompt result=', await page.locator('#demo').textContent());

  const [popupPage] = await Promise.all([
    page.waitForEvent('popup'),
    popupButton.click()
  ]);
  console.log('popup url=', popupPage.url());

  await browser.close();
  console.log('ALL CHECKS PASSED');
})();
