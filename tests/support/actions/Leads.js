const { expect } = require('@playwright/test')

export class Leads {
    
    constructor(page) {
        this.page = page
    }

    async visit() {
        await this.page.goto('http://localhost:3000/')
        await expect(this.page).toHaveTitle(/Zombie+ | Mais que um/)
    }

    async openLeadModal() {
        await this.page.getByRole('button', {name: 'Aperte o play... se tiver coragem'}).click()
        await expect(this.page.getByTestId('modal').getByRole('heading')).toHaveText('Fila de espera')
        const formText = 'Faça o pré-cadastro e receba uma oferta especial na semana do lançamento.'
        await expect(this.page.getByText(formText)).toBeVisible()
    }

    async submit(name, email) {
        await this.page.locator('input[name=name]').fill(name)
        await this.page.locator('input[name=email]').fill(email)
        await this.page.getByTestId('modal').getByText('Quero entrar na fila!').click()
    }

    async isLoggedIn(username) {
        await expect(this.page.locator('.logged-user')).toHaveText(`Olá, ${username}`)
    }
}