import {test,chromium, expect} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'


test('Purchase flow',async()=>{
    const browser = await chromium.launch({ headless: true })
    const page = await browser.newPage()
    try
    {
        await page.goto('/')
        await page.waitForLoadState('domcontentloaded')
        const pageManager = new PageManager(page)
        page.on('dialog', async (dialog) => {
            expect(dialog.message()).toContain('Product added')
            await dialog.accept()
        })

        await pageManager.onHomePage().selectProduct('Samsung galaxy s6')
        
        await pageManager.navigateTo().navigateToMenuItem('Cart')
        await pageManager.onShoppingCart().placeOrder('Sam','United States of America','New York','321098765',11,2025)
    }
    catch(error)
    {
        console.error(`Test failed: ${error}`)
        throw error
    }
})