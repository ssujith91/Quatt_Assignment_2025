import {test,chromium, expect} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'


test('Purchase flow - Existing Product',async()=>{
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

        expect(async () => {
            await pageManager.onHomePage().selectProduct('Samsung galaxy s6')
        }).not.toThrowError()
        
        await pageManager.onHomePage().addProductToCart()
        await pageManager.navigateTo().navigateToMenuItem('Cart')
        await pageManager.onShoppingCart().placeOrder('Sam','United States of America','New York','321098765',11,2025)
        await pageManager.onShoppingCart().orderConfirmation('Sam','321098765')
    }
    catch(error)
    {
        console.error(`Test failed: ${error}`)
        throw error
    }
})

test('Purchase flow negative scenario - Non Existent Product throws error',async()=>{
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

        await expect(pageManager.onHomePage().selectProduct('Samsung galaxy s70')).rejects.toThrowError(`The product "Samsung galaxy s70" could not be found`)
    }
    catch(error)
    {
        console.error(`Test failed: ${error}`)
        throw error
    }
})