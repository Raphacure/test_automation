describe('Radiology Heading', () => {
    const phoneNumber = '9505698990';
      function generateOTP() {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
        return `5${month}${day}3`;
    }
    const otp = generateOTP().split('');
  beforeEach(() => {
    cy.visit('https://raphacure.com/radiology');
    cy.viewport(1480, 900);
  });
  it('should display the Radiology heading', () => {
    cy.get('.heading-banner-text h5')
      .should('contain', 'BOOK SCAN')
      .invoke('css', 'border', '3px solid red');
    cy.wait(2000);
  });
  it(' Scan Category should be visible', () => {

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
    cy.get('.react-multi-carousel-track li').invoke('css', 'border', '3px solid red').should('be.visible');
    cy.wait(2000);
    cy.get('.react-multi-carousel-list').then(($children) => {
      const count = $children.length;
      const randomIndex = Math.floor(Math.random() * count);
      cy.wrap($children[randomIndex])
        .invoke('css', 'border', '3px solid red')
        .should('be.visible')
        .click();

      cy.url().then((newUrl) => {
            const url = new URL(newUrl);
            cy.log('Pathname:', url.pathname);
            // e.g. "/doctor/clinicDetails/12345"
         });

        cy.get('.scan-list-data-div > div').then(($div) => {
            const count = $div.length;
            const randomIndex = Math.floor(Math.random() * count);
          cy.wrap($div[randomIndex])
            .invoke('css', 'border', '3px solid Green')
            .should('be.visible').click();

        });
        // cy.get('.availableCentersRow div').then(($centers) => {
        //     const count = $centers.length;
        //     const randomIndex = Math.floor(Math.random() * count);
        //     cy.wrap($centers[randomIndex])
        //       .invoke('css', 'border', '3px solid blue')
        //       .should('be.visible').find('.bottomWrapper')
        //       .should('be.visible').find('button')
        //       .contains(/^BooK Now$/i)
        //       .invoke('css', 'border', '3px solid red')
        //       .click();

        //  });
        cy.get('.availableCentersRow').then(($card) => {
      expect($card).to.have.length.greaterThan(0);
      const randomIndex = Math.floor(Math.random() * $card.length);
      const selectedCard = cy.wrap($card[randomIndex]);
      selectedCard.scrollIntoView().invoke('css', 'border', '3px solid red').should('be.visible');
      selectedCard
        .find('button')
        .contains(/^BooK Now$/i)
        .invoke('css', 'border', '3px solid red')
        .click();
    });

    cy.get('.slotselection_container input[placeholder="Preffered Slot1"]')
      .should('be.visible')
      .invoke('css', 'border', '3px solid red')
      .click({ force: true });

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
            .invoke('css', 'border', '3px solid blue')
            .should('be.visible')
            .click();
 
        cy.get('.modal-body').should('be.visible');

        // Get all the label elements inside
        cy.get('.modal-body .addresslist-label').then(($labels) => {
        expect($labels.length).to.be.greaterThan(0);

        // Pick a random index
        const randomIndex = Math.floor(Math.random() * $labels.length);

        // Click the radio input inside that random label
        cy.wrap($labels[randomIndex])
            .find('input[type="radio"]')
            .should('exist')
            .check({ force: true });
        });


          cy.get('.secoundary-button')
            .invoke('css', 'border', '3px solid red')
            .should('be.visible')
            .click();

          cy.url().should('include', 'https://raphacure.com/ctmri/bookingReview');
        } else {
          cy.log('No slots, trying next day');
          selectNextAvailableSlot(dayOffset + 1);
        }
      });
    }

    selectNextAvailableSlot();

    });
  })
});