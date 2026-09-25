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

  it("Should fill form using data object", () => {
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    const userData = {
      Email: "exam10.basic@test.com",
      Password: "Exam1010",
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

  it("Should create and read new user in the Smart Table", () => {
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    const userData = {
      "First Name": "Alex",
      "Last Name": "Morgan",
      Username: "@alexqa",
      "E-mail": "alex.exam10@test.com",
      Age: "29",
    };

    const values = Object.values(userData);

    cy.get("thead tr")
      .last()
      .within(() => {
        cy.get(".nb-plus").click();
      });

    cy.get(".nb-checkmark")
      .closest("tr")
      .within(() => {
        for (const [key, value] of Object.entries(userData)) {
          cy.get(`input[placeholder="${key}"]`)
            .type(value)
            .should("have.value", value);
        }

        cy.get(".nb-checkmark").click();
      });

    cy.contains("tbody tr", userData["E-mail"]).within(() => {
      cy.get("td").each(($td, index) => {
        if (index > 1) {
          cy.wrap($td).should("have.text", values[index - 2]);
        }
      });
    });
  });
});
