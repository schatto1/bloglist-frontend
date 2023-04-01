describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Testy McTesterson',
      username: 'testy',
      password: 'testerson'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testy')
      cy.get('#password').type('testerson')
      cy.get('#login-button').click()

      cy.contains('Testy McTesterson logged in')
    })

    it('fails with wrong credentials', function() {
      // ...
    })
  })
})