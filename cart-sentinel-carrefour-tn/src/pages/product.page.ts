import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '../core/base.page';

export class ProductPage extends BasePage {
  private readonly productName: Locator;
  private readonly productPrice: Locator;

  constructor(page: Page) {
    super(page);
    this.productName = page
      .locator('h1:visible, [data-testid*="name" i]:visible, [class*="productName" i]:visible')
      .first();
    this.productPrice = page.locator('[class*="price" i]:visible').first();
  }

  async expectDisplayed(): Promise<void> {
    await this.acceptConsentIfDisplayed();
    const productSignal = await this.waitForFirstVisibleLocator(this.productName.or(this.productPrice));
    await this.expectVisible(productSignal);
  }

  async expectNameVisible(): Promise<void> {
    await this.acceptConsentIfDisplayed();
    await this.waitForVisible(this.productName);
  }

  async expectPriceVisible(): Promise<void> {
    await this.acceptConsentIfDisplayed();
    await this.waitForVisible(this.productPrice);
  }
}
