/// <reference types="cypress"/>

describe("Daily practice routine", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Task #1", () => {
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    cy.get("nb-card-header")
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.equal("Smart Table");
      });

    const tableHeadersText = [
      "Actions",
      "ID",
      "First Name",
      "Last Name",
      "Username",
      "E-mail",
      "Age",
    ];

    cy.get("thead tr")
      .first()
      .within(() => {
        cy.get("th").each(($th, index) => {
          cy.wrap($th)
            .invoke("text")
            .then((text) => {
              expect(text.trim()).to.equal(tableHeadersText[index]);
            });
        });
      });

    cy.get("tbody tr").should("exist");

    cy.get("tbody tr").each(($row) => {
      cy.wrap($row).find("td").should("have.length", tableHeadersText.length);
    });
  });

  it("Task #2", () => {
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    const userData = [
      "3",
      "Larry",
      "Bird",
      "@twitter",
      "twitter@outlook.com",
      "18",
    ];

    cy.get("tbody")
      .contains("tr", "Larry")
      .within(() => {
        cy.get("td").each(($td, index) => {
          if (index > 0) {
            cy.wrap($td).should("have.text", userData[index - 1]);
          }
        });
      });
  });

  it("Should create a new user and validate table row data", () => {
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    const userData = {
      "First Name": "John",
      "Last Name": "Test",
      Username: "@johnqa",
      "E-mail": "john@test.com",
      Age: "25",
    };

    cy.get(".nb-plus").click();

    cy.get("thead tr")
      .last()
      .within(() => {
        for (const [key, value] of Object.entries(userData)) {
          cy.get(`input[placeholder="${key}"]`).type(value);
        }

        cy.get(".nb-checkmark").click();
      });

    const values = Object.values(userData);

    cy.get("tbody")
      .contains("tr", userData["E-mail"])
      .within(() => {
        cy.get("td").each(($td, index) => {
          if (index > 1) {
            const dataIndex = index - 2;

            cy.wrap($td).should("have.text", values[dataIndex]);
          }
        });
      });
  });

  it("Task #4", () => {
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    cy.get("tbody")
      .contains("tr", "Larry")
      .then((tableRow) => {
        cy.wrap(tableRow).find(".nb-edit").click();

        cy.wrap(tableRow)
          .find("td")
          .last()
          .find('[placeholder="Age"]')
          .clear()
          .type("35");

        cy.wrap(tableRow).find(".nb-checkmark").click();
      });

    cy.get("tbody")
      .contains("tr", "Larry")
      .within(() => {
        cy.get("td").last().should("have.text", "35");
      });
  });

  it("Task #5", () => {
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    cy.window().then((win) => {
      cy.stub(win, "confirm").as("dialog").returns(true);
    });

    cy.get("tbody")
      .contains("tr", "Ruben")
      .then((tableRow) => {
        cy.wrap(tableRow).find(".nb-trash").click();

        cy.get("@dialog").should("be.called");
      });

    cy.get("tbody").contains("tr", "Ruben").should("not.exist");
  });

  it("Task #6 Should filter table by age", () => {
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    const ages = ["20", "30", "40", "200"];

    cy.wrap(ages).each((age) => {
      cy.get('input[placeholder="Age"]').clear().type(age);

      cy.wait(500);

      cy.get("tbody tr").each(($row) => {
        if (age === "200") {
          cy.wrap($row).should("contain.text", "No data found");
        } else {
          cy.wrap($row).find("td").last().should("have.text", age);
        }
      });
    });
  });
});
