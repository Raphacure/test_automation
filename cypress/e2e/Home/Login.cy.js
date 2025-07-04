describe('Login Modal Validation', () => {
    const phoneNumber = '9505698990';

        function generateOTP() {
        const now = new Date();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // e.g., '06'
        const day = String(now.getDate()).padStart(2, '0');        // e.g., '25'
        return `5${month}${day}3`; // e.g., '506253'
        }
       
  beforeEach(() => {
    // Visit the page and trigger the login modal
    cy.visit('https://raphacure.com');
    cy.viewport(1480, 900);
    cy.contains('Login').click();
  });
  it("Login form Heading",()=>{
    cy.get('.login-header-left').should('contain',"Login/Sign up")
  })

  it('should allow phone number login and OTP verification', () => {
    const phoneNumber = '9505698990';
   const otp = generateOTP().split('');

    // Enter phone number and agree to terms
    cy.get('.input-phone-box').type(phoneNumber);
    cy.get('#checkboxaggrews').check();
    cy.wait(1000); // Wait for checkbox to be checked
    // Verify button is enabled and click it
    cy.get('.proceed-btn button').should('not.be.disabled').click();
    
    // Verify OTP modal appears
    cy.get('.modalBodyDefault').should('be.visible');
    
    // Enter OTP
    otp.forEach((digit, index) => {
      cy.get(`[aria-label="Please enter OTP character ${index + 1}"]`).type(digit);
    });
   
    // Verify that Continue button is enabled and click it
    cy.get('.proceed-btn button').should('not.be.disabled').click({force: true});
     
    // Verify URL after successful login
    cy.url().should('contain', 'https://raphacure.com');
  });

  it('should show an error for invalid OTP', () => {
      const phoneNumber = '9505698990';
      // Enter phone number 
      cy.get('.input-phone-box').type(phoneNumber);
      cy.get('#checkboxaggrews').check();

      // Verify button is enabled and click it
      cy.get('.proceed-btn button').should('not.be.disabled').click();
      
      // Verify OTP modal appears
      cy.get('.modalBodyDefault').should('be.visible');
    // Simulate entering an invalid OTP
    const invalidOtp = ['1', '2', '3', '4', '5', '6'];
    invalidOtp.forEach((digit, index) => {
      cy.get(`[aria-label="Please enter OTP character ${index + 1}"]`).type(digit);
    });
  
    cy.get('.proceed-btn button').click({ force: true });
    cy.wait(1000); // Wait for OTP to be processed
    // Assert that the error message appears (adjust the selector accordingly)
    cy.contains('Incorrect OTP').should('be.visible');
    cy.wait(1000); // Wait for the error message to be processed
  
  });
  it("showing privacy & policy",()=>{
    cy.get('label > [href="/privacy-policy"]').should('be.visible')
    // cy.go('back')
    cy.url().should('include','https://raphacure.com')
    cy.wait(1000); // Wait for the link to be processed
  })
  it("showing terms & conditions",()=>{
    cy.get('label > [href="/terms"]').should('be.visible')
    // cy.go('back')
    cy.url().should('include','https://raphacure.com')
    cy.wait(1000); // Wait for the link to be processed
    });
  it("Closing the modal",()=>{
    cy.get('.login-header-right > img').should('be.visible').click();
    // cy.go('back')
    cy.url().should('include','https://raphacure.com')
    cy.wait(1000);
  });
});
