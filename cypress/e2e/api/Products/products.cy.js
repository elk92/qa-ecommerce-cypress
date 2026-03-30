let token
describe('Login and register products to site', () => {
    it('Login using api', () => {
        cy.api_login('fulano@qa.com', 'teste').then((response) => { 
            expect(response.status).to.equal(200)
            expect(response.body.message).to.equal('Login realizado com sucesso');
            token = response.body.authorization // Stores token for later use.
        }) 
    });

it('Register products to site successfully', () => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:3000/produtos',
        headers: {
            authorization: token
        },
        body: {
            "nome": "Carro Byd 8",
            "preco": 470,
            "descricao": "descrição breve do produto",
            "quantidade": 5
        }
    }).then((response) => {
        expect(response.status).to.equal(201)
    })
});
});