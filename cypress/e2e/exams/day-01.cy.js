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

  it.only("Should verify Toast types", () => {
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
});

// Часть C — Custom Dropdown

// Там же:

// Position

// Проверь все варианты Position.

// Используй цикл.

// Для каждого:

// открыть dropdown
// → выбрать option
// → проверить выбранное значение
// Часть D — Tooltips

// Tooltip → Tooltip Placements

// Проверь:

// TOP
// RIGHT
// BOTTOM
// LEFT

// Для каждого:

// mouseenter
// → tooltip существует
// → правильный текст
// → mouseleave
// Часть E — Browser Dialog

// Tables & Data → Smart Table

// Удаление первой строки.

// Используй cy.on("window:confirm").

// Проверь:

// confirm действительно появляется;
// текст равен:
// Are you sure you want to delete?
// после подтверждения первая строка исчезла / данные сдвинулись.
// Часть F — Stub

// Сделай отдельный it.

// Тот же Delete, но теперь через:

// cy.window()
// → stub(win, "confirm")
// → returns(true)

// Проверь, что:

// confirm был вызван

// И потом второй вариант:

// returns(false)

// И проверь, что запись не удалилась.

// Часть G — Tables 🔥

// На Smart Table найди:

// Larry Bird

// Не используй индекс строки.

// Алгоритм:

// найти строку по уникальному тексту
// → Edit
// → изменить возраст на 35
// → Confirm
// → проверить результат

// Причём проверку возраста сделай через последнюю ячейку, как в сегодняшнем уроке.

// Часть H — Tables + index

// Добавь новую запись:

// John
// Smith

// Затем найди новую строку через индекс, а не через contains("John").

// Проверь:

// First Name = John
// Last Name = Smith
// 🚨 Главное правило экзамена

// Не пиши всё одним огромным it.

// Разбей на несколько:

// describe("Daily Cypress Exam #01", () => {

//   it("Should verify Using the Grid", () => {
//   });

//   it("Should verify Toast types", () => {
//   });

//   it("Should verify Position dropdown", () => {
//   });

//   it("Should verify Tooltip placements", () => {
//   });

//   it("Should verify browser confirm with cy.on()", () => {
//   });

//   it("Should verify browser confirm with stub", () => {
//   });

//   it("Should edit Larry Bird in Smart Table", () => {
//   });

//   it("Should add John Smith to Smart Table", () => {
//   });
