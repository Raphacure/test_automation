

describe.only('Pharmacy - Add to Cart', () => {
  const phoneNumber = '9505698990';
  function generateOTP() {
        const now = new Date();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // e.g., '06'
        const day = String(now.getDate()).padStart(2, '0');        // e.g., '25'
        return `5${month}${day}3`; // e.g., '506253'
        }
  

  beforeEach(() => {
    cy.visit('https://raphacure.com/pharmacy');
  });

  it('should add a random product to the cart', () => {
   const otp = generateOTP().split('');
    // Login Flow
    cy.contains('Login').click();
    cy.get('.input-phone-box').type(phoneNumber);
    cy.get('#checkboxaggrews').check();
    cy.get('.proceed-btn button').should('not.be.disabled').click();

    cy.get('.modalBodyDefault').should('be.visible');

    otp.forEach((digit, index) => {
      cy.get(`[aria-label="Please enter OTP character ${index + 1}"]`).type(digit);
    });

    cy.url().should('include', 'https://raphacure.com/pharmacy');

    // Select a category or listing
    cy.get('li[data-index="11"]').first().click();
    cy.url().should('include', '/pharmacy/43');
    cy.get('.card-module-div').should('be.visible');

    // Add a random product to the cart
    cy.get('.card-module-div .medicine-card').then(($products) => {
      const productCount = $products.length;
      const randomIndex = Math.floor(Math.random() * productCount);

      cy.wrap($products[randomIndex]).within(() => {
        cy.get('button.btn').click({ force: true }); // accurate selector based on your HTML
      });
    });

    // Optional: assert cart has updated
    // You may need to update these selectors based on your cart UI
    cy.get('.cart-icon-div > img').click();
    cy.url().should('include', 'https://raphacure.com/cart');
    cy.get('.cart-icon-div').should('have.length.greaterThan', 0);
    cy.get('.save-btn').click();
  });
});
