// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
/// <reference types="Cypress"/> 
/// <reference types="cypress-xpath" />
Cypress.Commands.add('login', () => {
  const phoneNumber = '9505698990';

  function generateOTP() {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `5${month}${day}3`;
  }

  const otp = generateOTP().split('');

  cy.viewport(1480, 900);
  cy.visit('https://raphacure.com/');
  
  cy.contains('Login').click();
  cy.get('.input-phone-box').type(phoneNumber);
  cy.get('#checkboxaggrews').check();
  cy.get('.proceed-btn button').should('not.be.disabled').click();
  cy.get('.modalBodyDefault').should('be.visible');

  otp.forEach((digit, index) => {
    cy.get(`[aria-label="Please enter OTP character ${index + 1}"]`, { timeout: 1000 }).type(digit);
  });
});


