/// <reference types="cypress"/>

function checkCheckbox(selector) {
  cy.root()
    .contains(selector)
    .closest("nb-checkbox")
    .find('[type="checkbox"]')
    .check({ force: true })
    .should("be.checked");
}
function uncheckCheckbox(selector) {
  cy.root()
    .contains(selector)
    .closest("nb-checkbox")
    .find('[type="checkbox"]')
    .uncheck({ force: true })
    .should("not.be.checked");
}

describe("Form Layouts", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();
  });

  it("Should display Using the Grid form correctly", () => {
    cy.contains("nb-card", "Using the Grid").within(() => {
      cy.get("nb-card-header").should("have.text", "Using the Grid");

      cy.contains("label", "Email").and("have.text", "Email");
      cy.contains("label", "Password")

        .and("have.text", "Password");
      cy.contains("label", "Radios").and("have.text", "Radios");

      cy.contains("Email")
        .closest(".form-group")
        .find("input")
        .should("have.attr", "placeholder", "Email");

      cy.contains("Password")
        .closest(".form-group")
        .find("input")
        .should("have.attr", "placeholder", "Password");

      cy.contains("Email")
        .closest(".form-group")
        .find("input")
        .should("have.value", "");

      cy.contains("Password")
        .closest(".form-group")
        .find("input")
        .should("have.value", "");

      cy.contains("Radios")
        .closest(".form-group")
        .find('input[type="radio"]')
        .then(($radios) => {
          expect($radios).to.have.length(3);
          expect($radios.not(":disabled")).to.have.length(2);
          expect($radios.filter(":disabled")).to.have.length(1);
        });

      cy.contains("Option 1")
        .closest("nb-radio")
        .find('[type="radio"]')
        .should("be.enabled")
        .and("not.be.checked");

      cy.contains("Option 2")
        .closest("nb-radio")
        .find('[type="radio"]')
        .should("be.enabled")
        .and("not.be.checked");

      cy.contains("Disabled Option")
        .closest("nb-radio")
        .find('[type="radio"]')
        .should("be.disabled")
        .and("be.checked");

      cy.contains("button", "Sign in").should("be.visible").and("be.enabled");
    });
  });

  it("Should fill and submit Using the Grid form", () => {
    cy.contains("nb-card", "Using the Grid").within(() => {
      cy.get('[data-cy="inputEmail1"]')
        .type("qa@test.com")
        .should("have.value", "qa@test.com");
      cy.get('[placeholder="Password"]')
        .type("123456")
        .should("have.value", "123456");

      cy.contains("Option 1")
        .closest("nb-radio")
        .find('[type="radio"]')
        .check({ force: true })
        .should("be.checked");

      cy.contains("Option 2")
        .closest("nb-radio")
        .find('[type="radio"]')
        .should("not.be.checked");

      cy.contains("Disabled Option")
        .closest("nb-radio")
        .find('[type="radio"]')
        .should("not.be.checked")
        .and("be.disabled");

      cy.contains("button", "Sign in").click();
    });
  });

  it("Should fill Inline form using user data object", () => {
    const userData = {
      "Jane Doe": "John Doe",
      Email: "john@test.com",
    };

    cy.contains("nb-card", "Inline form").within(() => {
      for (const [key, value] of Object.entries(userData)) {
        cy.get(`input[placeholder="${key}"]`)
          .type(value)
          .should("have.value", value);
      }
    });
  });

  it("Should select and unselect checkboxes correctly", () => {
    cy.contains("Modal & Overlays").click();
    cy.contains("Toastr").click();

    // Проверка включения и выключения чекбокса
    checkCheckbox("Hide on click");
    uncheckCheckbox("Hide on click");

    checkCheckbox("Prevent arising of duplicate toast");
    uncheckCheckbox("Prevent arising of duplicate toast");

    checkCheckbox("Show toast with icon");
    uncheckCheckbox("Show toast with icon");

    // Проверка что одновременно можно включить 2 чек бокса
    checkCheckbox("Hide on click");
    checkCheckbox("Prevent arising of duplicate toast");

    uncheckCheckbox("Hide on click");
    uncheckCheckbox("Prevent arising of duplicate toast");

    checkCheckbox("Hide on click");
    checkCheckbox("Show toast with icon");

    uncheckCheckbox("Hide on click");
    uncheckCheckbox("Show toast with icon");

    checkCheckbox("Prevent arising of duplicate toast");
    checkCheckbox("Show toast with icon");

    uncheckCheckbox("Prevent arising of duplicate toast");
    uncheckCheckbox("Show toast with icon");

    // Проверка возможности активации всех чекбоксов
    checkCheckbox("Hide on click");
    checkCheckbox("Prevent arising of duplicate toast");
    checkCheckbox("Show toast with icon");
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

    cy.get("tbody")
      .contains("tr", "Larry")
      .within(() => {
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

    cy.get("thead")
      .find("tr")
      .last()
      .within(() => {
        for (const [key, value] of Object.entries(userData)) {
          cy.get(`input[placeholder="${key}"]`).type(value);
        }

        cy.get(".nb-checkmark").click();
      });

    cy.get("tbody")
      .contains("tr", userData["E-mail"])
      .within(() => {
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

    const userData = {
      "First Name": "Lawrence",
      Age: "35",
    };

    cy.contains("tbody tr", "Larry").within(() => {
      cy.get(".nb-edit").click();
    });

    cy.get("tbody tr")
      .find(".nb-checkmark")
      .closest("tr")
      .within(() => {
        for (const [key, value] of Object.entries(userData)) {
          cy.get(`input[placeholder="${key}"]`).clear().type(value);
        }

        cy.get(".nb-checkmark").click();
      });

    cy.contains("tbody tr", userData["First Name"]).within(() => {
      cy.get("td").eq(2).should("have.text", userData["First Name"]);
      cy.get("td").last().should("have.text", userData.Age);
    });
  });

  it("Should delete user from Smart Table", () => {
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

    cy.get("tbody tr").should("have.length", 1).and("contain.text", "Ruben");

    cy.contains("tbody tr", "Ruben").within(() => {
      cy.get(".nb-trash").click();
    });

    cy.get("@dialog").should("be.called");

    cy.contains("tbody tr", "Ruben").should("not.exist");
    cy.get("tbody tr").should("contain.text", "No data found");
  });

  it("Should filter Smart Table by age", () => {
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    const ages = ["20", "30", "40", "200"];

    cy.wrap(ages).each((age) => {
      cy.get("thead tr")
        .last()
        .find('input[placeholder="Age"]')
        .clear()
        .type(age);

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

  it("Should validate Email placeholder using invoke and then", () => {
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Using the Grid").within(() => {
      cy.contains("Email")
        .closest(".form-group")
        .find("input")
        .invoke("attr", "placeholder")
        .then((placeholder) => {
          expect(placeholder.trim()).to.equal("Email");
        });
    });
  });
});
