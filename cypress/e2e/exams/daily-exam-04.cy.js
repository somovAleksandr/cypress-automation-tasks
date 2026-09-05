/// <reference types="cypress"/>

function verifyLabel(label) {
  cy.root().contains("label", label).should("exist");
}

function verifyPlaceholder(label) {
  cy.root()
    .contains(label)
    .closest(".form-group")
    .find("input")
    .should("have.attr", "placeholder", label);
}

function verifyEmptyInput(label) {
  cy.root()
    .contains(label)
    .closest(".form-group")
    .find("input")
    .should("have.value", "");
}

function verifyRadio(label, totalCount, enabledCount, disabledCount) {
  cy.root()
    .contains(label)
    .closest(".form-group")
    .find('[type="radio"]')
    .then(($radios) => {
      expect($radios).to.have.length(totalCount);
      expect($radios.not(":disabled")).to.have.length(enabledCount);
      expect($radios.filter(":disabled")).to.have.length(disabledCount);
    });
}

function verifyEnabledRadio(label) {
  cy.root()
    .contains(label)
    .closest("nb-radio")
    .find('input[type="radio"]')
    .should("be.enabled")
    .and("not.be.checked");
}

function verifyDisabledRadio(label) {
  cy.root()
    .contains(label)
    .closest("nb-radio")
    .find('input[type="radio"]')
    .should("be.disabled")
    .and("be.checked");
}

function selectRadio(label) {
  cy.root()
    .contains(label)
    .closest("nb-radio")
    .find('[type="radio"]')
    .check({ force: true })
    .should("be.checked");
}

function verifyBTN(buttonText) {
  cy.root()
    .contains("button", buttonText)
    .should("be.visible")
    .and("be.enabled");
}

function verifyUncheckedRadio(label) {
  cy.root()
    .contains(label)
    .closest("nb-radio")
    .find('input[type="radio"]')
    .should("not.be.checked");
}

function verifyDisabledUncheckedRadio(label) {
  cy.root()
    .contains(label)
    .closest("nb-radio")
    .find('input[type="radio"]')
    .should("be.disabled")
    .and("not.be.checked");
}

describe("Daily Exam #4", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should validate Using the Grid form UI", () => {
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Using the Grid").should("exist").and("be.visible");

    cy.contains("nb-card", "Using the Grid").within(() => {
      cy.get("nb-card-header").should("have.text", "Using the Grid");

      verifyLabel("Email");
      verifyLabel("Password");
      verifyLabel("Radios");

      verifyPlaceholder("Email");
      verifyPlaceholder("Password");

      verifyEmptyInput("Email");
      verifyEmptyInput("Password");

      verifyRadio("Radios", 3, 2, 1);

      verifyEnabledRadio("Option 1");
      verifyEnabledRadio("Option 2");

      verifyDisabledRadio("Disabled Option");

      cy.contains("button", "Sign in").should("be.visible").and("be.enabled");
    });
  });

  it("Should interact with Using the Grid", () => {
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Using the Grid").within(() => {
      cy.contains("Email")
        .closest(".form-group")
        .find("input")
        .type("alex@test.com")
        .should("have.value", "alex@test.com");

      cy.contains("Password")
        .closest(".form-group")
        .find("input")
        .type("Test12345")
        .should("have.value", "Test12345");

      selectRadio("Option 1");

      verifyUncheckedRadio("Option 2");
      verifyDisabledUncheckedRadio("Disabled Option");

      selectRadio("Option 2");

      verifyUncheckedRadio("Option 1");
      verifyUncheckedRadio("Disabled Option");

      verifyBTN("Sign in");
    });
  });
});
