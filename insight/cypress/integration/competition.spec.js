

describe("Testing Competition ", () => {
    it("Testing Name, username and participation argument page", () => {
        cy.visit('/competition/create')

        // Page will redirect to intro
        cy.url().should("include", '/intro')

        cy.get(".home").should("be.visible")

        cy.get('.login-btn').click()

        // Page will redirect to login
        cy.url().should("include", "/auth/login")

        cy.get(".account-input")
        .type('6392886167')

        cy.get(".password-input")
        .type("piyush@103")

        cy.get(".login-btn").click()

        cy.visit('/competition/create')

        // Image picker
        cy.get(".image-picker-btn").click()

        cy.get(".banner-image")
          .should("be.visible")
          .should("have.attr", "src")
        
        
        // Competition Tag
        cy.get(".tag-input")
        .type("jarden103")

        // Uniquness Flag
        cy.get(".done")
        .should("be.visible")

        cy.get(".clear")
        .should("not.be.visible")


        cy.get(".name-input")
        .type("Artistically")
           .should("have.value", 'Artistically')
        
        //Toggle Swtich
        cy.get(".toggle-switch")
          .should("be.visible")
        
        cy.get(".next-btn")
           .click()
        
        


        
    } )
})