@strategy @documentation
Feature: QA strategy evidence
  A strong QA automation project must prove the thinking behind the tests.
  This feature validates that the repository contains a business-first QA strategy,
  not only executable browser checks.

  Rule: Strategy evidence must connect product risk, manual review and automation value

  @risk @portfolio
  Scenario: Validate business-first test strategy documentation
    Given the QA strategy evidence is available
    Then the strategy should explain business-critical flows
    And the strategy should connect manual review to automation
    And the strategy should document excluded unsafe flows

  @risk @portfolio
  Scenario: Validate automation evidence map
    Given the QA strategy evidence is available
    Then the strategy should map risks to automated checks
    And the strategy should describe failure evidence collection
