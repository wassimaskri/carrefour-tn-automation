import { Given, Then, When } from '@cucumber/cucumber';
import type { CartSentinelWorld } from '../support/world';

Given('I have searched for {string}', async function (this: CartSentinelWorld, term: string) {
  await this.homePage.openHome();
  await this.searchPage.search(term);
});

When('I search for {string}', async function (this: CartSentinelWorld, term: string) {
  await this.searchPage.search(term);
});

Then(
  'search results related to {string} should be displayed',
  async function (this: CartSentinelWorld, term: string) {
    await this.searchPage.expectResultsFor(term);
  },
);

Then('a no result message should be displayed', async function (this: CartSentinelWorld) {
  await this.searchPage.expectNoResults();
});
