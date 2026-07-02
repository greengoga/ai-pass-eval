const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const testData = require('../../fixtures/test-data.json');

test.describe('Authentication', () => {
  test('valid login opens dashboard', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(testData.validUser.email, testData.validUser.password);
    await expect(login.appShell).toBeVisible();
    await expect(page.getByTestId('page-title')).toHaveText('Dashboard');
  });

  test('invalid login shows validation error', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(testData.invalidUser.email, testData.invalidUser.password);
    await expect(login.errorMessage).toHaveText('Invalid credentials.');
    await expect(page.getByTestId('login-screen')).toBeVisible();
  });

  test('empty login fields show required-fields message', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('', '');
    await expect(login.errorMessage).toHaveText('Please enter email and password.');
    await expect(page.getByTestId('login-screen')).toBeVisible();
  });
});
