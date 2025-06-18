const { test } = require('../support')
const { LoginPage } = require('../pages/LoginPage')
const { MoviesPage } = require('../pages/MoviesPage')
const { Toast } = require('../pages/Components')
const data = require('../support/fixtures/movies.json')
const { executeSQL } = require('../support/database')

/**
 * Roadmap > Gestão de Filmes > Cadastro de filme válido
 */
test('Should insert a new movie with valid data', async ({ page }) => {
    const email = 'admin@zombieplus.com'
    const password = 'pwd123'
    const sql = "UPDATE movies SET cover = 'saw_1.jpg' WHERE title = 'Jogos Mortais'; UPDATE movies SET cover = 'devils_advocate.png' WHERE title = 'Advogado do Diabo'; UPDATE movies SET cover = 'a-volta-dos-mortos-vivos.jpg' WHERE title = 'A Volta dos Mortos Vivos'; UPDATE movies SET cover = 'dead_snow.jpg' WHERE title = 'Dead Snow'; UPDATE movies SET cover = 'meu_namorado_e_um_zumbi.jpg' WHERE title = 'Meu Namorado é um Zumbi'; UPDATE movies SET cover = 'orgulho.jpg' WHERE title = 'Orgulho e Preconceito e Zumbis'; UPDATE movies SET cover = 'guerra_mundial_z.jpg' WHERE title = 'Guerra Mundial Z'; UPDATE movies SET cover = 'hospedeiro.jpg' WHERE title = 'Resident Evil: O Hospedeiro'; UPDATE movies SET cover = 'night.jpg' WHERE title = 'A Noite dos Mortos-Vivos'; UPDATE movies SET cover = 'madrugada.webp' WHERE title = 'Madrugada dos Mortos'; UPDATE movies SET cover = 'zombieland.jpg' WHERE title = 'Zumbilândia'; UPDATE movies SET cover = 'exterminio.jpg' WHERE title = 'Extermínio'; UPDATE movies SET cover = 'scream.jpg' WHERE title = 'Pânico';"
    
    await executeSQL('DELETE FROM movies')

    await page.loginPage.visit()
    await page.loginPage.submit(email, password)
    await page.moviesPage.isLoggedIn()

    const movies = [data.create, data.resident_evil_o_hospedeiro, data.a_noite_dos_mortos_vivos,
    data.exterminio, data.madrugada_dos_mortos, data.zumbilandia, data.orgulho_e_preconceito_e_zumbis,
    data.meu_namorado_e_um_zumbi, data.dead_snow, data.a_volta_dos_mortos_vivos]

    /**movies.forEach(async movie => {        
        await page.moviesPage.submit(movie.title, movie.overview, movie.company, movie.release_year,
            movie.featured, movie.cover)
        console.log('Registering the movie: ' + movie.title + ' (' + movie.release_year + ') released by ' +
            movie.company)
    });**/
    
    async function submitMovie(movie) {
        await page.moviesPage.submit(movie.title, movie.overview, movie.company, movie.release_year,
            movie.featured, movie.cover)
        console.log('Registering the movie: ' + movie.title + ' (' + movie.release_year + ') released by ' + movie.company)    
    }

    let movie = data.create
    await submitMovie(movie)
    
    movie = data.resident_evil_o_hospedeiro
    await submitMovie(movie)
    
    movie = data.a_noite_dos_mortos_vivos
    await submitMovie(movie)
    
    movie = data.exterminio
    await submitMovie(movie)
    
    movie = data.madrugada_dos_mortos
    await submitMovie(movie)
    
    movie = data.zumbilandia
    await submitMovie(movie)
    
    movie = data.orgulho_e_preconceito_e_zumbis
    await submitMovie(movie)
    
    movie = data.meu_namorado_e_um_zumbi
    await submitMovie(movie)
    
    movie = data.dead_snow
    await submitMovie(movie)
    
    movie = data.a_volta_dos_mortos_vivos
    await submitMovie(movie)
    
    movie = data.devils_advocate
    await submitMovie(movie)
    
    movie = data.saw
    await submitMovie(movie)

    await executeSQL(sql)

    console.log('TEST EXECUTED: Should insert a new movie with valid data')
})