import { Then, When } from '@cucumber/cucumber';
import type { CartSentinelWorld } from '../support/world';

Then('the header should expose the main customer actions', async function (this: CartSentinelWorld) {
  await this.sitePage.expectHeaderReady();
});

When('I open the category menu', async function (this: CartSentinelWorld) {
  await this.sitePage.openCategoryMenu();
});

Then('product categories should be displayed', async function (this: CartSentinelWorld) {
  await this.sitePage.expectCategoriesVisible();
});

When('I open the store locator', async function (this: CartSentinelWorld) {
  await this.sitePage.openStoreLocator();
});

Then('the store locator page should be displayed', async function (this: CartSentinelWorld) {
  await this.sitePage.expectStoreLocatorDisplayed();
});

When('I open the help center', async function (this: CartSentinelWorld) {
  await this.sitePage.openHelpCenter();
});

Then('the help center page should be displayed', async function (this: CartSentinelWorld) {
  await this.sitePage.expectHelpCenterDisplayed();
});

When('I open the sign in page', async function (this: CartSentinelWorld) {
  await this.sitePage.openSignIn();
});

Then('the sign in page should be displayed', async function (this: CartSentinelWorld) {
  await this.sitePage.expectSignInDisplayed();
});

When('I open the wishlist page', async function (this: CartSentinelWorld) {
  await this.sitePage.openWishlist();
});

Then('the wishlist page should be displayed', async function (this: CartSentinelWorld) {
  await this.sitePage.expectWishlistDisplayed();
});

When('I submit the newsletter without email', async function (this: CartSentinelWorld) {
  await this.sitePage.submitEmptyNewsletter();
});

Then('a newsletter validation message should be displayed', async function (this: CartSentinelWorld) {
  await this.sitePage.expectNewsletterValidation();
});

Then('footer service links should be visible', async function (this: CartSentinelWorld) {
  await this.sitePage.expectFooterLinks();
});

Then('social network links should be available', async function (this: CartSentinelWorld) {
  await this.sitePage.expectSocialLinks();
});
