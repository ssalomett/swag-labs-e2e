import users from '../fixtures/users.json'

describe('login tests', () => {

  users.forEach((user) => {
    it(user.testname, () => {
      // 1.custom command
      cy.login(user.username, user.password)

      // 2. შემოწმება
      if (user.username === 'standard_user' && user.password === 'secret_sauce') {
        // ვალიდური მონაცემები
        cy.url().should('include', user.expectedMessage)
      } 
      else if (user.username === 'problem_user') {
        // problem_user-ით შესვლა და ბაგების ტესტირება
        cy.url().should('include', user.expectedMessage)

        // ბაგი 1: სურათების შემოწმება
        cy.get('.inventory_item_img img')
          .first()
          .should('have.attr', 'src')
          .and('not.include', 'sl-404')

      }
      else {
        // არავალიდური მონაცემები
        cy.get('[data-test="error"]').should('contain', user.expectedMessage)
      }
    })
  })

})