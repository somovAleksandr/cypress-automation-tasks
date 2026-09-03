/// <reference types="cypress"/>

function getInputByLabel(labelText) {
  return cy.root().contains(labelText).closest(".form-group").find("input");
}

function checkLabelText(label) {
  return cy.contains("label", label).should("have.text", label);
}

function getRadioButtonByLabel(label) {
  return cy.root().contains(label).closest("nb-radio").find('[type="radio"]');
}

function verifyRadioButtons(
  labelText,
  totalCount,
  enabledCount,
  disabledCount,
) {
  cy.root()
    .contains(labelText)
    .closest(".form-group")
    .find('[type="radio"]')
    .then(($radios) => {
      expect($radios).to.have.length(totalCount);
      expect($radios.not(":disabled")).to.have.length(enabledCount);
      expect($radios.filter(":disabled")).to.have.length(disabledCount);
    });
}

function getTableRow(value) {
  return cy.root().contains("tbody tr", value);
}

describe("Daily Cypress Exam #03", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should validate Using the Grid form UI", () => {
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Using the Grid").within(() => {
      cy.get("nb-card-header").should("have.text", "Using the Grid");

      checkLabelText("Email");
      checkLabelText("Password");
      checkLabelText("Radios");

      getInputByLabel("Email").should("have.attr", "placeholder", "Email");
      getInputByLabel("Password").should(
        "have.attr",
        "placeholder",
        "Password",
      );

      getInputByLabel("Email").should("have.value", "");
      getInputByLabel("Password").should("have.value", "");

      verifyRadioButtons("Radios", 3, 2, 1);

      getRadioButtonByLabel("Option 1")
        .should("be.enabled")
        .and("not.be.checked");

      getRadioButtonByLabel("Option 2")
        .should("be.enabled")
        .and("not.be.checked");

      getRadioButtonByLabel("Disabled Option")
        .should("be.disabled")
        .and("be.checked");

      cy.contains("button", "Sign in")
        .should("be.enabled")
        .and("be.visible")
        .and("have.text", "Sign in");
    });
  });

  it("Should fill and submit Using the Grid form", () => {
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Using the Grid").within(() => {
      getInputByLabel("Email")
        .type("qa.exam@test.com")
        .should("have.value", "qa.exam@test.com");
      getInputByLabel("Password").type("123456").should("have.value", "123456");

      getRadioButtonByLabel("Option 1")
        .check({ force: true })
        .should("be.checked");

      getRadioButtonByLabel("Option 2")
        .should("be.enabled")
        .and("not.be.checked");

      getRadioButtonByLabel("Disabled Option")
        .should("be.disabled")
        .and("not.be.checked");

      cy.contains("button", "Sign in")
        .should("be.enabled")
        .and("be.visible")
        .click();
    });
  });

  it("Should fill Inline form using user data object", () => {
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    const userData = {
      "Jane Doe": "Alex QA",
      Email: "alex.qa@test.com",
    };

    cy.contains("nb-card", "Inline form").within(() => {
      for (const [key, value] of Object.entries(userData)) {
        cy.get(`input[placeholder="${key}"]`)
          .type(value)
          .should("have.value", value);
      }
    });
  });

  it("Should validate Larry Bird data in the correct table columns", () => {
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    const personData = [
      "3",
      "Larry",
      "Bird",
      "@twitter",
      "twitter@outlook.com",
      "18",
    ];

    cy.contains("tbody tr", "Larry").within(() => {
      cy.get("td").each(($td, index) => {
        if (index > 0) {
          cy.wrap($td).should("have.text", personData[index - 1]);
        }
      });
    });
  });

  it("Should create a new user and validate table row data", () => {
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    const userData = {
      "First Name": "Alex",
      "Last Name": "Automation",
      Username: "@alexqa",
      "E-mail": "alex.qa@test.com",
      Age: "29",
    };

    const values = Object.values(userData);

    cy.get("thead .nb-plus").click();

    cy.get("thead tr")
      .last()
      .within(() => {
        for (const [key, value] of Object.entries(userData)) {
          cy.get(`input[placeholder="${key}"]`).type(value);
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

  it("Should update user data in Smart Table", () => {
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    const updatedData = {
      "First Name": "Lawrence",
      Age: "35",
    };

    cy.contains("tbody tr", "Larry").within(() => {
      cy.get(".nb-edit").click();
    });

    cy.get("tbody")
      .find(".nb-checkmark")
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
    });
  });

  it("Should filter Smart Table by age", () => {
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

  it("Should delete user from Smart Table", () => {
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    cy.window().then((win) => {
      cy.stub(win, "confirm").as("dialog").returns(true);
    });

    cy.contains("tbody tr", "Ruben").within(() => {
      cy.get(".nb-trash").click();
    });

    cy.get("@dialog").should("be.called");

    cy.contains("tbody tr", "Ruben").should("not.exist");
  });

  it("Should find table rows using reusable helper", () => {
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    getTableRow("Ruben").within(() => {
      cy.get("td").should("have.length", 7);
    });
    getTableRow("Mark").within(() => {
      cy.get("td").should("have.length", 7);
    });
  });
});
