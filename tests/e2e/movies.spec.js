const { test, expect } = require('../support')
const data = require('../support/fixtures/movies.json')
const { executeSQL } = require('../support/database')

async function submitMovie(page, movie) {
    await page.movies.submit(movie)}

test.beforeAll(async () => {
    await executeSQL('DELETE FROM movies')
})

/**
 * Roadmap > Gestão de Filmes > Cadastro de filme válido
 */
test('Should insert a new movie with valid data', async ({ page }) => {
    const email = 'admin@zombieplus.com'
    const password = 'pwd123'
    const username = 'Admin'

    await page.login.do(email, password, username)

    let movie = data.create
    await submitMovie(page, movie)
    await page.popup.haveText(`O filme \'${movie.title}\' foi adicionado ao catálogo.`)
})

/**
 * Roadmap > Gestão de Filmes > Cadastro de filme com dados duplicados
 */
test('Should not insert a new movie with duplicate title', async ({ page, request }) => {
    const movie = data.duplicate

    await request.api.postMovie(movie)

    const email = 'admin@zombieplus.com'
    const password = 'pwd123'
    const username = 'Admin'

    await page.login.do(email, password, username)
    await submitMovie(page, movie)
    await page.popup.haveText(`O título \'${movie.title}\' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`)

    console.log('TEST EXECUTED: Should insert a new movie with valid data')
})

/**
 * Roadmap > Gestão de Filmes > Cadastro de filme com campos em branco
 */
test('Should not insert a new movie with blank mandatory data', async ({ page }) => {
    const email = 'admin@zombieplus.com'
    const password = 'pwd123'
    const username = 'Admin'

    await page.login.do(email, password, username)
    await page.movies.goToForm()
    await page.movies.submitForm()

    const message = [
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório']
    await page.alert.haveText(message)

    console.log('TEST EXECUTED: Should not insert a new movie with blank mandatory data')
})

/**
 * Roadmap > Gestão de Filmes > Busca de filmes
 */
test('Should search for an existing movie  by the name', async ({ page, request }) => {
    const movies = data.search

    movies.data.forEach(async (movie) => {
        await request.api.postMovie(movie)
    })

    const email = 'admin@zombieplus.com'
    const password = 'pwd123'
    const username = 'Admin'

    await page.login.do(email, password, username)
    await page.movies.search(movies.input)
    await page.movies.tableHave(movies.outputs)
})

/**
 * Roadmap > Gestão de Filmes > Exclusão de filme
 */
test('Should delete an existing movie', async ({ page, request }) => {
    const movie = data.delete
    await request.api.postMovie(movie)

    const email = 'admin@zombieplus.com'
    const password = 'pwd123'
    const username = 'Admin'
    await page.login.do(email, password, username)
    await page.movies.remove(movie.title)

    await page.popup.haveText('Filme removido com sucesso.')
})