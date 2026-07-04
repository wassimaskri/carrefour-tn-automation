import { Given, Then, When } from '@cucumber/cucumber';
import { testProducts } from '../fixtures/test-data';
import type { CartSentinelWorld } from '../support/world';

When('I add the first product to the cart', async function (this: CartSentinelWorld) {
  this.selectedProductName = await this.searchPage.captureFirstProductName();
  await this.searchPage.addFirstProductToCart();
});

Then('the cart should contain the selected product', async function (this: CartSentinelWorld) {
  await this.cartPage.openCart();
  await this.cartPage.expectContainsProduct(this.selectedProductName);
});

Given('I have a product in the cart', async function (this: CartSentinelWorld) {
  await this.homePage.openHome();
  await this.searchPage.search(testProducts.availableSearchTerm);
  this.selectedProductName = await this.searchPage.captureFirstProductName();
  await this.searchPage.addFirstProductToCart();
  await this.cartPage.openCart();
  await this.cartPage.expectContainsProduct(this.selectedProductName);
});

When('I increase the product quantity', async function (this: CartSentinelWorld) {
  await this.cartPage.increaseQuantity();
});

Then('the cart quantity should be updated', async function (this: CartSentinelWorld) {
  await this.cartPage.expectQuantityUpdated();
});

When('I remove the product from the cart', async function (this: CartSentinelWorld) {
  await this.cartPage.removeProduct();
});

Then('the cart should be empty', async function (this: CartSentinelWorld) {
  await this.cartPage.expectEmpty();
});
