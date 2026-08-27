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
});
