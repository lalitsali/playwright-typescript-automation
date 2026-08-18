import { test, expect } from "@playwright/test";
import { productsPage } from "../pages/productsPage";
import { LoginPage } from "../pages/loginPage";
import { BASE_URL, USERNAME, PASSWORD } from "../utils/envConfig";
import { loginLocators } from "../locators/loginLocator";
import { productsLocators } from "../locators/productLocator";
import { cartPage } from "../pages/cartPage";
import {productsToCart} from "../test-data/products"


test.describe("Cart Page Test", () => {
    let loginPageObj: LoginPage;
    let productPageObj: productsPage;
    let cartPageObj: cartPage;

  test.beforeEach(async ({ page }) => {
    loginPageObj = new LoginPage(page);
    productPageObj = new productsPage(page);
    cartPageObj = new cartPage(page);

    await page.goto(BASE_URL);
    await loginPageObj.loginPage(USERNAME, PASSWORD);
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });


    test("validate cart page URL and UI elements",async({page})=>{
        await productPageObj.addSpecificProductToCart()
        await productPageObj.clickOnCartLink()
        await expect(page).toHaveURL("https://www.saucedemo.com/cart.html")
        const ui=await cartPageObj.getCartPageElement();
        await expect(await ui.cartTitle).toBeVisible()
        await expect(await ui.continueShoppingCart).toBeVisible()
        await expect(await ui.chekout).toBeVisible()
        await expect(await ui.removebtn.first()).toBeVisible()




    })

    test("validate constinue shopping functionality",async({page})=>{
        await productPageObj.addSpecificProductToCart()
        await productPageObj.clickOnCartLink()
        await expect(page).toHaveURL("https://www.saucedemo.com/cart.html")
        await cartPageObj.continueButton()
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")


    })

    test("validate first product added to cart page",async({page})=>{
      const firstproduct=await productPageObj.getFirstProductDetails()  
      await productPageObj.addFisrtProductToCart()
      await productPageObj.clickOnCartLink()
      const infoCartProducts=await cartPageObj.getCartProducts();
      console.log("cart",infoCartProducts)
      console.log("actual added",firstproduct)
      expect(firstproduct).toEqual(infoCartProducts[0])//[0] it should match single product


    })


    test("validate All product added to cart page",async({page})=>{
      const allproductDetial=await productPageObj.getAllProductDetails()
      await productPageObj.addAllProductToCart()
      await productPageObj.clickOnCartLink()
      const infoCartProducts=await cartPageObj.getCartProducts();
      console.log("cart",infoCartProducts)
      console.log("actual added",allproductDetial)
      expect(allproductDetial).toEqual(infoCartProducts)
    })

   test("validate specific product added to cart page", async ({ page }) => {

      const specificProductDetail =
          await productPageObj.addSpecificProductToCart();

      await productPageObj.clickOnCartLink();

      const infoCartProducts =
          await cartPageObj.getCartProducts();

      console.log("Expected:", specificProductDetail);
      console.log("Actual:", infoCartProducts);

      expect(infoCartProducts).toEqual(specificProductDetail);
   });

    test("validate remove product from cart page",async({page})=>{
      await productPageObj.addAllProductToCart()
      await productPageObj.clickOnCartLink()
      const initialCartProduct=await cartPageObj.getCartProducts()
      expect(initialCartProduct.length).toBeGreaterThan(0)
      await cartPageObj.removeFirstProduct();
      const updatedCartProduct=await cartPageObj.getCartProducts()
      await expect(updatedCartProduct.length).toBe(initialCartProduct.length-1)
    })


test("validate cart count number",async({page})=>{
      await productPageObj.addAllProductToCart()
      await productPageObj.clickOnCartLink()
      const initialCartProduct=await cartPageObj.getCartProducts()
      expect(initialCartProduct.length).toBeGreaterThan(0)
      const cartCount=await cartPageObj.cartcountNumber()
      console.log("cartcount",cartCount)
      console.log("initialCartProduct",initialCartProduct)

      await expect(Number(cartCount)).toEqual(initialCartProduct.length)


    })


})