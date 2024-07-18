describe('Blog app', function () {
  beforeEach(function () {
    // reset db
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

    // add users to db
    const user = {
      name: 'Landon Trinh',
      username: 'stormer168',
      password: '123',
    }

    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  // display login form by default
  it('login form is shown', function () {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('login functionality', function () {
    // successful login
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('stormer168')
      cy.get('#password').type('123')
      cy.get('#login-button').click()
      cy.get('.success').contains('successful log in')
      cy.contains('Landon Trinh logged in')
    })

    // unsuccessful login
    it('fails with wrong credentials', function () {
      cy.get('#username').type('stormer168')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.error').contains('wrong username or password')
      cy.contains('Landon Trinh logged in').should('not.exist')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'stormer168', password: '123' })
    })

    it('a blog can be created', function () {
      // create blog
      cy.get('#create-toggle-button').click()
      cy.get('#title').type('utopia')
      cy.get('#author').type('travis scott')
      cy.get('#url').type('utopia.com')
      cy.get('#submit-button').click()

      // verify blog is added
      cy.get('.success').contains('a new blog utopia by travis scott added')
      cy.contains('utopia - travis scott')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'utopia',
          author: 'travis scott',
          url: 'utopia.com',
          likes: 0,
        })
        cy.createBlog({
          title: 'light path 8',
          author: 'killy',
          url: 'killy.com',
          likes: 5,
        })
        cy.createBlog({
          title: 'heroes and villians',
          author: 'metro boomin',
          url: 'test.com',
          likes: 21,
        })
      })

      it('user can like a blog', function () {
        // find corresponding blog
        cy.contains('utopia - travis scott')
          .parent()
          .find('button')
          .as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'hide')

        // like blog
        cy.contains('utopia - travis scott')
          .parent()
          .get('.like-button')
          .click()
        cy.contains('likes 1')
      })

      it('creator of blog can delete own blog', function () {
        // find corresponding blog
        cy.contains('utopia - travis scott')
          .parent()
          .find('button')
          .as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'hide')

        // delete blog
        cy.contains('utopia - travis scott')
          .parent()
          .get('.delete-button')
          .click()

        // deleted blog should not exist
        cy.contains('utopia - travis scott').should('not.exist')
      })

      it('only creator of a blog can delete own blog', function () {
        // log out of current user
        cy.get('#logout-button').click()

        // create another user and login
        const user2 = {
          name: 'Travis Scott',
          username: 'laflame',
          password: '123',
        }
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)
        cy.login({ username: 'laflame', password: '123' })

        // click other user blog
        cy.contains('utopia - travis scott').parent().find('button').click()

        // cannot delete blog
        cy.contains('utopia - travis scott')
          .parent()
          .find('.delete-button')
          .should('not.exist')
      })

      it('blogs are sorted by most likes', function () {
        // check arrangement of blogs
        cy.get('.blog')
          .eq(0)
          .should('contain', 'heroes and villians - metro boomin')
        cy.get('.blog').eq(1).should('contain', 'light path 8 - killy')
        cy.get('.blog').eq(2).should('contain', 'utopia - travis scott')
      })
    })
  })
})
