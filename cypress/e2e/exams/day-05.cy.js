/// <reference types="cypress"/>

describe("Date picker", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should select a dynamic future date", () => {
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();

    const date = new Date();

    date.setDate(date.getDate() + 5);

    const futureDay = date.getDate();

    const expectedDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    cy.get('[placeholder="Form Picker"]').then(($input) => {
      cy.wrap($input).click();

      cy.get(".day-cell").not(".bounding-month").contains(futureDay).click();

      cy.wrap($input).should("have.value", expectedDate);
    });
  });
});
