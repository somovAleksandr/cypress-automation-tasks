/// <reference types="cypress" />

describe("Smart-table", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();
  });

  it("Should display Smart Table elements", () => {
    cy.get("nb-card-header").should("have.text", " Smart Table ");

    const theadLabels = [
      "Actions",
      " ID ",
      " First Name ",
      " Last Name ",
      " Username ",
      " E-mail ",
      " Age ",
    ];

    cy.get("thead tr")
      .eq(0)
      .find("th")
      .each(($el, index, $list) => {
        cy.wrap($el).should("have.text", theadLabels[index]);
      });

    cy.get("thead tr")
      .eq(1)
      .find("th")
      .should("have.length", theadLabels.length);

    cy.get("thead tr")
      .eq(0)
      .find("th")
      .should("have.length", theadLabels.length);

    cy.get("tbody").find("tr").should("have.length", 10);

    cy.get("tbody")
      .find("tr")
      .each(($el, index, $list) => {
        cy.wrap($el).find("td").should("have.length", theadLabels.length);
      });

    cy.get("th.ng2-smart-actions-title-add").should("be.visible");

    for (const elem of theadLabels) {
      if (elem !== "Actions") {
        cy.checkEmptyInput(elem.trim());
      }
    }

    cy.get("tbody tr")
      .first()
      .within(() => {
        cy.get(".ng2-smart-action-edit-edit").should("exist").and("be.visible");
        cy.get(".ng2-smart-action-delete-delete")
          .should("exist")
          .and("be.visible");
      });
  });
});
