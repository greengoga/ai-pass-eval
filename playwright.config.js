const { defineConfig, devices } = require('@playwright/test');

const chromiumExecutablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined;

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: process.env.CI ? 1 : 0,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['junit', { outputFile: 'reports/junit-results.xml' }]
  ],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    screenshot: 'only-on-failure',
    video: 'off',
    trace: 'off'
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'], launchOptions: { executablePath: chromiumExecutablePath } } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } }
  ],
  webServer: process.env.CI ? {
    command: 'npm start',
    port: 3000,
    reuseExistingServer: true,
    timeout: 120000
  } : undefined
});
