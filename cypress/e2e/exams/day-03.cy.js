/// <reference types="cypress"/>

describe("Daily practice routine", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Task #1", () => {
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    cy.get("nb-card-header")
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.equal("Smart Table");
      });

    const tableHeadersText = [
      "Actions",
      "ID",
      "First Name",
      "Last Name",
      "Username",
      "E-mail",
      "Age",
    ];

    cy.get("thead tr")
      .first()
      .within(() => {
        cy.get("th").each(($th, index) => {
          cy.wrap($th)
            .invoke("text")
            .then((text) => {
              expect(text.trim()).to.equal(tableHeadersText[index]);
            });
        });
      });

    cy.get("tbody tr").should("exist");

    cy.get("tbody tr").each(($row) => {
      cy.wrap($row).find("td").should("have.length", tableHeadersText.length);
    });
  });

  it("Task #2", () => {
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    const userData = [
      "3",
      "Larry",
      "Bird",
      "@twitter",
      "twitter@outlook.com",
      "18",
    ];

    cy.get("tbody")
      .contains("tr", "Larry")
      .within(() => {
        cy.get("td").each(($td, index) => {
          if (index > 0) {
            cy.wrap($td).should("have.text", userData[index - 1]);
          }
        });
      });
  });

  it("Task #3", () => {
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    const userData = ["John", "Test", "@johnqa", "john@test.com", "25"];

    cy.get(".nb-plus").click();

    cy.get("thead tr")
      .last()
      .within(() => {
        cy.get('input[placeholder="First Name"]').type(userData[0]);
        cy.get('input[placeholder="Last Name"]').type(userData[1]);
        cy.get('input[placeholder="Username"]').type(userData[2]);
        cy.get('input[placeholder="E-mail"]').type(userData[3]);
        cy.get('input[placeholder="Age"]').type(userData[4]);

        cy.get(".nb-checkmark").click();
      });

    cy.get("tbody")
      .contains("tr", "john@test.com")
      .within(() => {
        cy.get("td").each(($td, index) => {
          if (index > 1) {
            cy.wrap($td).should("have.text", userData[index - 2]);
          }
        });
      });
  });

  it("Task #4", () => {
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    cy.get("tbody")
      .contains("tr", "Larry")
      .then((tableRow) => {
        cy.wrap(tableRow).find(".nb-edit").click();

        cy.wrap(tableRow)
          .find("td")
          .last()
          .find('[placeholder="Age"]')
          .clear()
          .type("35");

        cy.wrap(tableRow).find(".nb-checkmark").click();
      });

    cy.get("tbody")
      .contains("tr", "Larry")
      .within(() => {
        cy.get("td").last().should("have.text", "35");
      });
  });
});
