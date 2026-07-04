# Negative Scenarios

I separated negative tests into two groups: automated now and intentionally documented for a future iteration. This keeps the framework honest: I do not automate unstable checks just to make the project look bigger.

## Automated

| Scenario | Why it matters | Location |
| --- | --- | --- |
| Search non-existing product | Validates empty-state quality and recovery | `features/search.feature` |
| Empty newsletter submission | Validates CRM form validation | `features/customer.feature` |
| Cart empty/safe state | Validates controlled basket behavior when live site does not persist product | `features/cart.feature` |
| Anonymous wishlist access | Validates authentication redirection | `features/customer.feature` |

## Manual / Planned

| Scenario | Why not fully automated now | Expected behavior |
| --- | --- | --- |
| Price filter boundaries | Filter UI and product availability can vary by category/session | Results update or validation message appears |
| Out-of-stock product | Requires stable unavailable product data | Add-to-cart disabled or stock message visible |
| Invalid email format | Newsletter widget behavior can vary with client-side validation | Clear email validation message |
| Payment flow | Public portfolio project should not execute payment | No payment test executed |

## Senior QA Note

Negative testing is not about adding random failures. It is about checking that the product gives the customer a clear, controlled answer when the happy path is not available.
