const { expect } = require('@playwright/test')

export class MoviesPage {
    constructor(page) {
        this.page = page
    }

    async isLoggedIn(text) {
        await this.page.waitForLoadState('networkidle')
        await expect(this.page.getByRole('heading', {name: text})).toBeVisible()
        await expect(this.page.locator('a[href="/logout"]')).toBeVisible()
        await expect(this.page.locator('a[href="/admin/movies/register"]')).toBeVisible()
        await expect(this.page).toHaveURL(/.*admin/)
    }

    async submit(title, synopsis, distributor, releaseYear, poster, highlightContent) {
        await this.page.locator('a[href="/admin/movies/register"]').click()
        await this.page.waitForLoadState('networkidle')
        await this.page.locator('input[name=title]').fill(title)
        await this.page.locator('textarea[placeholder="Digite aqui"]').fill(synopsis)
        await this.page.locator('#select_company_id .react-select__indicator').click()
        await this.page.locator('.react-select__option').filter({ hasText: distributor}).click()
        await this.page.locator('#select_year .react-select__indicator').click()
        await this.page.locator('.react-select__option').filter({ hasText: releaseYear}).click()
        if(highlightContent) {
            await this.page.locator('.react-switch-handle').click()
        }
        await this.page.locator('//button[text()="Cadastrar"]').click()
    }

}