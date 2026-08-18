import { Page } from "@playwright/test";
import { finalPagelocator } from "../locators/finalPageLocator";

export class finalPage{
    constructor(private page:Page){}

    async finalPageTitle(){
        return await this.page.locator(finalPagelocator.finalPageTitle).innerText()

    }

     finalpgElement(){
        return{
                    bckbtn:  this.page.locator(finalPagelocator.backHomeBtn),
                    hederMessage:  this.page.locator(finalPagelocator.orderMessage),
                    fullMessage:  this.page.locator(finalPagelocator.orderFullMessage),
                    MessageImage:  this.page.locator(finalPagelocator.img)
        }
            
    }

    async getSuccessMsg(){
        const successMsg=  await this.page.locator(finalPagelocator.orderMessage).innerText()
        return successMsg
        }

    async OnBackHomeBtn(){
        await this.page.click(finalPagelocator.backHomeBtn)
    }



}