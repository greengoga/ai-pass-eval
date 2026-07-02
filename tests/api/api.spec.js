const { test, expect } = require('@playwright/test');
const testData = require('../../fixtures/test-data.json');

const authHeaders = {
  Authorization: `Bearer ${testData.apiToken}`
};

test.describe('REST API', () => {
  test('POST /api/login returns token for valid credentials', async ({ request }) => {
    const response = await request.post('/api/login', {
      data: testData.validUser
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.token).toBe(testData.apiToken);
  });

  test('GET /api/apps returns list of marketplace apps', async ({ request }) => {
    const response = await request.get('/api/apps');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
    expect(body[0]).toHaveProperty('name');
  });

  test('GET /api/dashboard rejects missing authentication', async ({ request }) => {
    const response = await request.get('/api/dashboard');
    expect(response.status()).toBe(401);
    const body = await response.json();
    expect(body.error).toContain('Missing');
  });

  test('GET /api/dashboard returns widgets with valid token', async ({ request }) => {
    const response = await request.get('/api/dashboard', { headers: authHeaders });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body.widgets)).toBe(true);
    expect(body.widgets.length).toBe(3);
  });

  test('POST /api/tasks creates task with valid payload', async ({ request }) => {
    const response = await request.post('/api/tasks', {
      headers: authHeaders,
      data: { title: testData.task.title }
    });
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.status).toBe('created');
  });

  test('POST /api/tasks returns 400 for invalid payload', async ({ request }) => {
    const response = await request.post('/api/tasks', {
      headers: authHeaders,
      data: { description: 'No title provided' }
    });
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toContain('Title');
  });
});
