import HomePage from "../../Pages/HomePage.js";

describe("Steam Store - Search and Verification", () => {
  it("Open Steamstore and search", () => {
    //Steam store e nagivate korbo
    HomePage.visit();
    HomePage.verifyHomePageLoaded();

    //Game search 
    cy.env(["firstSearchTerm"]).then(({ firstSearchTerm }) => {
      HomePage.searchFor(firstSearchTerm);
      cy.url().should("include", "/search");
    });
  });
});