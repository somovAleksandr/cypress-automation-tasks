/// <reference types="cypress"/>

describe("Daily Exam #10", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should fill Using the Grid form", () => {
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
        .contains("label", label)
        .closest("nb-radio")
        .find('input[type="radio"]');
    }

    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Using the Grid").should("be.visible");

    cy.contains("nb-card", "Using the Grid").within(() => {
      getInputByLabel("Email")
        .should("be.visible")
        .and("have.value", "")
        .type("exam10@test.com")
        .should("have.value", "exam10@test.com");

      getInputByLabel("Password")
        .should("be.visible")
        .and("have.value", "")
        .type("Cypress1010")
        .should("have.value", "Cypress1010");

      getRadioByLabel("Option 1")
        .should("be.visible")
        .and("be.enabled")
        .and("not.be.checked")
        .check({ force: true })
        .should("be.checked");

      getRadioByLabel("Option 2").should("be.enabled").and("not.be.checked");

      getRadioByLabel("Disabled Option")
        .should("be.disabled")
        .and("not.be.checked");

      getRadioByLabel("Option 2").check({ force: true }).should("be.checked");

      getRadioByLabel("Option 1").should("be.enabled").and("not.be.checked");

      cy.contains("button", "Sign in").should("be.visible").and("be.enabled");
    });
  });

  it("Should fill form using data object", () => {
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    const userData = {
      Email: "exam10.basic@test.com",
      Password: "Exam1010",
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

  it("Should create and read new user in the Smart Table", () => {
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    const userData = {
      "First Name": "Alex",
      "Last Name": "Morgan",
      Username: "@alexqa",
      "E-mail": "alex.exam10@test.com",
      Age: "29",
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

  it("Should update and delete row in the Smart Table", () => {
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    const updatedData = {
      "First Name": "Lawrence",
      Age: "36",
    };

    cy.window().then((win) => {
      cy.stub(win, "confirm").as("dialog").returns(true);
    });

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

    cy.contains("tbody tr", updatedData["First Name"]).within(() => {
      cy.get("td").eq(2).should("have.text", updatedData["First Name"]);
      cy.get("td").last().should("have.text", updatedData.Age);

      cy.get(".nb-trash").click();
    });

    cy.get("@dialog").should("be.called");

    cy.contains("tbody tr", updatedData["First Name"]).should("not.exist");
  });

  it("Should filter table by age", () => {
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    const ages = ["20", "30", "40", "200"];

    cy.wrap(ages).each((age) => {
      cy.get("thead tr")
        .last()
        .find('input[placeholder="Age"]')
        .clear()
        .type(age)
        .should("have.value", age);

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
      const futureLongMonth = date.toLocaleDateString("en-US", {
        month: "long",
      });
      const futureYear = String(date.getFullYear());

      cy.get("nb-calendar-view-mode")
        .invoke("text")
        .then((calendarMonthAndYear) => {
          if (
            calendarMonthAndYear.includes(futureLongMonth) &&
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
    cy.get('[tabtitle="Temperature"] circle')
      .invoke("attr", "cx", "60.25")
      .should("have.attr", "cx", "60.25")
      .invoke("attr", "cy", "36.07")
      .should("have.attr", "cy", "36.07")
      .click();

    cy.get(".value.temperature.h1").should("contain.text", "19");
  });

  it.only("Should drag and drop element in the Extra components", () => {
    cy.contains("Extra Components").click();
    cy.contains("Drag & Drop").click();

    cy.contains("#todo-list div", "Clean my room").trigger("dragstart");

    cy.get("#drop-list").trigger("drop");

    cy.get("#todo-list").should("not.contain", "Clean my room");

    cy.get("#drop-list").should("contain.text", "Clean my room");
  });
});
