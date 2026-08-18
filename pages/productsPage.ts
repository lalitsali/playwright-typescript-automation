import { productsLocators } from "../locators/productLocator";
import { Page, expect } from "@playwright/test";
import { productsToCart } from "../test-data/products";

export class productsPage {
  constructor(private page: Page) {}

  async logOut() {
    await this.page.click(productsLocators.settingsButton);
    await this.page.click(productsLocators.logoutButton);
  }

  async openAboutPage() {
    await this.page.click(productsLocators.settingsButton);
    await this.page.click(productsLocators.aboutButton);
  }

  //prouct page information
  async validateAllProductDisplayed() {
    const names = await this.page
      .locator(productsLocators.productName)
      .allTextContents();
    const images = await this.page
      .locator(productsLocators.productImage)
      .allTextContents();
    const prices = await this.page
      .locator(productsLocators.productPrice)
      .allTextContents();
    const descriptions = await this.page
      .locator(productsLocators.productDescription)
      .allTextContents();
    console.log("names", names);
    console.log("images", images);
    console.log("prices", prices);
    console.log("descriptions", descriptions);
    if (names.length == 0) {
      throw new Error("All products are not displayed");
    }

    if (
      images.length != descriptions.length ||
      images.length != prices.length ||
      images.length != names.length
    ) {
      throw new Error("All product images are not displayed");
    }
  }

  async addFisrtProductToCart() {
    await this.page.locator(productsLocators.addToCartButton).first().click();
  }

  async addAllProductToCart() {
    const addToCartButtons = this.page.locator(
      productsLocators.addToCartButton
    );

    const count = await addToCartButtons.count();

    console.log("Add to cart buttons:", count);

    for (let i = 0; i < count; i++) {
      await addToCartButtons.first().click();
      await this.page.waitForTimeout(500);
    }
  }

//   async addSpecificProductToCart() {
//     const productNames = await this.page
//       .locator(productsLocators.productName)
//       .all();

//     for (const name of productNames) {
//       const productName = (await name.innerText()).trim();

//       if (productsToCart.includes(productName)) {
//         const product = name.locator(
//           "xpath=ancestor::div[contains(@class,'inventory_item')]"
//         );

//         await product.locator(productsLocators.addToCartButton).click();
//       }
//     }
//   }
async addSpecificProductToCart() {
    const productNames = await this.page
        .locator(productsLocators.productName)
        .all();

    const selectedProducts = [];

    for (const names of productNames) {

        const productName = (await names.innerText()).trim();

        if (productsToCart.includes(productName)) {

            const product = names.locator(
                "xpath=ancestor::div[contains(@class,'inventory_item')]"
            );
               const name = await product
                .locator(productsLocators.productName)
                .innerText();

            const price = await product
                .locator(productsLocators.productPrice)
                .innerText();

            const description = await product
                .locator(productsLocators.productDescription)
                .innerText();

            await product
                .locator(productsLocators.addToCartButton)
                .click();

            selectedProducts.push({
                name: productName,
                description: description.trim(),
                price: price.trim()
            });
        }
    }

    return selectedProducts;
}

  async removeSpecificProductFromCart() {
    const removeButtons = await this.page
      .locator(productsLocators.removeButton)
      .count();
    console.log("Remove buttons:", removeButtons);
  }

  // filter option
  async filterByNameAtoZ() {
    const Beforenames: string[] = await this.page
      .locator(productsLocators.productName)
      .allTextContents();
    await this.page.selectOption(productsLocators.filterOption, "az");
    // await this.page.click(productsLocators.filterNameAtoZ)--> not working with select option
    const Afternames: string[] = await this.page
      .locator(productsLocators.productName)
      .allTextContents();
    Beforenames.sort();
    const expectedNames = [...Beforenames].sort();
    expect(Afternames).toEqual(expectedNames);
  }

  async filterByNameZtoA() {
    const Beforenames: string[] = await this.page
      .locator(productsLocators.productName)
      .allTextContents();
    await this.page.selectOption(productsLocators.filterOption, "za");
    // await this.page.click(productsLocators.filterNameAtoZ)--> not working with select option
    const Afternames: string[] = await this.page
      .locator(productsLocators.productName)
      .allTextContents();
    Beforenames.sort();
    const expectedNames = [...Beforenames].sort().reverse();
    expect(Afternames).toEqual(expectedNames);
  }

  async filterPriceHighToLow() {
    const beforePrices = await this.page
      .locator(productsLocators.productPrice)
      .allTextContents();

    await this.page.selectOption(productsLocators.filterOption, "hilo");

    const afterPrices = await this.page
      .locator(productsLocators.productPrice)
      .allTextContents();

    const expectedPrices = [...beforePrices]
      .map((price) => Number(price.replace("$", "")))
      .sort((a, b) => b - a);

    const actualPrices = afterPrices.map((price) =>
      Number(price.replace("$", ""))
    );

    expect(actualPrices).toEqual(expectedPrices);
  }

  async filterByPriceLowtoHigh() {
    const beforePrices = await this.page
      .locator(productsLocators.productPrice)
      .allTextContents();

    await this.page.selectOption(productsLocators.filterOption, "lohi");

    const afterPrices = await this.page
      .locator(productsLocators.productPrice)
      .allTextContents();

    const expectedPrices = [...beforePrices]
      .map((price) => Number(price.replace("$", "")))
      .sort((a, b) => a - b);

    const actualPrices = afterPrices.map((price) =>
      Number(price.replace("$", ""))
    );

    expect(actualPrices).toEqual(expectedPrices);
  }

// cart page 

    async clickOnCartLink(){
        await this.page.click(productsLocators.cartLink)
    }

    async getFirstProductDetails(){
      const name = await this.page.locator(productsLocators.productName).first().textContent();
      const price = await this.page.locator(productsLocators.productPrice).first().textContent();
      const description = await this.page.locator(productsLocators.productDescription).first().textContent();
     return  {
            name:name?.trim(),
            description:description?.trim(),
            price:price?.trim()       
        }
    }

    async getAllProductDetails(){
      const allName = await this.page.locator(productsLocators.productName).allTextContents();
      const allPrice = await this.page.locator(productsLocators.productPrice).allTextContents();
      const allDescription = await this.page.locator(productsLocators.productDescription).allTextContents();
     //array of object [{name},{descp},{price}]
      const allproducts=[];
       for (let i = 0; i < allName.length; i++) {
            allproducts.push
            ({
                    name:allName[i].trim(),
                    description:allDescription[i].trim(),
                    price:allPrice[i].trim()
            })
        
       }
    
    return allproducts;

    }

    async getSpecificProductDetails(productName:string[]){
        const allName = await this.page.locator(productsLocators.productName).allTextContents();
      const allPrice = await this.page.locator(productsLocators.productPrice).allTextContents();
      const allDescription = await this.page.locator(productsLocators.productDescription).allTextContents();
     //array of object [{name},{descp},{price}]
      const allproducts=[];
       for (let i = 0; i < allName.length; i++) {
            allproducts.push
            ({
                    name:allName[i].trim(),
                    descp:allDescription[i].trim(),
                    price:allPrice[i].trim()
            })
        
       }
    
    return allproducts.filter(p=> productName.includes(p.name));

    }










}
