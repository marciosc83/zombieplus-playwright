const { test, expect } = require('../support')

/**
 * Roadmap > Login > Login com credenciais válidas
 */
test('Should login successfully with valid credentials', async ({ page }) => {

    const email = 'admin@zombieplus.com'
    const password = 'pwd123'

    await page.login.visit()
    await page.login.submit(email, password)
    await page.leads.isLoggedIn('Admin')
    await page.login.logout()
})

/**
 * Roadmap > Login > Login com email inválido
 */
test('Should not login with invalid email', async ({ page }) => {

    const email = 'adminzombieplus.com'
    const password = 'pwd123'

    await page.login.visit()
    await page.login.submit(email, password)
    await page.alert.haveTextWithLocator('.alert', 'Email incorreto')
})

/**
 * Roadmap > Login > Login com senha incorreta
 */
test('Should not login with invalid password', async ({ page }) => {

    const email = 'admin@zombieplus.com'
    const password = 'pwd555'

    await page.login.visit()
    await page.login.submit(email, password)

    const message = 'Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'
    await page.popup.haveText(message)
})

/**
* Roadmap > Login > Login com email em branco
*/
test('Should not login with blank email', async ({ page }) => {

    const email = ''
    const password = 'pwd555'

    await page.login.visit()
    await page.login.submit(email, password)

    const locator = '.alert'
    const message = 'Campo obrigatório'
    await page.alert.haveTextWithLocator(locator, message)
})

/**
 * Roadmap > Login > Login com senha em branco
 */
test('Should not login with blank password', async ({ page }) => {

    const email = 'admin@zombieplus.com'
    const password = ''

    await page.login.visit()
    await page.login.submit(email, password)

    const locator = '.alert'
    const message = 'Campo obrigatório'
    await page.alert.haveTextWithLocator(locator, message)
})  

/**
 * Roadmap > Login > Login com senha em branco
 */
test('Should not login with blank email and blank password', async ({ page }) => {

    const email = ''
    const password = ''

    await page.login.visit()
    await page.login.submit(email, password)

    const message = ['Campo obrigatório', 'Campo obrigatório']
    await page.alert.haveTextWithRegEx( message)
})  

/**
 * Roadmap > Login > Login com usuário não registrado
 */
test('Should not login with unregistered user', async ({ page }) => {

    const email = 'new_user@zombieplus.com'
    const password = 'pwd123'

    await page.login.visit()
    await page.login.submit(email, password)

    const message = 'Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'
    await page.popup.haveText(message)
})