import { expect, type Locator, type Page } from '@playwright/test';
import { envConfig } from '../config/env.config';
import { BasePage } from '../core/base.page';

export class SearchPage extends BasePage {
  readonly searchInput: Locator;
  readonly resultCards: Locator;
  readonly productLinks: Locator;
  readonly noResultFeedback: Locator;
  readonly addToCartButtons: Locator;

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
    this.resultCards = page.locator(
      [
        'main a:visible[href$=".html"]:has(img)',
        'main a:visible[href$=".html"]:has-text("Eau")',
        'main a:visible[href$=".html"]:has-text("Lait")',
        '[data-testid*="product" i]:visible',
        '[class*="productFullDetail" i]:visible',
      ].join(', '),
    );
    this.productLinks = page
      .locator(
        [
          'main a:visible[href$=".html"]:has(img)',
          'main a:visible[href$=".html"]:has-text("Eau")',
          'main a:visible[href$=".html"]:has-text("Lait")',
        ].join(', '),
      )
      .filter({ hasNotText: /^$/ });
    this.noResultFeedback = page.getByText(
      /aucun produit|aucun résultat|ne trouvons pas|0 produits|pas de résultat/i,
    );
    this.addToCartButtons = page
      .locator(
        [
          'button:visible[aria-label*="Ajouter" i]',
          'button:visible[aria-label*="panier" i]',
          'button:visible[class*="cart" i]',
        ].join(', '),
      );
  }

  async search(term: string): Promise<void> {
    await this.acceptConsentIfDisplayed();
    await this.waitForVisible(this.searchInput);
    await this.searchInput.fill(term);
    await this.searchInput.press('Enter');
    await this.page.waitForLoadState('domcontentloaded');
    await this.acceptConsentIfDisplayed();
    await this.waitForFirstVisibleLocator(this.resultCards.or(this.noResultFeedback));
  }

  async expectResultsFor(term: string): Promise<void> {
    await expect(this.searchInput).toHaveValue(term, { timeout: envConfig.defaultTimeoutMs });
    const productSignal = await this.waitForFirstVisibleLocator(this.resultCards);
    await expect(productSignal).toBeVisible({
      timeout: envConfig.defaultTimeoutMs,
    });
  }

  async expectNoResults(): Promise<void> {
    const noResultSignal = await this.waitForFirstVisibleLocator(this.noResultFeedback);
    await expect(noResultSignal).toBeVisible({ timeout: envConfig.defaultTimeoutMs });
  }

  async openFirstProduct(): Promise<void> {
    const productLink = await this.firstVisibleProductLink();
    await this.click(productLink);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async addFirstProductToCart(): Promise<void> {
    await this.acceptConsentIfDisplayed();
    const addToCartButton = await this.waitForFirstVisibleLocator(this.addToCartButtons);
    await this.click(addToCartButton);
  }

  async captureFirstProductName(): Promise<string> {
    const productLink = await this.firstVisibleProductLink();
    const cardText = await this.getText(productLink).catch(() => '');
    const readableName = cardText.split('\n').find((line) => line.trim().length > 2)?.trim();

    if (readableName) {
      return readableName;
    }

    return (await productLink.getAttribute('href')) || 'selected product';
  }

  private firstVisibleProductLink(): Promise<Locator> {
    return this.waitForFirstVisibleLocator(this.productLinks);
  }
}
