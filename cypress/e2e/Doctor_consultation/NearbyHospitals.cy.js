describe('Nearby Location', () => {
    beforeEach(() => {
         cy.viewport(1480, 900);
        cy.visit('https://raphacure.com/doctor');
        
        cy.get(".header-left-sec4").click();
   
    // Wait for input field to appear
    cy.get('input.pac-target-input', { timeout: 10000 }) .invoke('css', 'border', '3px solid red').should('be.visible').type(
      "38/3, HSR Layout, Bengaluru, India"  );

    // Optional: wait for auto-suggestions to load
    cy.wait(3000); // you can improve this later

    // Press enter or click on the first suggestion
    cy.get('.pac-item').first().click(); // if auto-suggest uses this class
       
    // Assert expected location shows in UI
    cy.get('.header-left-sec4') .invoke('css', 'border', '3px solid red').should('contain.text', 'Select Service Location: Bengaluru, 560102');
        cy.wait(3000); 
    });

    it('should display nearby Hospitals', () => {
        cy.get('.nearby-doctor-hospitals') .invoke('css', 'border', '3px solid red').should('be.visible');
        cy.wait(2000); // Wait for the nearby hospitals section to load
        cy.get('.nearby-doctor-hospitals p') .should('contain', 'Nearby Hospitals').invoke('css', 'border', '3px solid green');
        cy.get('.nearby-doctor-hospitals p')
            .invoke('css', 'background-color', 'yellow')
            .invoke('css', 'color', 'red');
        cy.wait(5000); // Wait for the nearby hospitals to load
        cy.get('.nearbyCards').then($cards => {
            expect($cards.length).to.be.greaterThan(0);
             const randomIndex = Math.floor(Math.random() * $cards.length);
            // Click the random Hospital card
            cy.wrap($cards[randomIndex]) .invoke('css', 'border', '3px solid red').click();
         

        });
        cy.url().then((newUrl) => {
            const url = new URL(newUrl);
            cy.log('Pathname:', url.pathname);
            // e.g. "/doctor/clinicDetails/12345"
         }); 

      cy.wait(3000);  
    });
    
    
});

describe('Nearby Hospitals Redirection', () => {
    beforeEach(() => {
        cy.viewport(1480, 900);
        cy.visit('https://raphacure.com/doctor');
        
        cy.get(".header-left-sec4").click();
   
    // Wait for input field to appear
    cy.get('input.pac-target-input', { timeout: 10000 }) .invoke('css', 'border', '3px solid red').should('be.visible').type(
      "38/3, HSR Layout, Bengaluru, India"  );

    // Optional: wait for auto-suggestions to load
    cy.wait(3000); // you can improve this later

    // Press enter or click on the first suggestion
    cy.get('.pac-item').first().click(); // if auto-suggest uses this class
       
    // Assert expected location shows in UI
    cy.get('.header-left-sec4') .invoke('css', 'border', '3px solid red').should('contain.text', 'Select Service Location: Bengaluru, 560102');
        cy.wait(3000); 
    });

    it('Click View All should redirect to Nearby Hospitals page', () => {
       cy.get('.nearby-doctor-view-btn').should('be.visible').invoke('css', 'border', '3px solid red').click();
       cy.url().should('include', 'https://raphacure.com/doctor/nearbyhospitals');
       cy.get('.toggle-label').last()
                    .should('have.class', 'active') // If 'active' is a class that indicates selected tab
                    .invoke('css', 'border', '3px solid red')
                    .should('contain.text', 'Clinic Consult');
        cy.get('.opd-detail-card').should('be.visible').invoke('css', 'border', '3px solid red');
        cy.get('.view-all-docts-sec').then($cards => {
            expect($cards.length).to.be.greaterThan(0);
            const randomIndex = Math.floor(Math.random() * $cards.length);
            // Click the random Hospital card
            cy.wrap($cards[randomIndex]).invoke('css', 'border', '3px solid red').click();
        });
        //  cy.url().then((newUrl) => {
        //     const url = new URL(newUrl);
        //     cy.log('Pathname:', url.pathname);
        //     // e.g. "/doctor/clinicDetails/12345"
        //  }); 
    });

});