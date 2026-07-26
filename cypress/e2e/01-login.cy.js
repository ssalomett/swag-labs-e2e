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
      } else {
        // არავალიდური მონაცემები
        cy.get('[data-test="error"]').should('contain', user.expectedMessage)
      }
    })
  })

})