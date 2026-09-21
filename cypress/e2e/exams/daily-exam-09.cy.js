/// <reference types="cypress"/>

function getInputByLabel(label) {
  return cy.root().contains(label).closest(".form-group").find("input");
}

function getRadioByLabel(label) {
  return cy
    .root()
    .contains(label)
    .closest("nb-radio")
    .find('input[type="radio"]');
}

function getCheckboxByLabel(label) {
  return cy
    .root()
    .contains(label)
    .closest("nb-checkbox")
    .find('input[type="checkbox"]');
}

describe("Daily Exam #9", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should fill Using the Grid form", () => {
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Using the Grid").should("exist").and("be.visible");

    cy.contains("nb-card", "Using the Grid").within(() => {
      getInputByLabel("Email")
        .should("have.value", "")
        .type("exam9@test.com")
        .should("have.value", "exam9@test.com");

      getInputByLabel("Password")
        .should("have.value", "")
        .type("Cypress999")
        .should("have.value", "Cypress999");

      getRadioByLabel("Option 1")
        .should("be.enabled")
        .and("not.be.checked")
        .check({ force: true })
        .should("be.checked");

      getRadioByLabel("Option 2").should("be.enabled").and("not.be.checked");

      getRadioByLabel("Disabled Option")
        .should("be.disabled")
        .and("not.be.checked");

      getRadioByLabel("Option 2")
        .should("be.enabled")
        .and("not.be.checked")
        .check({ force: true })
        .should("be.checked");

      getRadioByLabel("Option 1").should("be.enabled").and("not.be.checked");

      cy.contains("button", "Sign in").should("be.visible").and("be.enabled");
    });
  });

  it("Should fill Inline Form using data object", () => {
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    const userData = {
      "Jane Doe": "Sarah Connor",
      Email: "sarah.exam9@test.com",
    };

    cy.contains("nb-card", "Inline form").should("be.visible");

    cy.contains("nb-card", "Inline form").within(() => {
      for (const [key, value] of Object.entries(userData)) {
        cy.get(`input[placeholder="${key}"]`)
          .type(value)
          .should("have.value", value);
      }

      getCheckboxByLabel("Remember me")
        .should("be.enabled")
        .and("not.be.checked")
        .check({ force: true })
        .should("be.checked");

      cy.contains("button", "Submit")
        .should("be.visible")
        .and("be.enabled")
        .click();

      for (const [key, value] of Object.entries(userData)) {
        cy.get(`input[placeholder="${key}"]`).should("have.value", value);
      }
    });
  });
});
