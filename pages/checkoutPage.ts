import {Page} from "@playwright/test"
import { checkoutData } from "../test-data/checkoutData"
import { checkoutPageLocator } from "../locators/checkoutPageLocator"

export class checkoutPage
{
    constructor(private page:Page){}

    async getCheckoutElement()
    {
        return{
            cartPageTitle: await this.page.locator(checkoutPageLocator.checkouttitle),
            cancelBtn: await this.page.locator(checkoutPageLocator.checkoutCancel),
            continueBtn: await this.page.locator(checkoutPageLocator.checkoutContinue)
        }
    }


    async fillCheckOutDetails(firstName:string,lastName:string,Code:string)
    {
        await this.page.locator(checkoutPageLocator.firstName).fill(firstName)
        await this.page.locator(checkoutPageLocator.lastName).fill(firstName)
        await this.page.locator(checkoutPageLocator.zipcode).fill(Code)
    }
    

    async cancelButton()
    {
        await this.page.click(checkoutPageLocator.checkoutCancel)
    }

     async continueButton()
    {
        await this.page.click(checkoutPageLocator.checkoutContinue)
    }
    
    async ErrorMessages() {
        return await this.page.locator(checkoutPageLocator.errorMessage).textContent()
    }


}







