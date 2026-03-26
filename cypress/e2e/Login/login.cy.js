/// reference types = "cypress" />

describe('Login funcional de login', () => {
    it('Login no cypress com sucesso', () => {
        cy.visit('https://www.saucedemo.com/');
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();
        cy.url().should('include', '/inventory.html');
    });
    it('Login no cypress usuario incorreto', () => {
        cy.visit('https://www.saucedemo.com/');
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type('wrong_password');
        cy.get('#login-button').click();
        cy.get('[data-test="error"]').should('be.visible').and('contain', 'Epic sadface: Username and password do not match any user in this service');
    });
    it('Login no cypress com senha incorreta', () => {
        cy.visit('https://www.saucedemo.com/');
        cy.get('#user-name').type('wrong_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();
        cy.get('[data-test="error"]').should('be.visible').and('contain', 'Epic sadface: Username and password do not match any user in this service');
    });
  });