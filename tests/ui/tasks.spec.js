const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { DashboardPage } = require('../../pages/DashboardPage');
const { TasksPage } = require('../../pages/TasksPage');
const testData = require('../../fixtures/test-data.json');

async function openTasks(page) {
  const login = new LoginPage(page);
  await login.goto();
  await login.login(testData.validUser.email, testData.validUser.password);
  const dashboard = new DashboardPage(page);
  await dashboard.openTasks();
}

test.describe('Simple Task page', () => {
  test('create task with valid data', async ({ page }) => {
    await openTasks(page);
    const tasks = new TasksPage(page);
    await tasks.createTask(testData.task.title, testData.task.description);
    await expect(tasks.message).toContainText(`Task created: ${testData.task.title}`);
  });

  test('empty title shows validation message', async ({ page }) => {
    await openTasks(page);
    const tasks = new TasksPage(page);
    await tasks.createTask('', testData.task.description);
    await expect(tasks.message).toHaveText('Task title is required.');
  });
});
