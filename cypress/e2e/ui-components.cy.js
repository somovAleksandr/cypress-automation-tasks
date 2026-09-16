/// <reference types="cypress" />

describe("Slider", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should change temperature using slider", () => {
    cy.get('[tabtitle="Temperature"] circle')
      .should("be.visible")
      .invoke("attr", "cx", "18.97")
      .invoke("attr", "cy", "89.86")
      .click();

    cy.get(".value.temperature.h1").should("contain.text", "17");
  });
});
