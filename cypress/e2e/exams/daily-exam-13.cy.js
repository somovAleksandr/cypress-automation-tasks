/// <reference types="cypress"/>

describe("Exam #13", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should fill the form using data object", () => {
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

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

    const userData = {
      Email: "exam13@test.com",
      Password: "Cypress1313",
    };

    cy.contains("nb-card", "Using the Grid")
      .should("be.visible")
      .within(() => {
        getInputByLabel("Email")
          .should("have.value", "")
          .type(userData.Email)
          .should("have.value", userData.Email);

        getInputByLabel("Password")
          .should("have.value", "")
          .type(userData.Password)
          .should("have.value", userData.Password);

        getRadioByLabel("Option 2")
          .should("be.visible")
          .and("be.enabled")
          .and("not.be.checked")
          .check({ force: true })
          .should("be.checked");

        getRadioByLabel("Option 1").should("be.visible").and("not.be.checked");

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

        getRadioByLabel("Option 2").should("be.visible").and("not.be.checked");

        getRadioByLabel("Disabled Option")
          .should("be.visible")
          .and("be.disabled")
          .and("not.be.checked");

        cy.contains("button", "Sign in").should("be.visible").and("be.enabled");
      });
  });
});
