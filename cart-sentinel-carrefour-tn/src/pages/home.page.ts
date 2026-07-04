import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '../core/base.page';
import { searchInputSelector } from '../selectors/shared.selectors';

export class HomePage extends BasePage {
  private readonly searchInput: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.locator(searchInputSelector).first();
  }

  async openHome(): Promise<void> {
    await this.open('/');
    await this.acceptConsentIfDisplayed();
  }

  async expectLoaded(): Promise<void> {
    await this.expectUrl(/carrefour\.tn/);
    await this.expectVisible(this.searchInput);
  }

  async expectSearchVisible(): Promise<void> {
    await this.waitForVisible(this.searchInput);
  }
}
