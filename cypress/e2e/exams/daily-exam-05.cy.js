/// <reference types="cypress"/>

describe("Daily exam #5", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should validate Basic form UI", () => {
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Basic form").should("be.visible").and("exist");

    cy.contains("nb-card", "Basic form").within(() => {
      cy.contains("Email address")
        .closest(".form-group")
        .find("input")
        .as("emailInput");

      cy.contains("Password")
        .closest(".form-group")
        .find("input")
        .as("passwordInput");

      cy.get("nb-card-header").should("have.text", "Basic form");

      cy.contains("label", "Email address").should("exist").and("be.visible");
      cy.contains("label", "Password").should("exist").and("be.visible");
      cy.contains("label", "Check me out").should("exist").and("be.visible");

      cy.get("@emailInput").should("have.attr", "placeholder", "Email");
      cy.get("@passwordInput").should("have.attr", "placeholder", "Password");

      cy.get("@emailInput").should("have.value", "");
      cy.get("@passwordInput").should("have.value", "");

      cy.contains("Check me out")
        .closest("nb-checkbox")
        .should("be.visible")
        .find('input[type="checkbox"]')
        .should("exist")
        .and("be.enabled")
        .and("not.be.checked");

      cy.contains("button", "Submit").should("be.visible").and("be.enabled");
    });
  });

  it("Should allow the user to fill out and submit the Basic Form", () => {
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Basic form").within(() => {
      cy.get("#exampleInputEmail1").as("emailInput");
      cy.get("#exampleInputPassword1").as("passwordInput");

      cy.get("@emailInput")
        .type("qa.auto@test.com")
        .should("have.value", "qa.auto@test.com");
      cy.get("@passwordInput")
        .type("Test12345")
        .should("have.value", "Test12345");

      cy.contains("Check me out")
        .closest("nb-checkbox")
        .find('input[type="checkbox"]')
        .check({ force: true })
        .should("be.checked");

      cy.contains("button", "Submit")
        .scrollIntoView()
        .should("be.visible")
        .and("be.enabled")
        .click();

      cy.get("@emailInput").should("have.value", "qa.auto@test.com");
      cy.get("@passwordInput").should("have.value", "Test12345");
    });
  });

  it("Should fill and submit Inline form using object data", () => {
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Inline form").within(() => {
      const userData = {
        "Jane Doe": "Michael Brown",
        Email: "test@mail.com",
      };

      for (const [key, value] of Object.entries(userData)) {
        cy.get(`input[placeholder="${key}"]`)
          .type(value)
          .should("have.value", value);
      }

      cy.contains("Remember me")
        .closest("nb-checkbox")
        .find('input[type="checkbox"]')
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

  it("Should validate Larry's row in the Smart Table", () => {
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    const expectedData = [
      "3",
      "Larry",
      "Bird",
      "@twitter",
      "twitter@outlook.com",
      "18",
    ];

    cy.contains("tbody tr", "Larry").within(() => {
      cy.get("td").each(($td, index) => {
        if (index > 0) {
          cy.wrap($td).should("have.text", expectedData[index - 1]);
        }
      });
    });
  });
});
