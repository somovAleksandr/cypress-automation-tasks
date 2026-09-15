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

  it("Should fill and submit Inline form from using object data", () => {
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    const userData = {
      "Jane Doe": "Robert QA",
      Email: "robert.qa@test.com",
    };

    cy.contains("nb-card", "Inline form").within(() => {
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

  it("Should create, update and detele a  user using object data", () => {
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    const userData = {
      "First Name": "Vera",
      "Last Name": "Koroleva",
      Username: "VeraQueen",
      "E-mail": "vera@gmail.com",
      Age: "10",
    };

    const updatedData = {
      "First Name": "Verusha",
      Age: "11",
    };

    const values = Object.values(userData);

    cy.get("thead").within(() => {
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

    cy.contains("tbody tr", userData["E-mail"]).within(() => {
      cy.get(".nb-edit").click();
    });

    cy.get(".nb-checkmark")
      .closest("tr")
      .within(() => {
        for (const [key, value] of Object.entries(updatedData)) {
          cy.get(`input[placeholder="${key}"]`)
            .clear()
            .type(value)
            .should("have.value", value);
        }

        cy.get(".nb-checkmark").click();
      });

    cy.contains("tbody tr", userData["E-mail"]).within(() => {
      cy.get("td").eq(2).should("have.text", updatedData["First Name"]);
      cy.get("td").last().should("have.text", updatedData.Age);
    });

    cy.window().then((win) => {
      cy.stub(win, "confirm").as("dialog").returns(true);
    });

    cy.contains("tbody tr", userData["E-mail"]).within(() => {
      cy.get(".nb-trash").click();
    });

    cy.get("@dialog").should("be.called");

    cy.contains("tbody tr", userData["E-mail"]).should("not.exist");
  });

  it("Should filter and delete Ruben by first name", () => {
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    cy.get("thead tr")
      .last()
      .within(() => {
        cy.get('input[placeholder="First Name"]').type("Ruben");
      });

    cy.wait(500);

    cy.get("tbody tr").each(($row) => {
      cy.wrap($row).find("td").eq(2).should("have.text", "Ruben");
    });

    cy.contains("tbody tr", "Ruben").should("be.visible");

    cy.window().then((win) => {
      cy.stub(win, "confirm").as("dialog").returns(true);
    });

    cy.contains("tbody tr", "Ruben").within(() => {
      cy.get(".nb-trash").click();
    });

    cy.get("@dialog").should("be.called");

    cy.get("tbody tr").should("contain.text", "No data found");
  });
});
