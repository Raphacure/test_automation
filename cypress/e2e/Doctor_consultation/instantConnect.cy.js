Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes("tokenUrl")) {
    return false; // prevents Cypress from failing the test
  }
});
describe('Instant Connect', () => {
     const phoneNumber = '9505698990';
            function generateOTP() {
                    const now = new Date();
                    const month = String(now.getMonth() + 1).padStart(2, '0'); // e.g., '06'
                    const day = String(now.getDate()).padStart(2, '0');        // e.g., '25'
                    return `5${month}${day}3`; // e.g., '506253'
                    }
            const otp = generateOTP().split('');
           beforeEach(() => {
              cy.viewport(1480, 900);
           });
  it('checking instant doctor section visibility', () => {

  
     cy.visit('https://raphacure.com/doctor');
             cy.contains('Login').click();
                cy.get('.input-phone-box').type(phoneNumber);
                cy.get('#checkboxaggrews').check(); 
                cy.get('.proceed-btn button').should('not.be.disabled').click();

                cy.get('.modalBodyDefault').should('be.visible');

                otp.forEach((digit, index) => {
                cy.get(`[aria-label="Please enter OTP character ${index + 1}"]`,{timeout:1000}).type(digit);
                });
                cy.url().should('include', 'https://raphacure.com/doctor');
    cy.wait(2000); // Wait for the page to load
    cy.get('#instantConnect').should('be.visible').and('contain', 'Consult via call in 90 seconds');
    cy.get(".doctor-consult-list").then(()=>{
        const doctorList = Cypress.$('.doctor-consult-list');
        expect(doctorList.length).to.be.greaterThan(0);
        doctorList.each((index, element) => {
            const doctorName = Cypress.$(element).find('.scanCenter-card-body h3').text();
            expect(doctorName).to.not.be.empty;
        });
        cy.get('.doctor-consult-list .scanCenter-card-body').then(($doctors) => {
            // Ensure there is at least one doctor
            expect($doctors.length).to.be.greaterThan(0);
            // Pick a random index
            const randomIndex = Math.floor(Math.random() * $doctors.length);
            // Click the random doctor
            cy.wrap($doctors[randomIndex]).click();
            });
    })
    cy.url().should('include', 'https://raphacure.com/checkout');
     cy.get('.checkout-pay-buttom.checkout-btn-blue button').first().click();
    cy.wait(2000); // Wait for the payment options to load

            // Step 6: Select Razorpay Payment Option
            // cy.get('.razorpay-payment-button').should('be.visible').click();

            // Step 7: Handle Razorpay Iframe
    
     // Wait for the Razorpay iframe to appear
            cy.get('iframe[class*="razorpay-checkout-frame"]', { timeout: 10000 })
              .should('be.visible')
              .then($iframe => {
              const body = $iframe[0].contentDocument.body;

              });

        cy.get('iframe')
            .its('0.contentDocument.body').should('not.be.empty')
            .then(cy.wrap).find('button[data-testid="checkout-close"]').should('be.visible').click();

          cy.get('iframe')
            .its('0.contentDocument.body').should('not.be.empty').then(cy.wrap)
            .find('button[data-testid="confirm-positive"]').should('be.visible').click()
            .then(() => cy.log('Iframe close clicked'));
            cy.wait(1000); 
          
          // data-testid="confirm-positive"
          cy.contains('Payment failed. Please retry from patient dashboard', { timeout: 3000 })
            .should('be.visible')
            .then(() => {
              cy.log('Modal is visible');
              
              cy.get('.modal-content').should('be.visible').within(() => {
                cy.contains('button', 'Ok')
                  .should('be.visible')
                  .click();
              });
            });

          cy.url().should('include', 'https://raphacure.com/dashboard/bookings');
  });
})