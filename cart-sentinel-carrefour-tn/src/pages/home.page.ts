import { type Locator, type Page } from '@playwright/test';
import { BasePage } from '../core/base.page';
import { searchInputSelector, searchToggleSelector } from '../selectors/shared.selectors';

export class HomePage extends BasePage {
  private readonly searchInput: Locator;
  private readonly searchToggle: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.locator(searchInputSelector);
    this.searchToggle = page.locator(searchToggleSelector);
  }

  async openHome(): Promise<void> {
    await this.open('/');
    await this.acceptConsentIfDisplayed();
  }

  async expectLoaded(): Promise<void> {
    await this.expectUrl(/carrefour\.tn/);
    const searchEntryPoint = await this.waitForFirstVisibleLocator(this.searchInput.or(this.searchToggle));
    await this.expectVisible(searchEntryPoint);
  }

  async expectSearchVisible(): Promise<void> {
    if (!(await this.findFirstVisibleLocator(this.searchInput, 1000))) {
      const searchEntryPoint = await this.waitForFirstVisibleLocator(this.searchToggle);
      await this.click(searchEntryPoint);
    }

    const visibleSearchInput = await this.waitForFirstVisibleLocator(this.searchInput);
    await this.waitForVisible(visibleSearchInput);
  }
}
