import {test,expect} from "@playwright/test";
import { productsPage } from "../pages/productsPage";
import { LoginPage } from "../pages/loginPage";
import { BASE_URL,USERNAME,PASSWORD } from "../utils/envConfig";
import { loginLocators } from "../locators/loginLocator";
import { productsLocators } from "../locators/productLocator";
test.describe("Products Page Test",()=>{
  test.beforeEach(async ({ page }) => {
    const LoginPageObj = new LoginPage(page)
    await page.goto(BASE_URL)
    await LoginPageObj.loginPage(USERNAME,PASSWORD)
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
  })
  
  test("validate logout functionality", async ({ page }) => {
          const productsPageObj = new productsPage(page)
        await productsPageObj.logOut()  
        await expect(page.locator(loginLocators.loginButton)).toBeVisible()
  })


  test("validate about and nvaigate back",async({page})=>{
    
    const productsPageObj = new productsPage(page)
    await productsPageObj.openAboutPage()
    await expect(page.locator(productsLocators.aboutPageRegi)).toBeVisible()
    await page.goBack()
    await expect(page.locator(productsLocators.settingsButton)).toBeVisible()
  })

  test("validate all products are displayed",async({page})=>{
    const productsPageObj = new productsPage(page)
    await productsPageObj.validateAllProductDisplayed()
    // await productsPageObj.addFisrtProductToCart()--> add first elemnt
    await productsPageObj.addAllProductToCart()
        await productsPageObj.removeSpecificProductFromCart()


  })

  test.only("validate specific products are added to cart",async({page})=>{
    const productsPageObj = new productsPage(page)
    await productsPageObj.addSpecificProductToCart()
    await page.waitForTimeout(3000)
    await productsPageObj.removeSpecificProductFromCart()
  })

  test("validate filter by name A to Z",async({page})=>{
    const productsPageObj = new productsPage(page)
    await productsPageObj.filterByNameAtoZ()
  })

test("validate filter by name Z to A",async({page})=>{
    const productsPageObj = new productsPage(page)
    await productsPageObj.filterByNameZtoA()
  })

  test("validate filter by price Low to High",async({page})=>{
    const productsPageObj = new productsPage(page)
    await productsPageObj.filterByPriceLowtoHigh()
  })

   test("validate filter by price High to Low",async({page})=>{
    const productsPageObj = new productsPage(page)
    await productsPageObj.filterPriceHighToLow()
  })





 

})


