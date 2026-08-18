/// <reference types="cypress" />

describe("Toastr", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("Modal & Overlays").click();
    cy.contains("Toastr").click();
  });

  it("Should display Toastr elements", () => {
    cy.get("nb-card-header").should("have.text", " Toaster configuration ");

    cy.contains("label", "Position:").should("have.text", "Position:");
    cy.contains("label", "Toast type:").should("have.text", "Toast type:");
    cy.contains("label", "Title:").should("have.text", "Title:");
    cy.contains("label", "Content:").should("have.text", "Content:");
    cy.contains(
      "label",
      "Time to hide toast, ms. 0 to persistent toast:",
    ).should("have.text", "Time to hide toast, ms. 0 to persistent toast:");

    cy.contains("label", "Hide on click").should("have.text", "Hide on click");
    cy.contains("label", "Prevent arising of duplicate toast").should(
      "have.text",
      "Prevent arising of duplicate toast",
    );
    cy.contains("label", "Show toast with icon").should(
      "have.text",
      "Show toast with icon",
    );

    cy.getInputByLabel("Title:").should("have.value", "HI there!");

    cy.getInputByLabel("Content:").should("have.value", "I'm cool toaster!");

    cy.getInputByLabel("Time to hide toast, ms. 0 to persistent toast:").should(
      "have.value",
      "2000",
    );

    cy.contains("button", "top-right").should("exist");

    cy.contains("Toast type:")
      .closest(".form-group")
      .find("select")
      .should("have.value", "primary");

    cy.checkCheckboxState("Hide on click", true);
    cy.checkCheckboxState("Prevent arising of duplicate toast", false);
    cy.checkCheckboxState("Show toast with icon", true);

    cy.contains("button", "Show toast")
      .scrollIntoView()
      .should("be.visible")
      .and("be.enabled")
      .and("have.text", "Show toast");

    cy.contains("button", "Random toast")
      .scrollIntoView()
      .should("be.enabled")
      .and("be.visible")
      .and("have.text", "Random toast");

    ///
  });

  it("Should allow user to configure Toastr", () => {
    cy.contains("Position:")
      .closest(".form-group")
      .find("button")
      .as("positionBTN");

    cy.get("@positionBTN").click();

    cy.get("nb-option").each(($el, index, $list) => {
      const optionText = $el.text().trim();

      cy.wrap($el).click();

      cy.get("@positionBTN").should("have.text", optionText);

      if (index < $list.length - 1) {
        cy.get("@positionBTN").click();
      }
    });

    cy.contains("Toast type:")
      .closest(".form-group")
      .find("select option")
      .each(($el, index, $list) => {
        const optionText = $el.text().trim();
        const optionValue = $el.val().trim();

        cy.contains("Toast type:")
          .closest(".form-group")
          .find("select")
          .select(optionText)
          .should("have.value", optionValue);
      });

    cy.contains("Title:")
      .closest(".form-group")
      .find("input")
      .clear()
      .type("Hello world!")
      .should("have.value", "Hello world!");

    cy.contains("Content:")
      .closest(".form-group")
      .find("input")
      .clear()
      .type("I'm the Best of")
      .should("have.value", "I'm the Best of");

    cy.contains("Time to hide toast, ms. 0 to persistent toast:")
      .closest(".form-group")
      .find("input")
      .clear()
      .type("1992")
      .should("have.value", "1992");

    cy.contains("Hide on click")
      .closest("nb-checkbox")
      .find('input[type="checkbox"]')
      .uncheck({ force: true });
    cy.checkCheckboxState("Hide on click", false);

    cy.contains("Prevent arising of duplicate toast")
      .closest("nb-checkbox")
      .find('input[type="checkbox"]')
      .check({ force: true });
    cy.checkCheckboxState("Prevent arising of duplicate toast", true);

    cy.contains("Show toast with icon")
      .closest("nb-checkbox")
      .find('input[type="checkbox"]')
      .uncheck({ force: true });
    cy.checkCheckboxState("Show toast with icon", false);

    cy.contains("button", "Show toast").click();
  });

  it("Should show Toastr on button click", () => {
    cy.contains("Position:").closest(".form-group").find("button").click();

    cy.contains("nb-option", "top-left").click();

    cy.contains("Toast type:")
      .closest(".form-group")
      .find("select")
      .select("warning");

    cy.contains("Title:")
      .closest(".form-group")
      .find("input")
      .clear()
      .type("Hello world!");

    cy.contains("Content:")
      .closest(".form-group")
      .find("input")
      .clear()
      .type("Im cool toaster!");

    cy.contains("Time to hide toast, ms. 0 to persistent toast:")
      .closest(".form-group")
      .find("input")
      .clear()
      .type("20000");

    cy.contains("button", "Show toast").click();

    cy.get("nb-toast")
      .should("exist")
      .and("contain", "Toast 2. Hello world!")
      .and("have.class", "status-warning");

    cy.get("nb-toast").find(".message").should("have.text", "Im cool toaster!");
  });
});
