describe('Login API - SauceDemo', () => {
    it('should login with valid credentials', () => {
        cy.api_login('fulano@qa.com', 'teste').then((response) => { 
            expect(response.status).to.equal(200)
            expect(response.body.message).to.equal('Login realizado com sucesso');
        }
      );      
    });

    it('should login with invalid credentials', () => {
        cy.api_login_invalid('fulano@qa.com', 'wrong_password').then((response) => {
            expect(response.status).to.equal(401);
            expect(response.body.message).to.equal('Email e/ou senha inválidos');
        });
    });
});