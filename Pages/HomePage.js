class HomePage {
  get searchInput() {
    return cy.get('[name="term"]')
  }

  visit() {
    cy.visit("/");
  }

  verifyHomePageLoaded() {
    cy.location("pathname").should("eq", "/");
    this.searchInput.should("be.visible");
  }
  //search and research ei method share kore
  searchFor(gameName) {
    cy.searchGame(gameName);
  }
}

export default new HomePage();