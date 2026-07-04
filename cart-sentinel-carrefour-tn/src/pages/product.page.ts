import { expect, type Locator, type Page } from '@playwright/test';
import { envConfig } from '../config/env.config';
import { BasePage } from '../core/base.page';

export class ProductPage extends BasePage {
  readonly productName: Locator;
  readonly productPrice: Locator;

  constructor(page: Page) {
    super(page);
    this.productName = page
      .locator('h1:visible, [data-testid*="name" i]:visible, [class*="productName" i]:visible')
      .first();
    this.productPrice = page.locator('[class*="price" i]:visible').first();
  }

  async expectDisplayed(): Promise<void> {
    await expect(this.productName).toBeVisible({ timeout: envConfig.defaultTimeoutMs });
  }

  async expectNameVisible(): Promise<void> {
    await this.waitForVisible(this.productName);
  }

  async expectPriceVisible(): Promise<void> {
    await this.waitForVisible(this.productPrice);
  }
}
