/// <reference types="cypress" />

describe('Functional Checkout on Saucedemo ', () => {
    it('Login on saucedemo', () => {
        cy.visit('https://www.saucedemo.com/');
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();
        cy.url().should('include', '/inventory.html');

        // Sorting products by highest value
        cy.get('.product_sort_container').select('hilo');
        cy.wait(1000); // Wait to ensure the products are sorted.
            cy.get('.inventory_item').should('have.length', 6);
        cy.contains('.inventory_item', 'Sauce Labs Fleece Jacket').find('button').click();
        cy.contains('.inventory_item', 'Sauce Labs Backpack').find('button').click();
        cy.contains('.inventory_item', 'Sauce Labs Bolt T-Shirt').find('button').click();
        // Check cart products number
        cy.get('.shopping_cart_badge').should('have.text', '3');
        // check products sort in cart
        cy.get('.shopping_cart_link').click();
        cy.get('[data-test="item-5-title-link"] > [data-test="inventory-item-name"]').should('contain', 'Sauce Labs Fleece Jacket');
        cy.get('[data-test="item-4-title-link"] > [data-test="inventory-item-name"]').should('contain', 'Sauce Labs Backpack');
        cy.get('[data-test="item-1-title-link"] > [data-test="inventory-item-name"]').should('contain', 'Sauce Labs Bolt T-Shirt');
        cy.get('[data-test="checkout"]').click();
        //  filling in user information
        cy.get('[data-test="firstName"]').type('John');
        cy.get('[data-test="lastName"]').type('Doe');
        cy.get('[data-test="postalCode"]').type('12345');
        cy.get('[data-test="continue"]').click();
      // check products in checkout
        cy.get('.cart_item').eq(0).should('contain', 'Sauce Labs Fleece Jacket');
        cy.get('.cart_item').eq(1).should('contain', 'Sauce Labs Backpack');
        cy.get('.cart_item').eq(2).should('contain', 'Sauce Labs Bolt T-Shirt');
       // Finish checkout, check values and order confirmation 
        cy.get('[data-test="total-label"]').should('have.text', 'Total: $103.65');
        cy.get('[data-test="finish"]').should('be.visible').click();
        cy.get('.complete-header').should('contain', 'Thank you for your order!');
        cy.get('[data-test="back-to-products"]').click();
        cy.url().should('include', '/inventory.html');
        });
    });
