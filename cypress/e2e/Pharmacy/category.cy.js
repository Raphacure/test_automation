describe('checking Pharmacy Category', () => {
   beforeEach(() => {
    cy.viewport(1480, 900);
  });
  it("Pharmacy Category", () => {
  cy.visit('https://raphacure.com/pharmacy',{timeout: 10000});
  cy.document().its('readyState').should('eq', 'complete');
  cy.get('.Top-Category-MultiCarouselModal',{ timeout: 20000 }).invoke('css', 'border' , '3px solid red').should('be.visible');
  cy.get('.react-multi-carousel-list',{ timeout: 20000 }).invoke('css', 'border', '3px solid red').should('be.visible');
  cy.get('li[aria-hidden="false"]').invoke('css', 'border', '3px solid green').should('be.visible');

  cy.get('.custom-right-arrow').click().scrollIntoView()
  cy.wait(2000); // Wait for the carousel to scroll
  cy.get('li[aria-hidden="false"]').invoke('css', 'border', '3px solid blue').should('be.visible');
  cy.wait(2000);
  });
  it("Click View All  Category Redirection", () => {
    cy.visit('https://raphacure.com/pharmacy',{timeout: 10000});
    cy.document().its('readyState').should('eq', 'complete');
    cy.get('.Category-heading-div button').invoke('css', 'border', '3px solid red').should('be.visible').click();
    cy.url().should('include','https://raphacure.com/pharmacy/all')
  })
});
