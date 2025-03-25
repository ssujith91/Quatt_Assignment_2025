import {Page,expect} from '@playwright/test'

export class ShoppingCart
{
    readonly page:Page
    constructor(page:Page){
        this.page = page
    }

    async placeOrder(name:string,country:string,city:string,creditcard:string,month:number,year:number)
    {
        await this.page.getByRole('button').filter({hasText:'Place Order'}).click()
        const placeOrderDialog = this.page.locator('.modal-dialog')
        await placeOrderDialog.locator('#name').fill(`${name}`)
        await placeOrderDialog.locator('#country').fill(`${country}`)
        await placeOrderDialog.locator('#city').fill(`${city}`)
        await placeOrderDialog.locator('#card').fill(`${creditcard}`)
        await placeOrderDialog.locator('#month').fill(`${month}`)
        await placeOrderDialog.locator('#year').fill(`${year}`)
        await placeOrderDialog.getByRole('button').filter({hasText:'Purchase'}).click()
        //await this.orderConfirmation(name,creditcard)
    }

    async orderConfirmation(username:string,creditcard:string)
    {
        expect(await this.page.locator('.sweet-alert h2').innerText()).toBe('Thank you for your purchase!')
        const orderDetails = (await this.page.locator('.sweet-alert p.lead.text-muted').innerText()).split('\n')
        const id = orderDetails?.[0]?.split(':')[1]?.trim()
        const amount = orderDetails?.[1]?.split(':')[1]?.trim()
        const cardNumber = orderDetails?.[2]?.split(':')[1]?.trim()
        const name = orderDetails?.[3]?.split(':')[1]?.trim()
        const date = orderDetails?.[4]?.split(':')[1]?.trim()
        console.log(`${id}, ${amount},${cardNumber},${name},${date}`)
        expect(name).toBe(username)
        expect(cardNumber).toBe(creditcard)
        await this.page.locator('.sweet-alert').getByRole('button').filter({hasText:'OK'}).click()
    }
}