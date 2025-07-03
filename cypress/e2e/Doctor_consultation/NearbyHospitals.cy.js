describe('Nearby Location', () => {
    beforeEach(() => {
        cy.visit('/doctor');
    });

    it('should display nearby Hospitals', () => {
        cy.get('.nearby-doctor-hospitals').should('be.visible');
        cy.get('.nearby-doctor-hospitals').should('contain', 'Nearby Hospitals');
        cy.get('.nearbyCards').then($cards => {
            expect($cards.length).to.be.greaterThan(0);
             const randomIndex = Math.floor(Math.random() * $cards.length);
            // Click the random Hospital card
            cy.wrap($cards[randomIndex]).click();

        });
        // cy.get('.selected-hospital').should('be.visible');
    });

});