/// <reference types="cypress"/>

function verifyLabel(selector) {
  cy.contains(selector).should("exist").and("have.text", selector);
}

function verifyQTYRadio(selector, totalCount, enabledCount, disabledCount) {
  cy.contains(selector)
    .closest(".form-group")
    .find('input[type="radio"]')
    .then(($radios) => {
      expect($radios).to.have.length(totalCount);

      expect($radios.not(":disabled")).to.have.length(enabledCount);

      expect($radios.filter(":disabled")).to.have.length(disabledCount);
    });
}

describe("Daily Cypress Exam #01", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should display Using the Grid elements", () => {
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Using the Grid").within(() => {
      cy.get("nb-card-header").should("have.text", "Using the Grid");

      cy.contains("Email")
        .closest(".form-group")
        .find("input")
        .as("emailInput");

      cy.contains("Password")
        .closest(".form-group")
        .find("input")
        .as("passwordInput");

      verifyLabel("Email");
      verifyLabel("Password");
      verifyLabel("Radios");

      cy.get("@emailInput").should("have.attr", "placeholder", "Email");
      cy.get("@passwordInput").should("have.attr", "placeholder", "Password");

      cy.get("@emailInput").should("have.value", "");
      cy.get("@passwordInput").should("have.value", "");

      verifyQTYRadio("Radios", 3, 2, 1);
    });
  });

  it("Should allow user to fill and submit form", () => {
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Using the Grid").within(() => {
      cy.get('[data-cy="inputEmail1"]')
        .clear()
        .type("test@gmail.com")
        .should("have.value", "test@gmail.com");

      cy.press(Cypress.Keyboard.Keys.TAB);

      cy.get("#inputPassword2").should("be.focused");

      cy.get("#inputPassword2")
        .clear()
        .type("123456789aBc")
        .should("have.value", "123456789aBc");

      cy.contains("Option 2")
        .closest("nb-radio")
        .find('input[type="radio"]')
        .check({ force: true })
        .should("be.checked");

      cy.contains("button", "Sign in").click();

      cy.get('[data-cy="inputEmail1"]').should("have.value", "test@gmail.com");
      cy.get("#inputPassword2").should("have.value", "123456789aBc");
    });
  });

  it("Should verify Toast types", () => {
    cy.contains("Modal & Overlays").click();
    cy.contains("Toastr").click();

    cy.contains("Toast type:")
      .closest(".form-group")
      .find("select option")
      .each(($el, index, $list) => {
        const optionText = $el.text().trim();
        const optionValue = $el.val().trim();

        cy.wrap($el).should("have.value", optionValue);

        cy.contains("Toast type:")
          .closest(".form-group")
          .find("select")
          .select(optionText);
      });
  });

  it("Should verify Position dropdown", () => {
    cy.contains("Modal & Overlays").click();
    cy.contains("Toastr").click();

    cy.contains("Position:")
      .closest(".form-group")
      .find("button")
      .as("dropdownBTN");

    cy.get("@dropdownBTN").click();

    cy.get("nb-option").each(($el, index, $list) => {
      const optionText = $el.text().trim();

      cy.wrap($el).click();

      cy.get("@dropdownBTN").should("have.text", optionText);

      if (index < $list.length - 1) {
        cy.get("@dropdownBTN").click();
      }
    });
  });

  it("Should verify Tooltip placements", () => {
    cy.contains("Modal & Overlays").click();
    cy.contains("Tooltip").click();

    cy.contains("nb-card", "Tooltip Placements").within(() => {
      cy.get("button").each(($el, index, $list) => {
        cy.wrap($el).trigger("mouseenter", { force: true });

        cy.document()
          .find("nb-tooltip")
          .should("have.text", "This is a tooltip");

        cy.wrap($el).trigger("mouseleave", { force: true });
      });
    });
  });

  it("Should verify browser confirm with cy.on()", () => {
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    cy.on("window:confirm", (str) => {
      expect(str).to.equal("Are you sure you want to delete?");
    });

    cy.get("tbody tr").first().find(".ng2-smart-action-delete-delete").click();
  });

  it("Should verify browser confirm with stub", () => {
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    cy.window().then((win) => {
      cy.stub(win, "confirm").as("dialog").returns(true);
    });

    cy.get("tbody tr").eq(0).find(".ng2-smart-action-delete-delete").click();

    cy.get("@dialog").should("be.called");
  });

  it("Should edit Larry Bird in Smart Table", () => {
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    cy.get("tbody")
      .contains("tr", "Larry")
      .then((tableRow) => {
        cy.wrap(tableRow).find(".ng2-smart-action-edit-edit").click();

        cy.wrap(tableRow).find('input[placeholder="Age"]').clear().type("35");

        cy.wrap(tableRow).find(".nb-checkmark").click();

        cy.wrap(tableRow).find("td").last().should("have.text", 35);
      });
  });

  it("Should add John Smith to Smart Table", () => {
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    cy.get("thead").find(".ng2-smart-actions-title-add").click();

    cy.get("thead")
      .find("tr")
      .last()
      .then((tableRow) => {
        cy.wrap(tableRow).find('input[placeholder="First Name"]').type("John");
        cy.wrap(tableRow).find('input[placeholder="Last Name"]').type("Smith");

        cy.wrap(tableRow).find(".nb-checkmark").click();
      });

    cy.get("tbody tr")
      .first()
      .find("td")
      .then((tableColumn) => {
        cy.wrap(tableColumn).eq(2).should("have.text", "John");
        cy.wrap(tableColumn).eq(3).should("have.text", "Smith");
      });
  });
});
