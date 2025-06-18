const { test, expect } = require('../support')
const { faker } = require('@faker-js/faker')

/**
 * Roadmap > Login > Login com credenciais válidas
 */
test('Should login successfully with valid credentials', async ({ page }) => {

    const email = 'admin@zombieplus.com'
    const password = 'pwd123'

    await page.loginPage.visit()
    await page.loginPage.submit(email, password)
    await page.moviesPage.isLoggedIn('Filmes')
    await page.loginPage.logout()

    console.log('TEST EXECUTED: Should login successfully with valid credentials')
})

/**
 * Roadmap > Login > Login com email inválido
 */
test('Should not login with invalid email', async ({ page }) => {

    const email = 'adminzombieplus.com'
    const password = 'pwd123'

    await page.loginPage.visit()
    await page.loginPage.submit(email, password)
    await page.alert.haveTextWithLocator('.email-alert', 'Email incorreto')

    console.log('TEST EXECUTED: Should not login with invalid email')
})

/**
 * Roadmap > Login > Login com senha incorreta
 */
test('Should not login with invalid password', async ({ page }) => {

    const email = 'admin@zombieplus.com'
    const password = 'pwd555'

    await page.loginPage.visit()
    await page.loginPage.submit(email, password)

    const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'
    await page.toast.haveText(message)

    console.log('TEST EXECUTED: Should not login with invalid password')
})

/**
* Roadmap > Login > Login com email em branco
*/
test('Should not login with blank email', async ({ page }) => {

    const email = ''
    const password = 'pwd555'

    await page.loginPage.visit()
    await page.loginPage.submit(email, password)

    const locator = '.email-alert'
    const message = 'Campo obrigatório'
    await page.alert.haveTextWithLocator(locator, message)

    console.log('TEST EXECUTED: Should not login with blank email')
})

/**
 * Roadmap > Login > Login com senha em branco
 */
test('Should not login with blank password', async ({ page }) => {

    const email = 'admin@zombieplus.com'
    const password = ''

    await page.loginPage.visit()
    await page.loginPage.submit(email, password)

    const locator = '.password-alert'
    const message = 'Campo obrigatório'
    await page.alert.haveTextWithLocator(locator, message)

    console.log('TEST EXECUTED: Should not login with blank password')
})  

/**
 * Roadmap > Login > Login com senha em branco
 */
test('Should not login with blank email and blank password', async ({ page }) => {

    const email = ''
    const password = ''

    await page.loginPage.visit()
    await page.loginPage.submit(email, password)

    const message = ['Campo obrigatório', 'Campo obrigatório']
    await page.alert.haveTextWithRegEx( message)

    console.log('TEST EXECUTED: Should not login with blank email and blank password')
})  

/**
 * Roadmap > Login > Login com usuário não registrado
 */
test('Should not login with unregistered user', async ({ page }) => {

    const email = 'new_user@zombieplus.com'
    const password = 'pwd123'

    await page.loginPage.visit()
    await page.loginPage.submit(email, password)

    const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'
    await page.toast.haveText(message)

    console.log('TEST EXECUTED: Should not login with unregistered user')
})