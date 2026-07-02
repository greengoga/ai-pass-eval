class AIAppsPage {
  constructor(page) {
    this.page = page;
    this.cards = page.getByTestId('ai-app-card');
    this.openButtons = page.getByTestId('open-ai-app');
    this.detail = page.getByTestId('ai-app-detail');
  }

  async openFirstApp() {
    await this.openButtons.first().click();
  }
}

module.exports = { AIAppsPage };
