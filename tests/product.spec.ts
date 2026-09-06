import { test, expect } from "@playwright/test";
import { productsPage } from "../pages/productsPage";
import { loginLocators } from "../locators/loginLocator";
import { productsLocators } from "../locators/productLocator";

test.describe("Products Page Test", () => {

    test("validate logout functionality", async ({ page }) => {
       await page.goto("https://www.saucedemo.com/inventory.html");
        const productsPageObj = new productsPage(page);

        await productsPageObj.logOut();

        await expect(
            page.locator(loginLocators.loginButton)
        ).toBeVisible();
    });


    test("validate about and navigate back", async ({ page }) => {
       await page.goto("https://www.saucedemo.com/inventory.html");

        const productsPageObj = new productsPage(page);

        await productsPageObj.openAboutPage();

        await expect(
            page.locator(productsLocators.aboutPageHeading)
        ).toBeVisible();

        await page.goBack();

        await expect(
            page.locator(productsLocators.settingsButton)
        ).toBeVisible();
    });


    test("validate all products are displayed", async ({ page }) => {
       await page.goto("https://www.saucedemo.com/inventory.html");

        const productsPageObj = new productsPage(page);

        await productsPageObj.validateAllProductDisplayed();

        // Add first product
        // await productsPageObj.addFisrtProductToCart();

        await productsPageObj.addAllProductToCart();

        await productsPageObj.removeSpecificProductFromCart();
    });


    test("validate specific products are added to cart", async ({ page }) => {
       await page.goto("https://www.saucedemo.com/inventory.html");

        const productsPageObj = new productsPage(page);

        await productsPageObj.addSpecificProductToCart();

        await productsPageObj.removeSpecificProductFromCart();
    });


    test("validate filter by name A to Z", async ({ page }) => {
       await page.goto("https://www.saucedemo.com/inventory.html");

        const productsPageObj = new productsPage(page);

        await productsPageObj.filterByNameAtoZ();
    });


    test("validate filter by name Z to A", async ({ page }) => {
       await page.goto("https://www.saucedemo.com/inventory.html");

        const productsPageObj = new productsPage(page);

        await productsPageObj.filterByNameZtoA();
    });


    test("validate filter by price Low to High", async ({ page }) => {
       await page.goto("https://www.saucedemo.com/inventory.html");

        const productsPageObj = new productsPage(page);

        await productsPageObj.filterByPriceLowtoHigh();
    });


    test("validate filter by price High to Low", async ({ page }) => {
       await page.goto("https://www.saucedemo.com/inventory.html");

        const productsPageObj = new productsPage(page);

        await productsPageObj.filterPriceHighToLow();
    });

});