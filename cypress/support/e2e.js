import './commands'

afterEach(function () {
  // თუ მიმდინარე ტესტი ჩავარდა (failed)
  if (this.currentTest && this.currentTest.state === 'failed') {
    // გადაიღე სქრინშოტი და დაარქვი ტესტის სახელი
    cy.screenshot(`failed-${this.currentTest.title}`)
  }
})