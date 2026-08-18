import {Page,expect} from "@playwright/test"
import { cartPageLocators } from "../locators/cartPageLocator"

export class cartPage{
   constructor(private page:Page){

   }
    
async continueButton(){
    await this.page.locator(cartPageLocators.continueshoppingButton).click()
}


async getCartPageElement(){
    return{
        cartTitle:this.page.locator(cartPageLocators.carttitle),
        continueShoppingCart:this.page.locator(cartPageLocators.continueshoppingButton),
        chekout:this.page.locator(cartPageLocators.checkoutButton),
        removebtn:this.page.locator(cartPageLocators.removeButton)


    }


}

async getCartProducts(){
        const name = await this.page.locator(cartPageLocators.productName).allTextContents();
        const price = await this.page.locator(cartPageLocators.productPrice).allTextContents();
        const description = await this.page.locator(cartPageLocators.productDescription).allTextContents();
       //array of object [{name},{descp},{price}]
        const allproducts=[];
         for (let i = 0; i < name.length; i++) {
              allproducts.push
              ({
                      name:name[i].trim(),
                      description:description[i].trim(),
                      price:price[i].trim()
              })
          
         }
      
      return allproducts;

}


async removeFirstProduct(){
    await this.page.locator(cartPageLocators.removeButton).first().click()
}

async cartcountNumber(){
    return await this.page.locator(cartPageLocators.cartCount).innerText()
}

async checkout(){
     await this.page.locator(cartPageLocators.checkoutButton).click()
}



}
