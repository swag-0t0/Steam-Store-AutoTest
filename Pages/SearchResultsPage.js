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

}

export default new SearchResultsPage();