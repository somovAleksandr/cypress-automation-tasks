/// <reference types="cypress"/>

describe("Daily Exam #8", () => {
  beforeEach(() => {
    cy.visit("/");
  });

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
      .contains(label)
      .closest("nb-radio")
      .find('input[type="radio"]');
  }

  it("Should fill inputs in Using the Grid form", () => {
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Using the Grid").should("be.visible");

    cy.contains("nb-card", "Using the Grid").within(() => {
      getInputByLabel("Email")
        .type("exam8@test.com")
        .should("have.value", "exam8@test.com");
      getInputByLabel("Password")
        .type("Cypress888")
        .should("have.value", "Cypress888");

      getRadioByLabel("Option 2")
        .should("be.enabled")
        .and("not.be.checked")
        .check({ force: true })
        .should("be.checked");

      getRadioByLabel("Option 1").should("be.enabled").and("not.be.checked");

      getRadioByLabel("Disabled Option")
        .should("be.disabled")
        .and("not.be.checked");

      cy.contains("button", "Sign in").should("be.visible").and("be.enabled");
    });
  });

  it("Should fill and submit Basic form using object data", () => {
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    const userData = {
      Email: "exam8.basic@test.com",
      Password: "Basic888",
    };

    cy.contains("nb-card", "Basic form").should("be.visible");

    cy.contains("nb-card", "Basic form").within(() => {
      for (const [key, value] of Object.entries(userData)) {
        cy.get(`input[placeholder="${key}"]`)
          .type(value)
          .should("have.value", value);
      }

      cy.contains("Check me out")
        .closest("nb-checkbox")
        .find('input[type="checkbox"]')
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
