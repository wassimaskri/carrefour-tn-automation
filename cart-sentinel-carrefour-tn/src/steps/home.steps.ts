import { Given, Then } from '@cucumber/cucumber';
import type { CartSentinelWorld } from '../support/world';

Given('I open Carrefour Tunisia website', async function (this: CartSentinelWorld) {
  await this.homePage.openHome();
});

Then('the home page should be displayed correctly', async function (this: CartSentinelWorld) {
  await this.homePage.expectLoaded();
});

Then('the search bar should be visible', async function (this: CartSentinelWorld) {
  await this.homePage.expectSearchVisible();
});
