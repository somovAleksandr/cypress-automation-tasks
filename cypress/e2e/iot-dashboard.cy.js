/// <reference types="cypress" />

describe("Inline Form", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();
  });

  it("Should display Inline Form elements", () => {
    cy.contains("nb-card", "Inline form").within(() => {
      cy.verifyCardHeader("nb-card-header", "Inline form");

      cy.verifyPlaceholder("Jane Doe");
      cy.verifyPlaceholder("Email");

      cy.get('input[placeholder="Jane Doe"]').should("have.value", "");
      cy.get('input[placeholder="Email"]').should("have.value", "");

      cy.verifyCheckboxLABEL("Remember me");

      cy.verifyButton("Submit");
    });
  });

  it("Should allow user to fill Inline Form", () => {
    cy.contains("nb-card", "Inline form").within(() => {
      cy.get('input[placeholder="Jane Doe"]')
        .clear()
        .type("Jane Doe")
        .should("have.value", "Jane Doe");

      cy.get('input[placeholder="Email"]')
        .clear()
        .type("Jane@test.com")
        .should("have.value", "Jane@test.com");
    });
  });

  it("Should submit Inline form", () => {
    cy.contains("nb-card", "Inline form").within(() => {
      cy.get('input[placeholder="Jane Doe"]').as("nameINPUT");
      cy.get('input[placeholder="Email"]').as("emailINPUT");

      cy.get("@nameINPUT").clear().type("Jane Doe");
      cy.get("@emailINPUT").clear().type("Jane@test.com");

      cy.selectCHECKBOX("Remember me");

      cy.contains("button", "Submit").click();

      cy.get("@nameINPUT").should("have.value", "Jane Doe");
      cy.get("@emailINPUT").should("have.value", "Jane@test.com");
    });
  });
});
