/// <reference types="cypress"/>

describe("Daily Cypress Exam # 12", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should fill the form using the data from data object", () => {
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

    const userData = {
      Email: "weekly12@test.com",
      Password: "Cypress1212",
    };

    cy.contains("nb-card", "Using the Grid")
      .should("be.visible")
      .within(() => {
        getInputByLabel("Email")
          .should("have.value", "")
          .type(userData.Email)
          .should("have.value", userData.Email);

        getInputByLabel("Password")
          .should("have.value", "")
          .type(userData.Password)
          .should("have.value", userData.Password);

        getRadioByLabel("Option 1")
          .should("be.visible")
          .and("be.enabled")
          .and("not.be.checked")
          .check({ force: true })
          .should("be.checked");

        getRadioByLabel("Option 2")
          .should("be.visible")
          .and("be.enabled")
          .and("not.be.checked");

        getRadioByLabel("Option 2")
          .should("be.visible")
          .and("be.enabled")
          .and("not.be.checked")
          .check({ force: true })
          .should("be.checked");

        getRadioByLabel("Option 1")
          .should("be.visible")
          .and("be.enabled")
          .and("not.be.checked");

        getRadioByLabel("Disabled Option")
          .should("be.disabled")
          .and("not.be.checked");

        cy.contains("button", "Sign in").should("be.visible").and("be.enabled");
      });
  });

  it("should fill the form using data-driven method", () => {
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    const userData = {
      Email: "exam12.basic@test.com",
      Password: "CypressBasic12",
    };

    cy.contains("nb-card", "Basic form")
      .should("be.visible")
      .within(() => {
        for (const [key, value] of Object.entries(userData)) {
          cy.get(`input[placeholder="${key}"]`)
            .type(value)
            .should("have.value", value);
        }

        cy.contains("label", "Check me out")
          .closest("nb-checkbox")
          .find('input[type="checkbox"]')
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

  it("should create and read new user in the Smart Table", () => {
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    const userData = {
      "First Name": "Chris",
      "Last Name": "Walker",
      Username: "@chrisqa",
      "E-mail": "chris.exam12@test.com",
      Age: "28",
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

  it("should update and delete user in the Smart Table", () => {
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    cy.window().then((win) => {
      cy.stub(win, "confirm").as("dialog").returns(true);
    });

    const updatedData = {
      "First Name": "Lawrence",
      Age: "39",
    };

    cy.contains("tbody tr", "Larry")
      .should("be.visible")
      .within(() => {
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

      cy.get("@dialog").should("be.called");
    });

    cy.contains("tbody tr", updatedData["First Name"]).should("not.exist");
  });

  it("should filter the table by age", () => {
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    const ages = ["20", "30", "40", "200"];

    cy.wrap(ages).each((age) => {
      cy.get("thead tr")
        .last()
        .within(() => {
          cy.get('input[placeholder="Age"]')
            .clear()
            .type(age)
            .should("have.value", age);
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

  it("should select future date in the Datepicker", () => {
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

    const expectedDate = selectFutureDate(210);

    cy.contains("nb-card", "Common Datepicker").within(() => {
      cy.get("input").should("have.value", expectedDate);
    });
  });

  it("should change temperature in the Temperature Slider", () => {
    cy.get('[tabtitle="Temperature"] circle')
      .invoke("attr", "cx", "54.92230566874597")
      .should("have.attr", "cx", "54.92230566874597")
      .invoke("attr", "cy", "40.38681850639592")
      .should("have.attr", "cy", "40.38681850639592")
      .click();

    cy.get(".value.temperature.h1").should("contain.text", "18");
  });

  it("should drag and drop element", () => {
    cy.contains("Extra Components").click();
    cy.contains("Drag & Drop").click();

    cy.contains('[id="todo-list"] div', "Get groceries").trigger("dragstart");

    cy.get('[id="drop-list"]').trigger("drop");

    cy.get('[id="todo-list"]').should("not.contain.text", "Get groceries");

    cy.get('[id="drop-list"]').should("contain.text", "Get groceries");
  });
});
