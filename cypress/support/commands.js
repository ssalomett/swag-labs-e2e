// 1. საიტის გახსნა, ველების შევსება Login ღილაკზე დაჭერა
//Default მნიშვნელობები: username = standard_user, password = secret_sauce
// ცარიელი ველი რომ არ ჩავარდეს if-ის გამოყენება

Cypress.Commands.add('login', (username = 'standard_user', password = 'secret_sauce') => {
    cy.visit('https://www.saucedemo.com/')

    if (username) {
        cy.get('#user-name').type(username)
    }
    if (password) {
        cy.get('#password').type(password)
    }
    cy.get('#login-button').click()
})

// 2. Id-ის მიხედვით პროდუქტის კალათაში დამატება
Cypress.Commands.add('addToCart', (productId) => {
    cy.get(`[data-test="add-to-cart-${productId}"]`).click()
})

//3. Checkout ფორმის შევსება და Continue
// ცარიელი ველი რომ არ ჩავარდეს ვიყენებ if-ს
Cypress.Commands.add('fillCheckout', (firstName, lastName, zip) => {
    if (firstName) {
        cy.get('[data-test="firstName"]').type(firstName)
    }
    if (lastName) {
        cy.get('[data-test="lastName"]').type(lastName)
    }
    if (zip) {
        cy.get('#postal-code').type(zip)
    }
        cy.get('#continue').click()
    }
)