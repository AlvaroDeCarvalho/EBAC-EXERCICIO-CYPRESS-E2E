/// <reference types = "cypress" />



describe("teste para funcionalidades da aplicação", () => {
    beforeEach(() => {
        cy.visit('https://agenda-contatos-react.vercel.app/')
    })
    let quantidadeContatos
    before(() => {
        cy.request('https://fake-api-tau.vercel.app/api/contatos')
          .its('body.data')
          .then((contatos) => {
            quantidadeContatos = contatos.length;
          });
      });

    it('testar a inclusão do contato ',  () => {
        
        cy.get('[type="text"]').type('Alvaro De Carvalho')
        cy.get('[type="email"]').type('alvaro@exemplo.com')
        cy.get('[type="tel"]').type('12345678900')

        cy.get('.adicionar').click()
        
    
    cy.get('.sc-beqWaB').should('have.length', quantidadeContatos)
    })

    it('alteração e edição do elemento adicionado', () => {
        console.log(quantidadeContatos)
        cy.get(`:nth-child(${quantidadeContatos + 2}) > .sc-gueYoa > .edit`).click()
        cy.get('[type="text"]').should('have.value','Alvaro De Carvalho')
        cy.get('[type="email"]').should('have.value','alvaro@exemplo.com')
        cy.get('[type="tel"]').should('have.value','12345678900')
        cy.get('.alterar').click
    })

    it('excluindo um elemento do nosso componente', () => {
        cy.wait(3000)
        cy.get(`:nth-child(${quantidadeContatos + 2}) > .sc-gueYoa > .delete`).click()
        cy.request('https://fake-api-tau.vercel.app/api/contatos')
        .its('body.data')
        .should((contatos) => {
            expect(contatos.length).to.eq(quantidadeContatos)
        })
    })
})