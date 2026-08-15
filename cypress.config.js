const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://playground.bondaracademy.com/pages/iot-dashboard",

    viewportWidth: 1280,
    viewportHeight: 720,
  },
});
