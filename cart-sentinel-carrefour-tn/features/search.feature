@search
Feature: Product search
  Search is a high-risk conversion entry point for e-commerce customers.
  A broken search does not only hide products; it blocks intent.

  Rule: Search must support both discovery and controlled empty-state feedback

  @smoke @risk @conversion @data-driven
  Scenario Outline: Search for an existing product
    Given I open Carrefour Tunisia website
    When I search for "<product>"
    Then search results related to "<product>" should be displayed

    Examples:
      | product  |
      | eau      |
      | pristine |

  @negative @risk
  Scenario: Search for a non-existing product
    Given I open Carrefour Tunisia website
    When I search for "zzzzzzzztest"
    Then a no result message should be displayed
