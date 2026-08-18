import { test, expect } from "@playwright/test";
import { productsPage } from "../pages/productsPage";
import { LoginPage } from "../pages/loginPage";
import { BASE_URL, USERNAME, PASSWORD } from "../utils/envConfig";
import { loginLocators } from "../locators/loginLocator";
import { cartPage } from "../pages/cartPage";
import { checkoutData } from "../test-data/checkoutData";
import { checkoutPage } from "../pages/checkoutPage";
import { checkoutPageLocator } from "../locators/checkoutPageLocator";


test.describe("Cart Page Test", () => {
    let loginPageObj: LoginPage;
    let productPageObj: productsPage;
    let cartPageObj: cartPage;
    let chekoutObj:checkoutPage

  test.beforeEach(async ({ page }) => {
    loginPageObj = new LoginPage(page);
    productPageObj = new productsPage(page);
    cartPageObj = new cartPage(page);
    chekoutObj = new checkoutPage(page);

    await page.goto(BASE_URL);
    await loginPageObj.loginPage(USERNAME, PASSWORD);
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await productPageObj.addFisrtProductToCart()
    await productPageObj.clickOnCartLink()

  })



    test("validate checkout page UI amd Element",async({page})=>{
        await cartPageObj.checkout()
        await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html")
        const ui=await chekoutObj.getCheckoutElement()
        await expect(ui.cartPageTitle).toBeVisible()
        await expect(ui.continueBtn).toBeVisible()
        await expect(ui.cancelBtn).toBeVisible()




    })

    test("validate cancel button functionalty",async({page})=>{
        await cartPageObj.checkout()
        await chekoutObj.cancelButton();
        await expect(page).toHaveURL("https://www.saucedemo.com/cart.html")

        

    })

    test("validate continue button functionalty",async({page})=>{
        await cartPageObj.checkout()
        await chekoutObj.fillCheckOutDetails(checkoutData.firstName,checkoutData.lastname,checkoutData.postCode)
        await chekoutObj.continueButton()
        await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-two.html")

        

    })

      test.only("validate error when clicking on continue button with no data ",async({page})=>{
        await cartPageObj.checkout()
        await chekoutObj.continueButton()
        const error=await chekoutObj.ErrorMessages();
        expect(error?.trim()).toBe("Error: First Name is required");

        

    })




















})