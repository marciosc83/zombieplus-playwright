const { expect } = require('@playwright/test')

export class Popup {

    constructor(page) {
        this.page = page
    }

    async haveText(message) {
        const element = this.page.locator('.swal2-html-container')
        await expect(element).toHaveText(message)
    }
}

export class Alert {
    constructor(page) {
        this.page = page
    }

    async haveText(message) {
        await expect(this.page.locator('.alert')).toHaveText(message)
    }

    async haveTextWithLocator(locator, message) {
        await expect(this.page.locator(locator)).toHaveText(message)
    }

    async haveTextWithRegEx(message) {
        await expect(this.page.locator('span[class$=alert]')).toHaveText(message)
    }
}