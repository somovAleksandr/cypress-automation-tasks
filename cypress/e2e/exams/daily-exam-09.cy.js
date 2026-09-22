/// <reference types="cypress"/>

function getInputByLabel(label) {
  return cy.root().contains(label).closest(".form-group").find("input");
}

function getRadioByLabel(label) {
  return cy
    .root()
    .contains(label)
    .closest("nb-radio")
    .find('input[type="radio"]');
}

function getCheckboxByLabel(label) {
  return cy
    .root()
    .contains(label)
    .closest("nb-checkbox")
    .find('input[type="checkbox"]');
}

describe("Daily Exam #9", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should fill Using the Grid form", () => {
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Using the Grid").should("exist").and("be.visible");

    cy.contains("nb-card", "Using the Grid").within(() => {
      getInputByLabel("Email")
        .should("have.value", "")
        .type("exam9@test.com")
        .should("have.value", "exam9@test.com");

      getInputByLabel("Password")
        .should("have.value", "")
        .type("Cypress999")
        .should("have.value", "Cypress999");

      getRadioByLabel("Option 1")
        .should("be.enabled")
        .and("not.be.checked")
        .check({ force: true })
        .should("be.checked");

      getRadioByLabel("Option 2").should("be.enabled").and("not.be.checked");

      getRadioByLabel("Disabled Option")
        .should("be.disabled")
        .and("not.be.checked");

      getRadioByLabel("Option 2")
        .should("be.enabled")
        .and("not.be.checked")
        .check({ force: true })
        .should("be.checked");

      getRadioByLabel("Option 1").should("be.enabled").and("not.be.checked");

      cy.contains("button", "Sign in").should("be.visible").and("be.enabled");
    });
  });

  it("Should fill Inline Form using data object", () => {
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    const userData = {
      "Jane Doe": "Sarah Connor",
      Email: "sarah.exam9@test.com",
    };

    cy.contains("nb-card", "Inline form").should("be.visible");

    cy.contains("nb-card", "Inline form").within(() => {
      for (const [key, value] of Object.entries(userData)) {
        cy.get(`input[placeholder="${key}"]`)
          .type(value)
          .should("have.value", value);
      }

      getCheckboxByLabel("Remember me")
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

  it("Should create and read a new user", () => {
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    const userData = {
      "First Name": "Nina",
      "Last Name": "Stone",
      Username: "@ninaqa",
      "E-mail": "nina.exam9@test.com",
      Age: "27",
    };

    const values = Object.values(userData);

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
  });

  it("Should update and delete Larry's row in the Smart Table", () => {
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    cy.window().then((win) => {
      cy.stub(win, "confirm").as("dialog").returns(true);
    });

    const updatedData = {
      "First Name": "Lawrence",
      Age: "36",
    };

    cy.contains("tbody tr", "Larry").within(() => {
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

    cy.contains("tbody tr", "Lawrence").within(() => {
      cy.get("td").eq(2).should("have.text", updatedData["First Name"]);
      cy.get("td").last().should("have.text", updatedData.Age);

      cy.get(".nb-trash").click();
    });

    cy.get("@dialog").should("be.called");

    cy.contains("tbody tr", "Lawrence").should("not.exist");
  });

  it("Should filter table by Age", () => {
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    const ages = ["20", "30", "40", "200"];

    cy.wrap(ages).each((age) => {
      cy.get("thead tr")
        .last()
        .within(() => {
          cy.get('input[placeholder="Age"]').clear().type(age);
        });

      cy.wait(500);

      if (age === "200") {
        cy.get("tbody tr").should("contain.text", "No data found");
      } else {
        cy.get("tbody tr").each(($row) => {
          cy.wrap($row).find("td").last().should("have.text", age);
        });
      }
    });
  });

  it("Should select future date in the Datepicker", () => {
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();

    function selectFutureDate(days) {
      const date = new Date();

      date.setDate(date.getDate() + days);

      const futureDate = date.getDate();

      const futureMonthLong = date.toLocaleDateString("en-US", {
        month: "long",
      });
      const futureYear = String(date.getFullYear());

      cy.get("nb-calendar-view-mode")
        .invoke("text")
        .then((calendarMonthAndYear) => {
          if (
            calendarMonthAndYear.includes(futureMonthLong) &&
            calendarMonthAndYear.includes(futureYear)
          ) {
            cy.get(".day-cell")
              .not(".bounding-month")
              .contains(futureDate)
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

    const expectedDate = selectFutureDate(210);

    cy.contains("nb-card", "Common Datepicker").within(() => {
      cy.get("input").should("have.value", expectedDate);
    });
  });

  it("Should change temperature in the Temperature Slider", () => {
    cy.get('[tabtitle="Temperature"] circle').should("exist").and("be.visible");

    cy.get('[tabtitle="Temperature"] circle')
      .invoke("attr", "cx", "232.63")
      .should("have.attr", "cx", "232.63")
      .invoke("attr", "cy", "232.63")
      .should("have.attr", "cy", "232.63")
      .click();

    cy.get(".value.temperature.h1").should("contain.text", "30");
  });

  it("Should drag and drop item in the Drag & Drop card", () => {
    cy.contains("Extra Components").click();
    cy.contains("Drag & Drop").click();

    cy.get("#todo-list div").first().trigger("dragstart");

    cy.get("#drop-list").trigger("drop");

    cy.get("#todo-list").should("not.contain.text", "Get groceries");

    cy.get("#drop-list").should("contain.text", "Get groceries");
  });
});
