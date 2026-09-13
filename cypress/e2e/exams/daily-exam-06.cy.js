/// <reference types="cypress"/>

describe("Daily Exam #6", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  function getInputByLabel(label) {
    return cy.root().contains(label).closest(".form-group").find("input");
  }

  it("Should fill the Using the Grid form", () => {
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Using the Grid").should("exist").and("be.visible");

    cy.contains("nb-card", "Using the Grid").within(() => {
      getInputByLabel("Email")
        .type("exam@test.com")
        .should("have.value", "exam@test.com");

      getInputByLabel("Password")
        .type("Exam12345")
        .should("have.value", "Exam12345");

      cy.contains("Option 2")
        .closest("nb-radio")
        .find('input[type="radio"]')
        .should("be.enabled")
        .check({ force: true })
        .should("be.checked");

      cy.contains("Option 1")
        .closest("nb-radio")
        .find('input[type="radio"]')
        .should("be.enabled")
        .and("not.be.checked");

      cy.contains("Disabled Option")
        .closest("nb-radio")
        .find('input[type="radio"]')
        .should("be.disabled")
        .and("not.be.checked");

      cy.contains("button", "Sign in").should("be.visible").and("be.enabled");
    });
  });
});
