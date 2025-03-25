import {Page} from '@playwright/test'
import {HomePage} from '../page-objects/homePage'
import {NavigationPage} from '../page-objects/navigationPage'
import {ShoppingCart} from '../page-objects/shoppingCart'

export class PageManager{
    readonly page:Page
    readonly navigationPage:NavigationPage
    readonly homePage:HomePage
    readonly shoppingCart:ShoppingCart

    constructor(page:Page){
        this.page = page
        this.navigationPage = new NavigationPage(page)
        this.homePage = new HomePage(page)
        this.shoppingCart = new ShoppingCart(page)
    }

    navigateTo()
    {
        return this.navigationPage
    }

    onHomePage()
    {
        return this.homePage
    }

    onShoppingCart()
    {
        return this.shoppingCart
    }
}