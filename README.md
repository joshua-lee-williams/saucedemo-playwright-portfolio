# Saucedemo Playwright Test Automation Portfolio

[![Playwright Tests](https://github.com/joshua-lee-williams/saucedemo-playwright-portfolio/actions/workflows/playwright.yml/badge.svg)](https://github.com/joshua-lee-williams/saucedemo-playwright-portfolio/actions/workflows/playwright.yml)
[![Multi-Browser Tests](https://github.com/joshua-lee-williams/saucedemo-playwright-portfolio/actions/workflows/playwright-multi-browser.yml/badge.svg)](https://github.com/joshua-lee-williams/saucedemo-playwright-portfolio/actions/workflows/playwright-multi-browser.yml)

A comprehensive test automation framework built with Playwright for testing [Saucedemo.com](https://www.saucedemo.com) - demonstrating modern testing practices and clean code architecture.

## Features Demonstrated

- ✅ **Page Object Model (POM)** - Clean, maintainable test architecture
- ✅ **Cross-browser Testing** - Chromium, Firefox, and WebKit
- ✅ **Parallel Test Execution** - Fast test runs
- ✅ **Comprehensive Reporting** - HTML, JSON, and list reporters
- ✅ **CI/CD Pipeline** - GitHub Actions with automated testing
- ✅ **Multi-browser Matrix Testing** - Tests run on all browsers automatically
- ✅ **Scheduled Test Runs** - Daily automated regression testing
- ✅ **Best Practices** - Proper assertions, error handling, and test organization

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## 🛠️ Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd saucedemo-playwright-portfolio
```

2. Install dependencies:

```bash
npm install
```

3. Install Playwright browsers:

```bash
npx playwright install
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in headed mode (see browser)
npm run test:headed

# Run tests in UI mode (interactive)
npm run test:ui

# Run tests in debug mode
npm run test:debug

# Run specific browser
npm run test:chromium
npm run test:firefox
npm run test:webkit

# Run specific test file
npm run test:login
npm run test:products
npm run test:cart
npm run test:checkout

# Run all E2E tests
npm run test:e2e

# View HTML report
npm run report
```

## Test Reports

After running tests, view the HTML report:

```bash
npm run report
```

Reports include:

- Test execution summary
- Screenshots on failure
- Video recordings on failure
- Detailed traces for debugging

## Project Structure

```
saucedemo-playwright-portfolio/
├── tests/
│   └── e2e/
│       ├── login.spec.js       # Login functionality tests
│       ├── products.spec.js    # Product page tests
│       ├── cart.spec.js        # Shopping cart tests (coming soon)
│       └── checkout.spec.js    # Checkout flow tests (coming soon)
├── pages/
│   ├── LoginPage.js            # Login page object
│   ├── ProductsPage.js         # Products page object
│   ├── CartPage.js             # Cart page object (coming soon)
│   └── CheckoutPage.js         # Checkout page object (coming soon)
├── playwright.config.js        # Playwright configuration
├── package.json                # Project dependencies
└── README.md                   # This file
```

## Test Coverage

### Login Tests ✅ (8 tests)

- Valid login with standard user
- Invalid username error handling
- Invalid password error handling
- Empty field validations
- Locked out user handling
- Error message clearing
- Multiple login attempts

### Products Page Tests ✅ (11 tests)

- Product listing display
- Sorting (A-Z, Z-A, Price Low-High, Price High-Low)
- Add products to cart
- Remove products from cart
- Cart count updates
- Product details validation
- Navigation to cart
- Logout functionality

### Shopping Cart Tests ✅ (12 tests)

- Empty cart validation
- Display added items
- Item details verification
- Remove single item
- Remove all items
- Calculate totals
- Continue shopping navigation
- Proceed to checkout
- Cart state persistence
- Cart badge count updates

### Checkout Flow Tests ✅ (18 tests)

- Checkout information page display
- Valid information submission
- Empty field validations (first name, last name, postal code)
- Cancel and return to cart
- Items display in overview
- Subtotal calculation
- Tax calculation
- Total calculation with tax
- Payment information display
- Shipping information display
- Complete checkout flow
- Order confirmation message
- Back to products navigation
- Empty cart after order
- Multiple items checkout
- Cancel from overview page
- Special characters handling

### Coming Soon 🚧

- Visual regression testing
- API testing integration
- Accessibility testing
- Performance testing
- Data-driven test fixtures

## CI/CD Pipeline

This project uses **GitHub Actions** for continuous integration:

- **Automatic Test Runs** - Tests run on every push and pull request
- **Multi-Browser Testing** - Parallel execution across Chromium, Firefox, and WebKit
- **Daily Scheduled Runs** - Automated regression testing every day at 9 AM UTC
- **Test Artifacts** - Reports and screenshots available for download
- **Manual Triggers** - Run tests on-demand from the Actions tab

View the test results in the [Actions tab](https://github.com/joshua-lee-williams/saucedemo-playwright-portfolio/actions).

## Page Object Model

Each page is represented as a class with:

- **Locators** - Centralized element selectors
- **Methods** - Reusable page actions
- **Clean API** - Easy to use and maintain

Example:

```javascript
import { LoginPage } from "./pages/LoginPage";

const loginPage = new LoginPage(page);
await loginPage.goto();
await loginPage.login("standard_user", "secret_sauce");
```

## 🔧 Configuration

The `playwright.config.js` includes:

- Multi-browser support (Chromium, Firefox, WebKit)
- Parallel execution
- Automatic retries on failure
- Screenshots and videos on failure
- Trace collection
- Custom timeouts

## 📈 CI/CD Integration (Coming Soon)

GitHub Actions workflow for:

- Running tests on every push/PR
- Multi-browser testing
- Artifact uploads (reports, videos)
- Scheduled test runs

## Contributing

None Contributing--this is a portfolio project, but suggestions are welcome!

## License

MIT

## Author

**Joshua Lee Williams**

- GitHub: [@joshua-lee-williams](https://github.com/joshua-lee-williams/)
- LinkedIn: [Joshua Lee Williams](https://www.linkedin.com/in/joshua-lee-williams/)

## Acknowledgments

- [Playwright Documentation](https://playwright.dev)
- [Saucedemo](https://www.saucedemo.com) - Test application
- Test Automation Community

---

**Note:** This project is for educational and portfolio purposes only.


