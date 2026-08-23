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

  it("Should allow user to fill form", () => {
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
});

// заполнение Email;
// Tab → Password должен получить focus;
// заполнение Password;
// выбор Option 2;
// Submit;
// после Submit значения сохранились.
