/// <reference types="cypress" />

describe('Functional Checkout on Saucedemo', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');
    cy.login('standard_user', 'secret_sauce');
    cy.url().should('include', '/inventory.html');
  });

  it('should complete checkout successfully', () => {
    // Sort products
    cy.get('.product_sort_container').select('hilo');
    // Add products
    cy.addToCart();
    // Go to cart
    cy.goToCart();
    // Start checkout
    cy.startCheckout();
    // Fill form
    cy.fillCheckoutForm('John', 'Doe', '12345');
    // Finish checkout
    cy.get('[data-test="finish"]').click();
    // Validate success
    cy.get('.complete-header')
      .should('contain', 'Thank you for your order!');
    // Back to products
    cy.get('[data-test="back-to-products"]').click();
    cy.url().should('include', '/inventory.html');

  });

});

describe('Checkout - Negative scenarios', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');
    cy.login('standard_user', 'secret_sauce');
    cy.url().should('include', '/inventory.html');
  });

  it('should not allow checkout without first name', () => {
    cy.addToCart();
    cy.goToCart();
    cy.startCheckout();
    // Partially fill form first name
    cy.get('[data-test="lastName"]').type('Doe');
    cy.get('[data-test="postalCode"]').type('12345');
    cy.get('[data-test="continue"]').click();
    // Validation of error
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'First Name is required');

  });
  it('should not allow checkout without second name', () => {
    cy.addToCart();
    cy.goToCart();
    cy.startCheckout();
    // Partially fill form second name
    cy.get('[data-test="firstName"]').type('John');
    cy.get('[data-test="postalCode"]').type('12345');
    cy.get('[data-test="continue"]').click();

    // Validation of error
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Last Name is required');

  });

  it('should not allow checkout without zip code', () => {
    cy.addToCart();
    cy.goToCart();
    cy.startCheckout();
    // Partially fill form zip code
    cy.get('[data-test="firstName"]').type('John');
    cy.get('[data-test="lastName"]').type('Doe');
    cy.get('[data-test="continue"]').click();
    // Validation of error
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Postal Code is required');
  });
});