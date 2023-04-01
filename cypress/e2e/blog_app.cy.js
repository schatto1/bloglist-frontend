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
      cy.get('#username').type('hello')
      cy.get('#password').type('goodbye')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Testy Mctesterson logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testy', password: 'testerson' })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('This is a new blog post')
      cy.get('#author').type('I am the author')
      cy.get('#url').type('new-blog')
      cy.get('#create').click()
      cy.contains('This is a new blog post')
    })
  })
})