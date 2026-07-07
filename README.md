# Shopify Automation

End-to-end (E2E) test automation suite for [Meetanshi](https://meetanshi.com/)'s Shopify apps, built with [Playwright](https://playwright.dev/) and TypeScript. The suite drives real demo storefronts to verify that each app renders and behaves correctly across browsers, reports every result to Discord, and runs on a sharded GitHub Actions pipeline.

## Overview

The project contains **24 automated tests** organized into feature suites, each validating a live Meetanshi Shopify app on its password-protected demo store. Tests cover storefront rendering, cart/checkout flows, form submissions, modal popups, and app-store visibility.

## Apps Under Test

| App                                  | What's verified                                                                                             |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| **PDF Product Catalog**              | All 16 layout previews render with correct image alt tags                                                   |
| **WhatsApp Share**                   | Share button is visible on product pages                                                                    |
| **WhatsApp Widgets (4-in-1) / Chat** | Sticker text, share buttons, and widgets on home, collection & product pages                                |
| **Shipping Per Item**                | Address-based shipping rate appears at checkout                                                             |
| **ShipFlow: Shipping Rules**         | Custom shipping rate applies through the checkout flow                                                      |
| **Quick Order Form (COD)**           | Inline form renders and a COD order can be placed end-to-end                                                |
| **Request Quote & Hide Price**       | Quote button counts and modal popup on home, collection & product pages, plus successful inquiry submission |
| **Countdown Timer Bar**              | Timer bar message renders on the storefront                                                                 |
| **Recent Sales Popup**               | Sales popup becomes visible                                                                                 |
| **Festival Effects & Decor**         | Effects heading and decorated elements render                                                               |
| **Cart & Order Limits**              | Quantity, weight, subtotal, and total-item cart rules are enforced                                          |
| **App Store Visibility**             | All Meetanshi apps are listed in the Shopify App Store search                                               |

## Features

- **Cross-browser testing** — runs on Chromium and Firefox (WebKit configurable).
- **Persistent browser context** — custom fixture with geolocation and locale for realistic sessions.
- **Discord notifications** — an `afterEach` hook posts a pass/fail embed (status, browser, duration) to a Discord webhook.
- **Sharded CI** — GitHub Actions runs the suite across 4 parallel shards with Playwright browser caching.
- **Rich artifacts** — HTML reports, traces (on first retry), screenshots (on failure), and videos (retained on failure).
- **Published reports** — the HTML report is deployed to the `gh-pages` branch.

## Tech Stack

- [Playwright Test](https://playwright.dev/) `^1.52`
- TypeScript / Node.js (LTS)
- [Axios](https://axios-http.com/) — Discord webhook delivery
- [dotenv](https://github.com/motdotla/dotenv) — environment configuration
- GitHub Actions — CI/CD

## Getting Started

### Prerequisites

- Node.js (LTS)
- npm

### Installation

```bash
https://github.com/topshopifydev/Shopify-Automation.git
cd Shopify-Automation
npm install
npx playwright install --with-deps
```

### Configuration

Create a `.env` file in the project root:

```env
# Optional: enables Discord pass/fail notifications
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/xxxx/xxxx
```

The demo stores are protected with the password `mit`, which is already set in the tests.

## Running Tests

```bash
# Run all tests (headless, all configured browsers)
npx playwright test

# Run a single suite / test by title
npx playwright test -g "Countdown Timer Bar"

# Run in a specific browser
npx playwright test --project=chromium

# Run headed / debug
npx playwright test --headed
npx playwright test --debug

# Open the last HTML report
npx playwright show-report
```

## Project Structure

```
.
├── test/
│   └── shopifydemo.spec.ts     # All app test suites
├── tests-examples/
│   └── demo-todo-app.spec.ts   # Playwright starter example
├── screenshots/                # Reference screenshots
├── .github/workflows/
│   └── playwright.yml          # Sharded CI pipeline
├── playwright.config.ts        # Playwright configuration
└── package.json
```

## Continuous Integration

On every push and pull request to `main`/`master`, GitHub Actions:

1. Installs dependencies and caches Playwright browser binaries.
2. Runs the suite across **4 parallel shards**.
3. Uploads a per-shard HTML report (retained 14 days).
4. On failure, uploads traces, videos, and screenshots for debugging.

## License

ISC
