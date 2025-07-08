Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes("tokenUrl")) {
    return false; // prevents Cypress from failing the test
  }
});

describe('Doctor Consultation Search and Booking', () => {
        const phoneNumber = '9505698990';
            function generateOTP() {
                    const now = new Date();
                    const month = String(now.getMonth() + 1).padStart(2, '0'); // e.g., '06'
                    const day = String(now.getDate()).padStart(2, '0');        // e.g., '25'
                    return `5${month}${day}3`; // e.g., '506253'
                    }
            const otp = generateOTP().split('');
             before(() => {
                // cy.visit('https://raphacure.com/doctor');
                cy.viewport(1480, 900);
            });

        it('Searching for a doctor', () => {
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
              cy.wait(2000); // allow initial load
              cy.get('.uploadBtnContainer > button').should('be.visible').click();
              cy.url().should('include', 'https://raphacure.com/doctor/doctorlist');
            // Type doctor's name
            cy.get('.search-input').type('Naveen Gowda');
            // Wait for search results to appear
            cy.wait(2000); 
            // Wait for search popup to show up
            // cy.get('.search-popup').should('be.visible');

            // Ensure the popup item with correct name appears
            cy.get('.appointment-card').first().click();
            
             cy.url().should('include', 'https://raphacure.com/doctor/doctordetails/22463');

            cy.wait(2000); // allow time for page to load

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
            cy.wait(5000)  // optional
            // cy.get('.pay-proceed', { timeout: 10000 }).should('be.visible').click()

          // Step 6: Proceed to Checkout
          cy.get('.pay-proceed',{ timeout: 10000 }).should('be.visible').click();
          
          cy.url().should('include', '/checkout');
          // Optional: PhonePe payment test (mock or conditionally check)
        

          //  cy.get('.checkout-pay-buttom.phonePe button').click();
            cy.get('.checkout-pay-buttom.checkout-btn-blue button').first().click();
            cy.wait(2000); // Wait for the payment options to load
            cy.get('iframe[class*="razorpay-checkout-frame"]', { timeout: 10000 })
              .should('be.visible')
              .then($iframe => {
              const body = $iframe[0].contentDocument.body;

              });
          

            // cy.get('button[data-testid="checkout-close"]').should('be.visible').click();
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
       
});


// Cypress.on('uncaught:exception', (err, runnable) => {
//   if (err.message.includes("tokenUrl")) {
//     return false;
//   }
// });

// describe('Doctor Consultation Search and Booking', () => {

//   const phoneNumber = '9505698990';

//   function generateOTP() {
//     const now = new Date();
//     const month = String(now.getMonth() + 1).padStart(2, '0');
//     const day = String(now.getDate()).padStart(2, '0');
//     return `5${month}${day}3`;
//   }

//   const otp = generateOTP().split('');

//   it('Searching for a doctor', () => {
//     cy.visit('https://raphacure.com/doctor');

//     cy.contains('Login', { timeout: 15000 }).click();

//     cy.get('.input-phone-box', { timeout: 15000 }).type(phoneNumber);
//     cy.get('#checkboxaggrews').check();

//     cy.get('.proceed-btn button').should('not.be.disabled').click();

//     cy.get('.modalBodyDefault', { timeout: 15000 }).should('be.visible');

//     otp.forEach((digit, index) => {
//       cy.get(`[aria-label="Please enter OTP character ${index + 1}"]`, { timeout: 10000 }).type(digit);
//     });

//     cy.url({ timeout: 2000 }).should('include', '/doctor');
    
//     // Wait for search input to load
//     cy.get('.search-input', { timeout: 15000 }).should('be.visible').type('Naveen Gowda');

//     // Wait for search popup results
//     cy.get('.search-popup', { timeout: 15000 }).should('be.visible');

//     cy.contains('.search-popup-name', 'Naveen Gowda', { timeout: 20000 }).click();

//     cy.url({ timeout: 20000 }).should('include', '/doctor/doctordetails/');
//     cy.wait(3000); // allow time for page to load

//     // Choose Booking Options
//     cy.get('#virtual-types-list1', { timeout: 10000 }).check().should('be.checked');

//     cy.get('.day-button', { timeout: 10000 }).eq(1).click();

//     // Pick random time slot
//     cy.get('.time-slots-div .slot-button', { timeout: 15000 })
//       .should('have.length.greaterThan', 0)
//       .then($buttons => {
//         const randomIndex = Math.floor(Math.random() * $buttons.length);
//         cy.wrap($buttons[randomIndex]).click({ force: true });
//       });

//     // IMPORTANT: Wait for pay-proceed to become visible
//     cy.get('.pay-proceed', { timeout: 20000 })
//       .should('be.visible')
//       .click();

//     cy.url({ timeout: 3000 }).should('include', '/checkout');

//     // Click payment button
//     cy.get('.checkout-pay-buttom.checkout-btn-blue button', { timeout: 20000 }).first().click();

//     // Wait for Razorpay iframe
//     cy.get('iframe[class*="razorpay-checkout-frame"]', { timeout: 20000 })
//       .should('be.visible');

//     // Interact with iframe
//     // cy.get('iframe')
//     //   .its('0.contentDocument.body').should('not.be.empty')
//     //   .then(cy.wrap)
//     //   .find('button[data-testid="checkout-close"]', { timeout: 10000 })
//     //   .should('be.visible')
//     //   .click();
//     cy.get('iframe', { timeout: 20000 })
//         .its('0.contentDocument.body').should('not.be.empty')
//         .then(cy.wrap)
//         .within(() => {
//           cy.get('button[data-testid="checkout-close"]', { timeout: 10000 })
//             .should('be.visible')
//             .click();
//     });

    
//       cy.wait(1000);
//     cy.get('iframe')
//       .its('0.contentDocument.body').should('not.be.empty')
//       .then(cy.wrap)
//       .find('button[data-testid="confirm-positive"]', { timeout: 10000 })
//       .should('be.visible')
//       .click();

//     // Wait for payment failure modal
//     cy.contains('Payment failed. Please retry from patient dashboard', { timeout: 10000 })
//       .should('be.visible')
//       .then(() => {
//         cy.log('Modal is visible');
//         cy.get('.modal-content').should('be.visible').within(() => {
//           cy.contains('button', 'Ok')
//             .should('be.visible')
//             .click();
//         });
//       });

//     cy.url({ timeout: 20000 }).should('include', '/dashboard/bookings');
//   });
// });
