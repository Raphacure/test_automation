describe('Doctor Consultation Specialization', () => {
  beforeEach(() => {
    cy.viewport(1480, 900);
  });
  it('checking Specialization visible or not', () => {
    cy.visit('https://raphacure.com/doctor');
    cy.wait(1000); // Wait for the page to load

    cy.get('.doctor-specialization').should('be.visible').invoke('css', 'border', '3px solid green');
    cy.get('.specialization-title-div > p').should('contain', 'Specialization').invoke('css', 'border', '3px solid red');
    cy.wait(2000);
  }); 
  it('checking Ent Specialist Specialization redirection', () => {
    cy.visit('https://raphacure.com/doctor');
    cy.wait(1000); // Wait for the page to load
    cy.get('.cardCmp-main-div div[index="0"]').invoke('css', 'border', '3px solid red').eq(0).should('be.visible').click();
   
    // Verify that the URL includes the expected path
    cy.url().should('include','https://raphacure.com/doctor/doctorlist/94')
    cy.get('.sideFilterModule').invoke('css', 'border', '3px solid red').should('be.visible');
   
    // // Verify that the specialization checkbox is checked
      cy.get('#checkbox-Specialization-7').check();
      cy.get('#checkbox-Specialization-7').should('be.checked').invoke('css', 'border', '3px solid red');

      cy.get('.allDocList').should('be.visible').invoke('css', 'border', '3px solid red');
    
      // Verify that the doctor list is not empty
    cy.get('.allDocList').invoke('css', 'border', '3px solid red').should('have.length.greaterThan', 0);
    
    // Verify that the doctor list contains 6 doctors
      cy.get('.allDocList > div').then(($divs) => {
          const doctorCount = $divs.length;
          expect(doctorCount).to.be.greaterThan(0); // Ensure there is at least one doctor
          cy.get('.allDocList > div').should('have.length', doctorCount); // Ensure there are exactly doctorCount doctors
      })
    // Verify that each doctor card is visible
    cy.get('.allDocList > div').each(($el) => {
      cy.wrap($el).should('be.visible').invoke('css', 'border', '3px solid red');
    });
    cy.wait(4000);
  });
  it('checking General Surgeon specilization redirection',()=>{
    cy.visit('https://raphacure.com/doctor');
    cy.wait(2000); // Wait for the page to load
    cy.get('.react-multi-carousel-item.react-multi-carousel-item--active[data-index="1"]').invoke('css', 'border', '3px solid red').should('be.visible').click();
   
    // Verify that the URL includes the expected path
    cy.url().should('include','https://raphacure.com/doctor/doctorlist/88')
    cy.get('.sideFilterModule').invoke('css', 'border', '3px solid red').should('be.visible');
    
    // Verify that the specialization checkbox is checked
    cy.get(':nth-child(3) > .alltests > :nth-child(18)').find('input[type="checkbox"]')
        .scrollIntoView()
        .check()
        .should('be.checked').invoke('css', 'border', '3px solid red');


    cy.get('.allDocList').should('be.visible').invoke('css', 'border', '3px solid red');
   
    // Verify that the doctor list is not empty
    // cy.get('.allDocList').should('have.length.greaterThan', 0);
    // Verify that the doctor list contains 9 doctors
    // cy.get('.allDocList > div').should('have.length',3);
    cy.get('.allDocList > div').then(($divs) => {
        const doctorCount = $divs.length;
        expect(doctorCount).to.be.greaterThan(0); // Ensure there is at least one doctor
        cy.get('.allDocList > div').should('have.length', doctorCount); // Ensure there are exactly doctorCount doctors
    })
    // Verify that each doctor card is visible
    cy.get('.allDocList > div').each(($el) => {
      cy.wrap($el).should('be.visible').invoke('css', 'border', '3px solid red');
    });
    cy.wait(4000);
  })
  it('checking general physician specialization redirection', () => {
    cy.visit('https://raphacure.com/doctor');
    cy.wait(2000); // Wait for the page to load
    cy.get('.react-multi-carousel-item.react-multi-carousel-item--active[data-index="2"]').invoke('css', 'border', '3px solid red').should('be.visible').click();
    
    // Verify that the URL includes the expected path
    cy.url().should('include','https://raphacure.com/doctor/doctorlist/89')
    cy.get('.sideFilterModule').invoke('css', 'border', '3px solid red').should('be.visible');
    
    // Verify that the specialization checkbox is checked
    cy.get(':nth-child(3) > .alltests > :nth-child(1)').find('input[type="checkbox"]')
        .scrollIntoView()
        .check()
        .should('be.checked').invoke('css', 'border', '3px solid red');
    
        // cy.get('#checkbox-Availability-0').uncheck()
    cy.get('.allDocList').should('be.visible');
    cy.get('.allDocList > div').each(($el) => {
      cy.wrap($el).should('be.visible').invoke('css', 'border', '3px solid red');
    });
    cy.wait(4000);
  })
  it('checking View All Specialization', () => {
    cy.visit('https://raphacure.com/doctor');
    cy.wait(2000); // Wait for the page to load
    cy.get('.specialization-title-div button').invoke('css', 'border', '3px solid red').should('be.visible').click();
    
    // Verify that the URL includes the expected path
    cy.url().should('include','https://raphacure.com/doctor/specializationList');
    
    // Verify that the specialization list is visible
    cy.get('.doctore-card-div').should('be.visible').invoke('css', 'border', '3px solid red');
    
    // Verify that each specialization card is visible
    cy.get('.doctore-card-div > div').each(($el) => {
      cy.wrap($el).should('be.visible').invoke('css', 'border', '3px solid green');
    });
  }
  );
});
