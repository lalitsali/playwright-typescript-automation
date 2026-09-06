import { test, expect } from "@playwright/test";
import { productsPage } from "../pages/productsPage";
import { cartPage } from "../pages/cartPage";
import { checkoutData } from "../test-data/checkoutData";
import { checkoutPage } from "../pages/checkoutPage";

test.describe("Cart Page Test", () => {

    let productPageObj: productsPage;
    let cartPageObj: cartPage;
    let checkoutObj: checkoutPage;

    test.beforeEach(async ({ page }) => {

        productPageObj = new productsPage(page);
        cartPageObj = new cartPage(page);
        checkoutObj = new checkoutPage(page);

        // Authentication is already handled by globalSetup
        await page.goto("/inventory.html");

        // Add product and open cart
        await productPageObj.addFisrtProductToCart();
        await productPageObj.clickOnCartLink();
    });

    test("validate checkout page UI and elements", async ({ page }) => {

        await cartPageObj.checkout();

        await expect(page).toHaveURL(
            "https://www.saucedemo.com/checkout-step-one.html"
        );

        const ui = await checkoutObj.getCheckoutElement();

        await expect(ui.cartPageTitle).toBeVisible();
        await expect(ui.continueBtn).toBeVisible();
        await expect(ui.cancelBtn).toBeVisible();
    });

    test("validate cancel button functionality", async ({ page }) => {

        await cartPageObj.checkout();

        await checkoutObj.cancelButton();

        await expect(page).toHaveURL(
            "https://www.saucedemo.com/cart.html"
        );
    });

    test("validate continue button functionality", async ({ page }) => {

        await cartPageObj.checkout();

        await checkoutObj.fillCheckOutDetails(
            checkoutData.firstName,
            checkoutData.lastname,
            checkoutData.postCode
        );

        await checkoutObj.continueButton();

        await expect(page).toHaveURL(
            "https://www.saucedemo.com/checkout-step-two.html"
        );
    });

    test("validate error when clicking on continue button with no data", async ({ page }) => {

        await cartPageObj.checkout();

        await checkoutObj.continueButton();

        const error = await checkoutObj.ErrorMessages();

        expect(error?.trim()).toBe(
            "Error: First Name is required"
        );
    });
});

