import { expect, type Locator, type Page } from '@playwright/test';
import { envConfig } from '../config/env.config';
import { BasePage } from '../core/base.page';

export class SitePage extends BasePage {
  readonly logo: Locator;
  readonly menuButton: Locator;
  readonly searchInput: Locator;
  readonly storeLink: Locator;
  readonly helpLink: Locator;
  readonly signInLink: Locator;
  readonly wishlistLink: Locator;
  readonly cartButton: Locator;
  readonly categoryPanel: Locator;
  readonly newsletterInput: Locator;
  readonly newsletterSubmit: Locator;
  readonly newsletterValidation: Locator;
  readonly socialLinks: Locator;

  constructor(page: Page) {
    super(page);
    this.logo = page.locator('a[href="/"], a[href="https://www.carrefour.tn/"]').first();
    this.menuButton = page
      .getByRole('button', { name: /menu/i })
      .or(page.locator('button:visible:has-text("Menu"), [class*="menu" i]:visible:has-text("Menu")'))
      .first();
    this.searchInput = page
      .locator('input[placeholder*="Pain" i], input[placeholder*="lait" i], input[type="search"]')
      .first();
    this.storeLink = page.getByRole('link', { name: /nos magasins/i }).first();
    this.helpLink = page.getByRole('link', { name: /aide|faq/i }).first();
    this.signInLink = page.getByRole('link', { name: /se connecter|compte/i }).first();
    this.wishlistLink = page
      .getByRole('link', { name: /mes produits|wishlist/i })
      .or(page.locator('a[href*="wishlist" i]'))
      .first();
    this.cartButton = page
      .getByRole('link', { name: /panier/i })
      .or(page.getByRole('button', { name: /panier|cart/i }))
      .first();
    this.categoryPanel = page.locator('nav:visible, [class*="menu" i]:visible').filter({
      hasText: /promotions|epicerie|boissons|frais|bébé|beauté/i,
    });
    this.newsletterInput = page.locator('input[placeholder*="email" i], input[type="email"]').last();
    this.newsletterSubmit = page.getByRole('button', { name: /^ok$/i }).last();
    this.newsletterValidation = page.getByText(/veuillez entrer|email|e-mail|obligatoire/i).last();
    this.socialLinks = page.locator(
      'a[href*="facebook"], a[href*="instagram"], a[href*="youtube"], a[href*="linkedin"], a[href*="tiktok"]',
    );
  }

  async expectHeaderReady(): Promise<void> {
    await expect(this.logo).toBeVisible({ timeout: envConfig.defaultTimeoutMs });
    await expect(this.menuButton).toBeVisible({ timeout: envConfig.defaultTimeoutMs });
    await expect(this.searchInput).toBeVisible({ timeout: envConfig.defaultTimeoutMs });
    await expect(this.signInLink).toBeVisible({ timeout: envConfig.defaultTimeoutMs });
    await expect(this.cartButton).toBeVisible({ timeout: envConfig.defaultTimeoutMs });
  }

  async openCategoryMenu(): Promise<void> {
    await this.click(this.menuButton);
  }

  async expectCategoriesVisible(): Promise<void> {
    await expect(this.categoryPanel.first()).toBeVisible({ timeout: envConfig.defaultTimeoutMs });
  }

  async openStoreLocator(): Promise<void> {
    await this.click(this.storeLink);
  }

  async expectStoreLocatorDisplayed(): Promise<void> {
    await expect(this.page).toHaveURL(/nos-magasins|stores|magasins/i, {
      timeout: envConfig.defaultTimeoutMs,
    });
  }

  async openHelpCenter(): Promise<void> {
    await this.click(this.helpLink);
  }

  async expectHelpCenterDisplayed(): Promise<void> {
    await expect(this.page).toHaveURL(/faq|aide/i, { timeout: envConfig.defaultTimeoutMs });
  }

  async openSignIn(): Promise<void> {
    await this.click(this.signInLink);
  }

  async expectSignInDisplayed(): Promise<void> {
    await expect(this.page).toHaveURL(/compte|sign|login|connexion/i, {
      timeout: envConfig.defaultTimeoutMs,
    });
  }

  async openWishlist(): Promise<void> {
    await this.click(this.wishlistLink);
  }

  async expectWishlistDisplayed(): Promise<void> {
    await expect(this.page).toHaveURL(/wishlist|mes-produits|sign-compte|compte/i, {
      timeout: envConfig.defaultTimeoutMs,
    });
  }

  async submitEmptyNewsletter(): Promise<void> {
    await this.newsletterInput.scrollIntoViewIfNeeded();
    await this.click(this.newsletterSubmit);
  }

  async expectNewsletterValidation(): Promise<void> {
    await expect(this.newsletterValidation).toBeVisible({ timeout: envConfig.defaultTimeoutMs });
  }

  async expectFooterLinks(): Promise<void> {
    await expect(this.page.getByText(/conditions générales de vente/i).first()).toBeVisible({
      timeout: envConfig.defaultTimeoutMs,
    });
    await expect(this.page.getByText(/support|contactez-nous|service livraison/i).first()).toBeVisible({
      timeout: envConfig.defaultTimeoutMs,
    });
  }

  async expectSocialLinks(): Promise<void> {
    await expect(this.socialLinks.first()).toBeVisible({ timeout: envConfig.defaultTimeoutMs });
    expect(await this.socialLinks.count()).toBeGreaterThanOrEqual(3);
  }
}
