@product
Feature: Product details
  Product pages must expose enough information for the customer to decide.

  Rule: A product details page must confirm identity and price before cart intent

  @smoke @risk @pdp
  Scenario: Open product details from search results
    Given I have searched for "eau"
    When I open the first product from the results
    Then the product details page should be displayed
    And the product name should be visible
    And the product price should be visible
