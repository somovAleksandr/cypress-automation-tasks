/// <reference types="cypress"/>

describe("Daily Exam #8", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  function getInputByLabel(label) {
    return cy
      .root()
      .contains("label", label)
      .closest(".form-group")
      .find("input");
  }

  function getRadioByLabel(label) {
    return cy
      .root()
      .contains(label)
      .closest("nb-radio")
      .find('input[type="radio"]');
  }

  it("Should fill inputs in Using the Grid form", () => {
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Using the Grid").should("be.visible");

    cy.contains("nb-card", "Using the Grid").within(() => {
      getInputByLabel("Email")
        .type("exam8@test.com")
        .should("have.value", "exam8@test.com");
      getInputByLabel("Password")
        .type("Cypress888")
        .should("have.value", "Cypress888");

      getRadioByLabel("Option 2")
        .should("be.enabled")
        .and("not.be.checked")
        .check({ force: true })
        .should("be.checked");

      getRadioByLabel("Option 1").should("be.enabled").and("not.be.checked");

      getRadioByLabel("Disabled Option")
        .should("be.disabled")
        .and("not.be.checked");

      cy.contains("button", "Sign in").should("be.visible").and("be.enabled");
    });
  });

  it("Should fill and submit Basic form using object data", () => {
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    const userData = {
      Email: "exam8.basic@test.com",
      Password: "Basic888",
    };

    cy.contains("nb-card", "Basic form").should("be.visible");

    cy.contains("nb-card", "Basic form").within(() => {
      for (const [key, value] of Object.entries(userData)) {
        cy.get(`input[placeholder="${key}"]`)
          .type(value)
          .should("have.value", value);
      }

      cy.contains("Check me out")
        .closest("nb-checkbox")
        .find('input[type="checkbox"]')
        .should("be.enabled")
        .and("not.be.checked")
        .check({ force: true })
        .should("be.checked");

      cy.contains("button", "Submit")
        .should("be.visible")
        .and("be.enabled")
        .click();

      for (const [key, value] of Object.entries(userData)) {
        cy.get(`input[placeholder="${key}"]`).should("have.value", value);
      }
    });
  });

  it("Should complete CRUD flow for a Smart Table user", () => {
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    const userData = {
      "First Name": "Camila",
      "Last Name": "Jones",
      Username: "camaJones",
      "E-mail": "camila.exam8@test.com",
      Age: "34",
    };

    const values = Object.values(userData);

    const updatedData = {
      "First Name": "Monika",
      Age: "25",
    };

    cy.window().then((win) => {
      cy.stub(win, "confirm").as("dialog").returns(true);
    });

    cy.get("thead tr")
      .last()
      .within(() => {
        cy.get(".nb-plus").click();
      });

    cy.get(".nb-checkmark")
      .closest("tr")
      .within(() => {
        for (const [key, value] of Object.entries(userData)) {
          cy.get(`input[placeholder="${key}"]`)
            .type(value)
            .should("have.value", value);
        }
        cy.get(".nb-checkmark").click();
      });

    cy.contains("tbody tr", userData["E-mail"]).within(() => {
      cy.get("td").each(($td, index) => {
        if (index > 1) {
          cy.wrap($td).should("have.text", values[index - 2]);
        }
      });
    });

    cy.contains("tbody tr", userData["E-mail"]).within(() => {
      cy.get(".nb-edit").click();
    });

    cy.get(".nb-checkmark")
      .closest("tr")
      .within(() => {
        for (const [key, value] of Object.entries(updatedData)) {
          cy.get(`input[placeholder="${key}"]`)
            .clear()
            .type(value)
            .should("have.value", value);
        }
        cy.get(".nb-checkmark").click();
      });

    cy.contains("tbody tr", userData["E-mail"]).within(() => {
      cy.get("td").eq(2).should("have.text", updatedData["First Name"]);
      cy.get("td").last().should("have.text", updatedData.Age);
    });

    cy.contains("tbody tr", userData["E-mail"]).within(() => {
      cy.get(".nb-trash").click();
    });

    cy.get("@dialog").should("be.called");

    cy.contains("tbody tr", userData["E-mail"]).should("not.exist");
  });

  it("Should filter and delete row by first name in the Smart Table", () => {
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    cy.window().then((win) => {
      cy.stub(win, "confirm").as("dialog").returns(true);
    });

    cy.get("thead tr")
      .last()
      .within(() => {
        cy.get('input[placeholder="First Name"]').type("Ruben");
      });

    cy.wait(500);

    cy.get("tbody tr").each(($row) => {
      cy.wrap($row).find("td").eq(2).should("have.text", "Ruben");
    });

    cy.contains("tbody tr", "Ruben").within(() => {
      cy.get(".nb-trash").click();
    });

    cy.get("@dialog").should("be.called");

    cy.contains("tbody tr", "Ruben").should("not.exist");

    cy.get("tbody tr").should("contain.text", "No data found");
  });

  it("Should select a future date in the Datepicker", () => {
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();

    function selectFutureDate(days) {
      const date = new Date();

      date.setDate(date.getDate() + days);

      const futureDay = date.getDate();

      const futureMonth = date.toLocaleDateString("en-US", { month: "long" });
      const futureYear = String(date.getFullYear());

      cy.get("nb-calendar-view-mode")
        .invoke("text")
        .then((calendarMonthAndYear) => {
          if (
            calendarMonthAndYear.includes(futureMonth) &&
            calendarMonthAndYear.includes(futureYear)
          ) {
            cy.get(".day-cell")
              .not(".bounding-month")
              .contains(futureDay)
              .click();
          } else {
            cy.get('[data-name="chevron-right"]').click();
            selectFutureDate(days);
          }
        });

      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }

    cy.contains("nb-card", "Common Datepicker").within(() => {
      cy.get("input").click();
    });

    const expectedDate = selectFutureDate(150);

    cy.contains("nb-card", "Common Datepicker").within(() => {
      cy.get("input").should("have.value", expectedDate);
    });
  });

  it("Should change temperature in the Temperature Slider", () => {
    cy.get('[tabtitle="Temperature"] circle')
      .should("exist")
      .and("be.visible")
      .invoke("attr", "cx", "112.76")
      .should("have.attr", "cx", "112.76")
      .invoke("attr", "cy", "11.86")
      .should("have.attr", "cy", "11.86")
      .click();

    cy.get(".value.temperature.h1").should("contain.text", "20");
  });
});
