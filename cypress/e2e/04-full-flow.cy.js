import checkoutData from '../fixtures/checkoutData.json'

describe('სრული ციკლი ერთ ტესტში', () => {
    it('სრული E2E სცენარი', () => {

        //ავტორიზაცია
        cy.login()

        //2 პროდუქტის დამატება კალათში
        cy.addToCart('sauce-labs-backpack')
        cy.addToCart('sauce-labs-bike-light')
        cy.get('[data-test="shopping-cart-badge"]').should('have.text', '2')

        //კალათაში გადასვლა, პროდუქტების გადამოწმება
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="inventory-item-name"]').should('contain', 'Sauce Labs Backpack')
        cy.get('[data-test="inventory-item-name"]').should('contain', 'Sauce Labs Bike Light')

        //Checkout — ფორმის შევსება fixture-ის მონაცემებით
        cy.get('#checkout').click()
        cy.fillCheckout(checkoutData.validData.firstName, checkoutData.validData.lastName, 
            checkoutData.validData.zip)
        
        //ჯამური ფასის შემოწმება
        cy.get('.summary_total_label').should('be.visible')

        // 6. Finish → "Thank you for your order!"
    cy.get('#finish').click()
    cy.get('.complete-header').should('contain', 'Thank you for your order!')

       //logout ბრძანება
       cy.get('#react-burger-menu-btn').click()
       cy.get('#logout_sidebar_link').click()
       cy.get('#user-name').should('be.visible')

    })
})