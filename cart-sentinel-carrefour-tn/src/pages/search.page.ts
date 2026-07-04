import { expect, type Locator, type Page } from '@playwright/test';
import { envConfig } from '../config/env.config';
import { BasePage } from '../core/base.page';
import {
  noResultPattern,
  searchInputSelector,
  searchToggleSelector,
  visibleProductLinkSelector,
  visibleProductResultSelector,
} from '../selectors/shared.selectors';

export class SearchPage extends BasePage {
  private readonly searchInput: Locator;
  private readonly searchToggle: Locator;
  private readonly resultCards: Locator;
  private readonly productLinks: Locator;
  private readonly noResultFeedback: Locator;
  private readonly addToCartButtons: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.locator(searchInputSelector);
    this.searchToggle = page.locator(searchToggleSelector);
    this.resultCards = page.locator(visibleProductResultSelector);
    this.productLinks = page.locator(visibleProductLinkSelector).filter({ hasNotText: /^$/ });
    this.noResultFeedback = page.getByText(noResultPattern);
    this.addToCartButtons = page.locator(
      [
        'button:visible[aria-label*="Ajouter" i]',
        'button:visible[aria-label*="panier" i]',
        'button:visible[class*="cart" i]',
      ].join(', '),
    );
  }

  async search(term: string): Promise<void> {
    await this.acceptConsentIfDisplayed();
    const visibleSearchInput = await this.openSearchIfCollapsed();
    await visibleSearchInput.fill(term);
    await visibleSearchInput.press('Enter');
    await this.page.waitForLoadState('domcontentloaded');
    await this.acceptConsentIfDisplayed();
    await this.waitForFirstVisibleLocator(this.resultCards.or(this.noResultFeedback));
  }

  async expectResultsFor(term: string): Promise<void> {
    const visibleSearchInput = await this.waitForFirstVisibleLocator(this.searchInput);
    await expect(visibleSearchInput).toHaveValue(term, { timeout: envConfig.defaultTimeoutMs });
    const productSignal = await this.waitForFirstVisibleLocator(this.resultCards);
    await this.expectVisible(productSignal);
  }

  async expectNoResults(): Promise<void> {
    const noResultSignal = await this.waitForFirstVisibleLocator(this.noResultFeedback);
    await this.expectVisible(noResultSignal);
  }

  async openFirstProduct(): Promise<void> {
    await this.acceptConsentIfDisplayed();
    const productLink = await this.firstVisibleProductLink();
    const productHref = await productLink.getAttribute('href');
    await this.click(productLink).catch(async (error: unknown) => {
      if (!productHref) {
        throw error;
      }

      await this.page.goto(productHref, { waitUntil: 'domcontentloaded' });
    });
    await this.page.waitForLoadState('domcontentloaded');
    await this.acceptConsentIfDisplayed();
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

  private async openSearchIfCollapsed(): Promise<Locator> {
    const visibleSearchInput = await this.findFirstVisibleLocator(this.searchInput, 1000);

    if (visibleSearchInput) {
      return visibleSearchInput;
    }

    const searchEntryPoint = await this.waitForFirstVisibleLocator(this.searchToggle);
    await this.click(searchEntryPoint);
    return this.waitForFirstVisibleLocator(this.searchInput);
  }
}
