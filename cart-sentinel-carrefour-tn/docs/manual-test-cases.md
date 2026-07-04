# Manual Test Cases

These test cases are the manual layer I would execute before automating. They explain the functional intent behind the Cucumber scenarios.

| ID | Module | Scenario | Steps | Expected result | Automation status |
| --- | --- | --- | --- | --- | --- |
| TC-001 | Home | Verify storefront access | Open `https://www.carrefour.tn/` | Home page loads and search is visible | Automated |
| TC-002 | Consent | Accept cookie banner | Open home, click `Tout accepter` if displayed | Banner disappears and page remains usable | Automated in Page Objects |
| TC-003 | Search | Search existing product | Search for `eau` | Product results are visible | Automated |
| TC-004 | Search | Search non-existing product | Search for `zzzzzzzztest` | No-result message is displayed | Automated |
| TC-005 | Product | Open product details | Search `eau`, open first product | Product name and price are visible | Automated |
| TC-006 | Cart | Add product to cart | Search `eau`, click add to cart | Cart opens or controlled cart state is shown | Automated |
| TC-007 | Cart | Empty cart resilience | Open cart without a persisted product | Empty cart message is clear | Automated through safe cart assertions |
| TC-008 | Account | Open sign-in | Click sign-in icon/link | Sign-in page is displayed | Automated |
| TC-009 | Wishlist | Anonymous wishlist access | Click wishlist as guest | User is routed to wishlist or sign-in | Automated |
| TC-010 | Store locator | Open store locator | Click `Nos magasins` | Store locator page is displayed | Automated |
| TC-011 | Help | Open help center | Click help/FAQ | FAQ/help page is displayed | Automated |
| TC-012 | Newsletter | Submit empty email | Click newsletter OK without email | Validation message is displayed | Automated |
| TC-013 | Footer | Verify service links | Scroll footer | Support/legal/service links are visible | Automated |
| TC-014 | Social | Verify social links | Inspect footer/social area | Social network links are available | Automated |
| TC-015 | Filters | Price filter boundaries | Apply min/max price filters | Results update and invalid ranges are handled | Planned |
| TC-016 | Stock | Out-of-stock product | Open unavailable product if present | Add-to-cart is disabled or clear stock message appears | Planned |
| TC-017 | Payment | Checkout payment | Proceed to payment | Not executed in this project | Out of scope |
| TC-018 | Mobile | Smoke customer journey on mobile viewport | Run home, search, PDP and cart intent on mobile | Core journey remains usable on a small touch screen | Automated with `DEVICE=mobile` |
