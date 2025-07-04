

describe("Locaton", () => {
   beforeEach(() => {
    cy.viewport(1480, 900);
  });
  it("location", () => {
    cy.visit("https://raphacure.com");



    // Click on the location icon
    cy.get(".header-left-sec4").click();
   
    // Wait for input field to appear
    cy.get('input.pac-target-input', { timeout: 10000 }).should('be.visible').type(
      "38/3, HSR Layout, Bengaluru, India"  );

    // Optional: wait for auto-suggestions to load
    cy.wait(3000);

    // Press enter or click on the first suggestion
    cy.get('.pac-item').first().click(); 
       
    // Assert expected location shows in UI
    cy.get('.header-left-sec4').should('contain.text', 'Select Service Location: Bengaluru, 560102');
        cy.wait(3000); 
  });
});


describe("Navigation Testing", () => {
  
  const baseUrl = "https://raphacure.com";

  context("Desktop View Navigation", () => {
  beforeEach(() => {
    cy.viewport(1480, 900);
    cy.visit(baseUrl);
  });

  it("should navigate through desktop nav menu consultation ", () => {
    // Open dropdown and click item consultation
        cy.get('.showOnDesktop .dropdown')
          .contains('Consultation').trigger('mouseover');

        cy.get('.dropdown-menu')
          .contains('Doctor Consultation')
          .should('be.visible')
          .click({ force: true });

        cy.url().should('include', '/doctor');
        cy.wait(3000); 
        cy.go('back');

        // Checking Mental Wellness
        cy.get('.showOnDesktop .dropdown')
          .contains('Consultation').trigger('mouseover');

        cy.get('.dropdown-menu')
          .contains('Mental Wellness')
          .should('be.visible').click({ force: true });

        cy.url().should('include', '/mentalwellness');
        cy.wait(3000); 
        cy.go('back');

        // Checking Women's Care
        cy.get('.showOnDesktop .dropdown')
          .contains('Consultation').trigger('mouseover');

        cy.get('.dropdown-menu')
          .contains('Women’s Care')
          .should('be.visible').click({force:true});

        cy.url().should('include', '/womenscare');
        cy.wait(3000); 
        cy.go('back');


        
        
  });
   it("should navigate through desktop nav menu Diagnostic", () => {
          // Open dropdown and click item Diagnostic
          // cheking labtest
            cy.get('.showOnDesktop .dropdown')
              .contains('Diagnostic').trigger('mouseover');

            cy.get('.dropdown-menu')
              .contains('Lab Test')
              .should('be.visible').click({ force: true });

            cy.url().should('include', '/labtest');
            cy.wait(3000); 
            cy.go('back');

            // Checking Radiology
            cy.get('.showOnDesktop .dropdown').contains('Diagnostic').trigger('mouseover');

            cy.get('.dropdown-menu').contains('Radiology').should('be.visible').click({force:true});
            cy.url().should('include','/radiology');
            cy.wait(3000);
            cy.go('back');

            // Checking EyeCare
            cy.get('.showOnDesktop .dropdown').contains('Diagnostic').trigger('mouseover');

            cy.get('.dropdown-menu').contains('Eye Care').should('be.visible').click({force:true});
            cy.url().should('include','/eyecare');
            cy.wait(3000);
            cy.go('back');

            
            // Checking Dental care 
            cy.get('.showOnDesktop .dropdown').contains('Diagnostic').trigger('mouseover');

            cy.get('.dropdown-menu').contains('Dental Care').should('be.visible').click({force:true});
            cy.url().should('include','/dentalcare');
            cy.wait(3000);
            cy.go('back');
    
  });
  it("should navigate through desktop nav menu Medicines", () => {
  // Open dropdown and click item Medicines

        // Cheking pharmacy 
      cy.get('.showOnDesktop .dropdown')
        .contains('Medicines').trigger('mouseover');

      cy.get('.dropdown-menu')
        .contains('Pharmacy')
        .should('be.visible')  .click({ force: true });

      cy.url().should('include', '/pharmacy');
      cy.wait(3000);
        cy.go('back');

        // Cheking in Ayurveda Section

       cy.get('.showOnDesktop .dropdown')
        .contains('Medicines').trigger('mouseover');

      cy.get('.dropdown-menu')
        .contains('Ayurveda')
        .should('be.visible') .click({ force: true });

      cy.url().should('include', '/ayurveda');
      cy.wait(3000);
        cy.go('back');
  
  
  });
   it("should navigate through desktop nav menu Emergency", () => {
    // Open dropdown and click item Emergency

          // Cheking in Ambulence section  

          cy.get('.showOnDesktop .dropdown')
            .contains('Emergency').trigger('mouseover');

          cy.get('.dropdown-menu')
            .contains('Ambulance')
            .should('be.visible').click({ force: true });
            cy.url().should('include', '/ambulance');
            cy.wait(3000);
            cy.go('back')

            // cheking in Blood bank
          

          cy.get('.showOnDesktop .dropdown').contains('Emergency').trigger('mouseover');

          cy.get('.dropdown-menu').contains('Blood Bank').should('be.visible').click({force:true});
          cy.url().should('include','/bloodbank');
          cy.wait(3000);
          cy.go('back')
  });
   it("should navigate through desktop nav menu Fitness", () => {
    // Open dropdown and click item Fitness
          //  Cheking Fitness Section 
          cy.get('.showOnDesktop .dropdown')
            .contains('Fitness').trigger('mouseover');

          cy.get('.dropdown-menu')
            .contains('Fitness')
            .should('be.visible').click({ force: true });

          cy.url().should('include', '/fitness_v2');
          cy.wait(3000);
          cy.go('back')

          // Checking in Mental Wellness
          cy.get('.showOnDesktop .dropdown').contains('Fitness').trigger('mouseover');
          cy.get('.dropdown-menu').contains('Mental Wellness').should('be.visible').click({force:true});
          cy.url().should('include','/mentalwellness');
          cy.wait(3000);
          cy.go('back')

       
    
  });
});


});



