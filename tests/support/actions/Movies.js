const { expect } = require('@playwright/test')

export class Movies {
    constructor(page) {
        this.page = page
    }

    async submit(movie) {
        await this.goToForm()
        await this.page.waitForLoadState('networkidle')
        await this.page.locator('input[name=title]').fill(movie.title)
        await this.page.locator('textarea[placeholder="Digite aqui"]').fill(movie.overview)
        await this.page.locator('#select_company_id .react-select__indicator').click()
        await this.page.locator('.react-select__option').filter({ hasText: movie.company }).click()
        await this.page.locator('#select_year .react-select__indicator').click()
        await this.page.locator('.react-select__option').filter({ hasText: movie.release_year }).click()
        await this.page.locator('input[name=cover]').setInputFiles('tests/support/fixtures' + movie.cover)
        if (movie.featured) {
            await this.page.locator('.featured .react-switch-handle').click()
        }
        await this.submitForm()
    }

    async goToForm() {
        await this.page.locator('a[href="/admin/movies/register"]').click()
    }

    async submitForm() {
        await this.page.locator('//button[text()="Cadastrar"]').click()
    }

    async search(target) {
        await this.page.getByPlaceholder('Busque pelo nome').fill(target)
        await this.page.click('.actions button')
    }

    async tableHave(content) {
        const rows = this.page.getByRole('row')
        await expect(rows).toContainText(content)
    }

    async remove(title) {
        //  //td[text()="Guerra Mundial Z"]/..//button
        await this.page.getByRole('row', { name: title }).getByRole('button').click()
        await this.page.click('.confirm-removal')
    }
}