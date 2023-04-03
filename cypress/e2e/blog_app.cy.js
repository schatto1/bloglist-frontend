describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user1 = {
      name: 'Testy McTesterson',
      username: 'testy',
      password: 'testerson'
    }
    const user2 = {
      name: 'Bloggy McBloggerson',
      username: 'bloggy',
      password: 'bloggerson'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user1)
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
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

    describe('and several blogs exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'This is a test blog post',
          author: 'Test Author',
          url: 'test-url'
        })
        cy.createBlog({
          title: 'This is a second test blog post',
          author: 'Test Author',
          url: 'test-url-2'
        })
        cy.createBlog({
          title: 'This is a third test blog post',
          author: 'Test Author',
          url: 'test-url-3'
        })

        cy.login({ username: 'bloggy', password: 'bloggerson' })
        cy.createBlog({
          title: 'This is Bloggy\'s blog post',
          author: 'Blog Author',
          url: 'blog-url'
        })
        cy.createBlog({
          title: 'This is Bloggy\'s second blog post',
          author: 'Blog Author',
          url: 'blog-url-3'
        })
      })

      it('one of the blogs can be liked', function () {
        const testBlog = 'This is a test blog post'
        cy.contains(testBlog).parent().find('#viewButton').as('viewButton')
        cy.get('@viewButton').click()
        cy.contains(testBlog).parent().parent().find('#likeButton').as('likeButton')
        cy.get('@likeButton').click()
        cy.get('#likeCount').contains('1')
      })

      it('creator can delete one of their blogs', function () {
        const testBlog = 'This is Bloggy\'s blog post'
        cy.contains(testBlog).parent().find('#viewButton').as('viewButton')
        cy.get('@viewButton').click()
        cy.contains(testBlog).parent().parent().find('#removeButton').as('removeButton')
        cy.get('@removeButton').click()
        cy.wait(5000)
        cy.get('html').should('not.contain', testBlog)
      })

      it('creator only sees delete button for their own blogs', function () {
        const testBlog1 = 'This is Bloggy\'s second blog post'
        const testBlog2 = 'This is a third test blog post'
        cy.contains(testBlog1).parent().find('#viewButton').as('viewButton1')
        cy.get('@viewButton1').click()
        cy.contains(testBlog1).parent().parent().find('#removeButton').as('removeButton')
        cy.contains(testBlog1).parent().parent().find('#hideDetails').as('hideButton')
        cy.get('@hideButton').click()
        cy.contains(testBlog2).parent().find('#viewButton').as('viewButton2')
        cy.get('@viewButton2').click()
        cy.get('#removeButton').should('not.exist')
      })
    })
  })
})