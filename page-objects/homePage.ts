import {expect, Page} from '@playwright/test'
export class HomePage
{
    readonly page:Page
    constructor(page:Page){
        this.page = page
    }

    async chooseCategory(category:string)
    {
        const categoryContainer = await this.page.locator('.col-lg-3 .list-group')
        const categoryText = category.charAt(0).toUpperCase() + category.slice(1);
        await categoryContainer.locator('.list-group-item').filter({hasText:`${categoryText}`}).click()
    }

    async selectProduct(product:string)
    {
        //await this.page.getByText(`${product}`).click()
        //const productsListContainer = this.page.locator('#tbodyid')
        
        //await this.page.waitForTimeout(2000)
        const productsList = this.page.locator('#tbodyid .card-title a')
        await productsList.first().waitFor({ state: 'visible' })
        await this.page.waitForLoadState('domcontentloaded')
        const productsCount = await productsList.count()
        for (let i = 0; i < productsCount; i++) 
            {
                const productText = await productsList.nth(i).innerText()
                console.log(productText+',')
                if ( productText == product) 
                {
                    await productsList.nth(i).click()
                    return; 
                }
            }
            const nextPage = this.page.locator('.pagination #next2')
            if(await nextPage.isVisible())
            {
                await nextPage.click()
                await this.page.waitForTimeout(1000)
                await this.selectProduct(product)
            }
            throw new Error(`The product "${product}" could not be found`)
    }

    async addProductToCart()
    {
        await this.page.getByText('Add to cart').click()
        
    }
}