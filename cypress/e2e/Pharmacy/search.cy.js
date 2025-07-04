describe('Pharmacy Search', () => {
  beforeEach(() => {
    cy.viewport(1480, 900); // Set viewport to desktop size
  });
  it('Searching for a medicine', () => {
    cy.visit('https://raphacure.com/pharmacy');
    cy.wait(2000); // Wait for the page to load
    cy.get('.search-input').type('Dolo 650');
     // Wait for search results to load
    cy.get('.search-popup',{timeout:13000}).should('contain', 'Dolo 650 Tablet');

  });
  

});

