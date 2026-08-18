import { test, expect } from "@playwright/test";
import { productsPage } from "../pages/productsPage";
import { LoginPage } from "../pages/loginPage";
import { BASE_URL, USERNAME, PASSWORD } from "../utils/envConfig";
import { loginLocators } from "../locators/loginLocator";
import { cartPage } from "../pages/cartPage";
import { checkoutData } from "../test-data/checkoutData";
import { checkoutPage } from "../pages/checkoutPage";
import { checkoutPageLocator } from "../locators/checkoutPageLocator";
import { checkOutOverviewPage } from "../pages/checkOutOverviewPage";
import { chekOutOverviewlocator } from "../locators/checkOutOverviewLocator";

test.describe("checkOut OverView validation", () => {
  let loginPageObj: LoginPage;
  let productPageObj: productsPage;
  let cartPageObj: cartPage;
  let chekoutObj: checkoutPage;
  let checkoutOverViewObj: checkOutOverviewPage;

  test.beforeEach(async ({ page }) => {
    loginPageObj = new LoginPage(page);
    productPageObj = new productsPage(page);
    cartPageObj = new cartPage(page);
    chekoutObj = new checkoutPage(page);
    checkoutOverViewObj = new checkOutOverviewPage(page);

    await page.goto(BASE_URL);
    await loginPageObj.loginPage(USERNAME, PASSWORD);
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
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
    const ui = await checkoutOverViewObj.getCheckOutOverviewElements();
    await expect(ui.pageInfo).toBeVisible();
    await expect(ui.finish).toBeVisible();
    await expect(ui.cancelBtn).toBeVisible();
  });

  test("validate cancel button functinality", async ({ page }) => {
    checkoutOverViewObj.clickOnCancel();
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });

  test.only("validate item total calculation", async ({ page }) => {
    const uiTotal = await checkoutOverViewObj.getItemTotal();
    const productTotal = await checkoutOverViewObj.getOverViewproducts();
    let total = 0;
    for (const product of productTotal) {
      total += parseFloat(product.price.replace("$", "").trim());
    }

    console.log("UI Total:", uiTotal);
    console.log("Calculated Total:", total);

    expect(total).toBe(uiTotal);
  });

  test.only("validate item total with tax calculation", async ({ page }) => {
    const uiTotal = await checkoutOverViewObj.getItemTotal();
    const productTotal = await checkoutOverViewObj.getOverViewproducts();
    let total = 0;
    for (const product of productTotal) {
      total += parseFloat(product.price.replace("$", "").trim());
    }

    expect(total).toBe(uiTotal);
    const tax=await checkoutOverViewObj.getTax()
    const UiFullTotal=await checkoutOverViewObj.getTotalPrice()
    console.log("UI Total:", UiFullTotal);
    console.log("item Total:", total);
    console.log("tax:", tax);
    console.log("sum:", (total+tax));


    expect(total+tax).toBe(UiFullTotal);
  });





















});
