# Validation record

Verified locally on September 29, 2026.

- Environment: Windows, Node.js 24.14.0.
- Dependencies: Playwright 1.63.0, TypeScript 7.0.2, @types/node 22.20.4.
- `npm run typecheck`: passed after updating TypeScript module resolution to NodeNext.
- `npm run test:list`: 20 tests discovered in 5 specification files.
- `npm test`: **20 passed in 25.7 seconds**, two workers, no retries.
- Breakdown: 14 Chromium UI tests against live SauceDemo; 6 REST API tests against live JSONPlaceholder.
- HTML and JUnit reports generated. No failure screenshots or videos were retained because all tests passed.
- Dependency installation reported no known vulnerabilities at installation time.

This is a single local run, not a stability benchmark or a guarantee of public service availability. GitHub Actions has been configured but not run on GitHub. Linux/Node 22 CI execution remains unverified until publication.

The delivered report archive preserves this successful run separately from the source repository. Future local runs overwrite the normal generated report directories.

