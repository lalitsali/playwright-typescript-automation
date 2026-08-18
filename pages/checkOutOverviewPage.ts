import { Page } from "@playwright/test";
import { checkoutPageLocator } from "../locators/checkoutPageLocator";
import { chekOutOverviewlocator } from "../locators/checkOutOverviewLocator";

export class checkOutOverviewPage{

constructor(private page:Page){}


async pageTitle(){
   return await this.page.locator(checkoutPageLocator.checkouttitle)
}


getCheckOutOverviewElements() {
    return {
        cancelBtn: this.page.locator(chekOutOverviewlocator.cancelBtn),
        finish: this.page.locator(chekOutOverviewlocator.finishBtn),
        pageInfo: this.page.locator(chekOutOverviewlocator.OverviewPagetitle)
    };
}

async getOverViewproducts(){
     const name = await this.page.locator(chekOutOverviewlocator.productName).allTextContents();
            const price = await this.page.locator(chekOutOverviewlocator.productPrice).allTextContents();
            const description = await this.page.locator(chekOutOverviewlocator.productDescription).allTextContents();
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

async getItemTotal(){

  const itemtotal=await this.page.locator(chekOutOverviewlocator.itemTotal).textContent()
  return parseFloat(itemtotal!.replace("Item total: $","").trim())//! it can be give null value

}

async getTax(){

  const itemtotal=await this.page.locator(chekOutOverviewlocator.tax).textContent()
  return parseFloat(itemtotal!.replace("Tax: $","").trim())

}

async getTotalPrice(){

  const itemtotal=await this.page.locator(chekOutOverviewlocator.total).textContent()
  return parseFloat(itemtotal!.replace("Total: $","").trim())

}

async clickOnCancel(){
    await this.page.locator(chekOutOverviewlocator.cancelBtn).click()
}

async clickOnFinish(){
    await this.page.locator(chekOutOverviewlocator.finishBtn).click()
}














}




