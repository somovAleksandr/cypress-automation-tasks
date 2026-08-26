/// <reference types="cypress"/>

describe("Daily Cypress Exam #02", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should display Smart Table rows and cells", () => {
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    cy.get("tbody tr").first().as("firstRow");

    cy.get("@firstRow").find("td").should("have.length", 7);

    cy.get("@firstRow")
      .find("td")
      .first()
      .within(() => {
        cy.get("i").eq(0).should("have.class", "nb-edit");
        cy.get("i").eq(1).should("have.class", "nb-trash");
      });

    cy.get("@firstRow")
      .find("td")
      .not(":first-child")
      .each(($cell) => {
        cy.wrap($cell).invoke("text").should("not.be.empty");
      });
  });
});
