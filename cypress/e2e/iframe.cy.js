/// <reference types="cypress" />

describe("iFrame", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should interact with elements inside iframe", () => {
    cy.contains("Modal & Overlays").click();
    cy.contains("Dialog").click();

    function getIframeBody(selector) {
      return cy
        .get(selector)
        .its("0.contentDocument.body")
        .should("not.be.empty")
        .then(cy.wrap);
    }

    getIframeBody('[data-cy="esc-close-iframe"]')
      .contains("Open Dialog with esc close")
      .should("exist")
      .and("be.visible")
      .click();

    cy.contains("button", "Dismiss Dialog")
      .should("be.visible")
      .and("be.enabled")
      .click();

    cy.contains("button", "Dismiss Dialog").should("not.exist");
  });
});