// 
// describe('Login Modal Validation', () => {
//   beforeEach(() => {
//     // Visit the page and trigger the login modal
//     cy.visit('https://raphacure.com');
//     cy.contains('Login').click();
//   });
//   it("Login form Heading",()=>{
//     cy.get('.login-header-left').should('contain',"Login/Sign up")
//   })

//   it('should allow phone number login and OTP verification', () => {
//     const phoneNumber = '9505698990';
//     const otp = ['5', '0', '6', '1', '0', '3'];

//     // Enter phone number and agree to terms
//     cy.get('.input-phone-box').type(phoneNumber);
//     cy.get('#checkboxaggrews').check();

//     // Verify button is enabled and click it
//     cy.get('.proceed-btn button').should('not.be.disabled').click();
    
//     // Verify OTP modal appears
//     cy.get('.modalBodyDefault').should('be.visible');

//     // Enter OTP
//     otp.forEach((digit, index) => {
//       cy.get(`[aria-label="Please enter OTP character ${index + 1}"]`).type(digit);
//     });

//     // Verify that Continue button is enabled and click it
//     cy.get('.proceed-btn button').should('not.be.disabled').click({force: true});
    
//     // Verify URL after successful login
//     cy.url().should('contain', 'https://raphacure.com');
//   });

//   it('should show an error for invalid OTP', () => {
//      const phoneNumber = '9505698990';
//      // Enter phone number and agree to terms
//     cy.get('.input-phone-box').type(phoneNumber);
//     cy.get('#checkboxaggrews').check();

//     // Verify button is enabled and click it
//     cy.get('.proceed-btn button').should('not.be.disabled').click();
    
//     // Verify OTP modal appears
//     cy.get('.modalBodyDefault').should('be.visible');
//   // Simulate entering an invalid OTP
//   const invalidOtp = ['1', '2', '3', '4', '5', '6'];
//   invalidOtp.forEach((digit, index) => {
//     cy.get(`[aria-label="Please enter OTP character ${index + 1}"]`).type(digit);
//   });

//   cy.get('.proceed-btn button').click({ force: true });

//   // Assert that the error message appears (adjust the selector accordingly)
//   cy.contains('Incorrect OTP').should('be.visible');
// });
// it("showing privacy & policy",()=>{
//   cy.get('label > [href="/privacy-policy"]').should('be.visible')
//   // cy.go('back')
//   cy.url().should('include','https://raphacure.com')
// })

// });



describe('Header Cart Icon Tests', () => {
  beforeEach(() => {
    cy.visit('https://raphacure.com'); // actual page URL
  });

  it('should display the cart icon with correct dimensions', () => {
    cy.get('.cart-icon-div img')
      .should('be.visible')
      .and('have.attr', 'width', '30')
      .and('have.attr', 'height', '24');
      cy.wait(3000);
  });

  it('should click the cart icon and navigate if it has a link', () => {
    cy.get('.cart-icon-div').click();

    // Optional: Verify navigation
    cy.url().should('include', '/cart');
    cy.wait(3000);
  });
  
});

 describe("Logo test",()=>{

     it('Logo is are visible or not',()=>{
      cy.visit('https://raphacure.com')
        cy.get('.navbar-brand > .brandImg').should('be.visible');
        cy.wait(3000);
   })
 })