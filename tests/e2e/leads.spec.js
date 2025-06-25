const { test, expect, request } = require('../support')
const { faker } = require('@faker-js/faker')

/**
 * Roadmap > Leads > Cadastro válido
 */
test('Should insert a new lead with valid data', async ({ page }) => {

  const name = faker.person.fullName()
  const email = faker.internet.email()

  // visit
  await page.leads.visit()

  // openLeadModal
  await page.leads.openLeadModal()
  //await page.getByRole('button', {name: 'Aperte o play... se tiver coragem'}).click()
  //await page.locator('xpath=//button[text()="Aperte o play... se tiver coragem"]').click()
  //await page.click('xpath=//button[text()="Aperte o play... se tiver coragem"]')
  //await page.getByText('Aperte o play... se tiver coragem').click()

  // Validate modal form title
  //await expect(page.getByTestId('modal').getByRole('heading')).toHaveText('Fila de espera')
  //await expect(page.getByTestId('modal').getByRole('heading', {name: 'Fila de espera'})).toBeVisible()
  //await expect(page.getByRole('heading', { name: 'Fila de espera' })).toBeVisible()

  // Validate modal form text
  // const formText = 'Faça o pré-cadastro e receba uma oferta especial na semana do lançamento.'
  // await expect(page.getByText(formText)).toBeVisible()
  //await expect(page.getByTestId('modal').getByRole('paragraph', {name: formText})).toBeVisible()

  // submit
  await page.leads.submit(name, email)
  // Enter user name
  //await page.locator('input[name=name]').fill(name)
  //await page.locator('input[id=name]').fill(name)
  //await page.locator('input[placeholder="Informe seu nome"]').fill(name)
  //await page.locator('#name').fill(name)
  //await page.getByPlaceholder('Informe seu nome').fill(name)

  // Enter user e-mail
  //await page.locator('input[name=email]').fill(email)
  //await page.locator('input[id=email]').fill(email)
  //await page.locator('input[placeholder="Informe seu email"]').fill(email)
  //await page.locator('#email').fill(email)
  //await page.getByPlaceholder('Informe seu email').fill(email)

  // Click the Submit button
  //await page.getByTestId('modal').getByText('Quero entrar na fila!').click()
  //await page.getByText('Quero entrar na fila!').click()
  //await page.locator('//button[text()="Quero entrar na fila!"]').click()
  //await page.click('//button[text()="Quero entrar na fila!"]')

  // popupHaveText
  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato.'
  await page.popup.haveText(message)
  //await page.waitForTimeout(5000)
  //const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  //await expect(page.locator('.swal2-html-container')).toHaveText(message)
  //await expect(page.locator('.swal2-html-container').getByText(message)).toBeVisible()
  //await expect(page.locator('.swal2-html-container')).toBeHidden({timeout: 5000})
})

/**
 * Roadmap > Leads > Cadastro com campos em branco
 */
test('Should not insert a new lead with a blank user name', async ({ page }) => {

  const name = ''
  const email = faker.internet.email()

  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submit(name, email)

  const message = 'Campo obrigatório'
  await page.alert.haveText(message)
})

/**
 * Roadmap > Leads > Cadastro com campos em branco
 */
test('Should not insert a new lead with a blank email', async ({ page }) => {

  const name = faker.person.fullName()
  const email = ''

  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submit(name, email)

  const message = 'Campo obrigatório'
  await page.alert.haveText(message)
})

/**
 * Roadmap > Leads > Cadastro com campos em branco
 */
test('Should not insert a new lead with a blank user name and a blank email', async ({ page }) => {

  const name = ''
  const email = ''

  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submit(name, email)

  const message = ['Campo obrigatório', 'Campo obrigatório']
  await page.alert.haveText(message)
})

/**
 * Roadmap > Leads > Cadastro com formato de email inválido
 */
test('Should not insert a new lead with an invalid e-mail', async ({ page }) => {

  const name = faker.person.fullName()
  let email = faker.internet.email()
  email = email.replace('@', '.')

  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submit(name, email)

  const message = 'Email incorreto'
  await page.alert.haveText(message)
})

/**
 * Roadmap > Leads > Cadastro com dados já cadastrados (duplicidade)
 */
test('Should not insert a new lead with an existing user name and email', async ({ page, request }) => {

  const name = faker.person.fullName()
  const email = faker.internet.email()

  const newLead = await request.post('http://localhost:3000/admin/leads', {
    data: {
      name: name,
      email: email
    }
  })

  expect(newLead.ok()).toBeTruthy()

  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submit(name, email)
  
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submit(name, email)

  const message = 'Verificamos que o endereço de e-mail fornecido já consta em nossa lista de espera. Isso significa que você está um passo mais perto de aproveitar nossos serviços.'
  await page.popup.haveText(message)
})

