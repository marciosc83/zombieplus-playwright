const { expect } = require('@playwright/test')

export class Login {

    constructor(page) {
        this.page = page
    }

    async do(email, password, username) {
        await this.page.login.visit()
        await this.page.login.submit(email, password)
        await this.page.leads.isLoggedIn(username)
    }
    
    async visit() {
        await this.page.goto('http://localhost:3000/admin/login')
        const loginForm = this.page.locator('.login-form')
        await expect(loginForm).toBeVisible()
    }

    async submit(email, password) {
        await this.page.getByPlaceholder('E-mail').fill(email)
        await this.page.getByPlaceholder('Senha').fill(password)
        await this.page.locator('//button[text()="Entrar"]').click()
    }

    async logout() {
        await this.page.locator('a[href="/logout"]').click()
    }
}