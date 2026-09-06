import { chromium, FullConfig, expect } from '@playwright/test';
import { LoginPage } from './pages/loginPage';
import { USERNAME, PASSWORD } from './utils/envConfig';

async function globalSetup(config: FullConfig) {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    const loginPage = new LoginPage(page);

    await page.goto('https://www.saucedemo.com/');
    await loginPage.login(USERNAME, PASSWORD);

    await expect(page).toHaveURL(
        'https://www.saucedemo.com/inventory.html'
    );

    await page.context().storageState({
        path: 'playwright/.auth/user.json',
    });

    await browser.close();
}

export default globalSetup;