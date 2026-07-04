import { expect, type Locator, type Page } from '@playwright/test';
import { envConfig } from '../config/env.config';
import { BasePage } from '../core/base.page';

export class HomePage extends BasePage {
  readonly searchInput: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page
      .locator(
        [
          'input[type="search"]',
          'input[role="searchbox"]',
          'input[placeholder*="Rechercher" i]',
          'input[placeholder*="lait" i]',
          'input[placeholder*="Pain" i]',
          'input[aria-label*="Rechercher" i]',
        ].join(', '),
      )
      .first();
  }

  async openHome(): Promise<void> {
    await this.open('/');
    await this.acceptConsentIfDisplayed();
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/carrefour\.tn/, { timeout: envConfig.defaultTimeoutMs });
    await expect(this.searchInput).toBeVisible({ timeout: envConfig.defaultTimeoutMs });
  }

  async expectSearchVisible(): Promise<void> {
    await this.waitForVisible(this.searchInput);
  }
}
