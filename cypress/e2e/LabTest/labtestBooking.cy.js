describe('labtest Booking', () => {
  const phoneNumber = '9505698990';
      function generateOTP() {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
        return `5${month}${day}3`;
    }
    const otp = generateOTP().split('');
    beforeEach(() => {
         cy.visit('https://raphacure.com/labtest');
        cy.viewport(1480, 900);
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

   it('should check labtest booking page', () => {
     cy.contains('Login').click();
    cy.get('.input-phone-box').type(phoneNumber);
    cy.get('#checkboxaggrews').check();
    cy.get('.proceed-btn button').should('not.be.disabled').click();
    cy.get('.modalBodyDefault').should('be.visible');

    otp.forEach((digit, index) => {
      cy.get(`[aria-label="Please enter OTP character ${index + 1}"]`, {
        timeout: 1000,
      }).type(digit);
    });
  cy.visit('https://raphacure.com/labtest');
  cy.wait(1000); 
  cy.get('.featureButton').first().invoke('css', 'border', '3px solid blue')
    .should('contain', 'Lab Tests')
    .click();
  cy.url().should('include', 'https://raphacure.com/alllabtests');
      cy.get('.healthCards').children().then(($children) => {
      const count = $children.length;
      const randomIndex = Math.floor(Math.random() * count);
          cy.wrap($children[randomIndex])
        .invoke('css', 'border', '3px solid red').click();

    
    });

  
    
    cy.url().then((newUrl) => {
      const url = new URL(newUrl); 
      cy.log('Pathname:', url.pathname);
    });
    // cy.get('.availableCentersRow').invoke('css', 'border', '3px solid green')
    //   .should('be.visible');
    cy.get('.availableCentersRow').then(($el) => {
      cy.wrap($el).invoke('css', 'border', '3px solid green');
      const count = $el.length;
      const randomIndex = Math.floor(Math.random() * count);
      cy.wrap($el).eq(randomIndex).invoke('css', 'border', '3px solid green').find(".add-btn-package-sec-code").click();

    });
    cy.get('.slotprice-container .slots button')
      .first()
      .should('be.visible')
      .invoke('css', 'border', '3px solid red')
      .click();

    cy.get('.doctor_slotselection')
      .should('be.visible')
      .invoke('css', 'border', '3px solid red');

    function selectNextAvailableSlot(dayOffset = 0) {
      const date = new Date();
      date.setDate(date.getDate() + dayOffset + 1);

      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];

      const month = monthNames[date.getMonth()];
      const day = date.getDate();
      const year = date.getFullYear();
      const ariaLabel = `${month} ${day}, ${year}`;

      cy.log(`Trying slot for: ${ariaLabel}`);

      cy.get(`abbr[aria-label="${ariaLabel}"]`).click();

      cy.get('.slotList', { timeout: 5000 }).then($slots => {
        if ($slots.length > 0) {
          const randomIndex = Math.floor(Math.random() * $slots.length);
          cy.wrap($slots[randomIndex])
            .invoke('css', 'border', '3px solid red')
            .should('be.visible')
            .click();

          cy.get('.confirmbtn')
            .invoke('css', 'border', '3px solid red')
            .should('be.visible')
            .click();

          cy.get('.selectaddress-btn')
            .invoke('css', 'border', '3px solid red')
            .should('be.visible')
            .click();

          cy.get('.modal-body').then(($modal) => {
            expect($modal).to.have.length.greaterThan(0);
            const randomIndex = Math.floor(Math.random() * $modal.length);
            cy.wrap($modal[randomIndex])
              .invoke('css', 'border', '3px solid red')
              .should('be.visible')
              .click();
          });

          cy.get('.secoundary-button')
            .invoke('css', 'border', '3px solid red')
            .should('be.visible')
            .click();

          cy.url().should('include', 'https://raphacure.com/labtest/bookingReview');
        } else {
          cy.log('No slots, trying next day');
          selectNextAvailableSlot(dayOffset + 1);
        }
      });
    }

    selectNextAvailableSlot();

   })
});