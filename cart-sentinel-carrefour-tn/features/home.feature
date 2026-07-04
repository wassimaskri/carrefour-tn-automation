@home @smoke
Feature: Home page
  As an online shopper
  I want the storefront to load correctly
  So that I can start my shopping journey with confidence

  Rule: The storefront must expose a clear shopping entry point before deeper journeys are tested

  @risk @availability
  Scenario: Verify Carrefour TN home page is displayed
    Given I open Carrefour Tunisia website
    Then the home page should be displayed correctly

  @risk @search-entrypoint
  Scenario: Verify search bar is visible
    Given I open Carrefour Tunisia website
    Then the search bar should be visible
