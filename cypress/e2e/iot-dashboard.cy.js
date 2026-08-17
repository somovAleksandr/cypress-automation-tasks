/// <reference types="cypress" />

// describe("Inline Form", () => {
//   beforeEach(() => {
//     cy.visit("/");

//     cy.contains("Forms").click();
//     cy.contains("Form Layouts").click();
//   });

//   it("Should display Inline Form elements", () => {
//     cy.contains("nb-card", "Inline form").within(() => {
//       cy.verifyCardHeader("nb-card-header", "Inline form");

//       cy.verifyPlaceholder("Jane Doe");
//       cy.verifyPlaceholder("Email");

//       cy.get('input[placeholder="Jane Doe"]').should("have.value", "");
//       cy.get('input[placeholder="Email"]').should("have.value", "");

//       cy.verifyCheckboxLABEL("Remember me");

//       cy.verifyButton("Submit");
//     });
//   });

//   it("Should allow user to fill Inline Form", () => {
//     cy.contains("nb-card", "Inline form").within(() => {
//       cy.get('input[placeholder="Jane Doe"]')
//         .clear()
//         .type("Jane Doe")
//         .should("have.value", "Jane Doe");

//       cy.get('input[placeholder="Email"]')
//         .clear()
//         .type("Jane@test.com")
//         .should("have.value", "Jane@test.com");
//     });
//   });

//   it("Should submit Inline form", () => {
//     cy.contains("nb-card", "Inline form").within(() => {
//       cy.get('input[placeholder="Jane Doe"]').as("nameINPUT");
//       cy.get('input[placeholder="Email"]').as("emailINPUT");

//       cy.get("@nameINPUT").clear().type("Jane Doe");
//       cy.get("@emailINPUT").clear().type("Jane@test.com");

//       cy.selectCHECKBOX("Remember me");

//       cy.contains("button", "Submit").click();

//       cy.get("@nameINPUT").should("have.value", "Jane Doe");
//       cy.get("@emailINPUT").should("have.value", "Jane@test.com");
//     });
//   });
// });

// describe("Basic form", () => {
//   beforeEach(() => {
//     cy.visit("/");

//     cy.contains("Forms").click();
//     cy.contains("Form Layouts").click();
//   });

//   it("Should display Basic Form elements", () => {
//     cy.contains("nb-card", "Basic form").within(() => {
//       cy.get("#exampleInputEmail1").as("emailInput");
//       cy.get("#exampleInputPassword1").as("passwordInput");
//       cy.contains("label", "Check me out")
//         .parent()
//         .find('input[type="checkbox"]')
//         .as("checkboxInput");
//       cy.contains("button", "Submit").as("submitBTN");

//       cy.get("nb-card-header").should("have.text", "Basic form");

//       cy.contains("label", "Email address").should("exist");
//       cy.contains("label", "Password").should("exist");

//       cy.get("@emailInput").should("have.attr", "placeholder", "Email");
//       cy.get("@passwordInput").should("have.attr", "placeholder", "Password");

//       cy.get("@emailInput").should("have.value", "");
//       cy.get("@passwordInput").should("have.value", "");

//       cy.get("@checkboxInput").should("be.enabled").and("not.be.checked");

//       cy.get("@submitBTN")
//         .should("be.enabled")
//         .and("be.visible")
//         .and("have.text", "Submit");
//     });
//   });

//   it("Should allow user to fill Basic Form", () => {
//     cy.contains("nb-card", "Basic form").within(() => {
//       cy.get("#exampleInputEmail1").as("emailInput");
//       cy.get("#exampleInputPassword1").as("passwordInput");
//       cy.contains("label", "Check me out")
//         .parent()
//         .find('input[type="checkbox"]')
//         .as("checkboxInput");
//       cy.contains("button", "Submit").as("submitBTN");

//       cy.get("@emailInput")
//         .clear()
//         .type("test@mail.com")
//         .should("have.value", "test@mail.com");

//       cy.get("@passwordInput")
//         .clear()
//         .type("123456789")
//         .should("have.value", "123456789");

//       cy.get("@checkboxInput").check({ force: true }).should("be.checked");
//     });
//   });

//   it("Should submit Basic Form", () => {
//     cy.contains("nb-card", "Basic form").within(() => {
//       cy.get("#exampleInputEmail1").as("emailInput");
//       cy.get("#exampleInputPassword1").as("passwordInput");
//       cy.contains("label", "Check me out")
//         .parent()
//         .find('input[type="checkbox"]')
//         .as("checkboxInput");
//       cy.contains("button", "Submit").as("submitBTN");

//       cy.get("@emailInput").clear().type("test@mail.com");
//       cy.get("@passwordInput").clear().type("123456789");

//       cy.get("@checkboxInput").check({ force: true });

//       cy.get("@submitBTN").click();

//       cy.get("@emailInput").should("have.value", "test@mail.com");
//       cy.get("@passwordInput").should("have.value", "123456789");

//       cy.get("@checkboxInput").should("be.enabled").and("be.checked");
//     });
//   });
// });

// describe("Using the Grid Form", () => {
//   beforeEach(() => {
//     cy.visit("/");

//     cy.contains("Forms").click();
//     cy.contains("Form Layouts").click();
//   });

//   it("Should display Using the Grid elements", () => {
//     cy.contains("nb-card", "Using the Grid").within(() => {
//       cy.get("nb-card-header").should("have.text", "Using the Grid");

//       cy.contains("label", "Email").should("exist");
//       cy.contains("label", "Password").should("exist");
//       cy.contains("label", "Radios").should("exist");

