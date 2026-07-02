const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { DashboardPage } = require('../../pages/DashboardPage');
const { AIAppsPage } = require('../../pages/AIAppsPage');
const testData = require('../../fixtures/test-data.json');

async function openAIApps(page) {
  const login = new LoginPage(page);
  await login.goto();
  await login.login(testData.validUser.email, testData.validUser.password);
  const dashboard = new DashboardPage(page);
  await dashboard.openAIApps();
}

test.describe('AI Apps', () => {
  test('open app and validate data rendering', async ({ page }) => {
    await openAIApps(page);
    const aiApps = new AIAppsPage(page);
    await expect(aiApps.cards).toHaveCount(4);
    await aiApps.openFirstApp();
    await expect(aiApps.detail).toBeVisible();
    await expect(aiApps.detail).toContainText('Data rendered');
  });
});
