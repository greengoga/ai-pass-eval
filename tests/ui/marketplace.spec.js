const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { DashboardPage } = require('../../pages/DashboardPage');
const { MarketplacePage } = require('../../pages/MarketplacePage');
const testData = require('../../fixtures/test-data.json');

async function openMarketplace(page) {
  const login = new LoginPage(page);
  await login.goto();
  await login.login(testData.validUser.email, testData.validUser.password);
  const dashboard = new DashboardPage(page);
  await dashboard.openMarketplace();
}

test.describe('Marketplace', () => {
  test.beforeEach(async ({ page }) => {
    await openMarketplace(page);
  });

  test('search works', async ({ page }) => {
    const marketplace = new MarketplacePage(page);
    await marketplace.search(testData.marketplaceSearchTerm);
    await expect(marketplace.cards).toHaveCount(1);
    await expect(marketplace.cards.first()).toContainText('Invoice AI');
  });

  test('filters work', async ({ page }) => {
    const marketplace = new MarketplacePage(page);
    await marketplace.filter(testData.marketplaceCategory);
    await expect(marketplace.cards).toHaveCount(1);
    await expect(marketplace.cards.first()).toContainText('Finance');
  });

  test('open app details and install button visible', async ({ page }) => {
    const marketplace = new MarketplacePage(page);
    await marketplace.openFirstCard();
    await expect(marketplace.details).toBeVisible();
    await expect(marketplace.installButton).toBeVisible();
  });
});
