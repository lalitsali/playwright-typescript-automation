import{test,expect} from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { BASE_URL,USERNAME,PASSWORD } from "../utils/envConfig";

test("Login with valid credentials", async ({ page }) => {
    const LoginPageObj = new LoginPage(page)
    await page.goto(BASE_URL)
    await LoginPageObj.loginPage(USERNAME,PASSWORD)
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")

});

test("Login with invalid credentials", async ({ page }) => {
    const LoginPageObj = new LoginPage(page)
    await page.goto(BASE_URL)
    await LoginPageObj.loginPage("Invalid_USERNAME","Invalid_PASSWORD")
    await LoginPageObj.verifyLoginError()
    
});