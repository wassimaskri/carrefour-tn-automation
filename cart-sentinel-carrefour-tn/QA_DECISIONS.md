# QA Decisions

This file explains the thinking behind the project. I wrote it as I would explain the framework in an interview: what I tested, why I tested it, what I did not test, and how I handled the limits of a public e-commerce website.

## Why Carrefour Tunisia?

I chose Carrefour Tunisia because it is a real e-commerce website, not a fake demo app. That makes the project closer to a real QA assignment:

- the DOM is dynamic;
- cookie consent can appear at different moments;
- product availability can change;
- cart behavior can depend on session, location or delivery state;
- search results and product lists are real, not mocked.

For a QA portfolio, this is useful because it shows how I handle real-world instability while keeping tests readable and maintainable.

## What I Wanted To Prove

The goal was not to automate every page. The goal was to protect the main customer journey:

1. open the storefront;
2. search for a product;
3. inspect product details;
4. start a cart intent;
5. validate account, wishlist, help, store locator, footer and trust links.

This gives a realistic balance between business value and automation cost.

## Wassim's Business-First QA Mindset

My idea for this project was simple: before automating Carrefour TN, I needed to understand Carrefour TN as a business flow.

I did not start by asking "which selector can I click?". I started by asking:

- how does a customer discover a product?
- what information helps the customer decide?
- where can the conversion path break?
- what happens when the expected product is not found?
- what happens when the cart cannot persist the selected item?
- how does the same journey behave on mobile?

Only after that functional reading did I automate.

This is the mindset I wanted to show: a senior QA does not automate screens blindly. A senior QA verifies the business behavior first, challenges the product risk, documents what is unstable, then turns the important checks into maintainable automation.

For Carrefour TN, this means the framework is not only a technical demo. It is a way to show that I can understand an e-commerce product, identify conversion risks, expose quality gaps, and build an automation layer that helps the business trust its public customer flows.

## Why Playwright + Cucumber + POM?

I used Playwright because it is reliable for modern web apps and gives strong debugging tools: screenshots, video, trace and browser contexts.

I used Cucumber because the scenarios should be understandable by a QA, Product Owner or recruiter without reading TypeScript.

I used Page Object Model because selectors and UI behavior should not leak into Gherkin or step definitions. The current architecture is:

```txt
Feature files
   ↓
Step definitions
   ↓
Page Objects
   ↓
Base Page / shared selectors / fixtures
   ↓
Playwright APIs
```

## Why Add Mobile Coverage?

E-commerce traffic is often mobile-heavy, and Carrefour TN has a responsive interface with different constraints on smaller screens: condensed navigation, touch interactions, smaller product cards and possible layout shifts.

I added mobile coverage through a `DEVICE=mobile` runtime profile instead of duplicating feature files. This keeps the framework maintainable: the business behavior stays the same, while Playwright changes the browser context to a mobile profile.

The CI runs desktop smoke and mobile smoke separately. That gives fast feedback on the most important journeys without turning the mini project into a slow full regression suite.

## Why Add Docker?

I added Docker because UI automation is sensitive to local machine differences: browser versions, missing system libraries, Java for Allure, and environment variables.

The Docker image gives the project a reproducible execution layer:

- Playwright browsers and Linux dependencies come from the official Playwright image;
- Java is installed for Allure report generation;
- dependencies are installed with `npm ci`;
- desktop and mobile smoke tests can run from the same image.

This also gives a fallback if one CI provider is blocked by account limits. The same test commands can run locally, in GitHub Actions, or inside any CI service that supports Docker.

## Manual Testing Before Automation

Before automation, I would manually validate:

- home page loads and search is visible;
- cookie banner can be accepted;
- searching `eau` returns products;
- searching a random string returns a no-result state;
- opening a product shows name and price;
- adding a product to cart either adds it or gives a controlled empty-cart behavior;
- wishlist redirects anonymous users to sign-in;
- store locator and help center are reachable.

Only after this functional understanding does automation make sense.

## Risk-Based Priorities

I gave priority to flows that affect conversion or customer confidence:

| Priority | Area | Reason |
| --- | --- | --- |
| High | Search | If search breaks, users cannot discover products |
| High | Product details | Name and price are decision signals |
| High | Cart | Cart issues directly affect checkout intent |
| Medium | Account/wishlist | Important for returning users |
| Medium | Store locator/help | Important support paths |
| Low/Medium | Footer/social | Trust and brand signals |

## Negative Scenarios

I included negative scenarios because a senior QA does not only test the happy path:

- search for a non-existing product;
- newsletter submission without email;
- cart empty/safe state when product cannot be persisted;
- wishlist access while anonymous.

Planned negative coverage for a next iteration:

- price filter boundaries;
- out-of-stock product handling;
- invalid email format;
- unavailable delivery location.

## Flaky Handling

The website is public and dynamic, so I avoided fragile assumptions:

- reusable wait strategy in `BasePage`;
- wait for first visible locator instead of first DOM match;
- cookie consent handled centrally;
- desktop and mobile contexts created from the same browser factory;
- Docker used as a reproducible execution environment;
- retry configurable through `.env`;
- screenshots on failure;
- video retained on failure;
- Playwright trace configured for failure analysis.

## Limitations

- No payment test executed.
- No checkout completion.
- No private account data used.
- No admin or back-office flow.
- Only public customer flows are automated.
- Cart behavior can depend on availability, delivery mode or session state.

## What I Would Improve Next

- Add stable test IDs if working with the dev team.
- Add API checks for product search if an API contract is available.
- Add visual checks for critical product/card layout.
- Add real Allure trend history in CI.
- Split smoke and nightly jobs.
