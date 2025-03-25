import {Page,expect} from '@playwright/test'


export class NavigationPage
{
    readonly page:Page
    constructor(page:Page){
        this.page = page
    }

    async navigateToMenuItem(menuItem:string)
    {
        const navMenuItems = await this.page.locator('#navbarExample .nav-item .nav-link')
        const navMenuCount = await navMenuItems.count()
        for(let i=0;i<navMenuCount;i++)
        {
            const menuText = await navMenuItems.nth(i).innerText()
            if(menuText.trim()== menuItem)
            {
                await navMenuItems.nth(i).click()
                return
            }
        }
        throw new Error(`Navigation item with text "${menuItem}" not found`)
    }
}