import { expect, type Locator, type Page } from '@playwright/test';
import { envConfig } from '../config/env.config';

export abstract class BasePage {
  protected constructor(protected readonly page: Page) {}

  async open(path = '/'): Promise<void> {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  async click(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
    await locator.click();
  }

  async getText(locator: Locator): Promise<string> {
    return (await locator.textContent())?.trim() || '';
  }

  async waitForVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible({ timeout: envConfig.defaultTimeoutMs });
  }

  protected async expectVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible({ timeout: envConfig.defaultTimeoutMs });
  }

  protected async expectUrl(pattern: RegExp): Promise<void> {
    await expect(this.page).toHaveURL(pattern, { timeout: envConfig.defaultTimeoutMs });
  }

  protected async expectMinCount(locator: Locator, minimum: number): Promise<void> {
    expect(await locator.count()).toBeGreaterThanOrEqual(minimum);
  }

  async acceptConsentIfDisplayed(): Promise<void> {
    const acceptButton = this.page
      .locator(
        [
          'button:visible:has-text("Tout accepter")',
          '[role="button"]:visible:has-text("Tout accepter")',
          'a:visible:has-text("Tout accepter")',
          'button:visible:has-text("Accepter")',
          '[role="button"]:visible:has-text("Accepter")',
        ].join(', '),
      )
      .first();
    await acceptButton.waitFor({ state: 'visible', timeout: 5000 }).catch(() => undefined);

    if (await acceptButton.isVisible().catch(() => false)) {
      await acceptButton.click({ force: true });
    }
  }

  protected async waitForFirstVisibleLocator(
    locator: Locator,
    timeoutMs = envConfig.defaultTimeoutMs,
  ): Promise<Locator> {
    const visibleLocator = await this.findFirstVisibleLocator(locator, timeoutMs);

    if (visibleLocator) {
      return visibleLocator;
    }

    return locator.first();
  }

  protected async findFirstVisibleLocator(
    locator: Locator,
    timeoutMs = envConfig.defaultTimeoutMs,
  ): Promise<Locator | undefined> {
    const deadline = Date.now() + timeoutMs;

    while (Date.now() < deadline) {
      const count = await locator.count();

      for (let index = 0; index < count; index += 1) {
        const candidate = locator.nth(index);
        if (await candidate.isVisible().catch(() => false)) {
          return candidate;
        }
      }

      await this.page.waitForTimeout(250);
    }

    const count = await locator.count();

    for (let index = 0; index < count; index += 1) {
      const candidate = locator.nth(index);
      if (await candidate.isVisible().catch(() => false)) {
        return candidate;
      }
    }

    return undefined;
  }
}
