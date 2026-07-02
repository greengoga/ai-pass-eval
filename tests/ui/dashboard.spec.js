const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { DashboardPage } = require('../../pages/DashboardPage');
const testData = require('../../fixtures/test-data.json');

async function loginAsDemo(page) {
  const login = new LoginPage(page);
  await login.goto();
  await login.login(testData.validUser.email, testData.validUser.password);
}

test.describe('Dashboard and navigation', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsDemo(page);
  });

  test('dashboard loads and displays widgets', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await expect(page.getByTestId('page-title')).toHaveText('Dashboard');
    await expect(dashboard.widgets).toHaveCount(3);
  });

  test('navigation to Marketplace works', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.openMarketplace();
    await expect(page.getByTestId('page-title')).toHaveText('Marketplace');
    await expect(page.getByTestId('marketplace-card')).toHaveCount(6);
  });

  test('navigation to AI Apps works', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.openAIApps();
    await expect(page.getByTestId('page-title')).toHaveText('AI Apps');
    await expect(page.getByTestId('ai-app-card')).toHaveCount(4);
  });
});
