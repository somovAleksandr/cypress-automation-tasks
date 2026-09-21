/// <reference types="cypress" />

describe("ui-components", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should drag the first todo item to the prop list", () => {
    cy.contains("Extra Components").click();
    cy.contains("Drag & Drop").click();

    cy.get("#todo-list div").first().trigger("dragstart");
    cy.get("#drop-list").trigger("drop");

    cy.get("#drop-list").should("contain.text", "Get groceries");
  });
});
