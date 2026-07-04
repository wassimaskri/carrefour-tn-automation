@customer
Feature: Customer account entry points
  Customer modules must route users to account and saved-products areas.
  Anonymous redirection to sign-in is accepted when the business flow requires authentication.

  Rule: Customer identity and CRM entry points must fail safely and clearly

  @risk @account
  Scenario: Open sign in page
    Given I open Carrefour Tunisia website
    When I open the sign in page
    Then the sign in page should be displayed

  @risk @wishlist
  Scenario: Open wishlist page
    Given I open Carrefour Tunisia website
    When I open the wishlist page
    Then the wishlist page should be displayed

  @negative @newsletter
  Scenario: Newsletter blocks empty email submission
    Given I open Carrefour Tunisia website
    When I submit the newsletter without email
    Then a newsletter validation message should be displayed
