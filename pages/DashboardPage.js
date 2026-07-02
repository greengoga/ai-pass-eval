class DashboardPage {
  constructor(page) {
    this.page = page;
    this.widgets = page.getByTestId('dashboard-widget');
    this.marketplaceNav = page.getByTestId('nav-marketplace');
    this.aiAppsNav = page.getByTestId('nav-ai-apps');
    this.tasksNav = page.getByTestId('nav-tasks');
  }

  async openMarketplace() {
    await this.marketplaceNav.click();
  }

  async openAIApps() {
    await this.aiAppsNav.click();
  }

  async openTasks() {
    await this.tasksNav.click();
  }
}

module.exports = { DashboardPage };
