# AI-Pass QA Evaluation Project

This repository contains a complete 24-hour QA evaluation submission for an **AI-Pass - Enterprise AI Operating System** demo module.

It includes:

- A small live-ready demo application with login, dashboard, AI Apps, Marketplace, Simple Task page, and REST API.
- Playwright UI automation tests.
- Playwright API automation tests.
- Page Object Model structure.
- Test data fixtures.
- Test Plan PDF.
- Bug Report + Coverage Matrix Excel workbook.
- Postman collection.
- GitHub Actions workflow.

## Live Application URL

After deployment, add the public URL here:

```text
LIVE_APP_URL=PASTE_DEPLOYED_URL_HERE
```

The app can be deployed to Render, Railway, Vercel or any Node.js hosting provider.

## Demo Credentials

```text
Email: demo@aipass.test
Password: Pass123!
API token: demo-token
```

## Project Structure

```text
AI-Pass-QA-Submission/
├── app/                         # Demo web application
│   ├── index.html               # Main SPA page
│   ├── app.js                   # App logic and mock data
│   └── styles.css               # Responsive styling
├── pages/                       # Playwright Page Object classes
│   ├── LoginPage.js
│   ├── DashboardPage.js
│   ├── MarketplacePage.js
│   ├── AIAppsPage.js
│   └── TasksPage.js
├── tests/
│   ├── ui/                      # UI automation tests
│   └── api/                     # API automation tests
├── fixtures/
│   └── test-data.json           # Reusable test data
├── docs/
│   ├── AI-Pass_Test_Plan.pdf
│   └── AI-Pass_Bug_Report_and_Coverage_Matrix.xlsx
├── reports/                     # JUnit report output folder
├── .github/workflows/           # CI pipeline
├── AI-Pass-API.postman_collection.json
├── playwright.config.js
├── server.js                    # Node.js server + REST API
├── package.json
└── README.md
```

## How to Run Locally

Install dependencies:

```bash
npm install
npx playwright install
```

Start the app:

```bash
npm start
```

Open the app:

```text
http://localhost:3000
```

Run all tests:

```bash
npm test
```

Run only UI tests:

```bash
npm run test:ui
```

Run only API tests:

```bash
npm run test:api
```

Open Playwright HTML report:

```bash
npm run report
```

## REST API Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/login` | Returns demo auth token | No |
| GET | `/api/apps` | Returns marketplace apps | No |
| GET | `/api/dashboard` | Returns dashboard widgets | Yes |
| POST | `/api/tasks` | Creates a simple task | Yes |

Authenticated endpoints require:

```text
Authorization: Bearer demo-token
```

## Automated Test Coverage

| Feature | UI Automated | API Automated | Manual Covered | Status |
|---|---:|---:|---:|---|
| Authentication | Yes | Yes | Yes | Complete |
| Dashboard | Yes | Yes | Yes | Complete |
| Marketplace | Yes | No | Yes | Issue found |
| AI Apps | Yes | No | Yes | Complete |
| Simple Task | Yes | Yes | Yes | Complete |
| Error Handling | Yes | Yes | Yes | Complete |
| Responsive Design | No | No | Yes | Manual |

## Known Issues

The Bug Report workbook in `/docs` contains documented issues, including:

- Marketplace result count does not update after filtering.
- Task title may accept whitespace-only input.
- Empty login validation uses a combined message instead of field-level validation.

## CI/CD

GitHub Actions workflow is included:

```text
.github/workflows/playwright.yml
```

It installs Node.js, installs Playwright browsers, starts the application, runs tests, and uploads the HTML report artifact.

## Postman Collection

The Postman collection is available in the repository root:

```text
AI-Pass-API.postman_collection.json
```

Set the collection variable `BASE_URL` to the deployed application URL or `http://localhost:3000`.

## Limitations and Future Improvements

Due to the 24-hour scope, this submission focuses on core functionality and stable smoke/regression coverage. Future improvements could include:

- Accessibility checks.
- Visual regression tests.
- Performance smoke tests.
- Extended cross-browser and mobile viewport coverage.
- More complete API contract validation.
- Role-based authorization scenarios.
