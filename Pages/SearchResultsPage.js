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
  //title e still dota 2 ache kina!
  verifyResultNameEquals(index, expectedName) {
    this.resultRow(index)
      .find(".title")
      .should(($title) => {
        expect($title.text().trim()).to.equal(expectedName)
      });
  }
}

export default new SearchResultsPage();