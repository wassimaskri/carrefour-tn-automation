@navigation
Feature: Navigation and discovery
  Navigation modules must expose the main storefront entry points.
  Navigation is tested as customer orientation, not as decoration.

  Rule: A customer must be able to browse, locate stores and reach support from the header

  @smoke @risk @header
  Scenario: Verify header modules are available
    Given I open Carrefour Tunisia website
    Then the header should expose the main customer actions

  @risk @category-discovery
  Scenario: Open category menu
    Given I open Carrefour Tunisia website
    When I open the category menu
    Then product categories should be displayed

  @risk @store-locator
  Scenario: Open store locator
    Given I open Carrefour Tunisia website
    When I open the store locator
    Then the store locator page should be displayed

  @support @risk
  Scenario: Open help center
    Given I open Carrefour Tunisia website
    When I open the help center
    Then the help center page should be displayed
