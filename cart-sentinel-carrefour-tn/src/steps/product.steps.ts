import { Then, When } from '@cucumber/cucumber';
import type { CartSentinelWorld } from '../support/world';

When('I open the first product from the results', async function (this: CartSentinelWorld) {
  this.selectedProductName = await this.searchPage.captureFirstProductName();
  await this.searchPage.openFirstProduct();
});

Then('the product details page should be displayed', async function (this: CartSentinelWorld) {
  await this.productPage.expectDisplayed();
});

Then('the product name should be visible', async function (this: CartSentinelWorld) {
  await this.productPage.expectNameVisible();
});

Then('the product price should be visible', async function (this: CartSentinelWorld) {
  await this.productPage.expectPriceVisible();
});
