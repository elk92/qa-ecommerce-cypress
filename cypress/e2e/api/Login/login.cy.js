/// <reference types="cypress" />

describe('Login API - SauceDemo', () => {
    it('should login with valid credentials', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/login',
            body: {
                email: 'fulano@qa.com',
                password: 'teste'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.message).to.be.equal('Login realizado com sucesso');  
        });
    });

    it('should login with invalid credentials', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/login',
            body: {
                email: 'fulano@qa.com',
                password: 'wrong_password'
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.equal(401);
            expect(response.body.message).to.equal('Email e/ou senha inválidos');  
        })
    });
});