/// <reference types="cypress"/>

describe("Daily Cypress Exam #02", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  //   it("Should display Smart Table rows and cells", () => {
  //     cy.contains("Tables & Data").click();
  //     cy.contains("Smart Table").click();

  //     cy.get("tbody tr").first().as("firstRow");

  //     cy.get("@firstRow").find("td").should("have.length", 7);

  //     cy.get("@firstRow")
  //       .find("td")
  //       .first()
  //       .within(() => {
  //         cy.get("i").eq(0).should("have.class", "nb-edit");
  //         cy.get("i").eq(1).should("have.class", "nb-trash");
  //       });

  //     cy.get("@firstRow")
  //       .find("td")
  //       .not(":first-child")
  //       .each(($cell) => {
  //         cy.wrap($cell).invoke("text").should("not.be.empty");
  //       });
  //   });

  it("Should add a new user and display it in the first row", () => {
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    cy.get("thead").find(".nb-plus").click();

    cy.get("thead")
      .find("tr")
      .last()
      .then((tableRow) => {
        cy.wrap(tableRow)
          .find('input[placeholder="First Name"]')
          .clear()
          .type("VERA KOROLEVA");

        cy.wrap(tableRow)
          .find('[placeholder="Last Name"]')
          .clear()
          .type("Anna KWIN");

        cy.wrap(tableRow).find(".nb-checkmark").click();
      });

    cy.get("tbody tr")
      .first()
      .then((tableRow) => {
        cy.wrap(tableRow).find("td").eq(2).should("have.text", "VERA KOROLEVA");
        cy.wrap(tableRow).find("td").eq(3).should("have.text", "Anna KWIN");
      });
  });
});
