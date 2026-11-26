import HomePage from "../../Pages/HomePage.js";
import SearchResultsPage from "../../Pages/SearchResultsPage.js";

describe("Steam Store - tests", () => {

  it("Steamstore test", () => {
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



    //Store data of the 1st and 2nd result
    SearchResultsPage.getResultData(0).then((firstGame) => {

      SearchResultsPage.getResultData(1).then((secondGame) => {

        expect(firstGame.name).to.equal(firstSearchTerm);
        expect(secondGame.name).to.not.be.empty;

        expect(firstGame).to.have.all.keys(
          "name", "platforms", "releaseDate", "reviewSummary", "price"
        );

        expect(secondGame).to.have.all.keys(
          "name", "platforms", "releaseDate", "reviewSummary", "price"
        );

        const storedGames = { firstGame, secondGame };
        cy.log(JSON.stringify(storedGames));

        //save in fixture file
        cy.wrap(storedGames).as("storedGames");
        cy.writeFile("cypress/fixtures/steamGames.json", storedGames);

      });
    });










      
    });

  });

});