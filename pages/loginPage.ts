import{Page,expect} from "@playwright/test";  
import { loginLocators } from "../locators/loginLocator"; 
export class LoginPage {
    constructor(public page: Page) {

    }

    async loginPage(UserName:string,Password:string)
    {
        await this.page.fill(loginLocators.usernameInput,UserName)
        await this.page.fill(loginLocators.passwordInput,Password)
        await this.page.click(loginLocators.loginButton)
        
    }

    async verifyLoginError() 
    {
        await expect(this.page.locator(loginLocators.errorMessage))
            .toContainText(
                "Username and password do not match any user in this service"
            );
    }
}