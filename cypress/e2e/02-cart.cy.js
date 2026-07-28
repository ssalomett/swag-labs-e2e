describe('კალათის ტესტები', () => {

  // ყოველი ტესტის წინ ავტომატურად გაივლის ავტორიზაციას
  beforeEach(() => {
    cy.login()
  })

  // 1. პროდუქტების სორტირება ფასის მიხედვით
  it('Price (low to high) სორტირების შემდეგ პირველი ფასი ≤ ბოლო ფასზე', () => {
    // სორტირება
    cy.get('[data-test="product-sort-container"]').select('lohi')

    // პირველი და ბოლო ფასის შედარება
    cy.get('.inventory_item_price').then(($prices) => {
      const firstPrice = parseFloat($prices.first().text().replace('$', ''))
      const lastPrice = parseFloat($prices.last().text().replace('$', ''))

      // შემოწმება
      expect(firstPrice).to.be.lte(lastPrice)
    })
  })

  // 2. პროდუქტის დამატებისას ბეჯზე ჩნდება "1"
  it('პროდუქტის დამატებისას ბეჯზე ჩნდება 1', () => {
    cy.addToCart('sauce-labs-backpack')
    cy.get('.shopping_cart_badge').should('have.text', '1')
  })

  // 3. 2 პროდუქტის დამატებისას ბეჯზე წერია "2"
  it('2 პროდუქტის დამატებისას ბეჯზე წერია 2', () => {
    cy.addToCart('sauce-labs-backpack')
    cy.addToCart('sauce-labs-bike-light')
    cy.get('.shopping_cart_badge').should('have.text', '2')
  })

  // 4. Remove ღილაკი პროდუქტს შლის (ბეჯი ქრება)
  it('Remove ღილაკით პროდუქტის წაშლისას ბეჯი ქრება', () => {
    cy.addToCart('sauce-labs-backpack')
    cy.get('.shopping_cart_badge').should('have.text', '1')
    
    // პროდუქტის წაშლა
    cy.get('[data-test="remove-sauce-labs-backpack"]').click()
    cy.get('.shopping_cart_badge').should('not.exist')
  })

  // 5. კალათის გვერდზე ჩანს დამატებული პროდუქტის სახელი
  it('კალათის გვერდზე ჩანს დამატებული პროდუქტის სახელი', () => {
    cy.addToCart('sauce-labs-backpack')
    cy.get('.shopping_cart_link').click() // კალათაში შესვლა
    cy.get('.inventory_item_name').should('have.text', 'Sauce Labs Backpack')
  })

})

describe('Bug Hunt', () => {

  // ავტორიზაცია problem_user-ით
  beforeEach(() => {
    cy.login('problem_user', 'secret_sauce')
  })

  // 1. პროდუქტების სორტირება ფასის მიხედვით
  it('Price (low to high) სორტირება მუშაობს problem_user-ით', () => {

    // lohi-ზე დაჭერა
    cy.get('[data-test="product-sort-container"]').select('lohi')

    // ფასების შემოწმება
    cy.get('.inventory_item_price').then(($prices) => {

      const prices = [...$prices].map((price) =>
        parseFloat(price.innerText.replace('$', ''))
      )

      const sortedPrices = [...prices].sort((a, b) => a - b)

      expect(prices).to.deep.equal(sortedPrices)

    })

  })

})