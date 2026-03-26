/// <reference types="cypress" />

Cypress.Commands.add('login', (username, password) => {

  if (!username || !password) {
    throw new Error('Username and password are required')
  };
  cy.get('#user-name').type(username);
  cy.get('#password').type(password);
  cy.get('#login-button').click();
});

Cypress.Commands.add('addToCart', () => {
    cy.contains('.inventory_item', 'Sauce Labs Fleece Jacket').find('button').click();
    cy.contains('.inventory_item', 'Sauce Labs Backpack').find('button').click();
    cy.contains('.inventory_item', 'Sauce Labs Bolt T-Shirt').find('button').click();
});

Cypress.Commands.add('goToCart', () => {
  cy.get('.shopping_cart_link').click();
});

Cypress.Commands.add('startCheckout', () => {
  cy.get('[data-test="checkout"]').click();
});

Cypress.Commands.add('fillCheckoutForm', (firstName, lastName, zip) => {
  cy.get('[data-test="firstName"]').type(firstName);
  cy.get('[data-test="lastName"]').type(lastName);
  cy.get('[data-test="postalCode"]').type(zip);
  cy.get('[data-test="continue"]').click();
});