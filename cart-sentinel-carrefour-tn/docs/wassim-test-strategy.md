# Wassim Test Strategy

## Goal

This document describes the QA strategy behind **Cart Sentinel Carrefour TN**.

The strategy is inspired by Hannibal's Battle of Cannae as a metaphor: do not attack everything with brute force. Observe the product, identify the critical center, attract failures through smart scenarios, then surround the risky flows with high-value tests.

This is not an official testing methodology. It is a practical thinking framework for risk-based QA automation.

## Core Principle

The goal is not to create hundreds of random checks.

The goal is to build the right checks that protect the business.

For Carrefour TN, that means understanding the e-commerce journey first:

- how customers discover products;
- how they decide from product name, image and price;
- how they start a cart intent;
- how mobile behavior differs from desktop;
- how the site responds when the expected flow is not available.

Automation comes after this product understanding.

## 1. Reconnaissance - Understand Before Testing

Before writing test cases or automation code, I review the product manually.

### Actions

- Explore the public website as a customer.
- Identify the main modules and customer entry points.
- Review search, product details, cart, account, wishlist, help and footer flows.
- Observe cookie consent behavior.
- Check mobile and desktop differences.
- Capture unstable or unclear behaviors.
- Document what should not be tested in a public portfolio project.

### Output

The reconnaissance work is reflected in:

- [QA Decisions](../QA_DECISIONS.md)
- [Exploratory Test Charter](test-charter.md)
- [Manual Test Cases](manual-test-cases.md)
- [Bug Reports](bug-reports.md)

## 2. Center Of Gravity - Critical Business Flows

In the strategy metaphor, the center of gravity is the point that can cause collapse if it breaks.

In this project, the center of gravity is the public customer journey:

| Critical flow | Business risk |
| --- | --- |
| Home page | Customer cannot access the storefront |
| Search | Customer cannot discover products |
| Product details | Customer cannot validate name or price |
| Cart intent | Customer cannot start conversion |
| Mobile journey | Customer experience breaks on small screens |
| Account / wishlist | Returning customer path becomes unclear |
| Help / store locator | Support and trust paths are hard to reach |

These are the flows protected first by smoke and risk-based scenarios.

## 3. Encirclement Testing - Surround The Feature

For each risky feature, I do not test only the happy path.

The feature is surrounded with complementary checks:

- positive scenario;
- negative scenario;
- empty state;
- unavailable state;
- mobile behavior;
- anonymous user behavior;
- error or no-result feedback;
- evidence collection on failure.

### Example: Search

| Scenario type | Carrefour TN example |
| --- | --- |
| Positive | Search for `eau` |
| Data-driven | Search for multiple valid terms |
| Negative | Search for a non-existing product |
| Empty state | Validate no-result message |
| Mobile | Search through mobile layout |
| Reliability | Avoid hidden DOM matches |

## 4. Prioritization - 20% Tests Detect 80% Risk

Tests are prioritized by:

- business impact;
- user frequency;
- probability of regression;
- instability observed during exploration;
- visibility to customers;
- value of automation as regression protection.

| Priority | Meaning | Example |
| --- | --- | --- |
| P0 | Must always work | Home, search, cart intent |
| P1 | Important regression | Product details, mobile smoke |
| P2 | Useful quality signal | Footer, social links, newsletter |
| P3 | Nice to have | Rare edge cases or unstable UI details |

## 5. Automation Selection

Automation protects stable and repetitive checks first.

### Automated first

- home availability;
- search existing product;
- search no-result behavior;
- product details visibility;
- cart intent and safe cart state;
- navigation and support paths;
- anonymous account/wishlist behavior;
- desktop and mobile smoke journeys.

### Not automated first

- payment;
- checkout completion;
- private account data;
- admin or back-office flows;
- destructive customer actions;
- unstable visual details that change frequently.

## 6. Reliability Strategy

Because Carrefour TN is a real public website, the automation must handle instability without hiding product behavior.

The framework uses:

- centralized wait helpers;
- first visible locator selection;
- cookie consent handling;
- retry controlled by environment variables;
- screenshots on failure;
- Playwright traces on failure;
- video retained on failure;
- Allure report generation;
- Docker execution for reproducibility.

## 7. Evidence And Reporting

A QA strategy is stronger when failures are explainable.

The project collects:

- Cucumber HTML report;
- Cucumber JSON report;
- Allure report;
- screenshots on failure;
- videos when configured;
- Playwright traces when configured or on failure;
- documented bug reports and QA decisions.

## 8. Mapping: Strategy To QA

| Strategy concept | QA equivalent |
| --- | --- |
| Reconnaissance | Product discovery and exploratory testing |
| Center of gravity | Critical business flow |
| Encirclement | Positive, negative and boundary tests |
| Terrain advantage | Understanding UI, data and constraints |
| Intelligence | Logs, evidence, bug history and observations |
| Timing | CI pipeline and smoke feedback |
| Avoid brute force | Risk-based prioritization |

## 9. Interview Explanation

I use a risk-based QA strategy. I first understand the product and identify the business-critical flows. Then I surround each risky feature with positive, negative, mobile and regression scenarios. I do not automate everything blindly. I automate stable and high-value checks first, while exploratory testing remains useful for new or unstable areas.

## 10. Final Principle

A strong QA engineer does not only execute test cases.

A strong QA engineer understands:

- business risk;
- user impact;
- technical weakness;
- regression probability;
- automation value.

The objective is not to write more tests.

The objective is to build the right tests that protect the business.
