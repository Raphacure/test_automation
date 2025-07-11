// describe('Lab Test Heading', () => {

//      const phoneNumber = '9505698990';
//             function generateOTP() {
//                     const now = new Date();
//                     const month = String(now.getMonth() + 1).padStart(2, '0'); // e.g., '06'
//                     const day = String(now.getDate()).padStart(2, '0');        // e.g., '25'
//                     return `5${month}${day}3`; // e.g., '506253'
//                     }
//             const otp = generateOTP().split('');
//   beforeEach(() => {
//     cy.visit('https://raphacure.com/labtest');
//     cy.viewport(1480, 900); // Set viewport to desktop size
//   });

//   it('should display the Lab Test heading', () => {
//     cy.get('.heading-banner-text h5').should('contain', 'BOOK LAB TEST').invoke('css', 'border', '3px solid red');
//     cy.wait(2000); // Wait for the heading to be visible
//   })
//   it('search the lab test and Book Now', () => {
//     cy.contains('Login').click();
//         cy.get('.input-phone-box').type(phoneNumber);
//         cy.get('#checkboxaggrews').check(); 
//         cy.get('.proceed-btn button').should('not.be.disabled').click();
//         cy.get('.modalBodyDefault').should('be.visible');
//         otp.forEach((digit, index) => {
//                 cy.get(`[aria-label="Please enter OTP character ${index + 1}"]`,{timeout:1000}).type(digit);
//             });
//       cy.get(".header-left-sec4").click();
   
//     // Wait for input field to appear
//     cy.get('input.pac-target-input', { timeout: 10000 }) .invoke('css', 'border', '3px solid red').should('be.visible').type(
//       "38/3, HSR Layout, Bengaluru, India"  );

//     // Optional: wait for auto-suggestions to load
//     cy.wait(3000); // you can improve this later

//     // Press enter or click on the first suggestion
//     cy.get('.pac-item').first().click(); // if auto-suggest uses this class
       
//     // Assert expected location shows in UI
//     cy.get('.header-left-sec4') .invoke('css', 'border', '3px solid red').should('contain.text', 'Select Service Location: Bengaluru, 560102');
//         cy.wait(3000); 
//     cy.get('.search-input', { timeout: 10000 }).type('Alcohol Risk Assessment').should('have.value', 'Alcohol Risk Assessment');

//     cy.get('.search-popup').invoke('css', 'border', '3px solid red').should('be.visible').and('contain', 'Alcohol Risk Assessment');
//     cy.wait(2000); // Wait for the search results to load
//     cy.get('.search-popup-item').should('be.visible').and('contain', 'Alcohol Risk Assessment').click();
//     cy.url().then((newUrl) => {
//             const url = new URL(newUrl);
//             cy.log('Pathname:', url.pathname);
//             // e.g. "/doctor/clinicDetails/12345"
//          }); 
//     cy.wait(3000); // Wait for the page to load after clicking the search result
//     // cy.get('.diagnostic-card').invoke('css', 'border', '3px solid red').should('be.visible')
//     cy.get('.availableCentersRow').then($card => {
//       expect($card).to.have.length.greaterThan(0);
//       const randomIndex = Math.floor(Math.random() * $card.length);
//        const selectedCard = cy.wrap($card[randomIndex]);
//       selectedCard
//     .invoke('css', 'border', '3px solid red')
//     .should('be.visible');

//   // Find and click the button with text 'BooK Now' (case insensitive)
//   selectedCard
//     .find('button')
//     .contains(/^BooK Now$/i) // case-insensitive match
//     .invoke('css', 'border', '3px solid red')
//     .click();
//     });
//     cy.get('.slotprice-container .slots button').first().should('be.visible').invoke('css', 'border', '3px solid red').click();
//     cy.get('.doctor_slotselection').should('be.visible').invoke('css', 'border', '3px solid red');

