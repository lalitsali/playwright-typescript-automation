import { test, expect } from "@playwright/test";
import { productsPage } from "../../pages/productsPage";
import { LoginPage } from "../../pages/loginPage";
import { BASE_URL, USERNAME, PASSWORD } from "../../utils/envConfig";
import { loginLocators } from "../../locators/loginLocator";
import { cartPage } from "../../pages/cartPage";
import { checkoutData } from "../../test-data/checkoutData";
import { checkoutPage } from "../../pages/checkoutPage";
import { checkoutPageLocator } from "../../locators/checkoutPageLocator";
import { checkOutOverviewPage } from "../../pages/checkOutOverviewPage";
import { chekOutOverviewlocator } from "../../locators/checkOutOverviewLocator";
import { finalPage } from "../../pages/finalPage";

test.describe("checkOut OverView validation", () => {
  let loginPageObj: LoginPage;
  let productPageObj: productsPage;
  let cartPageObj: cartPage;
  let chekoutObj: checkoutPage;
  let checkoutOverViewObj: checkOutOverviewPage;
  let finalPageObj:finalPage;

  test.beforeEach(async ({ page }) => {
    loginPageObj = new LoginPage(page);
    productPageObj = new productsPage(page);
    cartPageObj = new cartPage(page);
    chekoutObj = new checkoutPage(page);
    checkoutOverViewObj = new checkOutOverviewPage(page);
    finalPageObj=new finalPage(page)

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
    await checkoutOverViewObj.clickOnFinish()
  });

  test("validate checkout final page UI and url", async ({ page }) => {
    await expect(page).toHaveURL(
      "https://www.saucedemo.com/checkout-complete.html"
    );
   const ui = finalPageObj.finalpgElement();

    await expect(ui.bckbtn).toBeVisible();
    await expect(ui.MessageImage).toBeVisible();
    await expect(ui.fullMessage).toBeVisible();
    await expect(ui.hederMessage).toBeVisible();
    await expect(ui.MessageImage).toBeVisible();


})

  test("validate Back Home Button", async ({ page }) => {
      await finalPageObj.OnBackHomeBtn();
      await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")


  })

  test("validatec Final Page Title", async ({ page }) => {
      const title=await finalPageObj.finalPageTitle();
      await expect(title).toBe("Checkout: Complete!")


  })
  
  test("validatec Success Message", async ({ page }) => {
      const message=await finalPageObj.getSuccessMsg();
      await expect(message).toBe("Thank you for your order!")
      const Fullmessage = finalPageObj.finalpgElement();

    await expect(Fullmessage.fullMessage).toHaveText(
        "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
    );

  })




















})