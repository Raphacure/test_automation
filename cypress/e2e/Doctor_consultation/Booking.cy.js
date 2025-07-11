Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes("tokenUrl")) {
    return false; // prevents Cypress from failing the test
  }
});

describe('Virtual Booking', () => {
  const phoneNumber = '9505698990';
  function generateOTP() {
        const now = new Date();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // e.g., '06'
        const day = String(now.getDate()).padStart(2, '0');        // e.g., '25'
        return `5${month}${day}3`; // e.g., '506253'
        }
  const otp = generateOTP().split('');
  before(() => {
    cy.visit('https://raphacure.com/doctor');
  });

  it('should complete chat booking successfully', () => {
    // Step 1: Login
    cy.contains('Login').click();
    cy.get('.input-phone-box').type(phoneNumber);
    cy.get('#checkboxaggrews').check(); 
    cy.get('.proceed-btn button').should('not.be.disabled').click();

    cy.get('.modalBodyDefault').should('be.visible');

    otp.forEach((digit, index) => {
      cy.get(`[aria-label="Please enter OTP character ${index + 1}"]`).type(digit);
    });
    cy.url().should('include', 'https://raphacure.com/doctor');

    // Step 2: Visit Doctor List Page
    
    cy.contains('button', 'Schedule Consult').should('be.visible').click();
    cy.url().should('include', '/doctor/doctorlist');

    // Step 3: Go to Doctor Details
    cy.get('.contect-book-btn').should('be.visible').first().click();
    cy.url().should('include', '/doctor/doctordetails');

    // Step 4: Choose Booking Options
    cy.get('#virtual-types-list1').check().should('be.checked');
    cy.get('.day-button').eq(1).click();

    // Step 5: Choose Random Time Slot
    cy.get('.time-slots-div .slot-button')
      .should('have.length.greaterThan', 0)
      .then($buttons => {
        const count = $buttons.length;
        const randomIndex = Math.floor(Math.random() * count);
        cy.wrap($buttons[randomIndex]).click({force: true});
      });

    // Step 6: Proceed to Checkout
      cy.get('.pay-proceed').should('be.visible').click();
    
      cy.url().should('include', '/checkout');
    // Optional: PhonePe payment test (mock or conditionally check)
      

      //  cy.get('.checkout-pay-buttom.phonePe button').click();
        cy.get('.checkout-pay-buttom.checkout-btn-blue button').first().click();

        cy.get('iframe[class*="razorpay-checkout-frame"]', { timeout: 10000 })
          .should('be.visible')
          .then($iframe => {
          const body = $iframe[0].contentDocument.body;

        });
     

        // cy.get('button[data-testid="checkout-close"]').should('be.visible').click();
      //  cy.get('iframe')
      //   .its('0.contentDocument.body').should('not.be.empty')
      //    .then(cy.wrap).find('button[data-testid="checkout-close"]').should('be.visible').click();

      //  cy.get('iframe')
      //   .its('0.contentDocument.body').should('not.be.empty').then(cy.wrap)
      //   .find('button[data-testid="confirm-positive"]').should('be.visible').click()
      //   .then(() => cy.log('Iframe close clicked'));
      //   cy.wait(2000); 
      
      //   cy.contains('Payment failed. Please retry from patient dashboard', { timeout: 3000 })
      //     .should('be.visible')
      //     .then(() => {
      //   cy.log('Modal is visible');
          
      //     cy.get('.modal-content').should('be.visible').within(() => {
      //         cy.contains('button', 'Ok')
      //           .should('be.visible')
      //           .click();
      //     });
      //   });

      //  cy.url().should('include', 'https://raphacure.com/dashboard/bookings');
        cy.get('iframe')
            .its('0.contentDocument.body').should('not.be.empty')
            .then(cy.wrap).find('button[data-testid="checkout-close"]').invoke('css', 'border', '3px solid red').should('be.visible').click();

          cy.get('iframe')
            .its('0.contentDocument.body').should('not.be.empty').then(cy.wrap)
            .find('button[data-testid="confirm-positive"]').invoke('css', 'border', '3px solid red').should('be.visible').click()
            .then(() => cy.log('Iframe close clicked'));
            cy.wait(1000); 
          
          // data-testid="confirm-positive"
          cy.contains('Payment failed. Please retry from patient dashboard', { timeout: 5000 }).invoke('css', 'border', '3px solid green')
            .should('be.visible')
            .then(() => {
              cy.log('Modal is visible');
              
              cy.get('.modal-content').invoke('css', 'border', '3px solid red').should('be.visible').within(() => {
                cy.contains('button', 'Ok').invoke('css', 'border', '3px solid red')
                  .should('be.visible')
                  .click();
              });
            });

          cy.url().should('include', 'https://raphacure.com/dashboard/bookings');
       
     

  });
  
});




