# Playwright Quality Portfolio
**Bhavya Patel · TypeScript · Playwright · UI & REST API regression testing**

A compact software testing portfolio: **20 automated tests** exercise an online shopping journey and REST response contracts. Built to demonstrate test design, reusable automation, negative testing, and CI diagnostics relevant to a Software Developer in Test internship.

## Quick start
Install **Node.js 22 or later**, then run from this repository:
```sh
npm ci
npx playwright install chromium
npm run typecheck
npm test
npm run report
```
On Linux, use `npx playwright install --with-deps chromium`. Internet access to both demo services is required. No API key, real customer data, or paid account is needed.

## Targets and scope
- **UI:** [SauceDemo](https://www.saucedemo.com), using its published demo accounts.
- **REST API:** [JSONPlaceholder](https://jsonplaceholder.typicode.com/guide/), a separate test service; it is **not SauceDemo's backend**.
- **Browser:** desktop Chromium. Cross-browser, mobile, performance, accessibility, and production security testing are outside this project's current scope.
- JSONPlaceholder simulates POST, PATCH and DELETE responses without persisting changes. These tests validate response contracts, not database state.
- Public services can change or become unavailable. Failures need investigation; they are not automatically application defects.

## Test coverage
Each scenario has a searchable ID in test output and reports.

**Authentication — 5**
- AUTH-01: valid credentials open the six-product inventory.
- AUTH-02: incorrect password produces an error.
- AUTH-03: locked account is rejected.
- AUTH-04: empty credentials require a username.
- AUTH-05: logout prevents direct navigation back to inventory.

**Inventory — 3**
- INV-01: selected product detail name and price match; description is present.
- INV-02: names sort from Z to A.
- INV-03: prices sort from lowest to highest.

**Cart — 2**
- CART-01: two selected items, prices and quantities survive page reload.
- CART-02: removing the last item clears both the cart and its badge.

**Checkout — 4**
- CHECK-01: selected products, subtotal, tax, total, confirmation and cleared badge.
- CHECK-02: missing first name blocks checkout.
- CHECK-03: missing postal code blocks checkout.
- CHECK-04: cancel returns to the cart and preserves selected products.

**REST API — 6**
- API-01: GET a known post; assert status, content type, identity and field types.
- API-02: filter posts by user; verify every returned record.
- API-03: missing resource returns 404 with an empty JSON object.
- API-04: POST returns 201, submitted fields and an ID.
- API-05: PATCH changes the title while preserving other response fields.
- API-06: DELETE returns 200 and an empty JSON object.

## Repository guide
```text
.github/workflows/playwright.yml   CI checks and report upload
data/test-data.ts                 Public demo users and synthetic customer data
fixtures/ui.fixture.ts            Page objects and optional authenticated setup
helpers/assertions.ts             JSON contracts and integer-cent money parsing
pages/                           Login, Inventory, Cart and Checkout page objects
tests/ui/                        Four UI specification files
tests/api/posts.spec.ts           Six REST scenarios
playwright.config.ts              Separate UI/API projects and report settings
package-lock.json                Reproducible dependency versions
docs/resume-bullets.md            Evidence-based application wording
docs/validation.md               Local verification results
```

## Design decisions
Page objects encapsulate locators and user actions. Test files retain the scenario and business assertions so a reviewer can understand expected behavior without following multiple abstraction layers.

Playwright gives each test a fresh browser context. The opt-in `authenticated` fixture logs in independently for cart, inventory and checkout scenarios. Authentication tests use a clean login page directly. No shared storage state or test ordering is required.

Locators use SauceDemo's `data-test` attributes and accessible roles. Web assertions auto-wait; there are no arbitrary sleeps. Monetary assertions operate in integer cents, avoiding floating-point equality errors.

The UI and API projects have separate base URLs. API tests use Playwright's isolated request fixture and do not launch a browser. Two workers limit traffic against shared demo services. Local runs use zero retries; CI permits one diagnostic retry and fails on flaky tests rather than silently accepting them.

The API helper checks status and JSON content type before returning an unknown body; individual tests verify payload shape and behavior. This is a deliberately small contract checker, not a full schema-validation framework.

## Running and debugging
```sh
npm run test:ui
npm run test:api
npm run test:headed
npm run test:debug
npm run test:list
npx playwright test -g "CHECK-01"
npx playwright test -g "CHECK-01" --trace on
npm run report
```
Optional: copy `.env.example` to `.env` and set `UI_BASE_URL` or `API_BASE_URL`. Overrides must expose the same routes and application contract. Existing process environment variables take precedence.

HTML reports are generated in `playwright-report/`; JUnit XML is written to `test-results/junit.xml`. Failed browser tests retain traces, screenshots and video under `test-results/artifacts/`. API tests have no browser screenshots or video. Open a trace through the HTML report or `npx playwright show-trace path/to/trace.zip`.

When a test fails:
1. Read the failed assertion and expected/actual values in the HTML report.
2. Inspect the trace's actions, DOM snapshots and network activity.
3. Distinguish service availability from a locator change or behavior regression.
4. Re-run the scenario after investigating. Do not weaken assertions or add sleeps to hide a failure.

## GitHub Actions
The workflow runs on pull requests, pushes to `main`/`master`, and manual dispatch. It installs locked dependencies, type-checks TypeScript, installs Chromium with Linux dependencies, then runs both projects.

HTML reports, JUnit XML and retained failure artifacts are uploaded for 14 days, including failed runs. Download `playwright-results` from the workflow run, extract it and point `npx playwright show-report` at its `playwright-report` directory. The [first hosted workflow run](https://github.com/BhavyaPatel0306/playwright-quality-portfolio/actions/runs/36640106100) passed on September 29, 2026, including TypeScript checks, the test suite and report upload.

## GitHub repository
Published at [BhavyaPatel0306/playwright-quality-portfolio](https://github.com/BhavyaPatel0306/playwright-quality-portfolio).

```sh
git clone https://github.com/BhavyaPatel0306/playwright-quality-portfolio.git
cd playwright-quality-portfolio
npm ci
npx playwright install chromium
npm test
```

The ignore file excludes installed dependencies, local environment files and generated reports. The lockfile and workflow are committed. Check the Actions tab for hosted workflow results.

## Interview walkthrough
Start with CHECK-01: describe the user journey, independent test setup, page-object actions, and assertions. Then show AUTH-05 as a negative session scenario and API-05 as a response contract example.

Be ready to explain why UI automation and API contracts complement each other, why fake writes cannot prove persistence, and why retries can expose rather than solve flakiness. Discuss adding Firefox/WebKit projects, formal schemas or an owned local test service as future work; those features are not implemented here.

See [resume bullets](docs/resume-bullets.md) and [validation evidence](docs/validation.md). Do not claim production coverage, measured time savings, bugs found, or a hosted CI pass without corresponding evidence.

## References
- [Playwright fixtures](https://playwright.dev/docs/test-fixtures)
- [Playwright CI](https://playwright.dev/docs/ci-intro)
- [Playwright trace viewer](https://playwright.dev/docs/trace-viewer)
- [JSONPlaceholder write simulation](https://jsonplaceholder.typicode.com/guide/)

