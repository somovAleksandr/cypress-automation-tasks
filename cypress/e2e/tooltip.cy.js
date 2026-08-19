/// <reference types="cypress" />

describe("Tooltip", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.contains("Modal & Overlays").click();
    cy.contains("Tooltip").click();
  });

  it("Should display Tooltip elements", () => {
    cy.contains("nb-card", "Tooltip With Icon").within(() => {
      cy.get("nb-card-header").should("have.text", "Tooltip With Icon");

      cy.get("button").should("have.length", 2);

      cy.get("button").eq(0).should("have.text", "Show Tooltip");
      cy.get("button").eq(1).should("have.text", "Show Tooltip");
    });

    cy.contains("nb-card", "Tooltip Placements").within(() => {
      const buttons = ["Top", "Right", "Bottom", "Left"];

      cy.get("button").should("have.length", 4);

      cy.get("button").each(($el, index, $list) => {
        cy.wrap($el).should("have.text", buttons[index]);
      });
    });

    cy.contains("nb-card", "Colored Tooltips").within(() => {
      const buttons = [
        "Default",
        "Primary",
        "Success",
        "Danger",
        "Info",
        "Warning",
      ];

      cy.get("button").should("have.length", buttons.length);

      cy.get("button").each(($el, index, $list) => {
        cy.wrap($el).should("have.text", buttons[index]);
      });
    });
  });

  it("Should show tooltip on hover", () => {
    cy.contains("nb-card", "Tooltip With Icon").within(() => {
      cy.get("button").eq(0).trigger("mouseenter", { force: true });
      cy.document().find("nb-tooltip").should("have.text", "This is a tooltip");
      cy.document().find("nb-icon").should("exist");
      cy.get("button").eq(0).trigger("mouseleave", { force: true });
      cy.get("button").eq(1).trigger("mouseenter", { force: true });
      cy.document().find("nb-tooltip").should("have.text", "");
      cy.document().find("nb-tooltip").find("nb-icon").should("exist");
      cy.get("button").eq(1).trigger("mouseleave", { force: true });
    });
    cy.contains("nb-card", "Tooltip Placements").within(() => {
      cy.get("button").each(($el, index, $list) => {
        cy.wrap($el).trigger("mouseenter", { force: true });
        cy.document()
          .find("nb-tooltip")
          .should("have.text", "This is a tooltip");
        cy.wrap($el).trigger("mouseleave", { force: true });
      });
    });

    cy.contains("nb-card", "Colored Tooltips").within(() => {
      const buttonClasses = [
        "top",
        "status-primary",
        "status-success",
        "status-danger",
        "status-info",
        "status-warning",
      ];

      cy.get("button").each(($el, index, $list) => {
        cy.wrap($el).trigger("mouseenter", { force: true });

        cy.document()
          .find("nb-tooltip")
          .should("exist")
          .and("have.text", "This is a tooltip")
          .and("have.class", buttonClasses[index]);

        cy.wrap($el).trigger("mouseleave", { force: true });
      });
    });
  });
});
