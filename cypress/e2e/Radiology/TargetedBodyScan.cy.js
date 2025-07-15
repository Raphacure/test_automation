describe('Targeted Body Scan Booking', () => {
   
   beforeEach(() => { 
      
        cy.login();
    });

    
  
  it('should book a targeted body scan', () => {
    cy.visit('https://raphacure.com/radiology')
    cy.wait(2000); // Wait for the page to load
      cy.get('.radiology-cards-main-div').should('be.visible')
          .invoke('css', 'border', '3px solid red').should("contain.text", "Targeted Body Scan").invoke('css', 'border', '3px solid blue');

        cy.get('.radiology-sub-cards-All-btn').invoke('css', 'border', '3px solid red').click();
        cy.url().should('include', 'https://raphacure.com/radiology/allScans');
        cy.wait(2000); // Wait for the page to load
        cy.get('.scan-list-data-div > div').then(($div) => {
            const count = $div.length;
            const randomIndex = Math.floor(Math.random() * count);
            cy.wrap($div[randomIndex])
              .invoke('css', 'border', '3px solid red')
              .should('be.visible').click();
              cy.wait(2000); // Wait for the scan details to load   
              
        });
    });
    
  })
