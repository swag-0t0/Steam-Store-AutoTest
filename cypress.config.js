const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
      // implement node event listeners here
      baseUrl: "https://store.steampowered.com",
      viewportWidth: 1280,
      viewportHeight: 800,
      defaultCommandTimeout: 10000
    
  },
});
