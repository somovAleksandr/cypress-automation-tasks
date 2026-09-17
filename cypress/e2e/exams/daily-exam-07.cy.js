/// <reference types="cypress"/>

function findInputByLabel(label) {
  return cy.root().contains(label).closest(".form-group").find("input");
}

function findRadioByLabel(label) {
  return cy
    .root()
    .contains(label)
    .closest("nb-radio")
    .find('input[type="radio"]');
}

function findCheckboxByLabel(label) {
  return cy
    .root()
    .contains(label)
    .closest("nb-checkbox")
    .find('input[type="checkbox"]');
}

function selectFutureDate(days) {
  const date = new Date();

  date.setDate(date.getDate() + days);

  const futureDate = date.getDate();

  const futureMonthLong = date.toLocaleDateString("en-US", { month: "long" });
  const futureYear = String(date.getFullYear());

  cy.get("nb-calendar-view-mode")
    .invoke("text")
    .then((calendarMonthAndYear) => {
      if (
        calendarMonthAndYear.includes(futureMonthLong) &&
        calendarMonthAndYear.includes(futureYear)
      ) {
        cy.get(".day-cell").not(".bounding-month").contains(futureDate).click();
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

describe("Exam #7", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should find and fill the Using the Grid form", () => {
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Using the Grid").should("be.visible");

    cy.contains("nb-card", "Using the Grid").within(() => {
      findInputByLabel("Email")
        .type("exam7@test.com")
        .should("have.value", "exam7@test.com");

      findInputByLabel("Password")
        .type("Cypress777")
        .should("have.value", "Cypress777");

      findRadioByLabel("Option 1")
        .should("be.enabled")
        .and("not.be.checked")
        .check({ force: true })
        .should("be.checked");

      findRadioByLabel("Option 2").should("be.enabled").and("not.be.checked");

      findRadioByLabel("Disabled Option")
        .should("be.disabled")
        .and("not.be.checked");

      cy.contains("button", "Sign in").should("be.visible").and("be.enabled");
    });
  });

  it("Should fill Basic form using data from an Object", () => {
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    const userData = {
      Email: "exam7.basic@test.com",
      Password: "Test77777",
    };

    cy.contains("nb-card", "Basic form").should("be.visible");

    cy.contains("nb-card", "Basic form").within(() => {
      for (const [key, value] of Object.entries(userData)) {
        cy.get(`input[placeholder="${key}"]`)
          .type(value)
          .should("have.value", value);
      }

      findCheckboxByLabel("Check me out")
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

  it("Should create and validate a new user using in the Smart Table", () => {
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    const userData = {
      "First Name": "Liam",
      "Last Name": "Walker",
      Username: "@liamqa",
      "E-mail": "liam.qa@test.com",
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

    cy.contains("tbody tr", userData["E-mail"])
      .should("exist")
      .within(() => {
        cy.get("td").each(($td, index) => {
          if (index > 1) {
            cy.wrap($td).should("have.text", values[index - 2]);
          }
        });
      });
  });

  it("Should update and delete data in the Smart Table", () => {
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    const updatedData = {
      "First Name": "Lawrence",
      Age: "35",
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

    cy.contains("tbody tr", updatedData["First Name"]).should("exist");

    cy.contains("tbody tr", updatedData["First Name"]).within(() => {
      cy.get("td").eq(2).should("have.text", updatedData["First Name"]);
      cy.get("td").last().should("have.text", updatedData.Age);

      cy.get(".nb-trash").click();
    });

    cy.get("@dialog").should("be.called");

    cy.contains("tbody tr", updatedData["First Name"]).should("not.exist");
  });

  it.only("Should select future date in the Datepicker", () => {
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();

    cy.contains("nb-card", "Common Datepicker").within(() => {
      cy.get("input").click();
    });

    const expectedDate = selectFutureDate(120);

    cy.contains("nb-card", "Common Datepicker").within(() => {
      cy.get("input").should("have.value", expectedDate);
    });
  });
});