//     const today = new Date();
//   const tomorrow = new Date();
//   tomorrow.setDate(today.getDate() + 1);

//   // 2️⃣ Month name array
//   const monthNames = [
//     "January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December"
//   ];

//   const todayMonthName = monthNames[today.getMonth()];
//   const tomorrowMonthName = monthNames[tomorrow.getMonth()];

//   const day = tomorrow.getDate();
//   const year = tomorrow.getFullYear();
//   const ariaLabel = `${tomorrowMonthName} ${day}, ${year}`;

//   cy.log(`Selecting date with aria-label: ${ariaLabel}`);

// //   3️⃣ If month is changing, navigate calendar
//   if (tomorrowMonthName !== todayMonthName) {
//     cy.get('.react-calendar__navigation__next-button')
//       .should('be.visible')
//       .click();
//   } 

    
// cy.contains('abbr', `${day}`).click();
// cy.get('.morningTimeSlots').should('be.visible').invoke('css', 'border', '3px solid red');
// cy.get('.slotList').then($slots => {
//       expect($slots).to.have.length.greaterThan(0);
//       const randomIndex = Math.floor(Math.random() * $slots.length);
//       cy.wrap($slots[randomIndex])
//         .invoke('css', 'border', '3px solid red')
//         .should('be.visible')
//         .click();
//     });
//     cy.get('.confirmbtn').invoke('css', 'border', '3px solid red').should('be.visible').click();
//     cy.get('.selectaddress-btn').invoke('css', 'border', '3px solid red').should('be.visible').click();
//     cy.get('.modal-body').then($modal => {
//       expect($modal).to.have.length.greaterThan(0);
//       const randomIndex = Math.floor(Math.random() * $modal.length);
//       cy.wrap($modal[randomIndex])
//         .invoke('css', 'border', '3px solid red')
//         .should('be.visible').click();
//     });
//     cy.get('.secoundary-button').invoke('css', 'border', '3px solid red').should('be.visible').click();
//     cy.url().should('include', 'https://raphacure.com/checkout');

//   })
// })   



describe('Lab Package Booking', () => {
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
  });

  it('should display the Lab Test heading', () => {
    cy.get('.heading-banner-text h5')
      .should('contain', 'BOOK LAB TEST')
      .invoke('css', 'border', '3px solid red');
    cy.wait(2000);
  });

  it('search the lab package and Book Now with next available slot', () => {
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

    cy.get('.header-left-sec4').click();
    cy.get('input.pac-target-input', { timeout: 10000 })
      .invoke('css', 'border', '3px solid red')
      .should('be.visible')
      .type('38/3, HSR Layout, Bengaluru, India');
    cy.wait(3000);
    cy.get('.pac-item').first().click();
    cy.get('.header-left-sec4')
      .invoke('css', 'border', '3px solid red')
      .should('contain.text', 'Select Service Location: Bengaluru, 560102');
    cy.wait(3000);

    cy.get('.search-input', { timeout: 10000 })
      .type('Alcohol Risk Assessment')
      .should('have.value', 'Alcohol Risk Assessment');
    cy.get('.search-popup')
      .invoke('css', 'border', '3px solid red')
      .should('be.visible')
      .and('contain', 'Alcohol Risk Assessment');
    cy.wait(2000);
    cy.get('.search-popup-item')
      .should('be.visible')
      .and('contain', 'Alcohol Risk Assessment')
      .click();
    cy.wait(3000);

    cy.get('.availableCentersRow').then(($card) => {
      expect($card).to.have.length.greaterThan(0);
      const randomIndex = Math.floor(Math.random() * $card.length);
      const selectedCard = cy.wrap($card[randomIndex]);
      selectedCard.invoke('css', 'border', '3px solid red').should('be.visible');
      selectedCard
        .find('button')
        .contains(/^BooK Now$/i)
        .invoke('css', 'border', '3px solid red')
        .click();
    });

    cy.get('.slotselection_container .slots button')
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
  });
});
