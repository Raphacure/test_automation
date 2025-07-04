


describe('Top Categorys visbility',()=>{
    beforeEach(() => {
        cy.viewport(1480, 900);
      });
    it('Top Category Headding visible or not ',()=>{
        cy.visit('https://raphacure.com/');
        cy.get('#top-category-heading').should('be.visible').should('contain','Top Category')

    
    })
     it('Top Category Carts visible or not ',()=>{
        cy.visit('https://raphacure.com/');
        cy.get('.our-services-all').should('be.visible')

    })
    it('Top Category Cart section visible or not ',()=>{
        cy.visit('https://raphacure.com/');
        cy.get('.our-services-all').should('be.visible')

    })
    it('Top Category  Doctor Consultation visible or not ',()=>{
        cy.visit('https://raphacure.com/');
        cy.get('.our-services-all [index="0"]').should('be.visible')
        cy.get('.category').should('contain','Doctor Consultation')

    })
    it('Top Category  Pharmacy visible or not ',()=>{
        cy.visit('https://raphacure.com/');
        cy.get('.our-services-all [index="1"]').should('be.visible')
        cy.get('.category').should('contain','Pharmacy')

    })
     it('Top Category  Labtest visible or not ',()=>{
        cy.visit('https://raphacure.com/');
        cy.get('.our-services-all [index="2"]').should('be.visible')
        cy.get('.category').should('contain','Labtest')

    })
     it('Top Category  Radiology visible or not ',()=>{
        cy.visit('https://raphacure.com/');
        cy.get('.our-services-all [index="3"]').eq(0).scrollIntoView().should('be.visible');
        cy.get('.category').should('contain','Radiology')

    })

})
describe('To category are Redirect or not',()=>{
    it('Doctor Consultation Redirection',()=>{
        cy.visit('https://raphacure.com/')
        // cy.get('.our-services-all [index="0"]').eq(1).click();
        cy.get('.home-page-card').filter(':visible').eq(0).scrollIntoView().click();
        cy.url().should('include','https://raphacure.com/doctor')
        cy.wait(3000);
    })
     it('Pharmacy Redirection',()=>{
        cy.visit('https://raphacure.com/')
        // cy.get('.our-services-all [index="0"]').eq(1).click();
        cy.get('.home-page-card').filter(':visible').eq(1).scrollIntoView().click();
        cy.url().should('include','https://raphacure.com/pharmacy')
           cy.wait(3000);
    })
     it('Labtest Redirection',()=>{
        cy.visit('https://raphacure.com/')
        // cy.get('.our-services-all [index="0"]').eq(1).click();
        cy.get('.home-page-card').filter(':visible').eq(2).scrollIntoView().click();
        cy.url().should('include','https://raphacure.com/labtest')
        cy.wait(3000);
    })
     it('Radiology  Redirection',()=>{
        cy.visit('https://raphacure.com/')
       cy.contains('.home-page-card', 'Radiology').scrollIntoView().click();

        cy.url().should('include', 'https://raphacure.com/radiology');
        cy.wait(3000); 
      })
})