/// <reference types="cypress"/>

describe("Daily Exam #10", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should fill Using the Grid form", () => {
    function getInputByLabel(label) {
      return cy
        .root()
        .contains("label", label)
        .closest(".form-group")
        .find("input");
    }

    function getRadioByLabel(label) {
      return cy
        .root()
        .contains("label", label)
        .closest("nb-radio")
        .find('input[type="radio"]');
    }

    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Using the Grid").should("be.visible");

    cy.contains("nb-card", "Using the Grid").within(() => {
      getInputByLabel("Email")
        .should("be.visible")
        .and("have.value", "")
        .type("exam10@test.com")
        .should("have.value", "exam10@test.com");

      getInputByLabel("Password")
        .should("be.visible")
        .and("have.value", "")
        .type("Cypress1010")
        .should("have.value", "Cypress1010");

      getRadioByLabel("Option 1")
        .should("be.visible")
        .and("be.enabled")
        .and("not.be.checked")
        .check({ force: true })
        .should("be.checked");

      getRadioByLabel("Option 2").should("be.enabled").and("not.be.checked");

      getRadioByLabel("Disabled Option")
        .should("be.disabled")
        .and("not.be.checked");

      getRadioByLabel("Option 2").check({ force: true }).should("be.checked");

      getRadioByLabel("Option 1").should("be.enabled").and("not.be.checked");

      cy.contains("button", "Sign in").should("be.visible").and("be.enabled");
    });
  });
});
