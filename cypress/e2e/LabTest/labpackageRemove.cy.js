describe('labpackageRemove', () => {
    const phoneNumber = '9505698990';
      function generateOTP() {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
        return `5${month}${day}3`;
    }
    const otp = generateOTP().split('');
  

  beforeEach(() => {
    cy.viewport(1480, 900); // Set viewport to desktop size
    cy.visit('https://raphacure.com/checkout');
    cy.wait(2000); // Wait for the page to load
   
   
  });

  it('should remove a lab package from the cart', () => {
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

    cy.get('.checkout-item-box')
    .contains('p', 'Lab Test')
    .parents('.checkout-item-box')
    .within(() => {
    // Now you're inside the specific box with Lab Test
    // You can write further Cypress actions here
   cy.get('#dropdown-basic').invoke('show').click();
   cy.get('.dropdown-menu').should('be.visible').click();
  });
  cy.get('.modal-content').should('be.visible').within(() => {
    cy.contains('button', 'Confirm')
      .should('be.visible')
      .click();
  }) 
  });
})