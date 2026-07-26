describe('კალათის ტესტები', () => {

  // ყოველი ტესტის წინ ავტომატურად გაივლის ავტორიზაციას
  beforeEach(() => {
    cy.login()
  })

  // 1. პროდუქტის დამატებისას ბეჯზე ჩნდება "1"
  it('პროდუქტის დამატებისას ბეჯზე ჩნდება 1', () => {
    cy.addToCart('sauce-labs-backpack')
    cy.get('.shopping_cart_badge').should('have.text', '1')
  })

  // 2. პროდუქტის დამატებისას ბეჯზე წერია "2"
  it('2 პროდუქტის დამატებისას ბეჯზე წერია 2', () => {
    cy.addToCart('sauce-labs-backpack')
    cy.addToCart('sauce-labs-bike-light')
    cy.get('.shopping_cart_badge').should('have.text', '2')
  })

  // 3. Remove ღილაკი პროდუქტს შლის (ბეჯი ქრება)
  it('Remove ღილაკით პროდუქტის წაშლისას ბეჯი ქრება', () => {
    cy.addToCart('sauce-labs-backpack')
    cy.get('.shopping_cart_badge').should('have.text', '1')
    
    // პროდუქტის წაშლა
    cy.get('[data-test="remove-sauce-labs-backpack"]').click()
    cy.get('.shopping_cart_badge').should('not.exist')
  })

  // 4. კალათის გვერდზე ჩანს დამატებული პროდუქტის სახელი
  it('კალათის გვერდზე ჩანს დამატებული პროდუქტის სახელი', () => {
    cy.addToCart('sauce-labs-backpack')
    cy.get('.shopping_cart_link').click() // კალათაში შესვლა
    cy.get('.inventory_item_name').should('have.text', 'Sauce Labs Backpack')
  })

})