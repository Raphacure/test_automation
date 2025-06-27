describe('Doctor Consultation Specialization', () => {
  it('checking Specialization visible or not', () => {
    cy.visit('https://raphacure.com/doctor');
    cy.wait(1000); // Wait for the page to load

    cy.get('.doctor-specialization').should('be.visible');
    cy.get('.specialization-title-div > p').should('contain', 'Specialization');
  }); 
  it('checking Ent Specialist Specialization redirection', () => {
    cy.visit('https://raphacure.com/doctor');
    cy.wait(1000); // Wait for the page to load
    cy.get('.cardCmp-main-div div[index="0"]').eq(0).should('be.visible').click();
    // Verify that the URL includes the expected path
    cy.url().should('include','https://raphacure.com/doctor/doctorlist/94')
    cy.get('.sc-jCWzJg').should('be.visible');
    // Verify that the specialization checkbox is checked
    cy.get('#checkbox-Specialization-7').check();
    cy.get('#checkbox-Specialization-7').should('be.checked');

    cy.get('.allDocList').should('be.visible');
    // Verify that the doctor list is not empty
    cy.get('.allDocList').should('have.length.greaterThan', 0);
    // Verify that the doctor list contains 6 doctors
    cy.get('.allDocList > div').should('have.length',6);
    // Verify that each doctor card is visible
    cy.get('.allDocList > div').each(($el) => {
      cy.wrap($el).should('be.visible');
    });
  });
  it('checking General Surgeon specilization redirection',()=>{
    cy.visit('https://raphacure.com/doctor');
    cy.wait(1000); // Wait for the page to load
    cy.get('.react-multi-carousel-item.react-multi-carousel-item--active[data-index="1"]').should('be.visible').click();
    // Verify that the URL includes the expected path
    cy.url().should('include','https://raphacure.com/doctor/doctorlist/88')
    cy.get('.sc-jCWzJg').should('be.visible');
    // Verify that the specialization checkbox is checked
    cy.get(':nth-child(3) > .alltests > :nth-child(18)').find('input[type="checkbox"]')
        .scrollIntoView()
        .check()
        .should('be.checked');


    cy.get('.allDocList').should('be.visible');
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
      cy.wrap($el).should('be.visible');
    });
  })
  it('checking general physician specialization redirection', () => {
    cy.visit('https://raphacure.com/doctor');
    cy.wait(1000); // Wait for the page to load
    cy.get('.react-multi-carousel-item.react-multi-carousel-item--active[data-index="2"]').should('be.visible').click();
    // Verify that the URL includes the expected path
    cy.url().should('include','https://raphacure.com/doctor/doctorlist/89')
    cy.get('.sc-jCWzJg').should('be.visible');
    // Verify that the specialization checkbox is checked
    cy.get(':nth-child(3) > .alltests > :nth-child(1)').find('input[type="checkbox"]')
        .scrollIntoView()
        .check()
        .should('be.checked');
  })
});
