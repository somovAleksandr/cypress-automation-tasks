Cypress.Commands.add("verifyCardHeader", (selector, expectedText) => {
  cy.root().find(selector).should("have.text", expectedText);
});

Cypress.Commands.add("verifyPlaceholder", (placeholderText) => {
  cy.root().find(`input[placeholder="${placeholderText}"]`).should("exist");
});

Cypress.Commands.add("verifyEmptyValue", (selector) => {
  cy.root().contains(selector).parent().find("input").should("have.value", "");
});

Cypress.Commands.add("verifyCheckboxLABEL", (selector) => {
  cy.root().contains(selector).should("exist");
});

Cypress.Commands.add("verifyCheckbox", (selector) => {
  cy.root()
    .contains(selector)
    .parent()
    .find('input[type="radio"]')
    .should("be.enabled")
    .and("not.be.checked");
});

Cypress.Commands.add("verifyButton", (selector) => {
  cy.root()
    .contains("button", selector)
    .should("be.enabled")
    .and("be.visible")
    .and("have.text", selector);
});

Cypress.Commands.add("selectCHECKBOX", (selector) => {
  cy.root()
    .contains(selector)
    .parent()
    .find('input[type="checkbox"]')
    .check({ force: true })
    .should("be.checked");
});

Cypress.Commands.add("checkCheckboxState", (labelText, shouldBeChecked) => {
  cy.root()
    .contains(labelText)
    .closest("nb-checkbox")
    .find('input[type="checkbox"]')
    .should(shouldBeChecked ? "be.checked" : "not.be.checked");
});

Cypress.Commands.add("getInputByLabel", (label) => {
  cy.root().contains(label).closest(".form-group").find("input");
});

Cypress.Commands.add("checkEmptyInput", (selector) => {
  cy.root().find(`input[placeholder="${selector}"]`).and("have.value", "");
});
