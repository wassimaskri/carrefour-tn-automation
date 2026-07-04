@content
Feature: Content and trust modules
  Footer content must expose support, trust and social proof links.
  These checks protect credibility signals that often regress silently.

  Rule: Trust and support content must remain reachable from the storefront

  @risk @footer
  Scenario: Verify footer service links are available
    Given I open Carrefour Tunisia website
    Then footer service links should be visible

  @risk @social
  Scenario: Verify social links are available
    Given I open Carrefour Tunisia website
    Then social network links should be available
