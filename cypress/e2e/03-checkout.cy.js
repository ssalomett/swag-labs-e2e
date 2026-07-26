import checkoutData from '../fixtures/checkoutData.json'

describe('Checkout ვალიდაციები', () => {
  beforeEach(() => {
    cy.login()
    // კალათის გასუფთავება ყველა ტესტის წინ
        cy.window().then((win) => {
    })
    // პროდუქტის დამატება და Checkout-ზე გადასვლა
    cy.get('#add-to-cart-sauce-labs-backpack')
    cy.get('[data-test="shopping-cart-link"]').click()
    cy.get('#checkout').click()
  })

  it('ცარიელი First Name-ის შეცდომა "First Name is required"', () => {
    cy.fillCheckout(
    checkoutData.invalidData[0].firstName,
    checkoutData.invalidData[0].lastName,
    checkoutData.invalidData[0].zip)
    cy.get('[data-test="error"]').should('contain', 'First Name is required')
  })

  it('ცარიელი Postal Code-ის შეცდომა', () => {
    cy.fillCheckout(
    checkoutData.invalidData[2].firstName,
    checkoutData.invalidData[2].lastName,
    checkoutData.invalidData[2].zip)
    cy.get('[data-test="error"]').should('contain', 'Postal Code is required')
  })

  it('ვალიდური მონაცემები', () => {
    cy.fillCheckout(checkoutData.validData.firstName, checkoutData.validData.lastName, 
            checkoutData.validData.zip)
    cy.url().should('include', '/checkout-step-two.html')
  })
})