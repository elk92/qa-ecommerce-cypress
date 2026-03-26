/// <reference types="cypress" />

describe('Login - SauceDemo', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');
  });

  it('should login successfully with valid credentials', () => {
    cy.login('standard_user', 'secret_sauce');
    cy.url().should('include', '/inventory.html');
  });

  it('should show error message with invalid username', () => {
    cy.login('wrong_user', 'secret_sauce');
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Username and password do not match');
  });

  it('should show error message with invalid password', () => {
    cy.login('standard_user', 'wrong_password');
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Username and password do not match');
  });
});