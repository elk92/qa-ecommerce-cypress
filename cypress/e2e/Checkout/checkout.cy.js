/// <reference types="cypress" />

describe('Functional Checkout on Saucedemo ', () => {
    it('Login on saucedemo', () => {
        cy.visit('https://www.saucedemo.com/');
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();
        cy.url().should('include', '/inventory.html');

        // Ordenando os produtos para o maior valor
        cy.get('.product_sort_container').select('hilo');
        cy.wait(1000); // Espera para garantir que os produtos sejam ordenados
            cy.get('.inventory_item').should('have.length', 6);
        cy.contains('.inventory_item', 'Sauce Labs Fleece Jacket').find('button').click();
        cy.contains('.inventory_item', 'Sauce Labs Backpack').find('button').click();
        cy.contains('.inventory_item', 'Sauce Labs Bolt T-Shirt').find('button').click();
        // Check cart products number
        cy.get('.shopping_cart_badge').should('have.text', '3');
        cy.get('.shopping_cart_link').click();
        });
    });
