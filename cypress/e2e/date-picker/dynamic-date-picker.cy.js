/// <reference types="cypress" />

describe("Advanced Datepicker", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  function selectDateFromCurrentDay(days) {
    const date = new Date();

    date.setDate(date.getDate() + days);

    const futureDate = date.getDate();

    const futureMonth = date.toLocaleString("en-US", { month: "long" });
    const futureYear = String(date.getFullYear());

    cy.get("nb-calendar-view-mode")
      .invoke("text")
      .then((calendarMonthAndYear) => {
        if (
          !calendarMonthAndYear.includes(futureMonth) ||
          !calendarMonthAndYear.includes(futureYear)
        ) {
          cy.get('[data-name="chevron-right"]').click();
          selectDateFromCurrentDay(days);
        } else {
          cy.get(".day-cell")
            .not(".bounding-month")
            .contains(futureDate)
            .click();
        }
      });

    const expectedDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    return expectedDate;
  }

  it("Should select a future date independently", () => {
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();

    cy.contains("nb-card", "Common Datepicker").within(() => {
      cy.get("input").click();
    });

    const expectedDate = selectDateFromCurrentDay(35);

    cy.contains("nb-card", "Common Datepicker").within(() => {
      cy.get("input").should("have.value", expectedDate);
    });
  });
});
