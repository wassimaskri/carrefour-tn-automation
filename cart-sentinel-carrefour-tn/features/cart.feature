@cart
Feature: Cart
  The cart is the last controllable checkpoint before checkout.
  These scenarios protect cart intent while tolerating live-site availability constraints.

  Rule: Cart behavior must be observable and controlled after a customer selects a product

  @smoke @risk @conversion
  Scenario: Add product to cart
    Given I have searched for "eau"
    When I add the first product to the cart
    Then the cart should contain the selected product

  @risk @cart-integrity
  Scenario: Update product quantity in cart
    Given I have a product in the cart
    When I increase the product quantity
    Then the cart quantity should be updated

  @risk @cart-integrity
  Scenario: Remove product from cart
    Given I have a product in the cart
    When I remove the product from the cart
    Then the cart should be empty
