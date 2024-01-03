//hooks -> trechos de código para executar antes ou depois

beforeEach(() => {
  cy.visit("https://dev-finance.netlify.app/")

});

describe('Transações', () => {
  it('Cadastrar uma entrada', () => {
    criarTransacao("Freela", 250)
    cy.get('tbody tr td.description').should('have.text', 'Freela') //eu espero que exista um elemento td.description que dele ter o texto freela   

  });

  it('Cadastrar uma saída', () =>{
    criarTransacao("Cinema", -45)
    cy.get('tbody tr td.description').should('have.text', 'Cinema') //eu espero que exista um elemento td.description que dele ter o texto freela   

  });

  it('Excluir transação', ()=>{
    criarTransacao("Freela", 100)
    criarTransacao("Mesada", 100)

    cy.contains(".description", "Freela")
      .parent() //navegar para o elemento html acima
      .find('img') //botão de excluir é uma imagem
      .click() //exclui transação

    cy.get('tbody tr').should("have.length", 1) 
    //a coluna de componentes so deve ter 1 componente
    //ja que o Freela esta sendo removido
    //usar tbody(coluna) tr(html)


    //OUTRA FORMA
    //    cy.contains(".description", "Freela")
    //      .siblins()
    //      .children('img') dos irmaos quero pegar o rimao que tenha um filho imagem

  });
});

function criarTransacao(descricao, valor){
  cy.get('#transaction > .button').click()
  cy.get('#description').type(descricao)
  cy.get('#amount').type(valor)
  cy.get('#date').type("2024-01-03")
  cy.contains('button', 'Salvar').click()
}
