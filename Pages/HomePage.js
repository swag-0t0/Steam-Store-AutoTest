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

  searchFor(gameName) {
    this.searchInput.clear().type(`${gameName}{enter}`);
  }
}

export default new HomePage();