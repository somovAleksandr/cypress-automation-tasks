/// <reference types="cypress" />

function verifyInput(selector) {
  cy.get(`input[placeholder="${selector}"]`).should("have.value", "");
}

function fillInput(selector, currentValue) {
  cy.get("thead tr")
    .eq(2)
    .find(`input[placeholder="${selector}"]`)
    .clear()
    .type(currentValue)
    .should("have.value", currentValue);
}

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

    verifyInput("ID");
    verifyInput("First Name");
    verifyInput("Last Name");
    verifyInput("Username");
    verifyInput("E-mail");
    verifyInput("Age");

    cy.get("tbody tr")
      .first()
      .within(() => {
        cy.get(".ng2-smart-action-edit-edit").should("exist").and("be.visible");
        cy.get(".ng2-smart-action-delete-delete")
          .should("exist")
          .and("be.visible");
      });

    cy.get("ng2-smart-table-pager")
      .find("ul li")
      .eq(0)
      .should("have.class", "disabled");
    cy.get("ng2-smart-table-pager")
      .find("ul li")
      .eq(1)
      .should("have.class", "disabled");

    const disabledIndexes = [0, 1];

    cy.get("ng2-smart-table-pager")
      .find("nav li")
      .each(($el, index) => {
        if (disabledIndexes.includes(index)) {
          cy.wrap($el).should("have.class", "disabled");
        } else {
          cy.wrap($el).should("not.be.visible");
        }
      });
  });

  it("Should allow user to add and delete a row", () => {
    cy.get("thead tr").eq(1).find("th.ng2-smart-actions-title-add").click();

    const inputPlaceholders = [
      "ID",
      "First Name",
      "Last Name",
      "Username",
      "E-mail",
      "Age",
    ];

    const currentValues = [
      999,
      "John",
      "Doe",
      "John777",
      "test@gmail.com",
      "25",
    ];

    for (let i = 0; i < inputPlaceholders.length; i++) {
      fillInput(inputPlaceholders[i], currentValues[i]);
    }

    cy.get("thead").find(".ng2-smart-action-add-create").click();

    cy.get("tbody tr")
      .first()
      .within(() => {
        for (let i = 0; i < inputPlaceholders.length; i++) {
          cy.contains("td", currentValues[i]).should("exist");
        }
      });

    cy.window().then((win) => {
      cy.stub(win, "confirm").as("dialog").returns(true);
    });

    cy.contains("999").closest("tr").find(".nb-trash").click();

    cy.get("@dialog").should("be.called");

    cy.contains("tbody tr", "999").should("not.exist");
  });
});
