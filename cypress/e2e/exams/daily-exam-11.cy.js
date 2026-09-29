/// <reference types="cypress"/>

describe("Exam #11", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should fill form using data object", () => {
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

    const userData = {
      Email: "revision@test.com",
      Password: "Cypress2026",
    };

    cy.contains("nb-card", "Using the Grid")
      .should("be.visible")
      .within(() => {
        getInputByLabel("Email")
          .should("be.visible")
          .type(userData.Email)
          .should("have.value", userData.Email);

        getInputByLabel("Password")
          .should("be.visible")
          .type(userData.Password)
          .should("have.value", userData.Password);

        getRadioByLabel("Option 2")
          .should("be.visible")
          .and("be.enabled")
          .and("not.be.checked")
          .check({ force: true })
          .should("be.checked");

        getRadioByLabel("Option 1")
          .should("be.visible")
          .and("be.enabled")
          .and("not.be.checked");

        getRadioByLabel("Disabled Option")
          .should("be.visible")
          .and("be.disabled")
          .and("not.be.checked");

        getRadioByLabel("Option 1")
          .should("be.visible")
          .and("be.enabled")
          .and("not.be.checked")
          .check({ force: true })
          .should("be.checked");

        getRadioByLabel("Option 2")
          .should("be.visible")
          .and("be.enabled")
          .and("not.be.checked");

        getRadioByLabel("Disabled Option")
          .should("be.visible")
          .and("be.disabled")
          .and("not.be.checked");

        cy.contains("button", "Sign in").should("be.visible").and("be.enabled");
      });
  });

  it("Should fill form using data-driven method", () => {
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    const userData = {
      Email: "exam11@test.com",
      Password: "Automation11",
    };

    cy.contains("nb-card", "Basic form")
      .should("be.visible")
      .within(() => {
        for (const [key, value] of Object.entries(userData)) {
          cy.get(`input[placeholder="${key}"]`)
            .should("have.value", "")
            .type(value)
            .should("have.value", value);
        }

        cy.contains("label", "Check me out")
          .closest("nb-checkbox")
          .find('input[type="checkbox"]')
          .should("be.visible")
          .and("be.enabled")
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
