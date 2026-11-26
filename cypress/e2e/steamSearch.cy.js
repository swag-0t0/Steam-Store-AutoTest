import HomePage from "../../Pages/HomePage.js";
import SearchResultsPage from "../../Pages/SearchResultsPage.js";

describe("Steam Store - Search and Verification", () => {

  it("Open Steamstore and search", () => {
    //Steam store e nagivate korbo
    HomePage.visit();
    HomePage.verifyHomePageLoaded();

    //Game search & verify search
    cy.env(["firstSearchTerm"]).then(({ firstSearchTerm }) => {
      HomePage.searchFor(firstSearchTerm);
      cy.url().should("include", "/search");

      SearchResultsPage.verifySearchResultsPageDisplayed();
      SearchResultsPage.verifySearchBoxContains(firstSearchTerm);
      SearchResultsPage.verifyResultNameEquals(0, firstSearchTerm);
    });
  });
  


});