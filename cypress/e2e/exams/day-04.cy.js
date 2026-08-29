/// <reference types="cypress"/>

describe("Form Layouts", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();
  });

  it("Should display Using the Grid form correctly", () => {
    cy.contains("nb-card", "Using the Grid").within(() => {
      cy.get("nb-card-header").should("have.text", "Using the Grid");

      cy.contains("label", "Email").and("have.text", "Email");
      cy.contains("label", "Password")

        .and("have.text", "Password");
      cy.contains("label", "Radios").and("have.text", "Radios");

      cy.contains("Email")
        .closest(".form-group")
        .find("input")
        .should("have.attr", "placeholder", "Email");

      cy.contains("Password")
        .closest(".form-group")
        .find("input")
        .should("have.attr", "placeholder", "Password");

      cy.contains("Email")
        .closest(".form-group")
        .find("input")
        .should("have.value", "");

      cy.contains("Password")
        .closest(".form-group")
        .find("input")
        .should("have.value", "");

      cy.contains("Radios")
        .closest(".form-group")
        .find('input[type="radio"]')
        .then(($radios) => {
          expect($radios).to.have.length(3);
          expect($radios.not(":disabled")).to.have.length(2);
          expect($radios.filter(":disabled")).to.have.length(1);
        });

      cy.contains("Option 1")
        .closest("nb-radio")
        .find('[type="radio"]')
        .should("be.enabled")
        .and("not.be.checked");

      cy.contains("Option 2")
        .closest("nb-radio")
        .find('[type="radio"]')
        .should("be.enabled")
        .and("not.be.checked");

      cy.contains("Disabled Option")
        .closest("nb-radio")
        .find('[type="radio"]')
        .should("be.disabled")
        .and("be.checked");

      cy.contains("button", "Sign in").should("be.visible").and("be.enabled");
    });
  });

  it("Should fill and submit Using the Grid form", () => {
    cy.contains("nb-card", "Using the Grid").within(() => {
      cy.get('[data-cy="inputEmail1"]')
        .type("qa@test.com")
        .should("have.value", "qa@test.com");
      cy.get('[placeholder="Password"]')
        .type("123456")
        .should("have.value", "123456");

      cy.contains("Option 1")
        .closest("nb-radio")
        .find('[type="radio"]')
        .check({ force: true })
        .should("be.checked");

      cy.contains("Option 2")
        .closest("nb-radio")
        .find('[type="radio"]')
        .should("not.be.checked");

      cy.contains("Disabled Option")
        .closest("nb-radio")
        .find('[type="radio"]')
        .should("not.be.checked")
        .and("be.disabled");

      cy.contains("button", "Sign in").click();
    });
  });

  it("Should fill Inline form using user data object", () => {
    const userData = {
      "Jane Doe": "John Doe",
      Email: "john@test.com",
    };

    cy.contains("nb-card", "Inline form").within(() => {
      for (const [key, value] of Object.entries(userData)) {
        cy.get(`input[placeholder="${key}"]`)
          .type(value)
          .should("have.value", value);
      }
    });
  });
});
