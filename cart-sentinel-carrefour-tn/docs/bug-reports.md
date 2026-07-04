# Bug Reports / Observed Anomalies

These are real observations from working against the live public website. Some are product issues, some are testability issues, but all are the kind of notes I would raise during a QA review.

## BUG-001 - Hidden duplicated menu text creates ambiguous automation targets

**Severity:** Medium  
**Area:** Navigation / Search  
**Environment:** Carrefour TN public website, Chromium

**Steps to observe**

1. Open the home page.
2. Search for a term such as `eau` or `lait`.
3. Inspect visible and hidden DOM text around categories.

**Actual result**

Several category/menu texts remain in the DOM while hidden. Text such as `Eau`, `Lait`, or beauty category labels can be resolved before visible product results.

**Expected result**

Hidden navigation entries should not interfere with accessible product result discovery. Ideally the app exposes stable product card identifiers.

**Impact**

This increases the risk of flaky UI tests and can also affect accessibility tooling if hidden elements are not correctly managed.

**Automation decision**

The framework waits for visible product cards and avoids first-match text locators.

## BUG-002 - Wishlist redirects anonymous users without clear precondition in the entry point

**Severity:** Low/Medium  
**Area:** Wishlist / Account  
**Environment:** Anonymous user session

**Steps to reproduce**

1. Open Carrefour TN as a guest.
2. Click the wishlist / saved products entry point.

**Actual result**

The user is redirected to sign-in.

**Expected result**

The redirect is acceptable, but the UI could make the authentication requirement clearer before navigation.

**Impact**

Guest users may not understand why they were moved to account sign-in.

**Automation decision**

The test accepts either wishlist or sign-in as valid anonymous behavior.

## BUG-003 - Cart persistence depends on session/delivery state

**Severity:** Medium  
**Area:** Cart  
**Environment:** Public anonymous flow

**Steps to reproduce**

1. Search for `eau`.
2. Add a visible product to cart.
3. Open the mini cart.

**Actual result**

Depending on session/product/delivery state, the cart may show an empty state after the add-to-cart action.

**Expected result**

The site should either persist the selected product or display a clear reason why it cannot be added.

**Impact**

This can confuse customers and makes automation sensitive to live availability constraints.

**Automation decision**

The framework validates a controlled cart state rather than assuming cart persistence is always available.
