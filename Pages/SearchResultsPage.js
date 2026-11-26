import { cleanText, getPlatforms, getReviewSummary, getPrice } from "../cypress/support/helpers.js";

class SearchResultsPage {
  get searchInput() {
    return cy.get('[name="displayterm"]')  
  }

  get resultRows() {
    return cy.get("#search_resultsRows a.search_result_row");
  }

  resultRow(index) {
    return this.resultRows.eq(index);
  }
  // row length 0 er boro
  verifySearchResultsPageDisplayed() {
    cy.url().should("include", "/search");
    this.resultRows.should("have.length.greaterThan", 0)
  }
  //search box e dota 2 ache kina!
  verifySearchBoxContains(expectedText) {
    this.searchInput.should("have.value", expectedText)
  }
  //first  result dota 2 kina!
  verifyResultNameEquals(index, expectedName) {
    this.resultRow(index)
      .find(".title")
      .should(($title) => {
        expect($title.text().trim()).to.equal(expectedName)
      });
  }

  //fet search resutl  data
  getResultData(index) {
    return this.resultRow(index).then(($row) => {
      return {
        name: cleanText($row.find(".title").text()),
        platforms: getPlatforms($row),
        releaseDate: cleanText($row.find(".search_released").text()),
        reviewSummary: getReviewSummary($row),
        price: getPrice($row),
      };
    });
  }


  //title diye khuje - game name match koray
  resultRowByName(gameName) {
    return this.resultRows.filter((_, row) => {
      return cleanText(row.querySelector(".title")?.textContent) === gameName;
    });
  }
  
  verifyResultListContains(gameName) {
    this.resultRowByName(gameName).should("have.length.greaterThan", 0);
  }
  //find position of that game in the list and er value gula pathay
  getResultDataByName(gameName) {
    return this.resultRows.then(($rows) => {
      const index = [...$rows].findIndex(
        (row) => cleanText(row.querySelector(".title")?.textContent) === gameName
      );
      expect(index, `"${gameName}" position in result list`).to.be.at.least(0);
      return this.getResultData(index);
    });
  }

}

export default new SearchResultsPage();