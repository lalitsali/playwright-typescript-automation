import { test, expect } from "@playwright/test";
import { productsPage } from "../pages/productsPage";
import { cartPage } from "../pages/cartPage";
import { checkoutData } from "../test-data/checkoutData";
import { checkoutPage } from "../pages/checkoutPage";
import { checkOutOverviewPage } from "../pages/checkOutOverviewPage";

test.describe("checkOut OverView validation", () => {

    let productPageObj: productsPage;
    let cartPageObj: cartPage;
    let chekoutObj: checkoutPage;
    let checkoutOverViewObj: checkOutOverviewPage;

    test.beforeEach(async ({ page }) => {

        productPageObj = new productsPage(page);
        cartPageObj = new cartPage(page);
        chekoutObj = new checkoutPage(page);
        checkoutOverViewObj = new checkOutOverviewPage(page);

        // Authentication is already handled by globalSetup
        await page.goto("/inventory.html");

        await productPageObj.addSpecificProductToCart();

        await productPageObj.clickOnCartLink();

        await cartPageObj.checkout();

        await chekoutObj.fillCheckOutDetails(
            checkoutData.firstName,
            checkoutData.lastname,
            checkoutData.postCode
        );

        await chekoutObj.continueButton();
    });


    test("validate checkout overview page UI and url", async ({ page }) => {

        await expect(page).toHaveURL(
            "https://www.saucedemo.com/checkout-step-two.html"
        );

        const ui =
            await checkoutOverViewObj.getCheckOutOverviewElements();

        await expect(ui.pageInfo).toBeVisible();

        await expect(ui.finish).toBeVisible();

        await expect(ui.cancelBtn).toBeVisible();
    });


    test("validate cancel button functionality", async ({ page }) => {

        await checkoutOverViewObj.clickOnCancel();

        await expect(page).toHaveURL(
            "https://www.saucedemo.com/inventory.html"
        );
    });


    test("validate item total calculation", async ({ page }) => {

        const uiTotal =
            await checkoutOverViewObj.getItemTotal();

        const productTotal =
            await checkoutOverViewObj.getOverViewproducts();

        let total = 0;

        for (const product of productTotal) {

            total += parseFloat(
                product.price.replace("$", "").trim()
            );
        }

        console.log("UI Total:", uiTotal);
        console.log("Calculated Total:", total);

        expect(total).toBe(uiTotal);
    });


    test("validate item total with tax calculation", async ({ page }) => {

        const uiTotal =
            await checkoutOverViewObj.getItemTotal();

        const productTotal =
            await checkoutOverViewObj.getOverViewproducts();

        let total = 0;

        for (const product of productTotal) {

            total += parseFloat(
                product.price.replace("$", "").trim()
            );
        }

        expect(total).toBe(uiTotal);

        const tax =
            await checkoutOverViewObj.getTax();

        const uiFullTotal =
            await checkoutOverViewObj.getTotalPrice();

        console.log("UI Total:", uiFullTotal);
        console.log("Item Total:", total);
        console.log("Tax:", tax);
        console.log("Sum:", total + tax);

        expect(total + tax).toBe(uiFullTotal);
    });

});