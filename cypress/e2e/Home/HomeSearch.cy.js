describe('searchbar testing',()=>{

    
  it('Searching doctor name (desktop view)', () => {
      cy.visit('https://raphacure.com');

      // Find the visible desktop search input and type
      cy.get('input[type="text"]')
         .filter(':visible')
         .first()
         .type('Naveen Gowda', { force: true });

      // Optional: verify the result popup
      cy.get('.search-popup', { timeout: 5000 })
         .should('be.visible')
         .and('contain', 'Naveen Gowda');
      cy.wait(2000);
   });
   it('Searching Test name (desktop view)', () => {
      cy.visit('https://raphacure.com');

      // Find the visible desktop search input and type
      cy.get('input[type="text"]')
         .filter(':visible')
         .first()
         .type('CT carotid angiogram', { force: true });

      // Optional: verify the result popup
      cy.get('.search-popup', { timeout: 5000 })
         .should('be.visible')
         .and('contain', 'CT carotid angiogram');

      cy.wait(2000);
   });

   it('Searching Hospital name (desktop view)', () => {
      cy.visit('https://raphacure.com');

      // Find the visible desktop search input and type
      cy.get('input[type="text"]')
         .filter(':visible')
         .first()
         .type('Narayana', { force: true });

      // Optional: verify the result popup
      cy.get('.search-popup', { timeout: 5000 })
         .should('be.visible')
         .and('contain', 'Narayana');
      cy.wait(2000);
   });
   it('Searching package name', () => {
      cy.visit('https://raphacure.com');

      // Find the visible desktop search input and type
      cy.get('input[type="text"]')
         .filter(':visible')
         .first()
         .type('Alcohol Risk', { force: true });

      // Optional: verify the result popup
      cy.get('.search-popup', { timeout: 5000 })
         .should('be.visible')
         .and('contain', 'Alcohol Risk');
      cy.wait(2000);
   });

    it('enter wrong search term', () => {
      cy.visit('https://raphacure.com');

      // Find the visible desktop search input and type
      cy.get('input[type="text"]')
         .filter(':visible')
         .first()
         .type('Invalid Search Term', { force: true });

      // Optional: verify the result popup
      cy.get('.search-popup', { timeout: 5000 })
         .should('be.visible')
         .and('contain', 'No result found for Invalid Search Term');
      cy.wait(2000);
   });

    it('closing search popup', () => {
      cy.visit('https://raphacure.com');

      // Find the visible desktop search input and type
      cy.get('input[type="text"]')
         .filter(':visible')
         .first()
         .type('test', { force: true });

      // Optional: verify the result popup
      cy.get('.search-popup', { timeout: 5000 })
         .should('be.visible')
         .and('contain', 'test');
      cy.xpath("//div[@class='search-heading-text-div']//button")
      .should('be.visible')
      .click();
      cy.wait(2000);
      
   });



 })

//   const setupSpeechRecognitionMock = (win) => {
//     class MockSpeechRecognition {
//       constructor() {
//         this.onresult = null;
//         this.onstart = null;
//         this.onend = null;
//         this.continuous = false;
//         this.interimResults = false;
//       }

//       start() {
//         if (typeof this.onstart === 'function') this.onstart();

//         setTimeout(() => {
//           if (typeof this.onresult === 'function') {
//             this.onresult({
//               results: [[{ transcript: 'Naveen Gowda', confidence: 0.98 }]],
//               resultIndex: 0
//             });
//           }
//           if (typeof this.onend === 'function') this.onend();
//         }, 500);
//       }

//       stop() {}
//     }

//     win.SpeechRecognition = MockSpeechRecognition;
//     win.webkitSpeechRecognition = MockSpeechRecognition;
//   };

//     const testVoiceSearch = () => {
//       cy.get('svg.mic-icon:visible')
//         .should('be.visible')
//         .click();

//       // Wait for mock result to simulate speech recognition
//       cy.wait(1000);

//       // Safer selector fallback
//       cy.contains('Naveen Gowda', { timeout: 5000 }).should('exist');
//     };


//   it('should perform voice search on desktop', () => {
//     cy.viewport(1280, 800);
//     cy.visit('https://raphacure.com', {
//       onBeforeLoad(win) {
//         setupSpeechRecognitionMock(win);
//       }
//     });
//     testVoiceSearch();
//   });

//   // Optional: Mobile version
//   // it('should perform voice search on mobile', () => {
//   //   cy.viewport('iphone-x');
//   //   cy.visit('https://raphacure.com', {
//   //     onBeforeLoad(win) {
//   //       setupSpeechRecognitionMock(win);
//   //     }
//   //   });
//   //   testVoiceSearch();
//   // });
// });
// describe('Voice Search - Desktop', () => {
//   const setupSpeechRecognitionMock = (win) => {
//   class MockSpeechRecognition {
//     constructor() {
//       this.onresult = null;
//       this.onstart = null;
//       this.onend = null;
//       this.lang = 'en-US';
//       this.continuous = false;
//       this.interimResults = false;
//     }

//     start() {
//       console.log('Mock SpeechRecognition started');

//       setTimeout(() => {
//         const event = {
//           results: [[{ transcript: 'Naveen Gowda', confidence: 0.99 }]],
//           resultIndex: 0,
//         };

//         // Dispatch to the handler set in the app
//         if (typeof this.onresult === 'function') {
//           console.log('Triggering onresult');
//           this.onresult(event);
//         }

//         if (typeof this.onend === 'function') this.onend();
//       }, 1000);
//     }

//     stop() {
//       console.log('Mock SpeechRecognition stopped');
//     }
//   }

//   win.SpeechRecognition = MockSpeechRecognition;
//   win.webkitSpeechRecognition = MockSpeechRecognition;
// };

//  const testVoiceSearch = () => {
//   cy.xpath("(//*[name()='svg'][@class='searchicon mic-icon'])[2]")
//     .should('be.visible')
//     .click();

//   cy.wait(1500);

//   // Check if input got the voice mock
//   cy.get('.search-input')
//     .should('have.value', 'Naveen Gowda');

//   // Assert that result appears
//   cy.contains('Naveen Gowda', { timeout: 5000 }).should('exist');
// };


//   it('should perform voice search on desktop', () => {
//     cy.viewport(1280, 800); // Desktop screen
//     cy.visit('https://raphacure.com', {
//       onBeforeLoad(win) {
//         setupSpeechRecognitionMock(win);
//       },
//     });
//     testVoiceSearch();
//   });
// });

