/// <reference types="cypress" />

describe('Styles', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('home colours', () => {
        cy.get('body')
            .should('have.css', 'background-color', 'rgb(18, 18, 18)')
        cy.get('.nav-menu a:link')
            .should('have.css', 'color', 'rgb(93, 153, 198)')
    })
})
