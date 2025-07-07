describe('Lab Test Heading', () => {

  beforeEach(() => {
    cy.visit('https://raphacure.com/labtest');
    cy.viewport(1480, 900); // Set viewport to desktop size
  });

  it('should display the Lab Test heading', () => {
    cy.get('.heading-banner-text h5').should('contain', 'BOOK LAB TEST').invoke('css', 'border', '3px solid red');
    cy.wait(2000); // Wait for the heading to be visible
  })
 
})   
