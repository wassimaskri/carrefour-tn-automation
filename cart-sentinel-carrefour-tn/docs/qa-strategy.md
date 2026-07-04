# QA Strategy - Cart Sentinel Carrefour TN

## Mission

This project does not try to automate every screen. It protects the journeys that matter most for an e-commerce customer:

- can the customer enter the store?
- can the customer discover products?
- can the customer trust product information?
- can the customer start a cart journey?
- can the customer reach support, store information and account entry points?

The mindset is risk-based: automate the flows where a regression can block discovery, damage trust or reduce conversion.

## Functional Reading

| Module | Customer question | Business risk | Automation signal |
| --- | --- | --- | --- |
| Home | Can I access the storefront? | Full storefront outage | Search entry point and header visible |
| Search | Can I find a product? | Product discovery loss | Existing and no-result searches handled |
| Product details | Can I decide to buy? | Missing price/name, broken PDP | Product name and price visible |
| Cart | Can I start checkout intent? | Conversion blocker | Add, update or safe empty-cart behavior |
| Navigation | Can I browse categories and support? | Discovery/support friction | Menu, stores and help links route correctly |
| Customer | Can I access account and saved products? | CRM/account entry blocker | Sign-in, wishlist and newsletter validation |
| Content | Can I find trust/support links? | Trust and compliance friction | Footer and social links available |

## Risk Tags

| Tag | Meaning |
| --- | --- |
| `@smoke` | Minimal release confidence path |
| `@risk` | Business-sensitive behavior |
| `@conversion` | Can directly affect buying intent |
| `@negative` | Validates controlled failure or empty state |
| `@cart-integrity` | Protects basket state and quantity behavior |
| `@support` | Protects customer assistance access |

## Senior QA Decisions

- Gherkin describes user intent, not selectors.
- Steps stay thin and readable.
- Page Objects own locators, waits and site-specific behavior.
- The framework accepts real e-commerce behavior such as unauthenticated wishlist redirection.
- The cart scenarios are defensive because the live site can reject cart persistence depending on delivery/session constraints.
- Evidence is collected automatically through screenshots, videos and HTML/JSON reports.

## Known Live-Site Constraints

Because the target is a real public website, these tests intentionally tolerate:

- cookie consent overlays appearing late;
- hidden menu elements in the DOM;
- wishlist redirecting to sign-in when anonymous;
- cart acceptance depending on availability, delivery state or session;
- text and class names changing more often than business behavior.

These constraints are handled in Page Objects, not in Gherkin, to keep the test language clean.

## Release Confidence Model

Use `@smoke` before a quick demo or portfolio recording:

```bash
npm run test:smoke
```

Use `@risk` before publishing a full report:

```bash
npm run test:risk
```

Use the full suite when preparing a CV/LinkedIn proof point:

```bash
npm run test
```