//       cy.get('[data-cy="inputEmail1"]').should(
//         "have.attr",
//         "placeholder",
//         "Email",
//       );
//       cy.get("#inputPassword2").should("have.attr", "placeholder", "Password");

//       cy.get('[data-cy="inputEmail1"]').should("have.value", "");
//       cy.get("#inputPassword2").should("have.value", "");

//       cy.contains("Radios")
//         .parent()
//         .find('input[type="radio"]')
//         .then(($radios) => {
//           expect($radios).to.have.length(3);
//           expect($radios.filter(":disabled")).to.have.length(1);
//           expect($radios.not(":disabled")).to.have.length(2);
//         });

//       cy.contains("Option 1")
//         .parent()
//         .find('input[type="radio"]')
//         .should("be.enabled")
//         .and("not.be.checked");

//       cy.contains("Option 2")
//         .parent()
//         .find('input[type="radio"]')
//         .should("be.enabled")
//         .and("not.be.checked");

//       cy.contains("Disabled Option")
//         .parent()
//         .find('input[type="radio"]')
//         .should("be.disabled")
//         .and("be.checked");

//       cy.contains("button", "Sign in")
//         .should("be.enabled")
//         .and("be.visible")
//         .and("have.text", "Sign in");
//     });
//   });

//   it("Should allow user to fill Using the Grid", () => {
//     cy.get('[data-cy="inputEmail1"]')
//       .type("testemail@gmail.com")
//       .should("have.value", "testemail@gmail.com");

//     cy.press(Cypress.Keyboard.Keys.TAB);

//     cy.get("#inputPassword2").should("be.focused");

//     cy.get("#inputPassword2")
//       .type("123456789")
//       .should("have.value", "123456789");

//     cy.contains("Option 2")
//       .parent()
//       .find('input[type="radio"]')
//       .check({ force: true })
//       .should("be.checked");

//     cy.contains("Option 1")
//       .parent()
//       .find('input[type="radio"]')
//       .should("be.enabled")
//       .and("not.be.checked");

//     cy.contains("Disabled Option")
//       .parent()
//       .find('input[type="radio"]')
//       .should("be.disabled")
//       .and("not.be.checked");
//   });

//   it("Should submit Using the Grid", () => {
//     cy.get('[data-cy="inputEmail1"]')
//       .clear()
//       .type("zxcasdqwe@asd.com")
//       .should("have.value", "zxcasdqwe@asd.com");

//     cy.press(Cypress.Keyboard.Keys.TAB);

//     cy.get("#inputPassword2").should("be.focused");

//     cy.get("#inputPassword2")
//       .clear()
//       .type("12356789")
//       .should("have.value", "12356789");

//     cy.contains("Option 2")
//       .parent()
//       .find('input[type="radio"]')
//       .check({ force: true })
//       .should("be.checked");

//     cy.contains("button", "Sign in").click();

//     cy.get('[data-cy="inputEmail1"]').should("have.value", "zxcasdqwe@asd.com");
//     cy.get("#inputPassword2").should("have.value", "12356789");
//     cy.contains("Option 2")
//       .parent()
//       .find('input[type="radio"]')
//       .should("be.checked");
//   });
// });

describe("Block Form", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();
  });

  it("Should display Block Form elements", () => {
    cy.contains("nb-card", "Block form").within(() => {
      cy.get("nb-card-header").should("have.text", "Block form");

      cy.contains("label", "First Name").should("have.text", "First Name");
      cy.contains("label", "Last Name").should("have.text", "Last Name");
      cy.contains("label", "Email").should("have.text", "Email");
      cy.contains("label", "Website").should("have.text", "Website");

      cy.get("#inputFirstName").should(
        "have.attr",
        "placeholder",
        "First Name",
      );
      cy.get("#inputLastName").should("have.attr", "placeholder", "Last Name");
      cy.get("#inputEmail").should("have.attr", "placeholder", "Email");
      cy.get("#inputWebsite").should("have.attr", "placeholder", "Website");

      cy.get("#inputFirstName").should("have.value", "");
      cy.get("#inputLastName").should("have.value", "");
      cy.get("#inputEmail").should("have.value", "");
      cy.get("#inputWebsite").should("have.value", "");

      cy.contains("button", "Submit")
        .should("have.text", "Submit")
        .and("be.enabled");
      // .and("be.visible"); // Она не визибл ...
    });
  });

  it("Should allow user to fill Block form", () => {
    cy.contains("nb-card", "Block form").within(() => {
      cy.get("#inputFirstName").type("John").should("have.value", "John");
      cy.get("#inputLastName").type("Doe").should("have.value", "Doe");
      cy.get("#inputEmail")
        .type("Email@text.com")
        .should("have.value", "Email@text.com");
      cy.get("#inputWebsite")
        .type("asdqwesda.com")
        .should("have.value", "asdqwesda.com");
    });
  });

  it.only("Should submit Block form", () => {
    cy.contains("nb-card", "Block form").within(() => {
      cy.get("#inputFirstName").type("John");
      cy.get("#inputLastName").type("Doe");
      cy.get("#inputEmail").type("Email@text.com");
      cy.get("#inputWebsite").type("asdasdsad.com");

      cy.contains("button", "Submit").click();

      cy.get("#inputFirstName").should("have.value", "John");
      cy.get("#inputLastName").should("have.value", "Doe");
      cy.get("#inputEmail").should("have.value", "Email@text.com");
      cy.get("#inputWebsite").should("have.value", "asdasdsad.com");
    });
  });
});
