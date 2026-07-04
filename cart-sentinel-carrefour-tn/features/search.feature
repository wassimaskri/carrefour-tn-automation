@search
Feature: Product search
  Search is a high-risk conversion entry point for e-commerce customers.
  A broken search does not only hide products; it blocks intent.

  Rule: Search must support both discovery and controlled empty-state feedback

  @smoke @risk @conversion
  Scenario: Search for an existing product
    Given I open Carrefour Tunisia website
    When I search for "eau"
    Then search results related to "eau" should be displayed

  @negative @risk
  Scenario: Search for a non-existing product
    Given I open Carrefour Tunisia website
    When I search for "zzzzzzzztest"
    Then a no result message should be displayed
