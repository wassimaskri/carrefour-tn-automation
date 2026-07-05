# Wassim Test Plan

This document explains the test plan behind **Cart Sentinel Carrefour TN**.

The objective is to make the project useful for people visiting from LinkedIn: they can read how the testing approach was built before looking at the automation code.

## 1. Understand The Business Flow

Before writing automation, I reviewed Carrefour TN as an e-commerce journey:

- how a visitor reaches the storefront;
- how a customer searches for a product;
- how product name, image and price support the buying decision;
- how the customer starts a cart intent;
- how support, account, wishlist and store locator flows help the customer;
- how the same journey behaves on desktop and mobile.

The first question was not "which selector should I use?".

The first question was "which customer behavior matters for the business?".

## 2. Identify Risk Areas

The highest-risk areas are the flows that can directly affect conversion or customer trust:

| Risk area | Why it matters |
| --- | --- |
| Search | If search fails, the customer cannot discover products |
| Product details | Name and price are key decision signals |
| Cart | Cart issues directly impact checkout intent |
| Mobile journey | Many e-commerce visits happen on small screens |
| Account / wishlist | Returning customer flows must be understandable |
| Help / store locator | Support paths reduce customer frustration |

## 3. Manual Review Before Automation

Manual review was used to understand the site behavior first:

- cookie banner behavior;
- visible and hidden search elements;
- product cards and product links;
- no-result search behavior;
- add-to-cart behavior;
- cart empty state;
- mobile search behavior;
- anonymous wishlist redirection.

Automation was added only after the functional behavior was understood.

## 4. Automation Strategy

The automation layer protects the most meaningful public flows:

- smoke tests for critical journeys;
- risk tags such as `@smoke`, `@risk`, `@conversion`, `@negative`;
- Cucumber scenarios written in business-readable language;
- Page Object Model to isolate UI behavior;
- shared selectors for repeated UI contracts;
- desktop and mobile execution from the same feature language.

## 5. Reliability Strategy

Because Carrefour TN is a real public website, the framework handles instability explicitly:

- centralized wait helpers;
- first visible locator strategy;
- cookie consent handling;
- retry controlled by environment variables;
- screenshots on failure;
- Playwright traces on failure;
- video retained on failure;
- Docker execution for reproducibility.

## 6. What Was Not Tested

Some areas were intentionally excluded:

- no payment test executed;
- no private account data used;
- no checkout completion;
- no admin or back-office flow;
- no destructive customer action.

The project focuses only on public customer flows.

## 7. Learning Value

This test plan shows the expected order of work:

1. understand the product;
2. identify business risks;
3. test manually to learn behavior;
4. document anomalies and limitations;
5. automate the valuable checks;
6. collect evidence for debugging;
7. keep the framework maintainable.

This is the core idea of the project: automation should come from product understanding, not from selector collection.
