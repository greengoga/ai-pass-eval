class MarketplacePage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.getByTestId('marketplace-search');
    this.categoryFilter = page.getByTestId('marketplace-filter');
    this.cards = page.getByTestId('marketplace-card');
    this.details = page.getByTestId('marketplace-details');
    this.installButton = page.getByTestId('install-button');
    this.count = page.getByTestId('marketplace-count');
  }

  async search(term) {
    await this.searchInput.fill(term);
  }

  async filter(category) {
    await this.categoryFilter.selectOption(category);
  }

  async openFirstCard() {
    await this.cards.first().click();
  }
}

module.exports = { MarketplacePage };
